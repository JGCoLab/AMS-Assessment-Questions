# Complete Make.com Setup Guide - Step-by-Step
## Aftermath Assessment Automation System

**Status:** Ready to build
**Time Required:** 2-3 hours total
**Prerequisites:** ✅ Webhook receiving data successfully

---

## 🎯 WHAT YOU'RE BUILDING

### **Two-Scenario System:**

**Scenario 1: Immediate Processing** (Build this first)
```
Assessment Submitted
    ↓
Webhook receives data
    ↓
Spam Filter (reCAPTCHA score check)
    ↓
├─→ Create/Update Contact in HubSpot (PRIMARY)
├─→ Create Record in Airtable (BACKUP)
├─→ Send Immediate Thank You Email
└─→ Add to Email Queue for 24h Follow-up
```

**Scenario 2: Claude AI Follow-up Emails** (Build this second)
```
Scheduled: Daily at 8:00 AM ET
    ↓
Check Airtable Email Queue
    ↓
Find records 24h old and not processed
    ↓
For each record:
    ├─→ Send assessment data to Claude AI
    ├─→ Claude generates personalized email
    ├─→ Send email to contact (CC: team@theaftermathsolutions.com)
    └─→ Mark as processed in Airtable
```

---

## 📋 PART 1: BUILD SCENARIO 1 (IMMEDIATE PROCESSING)

**Estimated Time:** 60-90 minutes

---

### **Step 1: Create New Scenario**

1. Go to: https://www.make.com/
2. Click **"Scenarios"** in left sidebar
3. Click **"Create a new scenario"** button
4. **Name it:** `Aftermath Assessment - Immediate Processing`
5. Click **"Continue"**

---

### **Step 2: Add Your Existing Webhook**

**You already have the webhook working!** Now connect it to this scenario:

1. Click the **big "+"** button to add first module
2. Search: **"Webhooks"**
3. Select: **"Webhooks"** app
4. Select: **"Custom webhook"**
5. Click **"Add"** next to webhook dropdown
6. **Webhook name:** `Assessment Submission`
7. Click **"Save"**
8. **Copy the webhook URL** that appears
9. Click **"OK"**

**IMPORTANT:** Your webhook URL is: `https://hook.us2.make.com/y7n8tnm51v3hesxlxnn907vhur4iddp9`

If the new webhook URL is different, you'll need to update your Vercel environment variable. **Let me know if it's different!**

**For now, use your existing webhook.**

---

### **Step 3: Test Webhook Reception**

1. Click **"Run once"** (bottom left)
2. The webhook bubble should show "Waiting for data..."
3. Go to your assessment: https://assessment.theaftermathsolutions.com
4. Complete a test assessment (use fake data)
5. Return to Make.com
6. **You should see:** "Successfully determined" with a "1" badge
7. Click the webhook bubble to see all the data received

**Verify you see:**
- assessment_id
- name, email, organization
- overall_score, lead_score
- All assessment answers

---

### **Step 4: Add Router (Spam Filter)**

**Purpose:** Filter out bots based on reCAPTCHA score

1. Click **"+"** after the webhook module
2. Search: **"Router"**
3. Select: **"Flow control"** → **"Router"**
4. Click **"OK"**

**The router will have 2 routes - we'll configure them next.**

---

### **Step 5: Configure Route 1 - Human Traffic**

**This route processes real humans (reCAPTCHA score ≥ 0.5)**

1. Click **"Set filter"** on the FIRST route (top path)
2. **Label:** `Human Traffic`
3. **Condition:**
   - Field: Click and select `recaptcha_score` (from webhook data)
   - Operator: `Greater than or equal to`
   - Value: `0.5`
4. Click **"OK"**

**Alternative if recaptcha_score is empty:**
- OR condition: `recaptcha_score` is empty (allows submissions without reCAPTCHA during testing)

---

### **Step 6: Configure Route 2 - Bot Traffic (Optional)**

**This route logs bots but doesn't process them**

1. Click **"Set filter"** on the SECOND route (bottom path)
2. **Label:** `Bot Traffic - Log Only`
3. **Condition:**
   - Field: `recaptcha_score`
   - Operator: `Less than`
   - Value: `0.5`
4. Click **"OK"**

**For now, leave this route empty.** Later you can add a Google Sheets module to log bot attempts.

---

### **Step 7: Add HubSpot - Create/Update Contact**

**On Route 1 (Human Traffic) path:**

