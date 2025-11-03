# Claude AI User Prompt Template
## For Make.com Integration

**This is the prompt that Make.com will send to Claude for each assessment.**

Copy this entire template into your Make.com "Claude" module (or HTTP request to Anthropic API).

---

## 📝 PROMPT TEMPLATE (Use in Make.com)

```
ASSESSMENT ANALYSIS REQUEST

Please analyze this organizational resilience assessment and provide personalized recommendations.

CONTACT INFORMATION:
- Name: {{name}}
- Organization: {{organization}}
- Email: {{email}}
- Role: {{role}}
- Organization Type: {{org_info}}

ASSESSMENT SCORES:
- Overall Resilience Score: {{overall_score}}/100 (Gap Level: {{gap_level}})
- Preparedness Score: {{preparedness_score}}/100
- Response Capability Score: {{response_score}}/100
- Recovery Planning Score: {{recovery_score}}/100
- Support Systems Score: {{support_score}}/100
- Lead Quality Score: {{lead_score}}/100

PRIMARY GAPS IDENTIFIED:
{{#each top_gaps}}
- {{this}}
{{/each}}

CRISIS HISTORY:
- Has experienced crisis before: {{crisis_experience_ever}}
{{#if crisis_timeline}}
- Timeline: {{crisis_timeline}}
{{/if}}

INTERESTS & REQUESTS:
- Wants consultation: {{wants_consultation}}
- Wants newsletter: {{wants_newsletter}}
- Wants training: {{wants_training}}
- Wants resources: {{wants_resources}}

DETAILED ASSESSMENT RESPONSES:

Q1: Crisis Experience
Answer: {{crisis_experience_ever}}
{{#if crisis_timeline}}Timeline: {{crisis_timeline}}{{/if}}

Q2: Current Preparedness
Answer: {{crisis_readiness}}

Q3: Crisis Response Plans
Answer: {{crisis_response_plans}}

Q4: Past Crisis Handling
Answer: {{crisis_handling_actual}}

Q5: Recovery Resources
Answer: {{recovery_plans}}

Q6: Support Systems
Answer: {{support_systems}}

Q7: Leadership Readiness
Answer: {{leadership_readiness}}

Q8: Timeline Focus
Answer: {{timeline_focus}}

Q9: Risk Areas of Concern
Answer: {{risk_areas}}

Q10: Organization Type
Answer: {{org_info}}

SYSTEM RECOMMENDATIONS:
- Recommended Tier: {{recommended_tier}}
- Recommended Service: {{recommended_service}}
- Solving For: {{solving_for}}

ADDITIONAL CONTEXT:
- Submission Date: {{submission_date}}
- reCAPTCHA Score: {{recaptcha_score}} (spam confidence)
- UTM Source: {{utm_source}}
- UTM Campaign: {{utm_campaign}}

---

TASK:
Based on the system prompt guidelines and this assessment data:

1. Analyze their organizational resilience profile
2. Determine lead priority (High/Medium/Low)
3. Identify if they are a "Month 6 Client" (long-term recovery need)
4. Select the BEST service recommendation from the tier structure
5. Write a personalized, trauma-informed email (200-300 words) that:
   - Acknowledges their specific situation
   - References their assessment scores and gap areas
   - Explains Aftermath's Month 6 focus and unique approach
   - Recommends the appropriate service with clear rationale
   - Includes a warm, clear call to action
   - Uses trauma-informed language (no: triggered, ignite, aim, anniversary)
   - Mentions survivor-informed + clinical expertise
6. Provide internal notes for the sales team

CRITICAL: Respond with ONLY the JSON object specified in the system prompt. No markdown, no code blocks, no text before or after the JSON.

Return your analysis now.
```

---

## 🔄 MAKE.COM VARIABLE MAPPING

When setting up the Claude module in Make.com, map these variables from your webhook:

