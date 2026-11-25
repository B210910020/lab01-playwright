import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright тохиргоо.
 * - testDir: тестүүд tests/ хавтаст байна
 * - reporter: HTML тайланг playwright-report/ хавтаст хадгална (репод оруулна)
 * - baseURL: saucedemo — тест хийх зориулалттай демо дэлгүүр
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,          // тестүүд хоорондоо хамааралгүй тул зэрэг ажиллана
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://www.saucedemo.com',
    testIdAttribute: 'data-test', // saucedemo нь data-test атрибут ашигладаг -> getByTestId
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
