# 🚀 GO LIVE CHECKLIST - Let's Generate Revenue!

Complete step-by-step guide to deploy your assessment and start booking consultations!

---

## 📋 PRE-FLIGHT CHECKLIST

Before deploying, make sure you have:

- [ ] **reCAPTCHA Secret Key** (from Google reCAPTCHA admin console)
- [ ] **Make.com Webhook URL**: `https://hook.us2.make.com/y7n8tnm51v3hesxlxnn907vhur4iddp9`
- [ ] **Vercel Account** (free tier works!)
- [ ] **GitHub repo** is up to date (run `git pull`)
- [ ] **HubSpot account** ready for Make.com integration

---

## 🎯 STEP 1: Deploy to Vercel (5 minutes)

### Option A: Deploy via Vercel CLI (Recommended)

```bash
# 1. Install Vercel CLI (if you haven't already)
npm install -g vercel

# 2. Login to Vercel
vercel login
# Follow the prompts to authenticate

# 3. Navigate to your project
cd /Users/joshgarcia/Development/claude-projects/aftermath-assessment

# 4. Deploy to production
vercel --prod
```

**Follow the prompts:**
- **Set up and deploy?** → `Y`
- **Which scope?** → Select your account
- **Link to existing project?** → `N` (or `Y` if you already created one)
- **Project name?** → `aftermath-assessment` (or your choice)
- **Directory?** → `./ ` (just press Enter)
- **Override settings?** → `N`

### Option B: Deploy via Vercel Dashboard

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Paste your repo URL: `https://github.com/JGCoLab/AMS-Assessment-Questions.git`
4. Click **"Import"**
5. Keep default settings
6. Click **"Deploy"**

---

## 🔐 STEP 2: Add Environment Variables in Vercel (2 minutes)

### Via Vercel Dashboard:

1. Go to https://vercel.com/dashboard
2. Select your project: **aftermath-assessment**
3. Go to **Settings** → **Environment Variables**
4. Add these 3 variables:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `WEBHOOK_URL` | `https://hook.us2.make.com/y7n8tnm51v3hesxlxnn907vhur4iddp9` | Production, Preview, Development |
| `RECAPTCHA_SECRET_KEY` | `YOUR_SECRET_KEY_HERE` | Production, Preview, Development |
| `RATE_LIMIT_MAX` | `10` | Production, Preview, Development |

**To get your reCAPTCHA Secret Key:**
1. Go to https://www.google.com/recaptcha/admin
2. Find your site: `6LeBifwrAAAAAPP7daqidrLS870R51IgQEop4GGq`
3. Copy the **Secret Key** (not the site key!)
4. Paste it in Vercel

5. **Click "Save"** for each variable

### Via Vercel CLI (Alternative):

```bash
# Add webhook URL
vercel env add WEBHOOK_URL production
# When prompted, paste: https://hook.us2.make.com/y7n8tnm51v3hesxlxnn907vhur4iddp9

# Add reCAPTCHA secret
vercel env add RECAPTCHA_SECRET_KEY production
# When prompted, paste your secret key

# Add rate limit
vercel env add RATE_LIMIT_MAX production
# When prompted, type: 10
```

---

## 🔄 STEP 3: Redeploy After Adding Environment Variables (1 minute)

Environment variables won't work until you redeploy!

### Via CLI:
```bash
vercel --prod
```

### Via Dashboard:
1. Go to your project in Vercel
2. Click **"Deployments"** tab
3. Find latest deployment → Click **"..."** → **"Redeploy"**
4. Check **"Use existing Build Cache"** → Click **"Redeploy"**

---

## ⚙️ STEP 4: Set Up Make.com Scenario (10 minutes)

### 4.1 Create New Scenario

1. Log in to https://www.make.com
2. Click **"Create a new scenario"**
3. Name it: **"Aftermath Assessment → HubSpot Pipeline"**

### 4.2 Add Webhooks Module (Entry Point)

