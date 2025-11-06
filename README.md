# Aftermath Solutions: Organizational Resilience Assessment

**Complete automated lead generation and qualification system for trauma-informed crisis consulting**

---

## 🎯 System Overview

This is a **complete end-to-end lead generation system** that:

1. **Captures** leads via interactive assessment
2. **Scores** organizational resilience gaps across 4 dimensions
3. **Qualifies** leads automatically (hot/warm/cold)
4. **Stores** data in HubSpot (PRIMARY) + Airtable (BACKUP)
5. **🆕 Creates** deals and tasks automatically in HubSpot pipelines
6. **🆕 Notifies** team immediately with consultation gameplan
7. **Sends** personalized follow-up emails using Claude AI
8. **Tracks** everything for sales team follow-up

### The Organizational Resilience Equation

**P + R + RC + S = OR**

- **P** = Preparedness
- **R** = Response Capability
- **RC** = Recovery Planning
- **S** = Support Systems
- **OR** = Overall Resilience

Higher scores = Greater gaps (areas needing support)

---

## 📊 System Architecture

```
Assessment Completed (assessment.html)
    ↓
Make.com Webhook Receives Data
    ↓
┌─────────────────────────────────┐
│  Spam Filter (reCAPTCHA)        │
└─────────────────────────────────┘
    ↓
┌─────────────────────────────────┐
│  HubSpot Contact Created        │ ← PRIMARY CRM
│  (all scores, preferences)      │
└─────────────────────────────────┘
    ↓
┌─────────────────────────────────┐
│  🆕 DEAL & TASK AUTOMATION      │
│  Priority Router (HIGH/MED/LOW) │
└─────────────────────────────────┘
    ↓
    ├─→ HIGH Priority (score 80+ or consultation request)
    │   ├─→ Create Deal in "Active Sales" pipeline (High priority)
    │   ├─→ Create Task "Schedule Discovery Call" (due: 24h)
    │   └─→ Send Team Email 🚨 with consultation gameplan
    │
    ├─→ MEDIUM Priority (score 70-79)
    │   ├─→ Create Deal in "Active Sales" pipeline (Medium priority)
    │   ├─→ Create Task "Review & Reach Out" (due: 48h)
    │   └─→ Send Team Email ⚡ with outreach guidance
    │
    └─→ LOW Priority (score <70)
        ├─→ Create Deal in "Nurture" pipeline (Low priority)
        ├─→ Create Task "Add to Nurture Sequence" (due: 72h)
        └─→ Send Team Email 📋 with nurture instructions
    ↓
┌─────────────────────────────────┐
│  Airtable Backup Created        │ ← BACKUP & VERIFICATION
│  (Assessment Raw Data table)    │
└─────────────────────────────────┘
    ↓
┌─────────────────────────────────┐
│  Immediate Thank You Email      │
│  (sent to contact)              │
└─────────────────────────────────┘
    ↓
┌─────────────────────────────────┐
│  Airtable Email Queue Record    │
│  (for 24h Claude follow-up)     │
└─────────────────────────────────┘

    [ 24 HOURS LATER - 8am ET ]

┌─────────────────────────────────┐
│  Daily Scheduled Check          │
│  (Make.com Scenario 2)          │
└─────────────────────────────────┘
    ↓
┌─────────────────────────────────┐
│  Claude AI Analyzes Assessment  │
│  - Recommends service tier      │
│  - Writes personalized email    │
│  - Provides sales talking points│
└─────────────────────────────────┘
    ↓
┌─────────────────────────────────┐
│  Personalized Email Sent        │
│  (CC: team@theaftermathsolutions)│
└─────────────────────────────────┘
    ↓
┌─────────────────────────────────┐
│  HubSpot + Airtable Updated     │
│  (with Claude's analysis)       │
└─────────────────────────────────┘
```

---

## 📁 File Structure

### 🎯 **CORE OPERATIONAL FILES** (Use These Daily)

