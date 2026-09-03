# Title
[BUG-004] Middle Name is not displayed after saving Add Employee form

## Bug Report

| Field | Value |
|---|---|
| **Test Case ID** | `TC-PIM-002` |
| **Requirement ID** | `REQ-PIM-02` |
| **Reported By** | Yaryna Kushniruk |
| **Date Found** | 2026-07-22 |
| **Module** | PIM / Employee Management |
| **Priority** | Medium |
| **Severity** | Medium |
| **Category** | Functional / Data Display |
| **Environment** | OrangeHRM OS 5.9, Chrome v. 150.0.7871.115 |

---

## Summary

When adding a new employee with First Name, Middle Name, and Last Name all populated, the Middle Name is not displayed after the record is saved - despite REQ-PIM-02 requiring that all entered details, including Middle Name, be saved and shown correctly. It is unclear whether the value is dropped on save or simply not rendered in the UI.

---

## Steps to Reproduce

**Pre-condition:** User is logged in as Admin and has navigated to PIM > Add Employee.


1. Enter **First Name**: "Jane".
2. Enter **Middle Name**: "Mary".
3. Enter **Last Name**: "Smith".
4. Enter a unique **Employee Id**.
5. Upload a valid profile photo.
6. Click **Save**.
7. Observe the employee's Personal Details page / employee list.

---

## Expected Result

Per REQ-PIM-02, all entered fields, including Middle Name, should be saved and displayed correctly:
- Personal Details page shows full name as "Jane Mary Smith" (or equivalent First/Middle/Last layout).
- Employee list / search results reflect the Middle Name where applicable.

---

## Actual Result

Employee is created successfully and First Name/Last Name display correctly, but Middle Name is missing from the Personal Details page after save.

---

## Environment

- **Application:** OrangeHRM Open Source Demo (OrangeHRM OS 5.9)
- **URL:** `https://opensource-demo.orangehrmlive.com`
- **Browser:** Chrome v. 150.0.7871.115

---

## Recommended Fix

Investigate whether Middle Name is:
- Not persisted to the database on save (backend issue), or
- Persisted correctly but omitted from the Personal Details / list view template (frontend display issue).

---

## Notes
- Recommend checking via the employee edit form whether Middle Name reloads correctly into the input field — this will help isolate persistence vs. display-only bug.
- Related test case file: modules/PIM/test-cases.md


# Title
[BUG-005] Duplicate Employee ID is not blocked; search only shows the most recently created record

## Bug Report

| Field | Value |
|---|---|
| **Test Case ID** | `TC-PIM-003` |
| **Requirement ID** | `REQ-PIM-03` |
| **Reported By** | Yaryna Kushniruk |
| **Date Found** | 2026-07-22 |
| **Module** | PIM / Employee Management |
| **Priority** | High |
| **Severity** | Critical |
| **Category** | Negative / Data Display |
| **Environment** | OrangeHRM OS 5.9, Chrome v. 150.0.7871.115 |

---

## Summary

The system does not prevent creating a new employee with an **Employee Id** that already exists. Instead of blocking submission with a validation error, the record is saved successfully — resulting in two employee records sharing the same **Employee Id**. Additionally, the Employee List / PIM search only surfaces the most recently created record for that ID, effectively hiding the original employee from search results while their record still exists in the database.

---

## Steps to Reproduce

**Pre-condition:** An employee with **Employee Id 0038** already exists (e.g., "Mary Smith").

1. Navigate to PIM > Add Employee.
2. Enter **First Name** and **Last Name** (e.g "Bob Smith").
3. Enter **0038** into the **Employee Id** field.
4. Click **Save**.
5. Navigate to PIM > Employee List and search by **Employee Id 0038**.


---

## Expected Result

Per REQ-PIM-03:
- Submission is blocked before save.
- An inline validation error, "Employee Id already exists", is shown.
- No duplicate record is created — searching 0038 continues to return only the original employee.

---

## Actual Result

- Save with duplicate Employee Id 0038 succeeds — no validation error shown
- Search Employee List by ID 0038 only shows the newest record ("Bob Smith")

---

## Environment

- **Application:** OrangeHRM Open Source Demo (OrangeHRM OS 5.9)
- **URL:** `https://opensource-demo.orangehrmlive.com`
- **Browser:** Chrome v. 150.0.7871.115

---

## Recommended Fix

- Add a uniqueness check on Employee Id at both client-side (inline validation) and server-side (DB constraint / pre-save lookup) to block duplicate submissions entirely.
- Investigate the search/list behavior separately: confirm whether the original record still exists in the database (data-loss risk) or was overwritten (silent data corruption) — this is a potential data-integrity issue independent of the missing validation.
Add a unique index/constraint on employee_id at the database level as a last line of defense.

---

## Notes
- This is flagged as Critical severity: beyond a missing validation message, it points to a possible silent overwrite or an inconsistent search index, either of which risks data loss or misattributed employee records.
- Recommend a follow-up test: verify via direct DB query or the Admin > User records whether both "Mary smith" and "Bob Smith" still exist as separate rows.
- Related test case file: modules/PIM/test-cases.md


# Title
[BUG-006] Updated Personal Details not reflected in UI without manual page reload

## Bug Report

| Field | Value |
|---|---|
| **Test Case ID** | `TC-PIM-006` |
| **Requirement ID** | `REQ-PIM-06` |
| **Reported By** | Yaryna Kushniruk |
| **Date Found** | 2026-07-22 |
| **Module** | PIM / Employee Management |
| **Priority** | Low |
| **Severity** | Minor |
| **Category** | Functional / UI |
| **Environment** | OrangeHRM OS 5.9, Chrome v. 150.0.7871.115 |

---

## Summary

When editing an existing employee's **First Name** and **Other Id** on the Personal Details page, the save succeeds (toast message appears) and the data is correctly persisted to the database, but the UI continues to display the old, stale values until the user manually reloads the page. 

---

## Steps to Reproduce

**Pre-condition:** User is on the Personal Details page of an existing employee.

1. Modify **First Name** (e.g., "John" -> "Jonathan").
2. Modify **Other Id** (e.g., "O189" -> "O289").
3. Click **Save**.
4. Observe the **First Name** and **Other Id** fields/header on the page without reloading.
5. Manually reload the page and re-observe the same fields.


---

## Expected Result

Per REQ-PIM-03:
- A success toast message appears confirming the save.
- The updated First Name and Other Id are immediately visible in the UI (e.g., page header, form fields) with no manual reload required.

---

## Actual Result

The save operation itself works correctly (data persists in the database), but the client-side UI state is not refreshed/re-rendered after the save response, leaving the page in a stale, inconsistent state until a manual reload.

---

## Environment

- **Application:** OrangeHRM Open Source Demo (OrangeHRM OS 5.9)
- **URL:** `https://opensource-demo.orangehrmlive.com`
- **Browser:** Chrome v. 150.0.7871.115

---

## Recommended Fix

After a successful save response, update the local component state / re-fetch the employee record so the header and form fields re-render with the new values — instead of relying on the user to manually reload the page.

---

## Notes
- Worth checking whether this pattern (stale UI post-save) also occurs on other Edit forms (e.g., Job, Contact Details, Emergency Contacts tabs) — could indicate a shared front-end state-management gap.
- Related test case file: modules/PIM/test-cases.md