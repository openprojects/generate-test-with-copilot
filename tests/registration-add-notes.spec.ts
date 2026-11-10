import { expect, test } from '@playwright/test';

test.use({ channel: 'chrome' });

test('Add notes is mandatory on the registration form', async ({ page }) => {
  await page.goto('https://indico.un.org/event/1026728');
  await page.getByRole('link', { name: 'Registration', exact: true }).click();

  const notes = page.getByRole('textbox', { name: 'Add notes', exact: true });
  await expect(notes).toBeVisible();
  await expect(notes, 'Add notes must be a required field').toHaveJSProperty('required', true);
});
