/**
 * Serverless function to proxy assessment submissions
 * Works with Vercel, Netlify, and AWS Lambda
 *
 * SETUP:
 * 1. Deploy this file to /api/submit-assessment.js (Vercel) or /netlify/functions/submit-assessment.js (Netlify)
 * 2. Set environment variables in your hosting platform:
 *    - WEBHOOK_URL: Your Make.com/Zapier/HubSpot webhook URL
 *    - WEBHOOK_SECRET: Optional secret key for validation
 *    - RATE_LIMIT_MAX: Max requests per IP per hour (default: 10)
 */

// Simple in-memory rate limiter (use Redis in production)
const rateLimitStore = new Map();

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '10');

// Clean up old entries every 10 minutes
setInterval(() => {
    const now = Date.now();
    for (const [key, data] of rateLimitStore.entries()) {
        if (now - data.resetTime > RATE_LIMIT_WINDOW) {
            rateLimitStore.delete(key);
        }
    }
}, 10 * 60 * 1000);

function checkRateLimit(ip) {
    const now = Date.now();
    const record = rateLimitStore.get(ip);

    if (!record) {
        rateLimitStore.set(ip, {
            count: 1,
            resetTime: now
        });
        return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
    }

    // Reset if window has passed
    if (now - record.resetTime > RATE_LIMIT_WINDOW) {
        rateLimitStore.set(ip, {
            count: 1,
            resetTime: now
        });
        return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
    }

    // Check if limit exceeded
    if (record.count >= RATE_LIMIT_MAX) {
        return {
            allowed: false,
            remaining: 0,
            resetTime: record.resetTime + RATE_LIMIT_WINDOW
        };
    }

    // Increment count
    record.count++;
    return { allowed: true, remaining: RATE_LIMIT_MAX - record.count };
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePayload(data) {
    const errors = [];

    // Required fields
    if (!data.email) {
        errors.push('Email is required');
    } else if (!validateEmail(data.email)) {
        errors.push('Invalid email format');
    }

    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters');
    }

    if (!data.organization || data.organization.trim().length < 2) {
        errors.push('Organization must be at least 2 characters');
    }

    // Validate scores are within range
    const scores = ['overall_score', 'preparedness_score', 'response_score', 'recovery_score', 'support_score'];
    scores.forEach(scoreField => {
        const score = data[scoreField];
        if (score !== undefined && (score < 0 || score > 100)) {
            errors.push(`${scoreField} must be between 0 and 100`);
        }
    });

    // Check for spam patterns
    const spamPatterns = [
        /test@test\.com/i,
        /example@example\.com/i,
        /\b(viagra|cialis|casino|lottery)\b/i
    ];

    const textToCheck = `${data.name} ${data.email} ${data.organization}`.toLowerCase();
    if (spamPatterns.some(pattern => pattern.test(textToCheck))) {
        errors.push('Submission appears to be spam');
    }

    return errors;
}

// Honeypot check (add a hidden field to your form)
function checkHoneypot(data) {
    // If honeypot field is filled, it's a bot
    return data.website || data.phone_number || data.url;
}

export default async function handler(req, res) {
    // Only accept POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed',
            message: 'Only POST requests are accepted'
        });
    }

    // Get client IP for rate limiting
    const ip = req.headers['x-forwarded-for']?.split(',')[0] ||
               req.headers['x-real-ip'] ||
               req.connection?.remoteAddress ||
               'unknown';

    // Check rate limit
    const rateLimitResult = checkRateLimit(ip);
    if (!rateLimitResult.allowed) {
        const resetDate = new Date(rateLimitResult.resetTime);
        return res.status(429).json({
            error: 'Too many requests',
            message: `Rate limit exceeded. Please try again after ${resetDate.toISOString()}`,
            retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
        });
    }

    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', RATE_LIMIT_MAX.toString());
    res.setHeader('X-RateLimit-Remaining', rateLimitResult.remaining.toString());

    try {
        const data = req.body;

        // Check honeypot
        if (checkHoneypot(data)) {
            console.log('Honeypot triggered for IP:', ip);
            // Return success to bot but don't process
            return res.status(200).json({ success: true, message: 'Submission received' });
        }

        // Validate payload
        const validationErrors = validatePayload(data);
        if (validationErrors.length > 0) {
            return res.status(400).json({
                error: 'Validation failed',
                details: validationErrors
            });
        }

        // Add server-side metadata
        const enrichedData = {
            ...data,
            server_timestamp: new Date().toISOString(),
            client_ip: ip,
            user_agent: req.headers['user-agent'] || 'unknown',
            submission_source: 'assessment_tool'
        };

        // Check for webhook URL
        const webhookUrl = process.env.WEBHOOK_URL;
        if (!webhookUrl) {
            console.error('WEBHOOK_URL environment variable not set');
            return res.status(500).json({
                error: 'Configuration error',
                message: 'Webhook URL not configured'
            });
        }

        // Forward to webhook with timeout
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(process.env.WEBHOOK_SECRET && {
                    'X-Webhook-Secret': process.env.WEBHOOK_SECRET
                })
            },
            body: JSON.stringify(enrichedData),
            signal: controller.signal
        });

        clearTimeout(timeout);

        if (!response.ok) {
            console.error('Webhook error:', response.status, response.statusText);
            throw new Error(`Webhook returned ${response.status}`);
        }

        // Success
        return res.status(200).json({
            success: true,
            message: 'Assessment submitted successfully',
            assessment_id: data.assessment_id
        });

    } catch (error) {
        console.error('Submission error:', error);

        // Handle specific error types
        if (error.name === 'AbortError') {
            return res.status(504).json({
                error: 'Gateway timeout',
                message: 'Webhook request timed out'
            });
        }

        return res.status(500).json({
            error: 'Internal server error',
            message: 'Failed to process submission. Please try again later.'
        });
    }
}

// Export for Netlify Functions
export { handler };