| Make.com Variable | Webhook Field |
|-------------------|---------------|
| `{{name}}` | `{{1.name}}` |
| `{{organization}}` | `{{1.organization}}` |
| `{{email}}` | `{{1.email}}` |
| `{{role}}` | `{{1.role}}` |
| `{{org_info}}` | `{{1.org_info}}` |
| `{{overall_score}}` | `{{1.overall_score}}` |
| `{{preparedness_score}}` | `{{1.preparedness_score}}` |
| `{{response_score}}` | `{{1.response_score}}` |
| `{{recovery_score}}` | `{{1.recovery_score}}` |
| `{{support_score}}` | `{{1.support_score}}` |
| `{{lead_score}}` | `{{1.lead_score}}` |
| `{{gap_level}}` | `{{1.gap_level}}` |
| `{{top_gaps}}` | `{{join(1.top_gaps; ", ")}}` |
| `{{crisis_experience_ever}}` | `{{1.crisis_experience_ever}}` |
| `{{crisis_timeline}}` | `{{1.crisis_timeline}}` |
| `{{wants_consultation}}` | `{{1.wants_consultation}}` |
| `{{wants_newsletter}}` | `{{1.wants_newsletter}}` |
| `{{wants_training}}` | `{{1.wants_training}}` |
| `{{wants_resources}}` | `{{1.wants_resources}}` |
| `{{crisis_readiness}}` | `{{1.crisis_readiness}}` |
| `{{crisis_response_plans}}` | `{{1.crisis_response_plans}}` |
| `{{crisis_handling_actual}}` | `{{1.crisis_handling_actual}}` |
| `{{recovery_plans}}` | `{{1.recovery_plans}}` |
| `{{support_systems}}` | `{{1.support_systems}}` |
| `{{leadership_readiness}}` | `{{1.leadership_readiness}}` |
| `{{timeline_focus}}` | `{{1.timeline_focus}}` |
| `{{risk_areas}}` | `{{1.risk_areas}}` |
| `{{recommended_tier}}` | `{{1.recommended_tier}}` |
| `{{recommended_service}}` | `{{1.recommended_service}}` |
| `{{solving_for}}` | `{{1.solving_for}}` |
| `{{submission_date}}` | `{{formatDate(now; "MMMM D, YYYY")}}` |
| `{{recaptcha_score}}` | `{{1.recaptcha_score}}` |
| `{{utm_source}}` | `{{1.utm_source}}` |
| `{{utm_campaign}}` | `{{1.utm_campaign}}` |

---

## 🔗 ALTERNATIVE: Using Anthropic API Directly

If Make.com doesn't have a native Claude module, use the HTTP module:

**Module:** HTTP > Make a Request

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
  "max_tokens": 4096,
  "system": "[PASTE ENTIRE SYSTEM PROMPT FROM CLAUDE-EMAIL-SYSTEM-PROMPT.MD]",
  "messages": [
    {
      "role": "user",
      "content": "[PASTE USER PROMPT TEMPLATE FROM ABOVE WITH VARIABLE MAPPING]"
    }
  ]
}
```

**Parse Response:**
- Claude's response will be in: `{{content[0].text}}`
- This will be the JSON object you need to parse
- Use "Parse JSON" module in Make.com to extract fields

---

## 🧪 TESTING YOUR PROMPT

Before going live, test with these scenarios:

### Test 1: Hot Lead (High Priority)
```json
{
  "name": "Sarah Johnson",
  "organization": "Lincoln Middle School",
  "role": "Principal",
  "overall_score": 75,
  "gap_level": "Significant",
  "crisis_experience_ever": "yes",
  "crisis_timeline": "3-6 months ago",
  "wants_consultation": true,
  "lead_score": 85
}
```

**Expected Output:**
- lead_priority: "High"
- recommended_tier: "TIER 2" or "TIER 3"
- discovery_call_urgency: "immediate"
- month_six_client: true

---

### Test 2: Warm Lead (Medium Priority)
```json
{
  "name": "Michael Chen",
  "organization": "TechStart Inc",
  "role": "Operations Manager",
  "overall_score": 58,
  "gap_level": "Moderate",
  "crisis_experience_ever": "no",
  "wants_consultation": false,
  "wants_training": true,
  "lead_score": 62
}
```

**Expected Output:**
- lead_priority: "Medium"
- recommended_tier: "TIER 1" or "TIER 2"
- discovery_call_urgency: "this-week"
- month_six_client: false

---

### Test 3: Cold Lead (Low Priority)
```json
{
  "name": "Emily Rodriguez",
  "organization": "Community Center",
  "role": "Coordinator",
  "overall_score": 35,
  "gap_level": "Minor",
  "crisis_experience_ever": "no",
  "wants_consultation": false,
  "wants_newsletter": true,
  "lead_score": 42
}
```

**Expected Output:**
- lead_priority: "Low"
- recommended_tier: "TIER 1"
- discovery_call_urgency: "low-priority"
- month_six_client: false

---

## ✅ VALIDATION CHECKLIST

After Claude returns JSON, Make.com should validate:

- [ ] JSON is valid and parseable
- [ ] All required fields present
- [ ] lead_score is A+, A, B, or C
- [ ] lead_priority is High, Medium, or Low
- [ ] recommended_tier is TIER 1, 2, or 3
- [ ] email_body is 200-400 words
- [ ] No forbidden words in email (triggered, ignite, aim, anniversary)
- [ ] email_subject is under 60 characters
- [ ] key_talking_points has 3 items

If validation fails, send error alert to team and use fallback email template.

---

**Next Step:** Use this prompt template in the Make.com blueprint I'm creating for you.
