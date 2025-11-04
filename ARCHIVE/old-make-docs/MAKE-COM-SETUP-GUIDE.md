# Make.com Setup Guide - Connect Assessment to HubSpot Properties

**Status:** HubSpot properties already created ✅
**Next Step:** Connect via Make.com automation
**Time Required:** 30-45 minutes

---

## 🎯 WHAT WE'RE BUILDING

**Data Flow:**
```
Assessment Completed → Make.com Webhook → HubSpot Contact Created/Updated → Mailchimp Added → Team Notified
```

**What Gets Mapped:**
- All assessment scores → Your custom HubSpot properties
- Contact info → Standard HubSpot fields
- Preferences (newsletter, consultation) → Flags in HubSpot
- Auto-routing based on lead score

---

## 📋 SECTION 1: MAKE.COM SCENARIO SETUP

### Step 1: Create New Scenario

1. Log into https://www.make.com
2. Click **"Create a new scenario"**
3. Name it: **"Aftermath Assessment → HubSpot Pipeline"**
4. Click **"Continue"**

---

### Step 2: Add Webhook Module (Already Exists!)

**You already have this webhook:**
```
https://hook.us2.make.com/y7n8tnm51v3hesxlxnn907vhur4iddp9
```

**If it's not in this scenario yet:**

1. Click **"+"** to add first module
2. Search: **"Webhooks"**
3. Select: **"Custom webhook"**
4. Choose: **"Use existing webhook"**
5. Select your webhook from dropdown
6. Click **"OK"**

**Test the webhook:**
1. Click **"Run once"** in Make.com
2. Go to your assessment: `https://your-vercel-url.vercel.app`
3. Complete assessment with test data
4. Return to Make.com - you should see the data!

**Sample data you'll receive:**
```json
{
  "assessment_id": "assess_1706630400_abc123",
  "name": "Sarah Johnson",
  "email": "sarah@lincolnmiddle.edu",
  "organization": "Lincoln Middle School",
  "role": "Principal",
  "org_info": "k12_education",
  "org_info_other": null,
  "overall_score": 73,
  "preparedness_score": 58,
  "response_score": 67,
  "recovery_score": 81,
  "support_score": 75,
  "lead_score": 82,
  "gap_level": "significant",
  "wants_consultation": true,
  "wants_newsletter": true,
  "wants_training": false,
  "wants_resources": true,
  "recaptcha_score": 0.9,
  "crisis_experience_ever": "yes",
  "crisis_timeline": "within_6_months",
  "timeline_focus": "before",
  "top_gaps": ["Preparedness", "Response Capability"],
  "recommended_tier": "TIER 2: Strategic Intensives",
  "recommended_service": "Crisis Preparedness Assessment & Implementation"
}
```

---

### Step 3: Add Bot Filter (Router)

**Purpose:** Block spam/bots (reCAPTCHA score < 0.5)

1. Click **"+"** after webhook module
2. Search: **"Router"**
3. Select: **"Router"**
4. Click **"OK"**

**Configure Route 1 (Human Traffic):**
1. Click **"Set filter"** on first route
2. Label: **"Human Traffic Only"**
3. Condition:
   - Field: `recaptcha_score`
   - Operator: **Numeric: Greater than or equal to**
   - Value: `0.5`
4. Click **"OK"**

**Add Route 2 (Spam Log - Optional):**
1. Click **"Add route"**
2. Label: **"Spam/Bot Traffic"**
3. Leave as fallback (no filter)
4. Add **Airtable** module to log spam submissions (for monitoring)
5. We'll focus on Route 1 for now

---

## 🎯 SECTION 2: HUBSPOT CONTACT MODULE

### Step 4: Add HubSpot "Create or Update Contact"

**On Route 1 (Human Traffic):**

1. Click **"+"** after Router (on Route 1)
2. Search: **"HubSpot"**
3. Select: **"CRM"** category
4. Choose: **"Create or Update a Contact"**
5. Click **"Create a connection"**

