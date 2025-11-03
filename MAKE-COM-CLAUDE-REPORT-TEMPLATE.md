# Claude AI Internal Report Template for Make.com

Use this prompt in Make.com to generate an internal discovery call prep report using Claude API.

---

## Make.com Integration Setup

### Module: HTTP → Make a Request (Claude AI)

**URL:** `https://api.anthropic.com/v1/messages`

**Method:** POST

**Headers:**
```
x-api-key: YOUR_ANTHROPIC_API_KEY
anthropic-version: 2023-06-01
content-type: application/json
```

**Body (JSON):**
```json
{
  "model": "claude-3-5-sonnet-20241022",
  "max_tokens": 2048,
  "messages": [
    {
      "role": "user",
      "content": "{{PROMPT_BELOW}}"
    }
  ]
}
```

---

## Claude Prompt Template

Use this as the `content` value in the API call:

```
You are a crisis management consultant preparing for a discovery call with a potential client. Based on their assessment responses, create an internal brief for our consulting team.

CLIENT INFORMATION:
- Name: {{1.name}}
- Email: {{1.email}}
- Organization: {{1.organization}}
- Organization Type: {{1.org_info}}{{if(1.org_info_other, " - " + 1.org_info_other, "")}}

ASSESSMENT SCORES:
- Overall Resilience Score: {{1.overall_score}}/100
- Preparedness: {{1.preparedness_score}}/100
- Response Capability: {{1.response_score}}/100
- Recovery Planning: {{1.recovery_score}}/100
- Support Systems: {{1.support_score}}/100
- Lead Quality Score: {{1.lead_score}}/100

CRISIS EXPERIENCE:
- Has experienced crisis: {{if(1.crisis_experience_ever = "yes", "Yes", "No")}}
{{if(1.crisis_timeline, "- Most recent crisis: " + 1.crisis_timeline, "")}}

TIMELINE FOCUS:
- Primary concern: {{1.timeline_focus}}

CURRENT PLANS:
- Plan status: {{1.current_plan}}

LEADERSHIP CONFIDENCE:
- Confidence level: {{1.leadership_confidence}}

TOP CONCERNS (they selected):
{{join(1.risk_areas, ", ")}}

IDENTIFIED GAPS:
{{join(1.top_gaps, ", ")}}

NEXT STEPS REQUESTED:
{{join(1.next_step, ", ")}}

INTERESTS:
- Wants consultation: {{if(contains(1.next_step, "consultation"), "YES ✓", "No")}}
- Wants report: {{if(contains(1.next_step, "report"), "YES ✓", "No")}}
- Wants training: {{if(contains(1.next_step, "training"), "YES ✓", "No")}}
- Newsletter signup: {{if(contains(1.next_step, "newsletter"), "YES ✓", "No")}}

RECOMMENDED TIER: {{1.recommended_tier}}
RECOMMENDED SERVICE: {{1.recommended_service}}

---

Based on this information, provide:

1. EXECUTIVE SUMMARY
   - 2-3 sentence overview of their current state
   - Level of urgency (High/Medium/Low)

2. KEY INSIGHTS
   - What their responses reveal about their organization
   - Hidden needs they may not have explicitly stated
   - Red flags or concerning patterns

3. DISCOVERY CALL STRATEGY
   A. Opening Questions (3-5 questions to establish rapport and context):
      - [List specific questions based on their responses]

   B. Probing Questions (5-7 questions to uncover deeper needs):
      - [List questions to explore gaps and pain points]

   C. Qualifying Questions (3-4 questions to assess fit and readiness):
      - [Questions about budget, timeline, decision-makers]

4. SERVICE RECOMMENDATIONS
   Based on our service menu (Preparedness, Response, Recovery, Support tiers), recommend:
   - Primary service package: [Which tier and why]
   - Add-on services: [Specific modules they need]
   - Implementation timeline: [Suggested phases]
   - Estimated scope: [S/M/L based on their organization type and gaps]

5. POTENTIAL OBJECTIONS & RESPONSES
   - List 3-4 likely objections based on their profile
   - Suggested responses for each

6. COMPETITIVE POSITIONING
   - Why Aftermath Solutions vs. generic consultants
   - Our unique value prop for this specific client

7. FOLLOW-UP STRATEGY
   - If they're a strong fit (lead score >70): [Immediate next steps]
   - If they're moderate fit (50-70): [Nurture sequence]
   - If they're lower fit (<50): [Resource-share approach]

8. ADDITIONAL NOTES
   - Any other observations or recommendations

Format your response as a professional internal memo that can be quickly scanned before a call.
```

---

## Make.com Workflow

### Complete Scenario Flow:

1. **Webhook Trigger** (receives assessment data)
2. **Filter:** Check reCAPTCHA score >= 0.5
3. **Claude AI Report Generator** (HTTP request as above)
4. **Parse Claude Response**
   - Extract `content[0].text` from Claude API response
