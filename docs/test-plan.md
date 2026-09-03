# Test Plan — Version 1 (Completed)
 
| | |
|---|---|
| **Project** | E2E Test Automation & CI/CD (OrangeHRM) |
| **Repository** | github.com/YarynaKu/orangehrm-qa-project |
| **Author** | Yaryna Kushniruk |
| **Application Under Test** | OrangeHRM Open Source Demo (`https://opensource-demo.orangehrmlive.com`) |
| **Cycle** | Execution Cycle #1 |
| **Last Updated** | 2026-07-30 |
 
---
 
## 1. Objective
 
This document defines the scope, approach, and success criteria for the first testing cycle of the E2E Test Automation & CI/CD (OrangeHRM) Project. It will be executed against the Authentication, PIM, and Leave modules of the OrangeHRM demo application, combining manual, exploratory, and automated testing. Results, metrics, and defects found will be recorded in `manual-TCs/execution-summary.md` once execution is underway.
 
---
 
## 2. Scope
 
| Module | Planned | Test Matrix |
|---|---|---|
| Authentication / Login | Yes | `modules/Login.md` |
| PIM — Employee Management | Yes | `modules/PIM.md` |
| Leave — Apply/Approve | Yes | `modules/Leave.md` |
| Cross-browser (Chromium + Firefox) | Yes | |
 
**Out of scope for this cycle:**
- Recruitment, Performance, Time modules
- Load/performance testing
- Security penetration testing
- API-level testing | Yes | via Playwright's `request` fixture |

---
 
## 3. Test Approach
 
- **Manual functional testing** for P1/P2 areas, structured test cases per module
- **Exploratory testing** — session-based, logged in `manual-TCs/exploratory-notes.md`
- **Automated E2E regression** — Playwright + TypeScript, Page Object Model (e.g. `automation/tests/Login.spec.ts` uses a `LoginPage` object), tests tagged by priority/type (`@P1`, `@P2`, `@negative`, …)
- **CI** — a GitHub Actions workflow (`playwright.yml`) will run the automated suite on every push to `main`
- **Bug tracking** — GitHub Issues

---
 
## 4. Entry & Exit Criteria
 
**Entry criteria** — must be true before execution starts:
 
| Criterion |
|---|
| Demo environment reachable and login functional (smoke check) |
| Test cases for the current module reviewed against the risk table |
 
**Exit criteria** — must be true before this cycle is considered closed:
 
| Criterion |
|---|
| All P1 test cases executed (manual or automated) |
| All identified bugs logged in GitHub Issues with reproduction steps |
| Automated Playwright suite passing on CI for all covered modules |
| Pass rate ≥ 100% on P1 test cases |

 
---
 
## 5. Planned Test Case Allocation
 
Based on the test-case design work for this cycle, the following distribution is targeted:
 
### 5.1 By Test Type
 
| Category | Planned Count |
|---|---|
| Positive (Happy Path) | 13 |
| Negative | 12 |
| Boundary Value | 8 |
| Security / Edge | 9 |
| Functional / UI | 4 |
| **Total** | **46** |
 
### 5.2 By Priority
 
| Priority | Planned Count |
|---|---|
| P1 — Critical | 26 |
| P2 — High/Medium | 17 |
| P3 — Low | 3 |
| **Total** | **46** |
 
### 5.3 Automation vs. Manual
 
| Type | Planned Count |
|---|---|
| Automated (Playwright E2E) | 24 |
| Manual | 22 |
| **Total** | **46** |
 
---
 
## 6. Defect Management Plan
 
Any defect found during execution will be logged as a GitHub Issue using a consistent template: Test Case ID, Requirement ID, environment, priority, severity, category, steps to reproduce, expected vs. actual result, and a recommended fix. Each defect will be linked back to the test case that found it.
 
---
 
## 7. Tools & Environment
 
| Purpose | Tool | Note |
|---|---|---|
| E2E automation | Playwright (TypeScript) | Role/label-based locators preferred over CSS |
| CI | GitHub Actions | Runs suite on push |
| AI-assisted design/scaffolding | Claude | Usage to be logged transparently in `ai-workflow-notes.md` |
| Bug tracking | GitHub Issues | No Jira license needed |
 
---

## 8. Deliverables
 
By the end of this cycle, the following will be produced:
 
- `modules/Authentication/test-cases.md`, `modules/PIM.md`, `modules/Leave.md` — per-module test case matrices
- `docs/execution-summary.md` — execution metrics and results
- `manual-TCs/exploratory-notes.md` — exploratory session notes
- `docs/ai-workflow-notes.md` — log of where/how AI assistance was used
- `automation/tests/` — automated Playwright suite
- `.github/workflows/playwright.yml` — CI pipeline
- Logged bugs in GitHub Issues
- README summarizing scope, coverage, and known limitations

---

## 9. Definition of Done
 
This cycle will be considered complete once all P1 test cases have been executed, all defects found have been logged in GitHub Issues, the automated suite passes on CI across all three modules, and the execution summary has been published reflecting final results.
 
---
 
*End of Test Plan v1 — to be executed starting 2026-07-22.*