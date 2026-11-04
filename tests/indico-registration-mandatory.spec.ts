import { test, expect } from '@playwright/test';

test('should verify First Name is mandatory in Personal Data section', async ({ page }) => {
  // Navigate directly to the specific event
  await page.goto('https://indico.un.org/event/1026728');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Navigate to the Registration page
  // Look for a Registration link/button in the event navigation
  const registrationLink = page.locator('a:has-text("Registration")').first();
  await registrationLink.click();
  
  // Wait for registration page to load
  await page.waitForLoadState('networkidle');
  
  // Locate the Personal Data section
  const personalDataSection = page.locator('h4:has-text("Personal Data"), h3:has-text("Personal Data"), .section:has-text("Personal Data"), legend:has-text("Personal Data")').first();
  await expect(personalDataSection).toBeVisible();
  
  // Look for the First Name field within or near the Personal Data section
  // Check for common field label patterns
  const firstNameLabel = page.locator('label:has-text("First Name")').first();
  await expect(firstNameLabel).toBeVisible();
  
  // Verify that First Name is mandatory by checking for:
  // 1. A red asterisk (*) indicating required field
  // 2. A required attribute on the input field
  // 3. An aria-required attribute
  
  // Get the input field associated with the First Name label
  const firstNameInput = page.locator('input[id*="first"], input[name*="first"], input[name*="firstName"]').first();
  
  // Check if the field has a required attribute
  const isRequired = await firstNameInput.evaluate((el: HTMLInputElement) => el.required);
  
  // Check if there's a required indicator (red asterisk) near the label
  const requiredIndicator = firstNameLabel.locator('span:has-text("*"), .required');
  const hasRequiredIndicator = await requiredIndicator.count().then(count => count > 0);
  
  // Verify that the field is mandatory
  expect(isRequired || hasRequiredIndicator).toBeTruthy();
});