**Connect HubSpot:**
1. Click **"Add"**
2. Select connection type: **"OAuth 2.0"**
3. Click **"Sign in with HubSpot"**
4. Log into your HubSpot account
5. Click **"Authorize"**
6. Back in Make.com, click **"Save"**

---

### Step 5: Map Standard Fields

**Required HubSpot Fields:**

| HubSpot Field | Make.com Value (from webhook) |
|--------------|-------------------------------|
| **Email** | `{{1.email}}` |
| **First Name** | `{{1.name}}` |
| **Company** | `{{1.organization}}` |
| **Job Title** | `{{1.role}}` |

**How to map:**
1. Click in the **Email** field
2. Click field from webhook data (on right panel)
3. Select `email`
4. Repeat for each field above

**Pro Tip:**
- If `name` contains full name (first + last), you may need to split it
- For now, just map entire name to "First Name"
- We can enhance later

---

### Step 6: Map Custom Properties (THE IMPORTANT PART!)

**Click "Show advanced settings" in the HubSpot module**

Scroll to **"Additional Properties"** section.

**Map these EXACTLY as shown below:**

#### Assessment Properties:

| HubSpot Property Internal Name | Make.com Value | Notes |
|-------------------------------|----------------|-------|
| `assessment_score` | `{{1.overall_score}}` | Overall resilience score (0-100) |
| `preparedness_score` | `{{1.preparedness_score}}` | P dimension |
| `response_score` | `{{1.response_score}}` | R dimension |
| `recovery_score` | `{{1.recovery_score}}` | RC dimension |
| `support_score` | `{{1.support_score}}` | S dimension |
| `lead_score` | `{{1.lead_score}}` | Lead quality (0-100) |
| `assessment_id` | `{{1.assessment_id}}` | Unique ID |
| `gap_level` | `{{1.gap_level}}` | critical/significant/moderate/minor |
| `recaptcha_score` | `{{1.recaptcha_score}}` | Bot protection score |

#### Contact Classification:

| HubSpot Property | Make.com Value | Notes |
|-----------------|----------------|-------|
| `contact_type` | See formula below | Calculated based on lead_score |
| `org_type` | `{{1.org_info}}` | k12_education, higher_ed, etc. |
| `contact_source` | `Assessment - Organic` | Static value |
| `lead_stage` | See formula below | Calculated based on wants_consultation |

#### Engagement Flags:

| HubSpot Property | Make.com Value | Notes |
|-----------------|----------------|-------|
| `wants_consultation` | `{{1.wants_consultation}}` | Boolean: true/false |
| `wants_newsletter` | `{{1.wants_newsletter}}` | Boolean: true/false |

#### Crisis Experience:

| HubSpot Property | Make.com Value | Notes |
|-----------------|----------------|-------|
| `crisis_experience_level` | `{{1.crisis_experience_ever}}` | yes/no |
| `crisis_timeline` | `{{1.crisis_timeline}}` | when crisis occurred |

#### Service Recommendations:

| HubSpot Property | Make.com Value | Notes |
|-----------------|----------------|-------|
| `recommended_service` | `{{1.recommended_service}}` | Service name from assessment |
| `recommended_tier` | `{{1.recommended_tier}}` | TIER 1/2/3 |

---

### Step 7: Calculated Properties (Using Make.com Formulas)

**For `contact_type`** (based on lead_score):

1. In HubSpot module, find `contact_type` property
2. Click formula icon (fx)
3. Use this formula:

```javascript
{{if(1.lead_score >= 70; "Prospect - Hot (A+)"; if(1.lead_score >= 50; "Prospect - Priority (A)"; if(1.lead_score >= 30; "Prospect - Nurture (B)"; "Prospect - Archive (C)")))}}
```

