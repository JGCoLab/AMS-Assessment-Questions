# Troubleshooting Guide - Aftermath Assessment

**Last Updated:** November 3, 2025

---

## 🔍 Quick Diagnostics

### **Issue 1: "Nothing is clickable on Vercel preview link"**

**Symptom:** When clicking "Visit" in Vercel, page loads but buttons don't work

**Cause:** Browser console errors or routing issues

**Fix:**

1. **Open browser console** (F12 or right-click → Inspect → Console tab)
2. **Look for red errors** in the console
3. **Try these URLs instead:**
   - `https://your-project.vercel.app/` (root - redirects to assessment)
   - `https://your-project.vercel.app/assessment.html` (direct file)
   - `https://assessment.aftermathsolutions.com` (custom domain)

4. **Common console errors and fixes:**

| Error | Cause | Fix |
|-------|-------|-----|
| `Failed to load resource: /api/submit-assessment` | Environment variable missing | Add WEBHOOK_URL (see below) |
| `grecaptcha is not defined` | reCAPTCHA blocked by ad blocker | Disable ad blocker for testing |
| `Chart is not defined` | Chart.js failed to load | Check network tab, ensure CDN accessible |
| `Consent required` | Tried to start without clicking consent | Click "I Agree" checkbox first |

---

### **Issue 2: "Data not reaching Make.com/HubSpot/Airtable"**

**Symptom:** Assessment completes, results display, but data doesn't appear in your systems

**Cause:** Missing `WEBHOOK_URL` environment variable in Vercel

**Quick Test:**

1. Visit: `https://your-project.vercel.app/api/test-webhook`
2. You should see JSON response like:
```json
{
  "status": "Test Endpoint",
  "environment_variables": {
    "WEBHOOK_URL": "✅ SET",
    "RECAPTCHA_SECRET_KEY": "✅ SET",
    "RATE_LIMIT_MAX": "✅ SET (10)"
  },
  "all_required_vars_set": true
}
```

3. If you see `"WEBHOOK_URL": "❌ MISSING"` → **Follow Fix Below**

**Fix: Add Environment Variables**

1. Go to: https://vercel.com/dashboard
2. Click your project: `aftermath-assessment` or `ams-assessment-tool`
3. Click: **Settings** → **Environment Variables**
4. Click: **Add New Variable**

**Add Variable #1:**
```
Name: WEBHOOK_URL
Value: https://hook.us2.make.com/y7n8tnm51v3hesxlxnn907vhur4iddp9
Environments: ✅ Production  ✅ Preview  ✅ Development
```

**Add Variable #2:**
```
Name: RECAPTCHA_SECRET_KEY
Value: [Your reCAPTCHA v3 secret key from Google]
Environments: ✅ Production  ✅ Preview  ✅ Development
```

**Add Variable #3 (Optional):**
```
Name: RATE_LIMIT_MAX
Value: 10
Environments: ✅ Production  ✅ Preview  ✅ Development
```

5. **CRITICAL:** After adding variables, you MUST redeploy:
   - Click **Deployments** tab
   - Click **...** menu on latest deployment
   - Click **Redeploy**
   - Wait for deployment to complete (~2 min)

**OR** redeploy via CLI:
```bash
cd /Users/joshgarcia/Development/claude-projects/aftermath-assessment
vercel --prod
```

---

## 🧪 Testing Data Submission

**After redeploying with environment variables:**

1. Open assessment at your custom domain: https://assessment.aftermathsolutions.com
2. **Open browser console** (F12)
3. Complete a test assessment
4. **Watch console for these messages:**

**✅ SUCCESS - You should see:**
```
=== WEBHOOK SUBMISSION DEBUG ===
Webhook Data: {assessment_id: "assess_1730...", name: "Test User", ...}
Submit URL: /api/submit-assessment
Sending submission to: /api/submit-assessment
✅ SUBMISSION SUCCESSFUL!
Response: {success: true, message: "Assessment submitted successfully", ...}
```

**❌ FAILURE - Common errors:**

**Error #1: 500 - Configuration error**
```
❌ SUBMISSION FAILED: 500
Error details: {error: "Configuration error", message: "Webhook URL not configured"}
```
→ **Fix:** WEBHOOK_URL environment variable not set. Add it and redeploy.

**Error #2: 429 - Rate limit**
```
❌ SUBMISSION FAILED: 429
Error details: {error: "Too many requests"}
```
→ **Fix:** You've submitted too many times. Wait 1 hour or increase RATE_LIMIT_MAX.

**Error #3: 400 - Validation error**
```
❌ SUBMISSION FAILED: 400
Error details: {error: "Validation failed", details: ["Email is required"]}
```
→ **Fix:** Form validation issue. Make sure you filled out all required fields.

---

## 🔧 Verifying Make.com Integration

### **Quick Test: Is Make.com Working?**

**Visit this diagnostic endpoint:**
```
https://assessment.aftermathsolutions.com/api/test-make-webhook
```

**This will:**
- Send test data directly to Make.com
- Show you the exact error Make.com returns
- Give you specific fix instructions

---

### **Common Error: 400 Bad Request from Make.com**

**Vercel logs show:**
```
Webhook error: 400 Bad Request
Submission error: Error: Webhook returned 400
```

**This means:** Make.com is receiving data but rejecting it.

**MOST COMMON CAUSE:** Scenario is OFF

**Fix #1: Turn Scenario ON**
1. Go to: https://www.make.com/
2. Find your "Aftermath Assessment" scenario
3. Look at toggle switch in **top right corner**
4. If it's OFF (gray/red), click it to turn it **ON** (green/blue)
5. Test submission again

