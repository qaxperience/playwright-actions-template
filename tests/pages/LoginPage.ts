import { expect, Page } from '@playwright/test';
import { clearAndFill, navigateTo, submitForm } from '../utils/actions';

export class LoginPage {
  private readonly toast = this.page.locator('div[role=status]');
  private readonly modal = this.page.locator('.swal2-html-container');

  constructor(private readonly page: Page) {}

  async goto() {
    await navigateTo(this.page);
  }

  async fillUsername(value: string) {
    await clearAndFill(this.page, '[name=user]', value);
  }

  async fillPassword(value: string) {
    await clearAndFill(this.page, '[name=pass]', value);
  }

  async submit() {
    await submitForm(this.page);
  }

  async login(user: string, pass: string) {
    await this.goto();
    if (user) await this.fillUsername(user);
    if (pass) await this.fillPassword(pass);
    await this.submit();
  }

  async expectToastMessage(message: string) {
    await expect(this.toast).toHaveText(message);
  }

  async expectSuccessModal(message: string) {
    await expect(this.modal).toHaveText(message);
  }
}
