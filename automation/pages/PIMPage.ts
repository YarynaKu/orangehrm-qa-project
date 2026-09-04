import { Page, Locator, expect } from '@playwright/test';

export class PIMPage {
  readonly page: Page;
  readonly employeeList: Locator;
  readonly addEmployeeButton: Locator;
  readonly firstnameInput: Locator;
  readonly middlenameInput: Locator;
  readonly lastnameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly saveButton: Locator;
  readonly personalDetailsSaveButton: Locator;
  readonly requiredFieldErrors: Locator;
  readonly successToast: Locator;
  readonly createLoginDetailsToggle: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;

  private readonly path = '/web/index.php/pim/viewEmployeeList';

  constructor(page: Page) {
    this.page = page;
    this.employeeList = page.getByRole('heading', { name: 'Employee Information' });
    this.addEmployeeButton = page.getByRole('button', { name: 'Add' });
    this.firstnameInput = page.getByPlaceholder('First Name');
    this.middlenameInput = page.getByPlaceholder('Middle Name');
    this.lastnameInput = page.getByPlaceholder('Last Name');
    this.employeeIdInput = page.locator('.oxd-input-group').filter({ has: page.locator('label', { hasText: 'Employee Id' }) }).locator('input');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.personalDetailsSaveButton = page.locator('.oxd-form').first().locator('button[type="submit"]');
    this.requiredFieldErrors = page.locator('.oxd-input-group__message');
    this.successToast = page.locator('.oxd-toast-content--success');
    this.createLoginDetailsToggle = page.locator('.oxd-switch-input');
    this.usernameInput = page.locator('.oxd-input-group').filter({ has: page.locator('label', { hasText: 'Username' }) }).locator('input');
    this.passwordInput = page.locator('.oxd-input-group').filter({ has: page.locator('label', { hasText: /^Password$/ }) }).locator('input');
    this.confirmPasswordInput = page.locator('.oxd-input-group').filter({ has: page.locator('label', { hasText: 'Confirm Password' }) }).locator('input');
  }

  // Navigates to the PIM page.
  async goto(): Promise<void> {
    await this.page.goto(this.path);
    await expect(this.employeeList).toBeVisible();
  }

  // Adds a new employee.
  async clickAdd(): Promise<void> {
    await this.addEmployeeButton.click();
  }

  // Fills the first name field.
  async fillFirstname(firstname: string): Promise<void> {
    await this.firstnameInput.fill(firstname);
  }

  // Fills the middle name field.
  async fillMiddlename(middlename: string): Promise<void> {
    await this.middlenameInput.fill(middlename);
  }

  // Fills the last name field.
  async fillLastname(lastname: string): Promise<void> {
    await this.lastnameInput.fill(lastname);
  }

  // Clicks the Save submit button.
  async clickSave(): Promise<void> {
    await this.saveButton.click();
  }

  // Method that performs a full add employee attempt:
  async addEmployee(firstname: string, lastname: string): Promise<void> {
    await this.fillFirstname(firstname);
    await this.fillLastname(lastname);
    await this.clickSave();
  }

  // Method to add employee with all optional fields (middle name & login details)
  async addEmployeeWithAllFields(firstname: string, middlename: string, lastname: string, username: string, password: string): Promise<void> {
    await this.fillFirstname(firstname);
    await this.middlenameInput.fill(middlename);
    await this.fillLastname(lastname);
    
    // Toggle login details
    await this.createLoginDetailsToggle.click();
    
    // Fill login details
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
    
    await this.clickSave();
  }

  // Method to attempt adding an employee with a specific Employee Id
  async addEmployeeWithId(firstname: string, lastname: string, employeeId: string): Promise<void> {
    await this.fillFirstname(firstname);
    await this.fillLastname(lastname);
    await this.employeeIdInput.fill(employeeId);
    await this.clickSave();
  }


  // Returns the current page URL.
  getCurrentUrl(): string {
    return this.page.url();
  }

  // Gets the Employee ID of the first employee in the list
  async getFirstEmployeeId(): Promise<string> {
    await this.goto();
    // Wait for the table body to appear
    await this.page.waitForSelector('.oxd-table-body');
    // Get the second cell (index 1) of the first data row, which usually contains the Employee Id
    const employeeIdCell = this.page.locator('.oxd-table-body .oxd-table-row').first().locator('.oxd-table-cell').nth(1);
    const id = await employeeIdCell.innerText();
    return id.trim();
  }

  // Deletes an employee by their first and last name
  async deleteEmployee(firstname: string, lastname: string): Promise<void> {
    await this.goto();
    // Wait for the table to load
    await this.page.waitForSelector('.oxd-table-body');
    
    // Find the row containing the employee's name
    // Since names might be split across cells, we look for a row containing both
    const row = this.page.locator('.oxd-table-row').filter({ hasText: firstname }).filter({ hasText: lastname }).first();
    
    // Click the delete icon (trash can)
    await row.locator('.bi-trash').click();
    
    // Confirm the deletion in the modal
    const confirmDeleteBtn = this.page.locator('.oxd-button--label-danger');
    await confirmDeleteBtn.click();
    
    // Wait for the success toast to ensure deletion is complete
    await expect(this.successToast).toBeVisible();
  }
}