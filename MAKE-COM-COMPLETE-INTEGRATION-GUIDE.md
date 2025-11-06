# Complete Make.com Integration Guide
## Unified Scenario Setup - All Platforms Connected

**Version:** 2.0  
**Last Updated:** January 2025  
**Status:** Production Ready - Single Source of Truth

**This document supersedes and replaces all previous Make.com guides. It connects:**
- ✅ HubSpot (PRIMARY CRM)
- ✅ Airtable (Backup & Verification)
- ✅ Mailchimp (Email Marketing)
- ✅ Claude AI (Personalized Follow-ups)
- ✅ Gmail/Email (Notifications & Thank You)
- ✅ Make.com (Automation Hub)

---

## 🎯 SYSTEM ARCHITECTURE OVERVIEW

```
Assessment Submission
    ↓
Make.com Webhook (Receives Data)
    ↓
Router (Spam Filter: reCAPTCHA ≥ 0.5)
    ↓
┌─────────────────────────────────────────┐
│  PARALLEL PROCESSING (All at Once)     │
└─────────────────────────────────────────┘
    ├─→ HubSpot: Create/Update Contact (PRIMARY)
    ├─→ Airtable: Backup Record (REDUNDANCY)
    ├─→ Mailchimp: Add Subscriber (if wants_newsletter)
    ├─→ Email: Immediate Thank You
    └─→ Airtable: Add to 24h Email Queue
         ↓
    (24 Hours Later)
         ↓
Scenario 2: Claude AI Follow-up
    ├─→ Claude AI: Generate Personalized Email
    ├─→ Email: Send to Contact (CC: team)
    └─→ Airtable: Mark as Processed
```

---

## 📋 SCENARIO 1: IMMEDIATE PROCESSING
### Complete Module-by-Module Setup

**Time Required:** 90-120 minutes  
**Prerequisite:** All HubSpot properties created (see HubSpot Playbook)

---

### **MODULE 1: Webhook Trigger**

**Setup:**
1. Create new scenario in Make.com
2. Name: `Aftermath Assessment - Immediate Processing`
3. Add **Webhooks → Custom webhook**
4. Select: **"Use existing webhook"** OR create new
5. **Webhook URL:** `https://hook.us2.make.com/y7n8tnm51v3hesxlxnn907vhur4iddp9`
6. **Method:** POST
7. Click **"OK"**

**Expected Data Structure:**
```json
{
  "assessment_id": "assess_1234567890_abc",
  "name": "John Smith",
  "email": "john@school.org",
  "organization": "Lincoln Middle School",
  "org_info": "K-12 Education",
  "overall_score": 73,
  "preparedness_score": 58,
  "response_score": 67,
  "recovery_score": 81,
  "support_score": 75,
  "lead_score": 82,
  "gap_level": "Significant",
  "recommended_tier": "TIER 2",
  "recommended_service": "Crisis Preparedness Assessment & Implementation",
  "wants_consultation": true,
  "wants_newsletter": true,
  "wants_training": false,
  "recaptcha_score": 0.9,
  "assessment_completed": "2025-01-15T10:30:00Z"
}
```

---

### **MODULE 2: Router (Spam Filter)**

**Setup:**
1. Click **"+"** after webhook
2. Search: **"Router"**
3. Select: **"Flow control → Router"**
4. Click **"OK"**

**Route 1: Human Traffic (reCAPTCHA ≥ 0.5)**
- Click **"Set filter"** on first route
- **Label:** `Human Traffic`
- **Condition:**
  - Field: `recaptcha_score` (from Module 1)
  - Operator: **"Greater than or equal to"**
  - Value: `0.5`
- **OR Condition** (for testing):
  - Field: `recaptcha_score`
  - Operator: **"Does not exist"**
- Click **"OK"**

**Route 2: Bot Traffic (Optional - Log Only)**
- Click **"Set filter"** on second route
- **Label:** `Bot Traffic - Log Only`
- **Condition:**
  - Field: `recaptcha_score`
  - Operator: **"Less than"**
  - Value: `0.5`
- Leave empty (or add Google Sheets logging if desired)

**All modules below go on Route 1 (Human Traffic path)**

---

### **MODULE 3: HubSpot - Create/Update Contact** ⭐ **PRIMARY CRM**

