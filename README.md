# Aftermath Solutions Crisis Readiness Assessment

## 🎯 Project Overview

A comprehensive, research-backed assessment tool that evaluates organizational crisis preparedness and provides personalized service recommendations based on identified gaps.

### Purpose
- **Sales Tool**: Qualify leads and match them to appropriate services
- **Consultation Prep**: Provide detailed data to prepare for client calls
- **Gap Analysis**: Identify specific organizational needs across 4 dimensions
- **Lead Generation**: Capture contact information and service preferences

---

## 📁 File Structure

```
aftermath-assessment/
├── assessment.html                                    # Main assessment tool (LAUNCH THIS)
├── SCORING-LOGIC.md                                   # Detailed scoring methodology
├── Crisis Readiness Assessment Reviewed and Approved.md  # Approved questions (DO NOT EDIT)
├── v1 Draft Service Menu.md                          # Approved services (DO NOT EDIT)
└── README.md                                          # This file
```

---

## 🚀 Quick Start Guide

### Step 1: Configure Webhook
1. Open `assessment.html` in a text editor
2. Find line 1076: `webhookURL: 'YOUR_WEBHOOK_URL_HERE'`
3. Replace with your Make.com or Zapier webhook URL
4. Save the file

### Step 2: Upload to Web Server
Upload `assessment.html` to your web hosting:
- **Via cPanel**: File Manager → public_html → Upload
- **Via FTP**: Use FileZilla or similar to upload to web root
- **Via Hosting Provider**: Use your hosting control panel

### Step 3: Test the Assessment
1. Visit the URL where you uploaded the file
2. Complete the entire assessment
3. Verify webhook receives data
4. Check that results display correctly

### Step 4: Go Live
- Share the assessment URL on your website
- Use in email campaigns
- Include in social media posts
- Add to consultation booking pages

---

## 📊 How It Works

### Assessment Flow
```
Consent Screen → Questions (1-10) → Loading Animation → Results → CRM Integration
```

