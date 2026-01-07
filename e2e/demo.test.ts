import { expect, test } from '@playwright/test';

test.describe('Demo tests', () => {
	test('should visit home page', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByRole('heading', { name: '@radiofrance/svelte-leaflet' })).toBeVisible();
		await expect(page.getByText('Create Leaflet maps the Svelte way')).toBeVisible();
		await expect(page.getByRole('link', { name: 'Getting started' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'Documentation' })).toBeVisible();
	});

	test('should click on the demo', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('link', { name: 'Getting started' }).click();
		await page.getByRole('link', { name: 'Map' }).click();
	});
});