**Setup:**
1. Click **"+"** after Route 1
2. Search: **"HubSpot"**
3. Select: **"HubSpot CRM"**
4. Action: **"Create or Update a Contact"**
5. **Connection:** Create new or use existing
   - Connection name: `Aftermath HubSpot`
   - Authorize with HubSpot
   - Click **"Save"**

**Field Mappings:**

#### **Standard Fields:**
| HubSpot Field | Make.com Formula |
|---------------|------------------|
| **Email*** (required) | `{{1.email}}` |
| **First Name** | `{{split(1.name; " ")[1]}}` |
| **Last Name** | `{{split(1.name; " ")[2]}}` or leave blank |
| **Company** | `{{1.organization}}` |

#### **Existing Properties (5 - Already Created):**
| HubSpot Property | Make.com Formula |
|------------------|------------------|
| `lead_score` | `{{1.lead_score}}` |
| `gap_category` | `{{1.gap_level}}` |
| `priority_level` | `{{if(1.lead_score >= 80; "A+"; if(1.lead_score >= 70; "A"; if(1.lead_score >= 50; "B"; "C")))}}` |
| `recommended_service` | `{{1.recommended_service}}` |
| `month_six_client` | `{{if(1.lead_score >= 70; "Yes"; "Needs Assessment")}}` |

#### **Phase 2 Assessment Properties (9 - Create in HubSpot First):**

**⚠️ CRITICAL: Property Name Mismatches!**

The assessment sends:
- `response_score` → HubSpot property is `assessment_score_communication`
- `support_score` → HubSpot property is `assessment_score_capacity`
- `recovery_score` → HubSpot property is `assessment_score_resilience`
- `overall_score` → HubSpot property is `assessment_total_score`

| HubSpot Property | Make.com Formula | Notes |
|------------------|-------------------|-------|
| `assessment_completion_status` | `Completed` | Type manually |
| `assessment_score_preparedness` | `{{1.preparedness_score}}` | Direct mapping |
| `assessment_score_communication` | `{{1.response_score}}` | ⚠️ Different name! |
| `assessment_score_capacity` | `{{1.support_score}}` | ⚠️ Different name! |
| `assessment_score_resilience` | `{{1.recovery_score}}` | ⚠️ Different name! |
| `assessment_total_score` | `{{1.overall_score}}` | ⚠️ Different name! |
| `assessment_top_gap` | `{{1.highest_gap_area}}` | From assessment |
| `assessment_completion_date` | `{{1.assessment_completed}}` | Date format |
| `recommended_tier` | `{{1.recommended_tier}}` | Direct mapping |

#### **Phase 1 Foundation Properties:**

| HubSpot Property | Make.com Formula | Notes |
|------------------|-------------------|-------|
| `contact_type` | `{{if(1.lead_score >= 400; "Prospect - Hot (A+)"; if(1.lead_score >= 300; "Prospect - Priority (A)"; if(1.lead_score >= 200; "Prospect - Nurture (B)"; "Prospect - Archive (C)")))}}` | Auto-classify |
| `marketing_consent` | `Marketable - Soft Opt-in` | Type manually |
| `relationship_origin` | `Gap Assessment` | Type manually |
| `organization_sector` | `{{1.org_info}}` | Direct mapping |

**How to Enter Formulas:**
1. Click in the property field in Make.com
2. Click the data mapping icon (or type `{{` to start)
3. Select field from Module 1 (webhook) OR type formula directly
4. Formulas use double curly braces: `{{1.field_name}}`

**Click "OK" when all fields mapped**

---

### **MODULE 4: Airtable - Backup Record** ⭐ **REDUNDANCY**

**Setup:**
1. Click **"+"** after HubSpot module
2. Search: **"Airtable"**
3. Select: **"Airtable"**
4. Action: **"Create a record"**
5. **Connection:** Create new or use existing
   - Connection name: `Aftermath Airtable`
   - Authorize with Airtable
   - Click **"Save"**

**Configuration:**
| Setting | Value |
|---------|-------|
| **Base** | Lead Pipeline Dashboard (appt66MN9uPoEOriV) |
| **Table** | 📊 Assessment Raw Data |

