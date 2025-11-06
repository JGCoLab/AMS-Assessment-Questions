# HubSpot Pipeline Setup Guide
## Aftermath Assessment Integration - Deal Automation

**Version:** 1.0
**Last Updated:** January 2025
**HubSpot Tier Required:** Sales Starter (or higher)
**Time Required:** 30-45 minutes

---

## Overview

This guide sets up **two pipelines** in HubSpot to manage assessment-generated leads:

1. **Active Sales Pipeline** - For qualified leads (score 70+)
2. **Nurture Pipeline** - For lower-score leads that need cultivation

---

## STEP 1: Create Custom Deal Properties

Go to: **Settings (gear icon) → Objects → Deals → Properties**

Click **"Create property"** and add these custom properties:

### Property 1: Assessment ID

| Setting | Value |
|---------|-------|
| **Label** | Assessment ID |
| **Internal Name** | `assessment_id` |
| **Field Type** | Single-line text |
| **Group** | Deal Information |
| **Description** | Unique ID linking to the assessment submission |

### Property 2: Lead Score

| Setting | Value |
|---------|-------|
| **Label** | Lead Score |
| **Internal Name** | `lead_score` |
| **Field Type** | Number |
| **Group** | Deal Information |
| **Description** | Assessment lead score (0-100) |

### Property 3: Gap Level

| Setting | Value |
|---------|-------|
| **Label** | Gap Level |
| **Internal Name** | `gap_level` |
| **Field Type** | Dropdown |
| **Group** | Deal Information |
| **Options** | Critical, Significant, Moderate, Minimal |
| **Description** | Organizational resilience gap severity |

### Property 4: Recommended Tier

| Setting | Value |
|---------|-------|
| **Label** | Recommended Service Tier |
| **Internal Name** | `recommended_tier` |
| **Field Type** | Dropdown |
| **Group** | Deal Information |
| **Options** | TIER 1, TIER 2, TIER 3 |
| **Description** | Recommended service tier based on assessment |

### Property 5: Wants Consultation

| Setting | Value |
|---------|-------|
| **Label** | Requested Consultation |
| **Internal Name** | `wants_consultation` |
| **Field Type** | Single checkbox |
| **Group** | Deal Information |
| **Description** | Did contact request a consultation call? |

### Property 6: Assessment Completion Date

| Setting | Value |
|---------|-------|
| **Label** | Assessment Completion Date |
| **Internal Name** | `assessment_completion_date` |
| **Field Type** | Date picker |
| **Group** | Deal Information |
| **Description** | Date the assessment was completed |

**✅ Checkpoint:** You should now have 6 custom deal properties created.

---

## STEP 2: Create Pipeline 1 - Active Sales

Go to: **Settings → Objects → Deals → Pipelines**

Click **"Create pipeline"**

### Pipeline Settings

| Setting | Value |
|---------|-------|
| **Pipeline Name** | Active Sales |
| **Internal Name** | `active_sales` |
| **Description** | Qualified leads from assessments and manual outreach (score 70+) |

### Pipeline Stages

Add these stages in order:

| Stage Name | Internal Name | Probability | Purpose |
|------------|---------------|-------------|---------|
| **New Inquiry** | `new_inquiry` | 10% | Manual entry point for cold outreach |
| **Assessment Completed** | `assessment_completed` | 20% | Auto-entry for qualified assessments (score 70+) |
| **Discovery Scheduled** | `discovery_scheduled` | 40% | Call booked via HubSpot meetings link |
| **Discovery Complete** | `discovery_complete` | 60% | Call completed, needs identified |
| **Proposal Sent** | `proposal_sent` | 70% | Formal proposal delivered |
| **Contract Negotiation** | `contract_negotiation` | 85% | In negotiation/finalizing details |
| **Closed Won** | `closed_won` | 100% | Contract signed - WON! |
| **Closed Lost** | `closed_lost` | 0% | Opportunity lost |

**Stage Notes:**
- **New Inquiry**: Use this for manual cold outreach, referrals, or non-assessment leads
- **Assessment Completed**: Make.com auto-creates deals here for score 70+
- **Discovery Scheduled**: Can auto-progress when HubSpot meeting is booked (optional workflow)
- **Discovery Complete → Closed Lost**: Manual progression only (requires human judgment)

