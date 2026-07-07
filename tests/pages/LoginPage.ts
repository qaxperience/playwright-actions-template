import { expect, Locator, Page } from '@playwright/test';
import { clearAndFill, navigateTo, submitForm } from '../utils/actions';

export class LoginPage {
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly toast: Locator;
  private readonly modal: Locator;

  constructor(private readonly page: Page) {
    this.username = page.locator('[name=user]');
    this.password = page.locator('[name=pass]');
    this.toast = page.locator('div[role=status]');
    this.modal = page.locator('.swal2-html-container');
  }

  async goto() {
    await navigateTo(this.page);
  }

  async fillUsername(value: string) {
    await clearAndFill(this.username, value);
  }

  async fillPassword(value: string) {
    await clearAndFill(this.password, value);
  }

  async submit() {
    await submitForm(this.page);
  }

  async login(user: string, pass: string) {
    await this.goto();
    await this.fillUsername(user);
    await this.fillPassword(pass);
    await this.submit();
  }

  async expectToastMessage(message: string) {
    await expect(this.toast).toHaveText(message);
  }

  async expectSuccessModal(message: string) {
    await expect(this.modal).toHaveText(message);
  }
}