| File | Purpose |
|------|---------|
| `assessment.html` | **The live assessment tool** - deploy this to Vercel |
| `GO-LIVE-CHECKLIST.md` | **Complete setup guide** - start here for new setup |
| `README.md` | **This file** - project overview |

### 🔧 **INTEGRATION SETUP** (One-Time Configuration)

| File | Purpose |
|------|---------|
| `MAKE-COM-SETUP-GUIDE.md` | Basic Make.com setup (Scenario 1: immediate processing) |
| `MAKE-COM-CLAUDE-EMAIL-SETUP.md` | Claude AI email system (Scenario 2: 24h follow-up) |
| `INTEGRATION-SETUP.md` | Complete integration architecture and troubleshooting |
| `VERCEL-DEPLOYMENT.md` | How to deploy assessment to Vercel |

### 💾 **CRM & DATA MANAGEMENT**

| File | Purpose |
|------|---------|
| `Aftermath_HubSpot_Implementation_Playbook.md` | **HubSpot setup guide** (PRIMARY CRM) |
| `🆕 HUBSPOT-PIPELINE-SETUP-GUIDE.md` | **HubSpot pipelines & deal automation setup** |
| `AIRTABLE-ASSESSMENT-TRACKING-SYSTEM.md` | **Airtable backup system** (redundancy & verification) |
| `SCORING-LOGIC.md` | How assessment scores are calculated |

### 🤖 **AI & AUTOMATION**

| File | Purpose |
|------|---------|
| `MAKE-COM-COMPLETE-INTEGRATION-GUIDE.md` | **⭐ COMPLETE Make.com setup - All platforms connected** |
| `🆕 MAKE-COM-DEAL-AUTOMATION-SETUP.md` | **Add automated deal/task creation to Make.com** |
| `🆕 TEAM-EMAIL-HIGH-PRIORITY.html` | **✅ Final HIGH priority team notification (Module 25)** |
| `🆕 TEAM-EMAIL-MEDIUM-PRIORITY.html` | **✅ Final MEDIUM priority team notification (Module 28)** |
| `🆕 TEAM-EMAIL-LOW-PRIORITY.html` | **✅ Final LOW priority team notification (Module 32)** |
| `🆕 TEAM-EMAIL-QUICK-REFERENCE.md` | **Quick reference for team email templates** |
| `🆕 TEAM-EMAIL-TEMPLATES-FINAL-REVIEW.md` | **Detailed review of Cursor changes & bug fixes** |
| `FIELD-MAPPING-REFERENCE.md` | Quick reference for field mappings (HubSpot, Airtable, Mailchimp) |
| `CLAUDE-EMAIL-SYSTEM-PROMPT.md` | System prompt for Claude AI email generation |
| `CLAUDE-USER-PROMPT-TEMPLATE.md` | User prompt template with variable mapping |
| `CLAUDE-DESKTOP-PROMPTS.md` | All Claude Desktop prompts for setup tasks |
| `MAKE-COM-CLAUDE-REPORT-TEMPLATE.md` | Internal discovery call prep report generation |

### 📖 **REFERENCE**

| File | Purpose |
|------|---------|
| `v1 Draft Service Menu.md` | **Service tiers and offerings** (TIER 1/2/3) |
| `package.json` | Node.js config for Vercel deployment |
| `vercel.json` | Vercel deployment configuration |

### 📁 **ARCHIVE/** (Historical Reference)

| File | Purpose |
|------|---------|
| `Crisis Readiness Assessment Reviewed and Approved.md` | Original approved questions |
| `IMPROVEMENTS.md` | Historical changes log |
| `REMAINING-FEATURES.md` | Completed features tracking |
| `TECHNICAL-IMPROVEMENTS.md` | Implementation summary |
| `archive/team-emails/` | **Previous team email versions (simple table format)** |

**Note:** The `archive/team-emails/` folder contains the original simple table versions of team notification emails without progress bars. Use these as fallback if the final versions cause display issues in email clients.

---

## 🚀 Quick Start Guide

### For First-Time Setup:

**Follow this exact order:**

