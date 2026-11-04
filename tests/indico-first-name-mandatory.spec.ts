import { test, expect } from '@playwright/test';

test('should verify First Name is mandatory in Personal Data section', async ({ page }) => {
  // Navigate directly to the specific event
  await page.goto('https://indico.un.org/event/1026728');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Navigate to the Registration page
  const registrationLink = page.locator('a:has-text("Registration")').first();
  await registrationLink.click();
  
  // Wait for registration page to load
  await page.waitForLoadState('networkidle');
  
  // Locate the Personal Data section
  const personalDataSection = page.locator('text=Personal Data').first();
  await expect(personalDataSection).toBeVisible();
  
  // Look for the First Name label
  const firstNameLabel = page.locator('label:has-text("First Name")').first();
  await expect(firstNameLabel).toBeVisible();
  
  // Get the for attribute to find the associated input
  const inputId = await firstNameLabel.getAttribute('for');
  const firstNameInput = page.locator(`#${inputId}`);
  await expect(firstNameInput).toBeVisible();
  
  // Check if the field has a required attribute
  const isRequired = await firstNameInput.evaluate((el: HTMLInputElement) => el.required);
  
  // Check if there's a required indicator (red asterisk) near the label
  const asteriskInLabel = await firstNameLabel.locator('span:has-text("*")').count();
  const hasRequiredIndicator = asteriskInLabel > 0;
  
  // Check if the label text itself contains asterisk
  const labelText = await firstNameLabel.textContent();
  const hasAsteriskInText = labelText?.includes('*') ?? false;
  
  // Verify that the field is mandatory through one of the indicators
  const isMandatory = isRequired || hasRequiredIndicator || hasAsteriskInText;
  
  console.log(`First Name field is mandatory: ${isMandatory}`);
  console.log(`  - has required attribute: ${isRequired}`);
  console.log(`  - has required indicator (asterisk span): ${hasRequiredIndicator}`);
  console.log(`  - has asterisk in label text: ${hasAsteriskInText}`);
  
  // Assert that the field is mandatory
  expect(isMandatory).toBeTruthy();
});