**What this does:**
- lead_score ≥ 70 → "Prospect - Hot (A+)"
- lead_score 50-69 → "Prospect - Priority (A)"
- lead_score 30-49 → "Prospect - Nurture (B)"
- lead_score < 30 → "Prospect - Archive (C)"

**For `lead_stage`** (based on wants_consultation):

```javascript
{{if(1.wants_consultation = true; "Consultation Requested"; if(1.wants_newsletter = true; "Engaged - Nurture"; "New Lead"))}}
```

**What this does:**
- wants_consultation = true → "Consultation Requested"
- wants_newsletter = true → "Engaged - Nurture"
- else → "New Lead"

---

### Step 8: Add Assessment Completion Date

**For `assessment_completion_date`:**

1. Find this property in HubSpot module
2. Use: `{{now}}`
3. This will timestamp when the contact was created/updated

**Or use the exact timestamp from assessment:**
- If your assessment sends `end_timestamp`, use: `{{1.end_timestamp}}`

---

## 🎯 SECTION 3: CONDITIONAL ROUTING (HOT/WARM/COLD LEADS)

### Step 9: Add Second Router (After HubSpot)

**Purpose:** Route leads differently based on quality

1. Click **"+"** after HubSpot module
2. Add: **"Router"**
3. Click **"OK"**

**You'll create 3 routes:**
- Route A: Hot Leads (score ≥ 70 OR wants_consultation)
- Route B: Warm Leads (score 50-69 OR wants_newsletter)
- Route C: Cold Leads (fallback)

---

### Step 10: Configure Route A (HOT LEADS) 🔥

**Filter Criteria:**

1. Click **"Set filter"** on Route A
2. Label: **"Hot Leads - Immediate Action"**
3. Condition 1:
   - Field: `{{1.lead_score}}`
   - Operator: **Greater than or equal to**
   - Value: `70`
4. Click **"OR"**
5. Condition 2:
   - Field: `{{1.wants_consultation}}`
   - Operator: **Equal to**
   - Value: `true`
6. Click **"OK"**

**Actions for Hot Leads:**

#### Action 1: Add to HubSpot List

1. Click **"+"** on Route A
2. Search: **"HubSpot"**
3. Choose: **"Add Contact to a List"**
4. Select connection (already connected)
5. **List**: Select or create "Hot Leads - Consultation Requested"
6. **Contact ID**: `{{2.id}}` (from previous HubSpot module)
7. Click **"OK"**

#### Action 2: Send Google Chat Notification

**First, get your Google Chat Webhook URL:**

1. Open **Google Chat** in browser
2. Go to the space where you want notifications (or create new space: "Sales Alerts")
3. Click space name → **Apps & integrations**
4. Click **Webhooks** → **Add webhook**
5. Name it: "Hot Lead Alerts"
6. Click **Save**
7. **Copy the webhook URL** (looks like: `https://chat.googleapis.com/v1/spaces/...`)

**Now in Make.com:**

1. Click **"+"** after list module
2. Search: **"HTTP"**
3. Choose: **"Make a request"**
4. **URL**: Paste your Google Chat webhook URL
5. **Method**: `POST`
6. **Headers**:
   - Add header: `Content-Type` = `application/json`
7. **Body type**: `Raw`
8. **Content type**: `JSON (application/json)`
9. **Request content**: Paste this:

```json
{
  "text": "🔥 *HOT LEAD ALERT!*\n\n*Name:* {{1.name}}\n*Organization:* {{1.organization}}\n*Email:* {{1.email}}\n*Lead Score:* {{1.lead_score}}/100\n*Assessment Score:* {{1.overall_score}}/100\n\n*Wants Consultation:* {{if(1.wants_consultation = true; \"✅ YES\"; \"No\")}}\n\n*Top Gaps:* {{join(1.top_gaps; \", \")}}\n\n*HubSpot:* https://app.hubspot.com/contacts/YOUR_PORTAL_ID/contact/{{2.id}}\n\n🎯 *ACTION REQUIRED: Call within 24 hours!*"
}
```

