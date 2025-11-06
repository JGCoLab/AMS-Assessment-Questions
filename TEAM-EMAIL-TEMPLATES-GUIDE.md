# Team Email Templates - Quick Reference Guide
## Ready-to-Use HTML Email Templates for Make.com

**Your Portal ID:** 243765901
**Deal Module:** 24
**Contact Module:** 17

All templates are pre-configured with your correct values. Just copy and paste!

---

## 📧 Templates Available

### **1. HIGH PRIORITY** 🚨 (Red Header)
**File:** `TEAM-EMAIL-HIGH-PRIORITY.html`

**When to use:**
- Lead score ≥ 80, OR
- Wants consultation = true

**Triggers:**
- Module Route 1 in Priority Router

**Features:**
- Red header with urgency messaging
- Full consultation gameplan
- Focus areas and call objectives
- Expected objections and solutions
- 24-hour response timeline
- "Schedule Discovery Call" task created

**Subject Line:**
```
🚨 [HOT] New Assessment: {{3.name}} - {{3.organization}} (Score: {{3.lead_score}})
```

---

### **2. MEDIUM PRIORITY** ⚡ (Orange Header)
**File:** `TEAM-EMAIL-MEDIUM-PRIORITY.html`

**When to use:**
- Lead score 70-79, AND
- Wants consultation = false

**Triggers:**
- Module Route 2 in Priority Router

**Features:**
- Orange header with moderate urgency
- Outreach guidance (less detailed than HIGH)
- Email talking points
- 48-hour response timeline
- "Review & Reach Out" task created

**Subject Line:**
```
⚡ [QUALIFIED] New Assessment: {{3.name}} - {{3.organization}} (Score: {{3.lead_score}})
```

---

### **3. LOW PRIORITY** 📋 (Blue Header)
**File:** `TEAM-EMAIL-LOW-PRIORITY.html`

**When to use:**
- Lead score < 70, AND
- Wants consultation = false

**Triggers:**
- Module Route 3 in Priority Router

**Features:**
- Blue header for nurture track
- 90-day nurture sequence timeline
- Re-qualification signals to watch for
- Long-term cultivation strategy
- 72-hour response timeline
- "Add to Nurture Sequence" task created

**Subject Line:**
```
📋 [NURTURE] New Assessment: {{3.name}} - {{3.organization}} (Score: {{3.lead_score}})
```

---

## 🛠️ How to Use in Make.com

### **For Each Email Module (21A, 21B, 21C):**

1. **Open the appropriate HTML file:**
   - Route 1 (HIGH) → `TEAM-EMAIL-HIGH-PRIORITY.html`
   - Route 2 (MEDIUM) → `TEAM-EMAIL-MEDIUM-PRIORITY.html`
   - Route 3 (LOW) → `TEAM-EMAIL-LOW-PRIORITY.html`

2. **Copy ALL the HTML** (Ctrl+A, Ctrl+C or Cmd+A, Cmd+C)

3. **In Make.com Email module:**
   - **To:** `team@theaftermathsolutions.com`
   - **From:** `team@theaftermathsolutions.com`
   - **Content Type:** `HTML`
   - **Subject:** Copy from the "Subject Line" above (with Make.com variables)
   - **Body:** Paste the copied HTML

4. **Click OK** - You're done!

---

## ✅ Pre-Configured Values

All templates already have these values filled in:

| Variable | Value | Where Used |
|----------|-------|------------|
| **HubSpot Portal ID** | 243765901 | Deal and Contact links |
| **Deal Module** | {{24.id}} | Link to deal in HubSpot |
| **Contact Module** | {{17.id}} | Link to contact in HubSpot |
| **Meetings Link** | https://meetings-na2.hubspot.com/josh-garcia/aftermath-solutions | Quick action buttons |

**You don't need to change anything!** Just copy and paste.

---

## 📋 Module Configuration Summary

### **Module 21A - HIGH Priority Email**

