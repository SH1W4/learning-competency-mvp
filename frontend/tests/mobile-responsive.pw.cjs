const { test, expect } = require('@playwright/test');

const widths = [320, 375, 390, 430, 1280];

test.describe('LASTRO responsive shell', () => {
  for (const width of widths) {
    test(`has no horizontal document overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('http://127.0.0.1:3000/');
      if (width < 768) {
        await expect(page.locator('button.mobile-menu[aria-label="Abrir menu"]')).toBeVisible();
      }

      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        document: document.documentElement.scrollWidth,
        body: document.body.scrollWidth,
      }));

      expect(dimensions.document, JSON.stringify(dimensions)).toBeLessThanOrEqual(dimensions.viewport);
      expect(dimensions.body, JSON.stringify(dimensions)).toBeLessThanOrEqual(dimensions.viewport);
    });
  }

  test('mobile navigation opens, traps focus, closes on Escape and restores focus', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('http://127.0.0.1:3000/');

    const trigger = page.locator('button.mobile-menu[aria-label="Abrir menu"]');
    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    const sidebar = page.locator('aside.sidebar.mobile-open');
    const close = sidebar.getByRole('button', { name: 'Fechar menu' });
    await expect(close).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toBeFocused();
  });

  test('navigation drawer closes after selecting a destination', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('http://127.0.0.1:3000/');

    const trigger = page.locator('button.mobile-menu[aria-label="Abrir menu"]');
    await trigger.click();
    const sidebar = page.locator('aside.sidebar.mobile-open');
    const destination = sidebar
      .locator('nav[aria-label="Operation navigation"], nav[aria-label="Navegação operacional"]')
      .locator('button.nav-item')
      .first();
    await destination.scrollIntoViewIfNeeded();
    await expect(destination).toBeVisible();
    await destination.click({ timeout: 5000 });

    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('.breadcrumb strong')).toHaveText(/Submit Evidence|Submeter Evidência/);
  });
});
