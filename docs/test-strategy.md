# Test Strategy — OrangeHRM QA Automation Project

## 1. Purpose

This document describes the testing approach of the OrangeHRM demo application (https://opensource-demo.orangehrmlive.com). It exists to demonstrate what I test, how I prioritize it, what tools I use, and how manual and automated testing fit together.

## 2. Application Under Test

- **Type**: Web-based HR Management System (HRMS)
- **Environment**: Public demo instance
- **Access**: `Admin / admin123` (standard demo credentials)

## 3. Scope

### 3.1 In scope

- Login / Authentication: core user flows, entry point to everything.
- PIM — Employee Management: core data-entry module; high field-validation surface area.
- Leave — Apply/Approve: business-critical workflow with date logic, approval states, and role-based behavior.
- API testing.
- Cross-browser: Chromium and Firefox via Playwright

### 3.2 Out of scope 

- Recruitment 
- Performance
- Time
- Load/performance testing 
- Security penetration testing 

## 4. Risk-Based Prioritization

Risk = **Impact if broken × Likelihood of failure**

| Area | Impact | Likelihood | Priority | Reasoning |
|---|---|---|---|---|
| Login (valid/invalid) | High | Low | P1 | Blocks all access if broken, must be rock-solid even if unlikely to fail |
| Add Employee — mandatory fields | High | Medium | P1 | Core data entry; validation gaps are common in CRUD forms |
| Leave date validation (overlap, past-date, balance) | High | Medium-High | P1 | Date/state logic is the highest-bug-density area in HR systems |
| Employee search/filter | Medium | Medium | P2 | Used constantly but low complexity |
| Leave approval (role-based, Admin vs ESS) | High | Medium | P1 | Role-based access bugs have high real-world impact |
| Photo upload (PIM) | Low | Medium | P3 | Cosmetic/non-critical path |
| Pagination/sorting on grids | Low | Low | P3 | Low business impact, standard library behavior |

Notes: P1 areas get full positive + negative + boundary coverage and automation; P3 areas get a light manual pass only.

## 5. Test Approach

### 5.1 Test types included

- **Functional (manual)** — structured test cases for all P1/P2 areas
- **Exploratory testing** — unscripted session-based testing, primarily on Leave module (highest logic complexity)
- **Automated regression (E2E)** — Playwright/TypeScript, covering happy-path + key negative cases for P1 areas
- **API-level testing** — a small set of tests hitting the app's internal endpoints directly (via Playwright's `request` fixture)

### 5.2 Test types excluded

- Load/performance testing — public shared demo environment makes load testing unreliable
- Cross-browser/cross-device matrix — resource constraint

## 6. Environment & Test Data

- Environment: public shared demo instance
- Test data approach: since data isn't fully controllable (shared instance), tests are designed to be **self-contained and idempotent** where possible — e.g., each automated test creates its own uniquely-named employee record (timestamp-suffixed) rather than depending on fixed pre-existing records
- Known limitation: full data-reset-dependent scenarios aren't reliable here and are called out as manual-only checks rather than automated

## 7. Entry & Exit Criteria

**Entry criteria:**
- Demo environment reachable and login functional (smoke check)
- Test cases for the current module reviewed against the risk table above

**Exit criteria:**
- All P1 test cases executed (manual or automated)
- All identified bugs logged in GitHub Issues with reproduction steps
- Automated suite passing on CI (GitHub Actions) for the covered modules

## 8. Tools

| Purpose | Tool | Note |
|---|---|---|
| E2E automation | Playwright (TypeScript) | Role/label-based locators preferred over CSS for resilience |
| API testing | Playwright `request` fixture | Avoids adding a second tool (Postman) |
| CI | GitHub Actions | Runs suite on push |
| AI-assisted design/scaffolding | Claude | Usage logged transparently in `ai-workflow-notes.md` |
| Bug tracking | GitHub Issues | no Jira license needed |

## 9. Deliverables

- This strategy document
- `test-cases.md` — structured manual test cases for P1/P2 areas
- `ai-workflow-notes.md` — where and how AI was used, and what was overridden/discarded
- Automated Playwright suite + CI pipeline
- Logged bugs in GitHub Issues
- README summarizing scope, coverage, and known limitations