5. **HubSpot: Create/Update Contact**
   - Add all assessment data as custom properties
   - Add Claude report to contact notes
6. **HubSpot: Add to List**
   - If `wants_consultation = true`: Add to "Hot Leads - Consultation Requested" list
   - If `wants_newsletter = true`: Add to "Newsletter Subscribers" list
7. **Airtable: Create Record** (optional, for tracking)
8. **Email: Send to Team**
   - Subject: `New Assessment: {{organization}} - Score {{overall_score}}`
   - Body: Include Claude report + link to HubSpot contact
9. **Email: Send to Client** (auto-responder)
   - Thank you email
   - Include link to download PDF results (if implemented)
   - CTA to schedule consultation

---

## HubSpot Custom Properties to Create

Add these to your HubSpot account:

| Property Name | Field Type | Description |
|--------------|------------|-------------|
| `assessment_score` | Number | Overall resilience score |
| `preparedness_score` | Number | Preparedness dimension |
| `response_score` | Number | Response capability |
| `recovery_score` | Number | Recovery planning |
| `support_score` | Number | Support systems |
| `lead_score` | Number | Calculated lead quality |
| `assessment_id` | Text | Unique assessment ID |
| `gap_level` | Dropdown | critical/significant/moderate/minor |
| `recommended_tier` | Dropdown | preparedness/response/recovery/support |
| `wants_consultation` | Checkbox | Requested consultation |
| `wants_newsletter` | Checkbox | Newsletter opt-in |
| `crisis_experience` | Checkbox | Has experienced crisis |
| `org_type` | Dropdown | K12/Higher Ed/Nonprofit/etc |
| `top_concerns` | Text | Comma-separated concerns |
| `recaptcha_score` | Number | Bot detection score |

---

## Sample Output (What Claude Returns)

