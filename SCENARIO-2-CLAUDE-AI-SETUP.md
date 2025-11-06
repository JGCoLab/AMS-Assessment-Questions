# Scenario 2: Claude AI Follow-Up Emails
## Step-by-Step Build Guide

**What This Does:**
- Runs daily at 8:00 AM ET
- Finds assessments completed 24 hours ago
- Uses Claude AI to generate personalized follow-up emails
- Sends emails to contacts automatically
- Marks records as processed in Airtable

**Time Required:** 30-45 minutes (simplified with native Claude module!)

**Modules:** 6 total (Schedule → Airtable → Iterator → Claude → Gmail → Airtable Update)

---

## STEP 1: Get Your Claude API Key

**Before starting, you need a Claude API key:**

1. Go to: https://console.anthropic.com/
2. Sign in (or create account)
3. Click **"API Keys"** in sidebar
4. Click **"Create Key"**
5. Name it: `Aftermath Follow-Up Emails`
6. **Copy the key** - You'll need it in Module 4

**Pricing:** ~$0.10 per email (very affordable)
- Model: Claude 3.5 Sonnet
- Cost: ~$3 per token (input) and ~$15 per token (output)
- Average email: 1,000 tokens = $0.10

---

## STEP 2: Create New Scenario in Make.com

1. Go to: https://www.make.com/
2. Click **"Scenarios"** in left sidebar
3. Click **"Create a new scenario"**
4. Name it: `Aftermath Assessment - Claude Follow-up Emails`
5. Click **"Continue"**

---

## STEP 3: Add MODULE 1 - Schedule Trigger

**What it does:** Runs the scenario every day at 8:00 AM

1. Click the **"+"** in the center
2. Search: `schedule`
3. Select: **"Tools → Schedule → Every day"**
4. Configure:
   - **Time:** `08:00` (8:00 AM)
   - **Time zone:** `America/New_York` (Eastern Time)
   - **Start date:** Today
   - **End date:** Leave blank
5. Click **"OK"**

---

## STEP 4: Add MODULE 2 - Airtable Search

**What it does:** Finds emails that need to be sent (24 hours after assessment)

1. Click **"+"** after Schedule module
2. Search: `airtable`
3. Select: **"Airtable → Search records"**
4. **Connection:** Create or use existing Airtable connection
5. Configure:
   - **Base:** `Lead Pipeline Dashboard`
   - **Table:** `📧 Email Follow-Up Queue`
   - **Formula:** (Paste this exactly)
     ```
     AND(
       {Processed} = FALSE(),
       {Status} = 'Queued',
       IS_AFTER(
         {Submission Timestamp},
         DATEADD(NOW(), -25, 'hours')
       ),
       IS_BEFORE(
         {Submission Timestamp},
         DATEADD(NOW(), -23, 'hours')
       )
     )
     ```
   - **Max records:** `50`
6. Click **"OK"**

**What the formula does:**
- Finds records NOT processed yet
- With status = "Queued"
- Submitted 23-25 hours ago (24h window with buffer)

---

## STEP 5: Add MODULE 3 - Iterator

**What it does:** Processes each record one at a time

1. Click **"+"** after Airtable module
2. Search: `iterator`
3. Select: **"Flow control → Iterator"**
4. **Array:** Click the field and select the **entire bundle array** from Module 2 (Airtable)
   - It should show as: `{{2.[]}}` or similar
5. Click **"OK"**

---

## STEP 6: Add MODULE 4 - Claude AI

**What it does:** Generates personalized follow-up email using Claude AI

1. Click **"+"** after Iterator
2. Search: `claude` or `anthropic`
3. Select: **"Claude (Anthropic) → Create a Message"**
4. **Connection:** Click "Add" to create new connection
   - **Connection name:** `Claude - Aftermath Emails`
   - **API Key:** Paste your API key from Step 1
   - Click **"Save"**

