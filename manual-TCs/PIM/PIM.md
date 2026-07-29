# PIM Module Test Case Matrix

This document outlines the manual and automated test cases for the Personnel Information Management (PIM) module. It maps test cases against the Requirements Traceability Matrix (RTM) and includes positive, negative, edge cases, and boundary testing scenarios.

## 1. RTM Test Cases

| Test Case ID | Req ID | Title / Scenario | Type | Priority | Expected Result |
|---|---|---|---|---|---|
| TC-PIM-001 | REQ-PIM-01 | Add employee with only mandatory fields | Positive | P1 | Employee is created successfully when only First Name and Last Name are provided. |
| TC-PIM-002 | REQ-PIM-02 | Add employee with all optional fields | Positive | P1 | Employee is created and all details (Middle name, etc.) are saved and displayed correctly. |
| TC-PIM-003 | REQ-PIM-03 | Prevent duplicate Employee ID | Negative | P1 | System should display an error message and prevent saving if the Employee ID already exists. |
| TC-PIM-004 | REQ-PIM-04 | Inline validation for missing mandatory fields | Negative | P1 | "Required" validation message appears under blank mandatory fields (e.g., First/Last name). |
| TC-PIM-005 | REQ-PIM-05 | Search employee by partial name | Positive | P2 | The employee list filters correctly to match the partial name query. |
| TC-PIM-006 | REQ-PIM-06 | Edit an existing employee's personal details | Positive | P1 | Changes to personal details persist immediately and are reflected on the page without manual reload. |
| TC-PIM-007 | REQ-PIM-07 | Delete employee with confirmation | Positive | P2 | A confirmation dialog appears; upon confirming, the employee record is deleted from the system. |
| TC-PIM-008 | REQ-PIM-08 | Reject oversized/invalid photo upload | Negative | P3 | System rejects photos > 1MB or invalid formats (e.g., .txt) with a clear error message. |
| TC-PIM-009 | REQ-PIM-09 | Supervisor permissions on subordinate profiles | Edge / Security | P1 | Supervisor can view profile but can only edit allowed fields (Name, Gender, etc.). |

## 2. Additional High Priority / Edge Case / Boundary Test Cases

The following test cases have been added due to their high impact if broken and likelihood of failure in real-world usage.

| Test Case ID | Title / Scenario | Type | Priority | Expected Result | Impact |
|---|---|---|---|---|---|
| TC-PIM-010 | Boundary values for Name fields | Boundary | P2 | System accepts up to the maximum character limit (e.g., 30 or 50 chars) for First/Middle/Last names and rejects inputs exceeding this limit without crashing. | Data truncation / DB errors |
| TC-PIM-011 | Special characters & numbers in Name fields | Edge / Negative | P2 | System should handle special characters gracefully. (Ideally, numbers and certain special characters should be rejected with validation). | Data integrity issues |
| TC-PIM-012 | Boundary values for Employee ID | Boundary | P2 | System accepts up to 10 alphanumeric characters for Employee ID. Inputs exceeding this length are truncated or rejected with an error. | DB field overflow |
| TC-PIM-013 | Add employee with Login Details toggle enabled | Positive | P1 | When toggled, fields for Username, Password, and Status appear. Saving creates both the employee record and the user account. | Blocking user onboarding |
| TC-PIM-014 | Bulk delete employees | Positive | P2 | Selecting multiple employee checkboxes and clicking "Delete Selected" successfully removes all selected records after confirmation. | Functional failure in list management |
| TC-PIM-015 | Search for non-existent employee | Negative | P3 | Searching for a non-existent name or ID returns a "No Records Found" message and does not crash the list view. | Bad UX / Unhandled exceptions |
| TC-PIM-016 | Leading and trailing whitespaces in Name fields | Edge | P2 | System trims leading and trailing whitespaces from First, Middle, and Last name fields before saving. | Search failures / Duplicate entries |
