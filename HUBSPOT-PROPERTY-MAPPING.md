# HubSpot Property Mapping - Assessment to CRM
## Correct Field Mappings for Make.com

**Last Updated:** November 4, 2025

---

## 🎯 THE ISSUE

Your **assessment** sends data with these field names:
- `overall_score`, `preparedness_score`, `response_score`, `recovery_score`, `support_score`

But your **HubSpot Implementation Playbook** created properties with these names:
- `assessment_total_score`, `assessment_score_preparedness`, `assessment_score_communication`, `assessment_score_capacity`, `assessment_score_resilience`

**They don't match!** This document shows you the correct mappings.

---

## ✅ CORRECT PROPERTY MAPPINGS FOR MAKE.COM

Use this table when configuring your HubSpot module in Make.com:

### **Standard HubSpot Fields (No Custom Properties)**

| HubSpot Field | Webhook Field | Formula/Mapping |
|---------------|---------------|-----------------|
| **Email*** | `email` | Direct map: `{{3.email}}` |
| **First Name** | `name` | Use split: `{{split(3.name; " ")[1]}}` |
| **Last Name** | `name` | Use split: `{{split(3.name; " ")[2]}}` |
| **Company Name** | `organization` | Direct map: `{{3.organization}}` |

*(Replace "3" with your webhook module number)*

---

### **Custom Properties - Already Exist in Your HubSpot**

According to your playbook, these 5 properties **already exist:**

| HubSpot Property | Webhook Field | Mapping |
|------------------|---------------|---------|
| `lead_score` | `lead_score` | `{{3.lead_score}}` |
| `gap_category` | `gap_level` | `{{3.gap_level}}` |
| `priority_level` | `lead_score` | Use formula: `{{if(3.lead_score >= 80; "A+"; if(3.lead_score >= 70; "A"; if(3.lead_score >= 50; "B"; "C")))}}` |
| `recommended_service` | `recommended_service` | `{{3.recommended_service}}` |
| `month_six_client` | *(calculated)* | Use formula: `{{if(3.lead_score >= 70; "Yes"; "Needs Assessment")}}` |

**Note:** Your assessment uses a 0-100 lead score scale, so adjust the priority_level formula accordingly (not 0-500).

---

### **Custom Properties - CREATE THESE in HubSpot (Phase 2)**

These properties don't exist yet. Create them in HubSpot first (see Phase 2 of your playbook):

| HubSpot Property | Internal Name | Type | Webhook Field | Mapping |
|------------------|---------------|------|---------------|---------|
| **Assessment Status** | `assessment_completion_status` | Dropdown | *(n/a)* | Set to: `Completed` |
| **Preparedness Score** | `assessment_score_preparedness` | Number | `preparedness_score` | `{{3.preparedness_score}}` |
| **Response Score** | `assessment_score_communication` | Number | `response_score` | `{{3.response_score}}` |
| **Support Score** | `assessment_score_capacity` | Number | `support_score` | `{{3.support_score}}` |
| **Recovery Score** | `assessment_score_resilience` | Number | `recovery_score` | `{{3.recovery_score}}` |
| **Total Score** | `assessment_total_score` | Number | `overall_score` | `{{3.overall_score}}` |
| **Top Gap** | `assessment_top_gap` | Dropdown | `highest_gap_area` | `{{3.highest_gap_area}}` |
| **Completion Date** | `assessment_completion_date` | Date | `assessment_completed` | `{{3.assessment_completed}}` |
| **Recommended Tier** | `recommended_tier` | Text | `recommended_tier` | `{{3.recommended_tier}}` |

**⚠️ IMPORTANT NAMING DIFFERENCES:**

Your assessment sends:
- `response_score` → Maps to HubSpot's `assessment_score_communication`
- `support_score` → Maps to HubSpot's `assessment_score_capacity`
- `recovery_score` → Maps to HubSpot's `assessment_score_resilience`
- `overall_score` → Maps to HubSpot's `assessment_total_score`

---

### **Additional Assessment Data (Optional)**

These fields can be stored but don't have dedicated properties yet:

| HubSpot Field | Webhook Field | Notes |
|---------------|---------------|-------|
| `organization_type` or `organization_sector` | `org_info` | Map if you created this property |
| `crisis_experience` | `crisis_experience_ever` | Map if you created this property |
| `wants_consultation` *(checkbox)* | `wants_consultation` | Boolean: `{{3.wants_consultation}}` |
| `wants_newsletter` *(checkbox)* | `wants_newsletter` | Boolean: `{{3.wants_newsletter}}` |
| `wants_training` *(checkbox)* | `wants_training` | Boolean: `{{3.wants_training}}` |

---

## 🔧 QUICK SETUP CHECKLIST

