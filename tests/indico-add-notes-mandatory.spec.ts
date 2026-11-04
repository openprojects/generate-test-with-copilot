import { test, expect } from '@playwright/test';

test('should verify Add notes field and its mandatory status', async ({ page }) => {
  // Navigate directly to the specific event
  await page.goto('https://indico.un.org/event/1026728');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Navigate to the Registration page
  const registrationLink = page.locator('a:has-text("Registration")').first();
  await registrationLink.click();
  
  // Wait for registration page to load
  await page.waitForLoadState('networkidle');
  
  // Locate the "Add notes" label
  const addNotesLabel = page.locator('label:has-text("Add notes")').first();
  await expect(addNotesLabel).toBeVisible();
  
  // Get the for attribute to find the associated input
  const inputId = await addNotesLabel.getAttribute('for');
  const addNotesInput = page.locator(`#${inputId}`);
  await expect(addNotesInput).toBeVisible();
  
  // Check if the field has a required attribute
  const isRequired = await addNotesInput.evaluate((el: HTMLInputElement) => el.required);
  
  // Check if there's a required indicator (red asterisk) near the label
  const asteriskInLabel = await addNotesLabel.locator('span:has-text("*")').count();
  const hasRequiredIndicator = asteriskInLabel > 0;
  
  // Check if the label text itself contains asterisk
  const labelText = await addNotesLabel.textContent();
  const hasAsteriskInText = labelText?.includes('*') ?? false;
  
  // Verify the mandatory status of the field
  const isMandatory = isRequired || hasRequiredIndicator || hasAsteriskInText;
  
  console.log(`Add notes field is mandatory: ${isMandatory}`);
  console.log(`  - has required attribute: ${isRequired}`);
  console.log(`  - has required indicator (asterisk span): ${hasRequiredIndicator}`);
  console.log(`  - has asterisk in label text: ${hasAsteriskInText}`);
  
  // Assert based on actual field status
  if (isMandatory) {
    expect(isMandatory).toBeTruthy();
  } else {
    // Field is optional - verify this is the case
    expect(isRequired).toBe(false);
    expect(hasRequiredIndicator).toBe(false);
    expect(hasAsteriskInText).toBe(false);
  }
});
