# Test Case Matrix — PIM (Employee Management) Module

**Module**: PIM (Personnel Information Management)  
**Application**: OrangeHRM Open Source Demo (`https://opensource-demo.orangehrmlive.com`)  
**Author**: Yaryna Kushniruk  
**Last Updated**: 2026-07-29  
**Status**: Active / Ready for Execution  

---

## 1. Executive Summary & Module Overview

The **PIM** module is the core employee management component of the OrangeHRM application. It manages employee lifecycle, personal records, and acts as the foundation for other modules like Leave and Performance.

This Test Case Matrix covers end-to-end PIM functionality including:
- **Positive Scenarios**: Standard employee creation, updates, and deletion.
- **Negative Scenarios**: Invalid inputs, duplicate IDs, missing mandatory fields.
- **Boundary Value Scenarios**: Extreme input string lengths for names and IDs.
- **Edge & Security Scenarios**: Special character handling, supervisor permission scoping, and whitespace trimming.

---

## 2. Risk & Impact Prioritization Matrix

Test cases are prioritized using a standard Risk Model:  
$$\text{Risk} = \text{Impact if Broken} \times \text{Likelihood of Failure}$$

| Priority Level | Description | Execution & Automation Strategy |
|---|---|---|
| **P1 (Critical)** | Core employee creation, editing, and critical security/permission rules. Failure blocks HR operations. | **100% Automated** in CI/CD pipeline (Playwright E2E suite). Must pass prior to release. |
| **P2 (High / Medium)** | Search, bulk operations, edge cases like boundary values and whitespaces. | Automated where practical; covered in regression test cycles. |
| **P3 (Low)** | Cosmetic UI checks, image upload size constraints. | Manual exploratory test execution. |

---

## 3. Requirements Traceability & Test Case Matrix Summary

| Test Case ID | Req ID | Test Case Title | Category | Priority | Risk (Impact × Likelihood) | Automated? | Status | Notes |
|---|---|---|---|---|---|---|---|---|
| **TC-PIM-001** | REQ-PIM-01 | Add employee with only mandatory fields | Positive | **P1** | High × Low = **High** | Yes | **Partly Pass/Fail** | Only First name marked as mandatory |
| **TC-PIM-002** | REQ-PIM-02 | Add employee with all optional fields | Positive | **P1** | High × Low = **High** | Yes | **Fail** | Middle name isn't displayed |
| **TC-PIM-003** | REQ-PIM-03 | Prevent duplicate Employee ID | Negative | **P1** | High × Medium = **High** | Yes | **Fail** | Allows creation but search only shows the last one |
| **TC-PIM-004** | REQ-PIM-04 | Inline validation for missing mandatory fields | Negative | **P1** | High × Low = **High** | Yes | Pass | |
| **TC-PIM-005** | REQ-PIM-05 | Search employee by partial name | Positive | **P2** | Medium × Medium = **Medium** | No | Pass | |
| **TC-PIM-006** | REQ-PIM-06 | Edit an existing employee's personal details | Positive | **P1** | High × High = **Critical** | Yes | **Fail** | Requires manual reload to see updates |
| **TC-PIM-007** | REQ-PIM-07 | Delete employee with confirmation | Positive | **P2** | Medium × Low = **Medium** | No | Pass | |
| **TC-PIM-008** | REQ-PIM-08 | Reject oversized/invalid photo upload | Negative | **P3** | Low × Low = **Low** | No | Pass | |
| **TC-PIM-009** | REQ-PIM-09 | Supervisor permissions on subordinate profiles | Edge / Security | **P1** | High × Medium = **High** | No | Pass | |
| **TC-PIM-010** | REQ-PIM-10* | Boundary values for Name fields | Boundary | **P2** | Medium × Low = **Medium** | No | Not Yet Executed |  |
| **TC-PIM-011** | REQ-PIM-11* | Special characters & numbers in Name fields | Edge / Negative | **P2** | Medium × Medium = **Medium** | No | Not Yet Executed |  |
| **TC-PIM-012** | REQ-PIM-12* | Boundary values for Employee ID | Boundary | **P2** | Medium × Low = **Medium** | No | Not Yet Executed |  |
| **TC-PIM-013** | REQ-PIM-13* | Add employee with Login Details toggle enabled | Positive | **P1** | High × Low = **High** | Yes | Not Yet Executed |  |
| **TC-PIM-014** | REQ-PIM-14* | Bulk delete employees | Positive | **P2** | Medium × Low = **Medium** | Yes | Not Yet Executed |  |
| **TC-PIM-015** | REQ-PIM-15* | Search for non-existent employee | Negative | **P3** | Low × Medium = **Low** | No | Not Yet Executed |  |
| **TC-PIM-016** | REQ-PIM-16* | Leading and trailing whitespaces in Name fields | Edge / Boundary | **P2** | Medium × High = **High** | Yes | Not Yet Executed |  |

