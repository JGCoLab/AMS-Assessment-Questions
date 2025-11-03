# Claude Desktop Prompts - Aftermath Solutions CRM & Automation Setup

**Purpose:** Copy-paste prompts to give Claude Desktop for building/restructuring your automation infrastructure.

**Date:** 2025-01-30
**For:** Josh Garcia, Sallie Lynch, Dr. Amy O'Neill

---

## 📖 HOW TO USE THIS DOCUMENT

1. **Copy the entire prompt** (including context sections)
2. **Paste into Claude Desktop** (or Claude web chat)
3. **Attach relevant files** when indicated
4. **Review Claude's response** and implement step-by-step
5. **Come back for next prompt** as you progress

**Pro Tips:**
- Start with Foundation prompts first (HubSpot, Airtable basics)
- Build in order (don't skip ahead)
- Test each automation before moving to next
- Keep Claude Desktop conversation going to ask follow-up questions

---

## 🎯 SECTION 1: HUBSPOT SETUP PROMPTS

### Prompt 1.1: Create HubSpot Foundation Properties (Week 1)

```
I need to set up the foundation properties for Aftermath Solutions' HubSpot CRM. I have a comprehensive implementation playbook that outlines exactly what needs to be created.

CONTEXT:
- We're a crisis management consulting firm
- We have an assessment tool that captures leads
- We need to classify contacts by type (Client, Prospect, Partner, etc.)
- We have existing properties: gap_category, lead_score, month_six_client, priority_level, recommended_service

TASK:
Please review the attached "Aftermath_HubSpot_Implementation_Playbook.md" file and help me with Phase 1 (Foundation Properties - Week 1).

Specifically, I need:

1. **Step-by-step instructions** to create these 4 critical properties:
   - Contact Type (with all dropdown options)
   - Contact Source
   - Lead Stage
   - Contact Owner Assignment Date

2. **Exact field specifications** for each property:
   - Internal names
   - Field types
   - Dropdown values (in correct order)
   - Descriptions
   - Required field settings

3. **Workflow automation setup** for:
   - Auto-setting Contact Type based on lead_score
   - Contact Owner assignment automation
   - Lead Stage progression rules

4. **Screenshot/UI guidance** on where to click in HubSpot:
   - Navigation path (Settings > Data Management > Properties)
   - Exact button names
   - Where to find specific settings

5. **Testing checklist** to verify everything works correctly

DELIVERABLE FORMAT:
Please provide a checklist-style guide I can follow step-by-step, with each property setup as a separate numbered section. Include any gotchas or common mistakes to avoid.

FILE TO ATTACH: Aftermath_HubSpot_Implementation_Playbook.md
```

---

### Prompt 1.2: Create Assessment Integration Properties (Week 2)

```
Now that I have foundation properties set up in HubSpot, I need to enhance my assessment integration to capture all the data from our online Organizational Resilience Assessment.

CONTEXT:
- We have a live assessment at: [your Vercel URL]
- Assessment captures 10 questions including crisis experience, readiness, support systems, etc.
- Current integration sends basic data to HubSpot via Make.com
- We need to store detailed assessment responses for better lead qualification

CURRENT ASSESSMENT DATA CAPTURED:
- assessment_id
- assessment_score (overall 0-100)
- preparedness_score, response_score, recovery_score, support_score
- lead_score (0-100)
- recaptcha_score
- wants_consultation, wants_newsletter, wants_training, wants_resources
- All 10 question responses

TASK:
Review Phase 2 of the attached playbook and help me:

1. **Create 9 new assessment properties** in HubSpot:
   - Assessment Completion Date
   - Assessment ID (unique identifier)
   - Overall Assessment Score
   - Preparedness Score
   - Response Capability Score
   - Recovery Planning Score
   - Support Systems Score
   - Assessment Tier (Low/Medium/High Risk)
   - Crisis Experience Level

2. **Map assessment data** from Make.com webhook to HubSpot properties:
   - Provide exact field mapping table
   - Show which webhook field maps to which HubSpot property

3. **Create calculated properties** (if needed):
   - Assessment Tier calculation based on overall score
   - Risk level indicators

4. **Set up workflows** to:
   - Auto-assign Contact Type based on assessment score
   - Trigger follow-up tasks for high scorers
   - Add to specific lists based on assessment results

5. **Provide Make.com module configuration** for the HubSpot "Create/Update Contact" step

DELIVERABLE FORMAT:
Step-by-step guide with:
- Property creation specs
- Make.com field mapping table
- Workflow setup instructions
- Testing checklist with sample data

FILES TO ATTACH:
- Aftermath_HubSpot_Implementation_Playbook.md
- GO-LIVE-CHECKLIST.md (for Make.com context)
```

---

### Prompt 1.3: Build Discovery Call & Consultation Tracking (Week 4)

```
I need to implement discovery call and consultation tracking in HubSpot to manage our sales process from assessment completion to signed engagement.

CONTEXT:
- Prospects complete assessment → Request consultation → Discovery call scheduled → Proposal sent → Deal closed
- We need to track each stage and automate follow-ups
- Current gap: No visibility into discovery call status, no consultation tracking

CURRENT BOOKING FLOW:
- Assessment results page has "Schedule Free Consultation" CTA
- Links to: [your booking URL - Calendly/HubSpot meetings]
- After booking, we conduct discovery calls
- Then send proposals and close deals

TASK:
Using Phase 4 of the playbook, help me:

1. **Create 6 discovery/consultation properties**:
   - Discovery Call Status (dropdown: Not Scheduled, Scheduled, Completed, No Show, Cancelled)
   - Discovery Call Date
   - Discovery Call Notes (long text)
   - Consultation Interest Level (Hot/Warm/Cold)
   - Proposed Service Package
   - Proposal Sent Date

2. **Set up HubSpot Meetings integration** OR **Calendly webhook** to:
   - Auto-update "Discovery Call Status" when meeting booked
   - Set "Discovery Call Date" from calendar
   - Create task for team member assigned to call

3. **Create workflows** for:
   - When discovery call scheduled → Send confirmation email sequence
   - When discovery call completed → Create task to send proposal
   - When no show → Create follow-up task + re-engagement email
   - When consultation_interest = Hot → Notify sales team immediately

4. **Build email templates** for:
   - Discovery call confirmation (with prep instructions)
   - Post-call thank you + next steps
   - No-show re-engagement
   - Proposal follow-up

5. **Provide reporting dashboard setup** to track:
   - Discovery calls booked this week/month
   - Conversion rate: Assessment → Discovery Call
   - No-show rate
   - Discovery Call → Deal conversion

DELIVERABLE FORMAT:
- Property creation checklist
- Calendly/HubSpot Meetings integration guide
- Workflow blueprints (trigger → actions → conditions)
- Email template copywriting frameworks
- Dashboard/report setup instructions

FILES TO ATTACH:
- Aftermath_HubSpot_Implementation_Playbook.md
```

---

### Prompt 1.4: Configure Deal Pipeline & Stages (Week 7)

```
I need to set up our deal pipeline in HubSpot to track opportunities from discovery call through signed contract.

CONTEXT:
- We offer 3 tiers of service: Preparedness, Response, Recovery
- Deal sizes range from $5K (workshops) to $100K+ (full partnerships)
- Sales cycle: Discovery → Proposal → Negotiation → Contract → Onboarding
- Need to track deal stages, probability, expected close date

OUR SERVICE OFFERINGS:
1. TIER 1: Quick Wins (Workshops) - $2K-$10K
2. TIER 2: Strategic Intensives (Multi-day engagements) - $10K-$30K
3. TIER 3: Full-Spectrum Partnership (6-18 month retainers) - $30K-$150K

TASK:
Using Phase 7 of the playbook, help me:

1. **Design deal stages** with:
   - Stage names aligned to our sales process
   - Win probability for each stage
   - Required actions before advancing to next stage
   - Typical time in each stage

2. **Create deal properties** including:
   - Service Tier (TIER 1/2/3)
   - Service Type (Preparedness/Response/Recovery/Support)
   - Deal Source (Assessment/Referral/Direct Inquiry/Partner)
   - Proposal Version
   - Contract Status
   - Implementation Start Date

3. **Set up deal automation** to:
   - Auto-create deal when discovery call status = "Completed"
   - Set deal amount based on service tier
   - Move to "Proposal Sent" when proposal email tracked
   - Notify team when deal stuck in stage > 14 days
   - Create onboarding tasks when deal marked "Closed Won"

4. **Build deal board views** for:
   - Main sales pipeline (default view)
   - Deals by service tier
   - Deals by expected close date (this month/quarter)
   - At-risk deals (aging report)

5. **Create revenue forecasting** setup:
   - Weighted pipeline value
   - Monthly/quarterly projections
   - Win rate by tier and source

DELIVERABLE FORMAT:
- Deal stage configuration table
- Deal property specifications
- Workflow blueprints for deal automation
- Pipeline board view setup guide
- Forecasting report configuration

FILES TO ATTACH:
- Aftermath_HubSpot_Implementation_Playbook.md
```

---

## 🗂️ SECTION 2: AIRTABLE BASE STRUCTURE PROMPTS

### Prompt 2.1: Design Master Client & Project Tracking Base

```
I need to design an Airtable base to track client projects, deliverables, and engagement history that syncs with HubSpot.

BUSINESS CONTEXT:
- Crisis management consulting firm
- Services: Workshops, strategic consulting, long-term partnerships
- Need to track: Projects, deliverables, timelines, team assignments, client satisfaction

CURRENT CHALLENGES:
- Client data in HubSpot, but no detailed project tracking
- No centralized view of all deliverables across engagements
- Hard to see team capacity and assignments
- No client health score or renewal tracking

DESIRED OUTCOME:
An Airtable base that serves as our "Project Command Center" with:
- Client/organization records (linked to HubSpot)
- Projects/engagements (one client can have multiple)
- Deliverables/milestones per project
- Team member assignments and capacity tracking
- Client health scores and renewal forecasting

TASK:
Please design a comprehensive Airtable base structure including:

1. **Table schemas** for:
   - Clients/Organizations (linked to HubSpot)
   - Projects/Engagements
   - Deliverables/Milestones
   - Team Members
   - Service Catalog (our offerings)

2. **Field definitions** for each table:
   - Field names and types
   - Formulas for calculated fields
   - Linked record relationships
   - Lookup fields from related tables

3. **Views** for each table:
   - Grid view (default)
   - Kanban views (by status, by team member)
   - Calendar views (for timelines)
   - Gallery views (if applicable)
   - Filtered views (Active Projects, At Risk, etc.)

4. **Automations** within Airtable:
   - When project status = "Closed Won" → Create welcome email task
   - When deliverable due date < 7 days → Notify assigned team member
   - When client health score = Red → Create urgent task for account manager

5. **Integration points** with:
   - HubSpot (via Make.com): When HubSpot deal closes → Create Airtable project
   - Slack: Notifications for urgent tasks
   - Google Calendar: Sync deliverable due dates

6. **Reporting dashboards** showing:
   - Active projects by status
   - Team capacity (who's overloaded?)
   - Revenue by service type
   - Client health overview

DELIVERABLE FORMAT:
- Base structure diagram (tables and relationships)
- Field specification sheets for each table
- Formula reference guide
- View configuration guide
- Automation blueprints
- Integration setup instructions

ADDITIONAL CONTEXT:
- Our service tiers: Quick Wins ($2-10K), Strategic Intensives ($10-30K), Full Partnerships ($30-150K+)
- Typical project duration: 1 week (workshops) to 18 months (retainers)
- Team size: 3-5 consultants + admin support
- We want to track: training delivered, materials created, follow-up sessions, client satisfaction surveys
```

---

### Prompt 2.2: Create Assessment Lead Tracking & Scoring Base

```
I need an Airtable base to track all assessment submissions, score/qualify leads, and manage follow-up sequences.

ASSESSMENT CONTEXT:
- Online "Organizational Resilience Assessment" at [Vercel URL]
- Captures 10 questions + contact info
- Generates scores: Overall (0-100), Preparedness, Response, Recovery, Support
- Calculates lead_score (0-100) based on answers
- Data flows: Assessment → Make.com → HubSpot → Airtable

CURRENT DATA FLOW:
1. User completes assessment
2. Make.com receives webhook
3. HubSpot contact created/updated
4. Need: Airtable record created for lead tracking

BUSINESS NEED:
- Centralized view of all assessment leads
- Lead scoring and qualification workflow
- Follow-up task management
- Conversion tracking (assessment → discovery call → deal)

TASK:
Design an Airtable base for assessment lead management with:

1. **Leads Table** containing:
   - Contact info (name, email, organization, role)
   - Assessment data (all scores, responses, completion date)
   - Lead qualification fields (score, tier, status, assigned owner)
   - Engagement tracking (emails sent, calls made, meetings booked)
   - Conversion fields (discovery call scheduled?, deal created?, won/lost)

2. **Assessment Questions Table** with:
   - Question ID and text
   - Question type (single/multiple choice)
   - Weight/importance for scoring
   - Link to responses

3. **Follow-up Sequences Table**:
   - Sequence name (e.g., "Hot Lead - Consultation Request")
   - Trigger criteria (lead_score ≥ 70 AND wants_consultation = true)
   - Email sequence (Email 1, 2, 3 with days between)
   - Task sequence (Call on Day 1, Follow-up on Day 3, etc.)

4. **Team Assignment Rules Table**:
   - Rule name
   - Criteria (e.g., org_type = K12 + score ≥ 80)
   - Assigned owner
   - Priority level

5. **Formulas** for:
   - Lead tier calculation (A+, A, B, C based on score)
   - Days since assessment completion
   - Follow-up urgency indicator
   - Conversion probability score

6. **Automations**:
   - When new lead added → Auto-assign based on rules
   - When lead tier = A+ → Notify team immediately
   - When days_since_assessment > 7 AND no contact → Create urgent task
   - When discovery_call_booked = true → Move to "Engaged" status

7. **Views**:
   - Hot Leads (score ≥ 70, no contact yet)
   - Consultation Requests (wants_consultation = true)
   - Newsletter Only (wants_newsletter = true, low engagement)
   - Needs Follow-Up (last contact > 7 days ago)
   - Converted (deal created)

8. **Dashboard** showing:
   - Assessment completions this week/month
   - Average lead score
   - Conversion rate by source
   - Response time to hot leads

DELIVERABLE FORMAT:
- Table schemas with field specifications
- Formula reference guide
- Automation blueprints
- View configurations
- Make.com → Airtable integration setup
- Reporting dashboard mockup

INTEGRATION REQUIREMENTS:
- Sync with HubSpot (bidirectional if possible)
- Trigger from Make.com webhook
- Send Slack notifications for hot leads
- Export to Google Sheets for team dashboard
```

---

## 📧 SECTION 3: MAILCHIMP SETUP PROMPTS

### Prompt 3.1: Design Newsletter & Nurture Campaign Structure

```
I need to set up Mailchimp for our newsletter and lead nurture campaigns, segmented by assessment results and engagement level.

BUSINESS CONTEXT:
- Crisis management consulting firm
- Assessment tool captures newsletter opt-ins
- Need to nurture cold leads into warm prospects
- Want to send targeted content based on their assessment results

CURRENT SITUATION:
- Assessment captures "wants_newsletter" flag
- Make.com auto-adds subscribers to Mailchimp
- No segmentation or automation set up yet
- All subscribers in one list (not segmented)

DESIRED OUTCOME:
Strategic Mailchimp setup with:
- Segmented lists/tags based on assessment data
- Welcome automation for new subscribers
- Nurture sequences by lead score and interests
- Re-engagement campaigns for cold leads

TASK:
Help me design a complete Mailchimp structure including:

1. **Audience Setup**:
   - Main audience name and structure
   - Merge fields to track (Assessment Score, Lead Score, Organization Type, Interests)
   - Groups/segments (by industry, by score, by service interest)
   - Tags (assessment-completed, hot-lead, cold-lead, consultation-requested, etc.)

2. **Automation Workflows**:

   **Welcome Series** (triggered by tag "assessment-completed"):
   - Email 1 (Day 0): Welcome + Thank you for assessment + Link to download PDF
   - Email 2 (Day 3): Educational content based on their top gap area
   - Email 3 (Day 7): Case study relevant to their organization type
   - Email 4 (Day 14): Free resource offer (checklist, template)
   - Email 5 (Day 21): Consultation booking CTA

   **Hot Lead Nurture** (for lead_score ≥ 70):
   - Email 1 (Day 0): Personalized results + Book consultation CTA
   - Email 2 (Day 2): Success story + Urgent CTA
   - Email 3 (Day 5): Limited-time offer or incentive
   - Email 4 (Day 10): Final follow-up + alternative resources

   **Cold Lead Re-Engagement** (for lead_score < 50):
   - Quarterly educational content
   - Invite to free webinars/workshops
   - Soft CTA to retake assessment in 6 months

   **Monthly Newsletter**:
   - Sent to all subscribers
   - Content mix: 60% education, 30% case studies, 10% promotion
   - Segmented content blocks based on interests

3. **Segmentation Strategy**:
   - By assessment score (0-30, 31-50, 51-70, 71-100)
   - By organization type (K12, Higher Ed, Nonprofit, etc.)
   - By top gap area (Preparedness, Response, Recovery, Support)
   - By engagement level (opened last 3 emails, clicked in last 30 days, etc.)

4. **Integration with Make.com**:
   - Exact field mapping from assessment to Mailchimp
   - Tag assignment rules in Make.com
   - How to pass lead_score to Mailchimp
   - How to segment immediately upon signup

5. **Email Templates**:
   - Welcome email framework (subject + body structure)
   - Educational email template
   - Case study email template
   - CTA/conversion email template
   - Monthly newsletter template

6. **Tracking & Analytics Setup**:
   - UTM parameters for links
   - Goal tracking (clicks to booking page)
   - A/B test ideas for subject lines
   - Engagement scoring

DELIVERABLE FORMAT:
- Audience structure diagram
- Merge field specifications
- Segment/tag definitions
- Automation workflow flowcharts (step-by-step)
- Email template frameworks with sample copy
- Make.com integration guide
- Analytics dashboard recommendations

SAMPLE ASSESSMENT DATA TO WORK WITH:
- name: "Sarah Johnson"
- email: "sarah@lincolnmiddle.edu"
- organization: "Lincoln Middle School"
- org_type: "K12 Education"
- overall_score: 73 (High risk)
- lead_score: 82 (Hot lead)
- top_gap: "Response Capability"
- wants_consultation: true
- wants_newsletter: true
```

---

### Prompt 3.2: Build Re-Engagement Campaign for Dormant Leads

```
I need a Mailchimp re-engagement campaign to win back dormant leads (people who completed assessment 3+ months ago but never booked a consultation).

CONTEXT:
- We have assessment completions from the past 6-12 months
- Many leads went cold after getting their results
- Want to re-engage them with new content/offers
- Goal: Get them to book a discovery call or engage with new resources

DORMANT LEAD CRITERIA:
- Completed assessment 90+ days ago
- Did NOT book discovery call
- Email open rate < 20% over last 90 days (low engagement)
- Still relevant (not marked as "unqualified" or "lost")

AVAILABLE DATA:
- Original assessment scores and responses
- Organization type and industry
- Email engagement history
- Time since last interaction

TASK:
Design a re-engagement campaign including:

1. **Segmentation**:
   - How to identify dormant leads in Mailchimp
   - Segment by original assessment score (prioritize high scorers)
   - Exclude anyone who unsubscribed or marked spam

2. **Campaign Sequence** (5-email series over 30 days):

   **Email 1 (Day 0): "It's Been a While..."**
   - Subject line options (3 variations to A/B test)
   - Acknowledge time gap
   - Offer updated resources or new insights
   - Soft CTA: "Retake assessment" or "See what's new"

   **Email 2 (Day 7): New Case Study/Success Story**
   - Share relevant case study (matched to their org type)
   - Show results similar organizations achieved
   - CTA: "Want results like this? Let's talk"

   **Email 3 (Day 14): Free Resource/Tool Offer**
   - Valuable downloadable (crisis response checklist, template, etc.)
   - No strings attached
   - Rebuild trust and provide value

   **Email 4 (Day 21): Time-Limited Offer**
   - Special incentive (discounted discovery call, free gap analysis, etc.)
   - Create urgency (expires in 7 days)
   - Strong CTA to book

   **Email 5 (Day 30): "Last Chance" + Alternative Path**
   - Final re-engagement attempt
   - If not interested in consultation, offer other ways to stay connected
   - Give option to adjust email frequency or update preferences

3. **Personalization**:
   - Use merge fields for name, organization, original assessment score
   - Reference their specific gap areas from original assessment
   - Tailor content to organization type

4. **Win-Back Incentives**:
   - What offers are most compelling? (free consultation, discount, exclusive content?)
   - How to structure limited-time offers
   - Exit survey for those who want to unsubscribe (learn why)

5. **Tracking & Success Metrics**:
   - Goal: X% re-engagement rate (opens/clicks)
   - Goal: Y% consultation bookings from this campaign
   - How to tag re-engaged leads in Mailchimp
   - How to notify team when someone re-engages

6. **Cleanup Strategy**:
   - What to do with leads who don't engage after 5 emails?
   - Move to "Low Priority" segment vs. Unsubscribe?
   - How often to attempt re-engagement (quarterly? annually?)

DELIVERABLE FORMAT:
- Segment criteria and setup instructions
- 5 email templates with multiple subject line options
- Personalization merge field guide
- Campaign workflow flowchart
- Tracking/reporting dashboard setup
- Decision tree for post-campaign actions

EXAMPLE DORMANT LEAD:
- Completed assessment 120 days ago
- Score: 68 (Moderate risk)
- Organization: "Riverside Hospital System"
- Org type: Healthcare
- Top gap: "Support Systems"
- Last email opened: 90 days ago
- Never booked discovery call
```

---

## 🔄 SECTION 4: MAKE.COM BLUEPRINT PROMPTS

### Prompt 4.1: Build Complete Assessment → HubSpot → Airtable Flow

```
I need a Make.com scenario that takes assessment submissions and intelligently routes them to HubSpot, Airtable, Mailchimp, and triggers team notifications based on lead quality.

CURRENT SETUP:
- Assessment webhook URL: https://hook.us2.make.com/y7n8tnm51v3hesxlxnn907vhur4iddp9
- Basic HubSpot integration working (creates contacts)
- No Airtable integration yet
- No conditional routing based on lead score

ASSESSMENT DATA RECEIVED (Webhook Payload):
```json
{
  "assessment_id": "assess_1234567890_abc",
  "name": "Sarah Johnson",
  "email": "sarah@org.com",
  "organization": "Lincoln Middle School",
  "org_info": "k12_education",
  "overall_score": 73,
  "preparedness_score": 58,
  "response_score": 67,
  "recovery_score": 81,
  "support_score": 75,
  "lead_score": 82,
  "wants_consultation": true,
  "wants_newsletter": true,
  "wants_training": false,
  "wants_resources": true,
  "recaptcha_score": 0.9,
  "crisis_experience_ever": "yes",
  "timeline_focus": "before",
  "top_gaps": ["Preparedness", "Response Capability"]
}
```

TASK:
Design a complete Make.com scenario with these requirements:

1. **Scenario Structure** (module-by-module):

   **Module 1: Webhook (Entry Point)**
   - Webhook URL already created
   - Parse incoming JSON

   **Module 2: Router (Split by Bot Score)**
   - Route 1: reCAPTCHA score < 0.5 → Log and reject (spam)
   - Route 2: reCAPTCHA score ≥ 0.5 → Continue processing

   **Module 3: HubSpot - Create/Update Contact**
   - Map all assessment fields to HubSpot properties
   - Update if contact exists (by email)
   - Create if new

   **Module 4: Router (Split by Lead Quality)**
   - Route 4A: Hot Lead (lead_score ≥ 70 AND wants_consultation = true)
   - Route 4B: Warm Lead (lead_score 50-69 OR wants_newsletter = true)
   - Route 4C: Cold Lead (lead_score < 50)

   **Route 4A Actions (Hot Lead):**
   - Add to HubSpot list "Hot Leads - Immediate Follow-Up"
   - Create Airtable record in "Hot Leads" table
   - Send Slack notification to #sales channel
   - Send team email alert with contact details
   - Add to Mailchimp with tag "hot-lead"
   - Create HubSpot task "Call within 24 hours" assigned to sales team

   **Route 4B Actions (Warm Lead):**
   - Add to HubSpot list "Warm Leads - Nurture"
   - Create Airtable record in "Leads" table
   - Add to Mailchimp with tag "warm-lead"
   - Trigger Mailchimp automation "Welcome Series"

   **Route 4C Actions (Cold Lead):**
   - Add to HubSpot list "Newsletter - Educational Content"
   - Add to Mailchimp with tag "cold-lead"
   - No immediate notifications

2. **Field Mapping Tables**:
   - Assessment Webhook → HubSpot Properties (complete mapping)
   - Assessment Webhook → Airtable Fields (complete mapping)
   - Assessment Webhook → Mailchimp Merge Fields (complete mapping)

3. **Conditional Logic Rules**:
   - If `wants_consultation = true` → Always treat as hot lead regardless of score
   - If `org_info = "government" OR "higher_ed"` → Flag as high-value prospect
   - If `crisis_experience_ever = "yes"` AND `overall_score > 60` → Ultra-hot (immediate alert)
   - If `wants_newsletter = false` AND `wants_consultation = false` → Still add to database but mark as "Low Intent"

4. **Error Handling**:
   - What happens if HubSpot API fails? (Retry logic)
   - What if email already exists in Mailchimp? (Update, don't duplicate)
   - What if Airtable is down? (Log to Google Sheets backup)

5. **Notifications Setup**:
   - **Slack Channel**: #sales (for hot leads only)
   - **Email**: team@aftermathsolutions.com (for ultra-hot leads)
   - **SMS** (optional): If lead_score > 90 (Twilio integration)

6. **Testing Scenarios**:
   - Test payload #1: Hot lead (score 85, wants consultation)
   - Test payload #2: Warm lead (score 55, wants newsletter)
   - Test payload #3: Cold lead (score 30, just wants results)
   - Test payload #4: Bot/spam (reCAPTCHA score 0.2)

DELIVERABLE FORMAT:
- Complete scenario blueprint (flowchart or step-by-step module list)
- Field mapping tables for each integration
- Conditional logic decision tree
- Module configuration screenshots/instructions
- Error handling strategy
- Testing checklist with expected outcomes

ADDITIONAL REQUIREMENTS:
- Scenario should run "Immediately as data arrives"
- All modules should have clear names (e.g., "HubSpot - Create Contact" not just "HubSpot")
- Add "Notes" to each module explaining its purpose
- Set up email notifications to me if scenario fails

FILES TO REFERENCE:
- GO-LIVE-CHECKLIST.md (for current Make.com setup)
- Aftermath_HubSpot_Implementation_Playbook.md (for HubSpot property names)
```

---

### Prompt 4.2: Create HubSpot Deal → Airtable Project Automation

```
When a deal closes in HubSpot, I need Make.com to automatically create a project in Airtable with all client info, deliverables, and team assignments.

TRIGGER:
- HubSpot Deal stage changes to "Closed Won"

HUBSPOT DEAL DATA AVAILABLE:
- Deal name (e.g., "Lincoln Middle School - Crisis Preparedness Training")
- Deal amount ($15,000)
- Deal close date
- Associated contact (client)
- Service tier (TIER 1, 2, or 3)
- Service type (Preparedness, Response, Recovery, Support)
- Custom properties (implementation_start_date, contract_status, etc.)

AIRTABLE TABLES TO POPULATE:
1. **Clients** table (if not already exists)
2. **Projects** table (create new record)
3. **Deliverables** table (create based on service tier)
4. **Tasks** table (create welcome/kickoff tasks)

TASK:
Design Make.com scenario to:

1. **Trigger Module**:
   - Watch HubSpot Deals
   - Filter: Deal stage = "Closed Won"
   - Trigger on: Deal property changed

2. **Get Associated Contact** (from HubSpot):
   - Pull contact info linked to deal
   - Fields needed: Name, Email, Organization, Phone, all assessment scores

3. **Router: Check if Client Exists in Airtable**:
   - Search Airtable "Clients" table by email
   - Route A: Client exists → Link to existing
   - Route B: Client doesn't exist → Create new client record

4. **Create Client Record** (if needed - Route B):
   - Map contact fields to Airtable
   - Link to HubSpot contact ID for sync

5. **Create Project Record** in Airtable:
   - Project Name: {{deal.name}}
   - Client: Link to client record from Step 4
   - Deal Value: {{deal.amount}}
   - Service Tier: {{deal.service_tier}}
   - Status: "Onboarding"
   - Start Date: {{deal.implementation_start_date}}
   - Owner: Assigned from deal owner

6. **Create Deliverables** based on Service Tier:

   **IF Tier 1 (Quick Wins):**
   - Deliverable 1: "Workshop Delivery" (Due: Start Date + 7 days)
   - Deliverable 2: "Post-Workshop Materials" (Due: Start Date + 14 days)

   **IF Tier 2 (Strategic Intensive):**
   - Deliverable 1: "Needs Assessment" (Due: Start Date + 7 days)
   - Deliverable 2: "Strategic Plan Development" (Due: Start Date + 30 days)
   - Deliverable 3: "Implementation Support" (Due: Start Date + 60 days)

   **IF Tier 3 (Full Partnership):**
   - Deliverable 1: "Comprehensive Audit" (Due: Start Date + 14 days)
   - Deliverable 2: "Custom Framework" (Due: Start Date + 45 days)
   - Deliverable 3: "Training Series" (Due: Start Date + 90 days)
   - Deliverable 4: "Ongoing Support (Monthly)" (Due: Monthly recurring)

7. **Create Kickoff Tasks** in Airtable:
   - Task 1: "Send welcome email" (Assigned: Project Owner, Due: Today)
   - Task 2: "Schedule kickoff call" (Assigned: Project Owner, Due: Today + 2 days)
   - Task 3: "Send onboarding materials" (Assigned: Admin, Due: Today + 3 days)

8. **Notifications**:
   - Send Slack message to #projects: "New project created: {{project.name}}"
   - Email project owner: "You've been assigned to new project: {{project.name}}"
   - Email client: Welcome email with next steps

9. **Update HubSpot Deal**:
   - Add note: "Airtable project created: [link to Airtable record]"
   - Set custom property: airtable_project_id = {{airtable.record_id}}

DELIVERABLE FORMAT:
- Module-by-module scenario blueprint
- Conditional logic for service tiers (deliverable creation rules)
- Field mapping tables (HubSpot → Airtable)
- Template text for notifications and emails
- Error handling (what if Airtable API fails?)
- Testing checklist

ADDITIONAL CONTEXT:
- Average 2-5 deals close per month
- Need this to be fully automated (no manual project creation)
- Want ability to customize deliverables later in Airtable
- Should work for all 3 service tiers
```

---

### Prompt 4.3: Build Monthly Reporting Automation (HubSpot + Airtable → Google Sheets Dashboard)

```
I need a Make.com scenario that runs monthly to compile assessment metrics, lead data, and project status into a Google Sheets executive dashboard.

REPORTING NEEDS:
- Assessment submissions and conversion rates
- Lead pipeline health
- Project delivery status
- Revenue metrics

DATA SOURCES:
1. **HubSpot**: Contact properties, deals, assessment data
2. **Airtable**: Projects, deliverables, client health scores
3. **Mailchimp**: Newsletter engagement metrics

TASK:
Create a Make.com scenario that runs on the 1st of each month to generate executive report:

1. **Schedule Trigger**:
   - Runs: 1st day of month at 8:00 AM
   - Timezone: [Your timezone]

2. **Collect HubSpot Metrics**:

   **Assessment Metrics** (previous month):
   - Total assessments completed
   - Average assessment score
   - Average lead score
   - Breakdown by organization type

   **Conversion Metrics**:
   - Assessments → Discovery calls booked (conversion %)
   - Discovery calls → Deals created (conversion %)
   - Deals created → Closed won (win rate %)

   **Pipeline Health**:
   - Hot leads (score ≥ 70) count
   - Warm leads (score 50-69) count
   - Cold leads (score < 50) count
   - Total pipeline value by stage

3. **Collect Airtable Metrics**:

   **Project Delivery**:
   - Active projects count
   - Projects by status (Onboarding, In Progress, Completed)
   - On-time delivery rate (deliverables completed vs. due)
   - At-risk projects (deliverables overdue)

   **Client Health**:
   - Clients by health score (Red/Yellow/Green)
   - Satisfaction survey average (if tracked)
   - Renewal likelihood scores

4. **Collect Mailchimp Metrics**:
   - Newsletter subscribers added this month
   - Open rate (last 30 days)
   - Click rate (last 30 days)
   - Unsubscribe rate

5. **Google Sheets Structure**:

   **Sheet 1: Overview Dashboard**
   - Month/Year header
   - Key metrics cards (total assessments, conversion rate, revenue)
   - Month-over-month comparison

   **Sheet 2: Assessment Funnel**
   - Stage-by-stage conversion table
   - Drop-off analysis

   **Sheet 3: Lead Source Analysis**
   - Leads by source (organic, referral, partner, etc.)
   - Quality by source (avg lead score)

   **Sheet 4: Project Status**
   - All active projects table
   - Status summary (on-time, at-risk, delayed)

   **Sheet 5: Revenue Metrics**
   - Closed deals this month
   - Pipeline value by stage
   - Forecast for next 3 months

6. **Calculations & Formulas**:
   - Conversion rate = (Next stage / Previous stage) × 100
   - Win rate = (Closed Won / Total Opportunities) × 100
   - Average deal size by tier
   - Month-over-month growth %

7. **Formatting & Visualization**:
   - Use Make.com to update cell values
   - Suggest Google Sheets formulas for charts
   - Color-code health indicators (Red/Yellow/Green)
   - Add conditional formatting rules

8. **Distribution**:
   - After sheet updated, send email to leadership with summary
   - Attach PDF export of dashboard
   - Slack message to #leadership with link to sheet

DELIVERABLE FORMAT:
- Scenario blueprint with all modules
- HubSpot API call specifications (filters, date ranges)
- Airtable API call specifications
- Google Sheets cell mapping (which data goes where)
- Formula templates for calculations
- Email template for leadership summary

ADDITIONAL REQUIREMENTS:
- Historical data: Keep each month's data in separate tab (don't overwrite)
- Error handling: If data pull fails, send error notification
- Make it easy to change date ranges (last 30 days vs. calendar month)
```

---

## 🔗 SECTION 5: INTEGRATION & WORKFLOW PROMPTS

### Prompt 5.1: Design Complete Tech Stack Integration Map

```
I need a comprehensive integration architecture diagram showing how all our tools connect (HubSpot, Airtable, Mailchimp, Make.com, Assessment Tool).

TOOLS IN STACK:
1. **Assessment Tool** (Vercel-hosted, sends webhooks)
2. **Make.com** (automation hub)
3. **HubSpot** (CRM, deals, contacts)
4. **Airtable** (project management, detailed tracking)
5. **Mailchimp** (email marketing)
6. **Slack** (team notifications)
7. **Google Workspace** (Calendar, Sheets, Docs)
8. **Calendly or HubSpot Meetings** (booking)

TASK:
Create a complete integration architecture including:

1. **Data Flow Diagram**:
   - Show how data moves between systems
   - Indicate triggers (what causes data to flow?)
   - Bidirectional vs. unidirectional flows
   - Real-time vs. batch/scheduled updates

2. **Integration Points**:
   For each connection, specify:
   - Tool A → Tool B
   - What data transfers?
   - How? (API, webhook, Make.com scenario, native integration)
   - When? (real-time, hourly, daily)
   - Why? (business purpose)

3. **Master Data Sources** (Single Source of Truth):
   - Where is contact info mastered? (HubSpot or Airtable?)
   - Where are assessment responses mastered?
   - Where are project details mastered?
   - How to handle conflicts (if data differs between systems)?

4. **Sync Strategies**:
   - One-way sync (e.g., Assessment → HubSpot only)
   - Two-way sync (e.g., HubSpot ↔ Airtable for project data)
   - Event-driven (trigger when something changes)
   - Scheduled (nightly batch updates)

5. **Redundancy & Backup**:
   - What happens if HubSpot API is down?
   - Backup data stores (Google Sheets as fallback?)
   - How to recover from failed syncs?

6. **Permission & Access Control**:
   - Who can access each tool?
   - API key management (where stored securely?)
   - Rate limits and quota management

DELIVERABLE FORMAT:
- Visual integration map (flowchart or diagram)
- Integration specification table (Tool A, Tool B, Method, Frequency, Data)
- Single source of truth matrix
- Disaster recovery plan
- Access control matrix

EXAMPLE FLOWS TO MAP:
1. Assessment submission → HubSpot contact → Mailchimp subscriber → Airtable lead
2. HubSpot deal closed → Airtable project created → Google Calendar event → Slack notification
3. Airtable deliverable completed → HubSpot task closed → Client email sent
```

---

### Prompt 5.2: Build Data Governance & Cleanup Strategy

```
As our tech stack grows, I need a data governance strategy to prevent duplicates, ensure data quality, and maintain clean systems.

CURRENT CHALLENGES:
- Potential for duplicate contacts (same person in HubSpot + Mailchimp + Airtable)
- Inconsistent naming (one person enters "K12" another enters "K-12 Education")
- Outdated data (people change jobs, emails bounce)
- No regular cleanup process

TASK:
Design a comprehensive data governance framework:

1. **Duplicate Prevention**:
   - How to dedupe in HubSpot (merge rules)
   - How to prevent duplicates across HubSpot + Airtable + Mailchimp
   - Email as primary key (matching logic)
   - What to do when duplicate found? (Auto-merge or flag for review?)

2. **Data Quality Rules**:

   **Required Fields** (must be filled):
   - Contact: Name, Email, Organization
   - Deal: Deal name, Amount, Close date
   - Project: Client, Start date, Service tier

   **Validation Rules**:
   - Email must be valid format
   - Phone must be US/international format
   - Organization type must be from approved list (no free text)
   - Lead score must be 0-100

   **Standardization**:
   - Organization type dropdown (K12 Education, Higher Education, etc.)
   - State abbreviations (CA not California)
   - Phone formatting (auto-format to (555) 555-5555)

3. **Regular Cleanup Automations**:

   **Weekly Cleanup** (Make.com scenario):
   - Find duplicate emails in HubSpot
   - Identify contacts with missing critical fields
   - Flag bounced email addresses
   - Update "Last Activity Date" for all contacts

   **Monthly Cleanup**:
   - Archive contacts with no activity in 12 months
   - Merge duplicate Airtable records
   - Clean up unsubscribed Mailchimp contacts
   - Remove test/spam entries

4. **Archiving Strategy**:
   - When to archive vs. delete?
   - Where to store archived data? (Separate Airtable base? Google Sheets?)
   - How long to retain data? (GDPR compliance: right to be forgotten)

5. **Data Enrichment**:
   - Use Clearbit/ZoomInfo to auto-fill company data
   - LinkedIn integration for job titles
   - Geographic data (state, region) from email domain

6. **Audit Trail**:
   - Track when record was created, by whom
   - Track when record was modified, what changed
   - HubSpot's native audit log
   - Airtable "Created Time" and "Last Modified Time" fields

DELIVERABLE FORMAT:
- Data quality rulebook (validation rules document)
- Duplicate prevention workflow
- Cleanup automation scenarios (Make.com blueprints)
- Archiving policy and procedures
- Enrichment integration guide
```

---

## 📚 SECTION 6: DOCUMENTATION & TRAINING PROMPTS

### Prompt 6.1: Create Team Playbook for Daily CRM Operations

```
I need a simple, clear playbook for my team to use HubSpot, Airtable, and Mailchimp daily without confusion.

TEAM MEMBERS:
- Josh (Founder): Needs to see high-level metrics, close deals
- Sallie (Operations): Manages projects, client delivery, team coordination
- Dr. Amy (Consultant): Delivers services, tracks client satisfaction
- Admin/VA (Future hire): Data entry, follow-ups, scheduling

TASK:
Create role-based playbooks with daily workflows:

1. **Josh's Daily Workflow** (30 min/day):

   **Morning (9:00 AM)**:
   - Open HubSpot dashboard
   - Review hot leads from yesterday (filtered view)
   - Check deals in "Proposal Sent" stage (follow up if > 3 days)
   - Review Slack notifications (any hot leads overnight?)

   **End of Day (5:00 PM)**:
   - Update deal stages for any conversations today
   - Log calls/emails in HubSpot
   - Review tomorrow's tasks

   **Weekly (Monday 10:00 AM)**:
   - Review pipeline forecast
   - Check Airtable project statuses
   - Team standup review

2. **Sallie's Daily Workflow** (1-2 hours/day):

   **Morning**:
   - Check Airtable "Tasks" view (due today + overdue)
   - Review project statuses (any at-risk?)
   - Update deliverable completion in Airtable

   **Client Check-ins**:
   - Weekly email to active clients (Monday)
   - Update client health scores in Airtable
   - Flag any concerns in Slack

   **End of Day**:
   - Mark completed tasks
   - Create tasks for tomorrow
   - Update HubSpot with any client interactions

3. **Dr. Amy's Workflow** (As needed):

   **Before Client Engagement**:
   - Review client record in Airtable (history, assessment scores, notes)
   - Check HubSpot for recent interactions
   - Prepare based on their specific needs

   **After Client Engagement**:
   - Log session notes in Airtable
   - Update deliverable status
   - Flag any follow-up needed

   **Monthly**:
   - Client satisfaction survey data entry
   - Update client health scores

4. **Admin/VA Workflow** (Future):

   **Daily**:
   - Check for new assessment submissions (HubSpot)
   - Send welcome emails to newsletter subscribers
   - Schedule discovery calls (Calendly integration)
   - Data entry: Update contact records with missing info

   **Weekly**:
   - Clean up duplicate contacts
   - Validate email addresses
   - Update lead statuses based on activity

   **Monthly**:
   - Run data quality report
   - Archive old contacts
   - Generate metrics report

5. **Standard Operating Procedures** (SOPs):

   **How to Handle New Assessment Lead**:
   - Step 1: Receive notification (Slack/Email)
   - Step 2: Review lead score and assessment responses in HubSpot
   - Step 3: If hot lead (score ≥ 70), call within 24 hours
   - Step 4: If warm lead, add to email nurture sequence
   - Step 5: Log all interactions in HubSpot

   **How to Close a Deal**:
   - Step 1: Move deal stage to "Closed Won" in HubSpot
   - Step 2: Verify Airtable project auto-created (Make.com)
   - Step 3: Send welcome email to client
   - Step 4: Schedule kickoff call
   - Step 5: Assign deliverables to team members in Airtable

   **How to Update Project Status**:
   - Step 1: Open project in Airtable
   - Step 2: Update deliverable completion %
   - Step 3: If behind schedule, update status to "At Risk"
   - Step 4: Notify Josh if project is Red status
   - Step 5: Log client communication in notes

DELIVERABLE FORMAT:
- Role-based daily checklist (printable PDF)
- Step-by-step SOPs with screenshots
- Quick reference cards (one-pagers for common tasks)
- Video script outlines (for Loom recordings)
- FAQ section (common questions and answers)
```

---

## 🎯 BONUS: ADVANCED OPTIMIZATION PROMPTS

### Prompt 7.1: Build Predictive Lead Scoring Model

```
I want to improve our lead scoring beyond the basic 0-100 calculation. Create an advanced scoring model that predicts likelihood to close.

CURRENT LEAD SCORE CALCULATION (in assessment):
- Baseline: 50 points
- High overall score (>70): +20
- High org type (government, higher ed): +10
- Wants consultation: +15
- Engagement signals: +5
- Speed penalty: -10 to -20

AVAILABLE DATA POINTS:
- All assessment responses and scores
- Organization type and size
- Email engagement (opens, clicks)
- Website behavior (if tracked)
- Response time to emails
- Discovery call attendance (show/no-show)

TASK:
Design an advanced predictive scoring model:

1. **Historical Analysis**:
   - What patterns do closed-won deals share?
   - Which assessment questions correlate most with conversions?
   - Which organization types have highest win rates?
   - What lead score range actually converts best?

2. **Enhanced Scoring Factors**:

   **Firmographic Signals** (30% weight):
   - Organization type (K12, Higher Ed = higher value)
   - Organization size (estimated from domain research)
   - Budget authority signals

   **Behavioral Signals** (40% weight):
   - Email engagement score (opens + clicks)
   - Website visits (if tracked with UTMs)
   - Response speed to emails
   - Discovery call booking (huge signal)

   **Needs-Based Signals** (30% weight):
   - Assessment score (higher = more urgent need)
   - Recent crisis experience (higher urgency)
   - Specific pain points mentioned
   - Timeline urgency (how soon they need help)

3. **Decay Mechanisms**:
   - Score decreases over time if no engagement
   - -5 points per week of no activity
   - Refresh score when they re-engage

4. **Implementation**:
   - How to calculate this in Make.com?
   - Store as HubSpot calculated property?
   - Update score daily with Make.com scenario?

5. **A/B Test Plan**:
   - Test current scoring vs. new model
   - Track conversion rates for each
   - Determine which predicts better

DELIVERABLE FORMAT:
- Scoring algorithm (formula/pseudocode)
- Weightings and justification
- Implementation guide (HubSpot calculated property or Make.com)
- A/B test setup instructions
- Success metrics to track
```

---

## 🗂️ FILES TO ATTACH WHEN USING THESE PROMPTS

**For HubSpot Prompts:**
- Aftermath_HubSpot_Implementation_Playbook.md

**For Assessment Integration Prompts:**
- GO-LIVE-CHECKLIST.md
- assessment.html (if asking about data structure)

**For Make.com Prompts:**
- GO-LIVE-CHECKLIST.md (Section 4: Make.com setup)
- Aftermath_HubSpot_Implementation_Playbook.md (for property names)

**For Mailchimp Prompts:**
- GO-LIVE-CHECKLIST.md (Section 4.7: Mailchimp integration)

---

## 📝 USAGE TIPS

### Getting the Best Results from Claude Desktop:

1. **Be Specific**: The more context you give, the better the response
2. **Attach Files**: Claude can read your playbooks and give specific guidance
3. **Ask Follow-Ups**: "Can you show me the exact HubSpot UI path for this?" or "Give me 3 subject line options for that email"
4. **Request Formats**: Ask for checklists, tables, flowcharts, code snippets - whatever format helps you most
5. **Iterate**: Start with basic setup, then come back with "Now optimize this for X"

### Example Follow-Up Questions:

After receiving a response:
- "Can you turn this into a step-by-step checklist?"
- "Show me the exact Make.com module configuration for step 3"
- "Write the actual email copy for this template"
- "What are the top 3 mistakes people make when setting this up?"
- "How do I test this before going live?"

---

## 🎯 PRIORITY ORDER (Start Here!)

If you're just getting started, use prompts in this order:

**Week 1:**
1. Prompt 1.1: HubSpot Foundation Properties
2. Prompt 4.1: Make.com Assessment Flow

**Week 2:**
3. Prompt 1.2: Assessment Integration Properties
4. Prompt 3.1: Mailchimp Newsletter Setup

**Week 3:**
5. Prompt 2.1: Airtable Client Tracking Base
6. Prompt 4.2: HubSpot → Airtable Project Flow

**Week 4:**
7. Prompt 1.3: Discovery Call Tracking
8. Prompt 1.4: Deal Pipeline Configuration

**Ongoing:**
9. Prompt 6.1: Team Playbook (train your team)
10. Optimization prompts as needed

---

**Created:** 2025-01-30
**Version:** 1.0
**Status:** Ready to Use

**LET'S BUILD YOUR AUTOMATION EMPIRE! 🚀**