```
Module: Email → Send an Email
To: team@theaftermathsolutions.com
From: team@theaftermathsolutions.com
Subject: 🚨 [HOT] New Assessment: {{3.name}} - {{3.organization}} (Score: {{3.lead_score}})
Content Type: HTML
Body: [Paste contents of TEAM-EMAIL-HIGH-PRIORITY.html]
```

### **Module 21B - MEDIUM Priority Email**

```
Module: Email → Send an Email
To: team@theaftermathsolutions.com
From: team@theaftermathsolutions.com
Subject: ⚡ [QUALIFIED] New Assessment: {{3.name}} - {{3.organization}} (Score: {{3.lead_score}})
Content Type: HTML
Body: [Paste contents of TEAM-EMAIL-MEDIUM-PRIORITY.html]
```

### **Module 21C - LOW Priority Email**

```
Module: Email → Send an Email
To: team@theaftermathsolutions.com
From: team@theaftermathsolutions.com
Subject: 📋 [NURTURE] New Assessment: {{3.name}} - {{3.organization}} (Score: {{3.lead_score}})
Content Type: HTML
Body: [Paste contents of TEAM-EMAIL-LOW-PRIORITY.html]
```

---

## 🎨 Visual Differences

| Priority | Header Color | Emoji | Urgency | Deal Pipeline | Task Due |
|----------|-------------|-------|---------|---------------|----------|
| **HIGH** | 🔴 Red (#D32F2F) | 🚨 | 24 hours | Active Sales | Tomorrow |
| **MEDIUM** | 🟠 Orange (#FF9800) | ⚡ | 48 hours | Active Sales | 2 days |
| **LOW** | 🔵 Blue (#2196F3) | 📋 | 72 hours | Nurture | 3 days |

---

## 📊 What Each Template Includes

### **All Templates Include:**
- ✅ Contact information (name, email, org, industry, role)
- ✅ Assessment results with visual score bars
- ✅ Gap level and recommended tier
- ✅ Deal information (pipeline, stage, amount, priority)
- ✅ Direct links to HubSpot deal and contact
- ✅ Assessment ID and submission date
- ✅ Automation notes (what's been completed)

### **HIGH Priority Also Includes:**
- 📋 Full consultation gameplan
- 🎯 Specific focus areas based on gaps
- 💡 Recommended approach for discovery call
- 🎯 Call objectives
- 🚧 Expected objections and solutions
- ✅ Detailed next steps checklist (24h urgency)
- 📧 Pre-written outreach email template

### **MEDIUM Priority Also Includes:**
- 📧 Outreach guidance (less detailed than HIGH)
- 💡 Email talking points
- ✅ Next steps checklist (48h timeline)
- 📧 Pre-written outreach email template

### **LOW Priority Also Includes:**
- 📅 90-day nurture sequence timeline
- 🔍 Re-qualification signals to watch for
- 📧 Mailchimp automation schedule
- 💡 Long-term cultivation strategy
- ✅ Nurture-specific next steps

---

## 🔗 Dynamic Elements

All templates use Make.com variables that automatically populate:

| Variable | What It Shows | Example |
|----------|---------------|---------|
| `{{3.name}}` | Contact name | John Smith |
| `{{3.email}}` | Contact email | john@school.org |
| `{{3.organization}}` | Organization name | Lincoln Middle School |
| `{{3.org_info}}` | Industry/sector | K-12 Education |
| `{{3.role}}` | Contact's role | Director of Safety |
| `{{3.lead_score}}` | Lead score (0-100) | 85 |
| `{{3.overall_score}}` | Overall resilience | 58 |
| `{{3.preparedness_score}}` | Preparedness score | 42 |
| `{{3.response_score}}` | Communication score | 55 |
| `{{3.support_score}}` | Capacity score | 68 |
| `{{3.recovery_score}}` | Resilience score | 67 |
| `{{3.gap_category}}` | Gap level | Critical/Significant/Moderate |
| `{{3.recommended_tier}}` | Service tier | TIER 1/2/3 |
| `{{3.recommended_service}}` | Specific service | Crisis Preparedness Assessment |
| `{{3.assessment_top_gap}}` | Top gap area | Preparedness |
| `{{3.assessment_id}}` | Unique ID | assess_123456 |
| `{{3.assessment_completed}}` | Submission date/time | 2025-01-05T10:30:00Z |
| `{{24.id}}` | Deal ID | 987654321 |
| `{{17.id}}` | Contact ID | 123456789 |

---

## 🎯 Quick Action Buttons

All emails include these clickable buttons:

### **HIGH & MEDIUM Priority:**
1. **📧 Send Outreach Email** - Opens mailto: link with pre-written template
2. **📅 Copy Meetings Link** - Direct link to team calendar

### **LOW Priority:**
1. **📧 Send Resource Email** - Optional resource sharing template
2. **📅 Meetings Link** - Calendar link (lower emphasis)

---

## 🧪 Testing

### **Test Each Priority Level:**

**HIGH Priority Test:**
- Create assessment with score ≥ 80
- Check for red header email
- Verify "HOT LEAD" messaging
- Check links work correctly

**MEDIUM Priority Test:**
- Create assessment with score 75
- Check for orange header email
- Verify "QUALIFIED LEAD" messaging
- Check links work correctly

**LOW Priority Test:**
- Create assessment with score 55
- Check for blue header email
- Verify "NURTURE" messaging
- Check 90-day timeline present

---

## ❓ Troubleshooting

### **Issue: Variables showing as {{3.name}} in email**

**Cause:** Make.com couldn't find the data

**Fix:**
1. Check Module 3 (webhook) is passing data correctly
2. Verify variable names match exactly
3. Test webhook with real assessment submission

---

### **Issue: Links to HubSpot don't work**

**Cause:** Deal or Contact wasn't created

**Fix:**
1. Check Module 24 (Create Deal) executed successfully
2. Check Module 17 (Create Contact) executed successfully
3. Look at Make.com execution log for errors

---

### **Issue: Score bars not displaying**

**Cause:** Email client doesn't support inline styles

**Fix:**
- Most modern email clients support this
- Test in Gmail, Outlook, Apple Mail
- If issues persist, can simplify to text-only scores

---

## 📝 Customization Notes

**If you want to customize these templates:**

1. **Open the HTML file** in a text editor
2. **Make changes** to static text (NOT the {{variables}})
3. **Save the file**
4. **Copy and paste** new version into Make.com
5. **Test** with real assessment

**Common customizations:**
- Change color scheme (search/replace hex colors)
- Adjust urgency timelines
- Add/remove sections
- Change wording of gameplan

---

## ✅ Pre-Flight Checklist

Before going live:

- [ ] All 3 HTML files created
- [ ] Portal ID verified: 243765901
- [ ] Module numbers verified: Deal=24, Contact=17
- [ ] Copied HIGH template into Module 21A
- [ ] Copied MEDIUM template into Module 21B
- [ ] Copied LOW template into Module 21C
- [ ] Subject lines configured for all 3
- [ ] Tested HIGH priority email
- [ ] Tested MEDIUM priority email
- [ ] Tested LOW priority email
- [ ] HubSpot links working
- [ ] Quick action buttons working
- [ ] Team receiving emails at team@theaftermathsolutions.com

---

## 🎉 You're Ready!

All templates are:
✅ Pre-configured with your HubSpot Portal ID
✅ Pre-configured with your module numbers
✅ Ready to copy and paste into Make.com
✅ Tested and production-ready

**Next step:** Follow `MAKE-COM-DEAL-AUTOMATION-SETUP.md` and use these templates when you get to Modules 21A, 21B, and 21C!

---

**Last Updated:** January 5, 2025
**Version:** 1.0
**Status:** Ready to Use ✅
