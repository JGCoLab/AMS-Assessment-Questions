# MASTER SETUP GUIDE
## Complete Make.com Automation - Single Source of Truth

**Version:** 1.0
**Last Updated:** November 4, 2025
**Status:** Production Ready

**This is your ONLY guide. Don't use any other documents for Make.com setup.**

---

## 🎯 WHAT YOU'RE BUILDING

Two connected Make.com scenarios that create a complete lead generation and nurture system:

```
SCENARIO 1: Immediate Processing (Build First - 60 min)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Assessment Submitted
    ↓
Make.com Webhook Receives Data
    ↓
Spam Filter (reCAPTCHA ≥ 0.5)
    ↓
HubSpot: Create/Update Contact (PRIMARY CRM)
    ↓
Airtable: Backup Record (REDUNDANCY)
    ↓
Email: Immediate Thank You
    ↓
Airtable: Add to 24h Email Queue


SCENARIO 2: Claude AI Follow-up (Build Second - 90 min)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Schedule: Every day at 8:00 AM ET
    ↓
Airtable: Find records 24h old
    ↓
Iterator: Process each record
    ↓
Claude AI: Generate personalized analysis
    ↓
Email: Send to contact (CC: team)
    ↓
Airtable: Mark as processed
```

**Total Time:** 2.5-3 hours
**Prerequisite:** Webhook already working ✅ (you've got this!)

---

## 📋 PART 1: PREPARATION (15 MINUTES)

Before building scenarios, ensure you have the right HubSpot properties.

### **STEP 1: Check Which HubSpot Properties Already Exist**

According to your `Aftermath_HubSpot_Implementation_Playbook.md`, these **5 properties already exist:**

1. ✅ `lead_score` (Number, 0-100)
2. ✅ `gap_category` (Dropdown)
3. ✅ `month_six_client` (Dropdown)
4. ✅ `priority_level` (Dropdown: A+, A, B, C)
5. ✅ `recommended_service` (Text)

**Verify these exist:**
1. Go to HubSpot → Settings → Data Management → Properties
2. Search for: `lead_score`
3. If it exists, you're good! These are your foundation properties.

---

### **STEP 2: Create Phase 2 Assessment Properties** ⭐ **DO THIS NOW**

You need 9 more properties to capture complete assessment data.

**Go to HubSpot → Settings → Data Management → Properties → Contact → Create Property**

Create each of these **exactly** as specified:

#### **Property 1: Assessment Completion Status**

```
Property Label: Assessment Status
Internal Name: assessment_completion_status
Type: Dropdown select
Group: Assessment Data (create this group if it doesn't exist)
Options:
  - Not Started
  - In Progress
  - Completed
  - Declined
```

#### **Property 2: Preparedness Score**

```
Property Label: Preparedness Score
Internal Name: assessment_score_preparedness
Type: Number
Group: Assessment Data
Description: Preparedness domain score (0-100)
```

#### **Property 3: Communication/Response Score**

```
Property Label: Response Score
Internal Name: assessment_score_communication
Type: Number
Group: Assessment Data
Description: Response capability score (0-100)
Note: Your assessment calls this "response_score"
```

#### **Property 4: Capacity/Support Score**

```
Property Label: Support Score
Internal Name: assessment_score_capacity
Type: Number
Group: Assessment Data
Description: Support systems score (0-100)
Note: Your assessment calls this "support_score"
```

#### **Property 5: Resilience/Recovery Score**

```
Property Label: Recovery Score
Internal Name: assessment_score_resilience
Type: Number
Group: Assessment Data
Description: Recovery capability score (0-100)
Note: Your assessment calls this "recovery_score"
```

#### **Property 6: Total Assessment Score**

```
Property Label: Total Assessment Score
Internal Name: assessment_total_score
Type: Number
Group: Assessment Data
Description: Combined score from all domains (0-400)
Note: Your assessment calls this "overall_score"
```

#### **Property 7: Top Gap Identified**

```
Property Label: Primary Gap
Internal Name: assessment_top_gap
Type: Dropdown select
Group: Assessment Data
Options:
  - Preparedness
  - Response
  - Recovery
  - Support
Note: Your assessment sends "highest_gap_area"
```

#### **Property 8: Assessment Completion Date**

```
Property Label: Assessment Date
Internal Name: assessment_completion_date
Type: Date picker
Group: Assessment Data
```

#### **Property 9: Recommended Tier**

```
Property Label: Recommended Service Tier
Internal Name: recommended_tier
Type: Single-line text
Group: Assessment Data
```

**⏱️ Time to create all 9: ~15 minutes**

**✅ Verification:** After creating, search for `assessment_score_preparedness` in HubSpot properties. If you find it, you're done!

---

### **STEP 3: Verify Airtable Tables Exist**

You need 2 tables in Airtable. Check if they exist:

1. Go to Airtable → Base: **"Lead Pipeline Dashboard"** (Base ID: appt66MN9uPoEOriV)
2. Look for these tables:
   - ✅ `📊 Assessment Raw Data`
   - ✅ `📧 Email Follow-Up Queue`

**If they exist:** You're ready!

**If they don't exist:** Create them now:

#### **Table 1: 📊 Assessment Raw Data**

Fields (in this order):
```
1. Assessment ID (Single line text) - Primary field
2. Submission Date (Date)
3. Name (Single line text)
4. Email (Email)
5. Organization (Single line text)
6. Organization Type (Single select)
7. Overall Score (Number)
8. Preparedness Score (Number)
9. Response Score (Number)
10. Recovery Score (Number)
11. Support Score (Number)
12. Lead Score (Number)
13. Gap Level (Single select: Critical, Significant, Moderate, Minor)
14. Recommended Tier (Single line text)
15. Recommended Service (Single line text)
16. Wants Consultation (Checkbox)
17. Wants Newsletter (Checkbox)
18. Wants Training (Checkbox)
19. HubSpot Contact ID (Single line text)
20. Status (Single select: New, Contacted, Qualified, Lost)
21. Raw Data JSON (Long text)
```

#### **Table 2: 📧 Email Follow-Up Queue**

Fields (in this order):
```
1. Assessment ID (Single line text) - Primary field
2. Submission Timestamp (Date with time)
3. Contact Name (Single line text)
4. Contact Email (Email)
5. Organization (Single line text)
6. Assessment Data (Long text)
7. Processed (Checkbox)
8. Email Sent Date (Date with time)
9. Status (Single select: Queued, Sent, Failed)
10. Claude Analysis (Long text)
```

**⏱️ Time to create: ~10 minutes total**

---

## 🚀 PART 2: BUILD SCENARIO 1 - IMMEDIATE PROCESSING (60 MINUTES)

This scenario processes every assessment submission in real-time.

### **STEP 4: Create New Scenario**

1. Go to https://www.make.com/
2. Click **"Scenarios"** (left sidebar)
3. Click **"Create a new scenario"**
4. **Name:** `Aftermath Assessment - Immediate Processing`
5. Click **"Continue"**

---

### **STEP 5: Configure Webhook (Already Working!)**

Your webhook is already working: `https://hook.us2.make.com/y7n8tnm51v3hesxlxnn907vhur4iddp9`

**Add it to this scenario:**

1. Click the big **"+"** to add first module
2. Search: **"Webhooks"**
3. Select: **"Webhooks" → "Custom webhook"**
4. In the dropdown, select: **"Use existing webhook"**
5. Find and select your webhook (should show the URL above)
6. Click **"OK"**

**The webhook is now module #1** (note this number - you'll use it for mapping)

---

### **STEP 6: Add Router (Spam Filter)**

1. Click **"+"** after the webhook
2. Search: **"Router"**
3. Select: **"Flow control" → "Router"**
4. Click **"OK"**

**Configure Route 1 - Human Traffic:**
1. Click **"Set filter"** on the FIRST route (top path)
2. **Label:** `Human Traffic (reCAPTCHA OK)`
3. **Condition:**
   - Click in field → Select `recaptcha_score` from webhook
   - Operator: **"Greater than or equal to"**
   - Value: `0.5`
   - OR
   - `recaptcha_score` **"Does not exist"** (for testing)
4. Click **"OK"**

**Leave Route 2 empty for now** (we'll add bot logging later if needed)

---

### **STEP 7: Add HubSpot - Create/Update Contact** ⭐ **CRITICAL**

**On Route 1 (Human Traffic) path:**

1. Click **"+"** after Route 1
2. Search: **"HubSpot"**
3. Select: **"HubSpot CRM"**
4. Action: **"Create or Update a Contact"**
5. Click **"Create a connection"**
6. **Connection name:** `Aftermath HubSpot`
7. Click **"Sign in with HubSpot"**
8. Authorize Make.com
9. Click **"Save"**

**Now map the fields - THIS IS CRITICAL TO GET RIGHT:**

#### **Standard Fields:**

| HubSpot Field | Formula to Use |
|---------------|----------------|
| **Email*** (required) | Click field → Select `email` from webhook (module 1) |
| **First Name** | `{{split(1.name; " ")[1]}}` |
| **Last Name** | `{{split(1.name; " ")[2]}}` |
| **Company** | Click field → Select `organization` from webhook |

**⚠️ Note:** Replace `1` with your actual webhook module number if different!

#### **Custom Properties:**

Click **"Show advanced settings"** at the bottom.

**Scroll down to find these properties and map them:**

**Existing Properties (5):**

```
lead_score = {{1.lead_score}}

gap_category = {{1.gap_level}}

priority_level = {{if(1.lead_score >= 80; "A+"; if(1.lead_score >= 70; "A"; if(1.lead_score >= 50; "B"; "C")))}}

recommended_service = {{1.recommended_service}}

month_six_client = {{if(1.lead_score >= 70; "Yes"; "Needs Assessment")}}
```

**Phase 2 Properties (9) - The ones you just created:**

```
assessment_completion_status = Completed
(Type this manually - not from webhook)

assessment_score_preparedness = {{1.preparedness_score}}

assessment_score_communication = {{1.response_score}}
⚠️ NOTE: Webhook sends "response_score" → HubSpot property is "assessment_score_communication"

assessment_score_capacity = {{1.support_score}}
⚠️ NOTE: Webhook sends "support_score" → HubSpot property is "assessment_score_capacity"

assessment_score_resilience = {{1.recovery_score}}
⚠️ NOTE: Webhook sends "recovery_score" → HubSpot property is "assessment_score_resilience"

assessment_total_score = {{1.overall_score}}
⚠️ NOTE: Webhook sends "overall_score" → HubSpot property is "assessment_total_score"

assessment_top_gap = {{1.highest_gap_area}}

assessment_completion_date = {{1.assessment_completed}}

recommended_tier = {{1.recommended_tier}}
```

**How to enter formulas:**
1. Click in the property field in Make.com
2. You'll see available data from previous modules
3. You can click to insert OR type the formula directly
4. Formulas use double curly braces: `{{1.field_name}}`

10. Click **"OK"** when all fields are mapped

**⏱️ Time for this step: 15 minutes**

---

### **STEP 8: Add Airtable - Backup Record**

1. Click **"+"** after HubSpot module
2. Search: **"Airtable"**
3. Select: **"Airtable"**
4. Action: **"Create a record"**
5. Click **"Create a connection"**
6. **Connection name:** `Aftermath Airtable`
7. Click **"Sign in with Airtable"**
8. Authorize Make.com
9. Click **"Save"**

**Configure Airtable:**

| Setting | Select |
|---------|--------|
| **Base** | Lead Pipeline Dashboard |
| **Table** | 📊 Assessment Raw Data |

**Map these fields:**

```
Assessment ID = {{1.assessment_id}}
Submission Date = {{1.assessment_completed}}
Name = {{1.name}}
Email = {{1.email}}
Organization = {{1.organization}}
Organization Type = {{1.org_info}}
Overall Score = {{1.overall_score}}
Preparedness Score = {{1.preparedness_score}}
Response Score = {{1.response_score}}
Recovery Score = {{1.recovery_score}}
Support Score = {{1.support_score}}
Lead Score = {{1.lead_score}}
Gap Level = {{1.gap_level}}
Recommended Tier = {{1.recommended_tier}}
Recommended Service = {{1.recommended_service}}
Wants Consultation = {{1.wants_consultation}}
Wants Newsletter = {{1.wants_newsletter}}
Wants Training = {{1.wants_training}}
HubSpot Contact ID = {{2.id}}
(This comes from HubSpot module output - click to select "ID" from module 2)
Status = New
(Type manually)
Raw Data JSON = {{toString(1)}}
(Stores complete webhook data)
```

10. Click **"OK"**

**⏱️ Time: 10 minutes**

---

### **STEP 9: Add Email - Immediate Thank You**

1. Click **"+"** after Airtable
2. Search: **"Email"**
3. Select: **"Email" → "Send an email"**
4. Click **"Create a connection"**
5. **Choose your email provider:**
   - **Gmail** (if Google Workspace)
   - **Microsoft 365** (if Outlook)
   - **SMTP** (other providers)
6. Authorize and save

**Configure email:**

```
To: {{1.email}}
From Name: Aftermath Solutions
From Email: team@theaftermathsolutions.com
Subject: Thank you for completing the Organizational Resilience Equation
Content Type: HTML
```

**Email Body (copy/paste this HTML):**

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">

  <!-- Header -->
  <div style="background: linear-gradient(135deg, #49AA91, #2E476C); padding: 30px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">Thank You, {{1.name}}!</h1>
  </div>

  <!-- Body -->
  <div style="padding: 30px;">
    <p style="font-size: 16px; line-height: 1.6; color: #333;">
      Thank you for taking the time to complete the Organizational Resilience Equation for <strong>{{1.organization}}</strong>.
    </p>

    <!-- Results Box -->
    <div style="background: #f8f9fa; border-left: 4px solid #49AA91; padding: 20px; margin: 25px 0;">
      <h3 style="margin-top: 0; color: #2E476C; font-size: 18px;">Your Results Summary</h3>
      <p style="margin: 8px 0; font-size: 15px;"><strong>Overall Resilience:</strong> {{1.overall_score}}/100</p>
      <p style="margin: 8px 0; font-size: 15px;"><strong>Gap Level:</strong> {{1.gap_level}}</p>
      <p style="margin: 8px 0; font-size: 15px;"><strong>Recommended Solution:</strong> {{1.recommended_tier}}</p>
    </div>

    <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 25px;">
      <strong>What happens next?</strong>
    </p>

    <p style="font-size: 16px; line-height: 1.6; color: #333;">
      Within the next 24-48 hours, you'll receive a personalized analysis of your results with:
    </p>

    <ul style="font-size: 15px; line-height: 1.8; color: #333; margin-left: 20px;">
      <li>Detailed interpretation of your organizational resilience factors</li>
      <li>Specific recommendations tailored to {{1.organization}}</li>
      <li>Next steps to strengthen your crisis preparedness</li>
      <li>Information about our solutions that align with your needs</li>
    </ul>

    <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 20px;">
      In the meantime, if you have any questions, please don't hesitate to reach out.
    </p>

    <!-- CTA Button -->
    <div style="text-align: center; margin: 35px 0;">
      <a href="https://meetings-na2.hubspot.com/josh-garcia/aftermath-solutions"
         style="display: inline-block; background: #49AA91; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
        Schedule a Free Consultation
      </a>
    </div>

    <!-- Footer -->
    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd;">
      <p style="font-size: 14px; color: #666; line-height: 1.5; margin: 5px 0;">
        <strong style="color: #2E476C;">Aftermath Solutions</strong><br>
        Solving for the Aftermath—Before, During, and After
      </p>
      <p style="font-size: 14px; color: #666; line-height: 1.5; margin: 5px 0;">
        <a href="mailto:team@theaftermathsolutions.com" style="color: #49AA91; text-decoration: none;">team@theaftermathsolutions.com</a><br>
        <a href="https://www.theaftermathsolutions.com" style="color: #49AA91; text-decoration: none;">www.theaftermathsolutions.com</a>
      </p>
    </div>

  </div>
</div>
```

7. Click **"OK"**

**⏱️ Time: 10 minutes**

---

### **STEP 10: Add to Email Queue for 24h Follow-up**

1. Click **"+"** after Email module
2. Search: **"Airtable"**
3. Select: **"Airtable" → "Create a record"**
4. Use existing Airtable connection
5. **Base:** Lead Pipeline Dashboard
6. **Table:** 📧 Email Follow-Up Queue

**Map fields:**

```
Assessment ID = {{1.assessment_id}}
Submission Timestamp = {{1.assessment_completed}}
Contact Name = {{1.name}}
Contact Email = {{1.email}}
Organization = {{1.organization}}
Assessment Data = {{toString(1)}}
(This stores the complete webhook data as JSON)
Processed = false
(Uncheck the checkbox)
Status = Queued
(Type manually)
```

7. Click **"OK"**

**⏱️ Time: 5 minutes**

---

### **STEP 11: Save and Test Scenario 1**

1. Click **"Save"** button (bottom right)
2. **Turn ON the scenario** - Toggle in top right should be green/blue
3. Click **"Run once"** (bottom left)
4. Go to your assessment: https://assessment.theaftermathsolutions.com
5. Complete a test submission
6. Return to Make.com and watch it execute

**✅ Verify each module shows green checkmark:**
- Webhook received data
- Router passed through human traffic
- HubSpot contact created
- Airtable record created
- Email sent
- Queue record created

**Check your results:**
- **HubSpot:** Search for the test contact, verify all properties populated
- **Airtable:** Check Assessment Raw Data table for new record
- **Email:** Check your inbox for thank you email
- **Queue:** Check Email Follow-Up Queue table - should show "Queued" status

**If any module fails:**
- Click the module to see error details
- Common fix: Field name typo in mapping
- Common fix: Property doesn't exist in HubSpot (go create it)

**⏱️ Testing time: 10 minutes**

---

## 🤖 PART 3: BUILD SCENARIO 2 - CLAUDE AI FOLLOW-UP (90 MINUTES)

This scenario runs daily at 8:00 AM ET to send personalized follow-up emails.

### **STEP 12: Get Claude API Key** ⭐ **DO THIS FIRST**

1. Go to: https://console.anthropic.com/
2. Sign up or log in
3. Click **"API Keys"** in left sidebar
4. Click **"Create Key"**
5. **Name:** `Make.com Assessment Follow-up`
6. Click **"Create"**
7. **Copy the key** - you'll need it in Step 17
8. **Keep it safe** - you can't see it again!

**⏱️ Time: 5 minutes**

---

### **STEP 13: Create Second Scenario**

1. Go to Make.com → Scenarios
2. Click **"Create a new scenario"**
3. **Name:** `Aftermath Assessment - Claude Follow-up Emails`
4. Click **"Continue"**

---

### **STEP 14: Add Schedule Trigger**

1. Click the big **"+"** to add first module
2. Search: **"Schedule"**
3. Select: **"Tools" → "Schedule" → "Every day"**

**Configure:**
```
Time: 08:00 (8:00 AM)
Time zone: America/New_York (Eastern Time)
```

4. Click **"OK"**

---

### **STEP 15: Search Airtable for 24h Old Records**

1. Click **"+"** after Schedule
2. Search: **"Airtable"**
3. Select: **"Search records"**
4. Use existing Airtable connection
5. **Base:** Lead Pipeline Dashboard
6. **Table:** 📧 Email Follow-Up Queue
7. **Formula:** (paste this exactly)

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

8. **Max records:** `50`
9. Click **"OK"**

**This finds records submitted 23-25 hours ago (24h window with buffer).**

---

### **STEP 16: Add Iterator**

1. Click **"+"** after Airtable Search
2. Search: **"Iterator"**
3. Select: **"Flow control" → "Iterator"**
4. **Array:** Click and select the **entire bundle array** from Airtable Search (module 2)
5. Click **"OK"**

**The iterator will process each queued email one at a time.**

---

### **STEP 17: Call Claude AI API** ⭐ **CRITICAL**

1. Click **"+"** after Iterator
2. Search: **"HTTP"**
3. Select: **"HTTP" → "Make a request"**

**Configure:**

```
URL: https://api.anthropic.com/v1/messages
Method: POST
```

**Headers (click "+ Add item" for each):**

```
Header 1:
  Key: x-api-key
  Value: [PASTE YOUR CLAUDE API KEY HERE]

Header 2:
  Key: anthropic-version
  Value: 2023-06-01

Header 3:
  Key: content-type
  Value: application/json
```

**Body Type:** Raw

**Body Content (paste this entire JSON):**

```json
{
  "model": "claude-3-5-sonnet-20241022",
  "max_tokens": 4000,
  "temperature": 0.7,
  "system": "You are a compassionate crisis preparedness consultant at Aftermath Solutions.\n\nYour role is to analyze organizational resilience assessment results and write personalized follow-up emails that:\n1. Interpret assessment scores in context\n2. Validate current strengths\n3. Gently highlight critical gaps without causing alarm\n4. Recommend specific, actionable next steps\n5. Match them to appropriate service tiers\n\nTONE GUIDELINES:\n- Use trauma-informed language (avoid: triggered, ignite, aim, fire, shoot, explode, bomb, attack, target)\n- Be supportive and validating, not sales-y\n- Acknowledge the complexity of crisis preparedness\n- Focus on organizational resilience, not fear\n\nSERVICE TIERS:\n\nTIER 1: Foundational Workshops ($2,000-$10,000)\n- Organizational Trauma Literacy\n- Traumatic Stress Psychoeducation\n- Youth & Family Support\n\nTIER 2: Strategic Intensives ($10,000-$30,000)\n- Crisis Preparedness Assessment & Implementation\n- Leadership Resilience Intensive\n- Clinician Resilience & Moral Injury Recovery\n- The Re-Treatment Intensive\n\nTIER 3: Full-Spectrum Partnership ($30,000-$150,000+)\n- Comprehensive organizational transformation\n- 6-18 month partnerships\n- Custom framework development\n\nOUTPUT: Generate ONLY the email body in HTML format. Do NOT include subject line.",
  "messages": [
    {
      "role": "user",
      "content": "Generate a personalized follow-up email for this assessment:\n\nCONTACT INFO:\nName: {{3.Contact Name}}\nOrganization: {{3.Organization}}\nEmail: {{3.Contact Email}}\n\nASSESSMENT DATA:\n{{parseJSON(3.Assessment Data)}}\n\nWrite a thoughtful, personalized email (400-600 words) that:\n1. References specific assessment results\n2. Interprets what the scores mean\n3. Highlights 2-3 key strengths\n4. Identifies 2-3 priority areas for improvement\n5. Recommends specific services from appropriate tier\n6. Includes clear call-to-action\n7. Signs off as 'The Aftermath Solutions Team'\n\nGenerate ONLY the HTML email body, no subject line."
    }
  ]
}
```

**⚠️ Note:** The `{{3.Contact Name}}` references module 3 (Iterator). Adjust if your module numbers are different!

4. Click **"OK"**

**⏱️ Time: 15 minutes**

---

### **STEP 18: Parse Claude Response**

1. Click **"+"** after HTTP module
2. Search: **"JSON"**
3. Select: **"Tools" → "Parse JSON"**
4. **JSON string:** Click and map `Data` from HTTP module (module 4)
5. Click **"OK"**

**This extracts the email HTML from Claude's JSON response.**

---

### **STEP 19: Send Personalized Email**

1. Click **"+"** after JSON Parse
2. Search: **"Email"**
3. Select: **"Send an email"**
4. Use existing email connection

**Configure:**

```
To: {{3.Contact Email}}
CC: team@theaftermathsolutions.com
From Name: Aftermath Solutions
From Email: team@theaftermathsolutions.com
Subject: Your Organizational Resilience Analysis for {{3.Organization}}
Content Type: HTML
```

**Body:**
- Click in Body field
- Map: `content` → `text` from JSON Parse module (module 5)
- This is Claude's generated email HTML

4. Click **"OK"**

**⏱️ Time: 5 minutes**

---

### **STEP 20: Mark Record as Processed**

1. Click **"+"** after Email module
2. Search: **"Airtable"**
3. Select: **"Update a record"**
4. Use existing connection
5. **Base:** Lead Pipeline Dashboard
6. **Table:** 📧 Email Follow-Up Queue
7. **Record ID:** Click and map `ID` from Iterator (module 3)

**Update these fields:**

```
Processed = true (check the checkbox)
Email Sent Date = {{now}}
Status = Sent (type manually)
Claude Analysis = {{toString(4)}}
(Stores Claude's full response for logging)
```

8. Click **"OK"**

**⏱️ Time: 5 minutes**

---

### **STEP 21: Add Error Handler** (Optional but Recommended)

If Claude fails for one email, don't stop processing others:

1. **Right-click** the HTTP module (Claude request)
2. Select **"Add error handler"**
3. Select **"Ignore"**
4. Click **"OK"**

This ensures one failed email doesn't break the whole batch.

---

### **STEP 22: Save and Test Scenario 2**

1. Click **"Save"** button
2. **Turn ON the scenario** - Toggle should be green/blue
3. **Test it manually:**

**Option A: Manual Test Now**
1. Click **"Run once"**
2. It should find records 24h old in the queue
3. Watch it process each one
4. Check your email for the Claude-generated message

**Option B: Create Test Record**
1. Go to Airtable → Email Follow-Up Queue
2. Manually create a record:
   - Assessment ID: test_manual_123
   - Submission Timestamp: Set to exactly 24 hours ago
   - Contact Name: Your name
   - Contact Email: Your email
   - Organization: Test Org
   - Assessment Data: Copy JSON from a real assessment
   - Processed: FALSE
   - Status: Queued
3. Run Scenario 2
4. Should process this test record

**✅ Verify:**
- Schedule found the record
- Iterator processed it
- Claude generated email
- Email sent to you
- Record marked Processed = TRUE in Airtable

**⏱️ Testing time: 15 minutes**

---

## ✅ FINAL VERIFICATION CHECKLIST

### **Scenario 1: Immediate Processing**

Test by submitting assessment. Verify:

- [ ] Make.com webhook receives data
- [ ] Router filters spam (reCAPTCHA < 0.5 rejected)
- [ ] HubSpot contact created with ALL properties populated:
  - [ ] lead_score
  - [ ] gap_category
  - [ ] priority_level
  - [ ] recommended_service
  - [ ] assessment_score_preparedness
  - [ ] assessment_score_communication (from response_score)
  - [ ] assessment_score_capacity (from support_score)
  - [ ] assessment_score_resilience (from recovery_score)
  - [ ] assessment_total_score (from overall_score)
  - [ ] assessment_top_gap
  - [ ] assessment_completion_date
  - [ ] recommended_tier
- [ ] Airtable record created in Assessment Raw Data
- [ ] Thank you email received immediately
- [ ] Record added to Email Follow-Up Queue (Status: Queued)

### **Scenario 2: Claude Follow-up**

Test manually or wait 24h. Verify:

- [ ] Scenario runs at 8:00 AM ET daily
- [ ] Finds records 24h old
- [ ] Iterator processes each record
- [ ] Claude generates personalized email
- [ ] Email sent to contact
- [ ] Team CC'd (team@theaftermathsolutions.com)
- [ ] Record marked Processed = TRUE
- [ ] Status updated to "Sent"
- [ ] Email Sent Date populated

---

## 🚨 TROUBLESHOOTING

### **HubSpot Module Issues**

**Error: "Property doesn't exist"**
- **Cause:** Property not created in HubSpot
- **Fix:** Go to HubSpot → Settings → Properties → Create it (see Step 2)

**Error: "Invalid email format"**
- **Cause:** Email field mapping wrong
- **Fix:** Map to `{{1.email}}` directly from webhook

**Error: "Required field missing"**
- **Cause:** Email field not mapped
- **Fix:** Email is required - must map it!

### **Airtable Module Issues**

**Error: "Field doesn't exist"**
- **Cause:** Field name in table doesn't match
- **Fix:** Check spelling exactly - case sensitive!

**Error: "Invalid field type"**
- **Cause:** Mapping text to number field
- **Fix:** Check field type in Airtable matches data type

### **Claude AI Issues**

**Error: 401 Unauthorized**
- **Cause:** Invalid API key
- **Fix:** Check you copied the full key in the x-api-key header

**Error: 400 Bad Request**
- **Cause:** JSON body format wrong
- **Fix:** Copy/paste the exact JSON from Step 17

**Error: 429 Rate Limit**
- **Cause:** Too many requests
- **Fix:** Upgrade Claude plan or reduce frequency

### **Email Issues**

**Email not sending**
- **Cause:** Email connection not authorized
- **Fix:** Reconnect email provider in Make.com

**Claude email has weird formatting**
- **Cause:** Not parsing JSON correctly
- **Fix:** Make sure you added the Parse JSON module (Step 18)

### **No Records Found in Queue**

**Schedule finds 0 records**
- **Cause:** No records exactly 24h old OR Processed = TRUE already
- **Fix:** Check Airtable formula, verify timestamps, check Processed checkbox

---

## 📊 DAILY MONITORING

### **Check These Daily (5 min):**
- [ ] Scenario 1 executed successfully (check History)
- [ ] Scenario 2 ran at 8am ET (check History)
- [ ] No failed executions (red X's)
- [ ] HubSpot contacts being created
- [ ] Airtable backup working

### **Check These Weekly (15 min):**
- [ ] Spot check 2-3 Claude emails for quality
- [ ] Verify HubSpot properties accurate
- [ ] Check Airtable vs HubSpot data matches
- [ ] Review Make.com operations usage

---

## 🎉 YOU'RE DONE!

**Your complete system is now live:**

✅ Assessments automatically create HubSpot contacts
✅ All data backed up to Airtable
✅ Immediate thank you email sent
✅ Personalized AI follow-up 24h later
✅ Team CC'd on all follow-ups
✅ Complete lead pipeline automation

**What happens now:**
1. Every assessment submission flows through Scenario 1
2. Every morning at 8am, Scenario 2 sends personalized follow-ups
3. Team receives copies of all emails
4. You can track everything in HubSpot and Airtable

**Next steps:**
1. Monitor for 1 week
2. Review Claude email quality
3. Adjust system prompt if needed (Step 17)
4. Consider enhancements (see ARCHIVE/old-make-docs/MAKE-COM-ENHANCEMENTS.md)

---

**This is your ONLY Make.com guide. All other docs are archived.**

**Questions? Check TROUBLESHOOTING.md for common issues.**

**Last Updated:** November 4, 2025
**Version:** 1.0
**Status:** Production Ready ✅