**Field Mappings:**
| Airtable Field | Make.com Formula |
|----------------|------------------|
| Assessment ID | `{{1.assessment_id}}` |
| Submission Date | `{{1.assessment_completed}}` |
| Name | `{{1.name}}` |
| Email | `{{1.email}}` |
| Organization | `{{1.organization}}` |
| Organization Type | `{{1.org_info}}` |
| Overall Score | `{{1.overall_score}}` |
| Preparedness Score | `{{1.preparedness_score}}` |
| Response Score | `{{1.response_score}}` |
| Recovery Score | `{{1.recovery_score}}` |
| Support Score | `{{1.support_score}}` |
| Lead Score | `{{1.lead_score}}` |
| Gap Level | `{{1.gap_level}}` |
| Recommended Tier | `{{1.recommended_tier}}` |
| Recommended Service | `{{1.recommended_service}}` |
| Wants Consultation | `{{1.wants_consultation}}` |
| Wants Newsletter | `{{1.wants_newsletter}}` |
| Wants Training | `{{1.wants_training}}` |
| HubSpot Contact ID | `{{3.id}}` (from HubSpot module output) |
| Status | `New` (type manually) |
| Raw Data JSON | `{{toString(1)}}` (stores complete webhook data) |

**Click "OK"**

---

### **MODULE 5: Router - Newsletter Signup Check** 📬

**Setup:**
1. Click **"+"** after Airtable module
2. Search: **"Router"**
3. Select: **"Flow control → Router"**
4. Click **"OK"**

**Route 1: Wants Newsletter (Yes)**
- Click **"Set filter"**
- **Label:** `Newsletter Signup`
- **Condition:**
  - Field: `wants_newsletter` (from Module 1)
  - Operator: **"Equal to"**
  - Value: `true`
- Click **"OK"**

**Route 2: No Newsletter (Skip)**
- Leave empty (no action needed)

**Module 6 goes on Route 1 (Newsletter path)**

---

### **MODULE 6: Mailchimp - Add Subscriber** 📬

**Setup:**
1. Click **"+"** after Route 1 (Newsletter path)
2. Search: **"Mailchimp"**
3. Select: **"Mailchimp"**
4. Action: **"Add/Update Subscriber"**
5. **Connection:** Create new or use existing
   - Connection name: `Aftermath Mailchimp`
   - Authorize with Mailchimp
   - Click **"Save"**

**Configuration:**
| Setting | Value |
|---------|-------|
| **List/Audience** | Select your newsletter list (or create "Aftermath Assessment Subscribers") |
| **Email Address** | `{{1.email}}` |
| **Status** | `Subscribed` |
| **Double Opt-In** | `No` (they already opted in via assessment) |

**Merge Fields (Optional but Recommended):**
| Mailchimp Field | Make.com Formula |
|-----------------|------------------|
| `FNAME` | `{{split(1.name; " ")[1]}}` (first name) |
| `LNAME` | `{{split(1.name; " ")[2]}}` (last name) |
| `ORG` | `{{1.organization}}` |
| `LEADSCORE` | `{{1.lead_score}}` (if you have this merge field) |

**Tags (for Segmentation):**
- `assessment-completed`
- `lead-score-{{1.lead_score}}` (e.g., "lead-score-82")
- `{{1.gap_level}}` (e.g., "Significant", "Critical")
- `{{1.recommended_tier}}` (e.g., "TIER 2")

**Click "OK"**

**Also add to HubSpot list (in same route):**
- Add **HubSpot → Add Contact to List**
- List: Create "Newsletter Subscribers" list
- Contact ID: `{{3.id}}` (from HubSpot module)

---

### **MODULE 7: Email - Immediate Thank You**

**Setup:**
1. Click **"+"** after Mailchimp module (or after Router if no newsletter)
2. Search: **"Email"** or **"Gmail"**
3. Select: **"Email → Send an email"** OR **"Gmail → Send an email"**
4. **Connection:** Create new
   - **Connection Type Options:**
     - **Gmail** (if using Google Workspace) - Recommended
     - **Microsoft 365** (if using Outlook/Office 365)
     - **SMTP** (for other email providers)
   - Connection name: `Aftermath Email`
   - Authorize and save

**Configuration:**
| Field | Value |
|-------|-------|
| **To** | `{{1.email}}` |
| **From Name** | `Aftermath Solutions` |
| **From Email** | `team@theaftermathsolutions.com` |
| **Subject** | `Thank you for completing the Organizational Resilience Equation` |
| **Content Type** | `HTML` |

