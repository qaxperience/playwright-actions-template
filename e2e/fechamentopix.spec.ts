import { test, expect, Page } from '@playwright/test';
import { only } from 'node:test';

test('Compra Pix',async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Continuar e fechar' }).click();
    await page.frameLocator('iframe[title="Close message"]').getByLabel('Close message').click();
    await login(page,'qa.webconversion@tokstok.com.br', 'Tok@4321')
    await page.getByPlaceholder('Buscar por').fill('417857');
    await page.locator('#chaordic-search-bar').getByRole('button').click();
    const target = page.getByRole('heading', { name: '417857' })
    await expect(target).toBeVisible();
    await page.getByRole('button', { name: 'Pote 600 ml old fashioned 4.5 Pote 600 ml old fashioned R$19,90 Adicionar ao carrinho' }).click();
    await page.getByRole('button', { name: 'Comprar' }).click();
    await page.getByRole('button', { name: 'Ir para o carrinho' }).click();
    await page.getByRole('link', { name: 'Fechar pedido' }).click();
    await page.getByLabel('Número').click();
    await page.getByLabel('Número').fill('450');
    await page.getByLabel('Destinatário').click();
    await page.getByLabel('Destinatário').fill('Teste');
    await page.getByRole('button', { name: 'Ir para o pagamento' }).click();
    await page.getByRole('link', { name: 'Pix', exact: true }).click();
    await page.getByRole('button', { name: 'Finalizar compra', exact: true }).click();
    await page.getByRole('img', { name: 'PIX QRCode' }).click();
    await page.getByRole('button', { name: 'Pagar sem o celular' }).click();
    await page.getByRole('button', { name: 'COPIAR CÓDIGO' }).click();
  })



  const login = async (page: Page, user: string, pass: string) => {
    await page.goto('/login?returnUrl=/')

    const username = page.locator(`//input[contains(@class,'tokstoksponsorio-login-components-0-x-accessKeyModalEmailInput tokstoksponsorio-login-components-0-x-loginInputComponent fw5 outline-0')]`)
    const password = page.getByPlaceholder('Digite sua senha')

    user 
      ? await username.fill(user) : null

    pass
      ? await password.fill(pass) : null

        await page.getByRole('button', { name: 'entrar' }).click();
        await page.getByRole('button', { name: 'Olá,' }).isVisible();
}


