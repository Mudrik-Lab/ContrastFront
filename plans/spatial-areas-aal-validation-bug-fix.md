# Spatial Areas AAL Validation Bug Fix Plan

## Bug Description
Users are unable to save "spatial areas" findings when using non-fMRI techniques because the system incorrectly treats AAL tags as mandatory for all spatial areas findings, regardless of the selected technique.

## Current Behavior
1. AAL field is correctly hidden for non-fMRI techniques
2. Save button remains disabled for non-fMRI spatial areas findings
3. Users must work around by: switching to fMRI → entering fake AAL tag → switching back to correct technique

## Root Cause Analysis

### Location of the Bug
**File**: `src/contrast/pages/UploadNewPaper/ExperimentsSection/Findings.jsx`

### Problematic Code
```javascript
// Line 122-126: Validation logic
if (field?.family == families["Spatial Areas"] && field?.technique == 5) {
  return [field.AAL_atlas_tags].every(
    (condition) => Boolean(condition) === true
  );
}
```

### Issues Identified
1. **Hard-coded technique ID**: The validation uses `field?.technique == 5` instead of the dynamic `fMRI` constant
2. **Inconsistent technique checking**: The UI rendering uses `fieldValue.technique == fMRI` but validation uses hard-coded `5`
3. **Missing validation for non-fMRI spatial areas**: No validation logic exists for spatial areas with non-fMRI techniques

## Technical Details

### fMRI Technique Identification
- **UI Logic**: Uses dynamic lookup `const fMRI = trimmedTechOptions.find((opt) => opt.label === "fMRI")?.value;`
- **Validation Logic**: Uses hard-coded `field?.technique == 5`
- **Inconsistency**: These may not always match, causing the bug

### Current Validation Flow
1. `submitConditions(index)` function checks if all required fields are filled
2. For Spatial Areas family, it only validates AAL tags when technique == 5
3. No validation path exists for non-fMRI spatial areas findings
4. Save button is disabled when validation fails

## Fix Plan

### Phase 1: Fix Validation Logic
**File**: `src/contrast/pages/UploadNewPaper/ExperimentsSection/Findings.jsx`

**Changes Required**:
1. Replace hard-coded technique ID with dynamic fMRI constant
2. Add validation logic for non-fMRI spatial areas findings
3. Ensure consistency between UI rendering and validation logic

**Code Changes**:
```javascript
// Replace lines 122-126 with:
if (field?.family == families["Spatial Areas"]) {
  if (field?.technique == fMRI) {
    // AAL tags required only for fMRI
    return [field.AAL_atlas_tags].every(
      (condition) => Boolean(condition) === true
    );
  } else {
    // For non-fMRI techniques, no AAL tags required
    return true;
  }
}
```

### Phase 2: Add Safety Checks
**Additional Improvements**:
1. Add null/undefined checks for fMRI constant
2. Add fallback validation for edge cases
3. Ensure technique comparison is consistent

**Code Changes**:
```javascript
// Add safety check after fMRI constant definition:
const fMRI = trimmedTechOptions.find((opt) => opt.label === "fMRI")?.value;
if (!fMRI) {
  console.warn("fMRI technique not found in available options");
}
```

### Phase 3: Code Review Checklist
- [ ] Validation logic uses dynamic fMRI constant instead of hard-coded value
- [ ] Non-fMRI spatial areas findings can be saved without AAL tags
- [ ] fMRI spatial areas findings still require AAL tags
- [ ] Technique switching works correctly
- [ ] No regression in other finding types (Temporal, Frequency, etc.)
- [ ] Error handling for missing fMRI technique

## Implementation Steps

1. ✅ **Backup current code** before making changes
2. ✅ **Update validation logic** in `submitConditions` function
3. ✅ **Add safety checks** for fMRI constant
4. **Test the fix** with various technique combinations
5. **Verify no regressions** in other finding types
6. **Update documentation** if needed

## Files to Modify
- `src/contrast/pages/UploadNewPaper/ExperimentsSection/Findings.jsx` (main fix)

## Files to Test
- `src/contrast/pages/UploadNewPaper/ExperimentsSection/Findings.jsx`
- `src/contrast/pages/UploadNewPaper/ExperimentsSection/ExperimentForm.jsx` (integration)

## Estimated Effort
- **Development**: 2-3 hours
- **Testing**: 1-2 hours
- **Total**: 3-5 hours

## Risk Assessment
- **Low Risk**: Changes are isolated to validation logic
- **No Breaking Changes**: Existing functionality for fMRI findings remains unchanged
- **Backward Compatible**: All existing data and workflows will continue to work

## Success Criteria
- [ ] Non-fMRI spatial areas findings can be saved without AAL tags
- [ ] fMRI spatial areas findings still require AAL tags
- [ ] Save button state correctly reflects validation requirements
- [ ] No regression in other finding types
- [ ] Technique switching works seamlessly