1. Click **"+"** after Route 1
2. Search: **"HubSpot"**
3. Select: **"HubSpot CRM"**
4. Select action: **"Create/Update a Contact"**
5. Click **"Create a connection"**
6. **Connection name:** `Aftermath HubSpot`
7. Click **"Sign in with HubSpot"**
8. Log in and authorize Make.com
9. Click **"Save"**

**Map the fields:**

| HubSpot Field | Map to Webhook Data |
|---------------|---------------------|
| **Email*** (required) | `email` |
| **First Name** | Click "Map" → Use function to extract first name from `name` field:<br>`{{split(name; " ")[1]}}` |
| **Last Name** | `{{split(name; " ")[2]}}` (or leave blank if no split) |
| **Company Name** | `organization` |
| **Website** | Leave blank |
| **Phone Number** | Leave blank |

**Click "Show advanced settings" and map custom properties:**

| Custom Property | Webhook Field | Notes |
|-----------------|---------------|-------|
| `lead_score` | `lead_score` | Number (0-100) |
| `overall_score` | `overall_score` | Number (0-100) |
| `preparedness_score` | `preparedness_score` | Number |
| `response_score` | `response_score` | Number |
| `recovery_score` | `recovery_score` | Number |
| `support_score` | `support_score` | Number |
| `gap_level` | `gap_level` | Text (critical/significant/moderate/minor) |
| `recommended_service` | `recommended_service` | Text |
| `recommended_tier` | `recommended_tier` | Text |
| `wants_consultation` | `wants_consultation` | Boolean |
| `wants_newsletter` | `wants_newsletter` | Boolean |
| `assessment_id` | `assessment_id` | Text |
| `assessment_date` | `assessment_completed` | Date/time |
| `organization_type` | `org_info` | Text |
| `crisis_experience` | `crisis_experience_ever` | Text |

**Note:** If you haven't created these custom properties in HubSpot yet, see "HubSpot Properties Setup" section at the end of this guide.

10. Click **"OK"**

---

### **Step 8: Add Airtable - Create Record**

**After HubSpot module:**

1. Click **"+"** after HubSpot
2. Search: **"Airtable"**
3. Select: **"Airtable"**
4. Select action: **"Create a record"**
5. Click **"Create a connection"**
6. **Connection name:** `Aftermath Airtable`
7. Click **"Sign in with Airtable"**
8. Authorize Make.com
9. Click **"Save"**

**Configure Airtable record:**

| Setting | Value |
|---------|-------|
| **Base** | Select: `Lead Pipeline Dashboard` (appt66MN9uPoEOriV) |
| **Table** | Select: `📊 Assessment Raw Data` |

**Map the fields:**

| Airtable Field | Map to Webhook Data |
|----------------|---------------------|
| **Assessment ID** (primary) | `assessment_id` |
| **Submission Date** | `assessment_completed` |
| **Name** | `name` |
| **Email** | `email` |
| **Organization** | `organization` |
| **Organization Type** | `org_info` |
| **Overall Score** | `overall_score` |
| **Preparedness Score** | `preparedness_score` |
| **Response Score** | `response_score` |
| **Recovery Score** | `recovery_score` |
| **Support Score** | `support_score` |
| **Lead Score** | `lead_score` |
| **Gap Level** | `gap_level` |
| **Recommended Tier** | `recommended_tier` |
| **Recommended Service** | `recommended_service` |
| **Wants Consultation** | `wants_consultation` |
| **Wants Newsletter** | `wants_newsletter` |
| **Wants Training** | `wants_training` |
| **HubSpot Contact ID** | Click "Map" → Select `ID` from HubSpot module output |
| **Status** | Type manually: `New` |
| **Raw Data JSON** | `{{toString(webhook data)}}` (stores complete submission) |

10. Click **"OK"**

---

### **Step 9: Add Email - Immediate Thank You**

**After Airtable module:**

1. Click **"+"** after Airtable
2. Search: **"Email"**
3. Select: **"Email"**
4. Select action: **"Send an email"**
5. Click **"Create a connection"**
6. **Connection name:** `Aftermath Email`
7. **Connection type:** Choose your email provider:
   - **Gmail** (if using Google Workspace)
   - **Microsoft 365** (if using Outlook/Microsoft)
   - **SMTP** (if using other email)
8. Authorize and save

**Configure the email:**