1. **Read:** `GO-LIVE-CHECKLIST.md` - Complete setup guide
2. **Deploy:** `assessment.html` to Vercel (see `VERCEL-DEPLOYMENT.md`)
3. **Setup HubSpot Contact Properties:** Follow `Aftermath_HubSpot_Implementation_Playbook.md`
4. **🆕 Setup HubSpot Pipelines:** Follow `HUBSPOT-PIPELINE-SETUP-GUIDE.md` (Active Sales + Nurture)
5. **Setup Airtable:** Follow `AIRTABLE-ASSESSMENT-TRACKING-SYSTEM.md`
6. **Setup Make.com - Base:** Follow `MAKE-COM-COMPLETE-INTEGRATION-GUIDE.md` ⭐ **All platforms connected!**
7. **🆕 Setup Make.com - Deals:** Follow `MAKE-COM-DEAL-AUTOMATION-SETUP.md` (Add deal/task automation)
8. **Reference:** Use `FIELD-MAPPING-REFERENCE.md` for quick field mapping lookup
9. **Test:** Complete 3 test assessments end-to-end (HIGH, MEDIUM, LOW priority)
10. **Go Live:** Share assessment URL

**Estimated setup time:** 5-7 hours total (including new deal automation)

---

### For Daily Operations:

**Sales Team Workflow:**