**✅ Checkpoint:** Active Sales pipeline created with 8 stages.

---

## STEP 3: Create Pipeline 2 - Nurture

Click **"Create pipeline"** again

### Pipeline Settings

| Setting | Value |
|---------|-------|
| **Pipeline Name** | Nurture |
| **Internal Name** | `nurture` |
| **Description** | Lower-score leads requiring cultivation (score <70) |

### Pipeline Stages

| Stage Name | Internal Name | Probability | Purpose |
|------------|---------------|-------------|---------|
| **Assessment Completed - Nurture** | `assessment_nurture` | 5% | Auto-entry for score <70 |
| **Engaged** | `engaged` | 15% | Responded to emails/content |
| **Re-Qualified** | `re_qualified` | 30% | Ready to move to Active Sales |
| **Closed - Not a Fit** | `closed_not_fit` | 0% | Determined not a good fit |

**Stage Notes:**
- **Assessment Completed - Nurture**: Make.com auto-creates deals here for score <70
- **Engaged**: Move here when contact responds to nurture emails
- **Re-Qualified**: Move here when ready for active outreach → Then move deal to Active Sales pipeline
- **Closed - Not a Fit**: Use this instead of "Closed Lost" for nurture leads

**How to move deals between pipelines:**
1. Open deal in Nurture pipeline
2. Click "Actions" → "Change pipeline"
3. Select "Active Sales" pipeline
4. Choose appropriate stage (usually "Assessment Completed" or "Discovery Scheduled")

**✅ Checkpoint:** Nurture pipeline created with 4 stages.

---

## STEP 4: Configure Deal Views

Go to: **Sales → Deals**

Create these custom views for team efficiency:

### View 1: Unassigned Deals

1. Click **"Create view"**
2. **Name:** `Unassigned - Need Owner`
3. **Filters:**
   - Deal owner = Unassigned
   - Pipeline = Active Sales OR Nurture
   - Deal stage ≠ Closed Won, Closed Lost, Closed - Not a Fit
4. **Columns:** Deal name, Pipeline, Stage, Create date, Lead score, Priority
5. **Sort:** Create date (newest first)
6. Click **"Save"**

**Purpose:** Shows all new assessment deals waiting to be claimed.

### View 2: Hot Leads (Team View)

1. Click **"Create view"**
2. **Name:** `🚨 Hot Leads - All Team`
3. **Filters:**
   - Priority = High
   - Pipeline = Active Sales
   - Deal stage ≠ Closed Won, Closed Lost
4. **Columns:** Deal name, Stage, Close date, Lead score, Wants consultation, Deal owner
5. **Sort:** Create date (newest first)
6. Click **"Save"**

**Purpose:** Shows high-priority deals across entire team.

### View 3: My Active Deals

1. Click **"Create view"**
2. **Name:** `My Active Deals`
3. **Filters:**
   - Deal owner = [Your Name]
   - Pipeline = Active Sales
   - Deal stage ≠ Closed Won, Closed Lost
4. **Columns:** Deal name, Stage, Close date, Lead score, Last activity date
5. **Sort:** Close date (soonest first)
6. Click **"Save"**

**Purpose:** Personal view of your owned deals.

### View 4: Nurture Track

1. Click **"Create view"**
2. **Name:** `📧 Nurture Track`
3. **Filters:**
   - Pipeline = Nurture
   - Deal stage ≠ Closed - Not a Fit
4. **Columns:** Deal name, Stage, Lead score, Create date, Last activity date, Deal owner
5. **Sort:** Last activity date (oldest first - needs attention)
6. Click **"Save"**

**Purpose:** Monitor nurture pipeline and identify re-qualification opportunities.

**✅ Checkpoint:** 4 custom deal views created for team efficiency.

---

## STEP 5: Set Up Deal Defaults

Go to: **Settings → Objects → Deals → Property defaults**

Set these defaults for new deals:

