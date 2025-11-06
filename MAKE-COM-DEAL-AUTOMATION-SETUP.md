# Make.com Deal Automation Setup Guide
## Adding Automated Deal & Task Creation to Your Assessment Flow

**Version:** 1.0
**Last Updated:** January 2025
**Time Required:** 60-90 minutes
**Prerequisite:** HubSpot pipelines and properties set up (see HUBSPOT-PIPELINE-SETUP-GUIDE.md)

---

## Overview

This guide adds **automatic deal creation, task assignment, and team notifications** to your existing Make.com scenario.

**What This Adds:**
- 🎯 Automatic deal creation in HubSpot (every assessment)
- 📋 Priority-based task creation (assigned to team)
- 📧 Team notification emails with consultation gameplan
- 🎨 Different handling for HIGH, MEDIUM, and LOW priority leads

**Existing Flow:**
```
Webhook → Router (spam) → HubSpot Contact → Airtable → Email → Mailchimp
```

**NEW Flow:**
```
Webhook → Router (spam) → HubSpot Contact →
    → Router (priority) →
        ├─ HIGH: Create Deal + Task + Team Email
        ├─ MEDIUM: Create Deal + Task + Team Email
        └─ LOW: Create Deal + Task + Team Email
    → (All converge) → Airtable → Email → Mailchimp
```

---

## Module Placement

These new modules go **between Module 17 (HubSpot Contact) and Module 2444 (existing Router)**.

**Current structure:**
- Module 3: Webhook
- Module 9: Router (spam filter)
- **Module 17: HubSpot - Create/Update Contact** ← You are here
- **🆕 NEW MODULES GO HERE**
- Module 2444: Router (newsletter check)
- Module 2458: Airtable backup
- ... rest of scenario

---

## STEP 1: Add Priority Router (Module 18)

### Where to Add
Click the **"+"** icon after **Module 17 (HubSpot Contact)**

### Module Setup

1. Search for: **"Router"**
2. Select: **"Flow control → Router"**
3. Click **"OK"**

### Configure 3 Routes

#### Route 1: HIGH PRIORITY

Click **"Set filter"** on Route 1:

| Setting | Value |
|---------|-------|
| **Label** | `HIGH Priority (A+ or Consultation)` |
| **Condition 1** | Field: `{{3.lead_score}}` |
|  | Operator: `Greater than or equal to` |
|  | Value: `80` |
| **OR** | (Click "+ Add OR condition") |
| **Condition 2** | Field: `{{3.wants_consultation}}` |
|  | Operator: `Equal to (text)` |
|  | Value: `true` |

Click **"OK"**

#### Route 2: MEDIUM PRIORITY

Click **"Set filter"** on Route 2:

| Setting | Value |
|---------|-------|
| **Label** | `MEDIUM Priority (A Tier)` |
| **Condition 1** | Field: `{{3.lead_score}}` |
|  | Operator: `Greater than or equal to` |
|  | Value: `70` |
| **AND** | (automatically AND) |
| **Condition 2** | Field: `{{3.lead_score}}` |
|  | Operator: `Less than` |
|  | Value: `80` |
| **AND** | |
| **Condition 3** | Field: `{{3.wants_consultation}}` |
|  | Operator: `Not equal to (text)` |
|  | Value: `true` |

Click **"OK"**

#### Route 3: LOW PRIORITY (Nurture)

Click **"Set filter"** on Route 3:

| Setting | Value |
|---------|-------|
| **Label** | `LOW Priority (Nurture)` |
| **Condition 1** | Field: `{{3.lead_score}}` |
|  | Operator: `Less than` |
|  | Value: `70` |
| **AND** | |
| **Condition 2** | Field: `{{3.wants_consultation}}` |
|  | Operator: `Not equal to (text)` |
|  | Value: `true` |

Click **"OK"**

**✅ Checkpoint:** You now have a router with 3 routes configured.

---

## STEP 2: Add Modules to Route 1 (HIGH PRIORITY)

