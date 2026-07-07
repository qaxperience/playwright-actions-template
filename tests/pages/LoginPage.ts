import { expect, Locator, Page } from '@playwright/test';

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
    await this.page.goto('/');
  }

  async login(user: string, pass: string) {
    await this.goto();
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.page.getByRole('button', { name: 'Entrar' }).click();
  }

  async expectToastMessage(message: string) {
    await expect(this.toast).toHaveText(message);
  }

  async expectSuccessModal(message: string) {
    await expect(this.modal).toHaveText(message);
  }
}
