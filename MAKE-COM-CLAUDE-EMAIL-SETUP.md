# Make.com Setup Guide: Claude AI Email System
## Complete Two-Scenario Approach

**Purpose:** Automated email system that sends personalized recommendations 24 hours after assessment completion

**Time to setup:** ~2-3 hours
**Difficulty:** Intermediate
**Prerequisites:** Make.com account, HubSpot account, Airtable account, Anthropic API key

---

## 🎯 SYSTEM OVERVIEW

### Two-Scenario Architecture:

**SCENARIO 1: Immediate Processing**
```
Assessment Submitted
    ↓
Webhook Receives Data
    ↓
Spam Filter (reCAPTCHA)
    ↓
Create HubSpot Contact
    ↓
Create Airtable Backup
    ↓
Send Immediate Thank You Email
    ↓
Save to Google Sheets Queue (for 24h follow-up)
```

**SCENARIO 2: Scheduled Follow-Up (Runs daily at 8am ET)**
```
Schedule Trigger (8am ET daily)
    ↓
Read Google Sheets Queue
    ↓
Filter: Submissions from exactly 24h ago
    ↓
For Each Lead:
      ↓
   Send to Claude API
      ↓
   Parse JSON Response
      ↓
   Send Personalized Email (CC team)
      ↓
   Update HubSpot with Claude Analysis
      ↓
   Update Airtable
      ↓
   Mark as Processed in Queue
```

---

## 📋 PART 1: IMMEDIATE PROCESSING SCENARIO

### Prerequisites Setup:

1. **Get Anthropic API Key:**
   - Go to: https://console.anthropic.com/
   - Create account or sign in
   - Go to API Keys
   - Create new key, copy it
   - Store securely (you'll need this for Scenario 2)

2. **Create Google Sheet for Queue:**
   - Create new Google Sheet: "Assessment Follow-Up Queue"
   - Add these columns:
     - A: `Submission Timestamp`
     - B: `Name`
     - C: `Email`
     - D: `Organization`
     - E: `Assessment Data (JSON)`
     - F: `Processed`
     - G: `Email Sent`
     - H: `Assessment ID`

### Scenario 1 Setup:

**Step 1: Create New Scenario**

1. Go to Make.com
2. Click "Create a new scenario"
3. Name it: "Assessment → Immediate Processing + Queue"

---

**Step 2: Add Webhook Module**

1. Add module: **Webhooks → Custom Webhook**
2. Click "Add"
3. Give it a name: "Assessment Submission"
4. Copy the webhook URL (you'll add this to assessment.html)
5. Click "OK"

**Test it:**
- Click "Run once"
- Submit a test assessment
- Verify Make.com receives the data

---

**Step 3: Add Router (Spam Filter)**

1. After webhook, click "+"
2. Add: **Flow Control → Router**
3. Label route 1: "Valid Submission"
4. Add filter:
   - Label: "reCAPTCHA Pass"
   - Condition: `recaptcha_score` Numeric: Greater than or equal to `0.5`

---

**Step 4: Create HubSpot Contact**

**Follow Route 1:**

1. Click "+" on Route 1
2. Add: **HubSpot → Create/Update a Contact**
3. Connection: Connect your HubSpot account
4. **Map fields:**
   - Email: `{{1.email}}`
   - First Name: `{{1.name}}` (split first word)
   - Last Name: `{{1.name}}` (split last word)
   - Company: `{{1.organization}}`
   - Job Title: `{{1.role}}`

5. **Custom Properties** (map these):
   - `assessment_overall_score`: `{{1.overall_score}}`
   - `lead_score`: `{{1.lead_score}}`
   - `assessment_preparedness_score`: `{{1.preparedness_score}}`
   - `assessment_response_score`: `{{1.response_score}}`
   - `assessment_recovery_score`: `{{1.recovery_score}}`
   - `assessment_support_score`: `{{1.support_score}}`
   - `assessment_gap_level`: `{{1.gap_level}}`
   - `wants_consultation`: `{{1.wants_consultation}}`
   - `wants_newsletter`: `{{1.wants_newsletter}}`
   - `wants_training`: `{{1.wants_training}}`
   - `wants_resources`: `{{1.wants_resources}}`
   - `assessment_completed_date`: `{{formatDate(now; "YYYY-MM-DD")}}`

**Important:** Create these custom properties in HubSpot first (see GO-LIVE-CHECKLIST.md Section 3)

---

**Step 5: Create Airtable Record (Backup)**

1. Click "+" after HubSpot module
2. Add: **Airtable → Create a Record**
3. Connection: Connect Airtable
4. Base: "Lead Pipeline Dashboard" (appt66MN9uPoEOriV)
5. Table: "📊 Assessment Raw Data"

**Map fields** (see AIRTABLE-ASSESSMENT-TRACKING-SYSTEM.md for complete list):
- Assessment ID: `{{1.assessment_id}}`
- Submission Date: `{{now}}`
- Name: `{{1.name}}`
- Email: `{{1.email}}`
- Organization: `{{1.organization}}`
- (... map all other fields)
- HubSpot Contact ID: `{{2.id}}` (from HubSpot module)
- Status: `New`

---

**Step 6: Send Immediate Thank You Email**

1. Click "+" after Airtable module
2. Add: **Email → Send an Email**
3. **Configure:**
   - To: `{{1.email}}`
   - From: `team@theaftermathsolutions.com`
   - From Name: `Aftermath Solutions`
   - Subject: `Thank you for completing your assessment`

4. **Email Body:**

```html
Hi {{1.name}},

Thank you for completing the Organizational Resilience Equation Calculator for {{1.organization}}.

Your assessment has been received, and our team is reviewing your results. You'll receive a detailed analysis with personalized recommendations within the next 24-48 hours.

In the meantime, if you have any immediate questions, feel free to reply to this email or call us at [YOUR PHONE NUMBER].

Best regards,

The Aftermath Solutions Team
Solving for what comes after

www.theaftermathsolutions.com
```

---

**Step 7: Save to Google Sheets Queue**

1. Click "+" after Email module
2. Add: **Google Sheets → Add a Row**
3. Connection: Connect Google account
4. Spreadsheet: "Assessment Follow-Up Queue"
5. Sheet: "Sheet1"

**Map columns:**
- A (Submission Timestamp): `{{now}}`
- B (Name): `{{1.name}}`
- C (Email): `{{1.email}}`
- D (Organization): `{{1.organization}}`
- E (Assessment Data JSON): `{{toString(1)}}` ← This stores ALL assessment data as JSON
- F (Processed): `false`
- G (Email Sent): `false`
- H (Assessment ID): `{{1.assessment_id}}`

---

**Step 8: Add Google Chat Notification (Hot Leads Only)**

**After Google Sheets, add another Router:**

1. Add: **Flow Control → Router**
2. Route 1 Label: "Hot Lead Alert"
3. Filter:
   - Condition: `lead_score` Numeric: Greater than or equal to `70`

4. On Route 1, add: **Google Chat → Create a Message**
5. Connection: Connect Google Chat
6. Space: Select your sales/team space
7. Message:

```
🔥 HOT LEAD ALERT

Name: {{1.name}}
Organization: {{1.organization}}
Email: {{1.email}}
Lead Score: {{1.lead_score}}
Overall Score: {{1.overall_score}} ({{1.gap_level}})

Wants Consultation: {{1.wants_consultation}}
Primary Gaps: {{join(1.top_gaps; ", ")}}

HubSpot: https://app.hubspot.com/contacts/YOUR_PORTAL_ID/contact/{{2.id}}

⏰ Follow-up email will send automatically in 24 hours at 8am ET
```

---

**Step 9: Test Scenario 1**

1. Click "Run once"
2. Submit a test assessment from your form
3. Verify:
   - ✅ HubSpot contact created
   - ✅ Airtable record created
   - ✅ Thank you email sent
   - ✅ Google Sheets queue has new row
   - ✅ (If hot lead) Google Chat notification sent

4. Save and Activate the scenario

---

## 📧 PART 2: SCHEDULED CLAUDE EMAIL SCENARIO

### Scenario 2 Setup:

**Step 1: Create New Scenario**

1. Create new scenario
2. Name it: "Daily 8am ET - Claude Email Follow-Up"

---

**Step 2: Add Schedule Trigger**

1. Add module: **Tools → Schedule**
2. Choose: **Every Day**
3. Time: `08:00` (8:00 AM)
4. Time Zone: `America/New_York` (ET)
5. Advanced: Check "Only on weekdays" (optional)

---

**Step 3: Read Google Sheets Queue**

1. Click "+"
2. Add: **Google Sheets → Search Rows**
3. Spreadsheet: "Assessment Follow-Up Queue"
4. Sheet: "Sheet1"

**Filter:**
- Column: `F` (Processed)
- Operator: `Equal to`
- Value: `false`

5. Check "Return all results"

---

**Step 4: Filter for 24 Hours Ago**

1. Click "+"
2. Add: **Tools → Iterator**
3. Array: `{{array from Google Sheets}}`

Then add filter:

4. After Iterator, add **Flow Control → Filter**
5. Label: "Submitted 24h ago"
6. Condition:
   - `Submission Timestamp` Date: Equal to
   - `{{addHours(now; -24)}}` (24 hours ago)
   - Tolerance: ±1 hour

---

**Step 5: Parse Assessment Data JSON**

1. Click "+"
2. Add: **Tools → Parse JSON**
3. JSON String: `{{5.E}}` (the Assessment Data column)

This will expand all the assessment fields for use in the next steps.

---

**Step 6: Call Claude API**

1. Click "+"
2. Add: **HTTP → Make a Request**

**Configuration:**
- URL: `https://api.anthropic.com/v1/messages`
- Method: `POST`

**Headers:**
```
x-api-key: YOUR_ANTHROPIC_API_KEY
anthropic-version: 2023-06-01
content-type: application/json
```

**Body (JSON format):**

```json
{
  "model": "claude-3-5-sonnet-20241022",
  "max_tokens": 4096,
  "system": "PASTE ENTIRE SYSTEM PROMPT FROM CLAUDE-EMAIL-SYSTEM-PROMPT.MD HERE",
  "messages": [
    {
      "role": "user",
      "content": "PASTE USER PROMPT FROM CLAUDE-USER-PROMPT-TEMPLATE.MD WITH VARIABLE MAPPING"
    }
  ]
}
```

**Important:**
- Replace `YOUR_ANTHROPIC_API_KEY` with your actual API key
- Copy the entire system prompt from `CLAUDE-EMAIL-SYSTEM-PROMPT.md`
- Copy the user prompt template from `CLAUDE-USER-PROMPT-TEMPLATE.md`
- Map variables using the parsed JSON data: `{{6.name}}`, `{{6.email}}`, etc.

---

**Step 7: Parse Claude's JSON Response**

1. Click "+"
2. Add: **Tools → Parse JSON**
3. JSON String: `{{7.data.content[0].text}}`

This extracts Claude's analysis from the API response.

---

**Step 8: Send Personalized Email**

1. Click "+"
2. Add: **Email → Send an Email**

**Configuration:**
- To: `{{6.email}}` (recipient)
- CC: `team@theaftermathsolutions.com` (your team)
- From: `team@theaftermathsolutions.com`
- From Name: `Aftermath Solutions`
- Subject: `{{8.email_subject}}` (from Claude's response)

**Email Body:**

```
{{8.email_body}}

---

Best regards,

The Aftermath Solutions Team
Solving for what comes after

Schedule a free 30-minute consultation:
https://meetings.hubspot.com/josh-garcia/aftermath-solutions

team@theaftermathsolutions.com
www.theaftermathsolutions.com
```

---

**Step 9: Update HubSpot with Claude Analysis**

1. Click "+"
2. Add: **HubSpot → Update a Contact**
3. Contact: Search by `{{6.email}}`

**Update fields:**
- `lead_priority`: `{{8.lead_priority}}`
- `gap_category`: `{{8.gap_category}}`
- `recommended_tier`: `{{8.recommended_tier}}`
- `recommended_service`: `{{8.recommended_service}}`
- `month_six_client`: `{{8.month_six_client}}`
- `discovery_call_urgency`: `{{8.discovery_call_urgency}}`

**Add Note:**
```
CLAUDE AI ANALYSIS ({{formatDate(now; "YYYY-MM-DD")}})

Lead Score: {{8.lead_score}}
Priority: {{8.lead_priority}}
Month 6 Client: {{8.month_six_client}}

Recommendation: {{8.recommended_service}} ({{8.recommended_tier}})
Rationale: {{8.recommendation_rationale}}

Key Talking Points:
{{#each 8.key_talking_points}}
- {{this}}
{{/each}}

Internal Notes:
{{8.hubspot_notes}}

Personalized email sent: {{formatDate(now; "MMM D, YYYY h:mm A")}}
```

---

**Step 10: Update Airtable Record**

1. Click "+"
2. Add: **Airtable → Update a Record**
3. Base: "Lead Pipeline Dashboard"
4. Table: "📊 Assessment Raw Data"
5. Search by: `Assessment ID` = `{{6.assessment_id}}`

**Update fields:**
- Status: `Contacted`
- Notes: `Claude analysis sent on {{formatDate(now; "MMM D, YYYY")}}. Recommended: {{8.recommended_service}}`

---

**Step 11: Mark as Processed in Queue**

1. Click "+"
2. Add: **Google Sheets → Update a Row**
3. Spreadsheet: "Assessment Follow-Up Queue"
4. Sheet: "Sheet1"
5. Row Number: `{{5.__IMTINDEX__}}` (the iterator index)

**Update:**
- F (Processed): `true`
- G (Email Sent): `true`

---

**Step 12: Add Error Handling**

**After Claude API call, add error handler:**

1. Right-click the Claude API module
2. Add "Error Handler"
3. Add: **Email → Send an Email**
   - To: `team@theaftermathsolutions.com`
   - Subject: `🚨 Claude API Error for {{6.name}}`
   - Body:
   ```
   Claude API call failed for:

   Name: {{6.name}}
   Email: {{6.email}}
   Organization: {{6.organization}}
   Assessment ID: {{6.assessment_id}}

   Error: {{7.message}}

   Please manually send follow-up email.

   HubSpot: https://app.hubspot.com/contacts/YOUR_PORTAL_ID/contact/[SEARCH BY EMAIL]
   ```

---

**Step 13: Test Scenario 2**

**Manual Test:**

1. Add a test row to Google Sheets queue with timestamp from 24 hours ago
2. Use real assessment data
3. Click "Run once"
4. Verify:
   - ✅ Claude API returns valid JSON
   - ✅ Email sent with personalized content
   - ✅ HubSpot updated with Claude analysis
   - ✅ Airtable updated
   - ✅ Queue marked as processed

**Important:** Check the email for:
- No trauma-insensitive language
- Organization name mentioned
- Specific scores referenced
- Clear service recommendation
- Warm call to action

---

**Step 14: Activate Scenario 2**

1. Save the scenario
2. Turn it ON
3. Set schedule to run daily at 8am ET

---

## ⚙️ CONFIGURATION & OPTIMIZATION

### Cost Optimization:

**Anthropic API Costs:**
- Model: Claude 3.5 Sonnet
- Input: ~2,000 tokens per request (~$0.006)
- Output: ~1,000 tokens per response (~$0.015)
- **Total per email: ~$0.021**
- **Monthly (30 leads): ~$0.63**

**Make.com Operations:**
- Scenario 1: ~8 operations per submission
- Scenario 2: ~12 operations per email sent
- **Total per lead: ~20 operations**
- **Free plan: 1,000 operations/month = ~50 leads/month**

### Monitoring:

**Daily Checks:**
1. Check Google Sheets queue for stuck records
2. Review Scenario 2 execution log for errors
3. Check team inbox for Claude error alerts

**Weekly Checks:**
1. Review email open rates
2. Check discovery call booking rate
3. Review Claude's recommendations for quality
4. Adjust system prompt if needed

---

## 🧪 TESTING PROTOCOL

### Before Going Live:

**Test 1: High-Priority Lead**
- Create test with score 80+, wants_consultation = true
- Verify immediate thank you
- Wait 24 hours or manually trigger
- Verify Claude email quality and recommendations

**Test 2: Medium-Priority Lead**
- Create test with score 55, wants_training = true
- Verify appropriate tier recommendation
- Check email tone and urgency

**Test 3: Low-Priority Lead**
- Create test with score 35, newsletter only
- Verify TIER 1 recommendation
- Check email isn't too sales-y

**Test 4: Error Handling**
- Create test with invalid API key
- Verify error alert sent to team
- Check queue doesn't get stuck

---

## 🚀 GO LIVE CHECKLIST

- [ ] Scenario 1 tested with 3 real assessments
- [ ] Scenario 2 tested with manual trigger
- [ ] Claude system prompt uploaded
- [ ] Claude user prompt template configured
- [ ] Anthropic API key added and validated
- [ ] Google Sheets queue created and accessible
- [ ] HubSpot custom properties created
- [ ] Airtable base connected
- [ ] Email templates reviewed (no typos)
- [ ] Team email CC working
- [ ] Error alerts going to team
- [ ] Schedule set to 8am ET daily
- [ ] Both scenarios activated
- [ ] Team trained on monitoring process

---

## 📊 SUCCESS METRICS

Track these weekly:

**Email Performance:**
- Open rate (target: >40%)
- Click rate (target: >15%)
- Reply rate (target: >5%)
- Discovery call booking rate (target: >10%)

**Claude Quality:**
- Recommendation accuracy (manual review)
- Email tone appropriateness
- Trauma-informed language compliance
- Response time consistency

**System Health:**
- Error rate (target: <2%)
- Queue processing time
- API response time
- Operations usage vs. limit

---

## 🆘 TROUBLESHOOTING

### Issue: Claude returns invalid JSON

**Solution:**
1. Check system prompt is pasted correctly
2. Verify no extra characters or markdown
3. Add JSON validation before parsing
4. Use error handler to catch and alert

---

### Issue: Emails not sending at 8am

**Solution:**
1. Check scenario is activated
2. Verify schedule timezone is America/New_York
3. Check Google Sheets queue has unprocessed records
4. Verify 24-hour filter logic

---

### Issue: Claude recommendations seem off

**Solution:**
1. Review test cases with team
2. Adjust system prompt criteria
3. Add more examples in prompt
4. Consider A/B testing prompt variations

---

## 📝 NEXT STEPS

After system is stable (1-2 weeks):

1. **A/B Test Email Variations:**
   - Test subject lines
   - Test different CTAs
   - Test email length

2. **Add Follow-Up Sequences:**
   - Day 3: If no response
   - Day 7: If no discovery call booked
   - Day 14: Last chance offer

3. **Enhance with MCP:**
   - Connect to Aftermath Growth Engine MCP
   - Enhance recommendations with company research
   - Auto-create calendar invites

---

**You're all set!** 🎉

This system will automatically send personalized, trauma-informed recommendations 24 hours after each assessment, CC'ing your team for visibility.

**Estimated setup time:** 2-3 hours
**Maintenance:** 15 minutes/week

Questions? Check the troubleshooting section or reach out to the team.
