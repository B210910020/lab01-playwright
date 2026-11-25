import { test, expect, Page } from '@playwright/test';

/*
 * Лаб 1 — saucedemo.com нэвтрэх хуудасны UI автомат тест.
 * Тест бүр шинэ browser context-д ажилладаг (Playwright анхдагчаар тусгаарладаг),
 * тиймээс тестүүд хоорондоо хамааралгүй, дангаараа ажиллана (test isolation).
 * Locator: getByPlaceholder / getByRole / getByText / getByTestId — XPath ашиглаагүй.
 */

const USER = 'standard_user';
const PASS = 'secret_sauce';

// Нэвтрэх туслах функц: формыг бөглөөд Login товч дарна
async function login(page: Page, username: string, password: string) {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
}

// Гарах туслах функц: цэс нээгээд Logout дарж, нэвтрэх хуудас руу буцсаныг шалгана
async function logout(page: Page) {
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
}

test('амжилттай нэвтрэх', async ({ page }) => {
  await login(page, USER, PASS);

  // Бараа жагсаалтын хуудас руу шилжсэн эсэх
  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.getByText('Products')).toBeVisible();
  await expect(page.getByTestId('title')).toHaveText('Products');

  await logout(page);
});

test('буруу нууц үгээр нэвтрэхэд алдаа гарна', async ({ page }) => {
  await login(page, USER, 'wrong_password');

  // Алдааны мессеж гарч, нэвтрэх хуудсандаа үлдэх ёстой
  const error = page.getByTestId('error');
  await expect(error).toBeVisible();
  await expect(error).toHaveText(
    'Epic sadface: Username and password do not match any user in this service'
  );
  await expect(page).not.toHaveURL(/inventory\.html/);
  // Нэвтрээгүй тул logout шаардлагагүй — нэвтрэх товч хэвээр байна
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

test('нэвтэрсний дараа бараа сагслах', async ({ page }) => {
  await login(page, USER, PASS);

  // "Sauce Labs Backpack"-ийг сагсанд нэмнэ
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

  // Сагсны тэмдэг 1 болж, товч "Remove" болж өөрчлөгдөнө
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
  await expect(page.getByTestId('remove-sauce-labs-backpack')).toBeVisible();

  // Сагс руу орж бараа байгааг шалгана
  await page.getByTestId('shopping-cart-link').click();
  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

  await logout(page);
});