### Module 19A: HubSpot - Create Deal

1. Click **"+"** after Route 1 filter
2. Search: **"HubSpot"**
3. Select: **"HubSpot CRM → Create a Deal"**
4. Connection: Use existing HubSpot connection
5. Click **"OK"**

#### Configure Deal Fields:

| Field | Formula/Value |
|-------|---------------|
| **Deal Name** | `{{3.organization}} - {{3.recommended_tier}}` |
| **Pipeline** | Select: `Active Sales` |
| **Deal Stage** | Select: `Assessment Completed` |
| **Amount** | `{{if(3.recommended_tier = "TIER 1"; 5000; if(3.recommended_tier = "TIER 2"; 20000; 75000))}}` |
| **Deal Owner** | Leave blank (unassigned) |
| **Priority** | Type: `High` |
| **Close Date** | `{{addDays(now; 30)}}` |
| **Deal Type** | Type: `New Business` |
| **Lead Source** | Type: `Assessment - Organic` |

#### Add Custom Properties:

Click **"+ Add item"** for each custom property:

| HubSpot Property | Formula |
|------------------|---------|
| `assessment_id` | `{{3.assessment_id}}` |
| `lead_score` | `{{3.lead_score}}` |
| `gap_level` | `{{3.gap_category}}` |
| `recommended_tier` | `{{3.recommended_tier}}` |
| `wants_consultation` | `{{3.wants_consultation}}` |
| `assessment_completion_date` | `{{3.assessment_completed}}` |

Click **"OK"**

**Note:** Module numbers in your scenario may differ. `{{3}}` refers to the webhook module. `{{17}}` refers to HubSpot Contact module. Adjust if your numbers are different.

---

### Module 20A: HubSpot - Create Task

1. Click **"+"** after Module 19A
2. Search: **"HubSpot"**
3. Select: **"HubSpot CRM → Create a Task"**
4. Connection: Use existing HubSpot connection
5. Click **"OK"**

#### Configure Task Fields:

| Field | Formula/Value |
|-------|---------------|
| **Task Title** | `🚨 Schedule Discovery Call - {{3.name}} - {{3.organization}}` |
| **Task Type** | Select: `Call` |
| **Status** | Select: `Not Started` |
| **Priority** | Select: `High` |
| **Due Date** | `{{addDays(now; 1)}}` |
| **Assigned To** | Leave blank (unassigned) |

#### Associate With Deal:

| Setting | Value |
|---------|-------|
| **Associate with Deal** | Click association dropdown |
| **Deal ID** | Select: `{{19.objectId}}` (output from previous Create Deal module) |

#### Task Body/Notes:

Copy this text into the **Task Body** field:

```
CONSULTATION REQUESTED ✓
Lead Score: {{3.lead_score}} (A+ Priority)
Gap Level: {{3.gap_category}}
Recommended Tier: {{3.recommended_tier}} (${{if(3.recommended_tier = "TIER 1"; "5,000"; if(3.recommended_tier = "TIER 2"; "20,000"; "75,000"))}} opportunity)

CONTACT INFO:
Name: {{3.name}}
Email: {{3.email}}
Organization: {{3.organization}}
Industry: {{3.org_info}}
Role: {{3.role}}

ASSESSMENT RESULTS:
Overall: {{3.overall_score}}/100
- Preparedness: {{3.preparedness_score}}
- Communication: {{3.response_score}}
- Capacity: {{3.support_score}}
- Resilience: {{3.recovery_score}}

Top Gap: {{3.assessment_top_gap}}
Recommended Service: {{3.recommended_service}}

NEXT STEPS:
□ Send meetings link: https://meetings-na2.hubspot.com/josh-garcia/aftermath-solutions
□ Review full assessment in HubSpot contact record
□ Prepare {{3.recommended_tier}} overview + case studies
□ Schedule prep meeting with team (if needed)

HubSpot Contact: https://app.hubspot.com/contacts/YOUR_PORTAL_ID/contact/{{17.vid}}/
```

