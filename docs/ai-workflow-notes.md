## Examples

### 1 Updating the Requirement Traceability Matrix (RTM)
Used Claude to update the Requirement Traceability Matrix against the official OrangeHRM User Guide (https://help.orangehrm.com/hc/en-us/categories/360002207133-User-Guides). Reviewed and reconciled requirements to align with the active Demo environment. 

**For ex:** 

- REQ-PIM-05: User can search for an employee by partial name/filter and get correctly filtered results.
- - Reference: How to Access the Employee Management (Supervisor) — filter icon in Employee List 
- - **Note**: Requirement is not relevant for Demo environment; the supervisor filter icon is not present.
- REQ-LOGIN-14: Repeated consecutive failed login attempts trigger rate limiting, CAPTCHA, or a temporary account lockout.
- - **Note**: Feature is not implemented in Demo environment, marked requirement as out of scope.


### 2 Generating TCs
Used Claude to generate 15 test cases for login/authentication validation. Reviewed and refined the output to resolve logical inconsistencies and misalignments. 

**For ex:** 
- TC-LOGIN-013:
- - *Issue identified:* Priority contradicts the document's own Risk model in Section 2.
- - *Before:* P2 ( Impact: Low x Likelihood: Low = Low Risk )
- - *After:*  Impact corrected from Low to Medium to accurately reflect the security risk profile (Refer to exploratory notes per module).

- TC-LOGIN-014: Marked as Not Implemented / Out of Scope following feature verification.


### 3 Generating Bug Logs via MCP Integration

Used MCP to automatically create GitHub Issues for failed test cases linked directly to test-cases.md.

**For ex:** 
- BUG-001, BUG-002 were flagged as Invalid after manual re-verification.
- BUG-003:
- - Priority updated from Medium/High to Low. 
- - Severity was added and set to Minor. 
- - Relevant Environments were added.


### 4 Automated Playwright Test Script Generation

Used Claude to generate the initial Playwright TypeScript test script for TC-LOGIN-001 based on test-case.md. Implemented the Page Object Model (POM) pattern and manually updated dynamic locators.

**For ex:** 
- TC-LOGIN-001 - Local execution status: Failed. 
- - *Root Cause*: Strict mode violation on locator('.oxd-main-menu'), which matched 2 DOM elements.
- - *Fix*: Updated DashboardPage.ts locator to uniquely target the main menu list: this.mainMenu = page.locator('ul.oxd-main-menu');


