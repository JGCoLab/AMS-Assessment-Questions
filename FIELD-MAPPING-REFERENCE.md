# Field Mapping Reference Guide
## Assessment → HubSpot → Airtable → Mailchimp

**Quick Reference for Make.com Setup**

---

## 📊 ASSESSMENT WEBHOOK DATA STRUCTURE

The assessment sends these fields to Make.com webhook:

```json
{
  "assessment_id": "assess_1234567890_abc",
  "name": "John Smith",
  "email": "john@school.org",
  "organization": "Lincoln Middle School",
  "org_info": "K-12 Education",
  "preparedness_score": 58,
  "response_score": 67,
  "recovery_score": 81,
  "support_score": 75,
  "overall_score": 73,
  "lead_score": 82,
  "gap_level": "Significant",
  "recommended_tier": "TIER 2",
  "recommended_service": "Crisis Preparedness Assessment & Implementation",
  "wants_consultation": true,
  "wants_newsletter": true,
  "wants_training": false,
  "recaptcha_score": 0.9,
  "assessment_completed": "2025-01-15T10:30:00Z"
}
```

---

## 🔗 HUBSPOT PROPERTY MAPPINGS

### ⚠️ CRITICAL: Property Name Mismatches

| Assessment Field | HubSpot Property | Make.com Formula | Notes |
|------------------|-----------------|------------------|-------|
| `response_score` | `assessment_score_communication` | `{{1.response_score}}` | ⚠️ Different name! |
| `support_score` | `assessment_score_capacity` | `{{1.support_score}}` | ⚠️ Different name! |
| `recovery_score` | `assessment_score_resilience` | `{{1.recovery_score}}` | ⚠️ Different name! |
| `overall_score` | `assessment_total_score` | `{{1.overall_score}}` | ⚠️ Different name! |

### Complete HubSpot Mapping

| HubSpot Property | Assessment Field | Make.com Formula | Type |
|------------------|------------------|------------------|------|
| **Standard Fields** |
| `email` | `email` | `{{1.email}}` | Email (required) |
| `firstname` | `name` | `{{split(1.name; " ")[1]}}` | Text |
| `lastname` | `name` | `{{split(1.name; " ")[2]}}` | Text |
| `company` | `organization` | `{{1.organization}}` | Text |
| **Existing Properties (Already Created)** |
| `lead_score` | `lead_score` | `{{1.lead_score}}` | Number |
| `gap_category` | `gap_level` | `{{1.gap_level}}` | Dropdown |
| `priority_level` | *(calculated)* | `{{if(1.lead_score >= 80; "A+"; if(1.lead_score >= 70; "A"; if(1.lead_score >= 50; "B"; "C")))}}` | Dropdown |
| `recommended_service` | `recommended_service` | `{{1.recommended_service}}` | Text |
| `month_six_client` | *(calculated)* | `{{if(1.lead_score >= 70; "Yes"; "Needs Assessment")}}` | Dropdown |
| **Phase 2 Assessment Properties** |
| `assessment_completion_status` | *(set manually)* | `Completed` | Dropdown |
| `assessment_score_preparedness` | `preparedness_score` | `{{1.preparedness_score}}` | Number |
| `assessment_score_communication` | `response_score` | `{{1.response_score}}` | Number ⚠️ |
| `assessment_score_capacity` | `support_score` | `{{1.support_score}}` | Number ⚠️ |
| `assessment_score_resilience` | `recovery_score` | `{{1.recovery_score}}` | Number ⚠️ |
| `assessment_total_score` | `overall_score` | `{{1.overall_score}}` | Number ⚠️ |
| `assessment_top_gap` | `highest_gap_area` | `{{1.highest_gap_area}}` | Dropdown |
| `assessment_completion_date` | `assessment_completed` | `{{1.assessment_completed}}` | Date |
| `recommended_tier` | `recommended_tier` | `{{1.recommended_tier}}` | Text |
| **Phase 1 Foundation Properties** |
| `contact_type` | *(calculated)* | `{{if(1.lead_score >= 400; "Prospect - Hot (A+)"; if(1.lead_score >= 300; "Prospect - Priority (A)"; if(1.lead_score >= 200; "Prospect - Nurture (B)"; "Prospect - Archive (C)")))}}` | Dropdown |
| `marketing_consent` | *(set manually)* | `Marketable - Soft Opt-in` | Dropdown |
| `relationship_origin` | *(set manually)* | `Gap Assessment` | Dropdown |
| `organization_sector` | `org_info` | `{{1.org_info}}` | Dropdown |

---

## 📋 AIRTABLE FIELD MAPPINGS

| Airtable Field | Assessment Field | Make.com Formula | Type |
|----------------|------------------|------------------|------|
| Assessment ID | `assessment_id` | `{{1.assessment_id}}` | Text (Primary) |
| Submission Date | `assessment_completed` | `{{1.assessment_completed}}` | Date/Time |
| Name | `name` | `{{1.name}}` | Text |
| Email | `email` | `{{1.email}}` | Email |
| Organization | `organization` | `{{1.organization}}` | Text |
| Organization Type | `org_info` | `{{1.org_info}}` | Single Select |
| Overall Score | `overall_score` | `{{1.overall_score}}` | Number |
| Preparedness Score | `preparedness_score` | `{{1.preparedness_score}}` | Number |
| Response Score | `response_score` | `{{1.response_score}}` | Number |
| Recovery Score | `recovery_score` | `{{1.recovery_score}}` | Number |
| Support Score | `support_score` | `{{1.support_score}}` | Number |
| Lead Score | `lead_score` | `{{1.lead_score}}` | Number |
| Gap Level | `gap_level` | `{{1.gap_level}}` | Single Select |
| Recommended Tier | `recommended_tier` | `{{1.recommended_tier}}` | Single Select |
| Recommended Service | `recommended_service` | `{{1.recommended_service}}` | Text |
| Wants Consultation | `wants_consultation` | `{{1.wants_consultation}}` | Checkbox |
| Wants Newsletter | `wants_newsletter` | `{{1.wants_newsletter}}` | Checkbox |
| Wants Training | `wants_training` | `{{1.wants_training}}` | Checkbox |
| HubSpot Contact ID | *(from HubSpot)* | `{{3.id}}` | Text |
| Status | *(set manually)* | `New` | Single Select |
| Raw Data JSON | *(all data)* | `{{toString(1)}}` | Long Text |