### Question Logic
- **10 questions total** (11 if they've experienced a crisis)
- **Conditional logic**: Q1a only appears if Q1 is "Yes"
- **Multiple question types**: Single choice, multiple choice, text input
- **Progress tracking**: Visual progress bar with confetti at midpoint

### Scoring System
The assessment calculates gap scores across **4 dimensions**:

| Dimension | What It Measures | Score Range |
|-----------|------------------|-------------|
| **Preparedness** | Planning, training, readiness systems | 0-100 |
| **Response** | Crisis management and coordination | 0-100 |
| **Recovery** | Long-term healing infrastructure | 0-100 |
| **Support** | Emotional wellbeing systems | 0-100 |

**Higher scores = Greater gaps/needs**

### Gap Classifications
- **0-30**: Minor Gap (Green) - Maintenance needed
- **31-50**: Moderate Gap (Yellow) - Targeted improvements
- **51-70**: Significant Gap (Orange) - Priority attention
- **71-100**: Critical Gap (Red) - Urgent intervention

---

## 💼 Service Recommendations

The assessment automatically recommends services from your **V1 Draft Service Menu** based on gap patterns:

### Recommendation Logic

| Gap Pattern | Recommended Service | Tier |
|-------------|---------------------|------|
| Overall > 60 OR 3+ dimensions > 50 | Full-Spectrum Partnership | TIER 3 Consulting |
| Recovery OR Support highest | Crisis Preparedness Assessment & Implementation | TIER 2 Intensive |
| Preparedness highest | Crisis Preparedness Assessment & Implementation | TIER 2 Intensive |
| Response highest | Leadership Resilience Intensive | TIER 2 Intensive |
| Overall < 40 (Low gaps) | Wellness Workshops | TIER 1 Workshops |

**Special Cases:**
- Healthcare organizations with trauma concerns → Clinician Resilience Intensive
- All low gaps → Wellness workshops to maintain readiness

---

## 📧 Data Collection & Workflow

### What Data Is Collected

**Assessment Responses:**
- Crisis experience and readiness level
- Current support systems
- Capability strengths and gaps
- Timeline priorities
- Leadership confidence
- Risk areas of concern
- Organization type and size

**Contact Information:**
- Name
- Organization
- Work email
- Role/title

**Preferences:**
- Next step interests (consultation, report, resources, etc.)
- Service preferences

**Calculated Data:**
- Gap scores (all 4 dimensions + overall)
- Gap classification level
- Top 3 priority gaps
- Recommended service tier and specific offering

### Webhook Payload Structure

```json
{
  "has_consented": true,
  "consent_timestamp": "2025-10-29T12:00:00Z",
  "overall_score": 58,
  "preparedness_score": 65,
  "response_score": 52,
  "recovery_score": 60,
  "support_score": 55,
  "gap_level": "significant",
  "crisis_experience_ever": "yes",
  "crisis_experience_recent": "major_crisis",
  "crisis_readiness": "outdated",
  "support_systems": "informal",
  "capability_assessment": ["communication", "business_continuity"],
  "timeline_focus": "after_long",
  "leadership_readiness": "uncertain",
  "risk_areas": ["coordination", "emotional", "trauma_support"],
  "org_info": "higher_ed",
  "name": "John Smith",
  "organization": "State University",
  "email": "jsmith@university.edu",
  "role": "Emergency Manager",
  "next_step": ["consultation", "report"],
  "top_gaps": ["Recovery Support", "Wellbeing Systems", "Response Capability"],
  "recommended_tier": "TIER 2: Strategic Intensives",
  "recommended_service": "Crisis Preparedness Assessment & Implementation",
  "recommended_pricing": "$15,000 - $20,000",
  "needs_report": true,
  "wants_consultation": true,
  "assessment_completed": "2025-10-29T12:05:00Z"
}
```

---

## 🎨 Report Generation Workflow

### Current Setup
When a user requests a detailed report (Question 10):
1. Assessment data is sent to webhook
2. `needs_report: true` flag is included
3. **Aftermath team reviews** assessment data
4. Team prepares customized report
5. Report is sent to client email within 48-72 hours

### What to Include in Custom Reports

**Section 1: Executive Summary**
- Overall gap score and classification
- Top 3 priority gaps identified
- Organization-specific context

**Section 2: Detailed Gap Analysis**
- Breakdown of all 4 dimensions
- Radar chart visualization
- Specific concerns they mentioned (Q7)

**Section 3: Recommendations**
- Primary recommended service (with pricing)
- Alternative options
- Implementation timeline
- Expected outcomes

**Section 4: Next Steps**
- Consultation scheduling link
- Resources and templates
- Contact information

### Automation Opportunities (Future)
- Auto-generate PDF reports using Make.com + PDF generator
- Email automation for report delivery
- CRM integration to track report sends

---

## 🔧 Technical Specifications

### Technology Stack
- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: CSS with CSS Variables
- **Charts**: Chart.js v4.4.0 (radar charts)
- **Animations**: Canvas Confetti v1.6.0
- **Integration**: Webhook (Make.com, Zapier, or custom)

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Safari 14+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS 14+, Android)

### Performance
- **Load Time**: < 2 seconds
- **Assessment Duration**: 2-4 minutes average
- **File Size**: ~150KB (all-in-one HTML)
- **Dependencies**: 2 CDN libraries (Chart.js, Confetti)

---

## 📞 Preparing for Consultation Calls

### Before the Call

1. **Review their webhook data** in your CRM or Make.com
2. **Check their scores**:
   - Overall gap score
   - Highest dimension (their biggest need)
   - Top 3 specific gaps
3. **Review their answers**:
   - Q2 (Readiness level) - their self-assessment
   - Q3 (Support systems) - what they have now
   - Q4 (Capabilities) - their strengths
   - Q7 (Risk areas) - their specific concerns
4. **Note their context**:
   - Organization type (Q8)
   - Recent crisis experience? (Q1/Q1a)
   - Timeline focus (Q5) - before, during, or after crisis

### During the Call

**Opening (2-3 min):**
- "I reviewed your assessment. You scored [X] overall, with your highest needs in [dimension]."
- "You mentioned being concerned about [their Q7 answers]. Tell me more about that."

**Discovery (10-15 min):**
- Ask about their Q1 answer (crisis experience)
- Explore their Q7 risk areas in detail
- Understand their timeline (Q5) - why that priority?
- Current support systems (Q3) - what's working, what's not?

