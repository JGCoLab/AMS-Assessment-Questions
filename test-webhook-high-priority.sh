#!/bin/bash

# Test webhook with HIGH priority data matching actual assessment structure
# This simulates what the assessment form sends for a high-priority lead

# IMPORTANT: Replace YOUR_WEBHOOK_URL with your actual Make.com webhook URL
# You can find this in:
# 1. Make.com → Your scenario → Webhook module → Copy webhook URL
# 2. OR in Vercel → Settings → Environment Variables → WEBHOOK_URL

WEBHOOK_URL="https://hook.us2.make.com/y7n8tnm51v3hesxlxnn907vhur4iddp9"

# If you're testing through the serverless proxy (recommended):
# WEBHOOK_URL="https://your-domain.vercel.app/api/submit-assessment"

echo "Testing HIGH PRIORITY webhook submission..."
echo "Webhook URL: $WEBHOOK_URL"
echo ""

# HIGH PRIORITY Test Data - matching assessment.html structure
curl -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "assessment_id": "assess_'$(date +%s)'_testhigh123",
    "assessment_completed": "'$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")'",
    "assessment_version": "2.0.0",

    "has_consented": true,
    "consent_timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")'",

    "start_timestamp": "'$(date -u -v-5M +"%Y-%m-%dT%H:%M:%S.000Z")'",
    "end_timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")'",
    "total_duration_seconds": 180,

    "overall_score": 85,
    "preparedness_score": 82,
    "response_score": 88,
    "recovery_score": 84,
    "support_score": 86,

    "gap_level": "critical",
    "lead_score": 85,

    "name": "Sarah Johnson",
    "email": "sarah.johnson@testschool.edu",
    "organization": "Lincoln High School District",
    "role": "Director of Student Safety",
    "org_info": "K-12 School or District",

    "top_gaps": ["Crisis Communication", "Staff Support Systems"],
    "highest_gap_area": "response",
    "gap_category": "response",
    "assessment_top_gap": "communication__internal_breakdown",

    "recommended_tier": "TIER 2: Strategic Intensives",
    "recommended_service": "Leadership Resilience Intensive",
    "solving_for": "Response Capability",

    "wants_consultation": true,
    "wants_training": true,
    "wants_newsletter": true,
    "wants_resources": false,

    "next_step": ["consultation", "training", "newsletter"],

    "utm_source": "google",
    "utm_medium": "cpc",
    "utm_campaign": "resilience_assessment_2024",
    "utm_content": "test_high_priority",
    "referrer": "https://www.google.com/",

    "recaptcha_score": 0.9,
    "server_timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")'",
    "client_ip": "127.0.0.1",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Test/537.36",
    "submission_source": "assessment_tool"
  }'

echo ""
echo ""
echo "Test complete! Check Make.com scenario execution log for results."
echo ""
echo "Expected behavior:"
echo "✓ HIGH priority email should be sent (red badge, consultation requested)"
echo "✓ HubSpot contact should be created/updated"
echo "✓ HubSpot deal should be created with HIGH priority"
echo "✓ Lead score: A+"
echo "✓ Overall score: 85/100"
echo "✓ Consultation requested: YES"
