# Google Sheets Backup & Dashboard System

**Purpose:**
1. **Backup** all assessment data (redundancy if HubSpot/Airtable fails)
2. **Email tracking** log (what was sent to whom and when)
3. **Team dashboard** for quick visibility without logging into HubSpot
4. **Conversion funnel** tracking and reporting

**Time to Set Up:** 30 minutes
**Make.com Operations:** +2 per assessment submission (worth it for backup!)

---

## 📊 RECOMMENDED STRUCTURE: ONE MASTER SPREADSHEET

### **Spreadsheet Name:** "Aftermath Assessment Master Log"

**6 Tabs:**
1. **Raw Data** - Complete backup of every submission
2. **Email Log** - Track all automated emails sent
3. **Lead Dashboard** - Real-time lead status and next actions
4. **Conversion Funnel** - Track assessment → consultation → deal
5. **Monthly Summary** - Aggregated metrics by month
6. **Configuration** - Reference data (don't touch!)

---

## 🗂️ TAB 1: RAW DATA (Master Backup)

**Purpose:** Complete backup of every assessment submission

### Column Structure (A-Z+):

| Column | Field Name | Data Source | Example |
|--------|-----------|-------------|---------|
| A | Timestamp | Auto (when row added) | 2025-01-30 14:23:45 |
| B | Assessment ID | `{{1.assessment_id}}` | assess_1706630400_abc |
| C | Name | `{{1.name}}` | Sarah Johnson |
| D | Email | `{{1.email}}` | sarah@school.edu |
| E | Organization | `{{1.organization}}` | Lincoln Middle School |
| F | Role | `{{1.role}}` | Principal |
| G | Org Type | `{{1.org_info}}` | k12_education |
| H | Org Type Other | `{{1.org_info_other}}` | (if other selected) |
| I | Overall Score | `{{1.overall_score}}` | 73 |
| J | Preparedness Score | `{{1.preparedness_score}}` | 58 |
| K | Response Score | `{{1.response_score}}` | 67 |
| L | Recovery Score | `{{1.recovery_score}}` | 81 |
| M | Support Score | `{{1.support_score}}` | 75 |
| N | Lead Score | `{{1.lead_score}}` | 82 |
| O | Gap Level | `{{1.gap_level}}` | significant |
| P | Crisis Experience | `{{1.crisis_experience_ever}}` | yes |
| Q | Crisis Timeline | `{{1.crisis_timeline}}` | within_6_months |
| R | Timeline Focus | `{{1.timeline_focus}}` | before |
| S | Top Gaps | `{{join(1.top_gaps; ", ")}}` | Preparedness, Response |
| T | Wants Consultation | `{{1.wants_consultation}}` | TRUE |
| U | Wants Newsletter | `{{1.wants_newsletter}}` | TRUE |
| V | Wants Training | `{{1.wants_training}}` | FALSE |
| W | Wants Resources | `{{1.wants_resources}}` | TRUE |
| X | Recommended Tier | `{{1.recommended_tier}}` | TIER 2 |
| Y | Recommended Service | `{{1.recommended_service}}` | Crisis Preparedness... |
| Z | reCAPTCHA Score | `{{1.recaptcha_score}}` | 0.9 |
| AA | UTM Source | `{{1.utm_source}}` | google |
| AB | UTM Medium | `{{1.utm_medium}}` | organic |
| AC | UTM Campaign | `{{1.utm_campaign}}` | (if tracked) |
| AD | Referrer | `{{1.referrer}}` | https://example.com |
| AE | HubSpot Contact ID | `{{2.id}}` | 12345678 (from HubSpot module) |
| AF | HubSpot Link | Formula | =HYPERLINK(...) |
| AG | Status | Manual/Formula | New/Contacted/Qualified |
| AH | Assigned To | Manual | Josh/Sallie/Dr. Amy |
| AI | Notes | Manual | Follow-up notes |

### Header Row (Row 1):
```
Bold, frozen, light blue background (#E3F2FD)
```

### Conditional Formatting:

**Lead Score (Column N):**
- ≥ 70: Green background (#D4EDDA)
- 50-69: Yellow background (#FFF3CD)
- < 50: Red background (#F8D7DA)

**Wants Consultation (Column T):**
- TRUE: Bold, green text
- FALSE: Gray text

**Status (Column AG):**
- New: Orange background
- Contacted: Yellow background
- Qualified: Green background
- Lost: Gray background

---

## 📧 TAB 2: EMAIL LOG

**Purpose:** Track every automated email sent from Make.com

### Column Structure:

| Column | Field Name | Data Source | Example |
|--------|-----------|-------------|---------|
| A | Timestamp | Auto | 2025-01-30 14:25:00 |
| B | Email To | `{{1.email}}` | sarah@school.edu |
| C | Recipient Name | `{{1.name}}` | Sarah Johnson |
| D | Email Type | Static/Variable | Welcome Email |
| E | Subject Line | Copy from email | "Your Assessment Results..." |
| F | Trigger | Static | Hot Lead Auto-Response |
| G | Lead Score | `{{1.lead_score}}` | 82 |
| H | Sent From | Static | Make.com Scenario |
| I | Scenario Name | Static | Assessment → HubSpot |
| J | Status | Make.com status | Sent/Failed |
| K | Error (if any) | `{{error}}` | (blank if successful) |

### Email Types to Track:

1. **Welcome Email** - All leads after assessment
2. **Hot Lead Follow-Up** - Lead score ≥ 70
3. **Consultation Confirmation** - When they book
4. **Newsletter Welcome** - First email to newsletter subscribers
5. **Team Alert** - Internal notifications
6. **Error Alert** - If something fails

### Sample Row:
```
2025-01-30 14:25 | sarah@school.edu | Sarah Johnson | Hot Lead Follow-Up |
"Let's Discuss Your Assessment Results" | Auto-trigger (score ≥ 70) | 82 |
Make.com | Assessment Pipeline | Sent | (blank)
```

---

## 🎯 TAB 3: LEAD DASHBOARD

**Purpose:** Real-time view of all active leads with next actions

### Column Structure:

| Column | Field Name | Source | Example |
|--------|-----------|--------|---------|
| A | Name | From Raw Data tab | Sarah Johnson |
| B | Organization | From Raw Data tab | Lincoln Middle School |
| C | Email | From Raw Data tab | sarah@school.edu |
| D | Lead Score | From Raw Data tab | 82 |
| E | Status | Manual | Contacted |
| F | Assigned To | Manual | Josh |
| G | Last Contact Date | Manual | 2025-01-30 |
| H | Days Since Contact | Formula | 2 |
| I | Next Action | Manual | Schedule discovery call |
| J | Next Action Date | Manual | 2025-02-01 |
| K | Wants Consultation? | From Raw Data | ✅ |
| L | Priority | Formula | HOT (based on score) |
| M | HubSpot Link | From Raw Data | [Link] |

### Formulas:

**Column H (Days Since Contact):**
```
=IF(G2="","",TODAY()-G2)
```

**Column L (Priority):**
```
=IF(D2>=70,"🔥 HOT",IF(D2>=50,"⚡ WARM","❄️ COLD"))
```

### Conditional Formatting:

**Days Since Contact (Column H):**
- > 7 days: Red background (urgent follow-up needed)
- 4-7 days: Yellow background (follow-up soon)
- < 4 days: Green background (on track)

**Priority (Column L):**
- 🔥 HOT: Red text, bold
- ⚡ WARM: Orange text
- ❄️ COLD: Blue text

### Filters:
- Filter by Status (New, Contacted, Qualified, etc.)
- Filter by Assigned To (Josh, Sallie, Dr. Amy)
- Filter by Priority (Hot, Warm, Cold)
- Filter by Wants Consultation (Yes/No)

### Sort:
Default sort: Lead Score (high to low)

---

## 📈 TAB 4: CONVERSION FUNNEL

**Purpose:** Track leads through sales process

### Column Structure:

| Column | Stage | Formula/Source | Count |
|--------|-------|---------------|-------|
| A | Total Assessments | `=COUNTA('Raw Data'!C:C)-1` | 150 |
| B | Hot Leads (≥70) | `=COUNTIF('Raw Data'!N:N,">=70")` | 45 |
| C | Consultation Requested | `=COUNTIF('Raw Data'!T:T,TRUE)` | 38 |
| D | Contacted | Manual entry | 32 |
| E | Discovery Call Scheduled | Manual entry | 28 |
| F | Discovery Call Completed | Manual entry | 25 |
| G | Proposal Sent | Manual entry | 20 |
| H | Deal Closed | Manual entry | 12 |

### Conversion Rates:

| Metric | Formula | Example |
|--------|---------|---------|
| Assessment → Hot Lead | `=B2/A2` | 30% |
| Hot Lead → Contacted | `=D2/B2` | 71% |
| Contacted → Discovery | `=E2/D2` | 88% |
| Discovery → Proposal | `=G2/E2` | 71% |
| Proposal → Closed | `=H2/G2` | 60% |
| **Overall: Assessment → Closed** | `=H2/A2` | **8%** |

### Visualization:

**Insert Chart:**
- Type: Funnel chart or Column chart
- Data range: A1:H2
- Title: "Assessment to Deal Funnel"
- Shows drop-off at each stage

**Add sparklines in Column I:**
```
=SPARKLINE(B2:H2)
```
Shows mini chart of funnel progression

---

## 📊 TAB 5: MONTHLY SUMMARY

**Purpose:** Aggregated metrics by month/year

### Structure:

**Rows:** Each month (Jan 2025, Feb 2025, etc.)
**Columns:** Key metrics

| Month | Total Assessments | Avg Score | Hot Leads | Consultations | Deals Closed | Revenue |
|-------|------------------|-----------|-----------|---------------|--------------|---------|
| Jan 2025 | 47 | 68 | 15 | 12 | 4 | $48,000 |
| Feb 2025 | 52 | 71 | 18 | 15 | 6 | $72,000 |
| Mar 2025 | ... | ... | ... | ... | ... | ... |

### Formulas (Example for Jan 2025):

**Total Assessments:**
```
=COUNTIFS('Raw Data'!A:A,">=2025-01-01",'Raw Data'!A:A,"<2025-02-01")
```

**Avg Assessment Score:**
```
=AVERAGEIFS('Raw Data'!I:I,'Raw Data'!A:A,">=2025-01-01",'Raw Data'!A:A,"<2025-02-01")
```

**Hot Leads:**
```
=COUNTIFS('Raw Data'!A:A,">=2025-01-01",'Raw Data'!A:A,"<2025-02-01",'Raw Data'!N:N,">=70")
```

### Charts:

**Chart 1: Assessments Over Time**
- Line chart
- Shows trend month-over-month

**Chart 2: Conversion Rate Trend**
- Line chart
- Shows: Hot Lead %, Consultation %, Deal Close %

**Chart 3: Revenue by Month**
- Column chart
- Cumulative revenue line overlay

---

## ⚙️ TAB 6: CONFIGURATION

**Purpose:** Reference data for dropdowns and lookups

### Section 1: Lead Status Options
```
New
Contacted
Qualified
Discovery Scheduled
Proposal Sent
Closed - Won
Closed - Lost
Nurture
```

### Section 2: Team Members
```
Josh Garcia
Sallie Lynch
Dr. Amy O'Neill
(Future team member)
```

### Section 3: Organization Types Map
```
k12_education = K-12 Education
higher_ed = Higher Education
nonprofit = Nonprofit Organization
government = Government Agency
healthcare = Healthcare Organization
corporate = Corporate/Business
faith_based = Faith-Based Organization
community_center = Community Center
other = Other
```

### Section 4: Email Templates Reference
```
Links to email template docs
Subject line examples
Merge field reference
```

---

## 🔄 MAKE.COM INTEGRATION SETUP

### Scenario Addition: "Log to Google Sheets"

**Add these modules AFTER HubSpot module in your existing scenario:**

### Module 1: Add Row to "Raw Data" Tab

**Module:** Google Sheets → Add a Row

**Connection:** Connect your Google account

**Spreadsheet:** "Aftermath Assessment Master Log"

**Sheet:** "Raw Data"

**Values:** Map all columns (A-AI):

```
Timestamp: {{now}}
Assessment ID: {{1.assessment_id}}
Name: {{1.name}}
Email: {{1.email}}
Organization: {{1.organization}}
Role: {{1.role}}
Org Type: {{1.org_info}}
Org Type Other: {{1.org_info_other}}
Overall Score: {{1.overall_score}}
Preparedness Score: {{1.preparedness_score}}
Response Score: {{1.response_score}}
Recovery Score: {{1.recovery_score}}
Support Score: {{1.support_score}}
Lead Score: {{1.lead_score}}
Gap Level: {{1.gap_level}}
Crisis Experience: {{1.crisis_experience_ever}}
Crisis Timeline: {{1.crisis_timeline}}
Timeline Focus: {{1.timeline_focus}}
Top Gaps: {{join(1.top_gaps; ", ")}}
Wants Consultation: {{1.wants_consultation}}
Wants Newsletter: {{1.wants_newsletter}}
Wants Training: {{1.wants_training}}
Wants Resources: {{1.wants_resources}}
Recommended Tier: {{1.recommended_tier}}
Recommended Service: {{1.recommended_service}}
reCAPTCHA Score: {{1.recaptcha_score}}
UTM Source: {{1.utm_source}}
UTM Medium: {{1.utm_medium}}
UTM Campaign: {{1.utm_campaign}}
Referrer: {{1.referrer}}
HubSpot Contact ID: {{2.id}}
HubSpot Link: https://app.hubspot.com/contacts/YOUR_PORTAL_ID/contact/{{2.id}}
Status: New
Assigned To: (leave blank - manual assignment)
Notes: (leave blank)
```

### Module 2: Add Row to "Email Log" Tab (After Each Email Sent)

**Module:** Google Sheets → Add a Row

**Spreadsheet:** "Aftermath Assessment Master Log"

**Sheet:** "Email Log"

**Values:**

```
Timestamp: {{now}}
Email To: {{1.email}}
Recipient Name: {{1.name}}
Email Type: Hot Lead Follow-Up (or whatever email type)
Subject Line: "Your Assessment Results Are Ready"
Trigger: Auto-trigger (score ≥ 70)
Lead Score: {{1.lead_score}}
Sent From: Make.com
Scenario Name: Assessment → HubSpot Pipeline
Status: Sent
Error: (blank)
```

**Note:** Add this module AFTER every email send module in your scenario

---

## 📊 ADVANCED FEATURES (OPTIONAL)

### Auto-Sync to Lead Dashboard

**Use Google Sheets Formulas:**

In "Lead Dashboard" tab, pull data from "Raw Data":

**Cell A2 (Name):**
```
=FILTER('Raw Data'!C:C,'Raw Data'!AG:AG<>"Lost")
```

This pulls all names except those marked "Lost" in status

**Cell D2 (Lead Score):**
```
=VLOOKUP(A2,'Raw Data'!C:N,12,FALSE)
```

Looks up lead score for each name

### Automatic Status Updates

**Google Apps Script (Advanced):**

Create script to auto-update status based on rules:
- If contacted date is blank and assessment > 7 days ago → Status = "Needs Contact"
- If wants_consultation = TRUE and status = "New" → Status = "Hot - Action Required"

### Email Alerts from Google Sheets

**Use Google Sheets built-in notifications:**

1. Tools → Notification rules
2. Create rule: "Notify me when: Any changes are made"
3. Or: "Notify me when: A row is added" (for new assessments)

### Data Validation

**Add dropdowns for manual fields:**

**Status Column (AG in Raw Data):**
- Data → Data validation
- List from range: Configuration!A2:A9
- Reject input if invalid

**Assigned To Column (AH):**
- List from range: Configuration!B2:B5

---

## 🎯 WHY THIS IS BRILLIANT

### Backup & Redundancy:

1. **If HubSpot goes down:**
   - ✅ You still have all assessment data in Google Sheets
   - ✅ Can manually export and re-import later

2. **If Make.com fails:**
   - ✅ You can manually add rows to Google Sheets
   - ✅ No data loss

3. **If Airtable has issues:**
   - ✅ Google Sheets can serve as temporary project tracker

### Team Visibility:

1. **Anyone can access:**
   - Share Google Sheet with team (view-only or edit)
   - No need for HubSpot license for everyone
   - Real-time updates

2. **Easy reporting:**
   - Pull into Google Slides for presentations
   - Share monthly summary tab with leadership
   - Export to PDF for external sharing

3. **Quick dashboard:**
   - Open "Lead Dashboard" tab
   - See all active leads, priorities, next actions
   - Filter/sort without complex CRM queries

### Cost Savings:

1. **Free HubSpot alternative:**
   - Google Sheets is free (included with Workspace)
   - Can operate entire lead process from Sheets if needed
   - Scale without additional CRM costs

2. **Reporting without BI tools:**
   - Built-in charts and pivots
   - No need for Tableau, Looker, etc.
   - Share with stakeholders easily

---

## 🚀 QUICK START GUIDE

### Step 1: Create Spreadsheet (10 min)

1. Go to Google Sheets: sheets.google.com
2. Create new spreadsheet: "Aftermath Assessment Master Log"
3. Create 6 tabs:
   - Raw Data
   - Email Log
   - Lead Dashboard
   - Conversion Funnel
   - Monthly Summary
   - Configuration
4. Copy column headers from this guide
5. Format headers (bold, freeze row 1, color background)

### Step 2: Add to Make.com (10 min)

1. Open your existing Make.com scenario
2. After HubSpot module, add Google Sheets module
3. Connect Google account
4. Select spreadsheet and "Raw Data" tab
5. Map all fields from webhook to columns
6. Test with one submission

### Step 3: Set Up Formulas (10 min)

1. In "Conversion Funnel" tab, add formulas to count leads
2. In "Monthly Summary" tab, add formulas for current month
3. In "Lead Dashboard" tab, add formulas or manual data entry
4. Add conditional formatting for visual indicators

### Step 4: Share with Team

1. Click "Share" button
2. Add team members
3. Set permissions:
   - Josh: Can edit (full access)
   - Sallie: Can edit (manage leads)
   - Dr. Amy: Can view (see client info)
   - Others: Can view (reporting only)

---

## 📋 TESTING CHECKLIST

After setup:

- [ ] Submit test assessment
- [ ] Verify new row appears in "Raw Data" tab
- [ ] Check timestamp is correct
- [ ] Verify all fields populated
- [ ] Check HubSpot link works (click it)
- [ ] Check conditional formatting applied (lead score colors)
- [ ] Verify "Email Log" captures sent emails
- [ ] Check "Conversion Funnel" counts update
- [ ] Test filters in "Lead Dashboard"
- [ ] Share sheet with one team member (test access)

---

## 🎊 SAMPLE DATA (FOR TESTING)

**Row 2 in Raw Data:**
```
2025-01-30 14:23 | assess_123 | Sarah Johnson | sarah@school.edu |
Lincoln Middle School | Principal | k12_education | | 73 | 58 | 67 | 81 | 75 |
82 | significant | yes | within_6_months | before | Preparedness, Response |
TRUE | TRUE | FALSE | TRUE | TIER 2: Strategic Intensives |
Crisis Preparedness Assessment | 0.9 | google | organic | | | 12345678 |
https://app.hubspot.com/contacts/xxx/contact/12345678 | New | |
```

---

## 💡 PRO TIPS

### Tip 1: Freeze Multiple Rows/Columns

- View → Freeze → 1 row (header)
- View → Freeze → Up to column C (name always visible when scrolling)

### Tip 2: Protect Columns

Protect formula columns so team doesn't accidentally delete:
- Data → Protect sheets and ranges
- Select range (e.g., Column H in Lead Dashboard)
- Set permissions: "Only you can edit"

### Tip 3: Create Filtered Views

Save custom views for different team members:
- Data → Filter views → Create new filter view
- Name: "Josh's Hot Leads"
- Filter: Assigned To = Josh, Priority = HOT
- Each person can have their own view

### Tip 4: Export for Leadership

- File → Download → PDF
- Select "Monthly Summary" tab
- Use for board meetings, investor updates

### Tip 5: Version History

- File → Version history → See version history
- Recover accidentally deleted data
- See who changed what and when

---

## 🔄 MAINTENANCE

### Daily:
- Check "Lead Dashboard" for urgent follow-ups (red rows)
- Update "Last Contact Date" when you reach out

### Weekly:
- Review "Conversion Funnel" metrics
- Update manual fields (contacted, discovery scheduled, etc.)
- Clean up any duplicate rows

### Monthly:
- Add new row to "Monthly Summary"
- Calculate month's metrics
- Archive old data (optional - move to separate sheet)

---

## 📈 FUTURE ENHANCEMENTS

### Phase 2 (Later):

1. **Google Data Studio Dashboard:**
   - Connect to this Google Sheet
   - Build visual dashboards
   - Auto-refresh reports

2. **Zapier/Make.com Two-Way Sync:**
   - Update status in Sheets → Updates HubSpot
   - Bidirectional sync

3. **Mobile App (Google Sheets app):**
   - Edit on phone
   - Get push notifications for new leads

4. **Custom Google Apps Script:**
   - Auto-assign leads based on org type
   - Send email reminders for follow-ups
   - Calculate ROI metrics

---

**Created:** 2025-01-30
**Version:** 1.0
**Status:** Ready to Implement

**YOUR GOOGLE SHEETS COMMAND CENTER AWAITS! 📊🚀**