**Replace `YOUR_PORTAL_ID`** with your actual HubSpot portal ID (found in HubSpot URL).

Click **"OK"**

---

### Module 21A: Email - Team Notification (HIGH)

1. Click **"+"** after Module 20A
2. Search: **"Email"** or **"Gmail"**
3. Select: **"Email → Send an Email"** (or Gmail → Send an Email)
4. Connection: Use existing email connection
5. Click **"OK"**

#### Configure Email:

| Field | Value |
|-------|-------|
| **To** | `team@theaftermathsolutions.com` |
| **From Name** | `Aftermath Assessment Automation` |
| **From Email** | `team@theaftermathsolutions.com` |
| **Reply To** | `team@theaftermathsolutions.com` |
| **Subject** | `🚨 [HOT] New Assessment: {{3.name}} - {{3.organization}} (Score: {{3.lead_score}})` |
| **Content Type** | `HTML` |

#### Email Body:

Click in **Body/Content** field, then click **"Load from file"** or copy/paste from:

**File:** `TEAM-NOTIFICATION-EMAIL-TEMPLATE.html` (in your project folder)

**OR** manually copy the HTML template (see the HTML file we created earlier).

**IMPORTANT SUBSTITUTIONS in HTML:**
- Replace `{{19.objectId}}` with your actual Create Deal module number
- Replace `{{17.vid}}` with your actual HubSpot Contact module number
- Replace `YOUR_PORTAL_ID` with your HubSpot portal ID

Click **"OK"**

**✅ Checkpoint:** Route 1 (HIGH) has 3 modules: Deal, Task, Email.

---

## STEP 3: Add Modules to Route 2 (MEDIUM PRIORITY)

Repeat the same 3 modules as Route 1, with these changes:

### Module 19B: HubSpot - Create Deal (MEDIUM)

Same as 19A, except:
- **Priority:** `Medium` (instead of High)

### Module 20B: HubSpot - Create Task (MEDIUM)

Same as 20A, except:
- **Task Title:** `⚡ Review Assessment & Reach Out - {{3.name}}`
- **Priority:** `Medium`
- **Due Date:** `{{addDays(now; 2)}}` (2 days instead of 1)

### Module 21B: Email - Team Notification (MEDIUM)