---

## 4. Detailed Test Specifications

### TC-PIM-001: Add employee with only mandatory fields
- **Linked Requirement**: [REQ-PIM-01](file:///Users/yuriikushniruk/Documents/Courses/Testing/orangehrm-qa-project/docs/requirements-traceability-matrix.md#L39)
- **Category**: Positive (Happy Path)
- **Priority**: P1 (Impact: High | Likelihood: Low)
- **Automation Status**: Automated (Playwright E2E)
- **Pre-conditions**: User is logged in as Admin and navigated to PIM > Add Employee.
- **Test Steps**:
  1. Enter valid `First Name` (e.g., "John").
  2. Enter valid `Last Name` (e.g., "Doe").
  3. Leave all other fields empty.
  4. Click `Save`.
- **Test Data**: `First Name: John`, `Last Name: Doe`
- **Expected Results**:
  1. Employee is created successfully.
  2. System redirects to the Personal Details page for the new employee.
- **Post-conditions**: Employee record exists in the database.

---

### TC-PIM-002: Add employee with all optional fields
- **Linked Requirement**: [REQ-PIM-02](file:///Users/yuriikushniruk/Documents/Courses/Testing/orangehrm-qa-project/docs/requirements-traceability-matrix.md#L40)
- **Category**: Positive
- **Priority**: P1 (Impact: High | Likelihood: Low)
- **Automation Status**: Automated (Playwright E2E)
- **Pre-conditions**: User is logged in as Admin and navigated to PIM > Add Employee.
- **Test Steps**:
  1. Enter valid `First Name`, `Middle Name`, and `Last Name`.
  2. Enter a unique `Employee Id`.
  3. Upload a valid profile photo.
  4. Click `Save`.
- **Test Data**: `First: Jane`, `Middle: Mary`, `Last: Smith`
- **Expected Results**:
  1. Employee is created successfully.
  2. All details including the Middle Name and photo are saved and displayed correctly.
- **Post-conditions**: Complete employee profile exists.

---

### TC-PIM-003: Prevent duplicate Employee ID
- **Linked Requirement**: [REQ-PIM-03](file:///Users/yuriikushniruk/Documents/Courses/Testing/orangehrm-qa-project/docs/requirements-traceability-matrix.md#L41)
- **Category**: Negative
- **Priority**: P1 (Impact: High | Likelihood: Medium)
- **Automation Status**: Automated (Playwright E2E)
- **Pre-conditions**: An employee with ID `0038` already exists. User is on Add Employee page.
- **Test Steps**:
  1. Enter valid First and Last names.
  2. Enter `0038` into the `Employee Id` field.
  3. Click `Save`.
- **Test Data**: `Employee Id: 0038`
- **Expected Results**:
  1. System blocks submission.
  2. Inline validation error "Employee Id already exists" is shown.
- **Post-conditions**: No duplicate employee record is created.

---

### TC-PIM-004: Inline validation for missing mandatory fields
- **Linked Requirement**: [REQ-PIM-04](file:///Users/yuriikushniruk/Documents/Courses/Testing/orangehrm-qa-project/docs/requirements-traceability-matrix.md#L42)
- **Category**: Negative
- **Priority**: P1 (Impact: High | Likelihood: Low)
- **Automation Status**: Automated (Playwright E2E)
- **Pre-conditions**: User is on Add Employee page.
- **Test Steps**:
  1. Clear the `First Name` and `Last Name` fields.
  2. Click `Save`.
- **Test Data**: Empty names.
- **Expected Results**:
  1. Form is not submitted.
  2. Inline "Required" error message appears under mandatory fields.
- **Post-conditions**: Page remains on Add Employee.

---

### TC-PIM-005: Search employee by partial name
- **Linked Requirement**: [REQ-PIM-05](file:///Users/yuriikushniruk/Documents/Courses/Testing/orangehrm-qa-project/docs/requirements-traceability-matrix.md#L43)
- **Category**: Positive
- **Priority**: P2 (Impact: Medium | Likelihood: Medium)
- **Automation Status**: Manual
- **Pre-conditions**: User is on Employee List page. Employees exist in the system.
- **Test Steps**:
  1. Enter partial text (e.g., "Joh") into the `Employee Name` search field.
  2. Click `Search`.
- **Test Data**: `Employee Name: Joh`
- **Expected Results**:
  1. The grid updates to display only employees whose names contain "Joh".
- **Post-conditions**: Filtered list view is active.

---

### TC-PIM-006: Edit an existing employee's personal details
- **Linked Requirement**: [REQ-PIM-06](file:///Users/yuriikushniruk/Documents/Courses/Testing/orangehrm-qa-project/docs/requirements-traceability-matrix.md#L44)
- **Category**: Positive
- **Priority**: P1 (Impact: High | Likelihood: High)
- **Automation Status**: Automated (Playwright E2E)
- **Pre-conditions**: User is on the Personal Details page of an existing employee.
- **Test Steps**:
  1. Modify the `First Name` and `Other Id`.
  2. Click `Save`.
- **Test Data**: Updated names and IDs.
- **Expected Results**:
  1. Changes are saved successfully (toast message appears).
  2. Modified details are immediately reflected in the UI without a manual page reload.
- **Post-conditions**: Employee data is updated in database.

---

### TC-PIM-007: Delete employee with confirmation
- **Linked Requirement**: [REQ-PIM-07](file:///Users/yuriikushniruk/Documents/Courses/Testing/orangehrm-qa-project/docs/requirements-traceability-matrix.md#L45)
- **Category**: Positive
- **Priority**: P2 (Impact: Medium | Likelihood: Low)
- **Automation Status**: Manual
- **Pre-conditions**: User is on Employee List page.
- **Test Steps**:
  1. Click the `Delete` (trash bin) icon next to an employee record.
  2. Confirm deletion in the popup dialog by clicking `Yes, Delete`.
- **Test Data**: Any disposable employee record.
- **Expected Results**:
  1. Confirmation dialog appears.
  2. After confirmation, toast message indicates success and the record disappears from the list.
- **Post-conditions**: Record is removed from the database.

---

### TC-PIM-008: Reject oversized/invalid photo upload
- **Linked Requirement**: [REQ-PIM-08](file:///Users/yuriikushniruk/Documents/Courses/Testing/orangehrm-qa-project/docs/requirements-traceability-matrix.md#L46)
- **Category**: Negative
- **Priority**: P3 (Impact: Low | Likelihood: Low)
- **Automation Status**: Manual
- **Pre-conditions**: User is on Add Employee page.
- **Test Steps**:
  1. Click on the profile picture placeholder.
  2. Select an image > 1MB or a non-image file (e.g., .txt).
- **Test Data**: `large_image.jpg` (> 1MB), `document.txt`
- **Expected Results**:
  1. Upload is rejected.
  2. An error message appears stating the file type/size is not supported.
- **Post-conditions**: Default profile image remains.

---

### TC-PIM-009: Supervisor permissions on subordinate profiles
- **Linked Requirement**: [REQ-PIM-09](file:///Users/yuriikushniruk/Documents/Courses/Testing/orangehrm-qa-project/docs/requirements-traceability-matrix.md#L47)
- **Category**: Edge Case / Security
- **Priority**: P1 (Impact: High | Likelihood: Medium)
- **Automation Status**: Manual
- **Pre-conditions**: Logged in as a Supervisor. Navigated to a subordinate's profile.
- **Test Steps**:
  1. View the Personal Details page.
  2. Attempt to edit fields.
- **Test Data**: Subordinate profile.
- **Expected Results**:
  1. Supervisor can view the profile.
  2. Only permitted fields (like Name, Gender) are editable; sensitive fields (like SSN, Salary) are hidden or read-only based on role config.
- **Post-conditions**: Security boundaries are maintained.

---

### TC-PIM-010: Boundary values for Name fields
- **Linked Requirement**: REQ-PIM-10 (Added High-Priority Case)
- **Category**: Boundary Value
- **Priority**: P2 (Impact: Medium | Likelihood: Low)
- **Automation Status**: Manual
- **Pre-conditions**: User is on Add Employee page.
- **Test Steps**:
  1. Enter a 50+ character string into `First Name`, `Middle Name`, and `Last Name`.
  2. Click `Save`.
- **Test Data**: String of 55 'A' characters.
- **Expected Results**:
  1. UI limits input length to the maximum allowed boundary or system trims/rejects gracefully.
  2. No database crash or 500 Server Error occurs.
- **Post-conditions**: System stability is maintained.

---

### TC-PIM-011: Special characters & numbers in Name fields
- **Linked Requirement**: REQ-PIM-11 (Added High-Priority Case)
- **Category**: Edge Case / Negative
- **Priority**: P2 (Impact: Medium | Likelihood: Medium)
- **Automation Status**: Manual
- **Pre-conditions**: User is on Add Employee page.
- **Test Steps**:
  1. Enter numbers and special characters (`John123!@#`) in the Name fields.
  2. Click `Save`.
- **Test Data**: `First Name: John123!@#`
- **Expected Results**:
  1. System either accepts them gracefully or displays a validation error preventing numbers/symbols in names.
- **Post-conditions**: No unhandled exceptions or broken encoding.

---

### TC-PIM-012: Boundary values for Employee ID
- **Linked Requirement**: REQ-PIM-12 (Added High-Priority Case)
- **Category**: Boundary Value
- **Priority**: P2 (Impact: Medium | Likelihood: Low)
- **Automation Status**: Manual
- **Pre-conditions**: User is on Add Employee page.
- **Test Steps**:
  1. Enter an Employee ID longer than 10-15 characters.
  2. Click `Save`.
- **Test Data**: `EMP-00000000000001`
- **Expected Results**:
  1. Input is restricted by `maxlength` or server validates the length properly.
- **Post-conditions**: DB field does not overflow.

---

### TC-PIM-013: Add employee with Login Details toggle enabled
- **Linked Requirement**: REQ-PIM-13 (Added High-Priority Case)
- **Category**: Positive
- **Priority**: P1 (Impact: High | Likelihood: Low)
- **Automation Status**: Automated (Playwright E2E)
- **Pre-conditions**: User is on Add Employee page.
- **Test Steps**:
  1. Fill valid First and Last names.
  2. Toggle `Create Login Details` to ON.
  3. Enter `Username`, `Password`, and `Confirm Password`.
  4. Select Status (Enabled).
  5. Click `Save`.
- **Test Data**: Complete login credential set.
- **Expected Results**:
  1. Both Employee profile and System User are created successfully.
  2. User can log in with the newly created credentials.
- **Post-conditions**: A new login account is fully functional.

---

### TC-PIM-014: Bulk delete employees
- **Linked Requirement**: REQ-PIM-14 (Added High-Priority Case)
- **Category**: Positive
- **Priority**: P2 (Impact: Medium | Likelihood: Low)
- **Automation Status**: Automated (Playwright E2E)
- **Pre-conditions**: User is on Employee List. Multiple disposable records exist.
- **Test Steps**:
  1. Check the boxes next to 2 or 3 employee records.
  2. Click `Delete Selected`.
  3. Confirm in the dialog popup.
- **Test Data**: Multiple employee rows.
- **Expected Results**:
  1. All selected records are deleted successfully and removed from the list.
- **Post-conditions**: Database is cleared of selected records.

---

### TC-PIM-015: Search for non-existent employee
- **Linked Requirement**: REQ-PIM-15 (Added High-Priority Case)
- **Category**: Negative
- **Priority**: P3 (Impact: Low | Likelihood: Medium)
- **Automation Status**: Manual
- **Pre-conditions**: User is on Employee List.
- **Test Steps**:
  1. Enter a completely random/non-existent string into the `Employee Name` field.
  2. Click `Search`.
- **Test Data**: `Employee Name: XyZ123NonExistent`
- **Expected Results**:
  1. The list clears and displays "No Records Found".
  2. No system error or crash occurs.
- **Post-conditions**: Search functionality remains stable.

---

### TC-PIM-016: Leading and trailing whitespaces in Name fields
- **Linked Requirement**: REQ-PIM-16 (Added High-Priority Case)
- **Category**: Edge Case / Boundary Value
- **Priority**: P2 (Impact: Medium | Likelihood: High)
- **Automation Status**: Automated (Playwright E2E)
- **Pre-conditions**: User is on Add Employee page.
- **Test Steps**:
  1. Enter First Name with leading/trailing spaces (`" John "`).
  2. Click `Save`.
  3. Navigate back to Employee List and search by `"John"`.
- **Test Data**: `" John "`
- **Expected Results**:
  1. System trims spaces before saving to DB.
  2. Employee can be found without matching the space characters.
- **Post-conditions**: Clean string data is saved.
