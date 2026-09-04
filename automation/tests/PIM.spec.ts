import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { PIMPage } from '../pages/PIMPage';
import { DashboardPage } from '../pages/DashboardPage';
import { faker } from '@faker-js/faker';

test.describe('PIM Employee Management', () => {
  let pimPage: PIMPage;
  let currentFirstName = '';
  let currentLastName = '';

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    await dashboardPage.assertOnDashboard();
    await dashboardPage.assertDashboardLoaded();
    pimPage = new PIMPage(page);
  });

  test.afterEach(async () => {
    // Teardown: Delete the created employee to prevent test pollution
    if (currentFirstName && currentLastName) {
      await test.step('Teardown: Delete the employee', async () => {
        await pimPage.deleteEmployee(currentFirstName, currentLastName);
      });
    }
  });

  test('TC-PIM-001 - User can add an employee with only mandatory fields @P1 @smoke @positive', async ({ page }) => {
    currentFirstName = faker.person.firstName();
    currentLastName = faker.person.lastName();

    // Pre-condition: navigate to the PIM page.
    await test.step('Navigate to the PIM page', async () => {
      await pimPage.goto();
    });

    // Test Steps 1-3: fill employee details and submit.
    await test.step('Fill employee details and submit the form', async () => {
      await pimPage.clickAdd();
      await pimPage.addEmployee(currentFirstName, currentLastName);
    });

    // Expected Result 1 & 2: employee is added successfully.
    await test.step('Verify employee was added', async () => {
      // Verify the success toast message appears
      await expect(pimPage.successToast).toBeVisible();
      
      // Verify URL changes to the Personal Details page
      await expect(page).toHaveURL(/\/pim\/viewPersonalDetails\/empNumber\/\d+/);
    });
  });

  test('TC-PIM-002 - User can add an employee with all optional fields @P2 @positive', async ({ page }) => {
    currentFirstName = faker.person.firstName();
    currentLastName = faker.person.lastName();
    const middleName = faker.person.middleName();
    
    // Ensure username is unique and meets potential length rules
    const username = faker.internet.username({ firstName: currentFirstName, lastName: currentLastName }) + faker.number.int(9999);
    const password = 'Password@123'; // Safe default meeting complexity requirements

    await test.step('Navigate to the PIM page', async () => {
      await pimPage.goto();
    });

    await test.step('Fill employee details including login credentials and submit', async () => {
      await pimPage.clickAdd();
      await pimPage.addEmployeeWithAllFields(currentFirstName, middleName, currentLastName, username, password);
    });

    await test.step('Verify employee was added successfully', async () => {
      await expect(pimPage.successToast).toBeVisible();
      await expect(page).toHaveURL(/\/pim\/viewPersonalDetails\/empNumber\/\d+/);
    });
  });

  test('TC-PIM-003 - Prevent duplicate Employee ID @P1 @negative', async ({ page }) => {
    // Generate new names for the attempt
    currentFirstName = faker.person.firstName();
    currentLastName = faker.person.lastName();
    let duplicateId = '';

    await test.step('Fetch an existing Employee Id', async () => {
      await pimPage.goto();
      duplicateId = await pimPage.getFirstEmployeeId();
      // Ensure we got an ID, fallback to '0038' just in case the list is empty
      if (!duplicateId) {
        duplicateId = '0038';
      }
    });

    // Pre-condition: User is on Add Employee page.
    await test.step('Navigate to the Add Employee page', async () => {
      await pimPage.clickAdd();
    });

    // Test Steps: Enter valid names and duplicate Employee Id, then Save
    await test.step(`Fill employee details with a duplicate Employee Id (${duplicateId}) and submit`, async () => {
      await pimPage.addEmployeeWithId(currentFirstName, currentLastName, duplicateId);
    });

    // Expected Results: System blocks submission and shows validation error
    await test.step('Verify system blocks submission and shows error', async () => {
      await expect(pimPage.requiredFieldErrors).toHaveText('Employee Id already exists');
      
      // Ensure we are still on the add employee page (URL has not changed to personal details)
      await expect(page).not.toHaveURL(/\/pim\/viewPersonalDetails\/empNumber\/\d+/);
    });
    
    // We don't want to delete this employee in afterEach because it wasn't successfully created
    // So we clear the variables to skip the teardown deletion
    currentFirstName = '';
    currentLastName = '';
  });

  test('TC-PIM-004 - Inline validation for missing mandatory fields @P2 @negative', async ({ page }) => {
    // Pre-condition: User is on Add Employee page.
    await test.step('Navigate to the Add Employee page', async () => {
      await pimPage.goto();
      await pimPage.clickAdd();
    });

    // Test Steps: Click Save without entering any data
    await test.step('Click Save with empty mandatory fields', async () => {
      await pimPage.clickSave();
    });

    // Expected Results: Inline validation errors "Required" are shown
    await test.step('Verify inline validation errors are displayed', async () => {
      // First Name and Last Name are mandatory, so there should be at least two "Required" error messages
      await expect(pimPage.requiredFieldErrors.first()).toBeVisible();
      
      const errorCount = await pimPage.requiredFieldErrors.count();
      expect(errorCount).toBeGreaterThanOrEqual(2);
      
      for (let i = 0; i < errorCount; i++) {
        await expect(pimPage.requiredFieldErrors.nth(i)).toHaveText('Required');
      }

      // Ensure we are still on the add employee page
      await expect(page).not.toHaveURL(/\/pim\/viewPersonalDetails\/empNumber\/\d+/);
    });

    // Clear variables to skip teardown
    currentFirstName = '';
    currentLastName = '';
  });

  test.only('TC-PIM-006 - Edit an existing employee\'s personal details @P2 @positive', async ({ page }) => {
    currentFirstName = faker.person.firstName();
    currentLastName = faker.person.lastName();
    const updatedMiddleName = faker.person.middleName();

    // Pre-condition: Create an employee and land on Personal Details page
    await test.step('Create a new employee', async () => {
      await pimPage.goto();
      await pimPage.clickAdd();
      await pimPage.addEmployee(currentFirstName, currentLastName);
      
      // Wait until we are redirected to Personal Details
      await expect(page).toHaveURL(/\/pim\/viewPersonalDetails\/empNumber\/\d+/);
      // Wait for the success toast to disappear so it doesn't block interactions
      await expect(pimPage.successToast).toBeHidden({ timeout: 10000 });
    });

    // Test Steps: Edit middle name and save
    await test.step('Edit middle name and save', async () => {
      // Ensure the form is loaded by verifying the First Name field contains our data
      await expect(pimPage.firstnameInput).toHaveValue(currentFirstName);
      
      await pimPage.middlenameInput.fill(updatedMiddleName);
      await pimPage.personalDetailsSaveButton.click();
    });

    // Expected Results: Success toast appears and value is retained
    await test.step('Verify details were updated successfully', async () => {
      await expect(pimPage.successToast).toBeVisible();
      // Ensure the input retains the updated value
      await expect(pimPage.middlenameInput).toHaveValue(updatedMiddleName);
    });
  });
});
