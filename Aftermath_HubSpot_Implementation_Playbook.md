# AFTERMATH SOLUTIONS \- HubSpot CRM Implementation Playbook

**Complete Step-by-Step Guide**  
**Date:** October 30, 2025  
**Prepared for:** Josh Garcia, Sallie Lynch, Dr. Amy O'Neill

---

## 📋 TABLE OF CONTENTS

1. [Overview & Implementation Timeline](#overview)  
2. [Phase 1: Foundation Properties (Week 1\)](#phase1)  
3. [Phase 2: Assessment Enhancement (Week 2\)](#phase2)  
4. [Phase 3: Service Tracking (Week 3\)](#phase3)  
5. [Phase 4: Discovery & Consultation (Week 4\)](#phase4)  
6. [Phase 5: Partnership Management (Month 2\)](#phase5)  
7. [Phase 6: Company Properties (Month 2\)](#phase6)  
8. [Phase 7: Deal Pipeline Configuration](#phase7)  
9. [Phase 8: Marketing Setup (Mailchimp/HubSpot)](#phase8)  
10. [Phase 9: Make.com Automation Workflows](#phase9)  
11. [Phase 10: Gap Assessment Form Updates](#phase10)  
12. [Appendix: Quick Reference Sheets](#appendix)

---

## 📊 OVERVIEW & IMPLEMENTATION TIMELINE

### Current State Assessment

- ✅ **5 custom contact properties** already exist (gap\_category, lead\_score, month\_six\_client, priority\_level, recommended\_service)  
- ✅ Basic Gap Assessment integration working  
- ❌ No contact type classification  
- ❌ No discovery call tracking  
- ❌ No partnership management  
- ❌ Limited service engagement tracking

### Implementation Timeline (8 Weeks)

| Phase | Week | Focus | Properties to Create | Automations Needed |
| :---- | :---- | :---- | :---- | :---- |
| Phase 1 | Week 1 | Foundation & Classification | 4 critical properties | 1 workflow |
| Phase 2 | Week 2 | Assessment Enhancement | 9 assessment properties | 2 workflows |
| Phase 3 | Week 3 | Service Tracking | 6 service properties | 1 workflow |
| Phase 4 | Week 4 | Discovery & Consultation | 6 discovery properties | 2 workflows |
| Phase 5 | Weeks 5-6 | Partnership Management | 4 partnership properties | 1 workflow |
| Phase 6 | Weeks 5-6 | Company Properties | 4 company properties | 0 workflows |
| Phase 7 | Week 7 | Deal Pipeline Setup | Deal properties \+ stages | 3 workflows |
| Phase 8 | Week 8 | Marketing Integration | Lists, segments, tags | 2 workflows |

---

## 🎯 PHASE 1: FOUNDATION PROPERTIES (WEEK 1\)

**Priority: CRITICAL \- These enable all other work**

### Property 1.1: Contact Type

**WHERE TO CREATE:**

- Navigate to: **Settings** \> **Data Management** \> **Properties**  
- Click: **Create property**  
- Select object: **Contact**

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | Contact Type |
| **Property Internal Name** | contact\_type |
| **Object Type** | Contact |
| **Property Group** | Contact Information |
| **Description** | Primary relationship type with Aftermath Solutions. Used to segment communications and reporting. |
| **Field Type** | Dropdown select (Single-select) |
| **Display Order** | Display at top of Contact Information section |
| **Required Field?** | Yes (for new contacts created after implementation) |
| **Show on Forms?** | No (internal classification only) |

**DROPDOWN OPTIONS:**

```
Option 1: Client - Active
Option 2: Client - Past
Option 3: Prospect - Hot (A+)
Option 4: Prospect - Priority (A)
Option 5: Prospect - Nurture (B)
Option 6: Prospect - Archive (C)
Option 7: Partner - Strategic
Option 8: Partner - Referral Source
Option 9: Partner - Collaborative
Option 10: Subscriber - Info Only
Option 11: Vendor/Supplier
Option 12: Team/Staff
Option 13: Other
```

**CASCADING LOGIC:** None

**AUTOMATION TRIGGER:**

- When `lead_score` \>= 400 → Set to "Prospect \- Hot (A+)"  
- When `lead_score` 300-399 → Set to "Prospect \- Priority (A)"  
- When `lead_score` 200-299 → Set to "Prospect \- Nurture (B)"  
- When `lead_score` \< 200 → Set to "Prospect \- Archive (C)"

**REPORTING USE:**

- Primary segmentation for all contact lists  
- Filter for sales pipeline reports  
- Mailchimp audience segmentation

---

### Property 1.2: Marketing Consent

**WHERE TO CREATE:**

- Navigate to: **Settings** \> **Data Management** \> **Properties**  
- Click: **Create property**  
- Select object: **Contact**

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | Marketing Consent Status |
| **Property Internal Name** | marketing\_consent |
| **Object Type** | Contact |
| **Property Group** | Email Information |
| **Description** | Can this contact receive marketing communications? Required for GDPR/CAN-SPAM compliance. |
| **Field Type** | Dropdown select (Single-select) |
| **Display Order** | Below "Email" field |
| **Required Field?** | Yes |
| **Show on Forms?** | No (set via automation or manual review) |

**DROPDOWN OPTIONS:**

```
Option 1: Marketable - Explicit Consent (form opt-in, signed agreement)
Option 2: Marketable - Soft Opt-in (existing business relationship)
Option 3: Not Marketable - Opt-out (unsubscribed)
Option 4: Not Marketable - Never Consented (cold outreach, no permission)
Option 5: Not Marketable - Do Not Contact (explicit request)
```

**CASCADING LOGIC:**

- If set to "Not Marketable" (any option) → Automatically update HubSpot's native `hs_marketable_status` to "Non-marketing"  
- Sync with Mailchimp unsubscribe status

**AUTOMATION TRIGGER:**

- **Form submission with opt-in checkbox** → Set to "Marketable \- Explicit Consent"  
- **Assessment submission** → Set to "Marketable \- Soft Opt-in" (existing business interest)  
- **Manual LinkedIn outreach** → Default to "Not Marketable \- Never Consented" until they respond  
- **Email unsubscribe** → Set to "Not Marketable \- Opt-out"

**REPORTING USE:**

- Filter for all marketing email sends  
- Mailchimp sync  
- Compliance reporting

---

### Property 1.3: Relationship Origin

**WHERE TO CREATE:**

- Navigate to: **Settings** \> **Data Management** \> **Properties**  
- Click: **Create property**  
- Select object: **Contact**

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | How We Met |
| **Property Internal Name** | relationship\_origin |
| **Object Type** | Contact |
| **Property Group** | Contact Information |
| **Description** | Original source of this relationship. Used for attribution and ROI tracking. |
| **Field Type** | Dropdown select (Single-select) |
| **Display Order** | After "Contact Type" |
| **Required Field?** | No (but highly recommended) |
| **Show on Forms?** | No (set via automation) |

**DROPDOWN OPTIONS:**

```
Option 1: Gap Assessment
Option 2: LinkedIn Outreach - Josh
Option 3: LinkedIn Outreach - Sallie
Option 4: LinkedIn Outreach - Amy
Option 5: Partner Referral - OVC
Option 6: Partner Referral - NMVRC
Option 7: Partner Referral - Vibrant
Option 8: Partner Referral - Other
Option 9: Website Form Submission
Option 10: Speaking Engagement - Josh
Option 11: Speaking Engagement - Sallie
Option 12: Speaking Engagement - Amy
Option 13: Pulse Memorial Network
Option 14: Conference/Event
Option 15: Direct Inquiry (Email)
Option 16: Direct Inquiry (Phone)
Option 17: Other
```

**CASCADING LOGIC:** None

**AUTOMATION TRIGGER:**

- **Gap Assessment submission** → Set to "Gap Assessment"  
- **Website form** → Set to "Website Form Submission"  
- **Manual LinkedIn message** → Prompt user to select LinkedIn Outreach option  
- **Referral tracking parameter** in URL → Auto-set based on UTM source

**HIDDEN FIELD ON FORMS:** If you want to auto-populate this from web forms, add a hidden field:

- Field name: `relationship_origin`  
- Default value: "Website Form Submission"

**REPORTING USE:**

- Source attribution for closed deals  
- ROI by channel  
- Partner referral tracking

---

### Property 1.4: Organization Sector

**WHERE TO CREATE:**

- Navigate to: **Settings** \> **Data Management** \> **Properties**  
- Click: **Create property**  
- Select object: **Contact**

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | Organization Type |
| **Property Internal Name** | organization\_sector |
| **Object Type** | Contact |
| **Property Group** | Contact Information |
| **Description** | Type of organization this contact represents. Used for service customization and reporting. |
| **Field Type** | Dropdown select (Single-select) |
| **Display Order** | After "Company Name" |
| **Required Field?** | No |
| **Show on Forms?** | Yes (optional field on assessment form) |

**DROPDOWN OPTIONS:**

```
Option 1: Healthcare System
Option 2: Higher Education
Option 3: K-12 Education
Option 4: Government - Federal
Option 5: Government - State
Option 6: Government - Local
Option 7: Emergency Management
Option 8: Corporate/Enterprise
Option 9: First Responders
Option 10: Legal Services
Option 11: Human Services
Option 12: NGO/Nonprofit
Option 13: Faith-Based Organization
Option 14: Community Organization
Option 15: Other
```

**CASCADING LOGIC:** None

**AUTOMATION TRIGGER:**

- Captured directly from Gap Assessment form  
- Can be manually updated based on discovery call  
- May be enriched from Company data if available

**REPORTING USE:**

- Service customization (e.g., "K-12 Education" gets Campus Crisis Intensive recommendation)  
- Sector-specific marketing campaigns  
- Industry benchmarking

---

## 🔄 PHASE 1 MAKE.COM AUTOMATION

### Workflow 1.1: Contact Classification on Assessment Submission

**TRIGGER:** New Gap Assessment form submission

**WORKFLOW STEPS:**

1. **Webhook Trigger** \- Receive form data from Gap Assessment  
2. **HubSpot: Search Contacts** \- Check if contact exists by email  
3. **Router: New vs. Existing Contact**  
   - **Path A: New Contact**  
     - Create new contact  
     - Set `contact_type` based on `lead_score`  
     - Set `marketing_consent` \= "Marketable \- Soft Opt-in"  
     - Set `relationship_origin` \= "Gap Assessment"  
     - Set `organization_sector` from form data  
   - **Path B: Existing Contact**  
     - Update contact  
     - Update `contact_type` if `lead_score` changed  
     - Keep existing `marketing_consent` (don't override)  
     - Keep existing `relationship_origin` (don't override first touch)  
     - Update `organization_sector` if provided

**MAKE.COM MODULE CONFIGURATION:**

```json
{
  "scenario_name": "Aftermath - Contact Classification on Assessment",
  "trigger": {
    "module": "Webhook",
    "webhook_url": "[Generate in Make.com]",
    "method": "POST"
  },
  "modules": [
    {
      "module": "HubSpot: Search Contacts",
      "search_by": "email",
      "email_field": "{{webhook.email}}"
    },
    {
      "module": "Router",
      "routes": [
        {
          "name": "New Contact",
          "filter": "{{isEmpty(searchContacts.id)}}",
          "modules": [
            {
              "module": "HubSpot: Create Contact",
              "properties": {
                "email": "{{webhook.email}}",
                "firstname": "{{webhook.firstname}}",
                "lastname": "{{webhook.lastname}}",
                "contact_type": "{{if(webhook.lead_score >= 400, 'Prospect - Hot (A+)', if(webhook.lead_score >= 300, 'Prospect - Priority (A)', if(webhook.lead_score >= 200, 'Prospect - Nurture (B)', 'Prospect - Archive (C)')))}}",
                "marketing_consent": "Marketable - Soft Opt-in",
                "relationship_origin": "Gap Assessment",
                "organization_sector": "{{webhook.organization_sector}}",
                "lead_score": "{{webhook.lead_score}}"
              }
            }
          ]
        },
        {
          "name": "Existing Contact",
          "filter": "{{not(isEmpty(searchContacts.id))}}",
          "modules": [
            {
              "module": "HubSpot: Update Contact",
              "contact_id": "{{searchContacts.id}}",
              "properties": {
                "contact_type": "{{if(webhook.lead_score >= 400, 'Prospect - Hot (A+)', if(webhook.lead_score >= 300, 'Prospect - Priority (A)', if(webhook.lead_score >= 200, 'Prospect - Nurture (B)', 'Prospect - Archive (C)')))}}",
                "organization_sector": "{{webhook.organization_sector}}",
                "lead_score": "{{webhook.lead_score}}"
              }
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 🔬 PHASE 2: ASSESSMENT ENHANCEMENT (WEEK 2\)

**Priority: HIGH \- Improves lead qualification and service matching**

### Property 2.1: Assessment Completion Status

**WHERE TO CREATE:**

- Navigate to: **Settings** \> **Data Management** \> **Properties**  
- Click: **Create property**  
- Select object: **Contact**

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | Assessment Status |
| **Property Internal Name** | assessment\_completion\_status |
| **Object Type** | Contact |
| **Property Group** | Assessment Data |
| **Description** | Has this contact completed the Crisis Preparedness Gap Assessment? |
| **Field Type** | Dropdown select (Single-select) |
| **Display Order** | First in Assessment Data group |
| **Required Field?** | No |
| **Show on Forms?** | No (set via automation) |

**DROPDOWN OPTIONS:**

```
Option 1: Not Started
Option 2: In Progress (Abandoned)
Option 3: Completed
Option 4: Declined
```

**DEFAULT VALUE:** "Not Started"

**AUTOMATION TRIGGER:**

- **Contact created** → Default to "Not Started"  
- **Assessment link clicked** → Set to "In Progress"  
- **Assessment submitted** → Set to "Completed"  
- **Contact manually marks "not interested"** → Set to "Declined"

---

### Property 2.2-2.5: Individual Domain Scores

These 4 properties capture the individual domain scores from your Gap Assessment.

**PROPERTY 2.2: Preparedness Score**

| Field | Value |
| :---- | :---- |
| **Property Label** | Preparedness Score |
| **Property Internal Name** | assessment\_score\_preparedness |
| **Object Type** | Contact |
| **Property Group** | Assessment Data |
| **Description** | Score for preparedness domain (0-100). Measures crisis planning, training, and readiness. |
| **Field Type** | Number |
| **Number Format** | Unformatted number |
| **Display Order** | After Assessment Status |
| **Required Field?** | No |
| **Show on Forms?** | No (calculated from assessment) |

**CALCULATION:** Sum of preparedness questions / total possible × 100

---

**PROPERTY 2.3: Communication Score**

| Field | Value |
| :---- | :---- |
| **Property Label** | Communication Score |
| **Property Internal Name** | assessment\_score\_communication |
| **Object Type** | Contact |
| **Property Group** | Assessment Data |
| **Description** | Score for communication domain (0-100). Measures internal/external messaging and stakeholder management. |
| **Field Type** | Number |
| **Number Format** | Unformatted number |

**CALCULATION:** Sum of communication questions / total possible × 100

---

**PROPERTY 2.4: Capacity Score**

| Field | Value |
| :---- | :---- |
| **Property Label** | Capacity Score |
| **Property Internal Name** | assessment\_score\_capacity |
| **Object Type** | Contact |
| **Property Group** | Assessment Data |
| **Description** | Score for capacity domain (0-100). Measures staffing, resources, and infrastructure. |
| **Field Type** | Number |
| **Number Format** | Unformatted number |

**CALCULATION:** Sum of capacity questions / total possible × 100

---

**PROPERTY 2.5: Resilience Score**

| Field | Value |
| :---- | :---- |
| **Property Label** | Resilience Score |
| **Property Internal Name** | assessment\_score\_resilience |
| **Object Type** | Contact |
| **Property Group** | Assessment Data |
| **Description** | Score for resilience domain (0-100). Measures long-term recovery planning and organizational wellness. |
| **Field Type** | Number |
| **Number Format** | Unformatted number |

**CALCULATION:** Sum of resilience questions / total possible × 100

---

### Property 2.6: Assessment Total Score

**WHERE TO CREATE:** (Same process as above)

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | Total Assessment Score |
| **Property Internal Name** | assessment\_total\_score |
| **Object Type** | Contact |
| **Property Group** | Assessment Data |
| **Description** | Combined score from all domains (0-400). Used for lead scoring and prioritization. |
| **Field Type** | Number |
| **Number Format** | Unformatted number |
| **Display Order** | After individual domain scores |
| **Required Field?** | No |
| **Show on Forms?** | No (calculated) |

**CALCULATION:**

```
assessment_score_preparedness + 
assessment_score_communication + 
assessment_score_capacity + 
assessment_score_resilience
```

**AUTOMATION:** This should be calculated in Make.com before sending to HubSpot

---

### Property 2.7: Assessment Completion Date

| Field | Value |
| :---- | :---- |
| **Property Label** | Assessment Completion Date |
| **Property Internal Name** | assessment\_completion\_date |
| **Object Type** | Contact |
| **Property Group** | Assessment Data |
| **Description** | When was the assessment completed? Used for reporting and follow-up timing. |
| **Field Type** | Date picker |
| **Display Order** | After Total Assessment Score |
| **Required Field?** | No |
| **Show on Forms?** | No (set via automation) |

**AUTOMATION TRIGGER:**

- Set to today's date when `assessment_completion_status` \= "Completed"

---

### Property 2.8: Assessment Top Gap (Enhanced)

**WHERE TO CREATE:** (Same process)

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | Primary Gap Identified |
| **Property Internal Name** | assessment\_top\_gap |
| **Object Type** | Contact |
| **Property Group** | Assessment Data |
| **Description** | The biggest gap identified in their organization. More specific than gap\_category. |
| **Field Type** | Dropdown select (Single-select) |
| **Display Order** | After Assessment Completion Date |
| **Required Field?** | No |
| **Show on Forms?** | No (calculated from assessment) |

**DROPDOWN OPTIONS:**

```
--- PREPAREDNESS GAPS ---
Option 1: Preparedness - Crisis Plan Missing
Option 2: Preparedness - Plan Not Tested
Option 3: Preparedness - Leadership Not Trained
Option 4: Preparedness - Staff Not Trained

--- COMMUNICATION GAPS ---
Option 5: Communication - Internal Breakdown
Option 6: Communication - External Messaging Weak
Option 7: Communication - Stakeholder Management
Option 8: Communication - Media Relations

--- CAPACITY GAPS ---
Option 9: Capacity - Insufficient Staffing
Option 10: Capacity - Inadequate Resources
Option 11: Capacity - Funding Constraints
Option 12: Capacity - Infrastructure Gaps

--- RESILIENCE GAPS ---
Option 13: Resilience - No Long-Term Plan
Option 14: Resilience - Trauma Response Missing
Option 15: Resilience - Staff Wellness Neglected
Option 16: Resilience - Organizational Culture Issues
```

**LOGIC:** Determined by lowest individual domain score and specific question responses

---

### Property 2.9-2.10: Crisis Context

**PROPERTY 2.9: Recent Crisis Experience**

| Field | Value |
| :---- | :---- |
| **Property Label** | Recent Crisis Experience |
| **Property Internal Name** | recent\_crisis\_experience |
| **Object Type** | Contact |
| **Property Group** | Assessment Data |
| **Description** | Have they experienced a recent crisis? Used for urgency assessment. |
| **Field Type** | Dropdown select (Single-select) |

**DROPDOWN OPTIONS:**

```
Option 1: Currently in Crisis
Option 2: Within Last 6 Months
Option 3: 6-12 Months Ago
Option 4: 1-2 Years Ago
Option 5: 2+ Years Ago
Option 6: No Recent Crisis
Option 7: Preparing Proactively
```

**CAPTURED FROM:** Gap Assessment question: "When did your organization experience its most recent crisis or traumatic event?"

---

**PROPERTY 2.10: Crisis Type Experienced**

| Field | Value |
| :---- | :---- |
| **Property Label** | Type of Crisis |
| **Property Internal Name** | crisis\_type\_experienced |
| **Object Type** | Contact |
| **Property Group** | Assessment Data |
| **Description** | What type(s) of crisis have they experienced? Used for service customization. |
| **Field Type** | Checkbox (Multiple-select) |

**CHECKBOX OPTIONS:**

```
Option 1: Mass Violence - Shooting
Option 2: Mass Violence - Other
Option 3: Natural Disaster
Option 4: Workplace Violence
Option 5: Sudden Death/Loss
Option 6: Cyberattack
Option 7: Public Relations Crisis
Option 8: Organizational Scandal
Option 9: Health Emergency/Pandemic
Option 10: Accident/Tragedy
Option 11: Other
```

**CAPTURED FROM:** Gap Assessment question: "What type of crisis did your organization experience? (Check all that apply)"

---

## 🔄 PHASE 2 MAKE.COM AUTOMATION

### Workflow 2.1: Enhanced Assessment Data Population

**TRIGGER:** New Gap Assessment form submission

**WORKFLOW STEPS:**

1. **Webhook Trigger** \- Receive comprehensive form data  
2. **Data Transformation** \- Calculate domain scores  
   - Preparedness: Questions 1-10 → Sum → Divide by 10 → Multiply by 100  
   - Communication: Questions 11-20 → Sum → Divide by 10 → Multiply by 100  
   - Capacity: Questions 21-30 → Sum → Divide by 10 → Multiply by 100  
   - Resilience: Questions 31-40 → Sum → Divide by 10 → Multiply by 100  
   - Total Score: Sum all 4 domains  
3. **Logic: Determine Top Gap**  
   - Find lowest domain score  
   - Within that domain, find lowest individual question  
   - Map to specific `assessment_top_gap` option  
4. **HubSpot: Update Contact**  
   - Set all assessment properties  
   - Set `assessment_completion_status` \= "Completed"  
   - Set `assessment_completion_date` \= Today

**MAKE.COM PSEUDO-CODE:**

```javascript
// Step 1: Calculate Domain Scores
preparedness_score = (Q1 + Q2 + Q3 + ... + Q10) / 10 * 100;
communication_score = (Q11 + Q12 + Q13 + ... + Q20) / 10 * 100;
capacity_score = (Q21 + Q22 + Q23 + ... + Q30) / 10 * 100;
resilience_score = (Q31 + Q32 + Q33 + ... + Q40) / 10 * 100;
total_score = preparedness_score + communication_score + capacity_score + resilience_score;

// Step 2: Determine Top Gap
lowest_domain = min(preparedness_score, communication_score, capacity_score, resilience_score);

if (lowest_domain == preparedness_score) {
  if (Q1 == lowest) { top_gap = "Preparedness - Crisis Plan Missing"; }
  else if (Q2 == lowest) { top_gap = "Preparedness - Plan Not Tested"; }
  // ... etc
}
else if (lowest_domain == communication_score) {
  // Similar logic for communication questions
}
// ... etc

// Step 3: Update HubSpot
update_hubspot_contact({
  assessment_score_preparedness: preparedness_score,
  assessment_score_communication: communication_score,
  assessment_score_capacity: capacity_score,
  assessment_score_resilience: resilience_score,
  assessment_total_score: total_score,
  assessment_completion_status: "Completed",
  assessment_completion_date: today(),
  assessment_top_gap: top_gap,
  recent_crisis_experience: webhook.crisis_timing,
  crisis_type_experienced: webhook.crisis_types // Checkbox values
});
```

---

## 💼 PHASE 3: SERVICE TRACKING (WEEK 3\)

**Priority: HIGH \- Enables service matching and sales process**

### Property 3.1: Primary Service Interest

**WHERE TO CREATE:**

- Navigate to: **Settings** \> **Data Management** \> **Properties**  
- Click: **Create property**  
- Select object: **Contact**

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | Primary Service Interest |
| **Property Internal Name** | primary\_service\_interest |
| **Object Type** | Contact |
| **Property Group** | Service Engagement |
| **Description** | Which Aftermath Solutions service tier are they interested in? |
| **Field Type** | Checkbox (Multiple-select) |
| **Display Order** | First in Service Engagement group |
| **Required Field?** | No |
| **Show on Forms?** | Yes (optional on consultation form) |

**CHECKBOX OPTIONS:**

```
Option 1: Tier 1: Foundational Workshops
Option 2: Tier 2: Strategic Intensives
Option 3: Tier 3: Full Consulting
Option 4: Tier 4: Partnership Retainer
Option 5: Crisis Response (Rapid Deployment)
Option 6: Custom/Undecided
```

**AUTOMATION TRIGGER:**

- Initially set from `recommended_service` in assessment  
- Updated during discovery call  
- Can self-select on website consultation form

---

### Property 3.2: Specific Service Line

**WHERE TO CREATE:** (Same process)

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | Specific Services |
| **Property Internal Name** | specific\_service\_line |
| **Object Type** | Contact |
| **Property Group** | Service Engagement |
| **Description** | Detailed service offerings they're considering. Used for proposal creation. |
| **Field Type** | Checkbox (Multiple-select) |
| **Display Order** | After Primary Service Interest |
| **Required Field?** | No |
| **Show on Forms?** | Yes (if selecting services on form) |

**CHECKBOX OPTIONS (Organized by Tier):**

```
--- TIER 1: WORKSHOPS ---
Option 1: Organizational Trauma & Grief Literacy
Option 2: Traumatic Stress Psychoeducation
Option 3: Frameworks for Long-Term Healing
Option 4: Youth & Family Support

--- TIER 2: INTENSIVES ---
Option 5: Crisis Preparedness Assessment & Implementation
Option 6: Leadership Resilience Intensive
Option 7: The Re-Treatment Intensive
Option 8: Trauma-Informed Storytelling Lab
Option 9: Cognitive + Behavioral Integration
Option 10: Navigating the Variables (Advanced)
Option 11: Clinician Resilience & Moral Injury
Option 12: Campus Crisis & Educator Wellness
Option 13: Executive Coaching

--- TIER 3: CONSULTING ---
Option 14: Crisis Recovery Consulting
Option 15: Organizational Resilience Assessment
Option 16: Crisis Communications Advisory
Option 17: Peer Support Program Design
Option 18: Custom Framework Development

--- TIER 4: RETAINERS ---
Option 19: Executive Advisory Retainer
Option 20: Implementation Support Retainer
```

**AUTOMATION:** Can be pre-populated based on `assessment_top_gap`:

- If `assessment_top_gap` \= "Preparedness \- Crisis Plan Missing" → Suggest "Crisis Preparedness Assessment & Implementation"  
- If `assessment_top_gap` \= "Resilience \- Staff Wellness Neglected" → Suggest "Clinician Resilience & Moral Injury"  
- etc.

---

### Property 3.3: Engagement Status

**WHERE TO CREATE:** (Same process)

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | Current Engagement Status |
| **Property Internal Name** | engagement\_status |
| **Object Type** | Contact |
| **Property Group** | Service Engagement |
| **Description** | Where are they in our process? Used for pipeline management and follow-up. |
| **Field Type** | Dropdown select (Single-select) |
| **Display Order** | After Specific Service Line |
| **Required Field?** | No |
| **Show on Forms?** | No (set via automation or manual) |

**DROPDOWN OPTIONS:**

```
Option 1: New Inquiry
Option 2: Assessment Submitted
Option 3: Discovery Call Scheduled
Option 4: Discovery Call Completed
Option 5: Proposal Sent
Option 6: Contract Negotiation
Option 7: Contract Signed
Option 8: Service Delivery - Active
Option 9: Service Delivery - On Hold
Option 10: Service Delivery - Completed
Option 11: Post-Service Follow-up
Option 12: Inactive - No Response
Option 13: Disqualified
```

**AUTOMATION TRIGGER:**

- **New contact created** → "New Inquiry"  
- **Assessment submitted** → "Assessment Submitted"  
- **Discovery call booked** → "Discovery Call Scheduled"  
- **Discovery call task completed** → "Discovery Call Completed"  
- **Quote/proposal created** → "Proposal Sent"  
- **Deal stage \= "Contract Sent"** → "Contract Negotiation"  
- **Deal closed-won** → "Contract Signed"

**WORKFLOW LOGIC:** This should mirror your Deal pipeline stages

---

### Property 3.4: Budget Range

**WHERE TO CREATE:** (Same process)

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | Budget Range |
| **Property Internal Name** | budget\_range |
| **Object Type** | Contact |
| **Property Group** | Service Engagement |
| **Description** | Estimated budget capacity. Helps qualify leads and size proposals. |
| **Field Type** | Dropdown select (Single-select) |
| **Display Order** | After Engagement Status |
| **Required Field?** | No |
| **Show on Forms?** | Yes (optional on consultation form) |

**DROPDOWN OPTIONS:**

```
Option 1: Under $5,000
Option 2: $5,000 - $10,000
Option 3: $10,000 - $25,000
Option 4: $25,000 - $50,000
Option 5: $50,000 - $100,000
Option 6: $100,000 - $250,000
Option 7: $250,000+
Option 8: Unknown
Option 9: Grant-Funded (TBD)
```

**USAGE IN LEAD SCORING:**

- Budget \>= $50K → Add 50 points to lead\_score  
- Budget $25K-50K → Add 25 points  
- Budget \< $25K → No points added  
- Grant-Funded → Add 75 points (high likelihood if approved)

---

### Property 3.5: Decision Timeline

**WHERE TO CREATE:** (Same process)

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | Decision Timeline |
| **Property Internal Name** | decision\_timeline |
| **Object Type** | Contact |
| **Property Group** | Service Engagement |
| **Description** | When do they need to make a decision? Used for follow-up prioritization. |
| **Field Type** | Dropdown select (Single-select) |
| **Display Order** | After Budget Range |
| **Required Field?** | No |
| **Show on Forms?** | Yes (optional on consultation form) |

**DROPDOWN OPTIONS:**

```
Option 1: Immediate/Urgent (< 2 weeks)
Option 2: This Quarter
Option 3: Next Quarter
Option 4: This Fiscal Year
Option 5: Next Fiscal Year
Option 6: Exploring/No Timeline
```

**USAGE IN LEAD SCORING:**

- Immediate/Urgent → Add 100 points to lead\_score  
- This Quarter → Add 50 points  
- Next Quarter → Add 25 points  
- Exploring → No points

**AUTOMATION:**

- If `recent_crisis_experience` \= "Currently in Crisis" → Auto-set to "Immediate/Urgent"

---

## 🔄 PHASE 3 MAKE.COM AUTOMATION

### Workflow 3.1: Service Matching on Assessment Completion

**TRIGGER:** Assessment completed (status \= "Completed")

**WORKFLOW STEPS:**

1. **HubSpot: Get Contact** \- Retrieve updated assessment data  
2. **Service Matching Logic** \- Based on top gap and scores  
3. **HubSpot: Update Contact** \- Set service recommendations

**MATCHING LOGIC:**

```javascript
// Service Matching Algorithm
if (assessment_top_gap.includes("Preparedness")) {
  primary_service_interest = "Tier 2: Strategic Intensives";
  specific_service_line = "Crisis Preparedness Assessment & Implementation";
}
else if (assessment_top_gap.includes("Resilience - Staff Wellness")) {
  primary_service_interest = "Tier 2: Strategic Intensives";
  specific_service_line = "Clinician Resilience & Moral Injury";
}
else if (organization_sector == "K-12 Education" || organization_sector == "Higher Education") {
  specific_service_line = "Campus Crisis & Educator Wellness";
}
else if (assessment_top_gap.includes("Communication")) {
  specific_service_line = "Crisis Communications Advisory";
}
else if (assessment_total_score < 150) {
  // Very low score = need comprehensive help
  primary_service_interest = "Tier 3: Full Consulting";
  specific_service_line = "Crisis Recovery Consulting";
}

// If currently in crisis → flag for rapid response
if (recent_crisis_experience == "Currently in Crisis") {
  primary_service_interest = "Crisis Response (Rapid Deployment)";
  decision_timeline = "Immediate/Urgent";
}
```

---

## 📞 PHASE 4: DISCOVERY & CONSULTATION TRACKING (WEEK 4\)

**Priority: HIGH \- Your critical conversion point**

### Property 4.1: Discovery Call Status

**WHERE TO CREATE:**

- Navigate to: **Settings** \> **Data Management** \> **Properties**  
- Click: **Create property**  
- Select object: **Contact**

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | Discovery Call Status |
| **Property Internal Name** | discovery\_call\_status |
| **Object Type** | Contact |
| **Property Group** | Discovery & Consultation |
| **Description** | Status of free consultation call. Most critical conversion point. |
| **Field Type** | Dropdown select (Single-select) |
| **Display Order** | First in Discovery & Consultation group |
| **Required Field?** | No |
| **Show on Forms?** | No (set via automation) |

**DROPDOWN OPTIONS:**

```
Option 1: Not Scheduled
Option 2: Scheduled
Option 3: Completed
Option 4: Rescheduled
Option 5: No Show
Option 6: Declined
```

**AUTOMATION TRIGGER:**

- **Contact created** → Default "Not Scheduled"  
- **Calendly/Meeting link booked** → "Scheduled"  
- **Meeting task marked complete** → "Completed"  
- **Meeting rescheduled** → "Rescheduled"  
- **Meeting time passed with no completion** → "No Show"

**REPORTING:**

- **Show rate:** (Completed \+ Rescheduled) / (Scheduled) × 100%  
- **Conversion rate:** Deals created / Completed calls × 100%

---

### Property 4.2: Discovery Call Date

**WHERE TO CREATE:** (Same process)

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | Discovery Call Date |
| **Property Internal Name** | discovery\_call\_date |
| **Object Type** | Contact |
| **Property Group** | Discovery & Consultation |
| **Description** | When is/was the discovery call? Used for reporting and follow-up. |
| **Field Type** | Date picker |
| **Display Order** | After Discovery Call Status |
| **Required Field?** | No |
| **Show on Forms?** | No (synced from calendar) |

**AUTOMATION:** Pulled from Calendly webhook or HubSpot meeting scheduling

---

### Property 4.3: Discovery Call Notes URL

**WHERE TO CREATE:** (Same process)

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | Discovery Call Notes Link |
| **Property Internal Name** | discovery\_call\_notes\_url |
| **Object Type** | Contact |
| **Property Group** | Discovery & Consultation |
| **Description** | Link to Google Doc with consultation notes and recommendations. |
| **Field Type** | Single-line text |
| **Display Order** | After Discovery Call Date |
| **Required Field?** | No |
| **Show on Forms?** | No |

**AUTOMATION:** Generated by Make.com when call is scheduled (see Workflow 4.1 below)

**FORMAT:** `https://docs.google.com/document/d/[DOC_ID]/edit`

---

### Property 4.4: Discovery Call Attendees

**WHERE TO CREATE:** (Same process)

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | Discovery Call Attendees |
| **Property Internal Name** | discovery\_call\_attendees |
| **Object Type** | Contact |
| **Property Group** | Discovery & Consultation |
| **Description** | Who attended from their organization? Used to identify decision makers. |
| **Field Type** | Multi-line text |
| **Display Order** | After Discovery Call Notes URL |
| **Required Field?** | No |
| **Show on Forms?** | No |

**FORMAT:**

```
- [Name], [Title]
- [Name], [Title]
```

**USAGE:** Manually filled in during or after call

---

### Property 4.5: Key Discovery Insights

**WHERE TO CREATE:** (Same process)

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | Key Insights from Discovery |
| **Property Internal Name** | discovery\_key\_insights |
| **Object Type** | Contact |
| **Property Group** | Discovery & Consultation |
| **Description** | Main takeaways from consultation call. Used for proposal creation. |
| **Field Type** | Multi-line text |
| **Display Order** | After Discovery Call Attendees |
| **Required Field?** | No |
| **Show on Forms?** | No |

**SUGGESTED FORMAT:**

```
NEEDS:
- [Specific need 1]
- [Specific need 2]

CONCERNS:
- [Concern 1]

DECISION PROCESS:
- [Who decides, timeline, approval needed]

NEXT STEPS:
- [Action items]
```

---

### Property 4.6: Barriers to Engagement

**WHERE TO CREATE:** (Same process)

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | Barriers to Engagement |
| **Property Internal Name** | barriers\_to\_engagement |
| **Object Type** | Contact |
| **Property Group** | Discovery & Consultation |
| **Description** | What might prevent them from moving forward? Used for objection handling. |
| **Field Type** | Checkbox (Multiple-select) |
| **Display Order** | After Key Discovery Insights |
| **Required Field?** | No |
| **Show on Forms?** | No |

**CHECKBOX OPTIONS:**

```
Option 1: Budget Constraints
Option 2: Timeline Pressure
Option 3: Internal Buy-in Needed
Option 4: Decision Maker Not Involved Yet
Option 5: Competing Priorities
Option 6: Need Board/Executive Approval
Option 7: Grant Funding Pending
Option 8: Organizational Politics
Option 9: Change Fatigue
Option 10: Other Vendor Under Consideration
Option 11: Not Ready Yet
Option 12: None Identified
```

**USAGE:** Helps team prepare follow-up strategy and address objections in proposal

---

## 🔄 PHASE 4 MAKE.COM AUTOMATION

### Workflow 4.1: Discovery Call Prep Automation

**TRIGGER:** Discovery call scheduled (Calendly webhook or HubSpot meeting created)

**WORKFLOW STEPS:**

1. **Webhook/Trigger** \- Meeting scheduled  
2. **HubSpot: Get Contact** \- Retrieve full contact data  
3. **Google Docs: Create from Template** \- Generate prep doc  
4. **HubSpot: Update Contact** \- Store doc URL  
5. **Gmail: Send Prep Email** \- Send to team  
6. **Airtable: Add to Upcoming Consultations** \- Track in Airtable

**GOOGLE DOC TEMPLATE STRUCTURE:**

```
===========================================
AFTERMATH SOLUTIONS - DISCOVERY CALL PREP
===========================================

CONTACT INFORMATION:
- Name: {{firstname}} {{lastname}}
- Email: {{email}}
- Company: {{company}}
- Title: {{jobtitle}}
- Organization Type: {{organization_sector}}

RELATIONSHIP CONTEXT:
- How We Met: {{relationship_origin}}
- Contact Type: {{contact_type}}
- Lead Score: {{lead_score}} ({{priority_level}})

ASSESSMENT RESULTS:
- Completed: {{assessment_completion_date}}
- Total Score: {{assessment_total_score}} / 400
- Primary Gap: {{assessment_top_gap}}

Domain Scores:
- Preparedness: {{assessment_score_preparedness}} / 100
- Communication: {{assessment_score_communication}} / 100
- Capacity: {{assessment_score_capacity}} / 100
- Resilience: {{assessment_score_resilience}} / 100

CRISIS CONTEXT:
- Recent Crisis: {{recent_crisis_experience}}
- Crisis Type: {{crisis_type_experienced}}

SERVICE INTEREST:
- Tier: {{primary_service_interest}}
- Specific Services: {{specific_service_line}}
- Budget Range: {{budget_range}}
- Timeline: {{decision_timeline}}

RECOMMENDED TALKING POINTS:
[Auto-generated based on top gap]
- For "Preparedness" gap: Discuss your Crisis Preparedness Assessment & Implementation intensive
- For "Resilience" gap: Focus on long-term recovery and The Re-Treatment workshop
- etc.

===========================================
CALL NOTES
===========================================

ATTENDEES:
-
-

KEY INSIGHTS:
-
-

BARRIERS IDENTIFIED:
-
-

RECOMMENDED NEXT STEPS:
-
-

PROPOSAL AMOUNT DISCUSSED:
$

FOLLOW-UP ACTIONS:
- [ ] Send proposal by [date]
- [ ] Schedule follow-up call
- [ ] Connect with [specific partner]
```

**MAKE.COM MODULE STRUCTURE:**

```json
{
  "scenario_name": "Aftermath - Discovery Call Prep",
  "trigger": {
    "module": "Calendly Webhook" OR "HubSpot Watch Meetings"
  },
  "modules": [
    {
      "module": "HubSpot: Get Contact",
      "contact_email": "{{trigger.invitee_email}}"
    },
    {
      "module": "Google Docs: Create Document from Template",
      "template_id": "[YOUR_TEMPLATE_ID]",
      "placeholders": {
        "firstname": "{{getContact.firstname}}",
        "lastname": "{{getContact.lastname}}",
        "email": "{{getContact.email}}",
        "company": "{{getContact.company}}",
        "organization_sector": "{{getContact.organization_sector}}",
        // ... all other fields
      }
    },
    {
      "module": "HubSpot: Update Contact",
      "contact_id": "{{getContact.id}}",
      "properties": {
        "discovery_call_status": "Scheduled",
        "discovery_call_date": "{{trigger.event_start_time}}",
        "discovery_call_notes_url": "{{createDoc.documentUrl}}",
        "engagement_status": "Discovery Call Scheduled"
      }
    },
    {
      "module": "Gmail: Send Email",
      "to": "jgarcia@theaftermathsolutions.com, slynch@theaftermathsolutions.com, aoneill@theaftermathsolutions.com",
      "subject": "Discovery Call Scheduled: {{getContact.firstname}} {{getContact.lastname}} - {{trigger.event_start_time}}",
      "body": "Discovery call scheduled!\n\nContact: {{getContact.firstname}} {{getContact.lastname}}\nCompany: {{getContact.company}}\nDate/Time: {{trigger.event_start_time}}\n\nPrep Doc: {{createDoc.documentUrl}}\n\nLead Score: {{getContact.lead_score}}\nTop Gap: {{getContact.assessment_top_gap}}"
    }
  ]
}
```

---

### Workflow 4.2: Post-Discovery Follow-Up

**TRIGGER:** Discovery call marked complete (manual or automated after call ends)

**WORKFLOW STEPS:**

1. **Trigger** \- Meeting marked complete or `discovery_call_status` \= "Completed"  
2. **HubSpot: Update Contact** \- Change engagement status  
3. **HubSpot: Create Task** \- Remind to send proposal within 48 hours  
4. **Gmail: Send Thank You** \- Automated thank-you email

---

## 🤝 PHASE 5: PARTNERSHIP MANAGEMENT (WEEKS 5-6)

### Property 5.1: Partnership Type

**WHERE TO CREATE:**

- Navigate to: **Settings** \> **Data Management** \> **Properties**  
- Click: **Create property**  
- Select object: **Contact**

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | Partnership Type |
| **Property Internal Name** | partnership\_type |
| **Object Type** | Contact |
| **Property Group** | Partnership Data |
| **Description** | Type of partnership relationship. Used for segmentation and reporting. |
| **Field Type** | Checkbox (Multiple-select) |
| **Display Order** | First in Partnership Data group |
| **Required Field?** | No (only for partners) |
| **Show on Forms?** | No |

**CHECKBOX OPTIONS:**

```
Option 1: Strategic Alliance
Option 2: Referral Partner - Sends Us Leads
Option 3: Referral Partner - We Send Leads
Option 4: Co-Marketing Partner
Option 5: Co-Delivery Partner
Option 6: Research Collaboration
Option 7: Grant Partnership
Option 8: Advisory Relationship
Option 9: Vendor/Supplier
```

**CONDITIONAL DISPLAY:** Only show if `contact_type` includes "Partner"

---

### Property 5.2: Partnership Organizations

**WHERE TO CREATE:** (Same process)

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | Connected to Key Partners |
| **Property Internal Name** | partnership\_organizations |
| **Object Type** | Contact |
| **Property Group** | Partnership Data |
| **Description** | Which strategic partner organizations are they connected to? |
| **Field Type** | Checkbox (Multiple-select) |

**CHECKBOX OPTIONS:**

```
Option 1: Office for Victims of Crime (OVC)
Option 2: National Mass Violence Resource Center (NMVRC)
Option 3: Vibrant Emotional Health
Option 4: Tuesday's Children
Option 5: American Red Cross
Option 6: EU Center for Victims of Terrorism
Option 7: UN Office of Counterterrorism
Option 8: Pulse Memorial Committee
Option 9: STOP Organization
Option 10: Colorado Resiliency Life Center
Option 11: Emergency Management Assistance Compact (EMAC)
Option 12: International Association of Emergency Managers (IAEM)
Option 13: National Emergency Management Association (NEMA)
Option 14: Other
```

**USAGE:** Cross-referencing contacts who know the same partners

---

### Property 5.3: Partnership Status

**WHERE TO CREATE:** (Same process)

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | Partnership Status |
| **Property Internal Name** | partnership\_status |
| **Object Type** | Contact |
| **Property Group** | Partnership Data |
| **Description** | Current state of partnership relationship. |
| **Field Type** | Dropdown select (Single-select) |

**DROPDOWN OPTIONS:**

```
Option 1: Prospective
Option 2: In Discussion
Option 3: MOU Signed
Option 4: Active - Low Engagement
Option 5: Active - Regular Engagement
Option 6: Active - High Engagement
Option 7: On Hold
Option 8: Inactive
Option 9: Ended
```

---

### Property 5.4: Referral Agreement

**WHERE TO CREATE:** (Same process)

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | Referral Agreement |
| **Property Internal Name** | referral\_agreement |
| **Object Type** | Contact |
| **Property Group** | Partnership Data |
| **Description** | Do we have a formal referral agreement? |
| **Field Type** | Dropdown select (Single-select) |

**DROPDOWN OPTIONS:**

```
Option 1: Yes - Formal Agreement
Option 2: Yes - Informal Agreement
Option 3: In Discussion
Option 4: No
Option 5: Not Applicable
```

---

## 🏢 PHASE 6: COMPANY PROPERTIES (WEEKS 5-6)

These properties are created on the **COMPANY** object, not Contact.

### Property 6.1: Organization Crisis Readiness Level

**WHERE TO CREATE:**

- Navigate to: **Settings** \> **Data Management** \> **Properties**  
- Click: **Create property**  
- Select object: **COMPANY** ⚠️ (not Contact)

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | Crisis Readiness Level |
| **Property Internal Name** | org\_crisis\_readiness\_level |
| **Object Type** | COMPANY |
| **Property Group** | Company Information |
| **Description** | Overall organizational preparedness based on aggregated contact assessments. |
| **Field Type** | Dropdown select (Single-select) |

**DROPDOWN OPTIONS:**

```
Option 1: Level 1 - Critical Gaps (Score 0-100)
Option 2: Level 2 - Significant Gaps (Score 101-200)
Option 3: Level 3 - Moderate Readiness (Score 201-300)
Option 4: Level 4 - Strong Readiness (Score 301-350)
Option 5: Level 5 - Exemplary Readiness (Score 351-400)
Option 6: Not Assessed
```

**CALCULATION:** Average of all associated contacts' `assessment_total_score`

---

### Property 6.2: Previous Trauma Experience

**WHERE TO CREATE:** (Same process, COMPANY object)

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | Previous Trauma Experience |
| **Property Internal Name** | previous\_trauma\_experience |
| **Object Type** | COMPANY |
| **Property Group** | Company Information |
| **Description** | Has this organization experienced significant trauma before? |
| **Field Type** | Dropdown select (Single-select) |

**DROPDOWN OPTIONS:**

```
Option 1: Yes - Multiple Incidents
Option 2: Yes - Single Incident
Option 3: Minor Incidents Only
Option 4: No Previous Experience
Option 5: Unknown
```

---

### Property 6.3: Organizational Size

**WHERE TO CREATE:** (Same process, COMPANY object)

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | Organizational Size |
| **Property Internal Name** | organizational\_size |
| **Object Type** | COMPANY |
| **Property Group** | Company Information |
| **Description** | How large is the organization? Used for pricing and service scoping. |
| **Field Type** | Dropdown select (Single-select) |

**DROPDOWN OPTIONS:**

```
Option 1: Micro (1-10 people)
Option 2: Small (11-50 people)
Option 3: Medium (51-250 people)
Option 4: Large (251-1000 people)
Option 5: Enterprise (1000+ people)
```

---

### Property 6.4: Geographic Reach

**WHERE TO CREATE:** (Same process, COMPANY object)

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | Geographic Reach |
| **Property Internal Name** | geographic\_reach |
| **Object Type** | COMPANY |
| **Property Group** | Company Information |
| **Description** | Where does this organization operate? |
| **Field Type** | Checkbox (Multiple-select) |

**CHECKBOX OPTIONS:**

```
Option 1: Local/County
Option 2: Regional/Multi-County
Option 3: Statewide
Option 4: Multi-State
Option 5: National
Option 6: International
```

---

## 💰 PHASE 7: DEAL PIPELINE CONFIGURATION

### Deal Pipeline: Aftermath Solutions \- Consulting Services

**WHERE TO CREATE:**

- Navigate to: **Settings** \> **Objects** \> **Deals**  
- Click: **Pipelines** tab  
- Click: **Create pipeline**

**PIPELINE SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Pipeline Name** | Aftermath Solutions \- Consulting Services |
| **Pipeline Internal Name** | aftermath\_consulting |
| **Currency** | USD |
| **Deal Stages** | 8 stages (see below) |

---

### Deal Stage 1: New Inquiry

| Field | Value |
| :---- | :---- |
| **Stage Name** | New Inquiry |
| **Internal Name** | new\_inquiry |
| **Probability** | 0% |
| **Stage Type** | Open |
| **Description** | Contact received via form, assessment, or outreach. Initial qualification needed. |

**ENTRY CRITERIA:** Contact submitted assessment OR filled out contact form

**EXIT CRITERIA:** Assessment reviewed and contact type assigned

**AUTOMATION:**

- Create deal automatically when `contact_type` \= Prospect (any level)  
- Deal owner \= Contact owner  
- Deal amount \= blank (to be determined)

---

### Deal Stage 2: Assessment Submitted

| Field | Value |
| :---- | :---- |
| **Stage Name** | Assessment Submitted |
| **Internal Name** | assessment\_submitted |
| **Probability** | 10% |
| **Stage Type** | Open |
| **Description** | Gap Assessment completed. Lead scoring applied. Recommended service identified. |

**ENTRY CRITERIA:** `assessment_completion_status` \= "Completed"

**EXIT CRITERIA:** Discovery call scheduled

**AUTOMATION:**

- Move deal to this stage when assessment complete  
- Set deal amount based on `primary_service_interest`:  
  - Tier 1 Workshop: $5,000-10,000  
  - Tier 2 Intensive: $15,000-35,000  
  - Tier 3 Consulting: $40,000-100,000  
  - Tier 4 Retainer: $100,000+

---

### Deal Stage 3: Discovery Scheduled

| Field | Value |
| :---- | :---- |
| **Stage Name** | Discovery Scheduled |
| **Internal Name** | discovery\_scheduled |
| **Probability** | 25% |
| **Stage Type** | Open |
| **Description** | Free consultation call booked. Calendar hold in place. |

**ENTRY CRITERIA:** `discovery_call_status` \= "Scheduled"

**EXIT CRITERIA:** Call completed

**AUTOMATION:**

- Move deal automatically when discovery call booked  
- Create prep doc (via Make.com)  
- Set task to prepare for call 24 hours before

---

### Deal Stage 4: Discovery Completed

| Field | Value |
| :---- | :---- |
| **Stage Name** | Discovery Completed |
| **Internal Name** | discovery\_completed |
| **Probability** | 40% |
| **Stage Type** | Open |
| **Description** | Consultation call happened. Key insights documented. Proposal preparation underway. |

**ENTRY CRITERIA:** `discovery_call_status` \= "Completed"

**EXIT CRITERIA:** Proposal sent

**AUTOMATION:**

- Move deal automatically when call completed  
- Create task: "Send proposal within 48 hours"  
- Send thank-you email to contact

---

### Deal Stage 5: Proposal Sent

| Field | Value |
| :---- | :---- |
| **Stage Name** | Proposal Sent |
| **Internal Name** | proposal\_sent |
| **Probability** | 60% |
| **Stage Type** | Open |
| **Description** | Custom proposal delivered. Pricing and scope confirmed. Awaiting decision. |

**ENTRY CRITERIA:** Quote created in HubSpot OR proposal doc sent

**EXIT CRITERIA:** Contact responds (moves to negotiation or closed)

**AUTOMATION:**

- Move deal when quote created  
- Set follow-up task for 3 days out  
- Set follow-up task for 7 days out (if no response)

---

### Deal Stage 6: Contract Negotiation

| Field | Value |
| :---- | :---- |
| **Stage Name** | Contract Negotiation |
| **Internal Name** | contract\_negotiation |
| **Probability** | 75% |
| **Stage Type** | Open |
| **Description** | Terms being discussed. Contract under review. Signatures pending. |

**ENTRY CRITERIA:** Contact responds positively to proposal

**EXIT CRITERIA:** Contract signed OR deal lost

**AUTOMATION:**

- Manual move (based on email/call)  
- Create task: "Follow up on contract review"

---

### Deal Stage 7: Closed Won

| Field | Value |
| :---- | :---- |
| **Stage Name** | Closed Won |
| **Internal Name** | closed\_won |
| **Probability** | 100% |
| **Stage Type** | Closed Won |
| **Description** | Contract fully executed. Payment received or scheduled. Project kickoff scheduled. |

**ENTRY CRITERIA:** Contract signed

**EXIT CRITERIA:** N/A (terminal stage)

**AUTOMATION:**

- Update `contact_type` \= "Client \- Active"  
- Update `engagement_status` \= "Contract Signed"  
- Create kickoff meeting task  
- Send welcome email  
- Add to client onboarding workflow

---

### Deal Stage 8: Closed Lost

| Field | Value |
| :---- | :---- |
| **Stage Name** | Closed Lost |
| **Internal Name** | closed\_lost |
| **Probability** | 0% |
| **Stage Type** | Closed Lost |
| **Description** | Opportunity did not progress. Reason documented. |

**ENTRY CRITERIA:** Contact declines OR goes unresponsive

**EXIT CRITERIA:** N/A (terminal stage)

**LOST REASON DROPDOWN:**

```
Option 1: Budget - No Funding
Option 2: Budget - Chose Cheaper Option
Option 3: Timing - Not Ready Yet
Option 4: Timing - Urgent Need, Can't Wait
Option 5: Went with Competitor
Option 6: Built In-House Solution
Option 7: No Response/Ghosted
Option 8: Not a Good Fit
Option 9: Internal Politics
Option 10: Other
```

**AUTOMATION:**

- Update `engagement_status` \= "Inactive \- No Response" OR "Disqualified"  
- Create task: "Add to nurture campaign in 6 months"

---

## 📊 DEAL PROPERTIES TO CREATE

These properties exist on DEAL objects to track service-specific information.

### Deal Property 7.1: Service Tier

**WHERE TO CREATE:**

- Navigate to: **Settings** \> **Data Management** \> **Properties**  
- Click: **Create property**  
- Select object: **DEAL**

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | Service Tier |
| **Property Internal Name** | service\_tier |
| **Object Type** | DEAL |
| **Property Group** | Deal Information |
| **Description** | Which service tier is this deal for? Used for reporting and pricing. |
| **Field Type** | Dropdown select (Single-select) |

**DROPDOWN OPTIONS:**

```
Option 1: Tier 1: Foundational Workshop
Option 2: Tier 2: Strategic Intensive
Option 3: Tier 3: Consulting Services
Option 4: Tier 4: Partnership Retainer
Option 5: Crisis Response (Rapid Deployment)
Option 6: Custom Package
```

**AUTOMATION:** Pre-populate from contact's `primary_service_interest`

---

### Deal Property 7.2: Delivery Format

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | Delivery Format |
| **Property Internal Name** | delivery\_format |
| **Object Type** | DEAL |
| **Property Group** | Deal Information |
| **Description** | How will services be delivered? Affects pricing and logistics. |
| **Field Type** | Dropdown select (Single-select) |

**DROPDOWN OPTIONS:**

```
Option 1: Virtual Only
Option 2: In-Person Only
Option 3: Hybrid (Virtual + In-Person)
Option 4: TBD
```

---

### Deal Property 7.3: Expected Participants

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | Expected Number of Participants |
| **Property Internal Name** | expected\_participants |
| **Object Type** | DEAL |
| **Property Group** | Deal Information |
| **Description** | How many people will participate? Used for pricing and logistics. |
| **Field Type** | Number |
| **Number Format** | Unformatted number |

---

### Deal Property 7.4: Implementation Timeline

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | Implementation Timeline |
| **Property Internal Name** | implementation\_timeline |
| **Object Type** | DEAL |
| **Property Group** | Deal Information |
| **Description** | Expected duration of engagement. |
| **Field Type** | Dropdown select (Single-select) |

**DROPDOWN OPTIONS:**

```
Option 1: Single Session (< 1 day)
Option 2: 1-3 Days
Option 3: 1-4 Weeks
Option 4: 1-3 Months
Option 5: 3-6 Months
Option 6: 6-12 Months
Option 7: 12+ Months (Retainer)
Option 8: Ongoing/TBD
```

---

### Deal Property 7.5: Contract Status

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | Contract Status |
| **Property Internal Name** | contract\_status |
| **Object Type** | DEAL |
| **Property Group** | Deal Information |
| **Description** | Status of contract/agreement. |
| **Field Type** | Dropdown select (Single-select) |

**DROPDOWN OPTIONS:**

```
Option 1: Not Sent
Option 2: Sent - Awaiting Review
Option 3: Under Negotiation
Option 4: Pending Signatures
Option 5: Fully Executed
Option 6: Amended
Option 7: Expired
Option 8: Cancelled
```

---

### Deal Property 7.6: Project Start Date

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | Project Start Date |
| **Property Internal Name** | project\_start\_date |
| **Object Type** | DEAL |
| **Property Group** | Deal Information |
| **Description** | When will services begin? |
| **Field Type** | Date picker |

---

### Deal Property 7.7: Project End Date

**PROPERTY SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **Property Label** | Project End Date |
| **Property Internal Name** | project\_end\_date |
| **Object Type** | DEAL |
| **Property Group** | Deal Information |
| **Description** | When will services conclude? |
| **Field Type** | Date picker |

---

## 📧 PHASE 8: MARKETING SETUP (WEEK 8\)

### HubSpot Marketing Email Setup

**WHERE TO CREATE:**

- Navigate to: **Marketing** \> **Email**

---

### Email Segmentation Strategy

Create these **ACTIVE LISTS** in HubSpot:

#### List 1: Hot Prospects (A+)

**LIST SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **List Name** | Hot Prospects (A+) \- Ready for Outreach |
| **List Type** | Active (auto-updating) |
| **Description** | High-quality leads with immediate need and budget. Priority follow-up. |

**FILTER CRITERIA:**

```
contact_type = "Prospect - Hot (A+)"
AND
marketing_consent = "Marketable - Explicit Consent" OR "Marketable - Soft Opt-in"
AND
engagement_status != "Inactive - No Response"
```

**USE CASE:**

- Weekly personal outreach from Josh/Sallie/Amy  
- Immediate discovery call invitations  
- Custom proposals

---

#### List 2: Active Prospects (A & B)

**LIST SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **List Name** | Active Prospects (A & B) \- Nurture Campaign |
| **List Type** | Active (auto-updating) |

**FILTER CRITERIA:**

```
(contact_type = "Prospect - Priority (A)" OR contact_type = "Prospect - Nurture (B)")
AND
marketing_consent = "Marketable - Explicit Consent" OR "Marketable - Soft Opt-in"
AND
engagement_status != "Inactive - No Response"
```

**USE CASE:**

- Monthly newsletter  
- Educational content emails  
- Webinar invitations

---

#### List 3: Assessment Completed \- No Discovery Call Yet

**LIST SPECIFICATIONS:**

| Field | Value |
| :---- | :---- |
| **List Name** | Assessment Complete \- Awaiting Discovery Call |
| **List Type** | Active (auto-updating) |

**FILTER CRITERIA:**

```
assessment_completion_status = "Completed"
AND
discovery_call_status = "Not Scheduled"
AND
assessment_completion_date is less than 30 days ago
AND
marketing_consent != "Not Marketable - Do Not Contact"
```

**USE CASE:**

- Automated reminder email at 3 days, 7 days, 14 days  
- "Schedule your free consultation" CTA

---

#### List 4: Discovery Call Scheduled \- Reminder

**FILTER CRITERIA:**

```
discovery_call_status = "Scheduled"
AND
discovery_call_date is less than 48 hours from now
```

**USE CASE:**

- Automated reminder email 24 hours before call  
- "Here's what to expect" content

---

#### List 5: Discovery Call Completed \- Awaiting Proposal

**FILTER CRITERIA:**

```
discovery_call_status = "Completed"
AND
engagement_status != "Proposal Sent"
AND
(deal stage = "Discovery Completed" OR deal stage is unknown)
AND
discovery_call_date is less than 7 days ago
```

**USE CASE:**

- Internal task creation (not email to contact)  
- Alerts for team to send proposal

---

#### List 6: Active Clients

**FILTER CRITERIA:**

```
contact_type = "Client - Active"
AND
(engagement_status = "Service Delivery - Active" OR engagement_status = "Contract Signed")
```

**USE CASE:**

- Client updates  
- Check-in surveys  
- Upsell/cross-sell opportunities

---

#### List 7: Past Clients \- Re-engagement

**FILTER CRITERIA:**

```
contact_type = "Client - Past"
AND
engagement_status = "Service Delivery - Completed"
AND
(last service delivery completed date is more than 6 months ago)
```

**USE CASE:**

- Quarterly check-ins  
- "How are you doing now?" emails  
- Re-engagement campaigns

---

#### List 8: Strategic Partners

**FILTER CRITERIA:**

```
contact_type contains "Partner"
AND
partnership_status = "Active - Regular Engagement" OR "Active - High Engagement"
```

**USE CASE:**

- Partner-specific updates  
- Collaboration opportunities  
- Referral requests

---

### Mailchimp Integration (if using Mailchimp)

**SYNC CONFIGURATION:**

If you're using Mailchimp instead of HubSpot Marketing, here's how to sync:

**Mailchimp Audience Structure:**

| Audience | HubSpot List Source | Sync Frequency |
| :---- | :---- | :---- |
| **Hot Prospects** | Hot Prospects (A+) list | Real-time |
| **Nurture Prospects** | Active Prospects (A & B) list | Daily |
| **Assessment Follow-Up** | Assessment Complete \- No Discovery list | Real-time |
| **Active Clients** | Active Clients list | Daily |
| **Partners** | Strategic Partners list | Weekly |

**Mailchimp Tag Strategy:**

Sync these HubSpot properties as Mailchimp tags:

| HubSpot Property | Mailchimp Tag Format |
| :---- | :---- |
| `contact_type` | TYPE: \[value\] |
| `organization_sector` | SECTOR: \[value\] |
| `primary_service_interest` | SERVICE: \[value\] |
| `recent_crisis_experience` | CRISIS: \[value\] |
| `assessment_top_gap` | GAP: \[value\] |

**Example:**

- Contact Type \= "Prospect \- Hot (A+)" → Mailchimp tag "TYPE: Prospect Hot"  
- Organization Sector \= "K-12 Education" → Mailchimp tag "SECTOR: K12 Education"

---

### Make.com Automation: HubSpot ↔ Mailchimp Sync

**Workflow 8.1: Sync Marketing Consent to Mailchimp**

**TRIGGER:** HubSpot contact property `marketing_consent` changes

**WORKFLOW:**

```javascript
IF marketing_consent = "Marketable - Explicit Consent" OR "Marketable - Soft Opt-in":
  - Add/Update contact in Mailchimp
  - Set subscribed = true
  - Add appropriate tags

ELSE IF marketing_consent contains "Not Marketable":
  - Unsubscribe contact in Mailchimp
  - Set subscribed = false
  - Keep tags for segmentation if they re-subscribe later
```

---

## 🤖 PHASE 9: MAKE.COM COMPREHENSIVE AUTOMATION GUIDE

This section consolidates all automations needed across phases.

### Master Automation Overview

| Workflow \# | Name | Trigger | Purpose |
| :---- | :---- | :---- | :---- |
| 9.1 | Assessment Submission → Full Contact Creation | Form submit | Create/update contact with all assessment data |
| 9.2 | Discovery Call Scheduled → Prep Doc Creation | Calendly webhook | Generate prep doc, send notifications |
| 9.3 | Discovery Call Completed → Follow-Up | Call status change | Update engagement, create tasks |
| 9.4 | Deal Stage Change → Contact Updates | Deal stage moves | Sync deal progress to contact properties |
| 9.5 | Marketing Consent → Mailchimp Sync | Property change | Bi-directional sync |
| 9.6 | Weekly Digest → Team Notification | Schedule (Monday 8am) | Send weekly pipeline summary |

---

### Workflow 9.1: MASTER Assessment Submission Flow

**COMPLETE WORKFLOW SPECIFICATION:**

**Trigger:** Webhook receives Gap Assessment form data

**Expected Webhook Payload:**

```json
{
  "email": "contact@example.com",
  "firstname": "Jane",
  "lastname": "Smith",
  "company": "City School District",
  "jobtitle": "Director of Safety",
  "phone": "555-123-4567",
  "organization_sector": "K-12 Education",
  
  // Assessment Questions (40 questions, scored 0-10 each)
  "Q1_crisis_plan_exists": 3,
  "Q2_plan_tested_annually": 2,
  "Q3_leadership_trained": 4,
  // ... (all 40 questions)
  
  // Crisis Context
  "crisis_timing": "6-12 Months Ago",
  "crisis_types": ["Workplace Violence", "Natural Disaster"],
  
  // Service Interest
  "budget_range": "$25,000 - $50,000",
  "decision_timeline": "This Quarter"
}
```

**MAKE.COM MODULES:**

**Module 1: Webhook**

- Trigger type: Custom Webhook  
- Method: POST  
- Data structure: JSON

**Module 2: Data Transformer \- Calculate Scores**

```javascript
// Preparedness Score (Questions 1-10)
let preparedness = (
  {{webhook.Q1_crisis_plan_exists}} +
  {{webhook.Q2_plan_tested_annually}} +
  {{webhook.Q3_leadership_trained}} +
  {{webhook.Q4_staff_trained}} +
  {{webhook.Q5_communication_plan}} +
  {{webhook.Q6_resource_allocation}} +
  {{webhook.Q7_backup_systems}} +
  {{webhook.Q8_supplier_relationships}} +
  {{webhook.Q9_insurance_review}} +
  {{webhook.Q10_legal_compliance}}
) / 10 * 100;

// Communication Score (Questions 11-20)
let communication = (
  {{webhook.Q11_internal_comms}} +
  {{webhook.Q12_external_messaging}} +
  {{webhook.Q13_media_relations}} +
  {{webhook.Q14_stakeholder_mgmt}} +
  {{webhook.Q15_crisis_spokesperson}} +
  {{webhook.Q16_social_media_plan}} +
  {{webhook.Q17_employee_updates}} +
  {{webhook.Q18_family_communication}} +
  {{webhook.Q19_community_outreach}} +
  {{webhook.Q20_feedback_loops}}
) / 10 * 100;

// Capacity Score (Questions 21-30)
let capacity = (
  {{webhook.Q21_staffing_levels}} +
  {{webhook.Q22_budget_allocation}} +
  {{webhook.Q23_technology_systems}} +
  {{webhook.Q24_physical_infrastructure}} +
  {{webhook.Q25_supply_chain}} +
  {{webhook.Q26_vendor_relationships}} +
  {{webhook.Q27_funding_sources}} +
  {{webhook.Q28_grant_readiness}} +
  {{webhook.Q29_scalability}} +
  {{webhook.Q30_resource_flexibility}}
) / 10 * 100;

// Resilience Score (Questions 31-40)
let resilience = (
  {{webhook.Q31_long_term_recovery_plan}} +
  {{webhook.Q32_trauma_response}} +
  {{webhook.Q33_staff_wellness}} +
  {{webhook.Q34_mental_health_support}} +
  {{webhook.Q35_peer_support_program}} +
  {{webhook.Q36_leadership_support}} +
  {{webhook.Q37_org_culture}} +
  {{webhook.Q38_learning_from_crisis}} +
  {{webhook.Q39_anniversary_planning}} +
  {{webhook.Q40_continuous_improvement}}
) / 10 * 100;

// Total Score
let total_score = preparedness + communication + capacity + resilience;

// Lead Score Calculation
let lead_score = 0;

// Score component (max 200 points)
if (total_score < 150) { lead_score += 200; } // Very low score = high need
else if (total_score < 200) { lead_score += 150; }
else if (total_score < 250) { lead_score += 100; }
else if (total_score < 300) { lead_score += 50; }

// Seniority component (max 100 points)
if ({{webhook.jobtitle}}.includes("Director") || {{webhook.jobtitle}}.includes("Chief")) {
  lead_score += 100;
} else if ({{webhook.jobtitle}}.includes("Manager") || {{webhook.jobtitle}}.includes("Coordinator")) {
  lead_score += 50;
}

// Budget component (max 100 points)
if ({{webhook.budget_range}} == "$100,000 - $250,000" || {{webhook.budget_range}} == "$250,000+") {
  lead_score += 100;
} else if ({{webhook.budget_range}} == "$50,000 - $100,000") {
  lead_score += 75;
} else if ({{webhook.budget_range}} == "$25,000 - $50,000") {
  lead_score += 50;
}

// Timeline component (max 100 points)
if ({{webhook.decision_timeline}} == "Immediate/Urgent") {
  lead_score += 100;
} else if ({{webhook.decision_timeline}} == "This Quarter") {
  lead_score += 50;
} else if ({{webhook.decision_timeline}} == "Next Quarter") {
  lead_score += 25;
}

// Crisis urgency component (max 50 points)
if ({{webhook.crisis_timing}} == "Currently in Crisis") {
  lead_score += 50;
} else if ({{webhook.crisis_timing}} == "Within Last 6 Months") {
  lead_score += 25;
}

// Output
return {
  preparedness_score: Math.round(preparedness),
  communication_score: Math.round(communication),
  capacity_score: Math.round(capacity),
  resilience_score: Math.round(resilience),
  total_score: Math.round(total_score),
  lead_score: Math.round(lead_score)
};
```

**Module 3: Logic \- Determine Top Gap**

```javascript
// Find lowest domain
let lowest_score = Math.min(
  {{calc.preparedness_score}},
  {{calc.communication_score}},
  {{calc.capacity_score}},
  {{calc.resilience_score}}
);

let top_gap = "";

if (lowest_score == {{calc.preparedness_score}}) {
  // Find lowest preparedness question
  let prep_questions = [
    {q: "Q1", val: {{webhook.Q1_crisis_plan_exists}}, gap: "Preparedness - Crisis Plan Missing"},
    {q: "Q2", val: {{webhook.Q2_plan_tested_annually}}, gap: "Preparedness - Plan Not Tested"},
    {q: "Q3", val: {{webhook.Q3_leadership_trained}}, gap: "Preparedness - Leadership Not Trained"},
    {q: "Q4", val: {{webhook.Q4_staff_trained}}, gap: "Preparedness - Staff Not Trained"}
  ];
  top_gap = prep_questions.sort((a,b) => a.val - b.val)[0].gap;
}
else if (lowest_score == {{calc.communication_score}}) {
  // Communication gaps logic
  if ({{webhook.Q11_internal_comms}} <= {{webhook.Q12_external_messaging}}) {
    top_gap = "Communication - Internal Breakdown";
  } else {
    top_gap = "Communication - External Messaging Weak";
  }
}
else if (lowest_score == {{calc.capacity_score}}) {
  // Capacity gaps logic
  if ({{webhook.Q21_staffing_levels}} < {{webhook.Q22_budget_allocation}}) {
    top_gap = "Capacity - Insufficient Staffing";
  } else {
    top_gap = "Capacity - Funding Constraints";
  }
}
else if (lowest_score == {{calc.resilience_score}}) {
  // Resilience gaps logic
  if ({{webhook.Q31_long_term_recovery_plan}} < 5) {
    top_gap = "Resilience - No Long-Term Plan";
  } else if ({{webhook.Q32_trauma_response}} < 5) {
    top_gap = "Resilience - Trauma Response Missing";
  } else if ({{webhook.Q33_staff_wellness}} < 5) {
    top_gap = "Resilience - Staff Wellness Neglected";
  } else {
    top_gap = "Resilience - Organizational Culture Issues";
  }
}

return { top_gap: top_gap };
```

**Module 4: Logic \- Service Recommendation**

```javascript
let recommended_service = "";
let primary_service_interest = "";
let specific_service_line = "";

// Service matching based on top gap and sector
if ({{gap.top_gap}}.includes("Preparedness")) {
  primary_service_interest = "Tier 2: Strategic Intensives";
  specific_service_line = "Crisis Preparedness Assessment & Implementation";
}
else if ({{gap.top_gap}}.includes("Resilience - Staff Wellness") || {{gap.top_gap}}.includes("Trauma Response")) {
  primary_service_interest = "Tier 2: Strategic Intensives";
  if ({{webhook.organization_sector}} == "Healthcare System") {
    specific_service_line = "Clinician Resilience & Moral Injury";
  } else if ({{webhook.organization_sector}} == "K-12 Education" || {{webhook.organization_sector}} == "Higher Education") {
    specific_service_line = "Campus Crisis & Educator Wellness";
  } else {
    specific_service_line = "Leadership Resilience Intensive";
  }
}
else if ({{gap.top_gap}}.includes("Communication")) {
  primary_service_interest = "Tier 3: Full Consulting";
  specific_service_line = "Crisis Communications Advisory";
}
else if ({{calc.total_score}} < 150) {
  // Very low overall score = comprehensive help needed
  primary_service_interest = "Tier 3: Full Consulting";
  specific_service_line = "Crisis Recovery Consulting";
}
else {
  // Default to Tier 1
  primary_service_interest = "Tier 1: Foundational Workshops";
  specific_service_line = "Organizational Trauma & Grief Literacy";
}

// Check if currently in crisis → Rapid response
if ({{webhook.crisis_timing}} == "Currently in Crisis") {
  primary_service_interest = "Crisis Response (Rapid Deployment)";
  specific_service_line = "Crisis Recovery Consulting";
}

return {
  recommended_service: specific_service_line,
  primary_service_interest: primary_service_interest,
  specific_service_line: specific_service_line
};
```

**Module 5: HubSpot \- Search for Existing Contact**

- Module: HubSpot \> Search Records  
- Object: Contacts  
- Filter: `email` \= `{{webhook.email}}`

**Module 6: Router \- New vs Existing Contact**

**Branch A: NEW CONTACT (if search returns 0 results)**

**Module 6A: HubSpot \- Create Contact**

Properties to set:

```json
{
  // Basic Info
  "email": "{{webhook.email}}",
  "firstname": "{{webhook.firstname}}",
  "lastname": "{{webhook.lastname}}",
  "company": "{{webhook.company}}",
  "jobtitle": "{{webhook.jobtitle}}",
  "phone": "{{webhook.phone}}",
  
  // Classification (Phase 1)
  "contact_type": "{{if(calc.lead_score >= 400, 'Prospect - Hot (A+)', if(calc.lead_score >= 300, 'Prospect - Priority (A)', if(calc.lead_score >= 200, 'Prospect - Nurture (B)', 'Prospect - Archive (C)')))}}",
  "marketing_consent": "Marketable - Soft Opt-in",
  "relationship_origin": "Gap Assessment",
  "organization_sector": "{{webhook.organization_sector}}",
  
  // Lead Scoring (Existing properties)
  "lead_score": "{{calc.lead_score}}",
  "priority_level": "{{if(calc.lead_score >= 400, 'A+', if(calc.lead_score >= 300, 'A', if(calc.lead_score >= 200, 'B', 'C')))}}",
  "gap_category": "{{gap.top_gap}}",
  "month_six_client": "{{if(gap.top_gap.includes('Resilience'), 'Yes', 'Needs Assessment')}}",
  "recommended_service": "{{service.recommended_service}}",
  
  // Assessment Data (Phase 2)
  "assessment_completion_status": "Completed",
  "assessment_score_preparedness": "{{calc.preparedness_score}}",
  "assessment_score_communication": "{{calc.communication_score}}",
  "assessment_score_capacity": "{{calc.capacity_score}}",
  "assessment_score_resilience": "{{calc.resilience_score}}",
  "assessment_total_score": "{{calc.total_score}}",
  "assessment_completion_date": "{{now}}",
  "assessment_top_gap": "{{gap.top_gap}}",
  "recent_crisis_experience": "{{webhook.crisis_timing}}",
  "crisis_type_experienced": "{{webhook.crisis_types}}",
  
  // Service Tracking (Phase 3)
  "primary_service_interest": "{{service.primary_service_interest}}",
  "specific_service_line": "{{service.specific_service_line}}",
  "engagement_status": "Assessment Submitted",
  "budget_range": "{{webhook.budget_range}}",
  "decision_timeline": "{{webhook.decision_timeline}}"
}
```

**Branch B: EXISTING CONTACT (if search returns 1+ results)**

**Module 6B: HubSpot \- Update Contact**

Properties to update (DO NOT override first-touch attribution):

```json
{
  // Update lead scoring
  "lead_score": "{{calc.lead_score}}",
  "contact_type": "{{if(calc.lead_score >= 400, 'Prospect - Hot (A+)', ...)}}",
  "priority_level": "{{if(calc.lead_score >= 400, 'A+', ...)}}",
  
  // Update assessment data
  "assessment_completion_status": "Completed",
  "assessment_score_preparedness": "{{calc.preparedness_score}}",
  "assessment_score_communication": "{{calc.communication_score}}",
  "assessment_score_capacity": "{{calc.capacity_score}}",
  "assessment_score_resilience": "{{calc.resilience_score}}",
  "assessment_total_score": "{{calc.total_score}}",
  "assessment_completion_date": "{{now}}",
  "assessment_top_gap": "{{gap.top_gap}}",
  
  // Update service recommendations
  "primary_service_interest": "{{service.primary_service_interest}}",
  "specific_service_line": "{{service.specific_service_line}}",
  "engagement_status": "Assessment Submitted"
  
  // DO NOT UPDATE:
  // - marketing_consent (keep original)
  // - relationship_origin (keep first touch)
}
```

**Module 7: HubSpot \- Create or Move Deal**

Search for existing deal:

- Filter: Associated contact \= `{{contact.id}}`  
- Filter: Deal stage \!= "Closed Won" AND \!= "Closed Lost"

If no open deal exists, create new deal:

```json
{
  "dealname": "{{webhook.company}} - {{service.specific_service_line}}",
  "dealstage": "assessment_submitted",
  "pipeline": "aftermath_consulting",
  "amount": "{{if(service.primary_service_interest.includes('Tier 1'), 7500, if(service.primary_service_interest.includes('Tier 2'), 25000, if(service.primary_service_interest.includes('Tier 3'), 60000, if(service.primary_service_interest.includes('Tier 4'), 150000, 0))))}}",
  "closedate": "{{addDays(now, 90)}}",
  "hubspot_owner_id": "{{contact.hubspot_owner_id}}",
  
  // Deal-specific properties
  "service_tier": "{{service.primary_service_interest}}",
  "delivery_format": "TBD",
  "expected_participants": "",
  "implementation_timeline": "TBD",
  "contract_status": "Not Sent"
}
```

Associate deal with contact.

**Module 8: Gmail \- Send Internal Notification**

To: [jgarcia@theaftermathsolutions.com](mailto:jgarcia@theaftermathsolutions.com), [slynch@theaftermathsolutions.com](mailto:slynch@theaftermathsolutions.com), [aoneill@theaftermathsolutions.com](mailto:aoneill@theaftermathsolutions.com)

Subject: 🎯 New {{priority\_level}} Lead: {{firstname}} {{lastname}} ({{lead\_score}} points)

Body:

```
New Gap Assessment Completed!

CONTACT INFO:
Name: {{firstname}} {{lastname}}
Company: {{company}}
Title: {{jobtitle}}
Sector: {{organization_sector}}

LEAD QUALITY:
Priority: {{priority_level}}
Lead Score: {{lead_score}} / 500 points
Contact Type: {{contact_type}}

ASSESSMENT RESULTS:
Total Score: {{total_score}} / 400
- Preparedness: {{preparedness_score}} / 100
- Communication: {{communication_score}} / 100
- Capacity: {{capacity_score}} / 100
- Resilience: {{resilience_score}} / 100

Primary Gap: {{top_gap}}

CRISIS CONTEXT:
Recent Crisis: {{crisis_timing}}
Crisis Types: {{crisis_types}}

RECOMMENDED SERVICE:
{{specific_service_line}} ({{primary_service_interest}})

BUSINESS INFO:
Budget: {{budget_range}}
Timeline: {{decision_timeline}}

NEXT STEPS:
{% if lead_score >= 400 %}
🔥 HOT LEAD - Reach out within 24 hours!
{% elsif lead_score >= 300 %}
📞 Priority - Schedule discovery call this week
{% else %}
📧 Add to nurture campaign
{% endif %}

View in HubSpot: [Contact URL]
```

**Module 9: Airtable \- Add to Assessment Log** (if using Airtable for tracking)

Create record in "Gap Assessments" table:

```json
{
  "Contact Name": "{{firstname}} {{lastname}}",
  "Company": "{{company}}",
  "Email": "{{email}}",
  "Submission Date": "{{now}}",
  "Total Score": "{{total_score}}",
  "Lead Score": "{{lead_score}}",
  "Priority": "{{priority_level}}",
  "Top Gap": "{{top_gap}}",
  "Recommended Service": "{{recommended_service}}",
  "HubSpot Contact URL": "[URL]"
}
```

---

### Workflow 9.2: Discovery Call Scheduled

(This was covered in Phase 4, Module 4.1 \- see above for complete details)

---

### Workflow 9.3: Discovery Call Completed → Follow-Up

**TRIGGER:** `discovery_call_status` property changes to "Completed"

**MODULES:**

1. **HubSpot: Watch Contacts** (trigger on property change)  
2. **HubSpot: Update Contact**  
   - `engagement_status` \= "Discovery Call Completed"  
3. **HubSpot: Move Deal Stage**  
   - Find associated deal  
   - Move to "discovery\_completed" stage  
4. **HubSpot: Create Task**  
   - Task: "Send proposal to {{firstname}} {{lastname}}"  
   - Due: 48 hours from now  
   - Assign to: Deal owner  
   - Priority: High  
5. **Gmail: Send Thank You Email**  
   - To: {{email}}  
   - Subject: "Thank you for your time today\!"  
   - Body: (Template with next steps)

---

### Workflow 9.4: Deal Stage Change → Contact Sync

**TRIGGER:** Deal stage changes

**MODULES:**

1. **HubSpot: Watch Deals** (trigger on stage change)  
2. **Router** based on new stage:

**Path A: Discovery Scheduled**

- Update contact `engagement_status` \= "Discovery Call Scheduled"  
- Update contact `discovery_call_status` \= "Scheduled"

**Path B: Discovery Completed**

- Update contact `engagement_status` \= "Discovery Call Completed"  
- Update contact `discovery_call_status` \= "Completed"

**Path C: Proposal Sent**

- Update contact `engagement_status` \= "Proposal Sent"

**Path D: Contract Negotiation**

- Update contact `engagement_status` \= "Contract Negotiation"

**Path E: Closed Won**

- Update contact `contact_type` \= "Client \- Active"  
- Update contact `engagement_status` \= "Contract Signed"  
- Send welcome/onboarding email

**Path F: Closed Lost**

- Update contact `engagement_status` \= "Inactive \- No Response" OR "Disqualified"  
- Create task: "Add to re-engagement campaign in 6 months"

---

### Workflow 9.5: Marketing Consent → Mailchimp Sync

**TRIGGER:** `marketing_consent` property changes

**MODULES:**

1. **HubSpot: Watch Contacts** (trigger on property change)  
2. **Router**:

**Path A: Marketable**

```javascript
if (marketing_consent.includes("Marketable")) {
  // Subscribe in Mailchimp
  mailchimp.subscribe({
    email: {{email}},
    status: "subscribed",
    merge_fields: {
      FNAME: {{firstname}},
      LNAME: {{lastname}},
      COMPANY: {{company}}
    },
    tags: [
      "TYPE: " + {{contact_type}},
      "SECTOR: " + {{organization_sector}},
      "GAP: " + {{assessment_top_gap}}
    ]
  });
}
```

**Path B: Not Marketable**

```javascript
else {
  // Unsubscribe in Mailchimp
  mailchimp.unsubscribe({
    email: {{email}},
    status: "unsubscribed"
  });
  
  // Also update HubSpot native marketing status
  hubspot.update_contact({
    hs_marketable_status: "Non-marketing"
  });
}
```

---

### Workflow 9.6: Weekly Team Digest

**TRIGGER:** Schedule (Every Monday at 8:00 AM MT)

**MODULES:**

1. **Scheduled Trigger** \- Cron: `0 8 * * MON`  
2. **HubSpot: Search Contacts** \- Get all contacts created last 7 days  
3. **HubSpot: Search Deals** \- Get all deals created/moved last 7 days  
4. **Aggregator** \- Group by priority level  
5. **Gmail: Send Digest**

Email body:

```
AFTERMATH SOLUTIONS - WEEKLY PIPELINE DIGEST
Week of {{startOfWeek}} - {{endOfWeek}}

=================================
NEW ASSESSMENTS THIS WEEK: {{count}}
=================================

HOT PROSPECTS (A+): {{countA+}}
{% for contact in hotProspects %}
- {{firstname}} {{lastname}} ({{company}}) - {{lead_score}} pts
  Gap: {{top_gap}}
  Recommended: {{recommended_service}}
  [View Contact]
{% endfor %}

PRIORITY PROSPECTS (A): {{countA}}
[Similar format]

=================================
DEAL PIPELINE UPDATES
=================================

Discovery Calls Scheduled: {{discoveryScheduled}}
Discovery Calls Completed: {{discoveryCompleted}}
Proposals Sent: {{proposalsSent}}
Contracts in Negotiation: {{inNegotiation}}

Deals Closed Won: {{closedWon}} - ${{totalRevenue}}
Deals Closed Lost: {{closedLost}}

=================================
ACTION ITEMS
=================================

Overdue Follow-Ups: {{overdueCount}}
{% for task in overdue %}
- {{task.title}} - Assigned to {{task.owner}}
{% endfor %}

Upcoming Discovery Calls (Next 7 Days): {{upcomingCount}}
{% for call in upcoming %}
- {{call.date}} - {{call.contact_name}} ({{call.company}})
{% endfor %}

=================================
TOP PRIORITIES THIS WEEK
=================================

1. Follow up with {{topContact1}}
2. Send proposal to {{topContact2}}
3. Close deal with {{topContact3}}

[View Full Pipeline in HubSpot]
```

---

## 📝 PHASE 10: GAP ASSESSMENT FORM UPDATES

### Assessment Form Enhancements

Your Gap Assessment form should capture all the data needed to populate the properties above.

**FORM STRUCTURE:**

#### Section 1: Contact Information

| Field | Type | Required | HubSpot Property |
| :---- | :---- | :---- | :---- |
| First Name | Text | Yes | firstname |
| Last Name | Text | Yes | lastname |
| Email | Email | Yes | email |
| Company Name | Text | Yes | company |
| Job Title | Text | Yes | jobtitle |
| Phone | Phone | No | phone |
| Organization Type | Dropdown | Yes | organization\_sector |

**Organization Type Dropdown Options:** (Same as Property 1.4 options)

---

#### Section 2: Crisis Context

**Question 2.1:** "Has your organization experienced a crisis or traumatic event?"

- Type: Radio buttons  
- Options:  
  - Yes, currently in crisis  
  - Yes, within the last 6 months  
  - Yes, 6-12 months ago  
  - Yes, 1-2 years ago  
  - Yes, 2+ years ago  
  - No, but preparing proactively  
- Maps to: `recent_crisis_experience`

**Question 2.2:** "What type(s) of crisis did your organization experience? (Check all that apply)"

- Type: Checkboxes  
- Options:  
  - Mass Violence \- Shooting  
  - Mass Violence \- Other  
  - Natural Disaster (hurricane, flood, earthquake, etc.)  
  - Workplace Violence  
  - Sudden Death or Loss of Team Member  
  - Cyberattack  
  - Public Relations Crisis  
  - Organizational Scandal  
  - Health Emergency/Pandemic  
  - Accident or Tragedy  
  - Other (please specify)  
- Maps to: `crisis_type_experienced`

---

#### Section 3: Assessment Questions (40 Questions)

**INSTRUCTIONS TO USER:** "Rate your organization's current preparedness on a scale of 0-10, where:

- 0 \= We have no systems in place  
- 5 \= We have basic systems but need improvement  
- 10 \= We have excellent, well-tested systems"

**Domain 1: PREPAREDNESS (Questions 1-10)**

| Q\# | Question Text | Maps to Webhook |
| :---- | :---- | :---- |
| 1 | Does your organization have a written crisis response plan? | Q1\_crisis\_plan\_exists |
| 2 | Is your crisis plan tested at least annually? | Q2\_plan\_tested\_annually |
| 3 | Has your leadership team received crisis management training? | Q3\_leadership\_trained |
| 4 | Has your staff received trauma-informed training? | Q4\_staff\_trained |
| 5 | Do you have a documented crisis communication plan? | Q5\_communication\_plan |
| 6 | Are resources (budget, staff time) allocated for crisis preparedness? | Q6\_resource\_allocation |
| 7 | Do you have backup systems for critical operations? | Q7\_backup\_systems |
| 8 | Have you identified alternative suppliers/vendors for continuity? | Q8\_supplier\_relationships |
| 9 | Is your insurance coverage reviewed regularly for crisis scenarios? | Q9\_insurance\_review |
| 10 | Does your plan comply with relevant regulations (OSHA, HIPAA, etc.)? | Q10\_legal\_compliance |

**Domain 2: COMMUNICATION (Questions 11-20)**

| Q\# | Question Text | Maps to Webhook |
| :---- | :---- | :---- |
| 11 | Do you have systems for rapid internal communication during a crisis? | Q11\_internal\_comms |
| 12 | Do you have templates for external crisis messaging? | Q12\_external\_messaging |
| 13 | Have you established relationships with media contacts? | Q13\_media\_relations |
| 14 | Do you have a plan for communicating with key stakeholders (board, funders, partners)? | Q14\_stakeholder\_mgmt |
| 15 | Have you designated and trained a crisis spokesperson? | Q15\_crisis\_spokesperson |
| 16 | Do you have a social media crisis response protocol? | Q16\_social\_media\_plan |
| 17 | Can you quickly communicate updates to all employees? | Q17\_employee\_updates |
| 18 | Do you have a plan for communicating with affected families? | Q18\_family\_communication |
| 19 | Have you identified community partners for coordinated messaging? | Q19\_community\_outreach |
| 20 | Do you have mechanisms to gather feedback during recovery? | Q20\_feedback\_loops |

**Domain 3: CAPACITY (Questions 21-30)**

| Q\# | Question Text | Maps to Webhook |
| :---- | :---- | :---- |
| 21 | Do you have adequate staffing to manage a crisis response? | Q21\_staffing\_levels |
| 22 | Is there a designated budget for crisis response and recovery? | Q22\_budget\_allocation |
| 23 | Do you have technology systems that can scale during increased demand? | Q23\_technology\_systems |
| 24 | Is your physical infrastructure resilient to common threats? | Q24\_physical\_infrastructure |
| 25 | Do you have supply chain redundancies? | Q25\_supply\_chain |
| 26 | Have you pre-established relationships with crisis consultants? | Q26\_vendor\_relationships |
| 27 | Do you have access to emergency funding (reserves, credit lines)? | Q27\_funding\_sources |
| 28 | Are you grant-ready for disaster recovery funding? | Q28\_grant\_readiness |
| 29 | Can you quickly scale operations up or down as needed? | Q29\_scalability |
| 30 | Do you have flexible resource reallocation plans? | Q30\_resource\_flexibility |

**Domain 4: RESILIENCE (Questions 31-40)**

| Q\# | Question Text | Maps to Webhook |
| :---- | :---- | :---- |
| 31 | Do you have a long-term recovery plan (beyond 6 months)? | Q31\_long\_term\_recovery\_plan |
| 32 | Does your organization provide trauma-informed support services? | Q32\_trauma\_response |
| 33 | Do you have ongoing employee wellness programs? | Q33\_staff\_wellness |
| 34 | Is mental health support accessible to all staff? | Q34\_mental\_health\_support |
| 35 | Do you have a peer support program? | Q35\_peer\_support\_program |
| 36 | Does leadership model self-care and wellness? | Q36\_leadership\_support |
| 37 | Does your organizational culture promote psychological safety? | Q37\_org\_culture |
| 38 | Do you have systems to learn from and integrate lessons after a crisis? | Q38\_learning\_from\_crisis |
| 39 | Do you plan for anniversary reactions and memorial events? | Q39\_anniversary\_planning |
| 40 | Do you have continuous improvement processes for crisis readiness? | Q40\_continuous\_improvement |

**Input Type for All 40 Questions:**

- Slider (0-10) or Radio buttons (0-10)  
- Required: Yes

---

#### Section 4: Service Interest & Logistics

**Question 4.1:** "What is your approximate budget for consulting services?"

- Type: Dropdown  
- Options: (Same as Property 3.4 options)  
- Required: No  
- Maps to: `budget_range`

**Question 4.2:** "What is your decision timeline?"

- Type: Dropdown  
- Options: (Same as Property 3.5 options)  
- Required: No  
- Maps to: `decision_timeline`

**Question 4.3:** "Would you like to schedule a free consultation call?"

- Type: Radio buttons  
- Options:  
  - Yes, please contact me to schedule  
  - Maybe, send me more information first  
  - Not at this time  
- Required: Yes  
- Triggers: If "Yes" → Create task to schedule discovery call

---

#### Section 5: Consent & Privacy

**Checkbox:** "I consent to Aftermath Solutions contacting me about my assessment results and relevant services."

- Type: Checkbox  
- Required: Yes  
- Maps to: `marketing_consent` \= "Marketable \- Explicit Consent"

**Link:** Privacy Policy

---

### Form Submission Workflow

**When form is submitted:**

1. Data sent to Make.com webhook (Workflow 9.1)  
2. All calculations performed  
3. Contact created/updated in HubSpot with all properties  
4. Deal created in "Assessment Submitted" stage  
5. Internal notification sent to team  
6. Thank-you email sent to contact with:  
   - Assessment results summary  
   - Recommended services  
   - Link to schedule discovery call

---

## 📚 APPENDIX: QUICK REFERENCE SHEETS

### Appendix A: Property Checklist by Phase

**PHASE 1 (Week 1\) \- FOUNDATION**

- [x] contact\_type  
- [x] marketing\_consent  
- [x] relationship\_origin  
- [x] organization\_sector

**PHASE 2 (Week 2\) \- ASSESSMENT**

- [ ] assessment\_completion\_status  
- [ ] assessment\_score\_preparedness  
- [ ] assessment\_score\_communication  
- [ ] assessment\_score\_capacity  
- [ ] assessment\_score\_resilience  
- [ ] assessment\_total\_score  
- [ ] assessment\_completion\_date  
- [ ] assessment\_top\_gap  
- [ ] recent\_crisis\_experience  
- [ ] crisis\_type\_experienced

**PHASE 3 (Week 3\) \- SERVICE TRACKING**

- [ ] primary\_service\_interest  
- [ ] specific\_service\_line  
- [ ] engagement\_status  
- [ ] budget\_range  
- [ ] decision\_timeline

**PHASE 4 (Week 4\) \- DISCOVERY**

- [ ] discovery\_call\_status  
- [ ] discovery\_call\_date  
- [ ] discovery\_call\_notes\_url  
- [ ] discovery\_call\_attendees  
- [ ] discovery\_key\_insights  
- [ ] barriers\_to\_engagement

**PHASE 5 (Weeks 5-6) \- PARTNERSHIPS**

- [ ] partnership\_type  
- [ ] partnership\_organizations  
- [ ] partnership\_status  
- [ ] referral\_agreement

**PHASE 6 (Weeks 5-6) \- COMPANY PROPERTIES**

- [ ] org\_crisis\_readiness\_level (COMPANY object)  
- [ ] previous\_trauma\_experience (COMPANY object)  
- [ ] organizational\_size (COMPANY object)  
- [ ] geographic\_reach (COMPANY object)

**PHASE 7 (Week 7\) \- DEAL PROPERTIES**

- [ ] Deal pipeline created  
- [ ] 8 deal stages configured  
- [ ] service\_tier  
- [ ] delivery\_format  
- [ ] expected\_participants  
- [ ] implementation\_timeline  
- [ ] contract\_status  
- [ ] project\_start\_date  
- [ ] project\_end\_date

---

### Appendix B: Automation Checklist

**MAKE.COM WORKFLOWS**

- [ ] 9.1: Assessment Submission → Full Contact Creation  
- [ ] 9.2: Discovery Call Scheduled → Prep Doc Creation  
- [ ] 9.3: Discovery Call Completed → Follow-Up  
- [ ] 9.4: Deal Stage Change → Contact Sync  
- [ ] 9.5: Marketing Consent → Mailchimp Sync  
- [ ] 9.6: Weekly Team Digest

**HUBSPOT WORKFLOWS** (Native)

- [ ] Assessment complete → Send follow-up email (3 days)  
- [ ] Discovery call scheduled → Send reminder email (24 hours before)  
- [ ] Proposal sent → Follow-up sequence (3 days, 7 days, 14 days)

---

### Appendix C: Lead Scoring Formula

**TOTAL POSSIBLE: 500 points**

| Component | Max Points | Logic |
| :---- | :---- | :---- |
| Assessment Score | 200 | Lower score \= more points (higher need) |
| Seniority | 100 | Director/C-level \= 100, Manager \= 50, Coordinator \= 25 |
| Budget | 100 | $100K+ \= 100, $50-100K \= 75, $25-50K \= 50, \<$25K \= 25 |
| Timeline | 100 | Immediate \= 100, This Qtr \= 50, Next Qtr \= 25, Exploring \= 0 |
| Crisis Urgency | 50 | Currently in crisis \= 50, Last 6 mo \= 25, Else \= 0 |

**LEAD TIERS:**

- **A+ (Hot):** 400-500 points  
- **A (Priority):** 300-399 points  
- **B (Nurture):** 200-299 points  
- **C (Archive):** 0-199 points

---

### Appendix D: Reporting Dashboard Setup

**KEY REPORTS TO CREATE IN HUBSPOT:**

**1\. Assessment Conversion Funnel**

- Stage 1: Assessments Submitted  
- Stage 2: Discovery Calls Scheduled  
- Stage 3: Discovery Calls Completed  
- Stage 4: Proposals Sent  
- Stage 5: Contracts Signed

**Conversion Rates:**

- Assessment → Discovery: Target 30%  
- Discovery → Proposal: Target 70%  
- Proposal → Contract: Target 25%

**2\. Lead Source Attribution**

- Group by: `relationship_origin`  
- Metrics: Count, Conversion rate, Avg deal size, Total revenue

**3\. Service Interest Analysis**

- Group by: `primary_service_interest`  
- Metrics: Count, Avg assessment score, Conversion rate

**4\. Organization Sector Performance**

- Group by: `organization_sector`  
- Metrics: Count, Avg deal size, Close rate

**5\. Discovery Call Performance**

- Show rate: Completed / Scheduled  
- No-show rate: No Show / Scheduled  
- Conversion rate: Proposals sent / Completed calls

**6\. Pipeline Health**

- Deals by stage  
- Avg time in each stage  
- Win rate by stage  
- Forecast by close date

---

### Appendix E: Training Checklist

**FOR JOSH:**

- [ ] Review all contact properties  
- [ ] Test assessment form submission  
- [ ] Review discovery call prep doc template  
- [ ] Test Make.com workflows  
- [ ] Set up saved views in HubSpot  
- [ ] Configure mobile app for on-the-go updates

**FOR SALLIE:**

- [ ] Review partnership properties  
- [ ] Set up partner outreach templates  
- [ ] Configure OVC/NMVRC tracking  
- [ ] Test Mailchimp sync  
- [ ] Review grant funding fields

**FOR AMY:**

- [ ] Review clinical/service properties  
- [ ] Customize service recommendations  
- [ ] Review assessment scoring logic  
- [ ] Prepare discovery call scripts  
- [ ] Set up training program tracking

---

## 🎉 IMPLEMENTATION COMPLETE\!

Once you've completed all phases, you'll have:

✅ **50+ custom properties** tracking every aspect of your relationships  
✅ **Automated workflows** reducing manual work by 80%  
✅ **Clear pipeline** from assessment to contract  
✅ **Partnership management** system  
✅ **Marketing segmentation** for targeted outreach  
✅ **Comprehensive reporting** on all activities

---

**Next Steps:**

1. Review this playbook with your team  
2. Schedule implementation kickoff meeting  
3. Begin Phase 1 property creation  
4. Test each automation before going live  
5. Monitor and optimize based on real data

**Questions?** Contact Josh Garcia: [jgarcia@theaftermathsolutions.com](mailto:jgarcia@theaftermathsolutions.com)

---

*Document Version: 1.0*  
*Last Updated: October 30, 2025*  
*Prepared by: Claude AI for Aftermath Solutions*  