**Email Body (Copy/Paste this HTML):**
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

    {{#if 1.wants_consultation}}
    <div style="background: #49AA91; color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0; font-size: 16px; font-weight: bold;">✓ You requested a consultation</p>
      <p style="margin: 10px 0 0 0; font-size: 14px;">Our team will reach out within 24 hours to schedule your free 30-minute consultation.</p>
    </div>
    {{/if}}

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

**Click "OK"**

---

### **MODULE 8: Airtable - Add to Email Queue**

**Setup:**
1. Click **"+"** after Email module
2. Search: **"Airtable"**
3. Select: **"Airtable → Create a record"**
4. Use existing Airtable connection

**Configuration:**
| Setting | Value |
|---------|-------|
| **Base** | Lead Pipeline Dashboard |
| **Table** | 📧 Email Follow-Up Queue |

**Field Mappings:**
| Airtable Field | Make.com Formula |
|----------------|------------------|
| Assessment ID | `{{1.assessment_id}}` |
| Submission Timestamp | `{{1.assessment_completed}}` |
| Contact Name | `{{1.name}}` |
| Contact Email | `{{1.email}}` |
| Organization | `{{1.organization}}` |
| Assessment Data | `{{toString(1)}}` (complete JSON) |
| Processed | `false` (uncheck checkbox) |
| Status | `Queued` (type manually) |

**Click "OK"**

---

### **MODULE 9: Save and Activate Scenario 1**

1. Click **"Save"** button (bottom right)
2. **Turn ON the scenario** - Toggle in top right should be green/blue
3. Click **"Run once"** to test
4. Complete a test assessment submission
5. Watch Make.com execute all modules

**✅ Verify Each Module:**
- ✅ Webhook received data
- ✅ Router passed through human traffic
- ✅ HubSpot contact created with ALL properties
- ✅ Airtable backup record created
- ✅ Mailchimp subscriber added (if wants_newsletter)
- ✅ Thank you email sent
- ✅ Queue record created

---

## 🤖 SCENARIO 2: CLAUDE AI FOLLOW-UP
### Automated Personalized Email Generation

**Time Required:** 60-90 minutes  
**Prerequisite:** Scenario 1 working, at least one record in Email Queue

---

### **MODULE 1: Schedule Trigger**

**Setup:**
1. Create new scenario: `Aftermath Assessment - Claude Follow-up Emails`
2. Click **"+"** to add first module
3. Search: **"Schedule"**
4. Select: **"Tools → Schedule → Every day"**

**Configuration:**
| Setting | Value |
|---------|-------|
| **Time** | `08:00` (8:00 AM) |
| **Time zone** | `America/New_York` (Eastern Time) |
| **Start date** | Today |
| **End date** | Leave blank |

**Click "OK"**

---

### **MODULE 2: Airtable - Search Queued Records**

**Setup:**
1. Click **"+"** after Schedule
2. Search: **"Airtable"**
3. Select: **"Search records"**
4. Use existing Airtable connection

**Configuration:**
| Setting | Value |
|---------|-------|
| **Base** | Lead Pipeline Dashboard |
| **Table** | 📧 Email Follow-Up Queue |
| **Formula** | See below |
| **Max records** | `50` |

**Airtable Formula (Paste Exactly):**
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

**This finds records:**
- Not processed yet
- Status = Queued
- Submitted 23-25 hours ago (24h window with buffer)

**Click "OK"**

---

### **MODULE 3: Iterator**

**Setup:**
1. Click **"+"** after Airtable Search
2. Search: **"Iterator"**
3. Select: **"Flow control → Iterator"**
4. **Array:** Click and select the entire bundle array from Module 2
5. Click **"OK"**

---

### **MODULE 4: Claude AI - Generate Email**

**Setup:**
1. Click **"+"** after Iterator
2. Search: **"HTTP"**
3. Select: **"HTTP → Make a request"**

**Configuration:**
| Setting | Value |
|---------|-------|
| **URL** | `https://api.anthropic.com/v1/messages` |
| **Method** | `POST` |

**Headers (Click "+ Add item" for each):**
| Header | Value |
|--------|-------|
| `x-api-key` | `YOUR_CLAUDE_API_KEY` (get from https://console.anthropic.com/) |
| `anthropic-version` | `2023-06-01` |
| `content-type` | `application/json` |

**Body Type:** Raw

**Body Content (Paste this JSON - Replace `3` with your Iterator module number):**
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

**⚠️ Note:** Replace `3` with your actual Iterator module number if different!

**Click "OK"**

---

### **MODULE 5: Parse JSON**

**Setup:**
1. Click **"+"** after HTTP module
2. Search: **"JSON"**
3. Select: **"Tools → Parse JSON"**
4. **JSON string:** Map `Data` from HTTP module (Module 4)
5. Click **"OK"**

---

### **MODULE 6: Email - Send Personalized Email**

**Setup:**
1. Click **"+"** after JSON Parse
2. Search: **"Email"** or **"Gmail"**
3. Select: **"Send an email"**
4. Use existing email connection

**Configuration:**
| Field | Value |
|-------|-------|
| **To** | `{{3.Contact Email}}` (from Iterator) |
| **CC** | `team@theaftermathsolutions.com` |
| **From Name** | `Aftermath Solutions` |
| **From Email** | `team@theaftermathsolutions.com` |
| **Subject** | `Your Organizational Resilience Analysis for {{3.Organization}}` |
| **Content Type** | `HTML` |
| **Body** | Map: `content[0].text` from JSON Parse module (Module 5) |

**⚠️ Note:** Claude returns `content` as an array, so you need `content[0].text` to get the HTML email body.

**Click "OK"**

---

### **MODULE 7: Airtable - Mark as Processed**

**Setup:**
1. Click **"+"** after Email module
2. Search: **"Airtable"**
3. Select: **"Update a record"**
4. Use existing connection

**Configuration:**
| Setting | Value |
|---------|-------|
| **Base** | Lead Pipeline Dashboard |
| **Table** | 📧 Email Follow-Up Queue |
| **Record ID** | `{{3.ID}}` (from Iterator) |

**Update Fields:**
| Field | Value |
|-------|-------|
| **Processed** | `true` (check checkbox) |
| **Email Sent Date** | `{{now}}` |
| **Status** | `Sent` (type manually) |
| **Claude Analysis** | `{{toString(4)}}` (stores Claude's full response) |

**Click "OK"**

---

### **MODULE 8: Error Handler (Recommended)**

**Setup:**
1. Right-click the HTTP module (Claude request)
2. Select **"Add error handler"**
3. Select **"Ignore"** (or add logging module)
4. Click **"OK"**

This ensures one failed email doesn't stop processing other queued emails.

---

### **MODULE 9: Save and Activate Scenario 2**

1. Click **"Save"** button
2. **Turn ON the scenario** - Toggle should be green/blue
3. **Test manually:**
   - Click **"Run once"**
   - Should find queued records 24h old
   - Process each one
   - Generate emails with Claude
   - Send and mark as processed

---

## ✅ VERIFICATION CHECKLIST

### **Scenario 1: Immediate Processing**

Test by submitting assessment. Verify:

- [ ] Make.com webhook receives data
- [ ] Router filters spam (reCAPTCHA < 0.5 rejected)
- [ ] HubSpot contact created with ALL properties populated:
  - [ ] Standard fields (email, name, company)
  - [ ] Existing properties (lead_score, gap_category, priority_level, etc.)
  - [ ] Phase 2 properties (assessment_score_preparedness, etc.)
  - [ ] Phase 1 properties (contact_type, marketing_consent, etc.)
- [ ] Airtable backup record created
- [ ] Mailchimp subscriber added (if wants_newsletter = true)
- [ ] Thank you email received immediately
- [ ] Record added to Email Follow-Up Queue (Status: Queued)

### **Scenario 2: Claude Follow-up**

Test manually or wait 24h. Verify:

- [ ] Scenario runs at 8:00 AM ET daily
- [ ] Finds records 24h old in queue
- [ ] Iterator processes each record
- [ ] Claude generates personalized email
- [ ] Email sent to contact
- [ ] Team CC'd (team@theaftermathsolutions.com)
- [ ] Record marked Processed = TRUE
- [ ] Status updated to "Sent"
- [ ] Email Sent Date populated

---

## 🔗 PLATFORM CONNECTIONS SUMMARY

### **HubSpot (PRIMARY CRM)**
- **Purpose:** Lead management, deal tracking, contact database
- **When:** Creates/updates on every assessment submission
- **Properties:** All assessment data, contact classification, marketing consent
- **Workflow:** Primary source of truth for sales team

### **Airtable (BACKUP & VERIFICATION)**
- **Purpose:** Data redundancy, backup, verification, email queue
- **When:** Creates record on every assessment submission
- **Tables:** Assessment Raw Data, Email Follow-Up Queue
- **Workflow:** Weekly verification against HubSpot, monthly reporting

### **Mailchimp (EMAIL MARKETING)**
- **Purpose:** Newsletter subscribers, email campaigns, segmentation
- **When:** Adds subscriber if wants_newsletter = true
- **Tags:** assessment-completed, lead-score-X, gap-level, tier
- **Workflow:** Automated nurture sequences, segmentation by lead quality

### **Claude AI (PERSONALIZATION)**
- **Purpose:** Generate personalized follow-up emails
- **When:** Daily at 8am ET, processes 24h-old assessments
- **Input:** Complete assessment data from Airtable queue
- **Output:** HTML email body sent to contact

### **Gmail/Email (NOTIFICATIONS)**
- **Purpose:** Send thank you emails, follow-up emails, team notifications
- **When:** Immediate (thank you) and 24h later (Claude follow-up)
- **Provider:** Gmail (Google Workspace) recommended, or Microsoft 365, or SMTP
- **From:** team@theaftermathsolutions.com

---

## 🚨 TROUBLESHOOTING

### **HubSpot Issues**

**Error: "Property doesn't exist"**
- **Cause:** Property not created in HubSpot
- **Fix:** Go to HubSpot → Settings → Properties → Create it (see HubSpot Playbook)

**Error: "Property name mismatch"**
- **Cause:** Assessment sends `response_score` but HubSpot expects `assessment_score_communication`
- **Fix:** Use correct mapping formulas in Module 3 (see above)

**Error: "Invalid email format"**
- **Cause:** Email field mapping wrong
- **Fix:** Map to `{{1.email}}` directly from webhook

### **Mailchimp Issues**

**Error: "Duplicate subscriber"**
- **Cause:** Email already exists in Mailchimp
- **Fix:** Use "Add/Update Subscriber" (not "Add Subscriber") - this updates existing

**Error: "List not found"**
- **Cause:** Wrong list selected or list doesn't exist
- **Fix:** Create list in Mailchimp first, then select in Make.com

### **Claude AI Issues**

**Error: 401 Unauthorized**
- **Cause:** Invalid API key
- **Fix:** Check you copied the full key in the x-api-key header

**Error: 400 Bad Request**
- **Cause:** JSON body format wrong
- **Fix:** Copy/paste the exact JSON from Module 4 above

**Error: Email has weird formatting**
- **Cause:** Not parsing JSON correctly
- **Fix:** Make sure you added Parse JSON module (Module 5) and map `content[0].text`

### **Airtable Issues**

**Error: "Field doesn't exist"**
- **Cause:** Field name in table doesn't match
- **Fix:** Check spelling exactly - case sensitive!

**Error: "No records found" in Scenario 2**
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
- [ ] Mailchimp subscribers added (if applicable)

### **Check These Weekly (15 min):**
- [ ] Spot check 2-3 Claude emails for quality
- [ ] Verify HubSpot properties accurate
- [ ] Check Airtable vs HubSpot data matches
- [ ] Review Mailchimp list growth
- [ ] Review Make.com operations usage

---

## 🎉 YOU'RE DONE!

**Your complete system is now live:**

✅ Assessments automatically create HubSpot contacts (PRIMARY)  
✅ All data backed up to Airtable (REDUNDANCY)  
✅ Newsletter subscribers added to Mailchimp (MARKETING)  
✅ Immediate thank you email sent (COMMUNICATION)  
✅ Personalized AI follow-up 24h later (NURTURE)  
✅ Team CC'd on all follow-ups (COLLABORATION)  
✅ Complete lead pipeline automation (SALES)  

**What happens now:**
1. Every assessment submission flows through Scenario 1
2. Every morning at 8am, Scenario 2 sends personalized follow-ups
3. Team receives copies of all emails
4. You can track everything in HubSpot (primary) and Airtable (backup)
5. Newsletter subscribers automatically nurtured in Mailchimp

**Next steps:**
1. Monitor for 1 week
2. Review Claude email quality
3. Adjust system prompt if needed (Module 4)
4. Set up Mailchimp nurture sequences based on tags
5. Train team on HubSpot workflow

---

**This is your complete Make.com integration guide. All platforms connected!** 🚀

**Questions?** Check:
- `Aftermath_HubSpot_Implementation_Playbook.md` - HubSpot property setup
- `AIRTABLE-ASSESSMENT-TRACKING-SYSTEM.md` - Airtable table structure
- `TROUBLESHOOTING.md` - Common issues

**Last Updated:** January 2025  
**Version:** 2.0  
**Status:** Production Ready ✅


