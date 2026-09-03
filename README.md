# E2E OrangeHRM QA Project 

A complete QA process — test strategy, test plan, manual test cases, exploratory testing, and Playwright/TypeScript automation with CI — built against the [OrangeHRM Open Source Demo](https://opensource-demo.orangehrmlive.com), an HR management web application.
 
This project exists to demonstrate a full QA workflow end to end: designing a test strategy, prioritizing coverage by risk, writing and executing test cases, automating regression checks, and tracking defects — the way I'd approach testing a real product.

## Results Snapshot
 
| Metric | Value |
|---|---|
| Modules covered | Authentication, PIM (Employee Management), Leave |
| Total test cases | 46 (24 automated, 22 manual) |
| Pass rate (executed) | 80% (28/35) |
| Defects found | 6 |
| CI | Runs on every push via GitHub Actions |

Full results: [`docs/execution-summary.md`](docs/execution-summary.md)

## Tech Stack

- **Automation**: Playwright + TypeScript, Page Object Model
- **CI**: GitHub Actions
- **Bug tracking**: GitHub Issues
- **AI-assisted scaffolding**: Claude — usage logged transparently in [`docs/ai-workflow-notes.md`](docs/ai-workflow-notes.md)

## Project Structure

```
├── docs/
│   ├── test-strategy.md       # scope, risk-based prioritization, tools
│   ├── test-plan.md           # entry/exit criteria, planned coverage
│   └── ai-workflow-notes.md   # where/how AI was used
│   ├── execution-summary.md   # results, metrics, defect summary
├── modules/
│   ├── Login/Login.md
│   ├── PIM/PIM.md
│   └── Leave/Leave.md
├── automation/
│   └── tests/                 # Playwright specs (e.g. Login.spec.ts)
└── .github/workflows/
    └── playwright.yml         # CI pipeline
```

## Getting Started

```bash
git clone https://github.com/YarynaKu/orangehrm-qa-project.git
cd orange-qa-project/automation
npm install
npx playwright test
```

```bash
npx playwright show-report
```

## Notable Findings
 
- **[BUG-003](https://github.com/YarynaKu/orangehrm-qa-project/issues/1)** — the login form trims trailing whitespace from the username but not leading whitespace, causing inconsistent authentication behavior for otherwise-identical inputs.
- Full defect list in [`docs/execution-summary.md`](manual-TCs/execution-summary.md).

## Documentation
 
- [Test Strategy](docs/test-strategy.md) — approach, scope, risk-based prioritization
- [Test Plan](docs/test-plan.md) — entry/exit criteria, planned coverage
- [Execution Summary](docs/execution-summary.md) — results and defects
- [AI Workflow Notes](docs/ai-workflow-notes.md) — how AI tooling was used and overridden

## Author
 
**Yaryna Kushniruk** — QA Engineer