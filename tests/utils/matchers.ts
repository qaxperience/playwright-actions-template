import { expect, Page } from '@playwright/test';

expect.extend({
  async toShowToast(page: Page, expected: string) {
    const locator = page.locator('div[role=status]');
    try {
      await expect(locator).toHaveText(expected);
      return {
        pass: true,
        message: () => `Expected toast NOT to show "${expected}"`,
      };
    } catch {
      const actual = await locator.textContent().catch(() => '(not found)');
      return {
        pass: false,
        message: () => `Expected toast "${expected}", got "${actual}"`,
      };
    }
  },

  async toShowModal(page: Page, expected: string) {
    const locator = page.locator('.swal2-html-container');
    try {
      await expect(locator).toHaveText(expected);
      return {
        pass: true,
        message: () => `Expected modal NOT to show "${expected}"`,
      };
    } catch {
      const actual = await locator.textContent().catch(() => '(not found)');
      return {
        pass: false,
        message: () => `Expected modal "${expected}", got "${actual}"`,
      };
    }
  },
});

export interface CustomMatchers<R = unknown> {
  toShowToast(message: string): Promise<R>;
  toShowModal(message: string): Promise<R>;
}

declare global {
  namespace PlaywrightTest {
    interface Matchers<R> extends CustomMatchers<R> {}
  }
}
