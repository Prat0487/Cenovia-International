const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: 'tests/playwright',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:8000',
    headless: true,
    trace: 'on-first-retry'
  },
  webServer: {
    command: 'npx http-server -p 8000',
    url: 'http://localhost:8000',
    reuseExistingServer: true,
    timeout: 120 * 1000
  }
});