```
INTERNAL DISCOVERY BRIEF
Client: Lincoln Middle School
Date: 2025-01-30
Lead Score: 82/100 (HOT LEAD)

---

1. EXECUTIVE SUMMARY
Lincoln Middle School presents as a high-urgency prospect with a 73/100 overall resilience score indicating critical gaps. They recently experienced a crisis (within 6 months), have no formal plan in place, and leadership confidence is low ("concerned - we know we have gaps"). Their preparedness score of 58 combined with explicit consultation request signals readiness to invest.

Urgency Level: HIGH

2. KEY INSIGHTS
- Recent Crisis Context: Their recent experience (6 months ago) creates a "burning platform" - they know firsthand what didn't work
- Leadership Awareness: Selecting "concerned - we have gaps" shows self-awareness and less defensiveness than typical clients
- Budget Signals: K-12 education + explicit concern about "coordinating crisis response across teams" suggests multi-building district with budget authority
- Hidden Need: Selected both "emotional impact" AND "trauma support" - indicates they may have had casualties or significant trauma
- Red Flag: No current plan but recent crisis suggests reactive posture rather than proactive

3. DISCOVERY CALL STRATEGY

A. Opening Questions (establish rapport):
   - "Thanks for taking the time. I see you completed our assessment - what prompted you to do that now?"
   - "Can you tell me a bit about your role and how long you've been at Lincoln Middle School?"
   - "Who else would be involved in decisions around crisis preparedness and response?"

B. Probing Questions (uncover needs):
   - "You mentioned experiencing a crisis within the past 6 months. Without getting into specifics if it's sensitive, what surprised you most about how it unfolded?"
   - "What did you wish you had in place before that situation occurred?"
   - "When you think about 'coordinating response across teams' - what specific breakdowns have you seen or worried about?"
   - "Your assessment showed concerns about emotional impact and trauma support. Can you say more about that?"
   - "What have you tried so far to address these gaps? What worked, what didn't?"
   - "If another crisis happened tomorrow, what keeps you up at night about it?"

C. Qualifying Questions (assess fit):
   - "Have you worked with external consultants before? What was that experience like?"
   - "What's your timeline for having something in place?"
   - "Do you have a sense of budget allocated for this, or is that still being determined?"
   - "Who else needs to be part of this conversation before moving forward?"

4. SERVICE RECOMMENDATIONS

Primary Package: **Foundation Builder (Preparedness Tier) + Response Protocol Module**
- Why: They have no plan and recent experience. Start with foundation.
- Specific modules:
  * Crisis Communication Plan (they selected "crisis communications" as concern)
  * Trauma-Informed Response Training (they emphasized emotional/trauma concerns)
  * Cross-Department Coordination Protocols (their explicit need)
  * Bereavement Policy Development (they selected this)

Add-on Services:
- Leadership Confidence Coaching (their score: "concerned")
- 3-Month Post-Implementation Support (given recent crisis, they need sustained support)

Implementation Timeline:
- Phase 1 (Months 1-2): Assessment & Plan Development
- Phase 2 (Months 2-3): Training & Rollout
- Phase 3 (Months 3-6): Sustained Support & Refinement

Estimated Scope: MEDIUM
- K-12 suggests 500-2000 stakeholders
- Multiple concerns suggests comprehensive engagement
- Budget likely in $25K-$50K range for K-12 district

5. POTENTIAL OBJECTIONS & RESPONSES

Objection 1: "We need to check if this is in our budget."
Response: "I understand. Many districts we work with use a combination of general fund, safety grants, and sometimes ESSER or other federal funding. We're happy to help you think through funding sources. What would make it easier for you to explore the budget question?"

Objection 2: "Our staff is already overwhelmed - we can't add more training."
Response: "I hear that. That's actually why our approach is different. We don't pile on more responsibilities - we help you organize what you're already doing into a system that actually lightens the load when a crisis hits. Most clients tell us they feel *more* confident and *less* stressed after our work. Would it help to hear how we've done this with other districts?"

Objection 3: "We should probably handle this internally."
Response: "You absolutely could, and some organizations do. The question is really about opportunity cost and speed. You mentioned wanting to act quickly given your recent experience. Our process takes 60-90 days. How long would it take to build internally, and who would lead it? We often see teams taking 12-18 months and still not feeling confident. What's driving your thinking on this?"

Objection 4: "How do we know this will actually work?"
Response: "Great question. We've worked with 500+ communities, including [name similar district if possible]. Here's what we can do: Let's start with a half-day assessment where you'll walk away with specific recommendations whether you work with us or not. That way you can see our approach firsthand. Does that reduce the risk for you?"

6. COMPETITIVE POSITIONING

Why Aftermath Solutions:
- **Lived Experience**: We don't just teach theory - our team has responded to real crises
- **Education Focus**: Unlike general consultants, we understand K-12 context, compliance requirements (Title IX, Clery Act if they have older students), and school culture
- **Trauma-Informed**: Their emphasis on emotional impact plays to our strength - we integrate trauma response into everything
- **Sustained Support**: We're not "here's a binder" consultants - we stay with you through implementation

Unique Value Prop for This Client:
"You've already lived through a crisis without the right support in place. We make sure that if it happens again - and statistically it will - your team knows exactly what to do, who does it, and how to support your people through it. You'll move from reactive chaos to confident, coordinated response."

7. FOLLOW-UP STRATEGY

STRONG FIT (Score: 82 - YES, this is a strong fit)

Immediate Next Steps:
1. **Within 24 hours**: Send personalized email with:
   - Quick summary of their scores
   - Link to schedule 30-min discovery call
   - One-pager on Foundation Builder + Response package
2. **Day 2**: If no response, call directly (they gave phone number)
3. **Day 3-7**: Send case study of similar school district
4. **Week 2**: Final follow-up with "Is this still a priority?" check-in

If they engage:
- Schedule discovery call → Site visit → Proposal → Contract
- Target close: 2-3 weeks given urgency

If they don't engage:
- Add to quarterly nurture sequence
- Send relevant content (trauma response guides, crisis comm templates)
- Check in after 90 days

8. ADDITIONAL NOTES

- TIMING IS EVERYTHING: Recent crisis + concerns about "we know we have gaps" + explicit consultation request = window of opportunity. Strike while the iron is hot.
- DECISION-MAKER QUESTION: Make sure to identify if this contact IS the decision-maker or if we need to involve superintendent, school board, etc.
- FUNDING SOURCE: Ask early about funding sources - many schools have safety grants or ESSER funds still available
- TESTIMONIAL OPPORTUNITY: If we close this and do good work, recent crisis + transformation could be powerful case study
- RED FLAG TO MONITOR: If they're only tire-kicking or if "recent crisis" was minor, lead score may be inflated. Qualify early.

---

RECOMMENDED FIRST OUTREACH:
Subject: "Your Resilience Equation Results - Lincoln Middle School"
Approach: Empathetic, acknowledging recent challenges, positioning us as partners not vendors
Tone: Confident but not salesy - they already requested consultation
Goal: Schedule 30-min call within 1 week
```

---

## How to Use This in Make.com

1. **Add HTTP Module** after webhook
2. **Configure Claude API** with the prompt template above
3. **Map assessment variables** using {{1.field_name}} syntax from webhook
4. **Parse Claude response:**
   ```
   {{parseJSON(2.body).content[0].text}}
   ```
5. **Send report to team** via email or Slack
6. **Store in HubSpot** contact record as note
7. **Use insights** to personalize outreach

---

## Cost Estimate

- **Claude API Cost**: ~$0.015 per assessment (with Sonnet 3.5)
- **Benefit**: Saves 30-45 minutes of manual analysis per lead
- **ROI**: Immediate, personalized insights for your sales team

---

## Tips for Best Results

1. **Update the prompt** as you learn what works in sales calls
2. **Add your specific service** pricing/packages to the prompt
3. **Include competitor names** if relevant to your market
4. **Customize objections** based on actual objections you hear
5. **A/B test different** prompt versions to see what generates best insights

---

**Last Updated:** 2025-01-30
**Version:** 1.0
