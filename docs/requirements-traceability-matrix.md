# Requirements Traceability Matrix (RTM) — OrangeHRM QA Project

Requirements below are derived from two kinds of sources:
- **App** — observed behavior on `opensource-demo.orangehrmlive.com`
- **UG** — OrangeHRM User Guide article (https://help.orangehrm.com/hc/en-us/categories/360002207133-User-Guides)

Priorities (P1/P2/P3) are carried over directly from the risk table in
`test-strategy.md` §4.

Test Case IDs reference `modules/Login:Authentication/test-cases.md`. Status will be
updated as cases are executed; currently all are **Not Yet Executed**.

---

## Login / Authentication
 
| Req ID | Requirement | Source | Priority | Test Case ID(s) | Automated? | Status | Notes |
|---|---|---|---|---|---|---|
| REQ-LOGIN-01 | User can log in with valid username and password | Derived | P1 | TC-LOGIN-001 | Y | Pass |
| REQ-LOGIN-02 | System rejects invalid username/password with a clear error message | Derived | P1 | TC-LOGIN-002 | Y | Pass |
| REQ-LOGIN-03 | System blocks submission when username or password field is empty | Derived | P1 | TC-LOGIN-003 | Y | Pass |
| REQ-LOGIN-04 | System handles script/SQL-injection-style input safely (no crash, no bypass) | Derived | P1 | TC-LOGIN-004 | Y | Pass |
| REQ-LOGIN-05 | "Forgot Password" flow is reachable and displays expected confirmation step | Derived | P2 | TC-LOGIN-005 | N | Pass |
| REQ-LOGIN-06 | Username/password fields behave consistently regarding case sensitivity | Derived | P2 | TC-LOGIN-006 | N | Pass |
| REQ-LOGIN-07 | User logout invalidates the active session and redirects to the login page | Derived | P1 | TC-LOGIN-007 | Y | Pass |
| REQ-LOGIN-08 | Post-logout browser back-button navigation is blocked by session cache headers (no cached authenticated page accessible) | Derived | P1 | TC-LOGIN-008 | N | Pass |
| REQ-LOGIN-09 | System handles leading/trailing whitespace in username and password fields consistently (trim or reject) | Derived | P2 | TC-LOGIN-009 | Y | **Fail** | Allowed to log in for `"Admin "` username but refused for `" Admin"`
| REQ-LOGIN-10 | Session inactivity timeout expires the session and forces re-authentication on the next user action | Derived | P1 | TC-LOGIN-010 | N | Pass |
| REQ-LOGIN-11 | Username and password fields enforce a maximum character boundary; server returns a structured error (no crash) on over-length input | Derived | P2 | TC-LOGIN-011 | Y | Pass |
| REQ-LOGIN-12 | Direct deep-link to any protected page without an active session redirects the user to the login page | Derived | P1 | TC-LOGIN-012 | Y | Pass |
| REQ-LOGIN-13 | Password input field masks characters by default (type="password") to prevent shoulder-surfing | Derived | P2 | TC-LOGIN-013 | N | Pass |
~~| REQ-LOGIN-14 | Repeated consecutive failed login attempts trigger rate limiting, CAPTCHA, or a temporary account lockout | Derived | P1 | TC-LOGIN-014 |~~ N | **Fail** | Feature not implemented
| REQ-LOGIN-15 | "Forgot Password" with a non-existent username returns the same generic confirmation message as a valid request (prevents user enumeration) | Derived | P2 | TC-LOGIN-015 | N | **Fail** |

## PIM — Employee Management
 
| Req ID | Requirement | Source | Priority | Test Case ID(s) | Automated? | Status | Notes |
|---|---|---|---|---|---|---|
| REQ-PIM-01 | User can add an employee providing only mandatory fields (First/Last name) | Derived | P1 | TC-PIM-001 | Y | **Partly Pass/Fail** | Only First name marked as mandatory field with a star symbol |
| REQ-PIM-02 | User can add an employee with all optional fields populated, and data persists correctly | *How to use the Employee Management Module [Admin]* | P1 | TC-PIM-002 | Y | **Fail** | Middle name isn't displayed
| REQ-PIM-03 | System prevents/flags duplicate Employee ID | Derived | P1 | TC-PIM-003 | Y | **Fail** | Allows to create duplicate Employee ID but when searched by Employee id in search list it's shown only the last one |
| REQ-PIM-04 | System shows inline validation when a mandatory field is left blank | Derived | P1 | TC-PIM-004 | Y | Pass |
| REQ-PIM-05 | User can search for an employee by partial name/~~filter~~ and get correctly filtered results | *How to Access the Employee Management* (Supervisor) ~~— filter icon in Employee List~~ | P2 | TC-PIM-005 | N | Pass | Requirement is not relevant for demo version, there is not filter icon for Supervisor
| REQ-PIM-06 | User can edit an existing employee's personal details and changes persist | *How to Access the Employee Management* (Supervisor) — Personal Details tab, editable fields | P1 | TC-PIM-006 | Y | **Fail** | Isn't updated on the same page, only after reloading the page
| REQ-PIM-07 | User can delete an employee record, with confirmation required before deletion | Derived | P2 | TC-PIM-007 | N | Pass |
| REQ-PIM-08 | System rejects photo uploads exceeding allowed size/format | Derived | P3 | TC-PIM-008 | N | Pass |
| REQ-PIM-09 | Supervisor can view a subordinate's profile but editable fields are limited per permission (Name, Gender, etc. only) | *How to Access the Employee Management* (Supervisor) — permission-scoped edit rights | P1 | TC-PIM-009 | N | Pass |

## Leave — Apply / Approve
 
| Req ID | Requirement | Source | Priority | Test Case ID(s) | Automated? | Status |
|---|---|---|---|---|---|---|
| REQ-LEAVE-01 | User can apply for leave with a valid date range, and it appears under "My Leave" | *How to use Leave Module* — Apply screen | P1 | TC-LEAVE-001 | Y | Pass |
| REQ-LEAVE-02 | System rejects a leave application where the end date precedes the start date | Derived | P1 | TC-LEAVE-002 | Y | Pass |
| REQ-LEAVE-03 | System checks/flags a leave application against the employee's available leave balance ("Check Leave Balance" link) | *How to use Leave Module* | P1 | TC-LEAVE-003 | Y | Pass |
| REQ-LEAVE-04 | System correctly handles overlapping leave date ranges for the same employee | Derived | P1 | TC-LEAVE-004 | Y | Pass |
| REQ-LEAVE-05 | User cannot apply for leave on a past date | Derived | P2 | TC-LEAVE-005 | N | **Fail** | User can apply for past dates
| REQ-LEAVE-06 | Admin/Supervisor can approve a pending leave request, and status updates for the employee | *How to Use OrangeHRM Leave Module [ESS]* — leave request stages (Pending Approval → Scheduled) | P1 | TC-LEAVE-006 | Y | Pass |
| REQ-LEAVE-07 | Admin/Supervisor can reject a pending leave request, and status updates for the employee | *How to Use OrangeHRM Leave Module [ESS]* | P1 | TC-LEAVE-007 | Y | Pass |
| REQ-LEAVE-08 | ESS (non-admin) role does not see "Leave List" / "Assign Leave" options available to Admin/Supervisor | *How to Use OrangeHRM Leave Module [ESS]* — explicitly states these are unavailable to ESS users | P1 | TC-LEAVE-008 | N | Pass |
| REQ-LEAVE-09 | Leave applied across a year boundary calculates/displays correctly against entitlement | *Leave Overview* / *How to manage Leave entitlements* — leave period tied to configured leave year | P2 | TC-LEAVE-009 | N | Pass |
| REQ-LEAVE-10 | User can select duration as Full Day, Half Day (Morning/Evening), or Specific Time when applying for leave | *How to use Leave Module* | P1 | TC-LEAVE-010 | Y | Pass |
| REQ-LEAVE-11 | User can cancel a leave request that is in "Pending Approval" status | *How to Use OrangeHRM Leave Module [ESS]* | P2 | TC-LEAVE-011 | N | Pass |
 
---
 
## Coverage Summary
 
| Module | Total Reqs | P1 | P2 | P3 | Automated | Manual-only | Officially Sourced | Derived |
|---|---|---|---|---|---|---|---|---|
| Login | 15 | 9 | 6 | 0 | 8 | 7 | 0 | 15 |
| PIM | 9 | 6 | 2 | 1 | 5 | 4 | 3 | 6 |
| Leave | 11 | 8 | 3 | 0 | 6 | 5 | 8 | 3 |
| **Total** | **35** | **23** | **11** | **1** | **19** | **16** | **11** | **24** |
 

## Note
As `test-cases.md` and the Playwright suite are built, this matrix will be updated in the same pass. Status values to use going forward: `Not Yet Executed`, `Pass`, `Fail (linked bug ID)`, `Blocked`.
 
## Sources
 
- How to use Leave Module (Supervisor/Admin) — help.orangehrm.com/hc/en-us/articles/360036161154
- How to Use OrangeHRM Leave Module [ESS] — help.orangehrm.com/hc/en-us/articles/900003427926
- Leave Overview — help.orangehrm.com/hc/en-us/articles/900004432586
- How to manage Leave entitlements for employees — help.orangehrm.com/hc/en-us/articles/18184093038617
- How to Access the Employee Management (Supervisor) — help.orangehrm.com/hc/en-us/articles/41780167795481
- How to use the Employee Management Module [Admin] — help.orangehrm.com/hc/en-us/articles/900004605226
 