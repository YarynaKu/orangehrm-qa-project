## Prompt
As a Senior Automation QA Engineer, create TC-LOGIN-001 Playwrigth TypeScript test script based on test-case.md file. Implement POM design patterns

## AI response

Built the full POM structure for TC-LOGIN-001 against the OrangeHRM demo app:
- LoginPage.ts — locators (username, password, login button, error/validation messages) and actions (goto, login, etc.), reusable across all other TC-LOGIN-* cases.
- DashboardPage.ts — locators and assertions for post-login state (menu items, profile widget, session cookie check).
- TC-LOGIN-001.spec.ts — the actual test, mapped step-by-step to the test-case doc: navigate → enter Admin/admin123 → submit → assert dashboard redirect → assert menu/profile widget render → assert orangehrm session cookie exists. Tagged @P1 @smoke @positive to match the matrix's priority.
- playwright.config.ts + package.json — base URL, tracing/screenshots on failure, chromium project.
- README.md — setup/run instructions.

## Problem
Local run status: **Failed**.

## Solution
After manually examining the HTML report, the issue was identified as a strict mode violation on locator('.oxd-main-menu'), which resolved to 2 elements. 
*Fix*: Updated the locator in DashboardPage.ts to target the main menu list: this.mainMenu = page.locator('ul.oxd-main-menu');