Same as 21A, except:
- **Subject:** `⚡ [QUALIFIED] New Assessment: {{3.name}} - {{3.organization}} (Score: {{3.lead_score}})`
- **Email Header Color:** Change from red (#D32F2F) to orange (#FF9800) in HTML

**Tip:** Duplicate Module 21A, then just change subject and header color.

**✅ Checkpoint:** Route 2 (MEDIUM) has 3 modules: Deal, Task, Email.

---

## STEP 4: Add Modules to Route 3 (LOW PRIORITY / Nurture)

Repeat the same 3 modules, with these changes:

### Module 19C: HubSpot - Create Deal (NURTURE)

Same as 19A, except:
- **Pipeline:** `Nurture` (instead of Active Sales)
- **Deal Stage:** `Assessment Completed - Nurture`
- **Priority:** `Low`

### Module 20C: HubSpot - Create Task (NURTURE)

Same as 20A, except:
- **Task Title:** `📋 Add to Nurture Sequence - {{3.name}}`
- **Task Type:** `Email` (instead of Call)
- **Priority:** `Low`
- **Due Date:** `{{addDays(now; 3)}}` (3 days)
- **Task Body:**

```
New assessment - Nurture track
Lead Score: {{3.lead_score}} (B/C tier)
Gap Level: {{3.gap_category}}
Recommended Tier: {{3.recommended_tier}}

CONTACT INFO:
Name: {{3.name}}
Email: {{3.email}}
Organization: {{3.organization}}

NEXT STEPS:
□ Verify Mailchimp nurture sequence is active
□ Monitor email engagement over next 30 days
□ Schedule 30-day follow-up task
□ Look for re-qualification signals (engagement, new budget, triggering event)

HubSpot Contact: https://app.hubspot.com/contacts/YOUR_PORTAL_ID/contact/{{17.vid}}/
```

### Module 21C: Email - Team Notification (NURTURE)

Same as 21A, except:
- **Subject:** `📋 [NURTURE] New Assessment: {{3.name}} - {{3.organization}} (Score: {{3.lead_score}})`
- **Email Header Color:** Change from red to blue (#2196F3) in HTML
- **Content Focus:** Emphasize nurture sequence and long-term cultivation

**✅ Checkpoint:** Route 3 (NURTURE) has 3 modules: Deal, Task, Email.

---

## STEP 5: Converge All Routes

After all 3 routes complete their modules, they need to merge back together.

### Add "Aggregator" Module

1. After the last module on Route 3, click **"+"**
2. Search: **"Aggregator"**
3. Select: **"Tools → Aggregator → Array aggregator"**
4. **Source Module:** Select Module 18 (the Priority Router)
5. Click **"OK"**

**What this does:** Waits for all 3 routes to complete, then continues the scenario.

---

## STEP 6: Connect to Existing Flow

The Aggregator output now connects to your existing **Module 2444 (Newsletter Router)**.

1. Click and drag a connection line from the Aggregator to Module 2444
2. This reconnects to your existing flow
3. The rest of your scenario continues as normal:
   - Airtable backup
   - Thank you email
   - Email queue
   - Mailchimp (if applicable)

---

## STEP 7: Test the Scenario

### Before Testing:

**✅ Pre-flight checklist:**
- [ ] HubSpot pipelines created (Active Sales + Nurture)
- [ ] HubSpot custom deal properties created
- [ ] All 3 routes configured in Router
- [ ] All 9 modules added (3 per route)
- [ ] Aggregator added and connected
- [ ] Email template HTML updated with correct module numbers
- [ ] HubSpot portal ID replaced in links

### Test Process:

1. **Save the scenario** (bottom right)
2. Click **"Run once"** (top right)
3. **Submit a test assessment** with known values:

**Test Case 1: HIGH Priority**
- Lead score: 85
- Wants consultation: true
- Expected: Deal in "Active Sales", High priority task, RED team email

**Test Case 2: MEDIUM Priority**
- Lead score: 75
- Wants consultation: false
- Expected: Deal in "Active Sales", Medium priority task, ORANGE team email

**Test Case 3: LOW Priority**
- Lead score: 55
- Wants consultation: false
- Expected: Deal in "Nurture" pipeline, Low priority task, BLUE team email

### Verify Each Test:

**In Make.com:**
- [ ] All modules executed successfully (green checkmarks)
- [ ] No errors in execution history
- [ ] Correct route activated based on lead score

**In HubSpot:**
- [ ] Contact created/updated with all properties
- [ ] Deal created in correct pipeline
- [ ] Deal has correct stage, amount, priority
- [ ] Custom properties populated (assessment_id, lead_score, etc.)
- [ ] Task created and associated with deal
- [ ] Task has correct due date and priority

**In Email:**
- [ ] Team notification received at team@theaftermathsolutions.com
- [ ] Subject line reflects priority level
- [ ] All data populated correctly (no blank {{variables}})
- [ ] Links work (HubSpot deal, contact, meetings link)
- [ ] Header color matches priority (red/orange/blue)

**In Airtable & Mailchimp:**
- [ ] Airtable backup record created (existing flow still works)
- [ ] Thank you email sent to contact (existing flow still works)
- [ ] Mailchimp subscriber added if applicable (existing flow still works)

---

## STEP 8: Activate the Scenario

Once all tests pass:

1. Fix any errors found during testing
2. Run 2-3 more test submissions to confirm consistency
3. **Turn ON the scenario** (toggle in top right)
4. Scenario now runs automatically on every assessment submission

---

## Common Issues & Solutions

### Issue: Deal not created in HubSpot

**Possible Causes:**
- Pipeline name doesn't match exactly
- HubSpot connection expired
- Missing required deal field

**Solution:**
1. Check Make.com execution history for error message
2. Verify pipeline exists and name matches exactly (case-sensitive)
3. Reconnect HubSpot connection if needed
4. Ensure "Amount" field has a valid number

### Issue: Task not associated with deal

**Possible Causes:**
- Deal ID mapping incorrect
- Deal wasn't created (previous module failed)

**Solution:**
1. Verify Module 19 (Create Deal) executed successfully
2. Check that Task module association uses `{{19.objectId}}`
3. Adjust module number if your scenario numbering differs

### Issue: Email has blank {{variables}}

**Possible Causes:**
- Field names don't match webhook data
- Module number references incorrect

**Solution:**
1. Check webhook data structure (Module 3 output)
2. Verify all `{{3.field_name}}` references match webhook fields
3. Update module numbers if scenario structure changed
4. Test individual variables in a text field first

### Issue: Wrong route activated

**Possible Causes:**
- Router filter conditions incorrect
- lead_score field not number type

**Solution:**
1. Review Router filter logic
2. Ensure `{{3.lead_score}}` is a number (not text)
3. Check for typos in filter conditions
4. Test with console.log to see actual values

### Issue: Existing flow broken

**Possible Causes:**
- Connection to Module 2444 not established
- Aggregator not configured correctly

**Solution:**
1. Ensure Aggregator is connected to Module 2444 (Newsletter Router)
2. Check that all routes flow through Aggregator
3. Verify existing modules still reference correct module numbers

---

## Monitoring & Maintenance

### Daily (2 minutes):
- [ ] Check Make.com execution history for errors
- [ ] Verify team emails arriving
- [ ] Check for unassigned deals in HubSpot

### Weekly (15 minutes):
- [ ] Review deal creation rate and distribution
- [ ] Check task completion rate
- [ ] Spot-check 2-3 team emails for quality
- [ ] Verify data accuracy in HubSpot

### Monthly (30 minutes):
- [ ] Analyze which priority routes are most common
- [ ] Review deal amounts vs actual contract values (adjust if needed)
- [ ] Optimize email template based on team feedback
- [ ] Check Make.com operations usage (upgrade if near limit)

---

## Scenario Backup

**IMPORTANT:** Before making changes, always export a backup:

1. Go to Make.com scenario
2. Click **"..." menu** (top right)
3. Select **"Export blueprint"**
4. Save as: `Aftermath Assessment - Immediate Processing - BACKUP - [DATE].json`
5. Store in project folder

This allows you to restore if something goes wrong.

---

## Summary

You've now added:

✅ **Automated deal creation** in HubSpot for every assessment
✅ **Priority-based routing** (HIGH, MEDIUM, LOW)
✅ **Automatic task assignment** with gameplan details
✅ **Team notification emails** with full context
✅ **Pipeline segmentation** (Active Sales vs Nurture)

**Total New Modules:** 10
- 1 Router (priority check)
- 3 Create Deal modules
- 3 Create Task modules
- 3 Team Email modules
- 1 Aggregator

**Result:** Your team now gets immediate notifications when assessments come in, with deals automatically created, tasks assigned, and a clear gameplan for next steps.

---

## Next Steps

1. ✅ Complete this Make.com setup
2. ⏭️ Train team on claiming deals and completing tasks
3. ⏭️ Monitor for 1 week and optimize
4. ⏭️ Set up Mailchimp nurture sequences for low-score leads
5. ⏭️ Create HubSpot dashboard for pipeline reporting

**Questions?** Check:
- `HUBSPOT-PIPELINE-SETUP-GUIDE.md` - HubSpot configuration
- `TROUBLESHOOTING.md` - Common issues
- `MAKE-COM-COMPLETE-INTEGRATION-GUIDE.md` - Original setup

**Last Updated:** January 2025
**Version:** 1.0
**Status:** Ready for Implementation ✅