1. Click the **"+"** to add first module
2. Search for **"Webhooks"**
3. Select **"Custom webhook"**
4. Click **"Create a webhook"**
5. Name it: **"Aftermath Assessment Submissions"**
6. **IMPORTANT:** Your webhook URL should be:
   ```
   https://hook.us2.make.com/y7n8tnm51v3hesxlxnn907vhur4iddp9
   ```
7. This should match the URL already in your `/api/submit-assessment.js` file
8. Click **"Save"**

### 4.3 Test the Webhook

1. Click **"Run Once"** in Make.com
2. Open a new tab and complete your assessment at your Vercel URL
3. Check Make.com - you should see the test data appear!

**Example data you'll receive:**
```json
{
  "assessment_id": "assess_1234567890_abc123",
  "name": "John Smith",
  "email": "john@school.org",
  "organization": "Lincoln Middle School",
  "overall_score": 73,
  "preparedness_score": 58,
  "response_score": 67,
  "recovery_score": 81,
  "support_score": 75,
  "lead_score": 82,
  "wants_consultation": true,
  "wants_newsletter": false,
  "recaptcha_score": 0.9
}
```

### 4.4 Add Filter for Bot Protection

1. Click **"+"** after webhook
2. Search **"Router"**
3. Add **"Router"**
4. Add filter condition:
   - **Label:** "Human Traffic Only"
   - **Condition:** `recaptcha_score` **greater than or equal to** `0.5`
5. Click **"OK"**

### 4.5 Add HubSpot Create/Update Contact

1. After the Router, click **"+"**
2. Search **"HubSpot"**
3. Select **"Create/Update a Contact"**
4. Connect your HubSpot account (if not already connected)
5. Map fields:

| HubSpot Field | Make.com Value |
|--------------|----------------|
| Email | `{{email}}` |
| First Name | `{{name}}` (you may need to split this) |
| Company | `{{organization}}` |
| Website | Leave blank or map if you have it |

