import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { loginData, LoginData } from '../data/loginData';

type Fixtures = {
  loginPage: LoginPage;
  loginData: LoginData;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  loginData: async ({}, use) => {
    await use(loginData);
  },
});

export { expect };
