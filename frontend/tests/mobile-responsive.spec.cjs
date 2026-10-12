const { test, expect } = require('@playwright/test');

const widths = [320, 375, 390, 430, 1280];

test.describe('LASTRO responsive shell', () => {
  for (const width of widths) {
    test(`has no horizontal document overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      if (width < 768) {
        await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeVisible();
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
    await page.goto('/');

    const trigger = page.getByRole('button', { name: 'Abrir menu' });
    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    const close = page.getByRole('button', { name: 'Fechar menu' });
    await expect(close).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toBeFocused();
  });

  test('navigation drawer closes after selecting a destination', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    await page.getByRole('button', { name: 'Abrir menu' }).click();
    await page.getByRole('navigation', { name: 'Navegação operacional' })
      .getByRole('button', { name: 'Submeter Evidência' }).click();

    await expect(page.getByRole('button', { name: 'Abrir menu' })).toHaveAttribute('aria-expanded', 'false');
  });
});
