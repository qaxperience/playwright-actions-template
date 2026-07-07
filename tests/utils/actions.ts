import { Page } from '@playwright/test';

export const clearAndFill = async (page: Page, selector: string, value: string) => {
  const locator = page.locator(selector);
  await locator.clear();
  await locator.fill(value);
};

export const submitForm = async (page: Page, buttonText = 'Entrar') => {
  await page.getByRole('button', { name: buttonText }).click();
};

export const navigateTo = async (page: Page, path = '/') => {
  await page.goto(path);
};
