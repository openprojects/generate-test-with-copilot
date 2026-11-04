import { test, expect } from '@playwright/test';

test('Indico registration: "Add notes" field is mandatory', async ({ page }) => {
  await page.goto('https://indico.un.org/event/1026728');
  await page.getByRole('link', { name: 'Registration' }).first().click();
  await page.getByRole('button', { name: 'Apply' }).click();

  const addNotes = page.getByRole('textbox', { name: 'Add notes' });
  await expect(addNotes).toBeVisible();
  await expect(addNotes).toHaveValue('');

  // Submit without filling anything: a mandatory field must show a validation error
  await page.getByRole('button', { name: 'Apply' }).click();

  const fieldContainer = addNotes.locator('xpath=ancestor::div[label][1]');
  await expect(fieldContainer, '"Add notes" should be mandatory').toContainText(/required|mandatory/i);
});
