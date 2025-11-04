# Make.com System Enhancement Recommendations

**Purpose:** Advanced features to enhance the automated lead generation system

**Status:** Optional enhancements (core system works without these)

**Estimated implementation time:** 2-4 hours per enhancement

---

## 🎯 Enhancement Overview

Current system (✅ Production):
- Assessment → HubSpot + Airtable
- Immediate thank you email
- 24h personalized Claude email
- Google Chat hot lead alerts

Recommended enhancements (**you requested these**):
1. **Email alerts to staff** (detailed notifications for different scenarios)
2. **Claude internal prep documents** (discovery call briefings)
3. Multi-day nurture sequences
4. Competitive intelligence integration
5. Calendar booking automation

---

## 📧 ENHANCEMENT 1: Advanced Email Alerts to Staff

**Current:** Google Chat alert for hot leads only

**Enhanced:** Comprehensive email notifications for all scenarios

### Implementation Plan

#### **Alert Type 1: Hot Lead Immediate Alert**

**Trigger:** Lead score ≥ 70 OR wants_consultation = true

**Recipients:** team@theaftermathsolutions.com, josh@theaftermathsolutions.com

**Subject:** `🔥 HOT LEAD: {{name}} from {{organization}} - CALL TODAY`

**Email Body Template:**
```
PRIORITY: HIGH - Call within 24 hours

CONTACT INFORMATION:
Name: {{name}}
Organization: {{organization}}
Email: {{email}}
Role: {{role}}
Organization Type: {{org_info}}

ASSESSMENT RESULTS:
Overall Resilience Score: {{overall_score}}/100 ({{gap_level}})
Lead Quality Score: {{lead_score}}/100

Dimension Scores:
- Preparedness: {{preparedness_score}}/100
- Response Capability: {{response_score}}/100
- Recovery Planning: {{recovery_score}}/100
- Support Systems: {{support_score}}/100

Primary Gap Areas:
{{#each top_gaps}}
- {{this}}
{{/each}}

URGENCY INDICATORS:
- Wants Consultation: {{wants_consultation}}
- Recent Crisis: {{crisis_experience_ever}}
- Timeline Focus: {{timeline_focus}}

RECOMMENDED SERVICE:
{{recommended_tier}}: {{recommended_service}}

QUICK LINKS:
HubSpot Contact: https://app.hubspot.com/contacts/YOUR_PORTAL_ID/contact/{{hubspot_contact_id}}
Airtable Record: https://airtable.com/appt66MN9uPoEOriV/...

NEXT STEPS:
1. Review full assessment data in HubSpot
2. Call within 24 hours
3. Book discovery call
4. Personalized Claude email will send in 24h at 8am ET

---
Aftermath Solutions Lead Alert System
```

**Make.com Setup:**
1. After Airtable backup module, add Router
2. Filter: lead_score ≥ 70 OR wants_consultation = true
3. Add Email module with template above
4. Map all variables from webhook data

---

#### **Alert Type 2: Daily Summary Email**

**Trigger:** Daily at 6pm ET (end of day)

**Recipients:** team@theaftermathsolutions.com

**Subject:** `Daily Assessment Summary - {{formatDate(now; "MMM D, YYYY")}}`

**Email Body Template:**
```
DAILY ASSESSMENT SUMMARY
{{formatDate(now; "MMMM D, YYYY")}}

SUBMISSIONS TODAY: {{count}} assessments

HOT LEADS (Score ≥ 70):
{{#each hot_leads}}
- {{name}} ({{organization}}) - Score: {{lead_score}}
  Email: {{email}} | Type: {{org_info}}
  HubSpot: [link]
{{/each}}

WARM LEADS (Score 50-69):
{{#each warm_leads}}
- {{name}} ({{organization}}) - Score: {{lead_score}}
{{/each}}

COOL LEADS (Score < 50):
{{#each cool_leads}}
- {{name}} ({{organization}}) - Score: {{lead_score}}
{{/each}}

CONSULTATION REQUESTS TODAY: {{consultation_count}}
NEWSLETTER SIGNUPS TODAY: {{newsletter_count}}

TOMORROW'S FOLLOW-UPS (24h Claude emails scheduled):
- {{tomorrow_email_count}} personalized emails will send at 8am ET

ACTION REQUIRED:
1. Follow up with {{hot_leads.count}} hot leads immediately
2. Review {{consultation_count}} consultation requests
3. Check Airtable for any failed emails

---
Aftermath Solutions Lead Alert System
```

