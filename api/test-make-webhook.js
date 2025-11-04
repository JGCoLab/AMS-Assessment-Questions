/**
 * Test endpoint to directly test Make.com webhook
 * This bypasses all validation to see if Make.com accepts the data
 * Visit: https://your-domain.vercel.app/api/test-make-webhook
 */

export default async function handler(req, res) {
    const webhookUrl = process.env.WEBHOOK_URL;

    if (!webhookUrl) {
        return res.status(500).json({
            error: 'WEBHOOK_URL not configured',
            message: 'Add WEBHOOK_URL environment variable in Vercel'
        });
    }

    // Simple test payload
    const testPayload = {
        test: 'direct_webhook_test',
        timestamp: new Date().toISOString(),
        email: 'test@example.com',
        name: 'Test User',
        organization: 'Test Organization',
        overall_score: 50
    };

    try {
        console.log('Testing webhook:', webhookUrl);
        console.log('Test payload:', testPayload);

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testPayload),
            signal: controller.signal
        });

        clearTimeout(timeout);

        const responseText = await response.text();
        let responseData;
        try {
            responseData = JSON.parse(responseText);
        } catch (e) {
            responseData = responseText;
        }

        console.log('Make.com response status:', response.status);
        console.log('Make.com response:', responseData);

        if (!response.ok) {
            return res.status(200).json({
                status: 'WEBHOOK_ERROR',
                webhook_status_code: response.status,
                webhook_response: responseData,
                diagnosis: diagnoseError(response.status, responseData),
                test_payload: testPayload,
                webhook_url_preview: `${webhookUrl.substring(0, 40)}...`
            });
        }

        return res.status(200).json({
            status: 'SUCCESS',
            message: '✅ Make.com accepted the test data!',
            webhook_status_code: response.status,
            webhook_response: responseData,
            test_payload: testPayload,
            next_steps: [
                'Check Make.com scenario History to see the execution',
                'If you see the test data there, the webhook is working correctly',
                'The issue might be with data validation in a specific module'
            ]
        });

    } catch (error) {
        console.error('Webhook test error:', error);

        if (error.name === 'AbortError') {
            return res.status(200).json({
                status: 'TIMEOUT',
                error: 'Make.com webhook timed out after 10 seconds',
                diagnosis: 'Scenario might be OFF or webhook URL is incorrect',
                webhook_url: webhookUrl,
                action_required: [
                    '1. Go to Make.com',
                    '2. Find your assessment scenario',
                    '3. Turn it ON (toggle in top right)',
                    '4. Try this test again'
                ]
            });
        }

        return res.status(200).json({
            status: 'ERROR',
            error: error.message,
            webhook_url_preview: `${webhookUrl.substring(0, 40)}...`,
            diagnosis: 'Network error or Make.com is unreachable'
        });
    }
}

function diagnoseError(statusCode, response) {
    const diagnoses = {
        400: {
            issue: 'Bad Request - Make.com rejected the data format',
            common_causes: [
                '❌ Scenario is ON but webhook module has JSON schema validation enabled',
                '❌ Webhook module expects specific field names',
                '❌ First module after webhook has a filter that rejects the data'
            ],
            fixes: [
                '1. Go to Make.com → Your scenario',
                '2. Click the webhook module (first bubble)',
                '3. Click "Show advanced settings"',
                '4. Set "Data structure" to "Not selected" or "Auto-detect"',
                '5. Disable "Validate data structure" if enabled',
                '6. Save and test again'
            ]
        },
        401: {
            issue: 'Unauthorized - Authentication issue',
            common_causes: [
                '❌ Webhook URL is incorrect',
                '❌ Webhook was deleted and recreated (new URL needed)'
            ],
            fixes: [
                '1. Go to Make.com → Your scenario',
                '2. Check the webhook URL matches exactly',
                '3. If different, update WEBHOOK_URL environment variable in Vercel'
            ]
        },
        404: {
            issue: 'Not Found - Webhook does not exist',
            common_causes: [
                '❌ Webhook URL is incorrect',
                '❌ Scenario was deleted'
            ],
            fixes: [
                '1. Create new webhook in Make.com',
                '2. Copy the new webhook URL',
                '3. Update WEBHOOK_URL environment variable in Vercel'
            ]
        },
        500: {
            issue: 'Server Error - Make.com internal error',
            common_causes: [
                '❌ Error in one of the scenario modules',
                '❌ Make.com service issue'
            ],
            fixes: [
                '1. Check Make.com scenario execution history for errors',
                '2. Look at which module failed',
                '3. Fix the configuration in that module'
            ]
        }
    };

    return diagnoses[statusCode] || {
        issue: `HTTP ${statusCode} error from Make.com`,
        common_causes: ['Unknown error'],
        fixes: ['Check Make.com scenario execution history for details']
    };
}

// Export for Netlify Functions
export { handler };