Before configuring Make.com, ensure these properties exist in HubSpot:

### **Already Exist (should be there):**
- [ ] `lead_score` (Number)
- [ ] `gap_category` (Dropdown)
- [ ] `priority_level` (Dropdown)
- [ ] `recommended_service` (Text)
- [ ] `month_six_client` (Dropdown)

### **Need to Create (Phase 2 properties):**
- [ ] `assessment_completion_status` (Dropdown)
- [ ] `assessment_score_preparedness` (Number)
- [ ] `assessment_score_communication` (Number)
- [ ] `assessment_score_capacity` (Number)
- [ ] `assessment_score_resilience` (Number)
- [ ] `assessment_total_score` (Number)
- [ ] `assessment_top_gap` (Dropdown)
- [ ] `assessment_completion_date` (Date)
- [ ] `recommended_tier` (Text - if not exists)

**To create these:** See Phase 2 of `Aftermath_HubSpot_Implementation_Playbook.md` (lines 374-650)

---

## 📋 MAKE.COM MODULE CONFIGURATION

**When you're in the HubSpot "Create/Update Contact" module in Make.com:**

### **Step 1: Map Standard Fields**

1. **Email:** `{{3.email}}`
2. **First Name:** `{{split(3.name; " ")[1]}}`
3. **Last Name:** `{{split(3.name; " ")[2]}}`
4. **Company:** `{{3.organization}}`

### **Step 2: Click "Show Advanced Settings"**

### **Step 3: Map Custom Properties (CORRECTED)**

Scroll down and find these properties (if they exist):

**Existing Properties:**
```
lead_score: {{3.lead_score}}
gap_category: {{3.gap_level}}
priority_level: {{if(3.lead_score >= 80; "A+"; if(3.lead_score >= 70; "A"; if(3.lead_score >= 50; "B"; "C")))}}
recommended_service: {{3.recommended_service}}
month_six_client: {{if(3.lead_score >= 70; "Yes"; "Needs Assessment")}}
```

**Phase 2 Properties (if created):**
```
assessment_completion_status: Completed
assessment_score_preparedness: {{3.preparedness_score}}
assessment_score_communication: {{3.response_score}}
assessment_score_capacity: {{3.support_score}}
assessment_score_resilience: {{3.recovery_score}}
assessment_total_score: {{3.overall_score}}
assessment_top_gap: {{3.highest_gap_area}}
assessment_completion_date: {{3.assessment_completed}}
recommended_tier: {{3.recommended_tier}}
```

**Additional Data (if properties exist):**
```
organization_sector: {{3.org_info}}
crisis_experience: {{3.crisis_experience_ever}}
wants_consultation: {{3.wants_consultation}}
wants_newsletter: {{3.wants_newsletter}}
wants_training: {{3.wants_training}}
```

---

## 🚨 COMMON ERRORS

### **Error: "Property doesn't exist"**

**Solution:** The property hasn't been created in HubSpot yet.

**Fix:**
1. Go to HubSpot → Settings → Data Management → Properties
2. Select object: **Contact**
3. Create the missing property
4. Use the exact `Internal Name` shown in the table above
5. Return to Make.com and try again

---

### **Error: "Invalid value for number field"**

**Solution:** Trying to map a text value to a number field.

**Fix:** Ensure you're mapping to the correct field type:
- `assessment_score_preparedness` = **Number** → Map to `{{3.preparedness_score}}`
- NOT to `{{3.gap_level}}` (that's text)

---

### **Error: "Property not showing in Make.com dropdown"**

**Solution:** Make.com connection needs to refresh.

**Fix:**
1. In Make.com HubSpot module, click **"Show advanced settings"**
2. If you still don't see the property:
   - Disconnect HubSpot connection
   - Reconnect (will fetch latest properties)
3. Or type the property name manually

---

## ✅ VERIFICATION

After mapping and running your scenario:

1. **Go to HubSpot → Contacts**
2. **Find the test contact**
3. **Verify these values populated:**
   - Lead Score: 70 (or whatever the test score was)
   - Assessment Total Score: 66 (overall_score)
   - Preparedness Score: 78 (preparedness_score)
   - Response Score: 82 (response_score)
   - Recovery Score: 51 (recovery_score)
   - Support Score: 52 (support_score)

---

## 📖 RELATED DOCUMENTS

- **Create HubSpot Properties:** `Aftermath_HubSpot_Implementation_Playbook.md` (Phase 2, lines 374-650)
- **Make.com Setup:** `MAKE-COM-COMPLETE-SETUP.md` (Step 7)
- **Assessment Data Structure:** `SCORING-LOGIC.md`

---

**Last Updated:** November 4, 2025
**Verified Against:** Aftermath_HubSpot_Implementation_Playbook.md + Live Assessment Data
