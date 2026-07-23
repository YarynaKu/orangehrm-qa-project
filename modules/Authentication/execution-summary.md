# Test Execution Summary — Login & Authentication Module

**Module**: Login & Authentication  
**Application**: OrangeHRM Open Source Demo (`https://opensource-demo.orangehrmlive.com`)  
**Environment**: Public shared demo instance  
**Author**: Yaryna Kushniruk  
**Execution Cycle**: #1 — Initial Full Pass  
**Cycle Start Date**: 2026-07-22   
**Cycle End Date**: 2026-07-22 
**Last Updated**: 2026-07-22  

---

## 1. Execution Metrics

| Metric | Count |
|---|---|
| Total Test Cases | 15 |
| ✅ Passed | 13 |
| ❌ Failed | 2 |
| ⚠️ Blocked | 0 |
| ⏭️ Skipped | 0 |
| 🔲 Not Yet Executed | 0 |
| **Pass Rate** | **80%** |

---

## 2. Coverage Breakdown

| Category | Total TCs | Passed | Failed | Blocked | Not Executed |
|---|---|---|---|---|---|
| Positive (Happy Path) | 2 | 2 | 0 | 0 | 0 |
| Negative | 2 | 2 | 0 | 0 | 0 |
| Boundary Value | 3 | 2 | 1 | 0 | 0 |
| Security / Edge | 5 | 4 | 1 | 0 | 0 |
| Functional / UI | 3 | 3 | 0 | 0 | 0 |
| **Total** | **15** | **13** | **2** | **0** | **0** |

---

## 3. Priority Breakdown

| Priority | Total TCs | Passed | Failed | Blocked | Not Executed |
|---|---|---|---|---|---|
| P1 — Critical | 9 | 8 | 1 | 0 | 0 |
| P2 — High/Medium | 6 | 5 | 1 | 0 | 0 |
| P3 — Low | 0 | — | — | — | — |
| **Total** | **15** | **13** | **2** | **0** | **0** |

---

## 4. Automation vs. Manual Split

| Type | Total | Passed | Failed | Blocked | Not Executed |
|---|---|---|---|---|---|
| Automated (Playwright E2E) | 8 | 0 | 0 | 0 | 8 |
| Manual | 7 | 5 | 2 | 0 | 0 |
| **Total** | **15** | **5** | **2** | **0** | **8** |

---

## 5. Defect Summary

> Bugs are tracked in [GitHub Issues](https://github.com). Link each defect using the `BUG-LOGIN-XXX` format in the table below.

| Bug ID | Linked TC | Severity | Title | Status |
|---|---|---|---|---|
| — | — | — | No defects logged yet | — |

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
| Demo environment reachable and login functional (smoke check) | Done |
| All P1 test cases reviewed against risk table | Done |
| `test-cases.md` complete and reviewed | Done |

### Exit Criteria
| Criterion | Status |
|---|---|
| All P1 test cases executed (manual or automated) | Only manualy |
| All identified bugs logged in GitHub Issues with repro steps | Pending |
| Automated Playwright suite passing on CI for Login module | Pending |
| Pass rate ≥ 100% on P1 TCs | Pending |



