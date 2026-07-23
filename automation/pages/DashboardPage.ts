import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly userDropdown: Locator;
  readonly mainMenu: Locator;
  readonly adminMenuItem: Locator;
  readonly pimMenuItem: Locator;
  readonly leaveMenuItem: Locator;

  readonly expectedPath = '/web/index.php/dashboard/index';

  constructor(page: Page) {
    this.page = page;
    this.userDropdown = page.locator('.oxd-userdropdown-tab');
    this.mainMenu = page.locator('.oxd-main-menu').first();
    this.adminMenuItem = page.getByRole('link', { name: 'Admin' });
    this.pimMenuItem = page.getByRole('link', { name: 'PIM' });
    this.leaveMenuItem = page.getByRole('link', { name: 'Leave' });
  }

  // Asserts the browser has been redirected to the Dashboard URL.
  async assertOnDashboard(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(this.expectedPath));
  }

  /**
   * Asserts the profile widget and main menu items are visible,
   * confirming a fully authenticated dashboard render.
   */
  async assertDashboardLoaded(): Promise<void> {
    await expect(this.userDropdown).toBeVisible();
    await expect(this.mainMenu).toBeVisible();
    await expect(this.adminMenuItem).toBeVisible();
    await expect(this.pimMenuItem).toBeVisible();
    await expect(this.leaveMenuItem).toBeVisible();
  }

  /**
   * Reads the session cookie (named "orangehrm") from the browser context.
   */
  async getSessionCookie() {
    const cookies = await this.page.context().cookies();
    return cookies.find((c) => c.name === 'orangehrm');
  }
}