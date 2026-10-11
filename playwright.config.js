// @ts-check
const { defineConfig, devices } = require('@playwright/test');

// BASE_URL points the suite at a deployed preview; without it, the local dev
// server is started and tested instead.
const baseURL = process.env.BASE_URL || 'http://localhost:3000';
const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

module.exports = defineConfig({
  testDir: './e2e',
  outputDir: process.env.PW_OUTPUT_DIR || 'test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL,
    // Lets the suite through Vercel Deployment Protection on preview URLs.
    extraHTTPHeaders: bypassSecret
      ? { 'x-vercel-protection-bypass': bypassSecret, 'x-vercel-set-bypass-cookie': 'true' }
      : undefined,
    screenshot: 'on',
    // PW_VIDEO=on records every test, for proving a change; otherwise only failures keep one.
    video: process.env.PW_VIDEO === 'on' ? 'on' : 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'phone', use: { ...devices['Pixel 7'] } },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        // CI tests the production build it just made; locally the dev server is quicker.
        command: process.env.CI ? 'npm start' : 'npm run dev',
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
