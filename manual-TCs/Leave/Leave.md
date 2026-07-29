# Test Case Matrix — Leave Module

**Module**: Leave (Leave Management)  
**Application**: OrangeHRM Open Source Demo (`https://opensource-demo.orangehrmlive.com`)  
**Author**: Yaryna Kushniruk  
**Last Updated**: 2026-07-29  
**Status**: Active / Ready for Execution  

---

## 1. Executive Summary & Module Overview

The **Leave** module manages employee time-off requests, approvals, entitlements, and balances. Accurate functionality in this module is essential for proper HR management, payroll tracking, and workforce planning.

This Test Case Matrix covers end-to-end Leave functionality including:
- **Positive Scenarios**: Applying for leave, supervisor approval/rejection flows, and verifying balances.
- **Negative Scenarios**: Applying with insufficient balance, end date preceding start date, missing mandatory fields.
- **Boundary Value Scenarios**: Leave applications crossing year boundaries.
- **Edge & Security Scenarios**: Role-based access control (ESS vs Admin), overlapping leave dates, and past date applications.

---

## 2. Risk & Impact Prioritization Matrix

Test cases are prioritized using a standard Risk Model:  
$$\text{Risk} = \text{Impact if Broken} \times \text{Likelihood of Failure}$$

| Priority Level | Description | Execution & Automation Strategy |
|---|---|---|
| **P1 (Critical)** | Core leave application, approval/rejection workflows, balance deduction, and overlapping date checks. Failure directly impacts payroll or system integrity. | **100% Automated** in CI/CD pipeline (Playwright E2E suite). Must pass prior to release. |
| **P2 (High / Medium)** | Non-critical flows like past dates, year boundaries, cancellation of pending requests, and weekends/holidays calculation. | Automated where practical; covered in regression test cycles. |
| **P3 (Low)** | File upload validations for leave attachments. | Manual exploratory test execution. |

---

## 3. Requirements Traceability & Test Case Matrix Summary

| Test Case ID | Req ID | Test Case Title | Category | Priority | Risk (Impact × Likelihood) | Automated? | Status | Notes |
|---|---|---|---|---|---|---|---|---|
| **TC-LEAVE-001** | REQ-LEAVE-01 | User can apply for leave with a valid date range | Positive | **P1** | High × Low = **High** | Yes | Pass | |
| **TC-LEAVE-002** | REQ-LEAVE-02 | Reject leave application where end date precedes start date | Negative | **P1** | High × Medium = **High** | Yes | Pass | |
| **TC-LEAVE-003** | REQ-LEAVE-03 | System checks leave application against available balance | Negative / Functional | **P1** | High × High = **Critical** | Yes | Pass | |
| **TC-LEAVE-004** | REQ-LEAVE-04 | Handle overlapping leave date ranges for the same employee | Edge / Security | **P1** | High × Medium = **High** | Yes | Pass | |
| **TC-LEAVE-005** | REQ-LEAVE-05 | User cannot apply for leave on a past date | Negative / Functional | **P2** | Medium × High = **High** | No | **Fail** | User can apply for past dates |
| **TC-LEAVE-006** | REQ-LEAVE-06 | Admin/Supervisor can approve a pending leave request | Positive | **P1** | High × Low = **High** | Yes | Pass | |
| **TC-LEAVE-007** | REQ-LEAVE-07 | Admin/Supervisor can reject a pending leave request | Positive | **P1** | High × Low = **High** | Yes | Pass | |
| **TC-LEAVE-008** | REQ-LEAVE-08 | ESS role access control for Leave List / Assign Leave | Edge / Security | **P1** | High × Low = **High** | No | Pass | |
| **TC-LEAVE-009** | REQ-LEAVE-09 | Leave applied across a year boundary | Boundary Value | **P2** | Medium × High = **High** | No | Pass | |
| **TC-LEAVE-010** | REQ-LEAVE-10 | Apply for Half Day (Morning/Evening) or Specific Time | Functional | **P1** | High × Low = **High** | Yes | Pass | |
| **TC-LEAVE-011** | REQ-LEAVE-11 | User can cancel a pending leave request | Positive / Functional | **P2** | Medium × Medium = **Medium** | No | Pass | |
| **TC-LEAVE-012** | REQ-LEAVE-12* | Apply for leave spanning weekends/holidays | Edge / Functional | **P1** | High × High = **Critical** | No | Not Yet Executed | *Added High-Priority Case |
| **TC-LEAVE-013** | REQ-LEAVE-13* | Mandatory field validation (Missing Leave Type) | Negative | **P1** | High × Low = **High** | Yes | Not Yet Executed | *Added High-Priority Case |
| **TC-LEAVE-014** | REQ-LEAVE-14* | Apply for partial leave on multiple days | Functional / Boundary | **P2** | High × Medium = **High** | No | Not Yet Executed | *Added High-Priority Case |
| **TC-LEAVE-015** | REQ-LEAVE-15* | Invalid file upload attachment for leave request | Negative | **P3** | Low × Low = **Low** | No | Not Yet Executed | *Added High-Priority Case |