**Replace `YOUR_PORTAL_ID`** with your HubSpot portal ID (find in HubSpot URL)

10. Click **"OK"**

**What the message looks like in Google Chat:**
- Bold headers with asterisks
- Line breaks with `\n`
- Clickable HubSpot link
- Emoji for visual alerts

#### Action 3: Add to Mailchimp (if wants_newsletter)

1. Click **"+"**
2. Search: **"Mailchimp"**
3. Choose: **"Add/Update Subscriber"**
4. Connect Mailchimp (OAuth)
5. **List**: Select your list
6. **Email**: `{{1.email}}`
7. **Status**: `Subscribed`
8. **Merge Fields**:
   - FNAME: `{{1.name}}`
   - ORG: `{{1.organization}}`
   - LEADSCORE: `{{1.lead_score}}`
9. **Tags**: Add tag: `hot-lead, assessment-completed`
10. **Double Opt-In**: `No` (they already opted in)
11. Click **"OK"**

---

### Step 11: Configure Route B (WARM LEADS)

**Filter Criteria:**

1. Label: **"Warm Leads - Nurture"**
2. Condition 1: `lead_score` ≥ 50 AND < 70
3. OR Condition 2: `wants_newsletter` = true
4. Click **"OK"**

**Actions for Warm Leads:**

#### Add to HubSpot List:
- List: "Warm Leads - Nurture"

#### Add to Mailchimp (same as Hot Leads but different tag):
- Tag: `warm-lead, assessment-completed`

---

### Step 12: Configure Route C (COLD LEADS)

**Filter:** Fallback (no conditions)

**Actions:**
- Add to HubSpot List: "Newsletter - Educational Content"
- Add to Mailchimp with tag: `cold-lead, assessment-completed`
- No team notifications (low priority)

---

## 📊 SECTION 4: AIRTABLE BACKUP & VERIFICATION SYSTEM

**Purpose:** Backup all assessment data and verify HubSpot data integrity

**IMPORTANT:** HubSpot is your PRIMARY CRM. Airtable serves as backup and verification.

**See detailed guide:** `AIRTABLE-ASSESSMENT-TRACKING-SYSTEM.md`

### Quick Setup (10 minutes):

#### Step 1: Access Airtable Base

**Base already created:**
- Base Name: "Lead Pipeline Dashboard"
- Base ID: `appt66MN9uPoEOriV`
- 6 tables already configured (see detailed guide)

#### Step 2: Add Airtable Module to Make.com