---

## 📧 MAILCHIMP FIELD MAPPINGS

| Mailchimp Field | Assessment Field | Make.com Formula | Notes |
|-----------------|------------------|------------------|-------|
| **Required** |
| Email Address | `email` | `{{1.email}}` | Required |
| Status | *(set manually)* | `Subscribed` | Use "Add/Update Subscriber" |
| **Merge Fields (Optional)** |
| `FNAME` | `name` | `{{split(1.name; " ")[1]}}` | First name |
| `LNAME` | `name` | `{{split(1.name; " ")[2]}}` | Last name |
| `ORG` | `organization` | `{{1.organization}}` | Organization |
| `LEADSCORE` | `lead_score` | `{{1.lead_score}}` | If merge field exists |
| **Tags (for Segmentation)** |
| Tags | *(set manually)* | `assessment-completed` | Always add |
| Tags | `lead_score` | `lead-score-{{1.lead_score}}` | e.g., "lead-score-82" |
| Tags | `gap_level` | `{{1.gap_level}}` | e.g., "Significant" |
| Tags | `recommended_tier` | `{{1.recommended_tier}}` | e.g., "TIER 2" |

---

## 🔄 DATA FLOW SUMMARY

```
Assessment Submission
    ↓
Webhook Data (Module 1)
    ├─→ HubSpot (Module 3)
    │   ├─→ Standard: email, name, company
    │   ├─→ Existing: lead_score, gap_category, priority_level
    │   ├─→ Phase 2: assessment_score_* (with name mapping!)
    │   └─→ Phase 1: contact_type, marketing_consent
    │
    ├─→ Airtable (Module 4)
    │   └─→ Direct mapping (no name changes)
    │
    ├─→ Mailchimp (Module 6, if wants_newsletter)
    │   ├─→ Email, FNAME, LNAME, ORG
    │   └─→ Tags: assessment-completed, lead-score-X, gap-level
    │
    └─→ Email Queue (Module 8)
        └─→ Stores complete JSON for Claude AI processing
```

---

## ⚠️ COMMON MAPPING ERRORS

### Error 1: Property Name Mismatch
**Problem:** Assessment sends `response_score` but HubSpot expects `assessment_score_communication`

**Solution:** Use correct formula: `{{1.response_score}}` maps to `assessment_score_communication` property

### Error 2: Module Number Wrong
**Problem:** Using `{{1.field}}` when HubSpot module is actually Module 3

**Solution:** Replace `1` with actual module number. HubSpot module = Module 3, so use `{{3.id}}` for HubSpot contact ID

### Error 3: Array vs Single Value
**Problem:** Claude returns `content` as array, need `content[0].text`

**Solution:** Map `content[0].text` from JSON Parse module, not just `content`

### Error 4: Boolean Values
**Problem:** Airtable/Mailchimp checkbox fields need boolean, not string

**Solution:** Use `{{1.wants_newsletter}}` directly (Make.com converts to boolean)

---

## 📝 QUICK COPY-PASTE FORMULAS

### HubSpot - Phase 2 Properties
```
assessment_score_preparedness = {{1.preparedness_score}}
assessment_score_communication = {{1.response_score}}
assessment_score_capacity = {{1.support_score}}
assessment_score_resilience = {{1.recovery_score}}
assessment_total_score = {{1.overall_score}}
```

### HubSpot - Priority Level
```
{{if(1.lead_score >= 80; "A+"; if(1.lead_score >= 70; "A"; if(1.lead_score >= 50; "B"; "C")))}}
```

### HubSpot - Contact Type
```
{{if(1.lead_score >= 400; "Prospect - Hot (A+)"; if(1.lead_score >= 300; "Prospect - Priority (A)"; if(1.lead_score >= 200; "Prospect - Nurture (B)"; "Prospect - Archive (C)")))}}
```

### First Name from Full Name
```
{{split(1.name; " ")[1]}}
```

### Last Name from Full Name
```
{{split(1.name; " ")[2]}}
```

---

## ✅ VERIFICATION CHECKLIST

After setting up Make.com, verify:

- [ ] HubSpot contact created with all properties
- [ ] Property names match exactly (check for underscores vs hyphens)
- [ ] Number fields are numbers (not text)
- [ ] Date fields are dates (not text)
- [ ] Airtable record matches HubSpot data
- [ ] Mailchimp subscriber added (if wants_newsletter = true)
- [ ] Tags added to Mailchimp contact
- [ ] Email queue record has complete JSON

---

**Last Updated:** January 2025  
**Reference:** Use with `MAKE-COM-COMPLETE-INTEGRATION-GUIDE.md`