5. **Configure the module:**

   **Model:** `claude-3-5-sonnet-20241022`

   **Max Tokens:** `4000`

   **Temperature:** `0.7`

   **System Prompt:** (Paste this exactly)
   ```
   You are a compassionate crisis preparedness consultant at Aftermath Solutions with deep expertise in organizational trauma and crisis systems.

   Your role is to write STELLAR marketing emails that demonstrate expertise while analyzing assessment results. These emails should make recipients think "Wow, they really understand this - we need them."

   CORE OBJECTIVES:
   1. Demonstrate deep pattern recognition and expertise
   2. Validate strengths while revealing hidden risks
   3. Create urgency through insight (not fear)
   4. Show industry-specific knowledge
   5. Ask questions that create "oh shit" moments of realization
   6. Recommend services that genuinely fit their needs

   CRITICAL - UNDERSTANDING THE SCORES (GAP ANALYSIS):
   - All scores are GAP SCORES: HIGHER = BIGGER PROBLEM (0-100 scale)
   - 0-30 = Minor Gap (excellent readiness, maintenance only)
   - 31-50 = Moderate Gap (solid foundation, targeted improvements needed)
   - 51-70 = Significant Gap (priority attention required)
   - 71-100 = Critical Gap (urgent intervention needed)

   SCORE INTERPRETATION:
   - LOWER scores = STRENGTHS (they're doing well in this area)
   - HIGHER scores = GAPS (they need help in this area)
   - Overall Score is the average of all dimension gaps
   - The "Top Gap" field identifies the SPECIFIC weakness within the highest gap category

   EXPERT DEMONSTRATION TECHNIQUES - USE THESE TO BE STELLAR:

   1. PATTERN RECOGNITION:
      Identify meaningful combinations of scores. Examples:
      - "Strong preparedness but weak communication = the 'phantom plan problem' - plans that become invisible under stress"
      - "High support gap + high recovery gap = you're good in the moment but struggle with long-term healing"
      - "Low preparedness but high response = you're reactive, handling fires well but not preventing them"

   2. CASCADING RISK ANALYSIS:
      Show how gaps compound each other. Examples:
      - "Your communication gap actually undermines your preparedness work - even good plans fail if no one knows who activates them"
      - "Without support systems, your response efforts create secondary trauma in responders themselves"
      - "Leadership uncertainty cascades - when leaders hesitate, teams freeze, and freezing during crisis amplifies harm"

   3. INDUSTRY-SPECIFIC INSIGHTS:
      Reference patterns you see in their sector (use org_info field). Examples:
      - Schools: "In K-12 environments, this gap often manifests when you have emergency procedures but staff don't know how to support traumatized students afterward"
      - Tech companies: "Distributed teams face unique crisis challenges - who coordinates when everyone's remote?"
      - Nonprofits: "Mission-driven organizations often excel at caring but lack formal structures to sustain that care during prolonged crises"
      - Healthcare: "Clinical staff are trained for patient crises but often lack support for their own vicarious trauma"

   4. STRATEGIC "OH SHIT" QUESTIONS:
      Ask questions that reveal complexity they haven't considered. Examples:
      - "If a crisis happened right now, could every team member name who they'd report to, and would that person know they're responsible?"
      - "Who supports the supporters? When your crisis team is managing an incident, who's managing their wellbeing?"
      - "If your primary crisis coordinator was personally affected by the incident, who takes over?"
      - "Can your front-line staff access your crisis plan at 2am on a weekend without calling leadership?"

   5. HIDDEN RISK REVELATION:
      Point out non-obvious vulnerabilities. Examples:
      - "Communication gaps don't just affect external messaging - they affect whether staff feel safe raising concerns BEFORE small issues become crises"
      - "Organizations often focus on 'what to do' but miss 'who has permission to make decisions when leaders are unreachable'"
      - "The gap between 'we care about our people' and 'we have systems to sustain that care' is where burnout lives"

   6. PRIORITIZATION WISDOM:
      Explain which gap to address first and why (but not HOW - that's the paid service). Examples:
      - "While you have multiple gaps, addressing communication first creates ripple effects - it's the connective tissue that makes other systems work"
      - "Your support gap is actually the foundation - without it, your response efforts extract a hidden cost from your team"
      - "Preparedness is your leverage point - fixing it prevents the need for heroic responses later"

   7. SCENARIO PAINTING (Trauma-Informed):
      Brief, specific, realistic examples of what could go wrong. NOT fear-mongering - thoughtful realism. Examples:
      - "This plays out like this: an incident happens, three people each think someone else is coordinating, 90 minutes pass with no clear leadership, and what should be a managed situation becomes a full crisis"
      - "Without formal support structures, caring managers burn themselves out trying to support traumatized staff, then you have two problems instead of one"
      - "The plan exists, but it's in someone's drawer. When crisis hits, people improvise, miss critical steps, and later say 'we had a plan?'"

   8. SOCIAL PROOF (Subtle):
      Reference patterns without naming clients. Examples:
      - "We see this exact combination in organizations at your growth stage"
      - "This is a textbook pattern for [their sector] - you're not alone in this"
      - "Organizations that score like you often share a specific challenge..."

   TONE GUIDELINES:
   - Use trauma-informed language (avoid: triggered, ignite, aim, fire, shoot, explode, bomb, attack, target)
   - Be warmly expert, not coldly clinical
   - Validate and challenge simultaneously
   - Show you understand their world specifically
   - Create urgency through insight, not fear
   - Balance "you're doing some things well" with "here's what you're missing"
   - Sound like a trusted advisor, not a salesperson

   SERVICE TIERS:

   TIER 1: Foundational Workshops
   Starting at $2,000 | Sliding scale available for nonprofits, schools, and community organizations
   - Organizational Trauma Literacy
   - Traumatic Stress Psychoeducation
   - Youth & Family Support

   TIER 2: Strategic Intensives
   Typical investment: $10,000-$30,000 | Sliding scale available
   - Crisis Preparedness Assessment & Implementation
   - Leadership Resilience Intensive
   - Clinician Resilience & Moral Injury Recovery
   - The Re-Treatment Intensive

   TIER 3: Full-Spectrum Partnership
   Custom pricing, typically $30,000+ | Flexible arrangements for mission-driven organizations
   - Comprehensive organizational transformation
   - 6-18 month partnerships
   - Custom framework development

   IMPORTANT TO MENTION IN EVERY EMAIL:
   - Initial consultation calls are always FREE - no obligation
   - Calendar link: https://meetings-na2.hubspot.com/josh-garcia/aftermath-solutions
   - For nonprofits, schools, and community organizations: We offer sliding scale pricing
   - We NEVER charge for disaster and crisis response referral consultation calls
   - Acknowledge our team may have already reached out, but this is a deeper analysis of their results

   PRICING LANGUAGE - DO NOT mention specific dollar amounts:
   - Instead of "$10,000-$30,000" say "We'll discuss investment options during our free consultation"
   - Instead of "$2,000" say "Starting points vary based on organizational needs and capacity"
   - Always mention sliding scale availability for mission-driven organizations
   - Focus on VALUE and FIT, not cost

   OUTPUT: Generate ONLY the email body in HTML format. Do NOT include subject line.
   ```

   **Messages → User Message:** (Click "+ Add item" to add a user message)

   **Role:** `user`

   **Content:** (Map fields from Iterator - adjust module number to match your Iterator)
   ```
   Generate a personalized follow-up email for this assessment:

   CONTACT INFO:
   Name: {{3.Contact Name}}
   Organization: {{3.Organization}}
   Email: {{3.Contact Email}}

   ASSESSMENT DATA:
   {{3.Assessment Data}}

   Write a STELLAR, expert-level personalized email (500-700 words) using this structure:

   SECTION 1 - PERSONAL OPENING (80-100 words):
   - Warm greeting with their name
   - Acknowledge our team may have reached out already
   - Position this as detailed analysis they can reference and share with leadership
   - Brief mention of their organization/industry if available in org_info

   SECTION 2 - ASSESSMENT OVERVIEW (100-150 words):
   - State their overall gap score and what category it falls into (Minor/Moderate/Significant/Critical)
   - Celebrate their strengths (LOWEST gap scores = best performing areas)
   - Frame challenges compassionately - "areas for growth" not "failures"
   - Use specific numbers from their assessment

   SECTION 3 - EXPERT INSIGHT (250-350 words) - THIS IS WHERE YOU DEMONSTRATE EXPERTISE:
   - Identify the PATTERN in their gap scores (use Pattern Recognition technique)
   - Explain how their gaps CASCADE or compound each other (Cascading Risk Analysis)
   - Include 1-2 industry-specific insights based on their org_info field
   - Ask ONE strategic "oh shit" question that reveals hidden complexity
   - Paint a brief, realistic scenario of what could happen (Scenario Painting)
   - Reveal a hidden risk they probably haven't considered
   - Explain strategic prioritization - which gap to address first and WHY
   - Use subtle social proof - "we see this pattern in organizations like yours"

   SECTION 4 - RECOMMENDATION (80-120 words):
   - Recommend specific service tier based on their gap levels
   - Explain WHY this service fits their specific pattern of gaps
   - DO NOT mention specific dollar amounts
   - Mention sliding scale if nonprofit/school/community org
   - Focus on outcomes and value, not cost
   - Keep it conversational, not sales-y

   SECTION 5 - CALL TO ACTION (50-80 words):
   - Emphasize FREE consultation (no obligation)
   - Include calendar link: https://meetings-na2.hubspot.com/josh-garcia/aftermath-solutions
   - Add a final thought-provoking statement or question
   - Sign off warmly as 'The Aftermath Solutions Team'

   CRITICAL REMINDERS:
   - These are GAP scores: HIGHER = BIGGER PROBLEM, LOWER = STRENGTH
   - Use ALL 8 expert demonstration techniques from the system prompt
   - Be warmly expert, not coldly clinical
   - Create urgency through INSIGHT, not fear
   - Sound like a trusted advisor who truly understands their world
   - Make them think "Wow, they really get it - we need them"

   Generate ONLY the HTML email body, no subject line.
   ```

