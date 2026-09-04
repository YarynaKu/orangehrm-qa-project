# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: PIM.spec.ts >> PIM Employee Management >> TC-PIM-006 - Edit an existing employee's personal details @P2 @positive
- Location: tests/PIM.spec.ts:152:8

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/pim\/viewPersonalDetails\/empNumber\/\d+/
Received string:  "https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    13 × unexpected value "https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee"

```

```yaml
- complementary:
  - navigation "Sidepanel":
    - link "client brand banner":
      - /url: https://www.orangehrm.com/
      - img "client brand banner"
    - textbox "Search"
    - button ""
    - separator
    - list:
      - listitem:
        - link "Admin":
          - /url: /web/index.php/admin/viewAdminModule
      - listitem:
        - link "PIM":
          - /url: /web/index.php/pim/viewPimModule
      - listitem:
        - link "Leave":
          - /url: /web/index.php/leave/viewLeaveModule
      - listitem:
        - link "Time":
          - /url: /web/index.php/time/viewTimeModule
      - listitem:
        - link "Recruitment":
          - /url: /web/index.php/recruitment/viewRecruitmentModule
      - listitem:
        - link "My Info":
          - /url: /web/index.php/pim/viewMyDetails
      - listitem:
        - link "Performance":
          - /url: /web/index.php/performance/viewPerformanceModule
      - listitem:
        - link "Dashboard":
          - /url: /web/index.php/dashboard/index
      - listitem:
        - link "Directory":
          - /url: /web/index.php/directory/viewDirectory
      - listitem:
        - link "Maintenance":
          - /url: /web/index.php/maintenance/viewMaintenanceModule
      - listitem:
        - link "Claim":
          - /url: /web/index.php/claim/viewClaimModule
          - img
          - text: Claim
      - listitem:
        - link "Buzz":
          - /url: /web/index.php/buzz/viewBuzz
- banner:
  - heading "PIM" [level=6]
  - link "Upgrade":
    - /url: https://orangehrm.com/open-source/upgrade-to-advanced
    - button "Upgrade"
  - list:
    - listitem:
      - img "profile picture"
      - paragraph: manda user
      - text: 
  - navigation "Topbar Menu":
    - list:
      - listitem: Configuration 
      - listitem:
        - link "Employee List":
          - /url: "#"
      - listitem:
        - link "Add Employee":
          - /url: "#"
      - listitem:
        - link "Reports":
          - /url: "#"
      - button ""
- heading "Add Employee" [level=6]
- separator
- button "Choose File"
- img "profile picture"
- button ""
- paragraph: "Accepts jpg, .png, .gif up to 1MB. Recommended dimensions: 200px X 200px"
- text: Employee Full Name*
- textbox "First Name": Alex
- textbox "Middle Name"
- textbox "Last Name": Crist
- text: Employee Id
- textbox: "0373"
- text: Employee Id already exists
- separator
- paragraph: Create Login Details
- checkbox
- separator
- paragraph: "* Required"
- button "Cancel"
- button "Save"
- paragraph: OrangeHRM OS 5.9
- paragraph:
  - text: © 2005 - 2026
  - link "OrangeHRM, Inc":
    - /url: http://www.orangehrm.com
  - text: . All rights reserved.