**Fix #2: Disable JSON Validation in Webhook**

If scenario IS on and still getting 400:

1. Go to Make.com → Your scenario
2. Click the **Webhook module** (first bubble)
3. Click **"Show advanced settings"**
4. Find **"Data structure"**:
   - If set to something specific → Change to **"Not selected"**
   - Or click **"Auto-detect"**
5. Find **"Validate data structure"**:
   - If enabled → **Disable it**
6. Click **"OK"**
7. Click **"Save"** (bottom right)
8. Test submission again

**Fix #3: Remove Filters That Block Data**

1. Check if there's a **Router** or **Filter** after webhook
2. Click the filter icon (funnel) between modules
3. Temporarily set filter to: **"All"** (to let all data through)
4. Test submission
5. If it works, adjust your filter conditions

---

### **After successful submission (console shows ✅):**

1. Go to: https://www.make.com/
2. Click your scenario
3. Click **History** tab (left sidebar)
4. You should see a new execution within 1-2 seconds
5. Click the execution to see the data received

**If Make.com shows NO execution:**

1. Scenario is probably **OFF** → Turn it ON
2. Check webhook URL is correct: `https://hook.us2.make.com/y7n8tnm51v3hesxlxnn907vhur4iddp9`
3. Test webhook with diagnostic: Visit `/api/test-make-webhook`

**If Make.com shows execution with ERROR:**

- Click the execution to see error details
- Common issues:
  - HubSpot authentication expired → Reconnect HubSpot
  - Airtable permissions → Verify Airtable connection
  - Missing field mapping → Check MAKE-COM-SETUP-GUIDE.md
  - Required field missing → Adjust module configuration

---

## 🌐 Domain Configuration Issues

**Custom domain not working:** `assessment.aftermathsolutions.com`

**Check DNS settings:**

1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Verify DNS record exists:
   ```
   Type: CNAME
   Name: assessment
   Value: cname.vercel-dns.com
   TTL: Automatic or 3600
   ```

3. DNS propagation can take 24-48 hours
4. Test DNS: https://dnschecker.org/#CNAME/assessment.aftermathsolutions.com

**Vercel shows domain not configured:**

1. Vercel Dashboard → **Settings** → **Domains**
2. Click **Add Domain**
3. Enter: `assessment.aftermathsolutions.com`
4. Follow verification steps

---

## 📄 PDF Print Issues

**PDF shows only "Next Steps" section:**

**Cause:** Results page not fully rendering before print

**Fix:**

1. Let results page fully load (wait 2-3 seconds)
2. Scroll through entire results page before clicking PDF
3. Open browser console and check for JavaScript errors
4. Ensure Chart.js loaded (check radar chart displays)

**PDF missing sections:**

1. Check browser print preview settings:
   - Background graphics: **ON**
   - Margins: **Default** or **Minimum**
   - Scale: **100%**

2. Try different browser:
   - Chrome/Edge: Best PDF support
   - Firefox: Good
   - Safari: May have issues with some CSS

---

## 🚨 Emergency Debugging Checklist

If nothing else works, go through this checklist:

### **1. Browser Console Check**
- [ ] Open F12 console
- [ ] Click "Console" tab
- [ ] Look for red errors
- [ ] Screenshot errors and review

### **2. Network Tab Check**
- [ ] Open F12 → Network tab
- [ ] Complete assessment
- [ ] Look for `/api/submit-assessment` request
- [ ] Check if it's red (failed) or green (success)
- [ ] Click it to see response details

### **3. Environment Variables**
- [ ] Visit `/api/test-webhook`
- [ ] Verify all show ✅ SET
- [ ] If missing, add in Vercel dashboard
- [ ] Redeploy after adding

### **4. Make.com Scenario**
- [ ] Scenario is **ON** (not paused)
- [ ] Webhook URL matches exactly
- [ ] Test with direct curl command
- [ ] Check execution history

### **5. HubSpot Connection**
- [ ] Make.com → HubSpot module → Reconnect
- [ ] Verify HubSpot properties exist
- [ ] Check field mapping

### **6. Airtable Connection**
- [ ] Make.com → Airtable module → Reconnect
- [ ] Verify Airtable base ID correct
- [ ] Check table and field names match

---

## 📞 Getting Help

**If you're still stuck:**

1. **Collect this information:**
   - Console output (screenshot or copy/paste)
   - Network tab showing failed requests
   - `/api/test-webhook` response
   - Make.com execution history screenshot

2. **Check these files:**
   - `VERCEL-DEPLOYMENT.md` - Full deployment guide
   - `MAKE-COM-SETUP-GUIDE.md` - Make.com configuration
   - `README.md` - Project overview

3. **Common solutions:**
   - 90% of issues = missing WEBHOOK_URL environment variable
   - 5% of issues = Make.com scenario is OFF
   - 3% of issues = DNS not propagated for custom domain
   - 2% of issues = HubSpot/Airtable authentication expired

---

## ✅ Success Criteria

**You know everything is working when:**

1. ✅ Assessment loads at all URLs (Vercel + custom domain)
2. ✅ Buttons are clickable and questions advance
3. ✅ Browser console shows: `✅ SUBMISSION SUCCESSFUL!`
4. ✅ Make.com execution appears in history
5. ✅ Contact created in HubSpot
6. ✅ Record created in Airtable
7. ✅ Email sent (if configured)
8. ✅ Results page displays completely
9. ✅ PDF download includes all sections

---

**Last Updated:** November 3, 2025
**Version:** 2.0
