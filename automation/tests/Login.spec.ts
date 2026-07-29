import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';


test.describe('TC-LOGIN-001 - User can log in with valid credentials', () => {
  const VALID_USERNAME = 'Admin';
  const VALID_PASSWORD = 'admin123';

  test('should authenticate successfully and land on the dashboard @P1 @smoke @positive', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    // Pre-condition: navigate to the login page as an unauthenticated user.
    await test.step('Navigate to the Login page', async () => {
      await loginPage.goto();
    });

    // Test Steps 1-3: enter valid credentials and submit.
    await test.step('Enter valid credentials and submit the login form', async () => {
      await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
    });

    // Expected Result 1 & 2: authentication succeeds and redirects to the dashboard.
    await test.step('Verify redirect to the Dashboard URL', async () => {
      await dashboardPage.assertOnDashboard();
    });

    // Expected Result 3: dashboard header shows profile widget and main menu items.
    await test.step('Verify dashboard header and main menu are displayed', async () => {
      await dashboardPage.assertDashboardLoaded();
    });

    // Post-condition: an active session cookie is set.
    await test.step('Verify session cookie is set', async () => {
      const sessionCookie = await dashboardPage.getSessionCookie();
      expect(sessionCookie).toBeDefined();
      expect(sessionCookie?.value).toBeTruthy();
    });
  });
});

test.describe('TC-LOGIN-002 - User cannot log in with invalid username', () => {
  const INVALID_USERNAME = 'invalidUser';
  const VALID_PASSWORD = 'admin123';

  test('should display "Invalid credentials" error message @P2 @negative', async ({page}) => {
    const loginPage = new LoginPage(page);

    await test.step('Navigate to the Login page', async () => {
      await loginPage.goto();
    });

    await test.step('Enter invalid username, valid password and submit the login form', async () => {
      await loginPage.login(INVALID_USERNAME, VALID_PASSWORD);
    });

    await test.step('Verify user remains on the login page and error message is displayed', async () => {
      // Verify URL contains the login path
      expect(loginPage.getCurrentUrl()).toContain('/auth/login');
      
      // Verify error message
      await expect(loginPage.errorAlert).toBeVisible();
      await expect(loginPage.errorAlert).toHaveText('Invalid credentials');
    });
  });
});