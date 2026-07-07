import { test } from './fixtures';

test.describe('Login', () => {
  test('should show validation when username is empty', async ({ loginPage, loginData }) => {
    await loginPage.login(loginData.emptyUser.user, loginData.emptyUser.pass);
    await loginPage.expectToastMessage(loginData.messages.emptyUser);
  });

  test('should show validation when password is empty', async ({ loginPage, loginData }) => {
    await loginPage.login(loginData.emptyPass.user, loginData.emptyPass.pass);
    await loginPage.expectToastMessage(loginData.messages.emptyPass);
  });

  test('should prioritize username validation when both fields are empty', async ({
    loginPage,
    loginData,
  }) => {
    await loginPage.login(loginData.emptyBoth.user, loginData.emptyBoth.pass);
    await loginPage.expectToastMessage(loginData.messages.emptyUser);
  });

  test('should reject non-existing user', async ({ loginPage, loginData }) => {
    await loginPage.login(loginData.invalidUser.user, loginData.invalidUser.pass);
    await loginPage.expectToastMessage(loginData.messages.invalidCredentials);
  });

  test('should reject valid user with wrong password', async ({ loginPage, loginData }) => {
    await loginPage.login(loginData.wrongPass.user, loginData.wrongPass.pass);
    await loginPage.expectToastMessage(loginData.messages.invalidCredentials);
  });

  test('should show success modal for valid credentials', async ({ loginPage, loginData }) => {
    await loginPage.login(loginData.valid.user, loginData.valid.pass);
    await loginPage.expectSuccessModal(loginData.messages.success);
  });
});