```

```
Test timeout of 30000ms exceeded while running "afterEach" hook.
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { LoginPage } from '../pages/LoginPage';
  3   | import { PIMPage } from '../pages/PIMPage';
  4   | import { DashboardPage } from '../pages/DashboardPage';
  5   | import { faker } from '@faker-js/faker';
  6   | 
  7   | test.describe('PIM Employee Management', () => {
  8   |   let pimPage: PIMPage;
  9   |   let currentFirstName = '';
  10  |   let currentLastName = '';
  11  | 
  12  |   test.beforeEach(async ({ page }) => {
  13  |     const loginPage = new LoginPage(page);
  14  |     const dashboardPage = new DashboardPage(page);
  15  |     await loginPage.goto();
  16  |     await loginPage.login('Admin', 'admin123');
  17  |     await dashboardPage.assertOnDashboard();
  18  |     await dashboardPage.assertDashboardLoaded();
  19  |     pimPage = new PIMPage(page);
  20  |   });
  21  | 
> 22  |   test.afterEach(async () => {
      |        ^ Test timeout of 30000ms exceeded while running "afterEach" hook.
  23  |     // Teardown: Delete the created employee to prevent test pollution
  24  |     if (currentFirstName && currentLastName) {
  25  |       await test.step('Teardown: Delete the employee', async () => {
  26  |         await pimPage.deleteEmployee(currentFirstName, currentLastName);
  27  |       });
  28  |     }
  29  |   });
  30  | 
  31  |   test('TC-PIM-001 - User can add an employee with only mandatory fields @P1 @smoke @positive', async ({ page }) => {
  32  |     currentFirstName = faker.person.firstName();
  33  |     currentLastName = faker.person.lastName();
  34  | 
  35  |     // Pre-condition: navigate to the PIM page.
  36  |     await test.step('Navigate to the PIM page', async () => {
  37  |       await pimPage.goto();
  38  |     });
  39  | 
  40  |     // Test Steps 1-3: fill employee details and submit.
  41  |     await test.step('Fill employee details and submit the form', async () => {
  42  |       await pimPage.clickAdd();
  43  |       await pimPage.addEmployee(currentFirstName, currentLastName);
  44  |     });
  45  | 
  46  |     // Expected Result 1 & 2: employee is added successfully.
  47  |     await test.step('Verify employee was added', async () => {
  48  |       // Verify the success toast message appears
  49  |       await expect(pimPage.successToast).toBeVisible();
  50  |       
  51  |       // Verify URL changes to the Personal Details page
  52  |       await expect(page).toHaveURL(/\/pim\/viewPersonalDetails\/empNumber\/\d+/);
  53  |     });
  54  |   });
  55  | 
  56  |   test('TC-PIM-002 - User can add an employee with all optional fields @P2 @positive', async ({ page }) => {
  57  |     currentFirstName = faker.person.firstName();
  58  |     currentLastName = faker.person.lastName();
  59  |     const middleName = faker.person.middleName();
  60  |     
  61  |     // Ensure username is unique and meets potential length rules
  62  |     const username = faker.internet.username({ firstName: currentFirstName, lastName: currentLastName }) + faker.number.int(9999);
  63  |     const password = 'Password@123'; // Safe default meeting complexity requirements
  64  | 
  65  |     await test.step('Navigate to the PIM page', async () => {
  66  |       await pimPage.goto();
  67  |     });
  68  | 
  69  |     await test.step('Fill employee details including login credentials and submit', async () => {
  70  |       await pimPage.clickAdd();
  71  |       await pimPage.addEmployeeWithAllFields(currentFirstName, middleName, currentLastName, username, password);
  72  |     });
  73  | 
  74  |     await test.step('Verify employee was added successfully', async () => {
  75  |       await expect(pimPage.successToast).toBeVisible();
  76  |       await expect(page).toHaveURL(/\/pim\/viewPersonalDetails\/empNumber\/\d+/);
  77  |     });
  78  |   });
  79  | 
  80  |   test('TC-PIM-003 - Prevent duplicate Employee ID @P1 @negative', async ({ page }) => {
  81  |     // Generate new names for the attempt
  82  |     currentFirstName = faker.person.firstName();
  83  |     currentLastName = faker.person.lastName();
  84  |     let duplicateId = '';
  85  | 
  86  |     await test.step('Fetch an existing Employee Id', async () => {
  87  |       await pimPage.goto();
  88  |       duplicateId = await pimPage.getFirstEmployeeId();
  89  |       // Ensure we got an ID, fallback to '0038' just in case the list is empty
  90  |       if (!duplicateId) {
  91  |         duplicateId = '0038';
  92  |       }
  93  |     });
  94  | 
  95  |     // Pre-condition: User is on Add Employee page.
  96  |     await test.step('Navigate to the Add Employee page', async () => {
  97  |       await pimPage.clickAdd();
  98  |     });
  99  | 
  100 |     // Test Steps: Enter valid names and duplicate Employee Id, then Save
  101 |     await test.step(`Fill employee details with a duplicate Employee Id (${duplicateId}) and submit`, async () => {
  102 |       await pimPage.addEmployeeWithId(currentFirstName, currentLastName, duplicateId);
  103 |     });
  104 | 
  105 |     // Expected Results: System blocks submission and shows validation error
  106 |     await test.step('Verify system blocks submission and shows error', async () => {
  107 |       await expect(pimPage.requiredFieldErrors).toHaveText('Employee Id already exists');
  108 |       
  109 |       // Ensure we are still on the add employee page (URL has not changed to personal details)
  110 |       await expect(page).not.toHaveURL(/\/pim\/viewPersonalDetails\/empNumber\/\d+/);
  111 |     });
  112 |     
  113 |     // We don't want to delete this employee in afterEach because it wasn't successfully created
  114 |     // So we clear the variables to skip the teardown deletion
  115 |     currentFirstName = '';
  116 |     currentLastName = '';
  117 |   });
  118 | 
  119 |   test('TC-PIM-004 - Inline validation for missing mandatory fields @P2 @negative', async ({ page }) => {
  120 |     // Pre-condition: User is on Add Employee page.
  121 |     await test.step('Navigate to the Add Employee page', async () => {
  122 |       await pimPage.goto();
```