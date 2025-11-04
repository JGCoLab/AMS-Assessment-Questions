# Vercel Deployment Guide - Aftermath Assessment Tool

Complete guide for deploying your assessment tool to Vercel with secure webhook proxy and reCAPTCHA v3 protection.

---

## ⚠️ TROUBLESHOOTING: "Data Not Being Captured"

**Symptom:** Assessment completes, but data doesn't appear in Make.com/HubSpot/Airtable

**Most Common Cause:** Missing `WEBHOOK_URL` environment variable in Vercel

**Fix:**
1. Open browser console (F12) when testing assessment
2. Look for error: `❌ SUBMISSION FAILED: 500` or `Configuration error`
3. If you see this, go to **Vercel Dashboard** → **Settings** → **Environment Variables**
4. Add `WEBHOOK_URL` = `https://hook.us2.make.com/y7n8tnm51v3hesxlxnn907vhur4iddp9`
5. **IMPORTANT:** Select all 3 environments (Production, Preview, Development)
6. Redeploy: `vercel --prod`

**Verification:** After submitting assessment, console should show `✅ SUBMISSION SUCCESSFUL!`

---

## 🚀 Quick Deployment Steps

### **1. Install Vercel CLI**

```bash
npm install -g vercel
```

### **2. Login to Vercel**

```bash
vercel login
```

Follow the prompts to authenticate.

### **3. Deploy from Local Directory**

```bash
cd /Users/joshgarcia/Development/claude-projects/aftermath-assessment
vercel
```

**Follow the prompts:**
- **Set up and deploy?** `Y`
- **Which scope?** Select your account
- **Link to existing project?** `N`
- **Project name:** `aftermath-assessment` (or your preferred name)
- **Directory:** `./` (current directory)
- **Override settings?** `N`

### **4. Add Environment Variables** ⚠️ **CRITICAL - REQUIRED FOR DATA CAPTURE**

**⚠️ WITHOUT THESE ENVIRONMENT VARIABLES, ASSESSMENT DATA WILL NOT BE SAVED!**

**Via Vercel Dashboard:**

1. Go to: https://vercel.com/dashboard
2. Select your project: `aftermath-assessment`
3. Go to: **Settings** → **Environment Variables**
4. Add the following variables **(ALL ARE REQUIRED)**:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `WEBHOOK_URL` | `https://hook.us2.make.com/y7n8tnm51v3hesxlxnn907vhur4iddp9` | ✅ Production, ✅ Preview, ✅ Development |
| `RECAPTCHA_SECRET_KEY` | `YOUR_RECAPTCHA_SECRET_KEY` | ✅ Production, ✅ Preview, ✅ Development |
| `RATE_LIMIT_MAX` | `10` | ✅ Production, ✅ Preview, ✅ Development |

**✅ IMPORTANT:** Make sure to select ALL THREE environments for each variable (Production, Preview, Development)

**Via Vercel CLI:**

```bash
# Add webhook URL
vercel env add WEBHOOK_URL production
# Paste: https://hook.us2.make.com/y7n8tnm51v3hesxlxnn907vhur4iddp9

# Add reCAPTCHA secret
vercel env add RECAPTCHA_SECRET_KEY production
# Paste: YOUR_RECAPTCHA_SECRET_KEY

# Add rate limit
vercel env add RATE_LIMIT_MAX production
# Type: 10
```

### **5. Deploy to Production**

```bash
vercel --prod
```

### **6. Custom Domain (Optional)**

**Add theaftermathsolutions.com:**

1. Go to: **Settings** → **Domains**
2. Click **Add Domain**
3. Enter: `theaftermathsolutions.com` or `assessment.theaftermathsolutions.com`
4. Follow DNS configuration instructions

**DNS Records Needed:**

For root domain:
```
Type: A
Name: @
Value: 76.76.21.21
```

For subdomain:
```
Type: CNAME
Name: assessment
Value: cname.vercel-dns.com
```