---

## 4. Detailed Test Specifications

### TC-LEAVE-001: User can apply for leave with a valid date range
- **Linked Requirement**: [REQ-LEAVE-01](file:///Users/yuriikushniruk/Documents/Courses/Testing/orangehrm-qa-project/docs/requirements-traceability-matrix.md#L53)
- **Category**: Positive (Happy Path)
- **Priority**: P1 (Impact: High | Likelihood: Low)
- **Automation Status**: Automated (Playwright E2E)
- **Pre-conditions**: User is logged in with ESS role and has sufficient leave balance.
- **Test Steps**:
  1. Navigate to Leave > Apply.
  2. Select `Leave Type` (e.g., Annual Leave).
  3. Select valid `From Date` and `To Date` in the future.
  4. Click `Apply`.
- **Test Data**: `Leave Type: Annual Leave`, Dates: valid future range.
- **Expected Results**:
  1. Leave is applied successfully (toast message displays).
  2. The application appears in the "My Leave" list with "Pending Approval" status.
  3. Leave balance is temporarily blocked/updated.
- **Post-conditions**: Leave request exists in DB.

---

### TC-LEAVE-002: Reject leave application where end date precedes start date
- **Linked Requirement**: [REQ-LEAVE-02](file:///Users/yuriikushniruk/Documents/Courses/Testing/orangehrm-qa-project/docs/requirements-traceability-matrix.md#L54)
- **Category**: Negative
- **Priority**: P1 (Impact: High | Likelihood: Medium)
- **Automation Status**: Automated (Playwright E2E)
- **Pre-conditions**: User is on the Apply Leave page.
- **Test Steps**:
  1. Select a valid `Leave Type`.
  2. Select `From Date` as tomorrow.
  3. Select `To Date` as today (a date before the From Date).
  4. Click `Apply`.
- **Test Data**: `From Date: 2026-08-10`, `To Date: 2026-08-01`
- **Expected Results**:
  1. System displays an inline error message (e.g., "To date should be after from date").
  2. The form is not submitted.
- **Post-conditions**: No leave request is created.

---

### TC-LEAVE-003: System checks leave application against available balance
- **Linked Requirement**: [REQ-LEAVE-03](file:///Users/yuriikushniruk/Documents/Courses/Testing/orangehrm-qa-project/docs/requirements-traceability-matrix.md#L55)
- **Category**: Negative / Functional
- **Priority**: P1 (Impact: High | Likelihood: High)
- **Automation Status**: Automated (Playwright E2E)
- **Pre-conditions**: User has 2 days of balance for a specific Leave Type.
- **Test Steps**:
  1. Select `Leave Type`.
  2. Select a date range spanning 3 working days.
  3. Click `Apply`.
- **Test Data**: 3 days requested vs 2 days available.
- **Expected Results**:
  1. System rejects the application or displays an insufficient balance warning.
  2. Form is blocked from submitting or explicitly flagged.
- **Post-conditions**: Employee cannot exceed entitlement.

---

### TC-LEAVE-004: Handle overlapping leave date ranges for the same employee
- **Linked Requirement**: [REQ-LEAVE-04](file:///Users/yuriikushniruk/Documents/Courses/Testing/orangehrm-qa-project/docs/requirements-traceability-matrix.md#L56)
- **Category**: Edge Case / Security
- **Priority**: P1 (Impact: High | Likelihood: Medium)
- **Automation Status**: Automated (Playwright E2E)
- **Pre-conditions**: User already has an approved leave request for a specific date (e.g., 2026-08-15).
- **Test Steps**:
  1. Navigate to Apply Leave.
  2. Apply for another leave that overlaps with the existing approved date (2026-08-15).
  3. Click `Apply`.
- **Test Data**: Overlapping date range.
- **Expected Results**:
  1. System identifies the overlap and blocks the submission.
  2. Error message: "Overlapping leave request exists".
- **Post-conditions**: No duplicate deduction for the same day.

---

### TC-LEAVE-005: User cannot apply for leave on a past date
- **Linked Requirement**: [REQ-LEAVE-05](file:///Users/yuriikushniruk/Documents/Courses/Testing/orangehrm-qa-project/docs/requirements-traceability-matrix.md#L57)
- **Category**: Negative / Functional
- **Priority**: P2 (Impact: Medium | Likelihood: High)
- **Automation Status**: Manual
- **Pre-conditions**: User is on Apply Leave page.
- **Test Steps**:
  1. Select a date in the past for both `From Date` and `To Date`.
  2. Click `Apply`.
- **Test Data**: Any past date.
- **Expected Results**:
  1. Ideally, the system should reject past date applications or prompt for a reason/special permission. (Note: Currently fails as system allows this without warning).
- **Post-conditions**: N/A

---

### TC-LEAVE-006: Admin/Supervisor can approve a pending leave request
- **Linked Requirement**: [REQ-LEAVE-06](file:///Users/yuriikushniruk/Documents/Courses/Testing/orangehrm-qa-project/docs/requirements-traceability-matrix.md#L58)
- **Category**: Positive
- **Priority**: P1 (Impact: High | Likelihood: Low)
- **Automation Status**: Automated (Playwright E2E)
- **Pre-conditions**: A subordinate has applied for leave. The request is "Pending Approval". User is logged in as Supervisor.
- **Test Steps**:
  1. Navigate to Leave > Leave List.
  2. Find the pending request and click `Approve`.
- **Test Data**: Pending leave record.
- **Expected Results**:
  1. Status updates to "Scheduled".
  2. Employee's leave balance is permanently deducted.
- **Post-conditions**: Employee is officially on leave.

---

### TC-LEAVE-007: Admin/Supervisor can reject a pending leave request
- **Linked Requirement**: [REQ-LEAVE-07](file:///Users/yuriikushniruk/Documents/Courses/Testing/orangehrm-qa-project/docs/requirements-traceability-matrix.md#L59)
- **Category**: Positive
- **Priority**: P1 (Impact: High | Likelihood: Low)
- **Automation Status**: Automated (Playwright E2E)
- **Pre-conditions**: A subordinate has applied for leave. User is logged in as Supervisor.
- **Test Steps**:
  1. Navigate to Leave > Leave List.
  2. Find the pending request and click `Reject`.
- **Test Data**: Pending leave record.
- **Expected Results**:
  1. Status updates to "Rejected".
  2. Any blocked leave balance is restored to the employee.
- **Post-conditions**: Leave request is denied.

---

### TC-LEAVE-008: ESS role access control for Leave List / Assign Leave
- **Linked Requirement**: [REQ-LEAVE-08](file:///Users/yuriikushniruk/Documents/Courses/Testing/orangehrm-qa-project/docs/requirements-traceability-matrix.md#L60)
- **Category**: Edge Case / Security
- **Priority**: P1 (Impact: High | Likelihood: Low)
- **Automation Status**: Manual
- **Pre-conditions**: User is logged in with purely ESS (non-admin/non-supervisor) credentials.
- **Test Steps**:
  1. Inspect the Leave top menu navigation.
  2. Attempt to deep-link directly to `/web/index.php/leave/viewLeaveList` or `/leave/assignLeave`.
- **Test Data**: Deep links.
- **Expected Results**:
  1. "Leave List" and "Assign Leave" options are not visible in the menu.
  2. Direct URL access redirects to dashboard or shows "Access Denied".
- **Post-conditions**: Role security maintained.

---

### TC-LEAVE-009: Leave applied across a year boundary
- **Linked Requirement**: [REQ-LEAVE-09](file:///Users/yuriikushniruk/Documents/Courses/Testing/orangehrm-qa-project/docs/requirements-traceability-matrix.md#L61)
- **Category**: Boundary Value
- **Priority**: P2 (Impact: Medium | Likelihood: High)
- **Automation Status**: Manual
- **Pre-conditions**: Employee has valid entitlements for the current year and the upcoming year.
- **Test Steps**:
  1. Apply for leave starting on Dec 30th and ending on Jan 3rd.
  2. Click `Apply`.
  3. Supervisor approves.
- **Test Data**: `Dec 30` to `Jan 03`
- **Expected Results**:
  1. System correctly calculates the deduction across the two distinct annual entitlement periods.
- **Post-conditions**: Balances for both years are accurate.

---

### TC-LEAVE-010: Apply for Half Day (Morning/Evening) or Specific Time
- **Linked Requirement**: [REQ-LEAVE-10](file:///Users/yuriikushniruk/Documents/Courses/Testing/orangehrm-qa-project/docs/requirements-traceability-matrix.md#L62)
- **Category**: Functional
- **Priority**: P1 (Impact: High | Likelihood: Low)
- **Automation Status**: Automated (Playwright E2E)
- **Pre-conditions**: User is on Apply Leave page.
- **Test Steps**:
  1. Select a single date.
  2. In the Duration dropdown, select "Half Day".
  3. Specify Morning or Evening.
  4. Click `Apply`.
- **Test Data**: Half-day request.
- **Expected Results**:
  1. Leave is applied for 0.5 days.
  2. Balance is deducted by exactly 0.5 days upon approval.
- **Post-conditions**: Accurate partial deduction.

---

### TC-LEAVE-011: User can cancel a pending leave request
- **Linked Requirement**: [REQ-LEAVE-11](file:///Users/yuriikushniruk/Documents/Courses/Testing/orangehrm-qa-project/docs/requirements-traceability-matrix.md#L63)
- **Category**: Positive / Functional
- **Priority**: P2 (Impact: Medium | Likelihood: Medium)
- **Automation Status**: Manual
- **Pre-conditions**: User has an active leave request in "Pending Approval" state.
- **Test Steps**:
  1. Navigate to My Leave.
  2. Click `Cancel` next to the pending request.
- **Test Data**: Pending leave record.
- **Expected Results**:
  1. The request status updates to "Cancelled".
  2. Blocked balance is immediately restored.
- **Post-conditions**: Employee reclaims balance.

---

### TC-LEAVE-012: Apply for leave spanning weekends/holidays
- **Linked Requirement**: REQ-LEAVE-12 (Added High-Priority Case)
- **Category**: Edge Case / Functional
- **Priority**: P1 (Impact: High | Likelihood: High)
- **Automation Status**: Manual
- **Pre-conditions**: Employee works standard Monday-Friday. A weekend falls within the date range.
- **Test Steps**:
  1. Apply for leave from Thursday to Tuesday (6 calendar days).
  2. Click `Apply` and view the summary.
- **Test Data**: 6 calendar days including Saturday and Sunday.
- **Expected Results**:
  1. System accurately calculates the duration as 4 working days (excluding the 2 weekend days).
  2. Only 4 days are deducted from the leave balance.
- **Post-conditions**: Employee is not penalized for weekends.

---

### TC-LEAVE-013: Mandatory field validation (Missing Leave Type)
- **Linked Requirement**: REQ-LEAVE-13 (Added High-Priority Case)
- **Category**: Negative
- **Priority**: P1 (Impact: High | Likelihood: Low)
- **Automation Status**: Automated (Playwright E2E)
- **Pre-conditions**: User is on Apply Leave page.
- **Test Steps**:
  1. Select `From Date` and `To Date`.
  2. Leave the `Leave Type` dropdown unselected.
  3. Click `Apply`.
- **Test Data**: Empty Leave Type.
- **Expected Results**:
  1. Form submission is blocked.
  2. "Required" inline validation message appears beneath the Leave Type dropdown.
- **Post-conditions**: No leave applied.

---

### TC-LEAVE-014: Apply for partial leave on multiple days
- **Linked Requirement**: REQ-LEAVE-14 (Added High-Priority Case)
- **Category**: Functional / Boundary
- **Priority**: P2 (Impact: High | Likelihood: Medium)
- **Automation Status**: Manual
- **Pre-conditions**: User is on Apply Leave page.
- **Test Steps**:
  1. Select a date range spanning 3 days.
  2. Attempt to configure the duration such that specific days are half-days or specific times (e.g., Start day half, End day full).
  3. Click `Apply`.
- **Test Data**: Start Day: Half Day, End Day: Full Day.
- **Expected Results**:
  1. The system accurately calculates total duration (e.g., 2.5 days).
  2. Balance deductions reflect the exact decimal value.
- **Post-conditions**: Accurate partial multi-day calculation.

---

### TC-LEAVE-015: Invalid file upload attachment for leave request
- **Linked Requirement**: REQ-LEAVE-15 (Added High-Priority Case)
- **Category**: Negative
- **Priority**: P3 (Impact: Low | Likelihood: Low)
- **Automation Status**: Manual
- **Pre-conditions**: User is on Apply Leave page.
- **Test Steps**:
  1. Fill in valid leave details.
  2. Under Attachments, attempt to upload a 50MB file or an executable (`.exe`).
  3. Click `Apply`.
- **Test Data**: `virus.exe`, `huge_video.mp4`
- **Expected Results**:
  1. System rejects the file attachment due to size/format constraints.
  2. Validation error displays (e.g., "Attachment Size Exceeded").
- **Post-conditions**: Server storage remains protected.
