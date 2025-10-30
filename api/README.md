# Assessment Submission API

This serverless function handles secure submission of assessment data to your webhook endpoint (Make.com, Zapier, HubSpot, etc.).

## Features

- **Security**: Hides webhook URL from client-side code
- **Rate Limiting**: Prevents abuse (10 requests/hour per IP by default)
- **Validation**: Validates email, required fields, and data formats
- **Anti-Spam**: Honeypot detection and spam pattern filtering
- **Error Handling**: Graceful error handling with timeout protection
- **Enrichment**: Adds server-side metadata (IP, timestamp, user agent)

## Setup

### Vercel Deployment

1. Deploy your project to Vercel
2. Add environment variables in Vercel dashboard:
   - `WEBHOOK_URL`: Your Make.com/Zapier/HubSpot webhook URL (required)
   - `WEBHOOK_SECRET`: Optional secret key for webhook validation
   - `RATE_LIMIT_MAX`: Max requests per IP per hour (default: 10)

3. The function will be available at: `https://your-domain.com/api/submit-assessment`

### Netlify Deployment

1. Move the file to `/netlify/functions/submit-assessment.js`
2. Add environment variables in Netlify dashboard (same as above)
3. The function will be available at: `https://your-domain.com/.netlify/functions/submit-assessment`

### Local Development

1. Install Vercel CLI: `npm install -g vercel`
2. Create `.env` file:
```
WEBHOOK_URL=your_webhook_url_here
WEBHOOK_SECRET=your_secret_here
RATE_LIMIT_MAX=10
```

3. Run: `vercel dev`
4. Test endpoint: `http://localhost:3000/api/submit-assessment`

## Testing

```bash
# Test submission
curl -X POST http://localhost:3000/api/submit-assessment \
  -H "Content-Type: application/json" \
  -d '{
    "assessment_id": "test_123",
    "name": "John Doe",
    "email": "john@example.com",
    "organization": "Acme Inc",
    "overall_score": 65,
    "preparedness_score": 70,
    "response_score": 60,
    "recovery_score": 65,
    "support_score": 65
  }'
```

## Rate Limiting

Default: 10 requests per hour per IP address

**Important**: The in-memory rate limiter is suitable for development and small sites. For production at scale, use Redis:

```javascript
// Replace in-memory store with Redis
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);
```

## Spam Protection

### Honeypot Fields

Add hidden fields to your HTML form (display: none):

```html
<input type="text" name="website" style="display:none" tabindex="-1" autocomplete="off">
```

Bots will fill these fields, triggering spam detection.

### Adjusting Spam Filters

Edit `validatePayload()` function to customize spam patterns:

```javascript
const spamPatterns = [
    /your-pattern-here/i,
    // Add more patterns
];
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation failed",
  "details": ["Email is required", "Name must be at least 2 characters"]
}
```

### 429 Too Many Requests
```json
{
  "error": "Too many requests",
  "message": "Rate limit exceeded. Please try again after 2024-01-01T12:00:00Z",
  "retryAfter": 3600
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "Failed to process submission. Please try again later."
}
```

## Monitoring

Add monitoring service (e.g., Sentry, LogRocket):

```javascript
import * as Sentry from '@sentry/node';

Sentry.init({ dsn: process.env.SENTRY_DSN });

// In catch block:
Sentry.captureException(error);
```

## Production Checklist

- [ ] Set `WEBHOOK_URL` environment variable
- [ ] Configure rate limiting for your traffic
- [ ] Add honeypot fields to form
- [ ] Test submission flow end-to-end
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Review spam filters and adjust as needed
- [ ] Consider Redis for rate limiting at scale
- [ ] Add logging/analytics
- [ ] Test rate limiting behavior
- [ ] Set up alerts for failed submissions

## Security Considerations

1. **Never expose webhook URL in client code** - Always use this proxy
2. **Use WEBHOOK_SECRET** for additional security if your webhook supports it
3. **Monitor for abuse** - Check logs regularly
4. **Keep rate limits reasonable** - Adjust based on legitimate traffic patterns
5. **Validate all input** - Never trust client-side data
6. **Use HTTPS only** - Ensure all traffic is encrypted

## Webhook Integration

### Make.com

1. Create a new scenario
2. Add "Webhooks > Custom webhook" module
3. Copy the webhook URL
4. Add as `WEBHOOK_URL` environment variable

### Zapier

1. Create a new Zap
2. Choose "Webhooks by Zapier" trigger
3. Select "Catch Hook"
4. Copy the webhook URL
5. Add as `WEBHOOK_URL` environment variable

### HubSpot

1. Go to Settings > Integrations > Private Apps
2. Create a private app with necessary scopes
3. Use HubSpot API endpoint: `https://api.hubapi.com/crm/v3/objects/contacts`
4. Add as `WEBHOOK_URL` with API key in headers