6. Click **"Show advanced settings"**
7. Add **Custom Properties** (you'll need to create these in HubSpot first - see Step 4.6):

| Property | Value |
|----------|-------|
| `assessment_score` | `{{overall_score}}` |
| `preparedness_score` | `{{preparedness_score}}` |
| `response_score` | `{{response_score}}` |
| `recovery_score` | `{{recovery_score}}` |
| `support_score` | `{{support_score}}` |
| `lead_score` | `{{lead_score}}` |
| `assessment_id` | `{{assessment_id}}` |
| `wants_consultation` | `{{wants_consultation}}` |
| `wants_newsletter` | `{{wants_newsletter}}` |
| `recaptcha_score` | `{{recaptcha_score}}` |

### 4.6 Create HubSpot Custom Properties

Before mapping, create these properties in HubSpot:

1. Go to **HubSpot** → **Settings** → **Properties** → **Contact Properties**
2. Click **"Create property"** for each:

| Property Name | Label | Field Type | Description |
|--------------|-------|-----------|-------------|
| `assessment_score` | Assessment Score | Number | Overall resilience score |
| `preparedness_score` | Preparedness Score | Number | Preparedness dimension |
| `response_score` | Response Score | Number | Response capability |
| `recovery_score` | Recovery Score | Number | Recovery planning |
| `support_score` | Support Score | Number | Support systems |
| `lead_score` | Lead Quality Score | Number | Calculated lead quality (0-100) |
| `assessment_id` | Assessment ID | Single-line text | Unique assessment identifier |
| `wants_consultation` | Wants Consultation | Single checkbox | Requested consultation |
| `wants_newsletter` | Wants Newsletter | Single checkbox | Newsletter opt-in |
| `recaptcha_score` | reCAPTCHA Score | Number | Bot detection score |

### 4.7 Add Conditional Workflows (Revenue Generators!)

#### Route 1: Hot Leads (Wants Consultation)

1. Add another route from the Router
2. Add filter: `wants_consultation` **equals** `true`
3. Add **HubSpot → Add Contact to List**
   - List: Create a list called **"Hot Leads - Consultation Requested"**
4. Add **Email → Send Email** (optional)
   - To: `{{email}}`
   - Subject: "Let's discuss your resilience assessment results"
   - Body: Include booking link from `CONFIG.bookingURL`

#### Route 2: Newsletter Signups (Auto-Add to Mailchimp!) 📬

**RECOMMENDED SETUP - Mailchimp Auto-Add:**

1. Add another route from the Router
2. Add filter: `wants_newsletter` **equals** `true`
3. Add **Mailchimp → Add/Update Subscriber**
   - **Connection**: Connect your Mailchimp account (click "Add" if first time)
   - **List**: Select your newsletter list (or create "Aftermath Assessment Subscribers")
   - **Email Address**: `{{email}}`
   - **Status**: `Subscribed`
   - **Merge Fields** (optional but recommended):
     - `FNAME`: `{{name}}` (or split first name if you have it)
     - `ORG`: `{{organization}}`
     - `LEADSCORE`: `{{lead_score}}`
   - **Tags**: Add tag "assessment-completed" for segmentation
   - **Double Opt-In**: Set to `No` (they already opted in via assessment)

4. **ALSO** Add **HubSpot → Add Contact to List** in the same route
   - List: Create a list called **"Newsletter Subscribers"**
   - This keeps HubSpot in sync with Mailchimp

**Alternative: ActiveCampaign or Other ESP**
- Use the same logic: Filter by `wants_newsletter = true`
- Connect your ESP module
- Map email, name, organization
- Add tags for segmentation

**Why This Matters:**
- ✅ Automatic list building - no manual work!
- ✅ Immediate nurture sequence starts
- ✅ Segmentation by lead score (send different content to hot leads)
- ✅ Tag allows you to send assessment-specific campaigns

#### Route 3: High Lead Score (Score ≥ 70)

1. Add another route from the Router
2. Add filter: `lead_score` **greater than or equal to** `70`
3. Add **Email → Send to Team**
   - To: `your-sales-team@email.com`
   - Subject: "🔥 High-Quality Lead Alert: {{organization}}"
   - Body: Include contact info and scores

### 4.8 Add Airtable Backup & Verification System

**Purpose:** Backup all assessment data and verify HubSpot data integrity

**IMPORTANT:** HubSpot remains your PRIMARY CRM. Airtable is for backup/redundancy only.

**See detailed guide:** `AIRTABLE-ASSESSMENT-TRACKING-SYSTEM.md`

**Quick setup (10 minutes):**

1. **Access Airtable Base:**
   - Base already created: "Lead Pipeline Dashboard"
   - Base ID: `appt66MN9uPoEOriV`
   - 6 tables already configured (see guide)

2. **Add Airtable Module in Make.com:**
   - After HubSpot module, click **"+"**
   - Search: **"Airtable"**
   - Select: **"Create a Record"**
   - Connect your Airtable account
   - Base: "Lead Pipeline Dashboard"
   - Table: "📊 Assessment Raw Data"
   - Map all fields - see AIRTABLE-ASSESSMENT-TRACKING-SYSTEM.md

3. **Test:**
   - Run scenario with test data
   - Check Airtable for new record
   - Verify HubSpot link works
   - Compare data between HubSpot and Airtable

**Benefits:**
- ✅ Complete backup if HubSpot data is lost
- ✅ Team dashboard without HubSpot licenses
- ✅ Easy reporting and exports

### 4.9 (OPTIONAL) Add Claude AI Report Generator

Follow instructions in `MAKE-COM-CLAUDE-REPORT-TEMPLATE.md` to add AI-powered discovery call prep.

**Quick setup:**
1. Add **HTTP → Make a Request** after HubSpot module
2. URL: `https://api.anthropic.com/v1/messages`
3. Method: `POST`
4. Headers:
   - `x-api-key`: Your Anthropic API key
   - `anthropic-version`: `2023-06-01`
   - `content-type`: `application/json`
5. Body: Use the prompt template from the file
6. Parse response and add to HubSpot contact notes

### 4.10 Save & Activate Scenario

1. Click **"Save"** (floppy disk icon)
2. Toggle **"Scheduling"** to **ON**
3. Set to run: **"Immediately as data arrives"**
4. Click **"Activate scenario"**

---

## ✅ STEP 5: Test Everything (5 minutes)

### Test Checklist:

1. **Complete Assessment End-to-End**
   - [ ] Go to your Vercel URL: `https://your-project.vercel.app`
   - [ ] Complete entire assessment with test data
   - [ ] Check that reCAPTCHA badge appears
   - [ ] Submit assessment

2. **Verify Results Display**
   - [ ] Scores display correctly
   - [ ] Equation box shows all 4 dimensions
   - [ ] Radar chart renders
   - [ ] Critical Factors show up
   - [ ] Service recommendation appears
   - [ ] **CTA text is DARK and readable** ✓
   - [ ] Q&A section is **HIDDEN on screen** ✓

3. **Test PDF Export**
   - [ ] Click "📄 Download PDF Report" button
   - [ ] PDF shows from **top of page** (not middle!)
   - [ ] PDF includes: scores, chart, Q&A, gaps, recommendations
   - [ ] Legal disclaimer appears at bottom
   - [ ] Branding looks professional

4. **Verify Make.com Receives Data**
   - [ ] Check Make.com scenario execution history
   - [ ] Verify data looks correct
   - [ ] Check that all fields mapped properly

5. **Check HubSpot**
   - [ ] Contact was created/updated
   - [ ] Custom properties populated
   - [ ] Lead score visible
   - [ ] Contact added to correct lists (if they selected newsletter/consultation)

6. **Check Airtable** (if you set it up)
   - [ ] New record appears in "Assessment Raw Data" table
   - [ ] All fields populated correctly
   - [ ] HubSpot link works
   - [ ] Timestamp shows correct date/time

7. **Test Analytics Tracking**
   - [ ] Open browser console (F12)
   - [ ] Check for analytics events firing:
     - `consent_accepted`
     - `question_answered`
     - `assessment_completed`
   - [ ] Verify Google Analytics real-time shows your test
   - [ ] Check Meta Pixel Helper (Chrome extension) shows events

---

## 🌐 STEP 6: Add Custom Domain (Optional - 5 minutes)

### Using theaftermathsolutions.com or subdomain:

1. In Vercel Dashboard → **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter: `assessment.theaftermathsolutions.com` (or root domain)
4. Follow DNS instructions provided by Vercel

**DNS Records to Add (at your domain registrar):**

For subdomain:
```
Type: CNAME
Name: assessment
Value: cname.vercel-dns.com
```

For root domain:
```
Type: A
Name: @
Value: 76.76.21.21
```

5. Wait 24-48 hours for DNS propagation (usually faster!)

---

## 📊 STEP 7: Monitor & Optimize (Ongoing)

### Daily Monitoring:

1. **HubSpot Dashboard**
   - Check new contacts from assessment
   - Review lead scores
   - Follow up with `wants_consultation = true`

2. **Make.com Execution History**
   - Verify scenarios running successfully
   - Check for errors
   - Monitor submission volume

3. **Vercel Analytics**
   - Monitor page views
   - Check function execution logs
   - Watch for errors in `/api/submit-assessment`

4. **Google Analytics**
   - Track conversion rate (assessment completions)
   - Identify drop-off points
   - Monitor traffic sources

### Weekly Review:

- **Consultation Booking Rate**: How many leads → consultations?
- **Lead Quality**: Average lead score?
- **Bot Traffic**: Average reCAPTCHA score (should be > 0.7)
- **Completion Rate**: How many start vs. finish?

---

## 🎉 SUCCESS METRICS

You'll know it's working when:

✅ **Assessments submitting** to Make.com without errors
✅ **Contacts appearing** in HubSpot with correct data
✅ **Lead scores calculating** accurately (0-100 range)
✅ **Hot leads flagged** when `wants_consultation = true`
✅ **Newsletter signups** added to your email list
✅ **PDF exports** working with full content
✅ **Analytics tracking** all user actions
✅ **reCAPTCHA blocking** bots (scores < 0.5 rejected)

---

## 🚨 Troubleshooting

### Issue: Submissions not reaching Make.com

**Check:**
1. `WEBHOOK_URL` environment variable set correctly in Vercel
2. Make.com webhook is active (green toggle)
3. Vercel function logs: **Deployments** → **Functions** → `api/submit-assessment`
4. reCAPTCHA score not too low (< 0.5)

**Fix:**
```bash
# Verify webhook URL
vercel env ls

# If wrong, update it
vercel env rm WEBHOOK_URL production
vercel env add WEBHOOK_URL production
# Paste: https://hook.us2.make.com/y7n8tnm51v3hesxlxnn907vhur4iddp9

# Redeploy
vercel --prod
```

### Issue: PDF showing from middle of page

**This should be FIXED now!** The `printPDFReport()` function scrolls to top.

If still happening:
- Clear browser cache
- Try in incognito mode
- Verify you deployed the latest commit: `ab1e039` or later

### Issue: Grey text hard to read

**This should be FIXED now!** All CTA text changed to dark colors.

Verify latest commit deployed: Should be the one you're about to make.

### Issue: reCAPTCHA always failing

**Check:**
1. `RECAPTCHA_SECRET_KEY` environment variable is set
2. Secret key matches your site key: `6LeBifwrAAAAAPP7daqidrLS870R51IgQEop4GGq`
3. Domain authorized in reCAPTCHA admin console
4. Check reCAPTCHA admin: https://www.google.com/recaptcha/admin

### Issue: HubSpot not receiving data

**Check:**
1. Make.com scenario is **active** (green toggle)
2. HubSpot custom properties exist
3. HubSpot connection is valid in Make.com
4. Check Make.com execution history for error messages

---

## 🎯 NEXT STEPS AFTER DEPLOYMENT

1. **Share the link** with your team for testing
2. **Add to your website** with a button/link
3. **Promote on social media** to drive traffic
4. **Email your list** to announce the assessment
5. **Set up email sequences** for nurture campaigns
6. **Train your team** on following up with hot leads
7. **Monitor HubSpot daily** for new leads and follow-up needs (Airtable for weekly verification)
8. **Review weekly metrics** in "Conversion Funnel" and "Monthly Summary" tabs

---

## 📞 SUPPORT RESOURCES

- **Vercel Docs**: https://vercel.com/docs
- **Make.com Help**: https://www.make.com/en/help
- **HubSpot Academy**: https://academy.hubspot.com
- **reCAPTCHA Docs**: https://developers.google.com/recaptcha/docs/v3

---

## 🎊 YOU'RE READY TO GO LIVE!

### Final Pre-Launch Checklist:

- [ ] Vercel deployed with environment variables
- [ ] Make.com scenario active
- [ ] HubSpot custom properties created
- [ ] Airtable backup system created and connected
- [ ] Test submission completed successfully
- [ ] PDF export working
- [ ] CTA text is dark and readable
- [ ] Analytics tracking verified
- [ ] Team trained on follow-up process
- [ ] Airtable base shared with team members

### Launch Command:

```bash
# Make sure you're on latest code
git pull origin main

# Deploy to production
vercel --prod

# 🚀 YOU'RE LIVE!
```

---

**Generated:** 2025-01-30
**Version:** 1.0
**Status:** READY TO ROCK! 🎸

**Let's Goooooo!!! Party!** 🎉🎊🚀
