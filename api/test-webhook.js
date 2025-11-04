/**
 * Test endpoint to verify webhook configuration
 * Visit: https://your-domain.vercel.app/api/test-webhook
 */

export default async function handler(req, res) {
    const webhookUrl = process.env.WEBHOOK_URL;
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    const rateLimit = process.env.RATE_LIMIT_MAX;

    // Check environment variables
    const envStatus = {
        WEBHOOK_URL: webhookUrl ? '✅ SET' : '❌ MISSING',
        RECAPTCHA_SECRET_KEY: recaptchaSecret ? '✅ SET' : '❌ MISSING',
        RATE_LIMIT_MAX: rateLimit ? `✅ SET (${rateLimit})` : 'ℹ️ Not set (will use default: 10)'
    };

    // Return diagnostic information
    return res.status(200).json({
        status: 'Test Endpoint',
        message: 'Environment Variables Check',
        environment_variables: envStatus,
        webhook_url_preview: webhookUrl ? `${webhookUrl.substring(0, 30)}...` : 'NOT SET',
        all_required_vars_set: !!(webhookUrl && recaptchaSecret),
        timestamp: new Date().toISOString(),
        help: {
            webhook_missing: !webhookUrl ? 'Add WEBHOOK_URL in Vercel Dashboard → Settings → Environment Variables' : null,
            recaptcha_missing: !recaptchaSecret ? 'Add RECAPTCHA_SECRET_KEY in Vercel Dashboard → Settings → Environment Variables' : null
        }
    });
}

// Export for Netlify Functions
export { handler };