**Recommendation (5-10 min):**
- Present the assessment's recommended service
- Map to their specific gap pattern
- Show alternatives if budget is a concern
- Discuss timeline and expected outcomes

**Next Steps (2-3 min):**
- Outline implementation process
- Provide pricing details
- Schedule follow-up or send proposal
- Answer questions

### Key Questions to Ask

1. **Context**: "Tell me more about [their crisis experience from Q1]."
2. **Urgency**: "What's driving your focus on [their timeline answer]?"
3. **Constraints**: "What resources do you have available for this work?"
4. **Decision-making**: "Who else needs to be involved in this decision?"
5. **Timeline**: "What's your ideal timeline for getting started?"

---

## 🎯 Lead Qualification

Use assessment scores to prioritize follow-up:

### 🔴 High Priority (Score > 60)
- **Action**: Call within 24 hours
- **Offer**: Immediate consultation
- **Message**: "Your assessment shows critical gaps. Let's talk this week."
- **Service Tier**: TIER 3 or TIER 2

### 🟡 Medium Priority (Score 40-60)
- **Action**: Email within 48 hours
- **Offer**: Consultation + resources
- **Message**: "Your assessment shows significant opportunities. Here's what we recommend."
- **Service Tier**: TIER 2

### 🟢 Low Priority (Score < 40)
- **Action**: Email within 1 week
- **Offer**: Wellness workshops
- **Message**: "Great readiness! Maintain it with ongoing training."
- **Service Tier**: TIER 1

### 🌟 Hot Leads (Regardless of Score)
If they selected:
- ✅ "Schedule a free 30-minute consultation"
- ✅ "Send me a detailed assessment report"
- ✅ "Learn about training opportunities"

→ **Call within 24 hours**

---

## 📈 Data & Analytics

### Aggregate Data You Can Track

**Completion Metrics:**
- Total assessments started
- Total assessments completed
- Completion rate
- Average time to complete
- Drop-off points

**Scoring Insights:**
- Average overall score
- Average score by dimension
- Most common gap areas
- Gap patterns by organization type

**Service Demand:**
- Most recommended service tier
- Most requested next steps
- Consultation request rate
- Report request rate

**Organizational Patterns:**
- Most common organization types
- Gap patterns by sector (K-12 vs. corporate vs. healthcare)
- Crisis experience by sector
- Timeline priorities by sector

### Year-End Reporting Examples
- "X% of organizations identified recovery support as their highest gap"
- "Schools were Y% more likely to need support with trauma and grief"
- "Organizations with recent crisis experience still scored high in preparedness gaps"
- "Most requested service: [Service name]"

---

## 🔐 Privacy & Compliance

### Data Protection
- ✅ Consent required before data collection
- ✅ Consent timestamp recorded
- ✅ No PII stored client-side
- ✅ HTTPS required for production
- ✅ Privacy notice displayed upfront

### What Users Agree To
- Assessment is evaluation tool, not professional consultation
- Data used for personalized results
- Aggregate anonymized data used for research
- Contact only if they request follow-up
- No sharing with third parties

### Legal Considerations
- Review disclaimer with legal team
- Update privacy policy as needed
- Ensure GDPR/CCPA compliance if applicable
- Store data securely in CRM

---

## 🛠️ Customization Options

### Easy Customizations (No Coding)
1. **Webhook URL**: Line 1076 in assessment.html
2. **Booking Link**: Line 1077 (HubSpot meetings link)
3. **Contact Email**: Line 1078
4. **Confetti Trigger**: Line 1079 (which question fires confetti)

### Advanced Customizations (Requires Coding Knowledge)
1. **Add/Remove Questions**: Edit `questions` object (starts line 1082)
2. **Adjust Scoring**: Edit `calculateDetailedScores()` function (starts line ~2500)
3. **Change Service Recommendations**: Edit `recommendService()` function
4. **Modify Color Scheme**: Update CSS variables (lines 17-35)
5. **Add Analytics**: Add tracking code in submission function

### When to Get Help
- Changing scoring logic (consult SCORING-LOGIC.md)
- Major question restructuring (may affect scoring)
- Integration with other systems (CRM, email, etc.)

