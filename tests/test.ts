import { expect, test } from '@playwright/test';

test('Home page', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: '@radiofrance/svelte-leaflet' })).toBeVisible();
	await expect(page.getByText('Create Leaflet maps the Svelte way')).toBeVisible();
	await expect(page.getByRole('link', { name: 'Getting started' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'Documentation' })).toBeVisible();
});

test('Getting started page', async ({ page }) => {
	await page.goto('http://localhost:5173/');
	await page.getByRole('link', { name: 'Getting started' }).click();
	await page.getByRole('link', { name: 'Map' }).click();
	await expect(page.getByText('It\'s the only component you')).toBeVisible();
	await expect(page.getByText('A Map has an options props')).toBeVisible();
});

test('Demo page', async ({ page }) => {
	await page.goto('/demo');
	await expect(page.locator('.leaflet-interactive').first()).toBeVisible();
});

test('Minimal page', async ({ page }) => {
	await page.goto('/demo');
	await expect(page.locator('.leaflet-interactive').first()).toBeVisible();
});