| Property | Default Value | Reason |
|----------|---------------|--------|
| **Deal Type** | New Business | Most assessment leads are new |
| **Priority** | Medium | Make.com will override based on score |
| **Lead Source** | Assessment - Organic | Can override for manual deals |

**Note:** Make.com will override these values with actual assessment data.

---

## STEP 6: Configure Task Settings

Go to: **Settings → Objects → Tasks**

Ensure these settings:

| Setting | Value |
|---------|-------|
| **Default task queue** | All team members |
| **Task assignment** | Allow unassigned tasks ✓ |
| **Task notifications** | Email when task assigned ✓ |
| **Task reminders** | Day of task due ✓ |

This ensures unassigned tasks from Make.com appear in everyone's task queue.

---

## STEP 7: Create Email Templates (Optional but Recommended)

Go to: **Conversations → Templates**

Create these templates for consistency:

### Template 1: Initial Outreach - High Priority

**Name:** `Assessment Follow-up - Consultation Requested`

**Subject:** `Your Organizational Resilience Assessment - {{contact.firstname}}`

**Body:**
```
Hi {{contact.firstname}},

Thank you for completing the Organizational Resilience Equation for {{contact.company}}. I noticed you requested a consultation to discuss your results.

Your assessment revealed some important opportunities to strengthen your organization's crisis preparedness, particularly in [mention top gap from assessment].

I'd love to schedule a brief 30-minute call to:
• Review your assessment results in detail
• Discuss your specific concerns and goals
• Explore how Aftermath Solutions can support {{contact.company}}

You can schedule directly on my calendar:
https://meetings-na2.hubspot.com/josh-garcia/aftermath-solutions

Or simply reply with a few times that work well for you this week.

Looking forward to connecting!

Best,
[Your Name]
Aftermath Solutions
team@theaftermathsolutions.com
```

### Template 2: Initial Outreach - Medium Priority

**Name:** `Assessment Follow-up - Qualified Lead`

**Subject:** `Your Assessment Results - Next Steps for {{contact.company}}`

**Body:**
```
Hi {{contact.firstname}},

Thanks for taking the time to complete our Organizational Resilience Equation. Your results show some valuable insights about {{contact.company}}'s preparedness.

Based on your assessment, I believe our [TIER X] services could be particularly helpful for addressing [top gap area].

Would you be open to a brief conversation to discuss:
• What your results mean for your organization
• Specific strategies to address the gaps identified
• How we've helped similar organizations in [their sector]

Schedule a free 30-minute consultation:
https://meetings-na2.hubspot.com/josh-garcia/aftermath-solutions

No pressure—just a chance to explore if we might be a good fit.

Best,
[Your Name]
Aftermath Solutions
```

### Template 3: Follow-up (No Response)

**Name:** `Assessment Follow-up #2`

**Subject:** `Following up - {{contact.company}} Assessment`

**Body:**
```
Hi {{contact.firstname}},

I wanted to follow up on the assessment you completed for {{contact.company}}. I know things get busy, so I wanted to make sure you didn't miss my previous email.

Your assessment identified some key opportunities, and I'd love to discuss how we can help—even if it's not right now.

Quick question: Would it be helpful to have a brief call to review your results? No obligation—I just want to make sure you get value from the time you invested in the assessment.

Let me know if you'd like to connect!

Best,
[Your Name]
Aftermath Solutions
```

**✅ Checkpoint:** Email templates created for consistent outreach.

---

## STEP 8: Verify Make.com Can Access Everything

**Test Permissions:**

1. Go to Make.com HubSpot connection
2. Verify these scopes are enabled:
   - ✅ Contacts (read/write)
   - ✅ Deals (read/write)
   - ✅ Tasks (read/write)
   - ✅ Custom properties (read/write)

3. Test in Make.com:
   - Open HubSpot "Create a Deal" module
   - Check that both pipelines appear in dropdown
   - Verify custom properties are visible
   - Confirm task creation works

**If properties or pipelines don't appear:**
1. Click "Refresh" in Make.com module
2. Reconnect HubSpot connection
3. Wait 5 minutes for HubSpot API to sync

---

## STEP 9: Team Training

**Train your team on:**

### Daily Routine (5 minutes)

