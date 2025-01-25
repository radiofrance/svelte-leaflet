import { expect, test } from '@playwright/test';

const routes = [
	'attribution-prefix',
	'circlemarker',
	// 'getting-started', To add back?
	'layerscontrol',
	'list',
	'marker',
	'popup',
	'svgoverlay',
	'tooltip',
	'zoomcontrol',
	'circle',
	'cluster',
	'imageoverlay',
	'map',
	'polygon',
	'rectangle',
	'tilelayer',
	'videooverlay',
];

test.describe('Route Tests', () => {
	routes.forEach((route) => {
		test(`should visit ${route}`, async ({ page }) => {
			const url = `http://localhost:5173/docs/${route}`;
			await page.goto(url);
			await expect(page.locator('.Map')).toBeVisible(); // Quite bad, since the test is tied by the implementation
			await expect(page.locator('.leaflet-container')).toBeVisible();
		});
	});
});