6. Click **"OK"**

**⚠️ IMPORTANT:** Replace `{{3.Contact Name}}`, `{{3.Organization}}`, `{{3.Assessment Data}}` with the actual mapped fields from your Iterator module (Module 3). The number `3` should match your Iterator module number.

---

## STEP 7: Add MODULE 5 - Send Email

**What it does:** Sends the AI-generated email to the contact

1. Click **"+"** after Claude AI module
2. Search: `gmail` or `email`
3. Select: **"Gmail → Send an Email"** (or your email provider)
4. Use existing email connection
5. Configure:
   - **To:** `{{3.Contact Email}}` (from Iterator)
   - **CC:** `team@theaftermathsolutions.com`
   - **From Name:** `Aftermath Solutions`
   - **From Email:** `team@theaftermathsolutions.com`
   - **Subject:** `Your Organizational Resilience Analysis for {{3.Organization}}`
   - **Content Type:** `HTML`
   - **Body/Content:** Map the text from Module 4 (Claude AI)
     - Click the field
     - Navigate to Module 4 (Claude) → Content → 1: Text → Text
     - Should look like: `{{4.content[].text}}`

6. Click **"OK"**

**⚠️ NOTE:** The exact path may vary - look for "Content" or "Text" field from the Claude module. If you don't see it, run the scenario once to populate the mapping options.