1. Check **"Unassigned - Need Owner"** view
2. Claim deals by assigning yourself as owner
3. Complete associated tasks
4. Log all activities in HubSpot

### How to Claim a Deal

1. Open deal from Unassigned view
2. Click "Deal owner" field
3. Select your name
4. Deal now appears in "My Active Deals"
5. Complete the associated task

### Task Management

1. Go to **Sales → Tasks**
2. Sort by "Due date"
3. High-priority tasks = Red (urgent)
4. Complete task and log notes in HubSpot
5. Move deal to next stage if appropriate

### When to Move Deals Between Pipelines

**Nurture → Active Sales:**
- Contact responds positively to nurture emails
- Lead score improves (new information)
- Triggering event occurs (crisis, incident, budget approval)
- They request a consultation

**Active Sales → Nurture:**
- "Not ready right now, check back in 6 months"
- Budget issues but interested
- Needs internal buy-in first

---

## STEP 10: Monitoring & Optimization

### Weekly Review (15 minutes)

**Check these metrics:**

1. **Pipeline Health**
   - How many deals in each stage?
   - Are deals progressing or stalling?
   - Average time in each stage?

2. **Team Performance**
   - How many unassigned deals?
   - Response time to new leads?
   - Conversion rate by team member?

3. **Lead Quality**
   - Correlation between lead score and won deals?
   - Which sectors/tiers convert best?
   - Are nurture leads re-qualifying?

**Access Reports:**
- Go to **Reports → Dashboards**
- Create "Assessment Pipeline Dashboard"
- Add these reports:
  - Deals created this week (by source)
  - Deal stage funnel (both pipelines)
  - Average time to close
  - Won/Lost ratio by tier

### Monthly Optimization

**Review and adjust:**

1. **Deal amounts:** Are estimates accurate? Update tier values if needed.
2. **Probability %:** Adjust stage probabilities based on actual conversion rates.
3. **Nurture effectiveness:** Are nurture leads re-qualifying? Improve sequences.
4. **Email templates:** A/B test subject lines and calls-to-action.

---

## Troubleshooting

### Issue: Deals not appearing in HubSpot

**Solution:**
1. Check Make.com scenario execution history
2. Look for errors in "Create Deal" module
3. Verify HubSpot connection is active
4. Check that pipeline names match exactly

### Issue: Custom properties not populating

**Solution:**
1. Verify property internal names match Make.com mapping
2. Check data types (text vs number vs dropdown)
3. Ensure Make.com has "Custom Properties" permission
4. Re-map properties in Make.com module

### Issue: Tasks not assigning to team

**Solution:**
1. Verify "Allow unassigned tasks" is enabled in HubSpot
2. Check task permissions for all team members
3. Ensure notification emails are turned on
4. Test creating manual task to confirm settings

### Issue: Deals stuck in "Assessment Completed"

**Solution:**
1. Train team on stage progression criteria
2. Create workflow to auto-progress when meeting scheduled (if using Pro+)
3. Weekly review of stale deals
4. Set up reminder tasks for follow-up

---

## Summary Checklist

Before launching automation:

- [ ] 6 custom deal properties created
- [ ] Active Sales pipeline created (8 stages)
- [ ] Nurture pipeline created (4 stages)
- [ ] 4 custom deal views created
- [ ] Deal defaults configured
- [ ] Task settings configured
- [ ] Email templates created (optional)
- [ ] Make.com HubSpot connection verified
- [ ] Team trained on deal claiming process
- [ ] Team trained on task management
- [ ] Monitoring dashboard created

---

## Next Steps

1. ✅ Complete this HubSpot setup
2. ⏭️ Import updated Make.com blueprint with deal automation
3. ⏭️ Test with sample assessment submission
4. ⏭️ Verify all automations work correctly
5. ⏭️ Train team and go live!

---

**Questions?** Check the main documentation:
- `MAKE-COM-COMPLETE-INTEGRATION-GUIDE.md` - Full Make.com setup
- `TROUBLESHOOTING.md` - Common issues
- `README.md` - System overview

**Last Updated:** January 2025
**Version:** 1.0
**Status:** Ready for Implementation ✅
