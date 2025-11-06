#!/bin/bash

# Test webhook with MEDIUM priority data matching actual assessment structure
# This simulates what the assessment form sends for a medium-priority lead

# IMPORTANT: Replace YOUR_WEBHOOK_URL with your actual Make.com webhook URL
WEBHOOK_URL="https://hook.us2.make.com/y7n8tnm51v3hesxlxnn907vhur4iddp9"

echo "Testing MEDIUM PRIORITY webhook submission..."
echo "Webhook URL: $WEBHOOK_URL"
echo ""

# MEDIUM PRIORITY Test Data - matching assessment.html structure
curl -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "assessment_id": "assess_'$(date +%s)'_testmed456",
    "assessment_completed": "'$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")'",
    "assessment_version": "2.0.0",

    "has_consented": true,
    "consent_timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")'",

    "start_timestamp": "'$(date -u -v-4M +"%Y-%m-%dT%H:%M:%S.000Z")'",
    "end_timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")'",
    "total_duration_seconds": 240,

    "overall_score": 68,
    "preparedness_score": 72,
    "response_score": 65,
    "recovery_score": 70,
    "support_score": 66,

    "gap_level": "significant",
    "lead_score": 72,

    "name": "Michael Chen",
    "email": "m.chen@hospital.org",
    "organization": "Community Medical Center",
    "role": "VP of Operations",
    "org_info": "Healthcare Organization",

    "top_gaps": ["Recovery Planning", "Staff Wellness Programs"],
    "highest_gap_area": "recovery",
    "gap_category": "long-term recovery",
    "assessment_top_gap": "resilience__no_longterm_plan",

    "recommended_tier": "TIER 2: Strategic Intensives",
    "recommended_service": "Crisis Preparedness Assessment & Implementation",
    "solving_for": "Recovery & Resilience",

    "wants_consultation": false,
    "wants_training": true,
    "wants_newsletter": true,
    "wants_resources": true,

    "next_step": ["training", "newsletter", "resources"],

    "utm_source": "linkedin",
    "utm_medium": "social",
    "utm_campaign": "healthcare_assessment",
    "utm_content": "test_medium_priority",
    "referrer": "https://www.linkedin.com/",

    "recaptcha_score": 0.85,
    "server_timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")'",
    "client_ip": "127.0.0.1",
    "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Test/537.36",
    "submission_source": "assessment_tool"
  }'

echo ""
echo ""
echo "Test complete! Check Make.com scenario execution log for results."
echo ""
echo "Expected behavior:"
echo "✓ MEDIUM priority email should be sent (orange badge)"
echo "✓ HubSpot contact should be created/updated"
echo "✓ HubSpot deal should be created with MEDIUM priority"
echo "✓ Lead score: A"
echo "✓ Overall score: 68/100"
echo "✓ Consultation requested: NO (wants training/resources instead)"