---

## STEP 8: Add MODULE 6 - Update Airtable

**What it does:** Marks the record as processed so it won't send again

1. Click **"+"** after Gmail module
2. Search: `airtable`
3. Select: **"Airtable → Update a record"**
4. Use existing Airtable connection
5. Configure:
   - **Base:** `Lead Pipeline Dashboard`
   - **Table:** `📧 Email Follow-Up Queue`
   - **Record ID:** `{{3.id}}` (from Iterator - the Airtable record ID)

6. **Fields to update:**
   - **Processed:** Check the checkbox (set to `TRUE`)
   - **Email Sent Date:** `{{now}}`
   - **Status:** Type `Sent` (manually)
   - **Claude Analysis:** `{{4.content[].text}}` (optional - stores Claude's email content)

7. Click **"OK"**

---

## STEP 9: Add Error Handler (Recommended)

**What it does:** Prevents one failed email from stopping the entire batch

1. **Right-click** on Module 4 (Claude AI)
2. Select **"Add error handler"**
3. Choose **"Ignore"**
4. Click **"OK"**

This ensures if Claude fails for one email, it continues processing the rest.

---

## STEP 10: Save and Test

1. Click **"Save"** (bottom right)
2. **Turn ON** the scenario (toggle in top right should be blue/green)
3. Click **"Run once"** to test

**What should happen:**
- Schedule triggers (even though it's not 8am)
- Airtable finds records from your tests
- Iterator processes each one
- Claude generates personalized email
- Email sent to contact (and CC to team)
- Airtable record marked as processed

---

## TESTING

Since you have test data in Airtable, the scenario should find records immediately.

**Check:**
1. **Make.com execution log** - All modules green checkmarks
2. **Your email** - AI-generated follow-up email received
3. **Airtable** - Records marked "Processed = TRUE" and "Status = Sent"

---

## TROUBLESHOOTING

### No records found in Airtable

**Check:**
- Are there records with `Processed = FALSE` and `Status = Queued`?
- Are the timestamps 23-25 hours old?
- Update the formula to test: Change `-25` and `-23` to `-48` and `-1` to find any unprocessed records

### Claude API error

**Check:**
- API key is correct (no extra spaces)
- Claude connection is authorized
- System prompt and user message are properly configured
- Fields from Iterator are correctly mapped ({{3.Contact Name}} etc.)

### Email not sending

**Check:**
- Gmail connection is authorized
- Email address mapping is correct
- Body field maps to Claude module's text output ({{4.content[].text}})
- Try running once to populate the mapping options

### Airtable not updating

**Check:**
- Record ID is mapped from Iterator module
- Field names match exactly (case-sensitive)
- Connection is authorized

---

## WHAT'S NEXT

Once Scenario 2 is working:
- ✅ Immediate team notifications (Scenario 1)
- ✅ AI-powered 24h follow-ups (Scenario 2)
- 🔜 Low-priority nurture sequence
- 🔜 Deal reminder system
- 🔜 Weekly digest emails

---

## COST ESTIMATE

**Claude AI Usage:**
- 10 emails/day = $1/day = $30/month
- 50 emails/day = $5/day = $150/month
- 100 emails/day = $10/day = $300/month

Very affordable for high-quality personalized emails that reflect your mission and values!

---

**Status:** Ready to build ✅
**Last Updated:** November 5, 2024