**Make.com Setup:**
1. Create new scenario: "Daily Summary Email"
2. Trigger: Schedule (daily, 6pm ET)
3. Search Airtable "Assessment Raw Data" (filter: today's submissions)
4. Aggregate module (group by lead priority)
5. Email module with template above

---

#### **Alert Type 3: Failed Email Notification**

**Trigger:** Claude email fails to send (from Scenario 2 error handler)

**Recipients:** team@theaftermathsolutions.com, josh@theaftermathsolutions.com

**Subject:** `❌ Failed Email Alert: {{name}} - Manual Follow-Up Required`

**Email Body Template:**
```
FAILED EMAIL ALERT

The automated 24-hour follow-up email failed to send for this lead.

CONTACT INFORMATION:
Name: {{name}}
Organization: {{organization}}
Email: {{email}}
Assessment Date: {{submission_timestamp}}

FAILURE REASON:
{{error_message}}

ASSESSMENT SUMMARY:
Overall Score: {{overall_score}}/100
Lead Priority: {{lead_priority}}
Recommended Service: {{recommended_service}}

ACTION REQUIRED:
1. Manually send follow-up email to {{email}}
2. Check if email address is valid
3. Update Airtable Email Queue record status
4. If Claude API error, check API key and quota

QUICK LINKS:
HubSpot: [link]
Airtable Queue Record: [link]
Assessment Data: [link]

---
Aftermath Solutions System Alert
```

**Make.com Setup:**
- Already in error handler (Scenario 2, Step 12)
- Enhance with more detail and action items

---

#### **Alert Type 4: Weekly Performance Report**

**Trigger:** Every Monday at 9am ET

**Recipients:** team@theaftermathsolutions.com, josh@theaftermathsolutions.com

**Subject:** `📊 Weekly Assessment Report - Week of {{formatDate(now; "MMM D")}}`

**Email Body Template:**
```
WEEKLY ASSESSMENT PERFORMANCE REPORT
Week of {{formatDate(now; "MMMM D, YYYY")}}

VOLUME METRICS:
- Total Assessments: {{total_count}}
- Completion Rate: {{completion_rate}}%
- Average Overall Score: {{avg_score}}/100

LEAD QUALITY BREAKDOWN:
- 🔴 Hot Leads (≥70): {{hot_count}} ({{hot_percent}}%)
- 🟡 Warm Leads (50-69): {{warm_count}} ({{warm_percent}}%)
- 🟢 Cool Leads (<50): {{cool_count}} ({{cool_percent}}%)

TOP GAP AREAS THIS WEEK:
1. {{top_gap_1}}: {{gap_1_count}} assessments
2. {{top_gap_2}}: {{gap_2_count}} assessments
3. {{top_gap_3}}: {{gap_3_count}} assessments

ORGANIZATION TYPES:
- K-12 Education: {{k12_count}}
- Higher Education: {{higher_ed_count}}
- Healthcare: {{healthcare_count}}
- Government: {{govt_count}}
- Other: {{other_count}}

EMAIL PERFORMANCE (LAST WEEK):
- Personalized Emails Sent: {{emails_sent}}
- Open Rate: {{open_rate}}%
- Click Rate: {{click_rate}}%
- Reply Rate: {{reply_rate}}%

CONVERSION METRICS:
- Consultation Requests: {{consultation_count}}
- Discovery Calls Booked: {{calls_booked}}
- Conversion Rate: {{conversion_rate}}%

ACTION ITEMS:
- Follow up with {{outstanding_hot_leads}} outstanding hot leads
- Review {{failed_emails}} failed email records
- Check Make.com operations usage: {{operations_used}}/{{operations_limit}}

NEXT WEEK GOALS:
- Target assessments: {{target_count}}
- Target conversion rate: {{target_conversion}}%

---
Aftermath Solutions Weekly Report
```

**Make.com Setup:**
1. Create scenario: "Weekly Performance Report"
2. Trigger: Schedule (Monday, 9am ET)
3. Search Airtable (last 7 days)
4. Aggregate modules (calculate stats)
5. Email module with template

---

## 📝 ENHANCEMENT 2: Claude Internal Prep Documents

**Current:** Claude sends personalized email to lead (CC team)

**Enhanced:** Claude also creates detailed internal briefing document for discovery calls

### Implementation Plan

#### **Internal Briefing Document Generation**

**When:** Immediately after personalized email sent (Scenario 2, Step 8+)

**Stored:** Airtable "Internal Briefings" table + HubSpot note

**Contains:**
- Lead analysis and qualification
- Discovery call talking points
- Red flags and opportunities
- Recommended approach
- Pre-call research summary

---

### Setup: New Airtable Table

**Table Name:** `📋 Discovery Call Prep Briefs`

**Fields:**

| Field | Type | Description |
|-------|------|-------------|
| Assessment ID | Text | Unique identifier (primary) |
| Contact Name | Text | From assessment |
| Organization | Text | From assessment |
| Brief Generated Date | Date/Time | When created |
| Lead Priority | Single Select | High/Medium/Low |
| Brief Content | Long Text | Full brief (markdown) |
| Talking Points | Long Text | 3-5 key points |
| Red Flags | Long Text | Concerns or challenges |
| Opportunities | Long Text | Upsell or expansion potential |
| Recommended Approach | Long Text | How to position services |
| Assessment Record Link | Link to Assessment Raw Data | Linked record |
| HubSpot Contact Link | URL | Link to HubSpot |
| Brief Used | Checkbox | Marked when call happens |
| Call Notes | Long Text | Post-call notes |

---

### Claude System Prompt Enhancement

**Add to CLAUDE-EMAIL-SYSTEM-PROMPT.md:**

```markdown
## INTERNAL BRIEFING DOCUMENT

In addition to the personalized email, you must also generate an internal discovery call prep brief for the sales team.

### Brief Structure (Output as separate JSON field: "internal_brief")

**LEAD ANALYSIS:**
- Priority Level: [High/Medium/Low based on score and urgency]
- Month 6 Client: [Yes/No - are they in long-term recovery phase?]
- Deal Size Estimate: [Based on org type, gap severity, service tier]
- Close Probability: [High/Medium/Low with rationale]

**ORGANIZATIONAL CONTEXT:**
- Organization Type: [K-12, Higher Ed, Healthcare, etc.]
- Crisis History: [Recent crisis? When? What type?]
- Current State: [Where are they in crisis lifecycle?]
- Key Pain Points: [Top 3 based on assessment responses]

**DISCOVERY CALL TALKING POINTS:**
1. [Opening - reference specific assessment data]
2. [Explore - key questions to ask about their gaps]
3. [Present - how to position recommended service]
4. [Close - suggested next steps]

**RED FLAGS / CAUTION AREAS:**
- [Any concerns from assessment data]
- [Budget signals - might need lower tier]
- [Timeline misalignment - they want immediate but we're Month 6 focus]
- [Authority - might not be decision maker]

**OPPORTUNITIES / UPSELL POTENTIAL:**
- [Additional services they might need]
- [Long-term partnership signals]
- [Multiple stakeholder involvement]
- [Recurring revenue potential]

**RECOMMENDED APPROACH:**
- Service to Lead With: [Specific service from menu]
- Positioning: [How to frame it for their context]
- Expected Objections: [What they might push back on]
- Urgency Level: [How hard to push for quick decision]

**PRE-CALL RESEARCH TO DO:**
- [ ] Check their website for recent news
- [ ] LinkedIn research on key stakeholders
- [ ] Review any recent crises in their sector
- [ ] Competitive intel (are they working with others?)

**CALL PREPARATION CHECKLIST:**
- [ ] Review full assessment responses
- [ ] Prepare customized proposal outline
- [ ] Have case study ready (relevant to their org type)
- [ ] Calendar link ready for next steps
- [ ] Pricing options prepared (primary + alternatives)
```

**Output Format:**
Add `internal_brief` field to Claude's JSON response (markdown formatted, 400-600 words)

---

### Make.com Implementation

**After Step 8 (Send Personalized Email):**

1. **Add: Airtable → Create Record**
   - Table: "Discovery Call Prep Briefs"
   - Map fields:
     - Assessment ID: `{{4.assessment_id}}`
     - Contact Name: `{{4.name}}`
     - Organization: `{{4.organization}}`
     - Brief Generated Date: `{{now}}`
     - Lead Priority: `{{6.lead_priority}}`
     - Brief Content: `{{6.internal_brief}}`
     - Talking Points: `{{join(6.key_talking_points; "\n\n")}}`
     - Red Flags: (extract from internal_brief)
     - Opportunities: (extract from internal_brief)
     - Recommended Approach: `{{6.recommendation_rationale}}`
     - Assessment Record Link: `{{3.fields['Assessment Record Link'][0]}}`
     - HubSpot Contact Link: HubSpot URL
     - Brief Used: `false`

2. **Add: HubSpot → Create Note**
   - Associated with: Contact (by email)
   - Note body:
   ```
   DISCOVERY CALL PREP BRIEF
   Generated: {{formatDate(now; "MMM D, YYYY h:mm A")}}

   {{6.internal_brief}}

   ---
   Full brief available in Airtable: [link]
   ```

3. **Add: Email → Send to Sales Team**
   - To: `josh@theaftermathsolutions.com`
   - Subject: `📋 Discovery Call Brief Ready: {{4.name}} from {{4.organization}}`
   - Body:
   ```
   A discovery call prep brief has been generated for your upcoming call.

   LEAD: {{4.name}} ({{4.organization}})
   PRIORITY: {{6.lead_priority}}
   RECOMMENDED SERVICE: {{6.recommended_service}}

   KEY TALKING POINTS:
   {{join(6.key_talking_points; "\n- ")}}

   View full brief:
   - Airtable: [link to brief record]
   - HubSpot: [link to contact with note]

   QUICK ACTIONS:
   - [ ] Review full assessment data
   - [ ] Check website/LinkedIn
   - [ ] Prepare proposal outline
   - [ ] Schedule discovery call

   ---
   Automated by Claude AI
   ```

---

## 🔄 ENHANCEMENT 3: Multi-Day Nurture Sequences

**Current:** Single 24h follow-up email

**Enhanced:** Multi-touch nurture campaign based on engagement

### Sequence Examples

#### **Hot Lead Sequence** (wants consultation, score ≥ 70)

```
Day 0 (Immediate): Thank you email
Day 1 (8am): Personalized Claude email + internal brief
Day 3 (If no response): Gentle reminder + case study
Day 7 (If no booking): Alternative resources offer
Day 14 (Final): Last chance + move to warm nurture
```

#### **Warm Lead Sequence** (score 50-69, some interest)

```
Day 0: Thank you email
Day 1: Personalized Claude email
Day 3: Educational content (blog post, video)
Day 7: Success story/case study
Day 14: Free resource download
Day 21: Consultation offer
Day 30: Move to cool nurture
```

#### **Cool Lead Sequence** (score < 50, newsletter only)

```
Day 0: Thank you email
Day 1: Personalized Claude email
Week 2: Educational email #1
Week 4: Educational email #2
Month 2: Retake assessment invitation
Quarterly: Ongoing newsletter
```

**Implementation:** Create additional Make.com scenarios with scheduled triggers checking Airtable for leads at each stage.

---

## 🔍 ENHANCEMENT 4: Competitive Intelligence Integration

**Enhancement:** Auto-research organizations before discovery calls

### Implementation

**After hot lead detected:**

1. **Search Company Website**
   - Use web scraping API (like Apify)
   - Extract: Recent news, leadership, services
   - Store in Airtable brief

2. **LinkedIn Research**
   - Use LinkedIn API or scraper
   - Find: Key decision makers, company size, recent posts
   - Add to brief

3. **News Search**
   - Use Google News API
   - Search: "[Organization name] crisis" OR "[Organization name] emergency"
   - Recent 6 months
   - Add to brief context

4. **Competitor Check**
   - Search: "[Organization name] crisis consulting"
   - Identify if they're working with competitors
   - Note in red flags

**Make.com Modules:**
- HTTP → Web Scraper API
- HTTP → LinkedIn API
- HTTP → Google News API
- Text Aggregator → Compile research
- Add to Airtable brief

---

## 📅 ENHANCEMENT 5: Calendar Booking Automation

**Enhancement:** Auto-send calendar link based on lead priority

### Implementation

**For Hot Leads (score ≥ 70):**

**In personalized email, add:**
```
P.S. I've reserved a few time slots for you this week. Book your free 30-minute consultation here:

[HubSpot Meetings Link with Pre-filled data]

- Name: {{name}}
- Organization: {{organization}}
- Assessment Score: {{overall_score}}
```

**HubSpot Meetings Link with UTM params:**
```
https://meetings.hubspot.com/josh-garcia/discovery-call?
  firstname={{name}}&
  email={{email}}&
  company={{organization}}&
  assessment_score={{overall_score}}&
  lead_priority={{lead_priority}}
```

**When they book:**

1. Make.com webhook from HubSpot Meetings
2. Update Airtable: Brief Used = true
3. Send prep brief to Josh 24h before call
4. Create HubSpot task: "Discovery call today with {{name}}"
5. Send reminder email to lead 1 hour before

---

## 💡 ENHANCEMENT 6: Real-Time Dashboard

**Enhancement:** Live monitoring dashboard in Airtable Interfaces

### Dashboard Sections

**Section 1: Today's Activity**
- Assessments submitted today
- Hot leads requiring immediate follow-up
- Emails scheduled to send tomorrow
- Failed emails needing attention

**Section 2: Lead Pipeline**
- Hot/Warm/Cool breakdown (pie chart)
- Lead flow over time (line chart)
- Conversion funnel visualization

**Section 3: Email Performance**
- Open rates by lead priority
- Click rates by email type
- Response rates tracking

**Section 4: Team Performance**
- Calls booked vs. target
- Response time to hot leads
- Conversion rates

**Setup:** Use Airtable Interface Designer (point and click, no coding)

---

## ⚙️ IMPLEMENTATION PRIORITY

### Phase 1 (Implement First) - **YOU REQUESTED THESE**

1. ✅ **Email Alert Type 1: Hot Lead Alerts** (30 min)
2. ✅ **Enhancement 2: Claude Internal Briefs** (2 hours)
3. ✅ **Email Alert Type 3: Failed Email Notifications** (20 min)

**Total time:** ~3 hours
**Value:** Immediate visibility and better discovery call prep

---

### Phase 2 (Next Week)

4. Email Alert Type 2: Daily Summary (1 hour)
5. Enhancement 5: Calendar Booking Automation (1 hour)
6. Email Alert Type 4: Weekly Report (1 hour)

**Total time:** ~3 hours
**Value:** Ongoing monitoring and easier booking

---

### Phase 3 (Month 2)

7. Enhancement 3: Multi-Day Nurture Sequences (4 hours)
8. Enhancement 4: Competitive Intelligence (3 hours)
9. Enhancement 6: Real-Time Dashboard (2 hours)

**Total time:** ~9 hours
**Value:** Advanced automation and insights

---

## 📊 Expected Impact

### With Phase 1 Enhancements:

**Before:**
- Hot lead might get missed (only Google Chat)
- No discovery call prep besides email
- Manual tracking of failures

**After:**
- Every hot lead gets immediate email alert
- Detailed prep brief ready before every call
- Automatic failure notifications with action items
- Estimated increase in conversion: **+15-25%**

---

### With All Enhancements:

**Before:**
- Manual follow-ups
- No competitive intel
- Manual research before calls
- No nurture sequences

**After:**
- Automated multi-touch nurture
- Competitive research ready
- Pre-populated briefs with intel
- Multi-day engagement sequences
- Estimated increase in conversion: **+30-50%**

---

## 🛠️ SETUP GUIDES

### GUIDE 1: Implementing Hot Lead Email Alerts

**Time:** 30 minutes

**Steps:**

1. Open Make.com Scenario 1 ("Assessment → Immediate Processing")
2. After Step 5 (Create Airtable Backup), click "+"
3. Add Router module
4. Route 1: Filter where `lead_score` ≥ 70 OR `wants_consultation` = true
5. Add Email module:
   - To: `team@theaftermathsolutions.com, josh@theaftermathsolutions.com`
   - Subject: Template from Enhancement 1, Alert Type 1 above
   - Body: Template from Enhancement 1, Alert Type 1 above
6. Map all variables
7. Test with a high-score assessment
8. Activate

---

### GUIDE 2: Implementing Claude Internal Briefs

**Time:** 2 hours

**Steps:**

1. **Update Claude System Prompt:**
   - Open `CLAUDE-EMAIL-SYSTEM-PROMPT.md`
   - Add "Internal Briefing Document" section (from above)
   - Update JSON output format to include `internal_brief` field

2. **Create Airtable Table:**
   - Go to "Lead Pipeline Dashboard" base
   - Add table: "📋 Discovery Call Prep Briefs"
   - Add all fields from table structure above

3. **Update Make.com Scenario 2:**
   - After Step 8 (Send Personalized Email)
   - Add: Airtable → Create Record (in Discovery Call Prep Briefs)
   - Map fields from Claude response
   - Add: HubSpot → Create Note (with brief content)
   - Add: Email → Send Brief to Josh

4. **Test:**
   - Manually trigger Scenario 2 with test data
   - Verify brief created in Airtable
   - Verify note added to HubSpot
   - Verify email sent to Josh

5. **Activate**

---

### GUIDE 3: Implementing Failed Email Alerts

**Time:** 20 minutes

**Steps:**

1. Open Make.com Scenario 2 ("Daily 8am ET - Claude Email Follow-Up")
2. Find error handler on Step 6 (Claude API call)
3. Enhance existing error email with template from Alert Type 3 above
4. Add more detail:
   - Assessment summary
   - Quick links
   - Action items checklist
5. Test by temporarily using wrong API key
6. Verify error email received
7. Restore correct API key

---

## ✅ TESTING CHECKLIST

**Before going live with enhancements:**

### Email Alerts Testing

- [ ] Hot lead alert triggers for score ≥ 70
- [ ] Hot lead alert triggers for wants_consultation = true
- [ ] Email includes all assessment data
- [ ] Links to HubSpot/Airtable work
- [ ] Team receives alert within 1 minute

### Internal Briefs Testing

- [ ] Brief generated for all lead priorities
- [ ] Brief stored in Airtable correctly
- [ ] Brief added as HubSpot note
- [ ] Email notification sent to Josh
- [ ] Brief content is thorough and actionable
- [ ] No Claude API errors

### Failed Email Testing

- [ ] Error handler triggers on API failure
- [ ] Error email sent to team
- [ ] Error message is clear and actionable
- [ ] Airtable queue record marked as failed
- [ ] Record not marked as processed (for retry)

---

## 📞 Support

**Questions about implementation?**
- Review this guide thoroughly first
- Check Make.com execution logs for errors
- Test with small data sets first
- Contact team if stuck

**Future enhancement ideas?**
- Document in this file
- Discuss with team
- Prioritize based on impact vs. effort

---

*Last Updated: November 3, 2025*
*Status: Ready to implement*
*Priority: Phase 1 enhancements recommended*