| Field | Value |
|-------|-------|
| **To** | Map: `email` (from webhook) |
| **From Name** | `Aftermath Solutions` |
| **From Email** | `team@theaftermathsolutions.com` |
| **Subject** | `Thank you for completing the Organizational Resilience Equation` |
| **Content Type** | `HTML` |

**Email Body Template:**

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: linear-gradient(135deg, #49AA91, #2E476C); padding: 30px; text-align: center;">
    <h1 style="color: white; margin: 0;">Thank You, {{name}}!</h1>
  </div>

  <div style="padding: 30px; background: #ffffff;">
    <p style="font-size: 16px; line-height: 1.6; color: #333;">
      Thank you for taking the time to complete the Organizational Resilience Equation for <strong>{{organization}}</strong>.
    </p>

    <div style="background: #f8f9fa; border-left: 4px solid #49AA91; padding: 20px; margin: 25px 0;">
      <h3 style="margin-top: 0; color: #2E476C;">Your Results Summary</h3>
      <p style="margin: 10px 0;"><strong>Overall Resilience:</strong> {{overall_score}}/100</p>
      <p style="margin: 10px 0;"><strong>Gap Level:</strong> {{gap_level}}</p>
      <p style="margin: 10px 0;"><strong>Recommended Solution:</strong> {{recommended_tier}}</p>
    </div>

    <p style="font-size: 16px; line-height: 1.6; color: #333;">
      <strong>What happens next?</strong>
    </p>

    <p style="font-size: 16px; line-height: 1.6; color: #333;">
      Within the next 24-48 hours, you'll receive a personalized analysis of your results with:
    </p>

    <ul style="font-size: 16px; line-height: 1.8; color: #333;">
      <li>Detailed interpretation of your organizational resilience factors</li>
      <li>Specific recommendations tailored to {{organization}}</li>
      <li>Next steps to strengthen your crisis preparedness</li>
      <li>Information about our solutions that align with your needs</li>
    </ul>

    <p style="font-size: 16px; line-height: 1.6; color: #333;">
      In the meantime, if you have any questions, please don't hesitate to reach out.
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://meetings-na2.hubspot.com/josh-garcia/aftermath-solutions"
         style="display: inline-block; background: #49AA91; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
        Schedule a Free Consultation
      </a>
    </div>

    <p style="font-size: 14px; color: #666; margin-top: 30px;">
      <strong>Aftermath Solutions</strong><br>
      Solving for the Aftermath—Before, During, and After<br>
      <a href="mailto:team@theaftermathsolutions.com" style="color: #49AA91;">team@theaftermathsolutions.com</a><br>
      <a href="https://www.theaftermathsolutions.com" style="color: #49AA91;">www.theaftermathsolutions.com</a>
    </p>
  </div>
</div>
```

9. Click **"OK"**

---

### **Step 10: Add to Claude Email Queue**

**After Email module - prepare for 24h follow-up:**

1. Click **"+"** after Email module
2. Search: **"Airtable"**
3. Select: **"Airtable"**
4. Select action: **"Create a record"**
5. Use existing Airtable connection

**Configure:**

| Setting | Value |
|---------|-------|
| **Base** | `Lead Pipeline Dashboard` |
| **Table** | `📧 Email Follow-Up Queue` |

**Map fields:**

| Field | Map to |
|-------|--------|
| **Assessment ID** | `assessment_id` |
| **Submission Timestamp** | `assessment_completed` |
| **Contact Name** | `name` |
| **Contact Email** | `email` |
| **Organization** | `organization` |
| **Assessment Data** | `{{toString(webhook data)}}` (full JSON) |
| **Processed** | Uncheck (leave false) |
| **Status** | Type: `Queued` |

6. Click **"OK"**

---

### **Step 11: Save and Activate Scenario 1**

1. Click **"Save"** (bottom right corner)
2. **Turn ON the scenario** (toggle in top right)
3. The toggle should be **green/blue**

---

### **Step 12: Test Scenario 1 End-to-End**

1. Click **"Run once"** in Make.com
2. Go to your assessment and complete a test submission
3. Watch Make.com execute
4. **Verify each module shows a green checkmark:**
   - ✅ Webhook received data
   - ✅ Router passed through human traffic
   - ✅ HubSpot contact created
   - ✅ Airtable record created
   - ✅ Email sent
   - ✅ Queue record created

5. **Check results:**
   - HubSpot: Contact exists with custom properties
   - Airtable: Record in Assessment Raw Data table
   - Email: Check your inbox for thank you email
   - Airtable: Record in Email Follow-Up Queue table

**If any module fails:**
- Click the module to see error details
- Common issues:
  - Field mapping wrong → Adjust field names
  - Missing custom properties in HubSpot → Create them (see below)
  - Wrong Airtable table/field names → Verify in Airtable

---

## 📋 PART 2: BUILD SCENARIO 2 (CLAUDE AI FOLLOW-UP)

**Estimated Time:** 90 minutes
**Prerequisite:** Scenario 1 working and at least one record in Email Queue

---

### **Step 13: Create Second Scenario**

1. Go to Make.com → Scenarios
2. Click **"Create a new scenario"**
3. **Name:** `Aftermath Assessment - Claude Follow-up Emails`
4. Click **"Continue"**

---

### **Step 14: Add Schedule Trigger**

**Purpose:** Run daily at 8:00 AM ET to send 24h follow-up emails

1. Click the big **"+"** to add first module
2. Search: **"Schedule"**
3. Select: **"Tools"** → **"Schedule"**
4. Select: **"Every day"**

**Configure schedule:**

| Setting | Value |
|---------|-------|
| **Time** | `08:00` (8:00 AM) |
| **Time zone** | `America/New_York` (Eastern Time) |
| **Start date** | Today's date |
| **End date** | Leave blank (runs indefinitely) |

5. Click **"OK"**

---

### **Step 15: Search Airtable for Queued Records**

**Purpose:** Find records that are 24h old and not yet processed

1. Click **"+"** after Schedule
2. Search: **"Airtable"**
3. Select: **"Search records"**
4. Use existing connection

**Configure search:**

| Setting | Value |
|---------|-------|
| **Base** | `Lead Pipeline Dashboard` |
| **Table** | `📧 Email Follow-Up Queue` |
| **Formula** | See below |
| **Max records** | `50` |

**Airtable Formula (paste exactly):**
```
AND(
  {Processed} = FALSE(),
  {Status} = 'Queued',
  IS_AFTER(
    {Submission Timestamp},
    DATEADD(NOW(), -25, 'hours')
  ),
  IS_BEFORE(
    {Submission Timestamp},
    DATEADD(NOW(), -23, 'hours')
  )
)
```

**This formula finds records:**
- Not processed yet
- Status = Queued
- Submitted between 23-25 hours ago (24h window with buffer)

5. Click **"OK"**

---

### **Step 16: Add Iterator**

**Purpose:** Process each queued email one at a time

1. Click **"+"** after Airtable Search
2. Search: **"Iterator"**
3. Select: **"Flow control"** → **"Iterator"**
4. **Array:** Click and select the entire output from Airtable Search module
5. Click **"OK"**

---

### **Step 17: Add Claude AI - Generate Personalized Email**

**Purpose:** Send assessment data to Claude to generate personalized email**

1. Click **"+"** after Iterator
2. Search: **"HTTP"**
3. Select: **"HTTP"** → **"Make a request"**

**Configure HTTP request:**

| Setting | Value |
|---------|-------|
| **URL** | `https://api.anthropic.com/v1/messages` |
| **Method** | `POST` |
| **Headers** | Add 3 headers (click "+ Add item" for each): |
| | 1. `x-api-key`: `YOUR_CLAUDE_API_KEY` |
| | 2. `anthropic-version`: `2023-06-01` |
| | 3. `content-type`: `application/json` |

**Get Claude API Key:**
- Go to: https://console.anthropic.com/
- Sign up or log in
- Go to API Keys
- Create new key
- Copy and paste into x-api-key header

**Request Body (JSON):**

Click "Body" → Select "Raw" → Paste this JSON:

```json
{
  "model": "claude-3-5-sonnet-20241022",
  "max_tokens": 4000,
  "temperature": 0.7,
  "system": "You are a compassionate crisis preparedness consultant at Aftermath Solutions, a specialized consulting firm that helps organizations build resilience for before, during, and after critical incidents.\n\nYour role is to analyze organizational resilience assessment results and write personalized, thoughtful follow-up emails that:\n1. Interpret their assessment scores in context\n2. Validate their current strengths\n3. Gently highlight critical gaps without causing alarm\n4. Recommend specific, actionable next steps\n5. Match them to appropriate service tiers based on their needs\n\n**CRITICAL TONE GUIDELINES:**\n- Use trauma-informed language (avoid: triggered, ignite, aim, fire, shoot, explode, bomb, attack, target)\n- Be supportive and validating, not sales-y\n- Acknowledge the complexity of crisis preparedness\n- Focus on organizational resilience, not fear\n\n**SERVICE TIERS:**\n\nTIER 1: Foundational Workshops ($2,000-$10,000)\n- Organizational Trauma Literacy Workshop\n- Traumatic Stress Psychoeducation\n- Youth & Family Support workshops\n\nTIER 2: Strategic Intensives ($10,000-$30,000)\n- Crisis Preparedness Assessment & Implementation\n- Leadership Resilience Intensive  \n- Clinician Resilience & Moral Injury Recovery\n- The Re-Treatment Intensive\n\nTIER 3: Full-Spectrum Partnership ($30,000-$150,000+)\n- Comprehensive organizational transformation\n- 6-18 month partnerships\n- Custom framework development\n- Ongoing strategic counsel\n\n**OUTPUT:**\nGenerate ONLY the email body in HTML format. Do NOT include subject line. Use professional email HTML styling.",
  "messages": [
    {
      "role": "user",
      "content": "Generate a personalized follow-up email for this assessment:\n\nCONTACT INFO:\nName: {{get(Assessment Data; \"name\")}}\nOrganization: {{get(Assessment Data; \"organization\")}}\nEmail: {{get(Assessment Data; \"email\")}}\nOrganization Type: {{get(Assessment Data; \"org_info\")}}\n\nASSESSMENT RESULTS:\nOverall Resilience Score: {{get(Assessment Data; \"overall_score\")}}/100\nPreparedness: {{get(Assessment Data; \"preparedness_score\")}}/100\nResponse: {{get(Assessment Data; \"response_score\")}}/100\nRecovery: {{get(Assessment Data; \"recovery_score\")}}/100\nSupport: {{get(Assessment Data; \"support_score\")}}/100\n\nGap Level: {{get(Assessment Data; \"gap_level\")}}\nLead Score: {{get(Assessment Data; \"lead_score\")}}/100\n\nRECOMMENDATION:\nTier: {{get(Assessment Data; \"recommended_tier\")}}\nService: {{get(Assessment Data; \"recommended_service\")}}\nSolving For: {{get(Assessment Data; \"solving_for\")}}\n\nCONTEXT:\nCrisis Experience: {{get(Assessment Data; \"crisis_experience_ever\")}}\nReadiness Level: {{get(Assessment Data; \"crisis_readiness\")}}\nSupport Systems: {{get(Assessment Data; \"support_systems\")}}\n\nINTERESTS:\nWants Consultation: {{get(Assessment Data; \"wants_consultation\")}}\nWants Training: {{get(Assessment Data; \"wants_training\")}}\nWants Newsletter: {{get(Assessment Data; \"wants_newsletter\")}}\n\nWrite a thoughtful, personalized email (400-600 words) that:\n1. References specific assessment results\n2. Interprets what the scores mean for their organization\n3. Highlights 2-3 key strengths\n4. Identifies 2-3 priority areas for improvement\n5. Recommends specific services from the appropriate tier\n6. Includes a clear call-to-action\n7. Signs off as 'The Aftermath Solutions Team'\n\nGenerate ONLY the HTML email body, no subject line."
    }
  ]
}
```

**Note:** The `{{get(Assessment Data; "field_name")}}` syntax extracts fields from the JSON stored in Airtable.

4. Click **"OK"**

---

### **Step 18: Parse Claude Response**

**Purpose:** Extract the email content from Claude's JSON response

1. Click **"+"** after HTTP module
2. Search: **"JSON"**
3. Select: **"Tools"** → **"Parse JSON"**
4. **JSON string:** Click and map: `Data` from HTTP module
5. Click **"Show advanced settings"**
6. **Data structure:** Leave as "Not selected" (auto-detect)
7. Click **"OK"**

---

### **Step 19: Send Personalized Email**

**Purpose:** Send the Claude-generated email to the contact

1. Click **"+"** after JSON Parse
2. Search: **"Email"**
3. Select: **"Send an email"**
4. Use existing email connection

**Configure email:**

| Field | Map to |
|-------|--------|
| **To** | Map: `Contact Email` from Iterator |
| **CC** | Type: `team@theaftermathsolutions.com` |
| **From Name** | `Aftermath Solutions` |
| **From Email** | `team@theaftermathsolutions.com` |
| **Subject** | `Your Organizational Resilience Analysis for {{get(Contact Name from Iterator)}}` |
| **Content Type** | `HTML` |
| **Body** | Map: `content` → `text` from JSON Parse module (this is Claude's email) |

5. Click **"OK"**

---

### **Step 20: Update Airtable - Mark as Processed**

**Purpose:** Mark the record as processed so it doesn't get emailed again

1. Click **"+"** after Email module
2. Search: **"Airtable"**
3. Select: **"Update a record"**
4. Use existing connection

**Configure:**

| Setting | Value |
|---------|-------|
| **Base** | `Lead Pipeline Dashboard` |
| **Table** | `📧 Email Follow-Up Queue` |
| **Record ID** | Map: `ID` from Iterator (the Airtable record ID) |

**Update these fields:**

| Field | Value |
|-------|--------|
| **Processed** | Check the box (TRUE) |
| **Email Sent Date** | `{{now}}` (current timestamp) |
| **Status** | Type: `Sent` |
| **Claude Analysis** | Map: entire JSON output from Claude (for logging) |

6. Click **"OK"**

---

### **Step 21: Add Error Handler (Optional but Recommended)**

**Purpose:** If Claude fails, log it instead of breaking

1. Right-click the HTTP module (Claude request)
2. Select **"Add error handler"**
3. Select: **"Ignore"** (or add logging module)

This ensures one failed email doesn't stop processing other queued emails.

---

### **Step 22: Save and Activate Scenario 2**

1. Click **"Save"** button
2. **Turn ON the scenario** (toggle in top right)
3. Toggle should be **green/blue**

**This scenario will now run automatically every day at 8:00 AM ET!**

---

### **Step 23: Test Scenario 2 Manually**

**Option A: Manual Run (Test now)**

1. Click **"Run once"**
2. Watch it execute
3. Should find queued records 24h old
4. Generate emails with Claude
5. Send and mark as processed

**Option B: Create Test Record**

1. Go to Airtable → Email Follow-Up Queue
2. Manually create a record with:
   - Assessment ID: test_123
   - Submission Timestamp: 24 hours ago
   - Status: Queued
   - Processed: FALSE
   - Fill in contact info and assessment data
3. Run Scenario 2
4. Should process this test record

---

## ✅ VERIFICATION CHECKLIST

### **Scenario 1: Immediate Processing**

Test by submitting an assessment. Verify:

- ✅ Make.com receives data in webhook
- ✅ Router filters bots (reCAPTCHA < 0.5 rejected)
- ✅ HubSpot contact created with all custom properties
- ✅ Airtable record created in Assessment Raw Data
- ✅ Thank you email received immediately
- ✅ Record added to Email Follow-Up Queue (Queued status)

### **Scenario 2: Claude Follow-up**

Test manually or wait 24h. Verify:

- ✅ Scenario runs at 8:00 AM ET daily
- ✅ Finds records 24h old in queue
- ✅ Claude generates personalized email
- ✅ Email sent to contact (CC: team)
- ✅ Record marked as Processed = TRUE
- ✅ Status updated to "Sent"
- ✅ Email Sent Date populated

---

## 🔧 HUBSPOT CUSTOM PROPERTIES SETUP

**If you haven't created these properties yet:**

1. Go to HubSpot
2. Settings → Data Management → Properties
3. Select object: **Contact**
4. For each property below, click "Create property":

### **Assessment Properties:**

| Property Name | Internal Name | Type | Group |
|---------------|---------------|------|-------|
| Lead Score | `lead_score` | Number | Assessment |
| Overall Score | `overall_score` | Number | Assessment |
| Preparedness Score | `preparedness_score` | Number | Assessment |
| Response Score | `response_score` | Number | Assessment |
| Recovery Score | `recovery_score` | Number | Assessment |
| Support Score | `support_score` | Number | Assessment |
| Gap Level | `gap_level` | Dropdown | Assessment |
| Recommended Service | `recommended_service` | Text | Assessment |
| Recommended Tier | `recommended_tier` | Text | Assessment |
| Assessment ID | `assessment_id` | Text | Assessment |
| Assessment Date | `assessment_date` | Date | Assessment |
| Organization Type | `organization_type` | Dropdown | Assessment |
| Crisis Experience | `crisis_experience` | Dropdown | Assessment |
| Wants Consultation | `wants_consultation` | Checkbox | Assessment |
| Wants Newsletter | `wants_newsletter` | Checkbox | Assessment |

**Gap Level Dropdown Options:**
- Critical
- Significant
- Moderate
- Minor

**Organization Type Dropdown Options:**
- Healthcare
- Higher Education
- K-12 Education
- Government
- Emergency Management
- Corporate
- First Responders
- Legal Services
- Human Services
- NGO/Nonprofit
- Other

---

## 🎯 AIRTABLE TABLES SETUP

### **Table 1: 📊 Assessment Raw Data**

**Purpose:** Backup of all assessment data

**Fields:**
- Assessment ID (Text, Primary)
- Submission Date (Date)
- Name (Text)
- Email (Email)
- Organization (Text)
- Organization Type (Single Select)
- Overall Score (Number)
- Preparedness Score (Number)
- Response Score (Number)
- Recovery Score (Number)
- Support Score (Number)
- Lead Score (Number)
- Gap Level (Single Select: Critical, Significant, Moderate, Minor)
- Recommended Tier (Text)
- Recommended Service (Text)
- Wants Consultation (Checkbox)
- Wants Newsletter (Checkbox)
- Wants Training (Checkbox)
- HubSpot Contact ID (Text)
- Status (Single Select: New, Contacted, Qualified, Lost)
- Raw Data JSON (Long Text)

### **Table 2: 📧 Email Follow-Up Queue**

**Purpose:** Queue for 24h Claude follow-up emails

**Fields:**
- Assessment ID (Text, Primary)
- Submission Timestamp (Date & Time)
- Contact Name (Text)
- Contact Email (Email)
- Organization (Text)
- Assessment Data (Long Text - JSON)
- Processed (Checkbox)
- Email Sent Date (Date & Time)
- Status (Single Select: Queued, Sent, Failed)
- Claude Analysis (Long Text)

---

## 🚨 TROUBLESHOOTING

### **Scenario 1 Issues**

**HubSpot module fails:**
- Error: "Property doesn't exist" → Create custom properties in HubSpot first
- Error: "Invalid email" → Check email field mapping
- Error: "Authentication failed" → Reconnect HubSpot

**Airtable module fails:**
- Error: "Field doesn't exist" → Check field names match exactly
- Error: "Invalid value" → Check data types (number vs text)
- Error: "Base not found" → Verify base ID

**Email not sending:**
- Check email connection is authorized
- Verify "From Email" is authorized to send
- Check spam folder

### **Scenario 2 Issues**

**Claude returns error:**
- Error 401: Invalid API key → Check x-api-key header
- Error 400: Invalid request → Check JSON body format
- Error 429: Rate limit → Reduce frequency or upgrade Claude plan

**No records found:**
- Check formula in Airtable Search
- Verify records are 24h old
- Check Processed = FALSE
- Check Status = "Queued"

**Email has weird formatting:**
- Claude might return JSON wrapper → Use Parse JSON module
- Extract only the "text" field from Claude's content array

---

## 📊 MONITORING & MAINTENANCE

### **Daily Checks (5 min):**
- Check Make.com execution history for errors
- Verify Scenario 2 ran at 8am ET
- Spot check 1-2 Claude emails for quality

### **Weekly Reviews (15 min):**
- Review HubSpot contact creation rate
- Check Airtable backup is syncing
- Verify email delivery rates
- Review Make.com operations usage

### **Monthly Optimization:**
- Analyze lead quality (lead scores vs conversions)
- Review Claude email effectiveness
- Optimize system prompt if needed
- Update service recommendations if offerings changed

---

## 🎉 YOU'RE DONE!

**Your complete system:**

✅ Assessment captures data
✅ Data flows to Vercel → Make.com
✅ Spam filtered by reCAPTCHA
✅ Contact created in HubSpot (PRIMARY)
✅ Backup created in Airtable
✅ Immediate thank you email sent
✅ Queued for 24h follow-up
✅ Claude AI generates personalized analysis
✅ Follow-up email sent automatically
✅ Team CC'd on all emails
✅ Everything tracked and logged

**Next Steps:**
1. Monitor for 1 week
2. Review Claude email quality
3. Implement Phase 1 enhancements (see MAKE-COM-ENHANCEMENTS.md)
4. Train team on lead follow-up workflow

---

**Questions? Issues? Check:**
- TROUBLESHOOTING.md - Common issues
- MAKE-COM-ENHANCEMENTS.md - Advanced features
- README.md - Project overview

**You're ready to generate and convert leads!** 🚀
