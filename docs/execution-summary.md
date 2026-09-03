# Test Execution Summary — All Modules (Authentication, PIM, Leave)

**Application**: OrangeHRM Open Source Demo (`https://opensource-demo.orangehrmlive.com`)  
**Environment**: Public shared demo instance  
**Author**: Yaryna Kushniruk  
**Execution Cycle**: #1 — Initial Full Pass (Updated)  
**Last Updated**: 2026-07-29  

---

## 1. Execution Metrics

| Metric | Count |
|---|---|
| Total Test Cases | 46 |
| ✅ Passed | 29 |
| ❌ Failed | 6 |
| ⚠️ Blocked | 0 |
| ⏭️ Skipped | 0 |
| 🔲 Not Yet Executed | 11 |
| **Pass Rate (Executed)** | **80%** (29/35) |

---

## 2. Coverage Breakdown

| Category | Total TCs | Passed | Failed | Blocked | Not Executed |
|---|---|---|---|---|---|
| Positive (Happy Path) | 13 | 9 | 2 | 0 | 2 |
| Negative | 12 | 6 | 2 | 0 | 4 |
| Boundary Value | 8 | 3 | 1 | 0 | 4 |
| Security / Edge | 9 | 7 | 1 | 0 | 1 |
| Functional / UI | 4 | 4 | 0 | 0 | 0 |
| **Total** | **46** | **29** | **6** | **0** | **11** |

---

## 3. Priority Breakdown

| Priority | Total TCs | Passed | Failed | Blocked | Not Executed |
|---|---|---|---|---|---|
| P1 — Critical | 26 | 19 | 4 | 0 | 3 |
| P2 — High/Medium | 17 | 9 | 2 | 0 | 6 |
| P3 — Low | 3 | 1 | 0 | 0 | 2 |
| **Total** | **46** | **29** | **6** | **0** | **11** |

---

## 4. Automation vs. Manual Split

| Type | Total | Passed | Failed | Blocked | Not Executed |
|---|---|---|---|---|---|
| Automated (Playwright E2E) | 24 | 16 | 4 | 0 | 4 |
| Manual | 22 | 13 | 2 | 0 | 7 |
| **Total** | **46** | **29** | **6** | **0** | **11** |

---

## 5. Defect Summary

> Bugs are tracked in GitHub Issues. Link each defect using the standard format.

| Module | Failed TC ID | Description | Status |
|---|---|---|---|
| Login | TC-LOGIN-009 | Login accepted for `"Admin "` but rejected for `" Admin"` | Pending |
| Login | TC-LOGIN-014 | Rate limiting/lockout feature not implemented | Pending |
| PIM | TC-PIM-002 | Middle name isn't displayed | Pending |
| PIM | TC-PIM-003 | System allows creating duplicate Employee ID | Pending |
| PIM | TC-PIM-006 | Edited details require manual reload to appear | Pending |
| Leave | TC-LEAVE-005 | User can successfully apply for leave on past dates | Pending |

---

## 6. Environment & Tooling

| Item | Detail |
|---|---|
| Application URL | `https://opensource-demo.orangehrmlive.com` |
| Test credentials | `Admin / admin123` |
| Browser(s) | Chromium, Firefox (via Playwright) |
| Automation framework | Playwright (TypeScript) |
| CI pipeline | GitHub Actions |
| Bug tracker | GitHub Issues |
| Manual execution | Session-based, logged in this file |

---

## 7. Entry / Exit Criteria Status

### Entry Criteria
| Criterion | Status |
|---|---|
| Demo environment reachable and core flows functional (smoke check) | Done |
| All test cases reviewed against risk tables for Login, PIM, Leave | Done |
| Test matrices (`test-cases.md`, `PIM.md`, `Leave.md`) complete | Done |

### Exit Criteria
| Criterion | Status |
|---|---|
| All P1 test cases executed (manual or automated) | Pending (3 NYE) |
| All identified bugs logged in GitHub Issues with repro steps | Pending |
| Automated Playwright suite passing on CI for all modules | Pending |
| Pass rate ≥ 100% on P1 TCs | Pending |