---

## 📊 What Gets Deployed

### **Files:**
- `assessment.html` - Main application
- `/api/submit-assessment.js` - Serverless webhook proxy
- `vercel.json` - Vercel configuration

### **Environment Variables:**
- `WEBHOOK_URL` - Make.com webhook (hidden from client)
- `RECAPTCHA_SECRET_KEY` - reCAPTCHA secret for server-side verification
- `RATE_LIMIT_MAX` - Max submissions per IP per hour

---

## ✅ Verification Checklist

After deployment, verify:

### **1. Test the Assessment**
- [ ] Visit your Vercel URL (e.g., `https://aftermath-assessment.vercel.app`)
- [ ] Complete the full assessment flow
- [ ] Check that results display correctly

### **2. Test Analytics Tracking**
Open browser console (F12) and verify:
- [ ] Google Analytics events fire (`gtag` calls)
- [ ] Meta Pixel events fire (`fbq` calls)
- [ ] LinkedIn events fire (`lintrk` calls)
- [ ] Console shows: `Analytics Event: [event_name]`

### **3. Test reCAPTCHA**
- [ ] Open browser Network tab
- [ ] Complete assessment
- [ ] Look for request to `/api/submit-assessment`
- [ ] Verify payload includes `g-recaptcha-response`

### **4. Test Make.com Integration**
- [ ] Complete a test assessment
- [ ] Check Make.com scenario runs
- [ ] Verify data arrives in Make.com
- [ ] Check reCAPTCHA score is included

### **5. Test Tools**

**Google Analytics:**
- Real-time reports: https://analytics.google.com/
- Look for active users during test

**Meta Pixel:**
- Install Meta Pixel Helper Chrome extension
- Visit assessment page
- Extension should show pixel ID: `1172415091616062`

**LinkedIn:**
- Check LinkedIn Campaign Manager
- Look for pixel activity

**reCAPTCHA:**
- Admin console: https://www.google.com/recaptcha/admin
- Check site key: `6LeBifwrAAAAAPP7daqidrLS870R51IgQEop4GGq`
- Verify requests appear in dashboard

---

## 🔒 Security Features Enabled

✅ **reCAPTCHA v3** - Bot protection with score threshold (0.5)
✅ **Webhook Hidden** - URL only in environment variables
✅ **Rate Limiting** - 10 submissions per IP per hour
✅ **Honeypot Detection** - Hidden fields catch bots
✅ **Input Validation** - Server-side validation before forwarding
✅ **Spam Pattern Detection** - Blocks common spam phrases
✅ **CORS Headers** - Proper cross-origin configuration

---

## 📈 Monitoring & Logs

### **View Logs in Vercel Dashboard**

1. Go to your project dashboard
2. Click **Deployments**
3. Click on latest deployment
4. Click **Functions** tab
5. Click `api/submit-assessment.js`
6. View real-time logs

### **Common Log Messages**

**Good:**
```
✓ reCAPTCHA score: 0.9
✓ Submission forwarded to webhook
```

**Warning:**
```
⚠ Low reCAPTCHA score: 0.3 (blocked)
⚠ Honeypot triggered (blocked)
⚠ Rate limit exceeded (blocked)
```

**Error:**
```
✗ reCAPTCHA verification failed
✗ Webhook URL not configured
✗ Validation failed
```

---

## 🐛 Troubleshooting

### **Issue: Submissions not reaching Make.com**

**Check:**
1. Environment variable `WEBHOOK_URL` is set correctly
2. Make.com webhook is active
3. Check Vercel function logs for errors
4. Test webhook directly with curl:

```bash
curl -X POST https://your-site.vercel.app/api/submit-assessment \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "name": "Test", "organization": "Test Org", "overall_score": 50}'
```

### **Issue: reCAPTCHA always failing**

