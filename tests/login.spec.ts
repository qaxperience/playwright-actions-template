import { test } from './fixtures';

test.describe('Login', () => {
  test('usuário obrigatório', async ({ loginPage, loginData }) => {
    await loginPage.login(loginData.emptyUser.user, loginData.emptyUser.pass);
    await loginPage.expectToastMessage(loginData.messages.emptyUser);
  });

  test('senha obrigatória', async ({ loginPage, loginData }) => {
    await loginPage.login(loginData.emptyPass.user, loginData.emptyPass.pass);
    await loginPage.expectToastMessage(loginData.messages.emptyPass);
  });

  test('ambos os campos vazios', async ({ loginPage, loginData }) => {
    await loginPage.login(loginData.emptyBoth.user, loginData.emptyBoth.pass);
    await loginPage.expectToastMessage(loginData.messages.emptyUser);
  });

  test('usuário não existe', async ({ loginPage, loginData }) => {
    await loginPage.login(loginData.invalidUser.user, loginData.invalidUser.pass);
    await loginPage.expectToastMessage(loginData.messages.invalidCredentials);
  });

  test('senha incorreta', async ({ loginPage, loginData }) => {
    await loginPage.login(loginData.wrongPass.user, loginData.wrongPass.pass);
    await loginPage.expectToastMessage(loginData.messages.invalidCredentials);
  });

  test('com sucesso', async ({ loginPage, loginData }) => {
    await loginPage.login(loginData.valid.user, loginData.valid.pass);
    await loginPage.expectSuccessModal(loginData.messages.success);
  });
});
