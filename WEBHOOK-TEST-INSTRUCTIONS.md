# Webhook Testing Instructions

## Step 1: Find Your Webhook URL

### Option A: From Make.com (Direct Webhook)
1. Go to [Make.com](https://www.make.com/)
2. Open your "Aftermath Assessment - Immediate Processing" scenario
3. Click on the first **Webhook module** (blue icon)
4. Copy the **Webhook URL** that looks like:
   ```
   https://hook.us2.make.com/xxxxxxxxxxxxx
   ```

### Option B: From Vercel (If using serverless proxy)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Look for `WEBHOOK_URL` variable
5. Copy the value

## Step 2: Update Test Scripts

Open both test scripts and replace `YOUR_WEBHOOK_URL_HERE` with your actual webhook URL:

```bash
# Edit HIGH priority test
nano test-webhook-high-priority.sh

# Edit MEDIUM priority test
nano test-webhook-medium-priority.sh
```

Replace this line:
```bash
WEBHOOK_URL="YOUR_WEBHOOK_URL_HERE"
```

With your actual webhook URL:
```bash
WEBHOOK_URL="https://hook.us2.make.com/xxxxxxxxxxxxx"
```

## Step 3: Run Tests

### Test HIGH Priority
```bash
./test-webhook-high-priority.sh
```

**Expected Result:**
- ✓ HIGH priority email sent (red badge, "HOT LEAD - Consultation Requested")
- ✓ HubSpot deal created with HIGH priority
- ✓ Lead score: A+
- ✓ Overall score: 85/100
- ✓ Organization: Lincoln High School District
- ✓ Email: sarah.johnson@testschool.edu
- ✓ Consultation requested: YES

### Test MEDIUM Priority
```bash
./test-webhook-medium-priority.sh
```

**Expected Result:**
- ✓ MEDIUM priority email sent (orange badge, "QUALIFIED LEAD - Review Reach Out")
- ✓ HubSpot deal created with MEDIUM priority
- ✓ Lead score: A
- ✓ Overall score: 68/100
- ✓ Organization: Community Medical Center
- ✓ Email: m.chen@hospital.org
- ✓ Consultation requested: NO

## Step 4: Verify in Make.com

1. Go to Make.com
2. Click on your scenario
3. Click **History** tab
4. You should see:
   - ✓ 2 successful executions (one for HIGH, one for MEDIUM)
   - ✓ No errors in the execution log
   - ✓ All modules executed successfully

## Step 5: Verify Emails

Check your team email inbox for:
1. **HIGH priority email** - Should look modern with red badge, generous white space
2. **MEDIUM priority email** - Should look modern with orange badge, generous white space

## Step 6: Verify in HubSpot

1. Go to HubSpot Contacts
2. Search for:
   - "Sarah Johnson" (HIGH priority test)
   - "Michael Chen" (MEDIUM priority test)

3. Verify deals were created:
   - **Lincoln High School District - TIER 2** (HIGH priority)
   - **Community Medical Center - TIER 2** (MEDIUM priority)

## Troubleshooting

### Error: "Invalid IML" or "Operator next to operator"
- This means the HTML templates still have problematic CSS
- Make sure you're using the latest versions that remove multi-value CSS

### Error: "Webhook URL not configured"
- The WEBHOOK_URL environment variable is not set in Vercel
- Set it in Vercel → Settings → Environment Variables

### No email received
- Check Make.com execution log for errors
- Verify Gmail module is configured correctly
- Check spam folder

### Contact not created in HubSpot
- Check Make.com execution log
- Verify HubSpot API key is valid
- Check HubSpot module configuration

## Data Structure Reference

The test scripts send data matching your actual assessment form:

### Core Fields
- `assessment_id` - Unique identifier
- `name` - Contact name
- `email` - Contact email
- `organization` - Organization name
- `role` - Contact's role
- `org_info` - Organization type (K-12, Healthcare, etc.)

### Scores
- `overall_score` - 0-100
- `preparedness_score` - 0-100
- `response_score` - 0-100
- `recovery_score` - 0-100
- `support_score` - 0-100

### Classification
- `lead_score` - A+, A, B+, B, C
- `gap_level` - critical, significant, moderate, minor
- `gap_category` - High-level gap description
- `assessment_top_gap` - Specific gap identified

### Recommendations
- `recommended_tier` - TIER 1, TIER 2, or TIER 3
- `recommended_service` - Service name
- `solving_for` - What problem it solves

### Intent Signals
- `wants_consultation` - true/false (HIGH priority trigger)
- `wants_training` - true/false
- `wants_newsletter` - true/false
- `wants_resources` - true/false

## Priority Logic

**HIGH Priority (A+):**
- `overall_score >= 65` AND `wants_consultation = true`
- OR `lead_score = "A+"`

**MEDIUM Priority (A):**
- `overall_score >= 65` AND `wants_consultation = false`
- OR `lead_score = "A"`

**LOW Priority (B+, B, C):**
- `overall_score < 65`
- OR `lead_score in ["B+", "B", "C"]`