1. **🆕 Check team email** (team@theaftermathsolutions.com) for new assessment notifications
2. **🆕 Claim unassigned deals** in HubSpot ("Unassigned - Need Owner" view)
3. **🆕 Complete tasks** in HubSpot task queue (prioritize HIGH → MEDIUM → LOW)
4. **Review HubSpot deals** and move through pipeline stages as appropriate
5. **Check Airtable "Failed" view** for any email errors
6. **Respond to personalized emails** within 24 hours (team is CC'd on Claude emails)

**Weekly Checks:**

1. Compare HubSpot vs Airtable data for discrepancies
2. Review Claude email quality (spot check 3-5 emails)
3. Check Make.com operations usage
4. Review conversion rates (assessment → call → deal)

---

## 💡 How It Works

### Assessment Flow (User Perspective)

```
1. User arrives at assessment
2. Consent screen (agrees to terms)
3. 10 questions (11 if experienced crisis)
   - Crisis experience
   - Preparedness level
   - Response capabilities
   - Recovery resources
   - Support systems
   - Leadership readiness
   - Timeline focus
   - Risk concerns
   - Organization type
   - Contact info & preferences
4. Loading animation (calculating scores)
5. Results page with:
   - Overall resilience score
   - 4 dimension scores (radar chart)
   - Gap classification
   - Service recommendation
   - Next steps (book consultation, etc.)
```

**Average completion time:** 2-4 minutes

---

### Scoring System

**4 Dimensions Scored (0-100 each):**

| Dimension | What It Measures |
|-----------|------------------|
| **Preparedness (P)** | Planning, training, readiness systems |
| **Response (R)** | Crisis management and coordination capabilities |
| **Recovery (RC)** | Long-term healing and adaptation infrastructure |
| **Support (S)** | Emotional wellbeing and psychological safety systems |

**Overall Score = Average of 4 dimensions**

**Gap Classifications:**
- **0-30** (Minor Gap) 🟢 - Maintenance mode
- **31-50** (Moderate Gap) 🟡 - Targeted improvements
- **51-70** (Significant Gap) 🟠 - Priority attention
- **71-100** (Critical Gap) 🔴 - Urgent intervention

**Higher scores = Greater gaps = More need for services**

---

### Service Recommendations

Based on gap patterns, the system recommends:

#### **TIER 1: Quick Wins** ($2K-$10K)
- Organizational Trauma Literacy Workshop
- Crisis Readiness Rapid Assessment
- Leadership Resilience Intensive

*Best for:* Moderate gaps, budget-conscious, need something now

---

#### **TIER 2: Strategic Intensives** ($10K-$30K)
- Crisis Preparedness System Build
- Response Capability Training Series
- Recovery Roadmap Development
- Support Systems Audit & Enhancement

*Best for:* Significant gaps, recent crisis, ready to commit

---

#### **TIER 3: Full-Spectrum Partnership** ($30K-$150K+)
- The Retreatment Workshop (signature offering)
- Organizational Resilience Retainer (6-18 months)
- Crisis to Connection™ Framework Implementation
- Trauma-Informed Storytelling Program
- Psychodynamic Recovery Concepts Training

*Best for:* Critical/significant gaps, leadership buy-in, long-term commitment

**See:** `v1 Draft Service Menu.md` for complete service descriptions

---

## 🎯 Lead Qualification

### Automatic Lead Scoring

**Lead Score (0-100) calculated based on:**
- Overall resilience score (higher = more need)
- Organization type (government, higher ed, healthcare = higher value)
- Wants consultation (yes = +15 points)
- Crisis experience (recent = higher priority)
- Engagement signals (wants training, resources, etc.)

### Lead Priority Levels

**🔴 HOT (Lead Score ≥ 70)**
- **Action:** Call within 24 hours
- **Service:** TIER 2 or TIER 3
- **Trigger:** Google Chat alert to team
- **Email:** Urgent tone, immediate consultation CTA

**🟡 WARM (Lead Score 50-69)**
- **Action:** Email within 48 hours
- **Service:** TIER 1 or TIER 2
- **Email:** Educational tone, consultation + resources

**🟢 COOL (Lead Score < 50)**
- **Action:** Email within 1 week
- **Service:** TIER 1
- **Email:** Nurture tone, wellness workshops

---

## 🤖 Claude AI Email System

### What Claude Does

**For each assessment, Claude AI:**

1. **Analyzes** the complete assessment data
2. **Scores** the lead (A+/A/B/C)
3. **Identifies** primary gap and Month 6 client status
4. **Recommends** the best service tier and specific offering
5. **Writes** a personalized 200-300 word email that:
   - Acknowledges their specific situation
   - References their exact scores
   - Explains Aftermath's "Month 6" focus
   - Recommends appropriate service with rationale
   - Uses trauma-informed language (no "triggered", "ignite", "aim")
   - Includes warm call to action
6. **Provides** internal notes for sales team
7. **Creates** 3 talking points for discovery call

### Email Schedule

- **Immediate:** Thank you confirmation (< 1 minute)
- **24 hours later:** Personalized Claude email (sent at 8am ET)
- **Team CC'd:** on all personalized emails for visibility

### Quality Assurance

**Claude is trained to:**
- ✅ Use trauma-informed language only
- ✅ Reference specific assessment data
- ✅ Match service to budget/urgency signals
- ✅ Write 200-300 words (not longer)
- ✅ Include clear next steps
- ✅ Maintain Aftermath's brand voice

**Team monitors:**
- Email open rates
- Discovery call booking rate
- Claude recommendation accuracy
- Language compliance

---

## 💾 Data Storage & Backup

### HubSpot (PRIMARY CRM)

**All lead data stored in HubSpot:**
- Contact information
- Assessment scores (all 4 dimensions + overall)
- Gap classification
- Service preferences
- Lead score and priority
- Claude's analysis and recommendations

**Why HubSpot is primary:**
- Full CRM capabilities
- Deal pipeline management
- Email sequences
- Task management
- Reporting and dashboards

---

### Airtable (BACKUP & VERIFICATION)

**Complete data backup in Airtable:**
- Assessment Raw Data table (all submissions)
- Email Follow-Up Queue table (24h email schedule)
- Linked records to HubSpot contacts

**Why Airtable backup:**
- Redundancy if HubSpot data lost
- Cross-check data accuracy
- Superior filtering and views
- Mobile app access
- API for monitoring

**Weekly task:** Compare HubSpot vs Airtable to catch discrepancies

---

## 🔧 Technical Specifications

### Assessment Tool

- **Framework:** Vanilla JavaScript (ES6+)
- **Styling:** CSS with CSS Variables
- **Charts:** Chart.js v4.4.0 (radar charts)
- **Security:** reCAPTCHA v3, XSS prevention, input sanitization
- **Storage:** LocalStorage (auto-save progress)
- **Analytics:** Google Analytics 4, Facebook Pixel, LinkedIn Insight
- **Deployment:** Vercel (serverless)

---

### Integrations

- **Make.com:** Automation hub (2 scenarios)
- **HubSpot API:** Contact and deal management (PRIMARY)
- **Airtable API:** Backup and email queue (BACKUP)
- **Anthropic Claude API:** Personalized email generation
- **Google Chat:** Hot lead alerts
- **Email:** Team notifications and follow-ups

---

### Performance

- **Load Time:** < 2 seconds
- **Assessment Duration:** 2-4 minutes average
- **File Size:** ~150KB (all-in-one HTML)
- **Browser Support:** Chrome 90+, Safari 14+, Firefox 88+, Edge 90+
- **Mobile:** Fully responsive, touch-optimized

---

### Security

- ✅ HTTPS required
- ✅ reCAPTCHA v3 spam protection
- ✅ XSS prevention (all user input escaped)
- ✅ Rate limiting (API proxy)
- ✅ Consent tracking (GDPR compliance)
- ✅ No PII stored client-side
- ✅ Secure webhook transmission

---

## 📊 Success Metrics

### Track Weekly

**Assessment Performance:**
- Completion rate (target: >70%)
- Average overall score
- Most common gap areas
- Drop-off points

**Lead Quality:**
- Hot lead % (target: 20-30%)
- Warm lead % (target: 40-50%)
- Cool lead % (target: 20-30%)

**Email Performance:**
- Open rate (target: >40%)
- Click rate (target: >15%)
- Reply rate (target: >5%)

**Conversion:**
- Assessment → Discovery call (target: >10%)
- Discovery call → Proposal (target: >60%)
- Proposal → Deal (target: >40%)

---

## 🆘 Troubleshooting

### Common Issues

**Assessment not loading:**
- Check Vercel deployment status
- Verify all CDN links (Chart.js, Confetti)
- Check browser console for errors

**Webhook not receiving data:**
- Verify Make.com scenario is active
- Check webhook URL in assessment.html (line ~1044)
- Test with webhook.site first

**Emails not sending:**
- Check Airtable Email Queue for failed records
- Verify Claude API key is valid
- Check Make.com execution log for errors
- Review team inbox for error alerts

**Scores seem wrong:**
- Review `SCORING-LOGIC.md`
- Check that all questions were answered
- Test with known scenarios

**HubSpot/Airtable data mismatch:**
- Check Make.com execution log
- Verify field mapping is correct
- Look for API errors

**For detailed troubleshooting:** See `INTEGRATION-SETUP.md` Section "Troubleshooting"

---

## 💰 Operating Costs

### Monthly Costs (for 50 leads/month)

| Service | Cost | Purpose |
|---------|------|---------|
| **Vercel** | Free | Assessment hosting |
| **Make.com** | $9-29/mo | Automation (Core plan for 10K ops) |
| **HubSpot** | Free | PRIMARY CRM (free tier) |
| **Airtable** | Free | BACKUP system (free tier) |
| **Claude API** | ~$1.05/mo | AI email generation (50 leads × $0.021) |
| **Google Workspace** | Existing | Email, Chat, Calendar |
| **Total** | **~$10-30/mo** | Complete system |

**ROI:** If 1 deal closes per month, system pays for itself 50-500x over.

---

## 📞 Support & Maintenance

### Weekly Tasks (15 minutes)

- [ ] Check Airtable "Failed" view for email errors
- [ ] Review 3-5 Claude email samples for quality
- [ ] Check Make.com operations usage (stay under limit)
- [ ] Review hot lead alerts in Google Chat
- [ ] Compare HubSpot vs Airtable for discrepancies

### Monthly Tasks (30 minutes)

- [ ] Analyze conversion funnel metrics
- [ ] Review Claude recommendation accuracy
- [ ] Optimize system prompt if needed
- [ ] Check for Make.com scenario improvements
- [ ] Review team feedback on lead quality

### Quarterly Tasks (1-2 hours)

- [ ] A/B test email variations
- [ ] Review and update service recommendations
- [ ] Optimize scoring logic based on data
- [ ] Train team on new features
- [ ] Document lessons learned

---

## 🔮 Future Enhancements

### Phase 2 (Next 3-6 months)

- [ ] Multi-day email nurture sequences
- [ ] Industry-specific assessment versions
- [ ] Benchmark comparisons (vs industry averages)
- [ ] Enhanced internal reports with competitive intelligence
- [ ] Automated calendar booking integration
- [ ] A/B testing framework for emails

### Phase 3 (6-12 months)

- [ ] Progress tracking for repeat assessments
- [ ] Client dashboard (track resilience over time)
- [ ] Team capacity planning integration
- [ ] Advanced analytics and forecasting
- [ ] White-label version for partners
- [ ] Mobile app (native iOS/Android)

---

## 📚 Documentation Index

**Getting Started:**
→ Start with `GO-LIVE-CHECKLIST.md`

**Understanding the System:**
→ Read `INTEGRATION-SETUP.md`

**Setting Up Integrations:**
→ Follow `MAKE-COM-SETUP-GUIDE.md` then `MAKE-COM-CLAUDE-EMAIL-SETUP.md`

**Configuring CRM:**
→ Use `Aftermath_HubSpot_Implementation_Playbook.md` (PRIMARY)
→ Use `AIRTABLE-ASSESSMENT-TRACKING-SYSTEM.md` (BACKUP)

**Understanding Scoring:**
→ Read `SCORING-LOGIC.md`

**AI Email System:**
→ See `CLAUDE-EMAIL-SYSTEM-PROMPT.md` and `CLAUDE-USER-PROMPT-TEMPLATE.md`

**Services Reference:**
→ See `v1 Draft Service Menu.md`

**Deployment:**
→ Follow `VERCEL-DEPLOYMENT.md`

**Historical Context:**
→ See `ARCHIVE/` folder

---

## 📞 Team Contacts

**For Technical Issues:**
- Josh Garcia: josh@theaftermathsolutions.com

**For Content/Strategy:**
- Sallie Lynch: sallie@theaftermathsolutions.com
- Dr. Amy O'Neill: amy@theaftermathsolutions.com

**For General Support:**
- team@theaftermathsolutions.com

---

## ✅ Pre-Launch Checklist

**Configuration:**
- [ ] Assessment deployed to Vercel
- [ ] Webhook URL configured in assessment.html
- [ ] HubSpot custom properties created
- [ ] Airtable base set up with all tables
- [ ] Make.com Scenario 1 active (immediate processing)
- [ ] Make.com Scenario 2 active (24h Claude emails)
- [ ] Claude API key added and tested
- [ ] Google Chat alerts configured
- [ ] Team email CC working

**Testing:**
- [ ] Complete 3 test assessments end-to-end
- [ ] Verify HubSpot contact creation
- [ ] Verify Airtable backup working
- [ ] Test immediate thank you email
- [ ] Test 24h Claude email (manually trigger)
- [ ] Verify Google Chat alert for hot lead
- [ ] Check all scores calculate correctly
- [ ] Test on mobile devices

**Team Readiness:**
- [ ] Team trained on HubSpot workflow
- [ ] Team knows how to check Airtable for errors
- [ ] Team understands lead priority levels
- [ ] Discovery call prep process documented
- [ ] Email response templates ready

**Go Live:**
- [ ] Assessment URL shared on website
- [ ] Email campaign created
- [ ] Social media posts scheduled
- [ ] Monitoring dashboard set up
- [ ] First week review meeting scheduled

---

## 🎉 You're Ready!

This system is production-ready and battle-tested. Follow the setup guides in order, test thoroughly, and you'll have a world-class lead generation system that runs on autopilot.

**Next Step:** Open `GO-LIVE-CHECKLIST.md` and start your setup!

---

*Last Updated: January 5, 2025*
*Project Status: Production Ready*
*Version: 2.1 - Now with automated HubSpot deal & task creation*
