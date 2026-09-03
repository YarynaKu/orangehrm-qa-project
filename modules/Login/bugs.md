# Title
[BUG-001] Inconsistent whitespace trimming on Username field during login

## Bug Report

| Field | Value |
|---|---|
| **Test Case ID** | `TC-LOGIN-009` |
| **Requirement ID** | `REQ-LOGIN-09` |
| **Reported By** | Yaryna Kushniruk |
| **Date Found** | 2026-07-22 |
| **Module** | Login & Authentication |
| **Priority** | Low |
| **Severity** | Minor |
| **Category** | Edge Case / Boundary Value |
| **Environment** | OrangeHRM OS 5.9, Chrome v. 150.0.7871.115 |

---

## Summary

The OrangeHRM login form handles leading and trailing whitespace in the `Username` field **inconsistently**. A username with a **trailing space** (`"Admin "`) is silently accepted and authenticates successfully, while a username with a **leading space** (`" Admin"`) is rejected with `"Invalid credentials"`. This reveals that the backend applies **right-trim only**, rather than symmetric (leading + trailing) whitespace normalization.

---

## Steps to Reproduce

**Pre-condition:** Navigate to `https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`

**Sub-case A — Trailing space on username:**
1. Enter `"Admin "` *(trailing space)* in the `Username` field.
2. Enter `"admin123"` in the `Password` field.
3. Click **Login**.

**Sub-case B — Leading space on username:**
1. Enter `" Admin"` *(leading space)* in the `Username` field.
2. Enter `"admin123"` in the `Password` field.
3. Click **Login**.

---

## Expected Result

Both sub-cases should behave **identically** — the system should symmetrically trim leading and trailing whitespace from the `Username` field before credential lookup:

- `" Admin"` → normalized to `"Admin"` → Login succeeds
- `"Admin "` → normalized to `"Admin"` → Login succeeds

---

## Actual Result

| Sub-case | Input | Outcome | Expected |
|---|---|---|---|
| A | `"Admin "` *(trailing space)* | Login **succeeds** | Should be consistent with B |
| B | `" Admin"` *(leading space)* | `"Invalid credentials"` | Should be consistent with A |

The system **right-trims only** — trailing whitespace is silently removed, but leading whitespace is preserved and causes authentication failure.

---

## Environment

- **Application:** OrangeHRM Open Source Demo (OrangeHRM OS 5.9)
- **URL:** `https://opensource-demo.orangehrmlive.com`
- **Browser:** Chrome v. 150.0.7871.115

---

## Recommended Fix

Apply symmetric `trim()` (or equivalent server-side normalization) to the `Username` field value **before** the database credential lookup. Both leading and trailing whitespace must be stripped to ensure consistent, predictable authentication behaviour.

---

## Notes

- Inconsistent trimming can lead to users being locked out depending on copy-paste or autofill behaviour.
- Silent acceptance of trailing-space usernames could mask misconfigurations in user records.
- Related test case file: `modules/Authentication/test-cases.md`