---

## 🐛 Troubleshooting

### Common Issues

**Webhook not receiving data:**
1. Check webhook URL is correct (line 1076)
2. Verify Make.com/Zapier webhook is active
3. Check browser console for errors (F12 → Console)
4. Test with a tool like webhook.site first

**Scores seem incorrect:**
1. Review SCORING-LOGIC.md for expected behavior
2. Check console for calculation errors
3. Verify all questions are being answered
4. Test with known scenarios

**Mobile display issues:**
1. Check viewport meta tag is present
2. Test on multiple devices
3. Verify touch events work on choice cards
4. Check responsive breakpoints (line 1600+)

**Chart not displaying:**
1. Verify Chart.js CDN is loading (line 16)
2. Check browser console for errors
3. Ensure canvas element has proper sizing
4. Test in different browsers

---

## 📋 Pre-Launch Checklist

### Configuration
- [ ] Webhook URL configured (line 1076)
- [ ] Booking URL updated (line 1077)
- [ ] Contact email correct (line 1078)
- [ ] Test webhook receives data

### Testing
- [ ] Complete full assessment on desktop
- [ ] Complete full assessment on mobile
- [ ] Test all question types work
- [ ] Verify conditional Q1a appears correctly
- [ ] Check results display properly
- [ ] Confirm radar chart renders
- [ ] Test service recommendations
- [ ] Verify all next step options work

### Content Review
- [ ] All questions approved by team
- [ ] Service descriptions match V1 Draft Service Menu
- [ ] Pricing information accurate
- [ ] Contact information correct
- [ ] Legal disclaimer approved

### Technical
- [ ] Upload to web server
- [ ] HTTPS enabled
- [ ] Test on all target browsers
- [ ] Check load time (< 2 sec)
- [ ] Verify mobile responsiveness

### Marketing
- [ ] Landing page created
- [ ] Email campaign ready
- [ ] Social media posts scheduled
- [ ] Staff trained on interpreting results

---

## 📞 Support & Contact

### For Technical Issues
- **Josh Garcia**: josh@theaftermathsolutions.com

### For Content/Strategy Questions
- **Sallie Lynch**: sallie@theaftermathsolutions.com
- **Dr. Amy O'Neill**: amy@theaftermathsolutions.com

### For Scoring Logic Clarification
- Review SCORING-LOGIC.md first
- Contact Josh if questions remain

---

## 📝 Version History

- **v2.0** (October 29, 2025): Launch-ready version
  - Integrated V1 Draft Service Menu
  - Added wellness workshop recommendations
  - Included report generation workflow
  - Added comprehensive scoring documentation
  - Streamlined file structure

- **v1.0** (October 2025): Initial development
  - Basic assessment structure
  - Scoring algorithm implementation
  - Webhook integration

---

## 🎉 Launch Tips

### Soft Launch (Recommended)
1. **Week 1**: Share with 5-10 trusted contacts for feedback
2. **Week 2**: Refine based on feedback, monitor data quality
3. **Week 3**: Expand to email list and social media
4. **Week 4**: Full launch on website and all channels

### Promotion Ideas
- **Email Campaign**: "Discover Your Crisis Readiness in 2 Minutes"
- **LinkedIn Post**: "Free Assessment: Is Your Organization Ready?"
- **Website CTA**: "Take the Free Assessment →"
- **Conference/Speaking**: "Take our assessment to prepare for today's session"
- **Consultation Follow-up**: "Not ready to book? Start with our assessment"

### Success Metrics
- **Target Completion Rate**: > 70%
- **Target Consultation Conversion**: > 20%
- **Target Average Score**: 40-60 (validates tool)
- **Target Report Requests**: > 30%

---

## 🌟 Future Enhancements

### Phase 2 (Next 3-6 Months)
- Automated PDF report generation
- Email sequence based on scores
- Integration with HubSpot deal stages
- A/B testing on questions and copy

### Phase 3 (6-12 Months)
- Industry-specific versions (K-12, healthcare, corporate)
- Interactive results dashboard
- Benchmark comparisons
- Progress tracking for repeat assessments

---

*Questions about this README? Contact the Aftermath team.*

*Last Updated: October 29, 2025*
