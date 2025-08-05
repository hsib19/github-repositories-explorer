import { test, expect } from '@playwright/test';

test('search repo and show list', async ({ page }) => {
  await page.goto('/');

  // Input username
  const input = page.getByTestId('username-input');
  await input.fill('hsib19');

  // Click button search
  const searchButton = page.getByTestId('search-button');
  await searchButton.click();

  // Wait user dan repos
  await expect(page.getByTestId('user-username')).toHaveText('hsib19');

  // Click for expand accordion
  await page.getByTestId('user-username').click();

  // Wait repo item
  await expect(page.getByTestId('repo-item-0')).toBeVisible();

  // Validate repo list
  const repoTitles = await page.locator('[data-testid="repo-title"]').allTextContents();
  expect(repoTitles.length).toBeGreaterThan(0);
  expect(repoTitles[0]).toEqual("apollo-express-ts");

  // console.log('Repo Titles:', repoTitles);
});
