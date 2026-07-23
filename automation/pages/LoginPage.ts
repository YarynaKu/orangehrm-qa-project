import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorAlert: Locator;
  readonly requiredFieldErrors: Locator;
  readonly forgotPasswordLink: Locator;

  private readonly path = '/web/index.php/auth/login';

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorAlert = page.locator('.oxd-alert-content-text');
    this.requiredFieldErrors = page.locator('.oxd-input-group__message');
    this.forgotPasswordLink = page.locator('.orangehrm-login-forgot-header');
  }

  // Navigates to the login page.
  async goto(): Promise<void> {
    await this.page.goto(this.path);
    await expect(this.usernameInput).toBeVisible();
  }

  // Fills the username field.
  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  // Fills the password field.
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  // Clicks the Login submit button.
  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  // Method that performs a full login attempt:
  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  // Returns the current page URL.
  getCurrentUrl(): string {
    return this.page.url();
  }
}