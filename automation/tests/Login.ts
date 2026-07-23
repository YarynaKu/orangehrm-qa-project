import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

/**
 * TC-LOGIN-001: User can log in with valid credentials
 *
 * Pre-conditions:
 *   1. Browser is launched and navigated to /web/index.php/auth/login.
 *   2. User is not currently authenticated.
 *
 * Test Steps:
 *   1. Enter valid username (Admin) into the Username input field.
 *   2. Enter valid password (admin123) into the Password input field.
 *   3. Click the Login submit button.
 *
 * Expected Results:
 *   1. System authenticates user successfully.
 *   2. Browser redirects to the Dashboard URL (/web/index.php/dashboard/index).
 *   3. Dashboard header displays user profile widget and main menu items
 *      (Admin, PIM, Leave, etc.).
 *
 * Post-conditions:
 *   Active session cookie ("orangehrm") is set in browser storage.
 */

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