**Add AFTER the HubSpot module (before Router #2):**

1. Click **"+"** after HubSpot module
2. Search: **"Airtable"**
3. Select: **"Create a Record"**
4. Connect your Airtable account
5. **Base:** Select "Lead Pipeline Dashboard"
6. **Table:** Select "📊 Assessment Raw Data"
7. Click **"OK"**

#### Step 3: Map All Fields to Airtable

**Map these values to Airtable fields:**

See complete field mapping in `AIRTABLE-ASSESSMENT-TRACKING-SYSTEM.md` Section "Make.com Integration".

**Key fields to map:**
- Assessment ID: `{{1.assessment_id}}`
- Submission Date: `{{now}}`
- Name: `{{1.name}}`
- Email: `{{1.email}}`
- Organization: `{{1.organization}}`
- All scores (Overall, Preparedness, Response, Recovery, Support, Lead Score)
- All preferences (Wants Consultation, Newsletter, Training, Resources)
- HubSpot Contact ID: `{{2.id}}`
- HubSpot Link: `https://app.hubspot.com/contacts/YOUR_PORTAL_ID/contact/{{2.id}}`
- Status: `New`

**Note:** Replace `YOUR_PORTAL_ID` with your actual HubSpot portal ID (found in HubSpot URL)

#### Step 4: Test Airtable Integration

1. Run scenario with test data
2. Check Airtable "Assessment Raw Data" table
3. Verify new record appears with all data
4. Click HubSpot link to verify it works
5. Compare data between HubSpot and Airtable for accuracy

**Benefits:**
- ✅ Complete backup if HubSpot data is lost
- ✅ Data verification and cross-checking
- ✅ Team dashboard without HubSpot licenses
- ✅ Superior filtering and linked records
- ✅ Mobile app access

---

## ✅ SECTION 5: TESTING YOUR SCENARIO

### Step 13: Test with Real Data

**Create 3 test submissions:**

**Test 1: Hot Lead**
1. Go to your assessment
2. Complete with:
   - Email: `test-hot@yourdomain.com`
   - Organization: "Test Hot Lead Organization"
   - Answer questions to get high score
   - Select "Schedule consultation"
3. Submit

**Test 2: Warm Lead**
1. Email: `test-warm@yourdomain.com`
2. Medium scores (50-69)
3. Select "Newsletter only"
4. Submit

**Test 3: Cold Lead**
1. Email: `test-cold@yourdomain.com`
2. Low scores (< 50)
3. Select "Just show results"
4. Submit

**Verify in HubSpot:**
1. Go to **Contacts** → **All Contacts**
2. Search for each test email
3. Check:
   - ✅ Contact created
   - ✅ All custom properties populated
   - ✅ Contact Type set correctly
   - ✅ Lead Stage set correctly
   - ✅ Added to correct list

**Verify in Mailchimp:**
1. Go to your audience
2. Search for test emails
3. Check:
   - ✅ Subscriber added
   - ✅ Tags applied correctly
   - ✅ Merge fields populated

**Verify Notifications:**
1. Check Google Chat (for hot lead - should receive notification)
2. Check that warm/cold didn't trigger Google Chat (only hot leads get notified)

---

## 🎯 SECTION 6: ACTIVATE & MONITOR

### Step 14: Save and Activate

1. Click **"Save"** (floppy disk icon)
2. Toggle **"Scheduling"** to **ON**
3. Set to: **"Immediately as data arrives"**
4. Click **"OK"**
5. Scenario is now LIVE! 🎉

### Step 15: Set Up Error Notifications

1. Click scenario settings (gear icon)
2. Go to **"Error handling"**
3. Enable: **"Send me an email when an error occurs"**
4. Enter your email
5. Click **"Save"**

---

## 📊 SECTION 7: MONITORING & MAINTENANCE

### Daily Checks (First Week):

**In Make.com:**
1. Check **"History"** tab
2. Look for successful executions (green)
3. Look for errors (red) - investigate immediately

**In HubSpot:**
1. Check "Recent Contacts"
2. Verify properties are populating
3. Check lists for proper segmentation

**In Mailchimp:**
1. Verify subscribers are being added
2. Check tags are applying correctly

**In Airtable:**
1. Check "Assessment Raw Data" table for new records
2. Verify all fields are populating
3. Check HubSpot links work
4. Compare to HubSpot data to verify accuracy

### Weekly Checks (Ongoing):

1. Review Make.com operations count (stay under limit)
2. Check HubSpot for duplicate contacts (merge if found - HubSpot is PRIMARY)
3. Verify Google Chat notifications working
4. Review Airtable "Lead Dashboard" for follow-up needs
5. Compare HubSpot and Airtable data for discrepancies
6. Test with one real submission

---

## 🚨 TROUBLESHOOTING

### Issue: Contact not created in HubSpot

**Check:**
1. Make.com execution history - did it run?
2. HubSpot module - any error message?
3. Required fields - is email present?
4. HubSpot connection - still valid?

**Fix:**
```
1. Re-run the scenario with "Run once"
2. Check error logs
3. Reconnect HubSpot if needed
4. Verify email format is valid
```

### Issue: Custom properties not populating

**Check:**
1. Property internal names match exactly
2. Data types match (number to number, text to text)
3. Property exists in HubSpot

**Fix:**
```
1. Go to HubSpot Settings → Properties
2. Copy exact "Internal Name"
3. Use that in Make.com mapping
4. Re-run test
```

### Issue: Mailchimp duplicates

**Check:**
1. Email already exists in list
2. "Update" setting vs "Add only"

**Fix:**
```
1. Use "Add/Update Subscriber" (not just "Add")
2. This will update if exists, add if new
3. No duplicates!
```

### Issue: Wrong list assignment

**Check:**
1. Router filter conditions
2. lead_score value
3. wants_consultation value

**Fix:**
```
1. Review filter logic
2. Test with different lead_score values
3. Adjust thresholds if needed
```

---

## 📋 COMPLETE FIELD MAPPING REFERENCE

### Assessment Webhook → HubSpot Properties

| Webhook Field | HubSpot Property (Internal Name) | Type | Notes |
|--------------|----------------------------------|------|-------|
| `email` | `email` | Email | Standard |
| `name` | `firstname` | Text | Standard |
| `organization` | `company` | Text | Standard |
| `role` | `jobtitle` | Text | Standard |
| `org_info` | `org_type` | Dropdown | Custom |
| `org_info_other` | `org_type_other` | Text | Custom (if created) |
| `assessment_id` | `assessment_id` | Text | Custom |
| `overall_score` | `assessment_score` | Number | Custom |
| `preparedness_score` | `preparedness_score` | Number | Custom |
| `response_score` | `response_score` | Number | Custom |
| `recovery_score` | `recovery_score` | Number | Custom |
| `support_score` | `support_score` | Number | Custom |
| `lead_score` | `lead_score` | Number | Custom |
| `gap_level` | `gap_level` | Dropdown | Custom |
| `wants_consultation` | `wants_consultation` | Checkbox | Custom |
| `wants_newsletter` | `wants_newsletter` | Checkbox | Custom |
| `recaptcha_score` | `recaptcha_score` | Number | Custom |
| `crisis_experience_ever` | `crisis_experience_level` | Dropdown | Custom |
| `crisis_timeline` | `crisis_timeline` | Dropdown | Custom |
| `timeline_focus` | `timeline_focus` | Dropdown | Custom |
| `recommended_service` | `recommended_service` | Text | Custom |
| `recommended_tier` | `recommended_tier` | Dropdown | Custom |
| Formula | `contact_type` | Dropdown | Calculated |
| Formula | `lead_stage` | Dropdown | Calculated |
| `{{now}}` | `assessment_completion_date` | Date | Timestamp |

---

## 🎉 SUCCESS CHECKLIST

When everything is working, you should have:

- ✅ Assessment submissions flowing into Make.com
- ✅ Contacts created/updated in HubSpot automatically
- ✅ All custom properties populated with assessment data
- ✅ Contacts assigned to correct type (Hot/Warm/Cold)
- ✅ Contacts added to appropriate lists
- ✅ Mailchimp subscribers added with tags
- ✅ Google Chat notifications for hot leads
- ✅ No errors in Make.com execution history
- ✅ No duplicate contacts
- ✅ Team can see lead data in HubSpot dashboard

---

## 📞 NEXT STEPS AFTER THIS IS WORKING

1. ✅ **Set up Mailchimp automations** (welcome series)
2. ✅ **Create HubSpot workflows** (follow-up tasks - HubSpot is PRIMARY)
3. ✅ **Build Airtable integration** (backup and verification)
4. ✅ **Add Claude AI report generation** (discovery prep)
5. ✅ **Set up monthly reporting** (Analytics dashboard)

**All documented in:** `CLAUDE-DESKTOP-PROMPTS.md`

---

**Created:** 2025-01-30
**Version:** 1.0
**Status:** Ready to Implement

**LET'S CONNECT EVERYTHING AND START CAPTURING LEADS! 🚀**