**Check:**
1. `RECAPTCHA_SECRET_KEY` environment variable is set
2. Site key in HTML matches admin console
3. Check reCAPTCHA admin dashboard for errors
4. Verify domain is authorized in reCAPTCHA settings

### **Issue: Analytics not tracking**

**Check:**
1. Browser ad blockers disabled
2. Console for JavaScript errors
3. Network tab shows requests to analytics services
4. Verify IDs are correct in CONFIG object

### **Issue: CORS errors**

**Check:**
1. `vercel.json` has correct CORS headers
2. Redeploy after adding CORS configuration
3. Check browser console for specific CORS error

---

## 🔄 Making Updates

### **Update Code**

```bash
# Make changes locally
git add .
git commit -m "Update: description of changes"
git push origin main

# Deploy to production
vercel --prod
```

### **Update Environment Variables**

```bash
# Update existing variable
vercel env rm WEBHOOK_URL production
vercel env add WEBHOOK_URL production
# Enter new value

# Redeploy to apply changes
vercel --prod
```

---

## 📊 Analytics Setup (if not done)

### **Google Analytics 4**

Already configured with ID: `G-5N4R0BPSXH`

**Verify:**
- https://analytics.google.com/
- Select property `G-5N4R0BPSXH`
- Check real-time reports

### **Meta Pixel**

Already configured with ID: `1172415091616062`

**Verify:**
- https://business.facebook.com/events_manager
- Select pixel `1172415091616062`
- Use "Test Events" feature

### **LinkedIn Insight Tag**

Already configured with Partner ID: `8248948`

**Verify:**
- https://www.linkedin.com/campaignmanager
- Check pixel status

---

## 🎯 Next Steps After Deployment

### **1. Set up Custom Domain**
- Add `assessment.theaftermathsolutions.com` or use root domain
- Configure DNS records
- Enable HTTPS (automatic with Vercel)

### **2. Configure Make.com Scenario**

**Modules to add:**
1. **Webhook Trigger** (already configured)
2. **Router**: Check `recaptcha_score >= 0.5`
3. **HubSpot**: Create/Update Contact
4. **Airtable**: Create Record
5. **Email**: Send notification to team

### **3. Create Custom Audiences**

**Facebook:**
- Assessment Started: `consent_accepted` event
- Assessment Completed: `assessment_completed` event
- High Intent: `lead_score > 70`

**Google Analytics:**
- Create audiences based on events
- Set up conversion tracking

**LinkedIn:**
- Create matched audiences
- Set up conversion tracking

### **4. A/B Testing**

Add query parameters for testing:
- `?variant=a` - Original
- `?variant=b` - Alternative copy/design

Track variant in analytics events.

### **5. Monitor Performance**

Weekly checks:
- [ ] Submission success rate
- [ ] Average completion time
- [ ] reCAPTCHA scores
- [ ] Drop-off points in funnel
- [ ] Lead quality scores

---

## 📝 Configuration Summary

**Production URL:** https://aftermath-assessment.vercel.app (or your custom domain)

**Analytics:**
- GA4: `G-5N4R0BPSXH`
- Meta Pixel: `1172415091616062`
- LinkedIn: `8248948`

**Security:**
- reCAPTCHA Site Key: `6LeBifwrAAAAAPP7daqidrLS870R51IgQEop4GGq`
- reCAPTCHA Secret: (in environment variables)
- Webhook URL: (in environment variables)

**Repository:** https://github.com/JGCoLab/AMS-Assessment-Questions.git

---

## 🆘 Support

**Vercel Documentation:** https://vercel.com/docs
**Make.com Help:** https://www.make.com/en/help
**reCAPTCHA Docs:** https://developers.google.com/recaptcha/docs/v3

**For Issues:**
- Check Vercel function logs first
- Review Make.com scenario execution logs
- Test reCAPTCHA in admin console
- Verify environment variables are set

---

**Deployment Date:** 2025-01-30
**Version:** 1.0.0
**Status:** Production Ready ✅
