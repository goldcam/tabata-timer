import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
	it('should render h1', async () => {
		expect(true).toBe(true);
		render(Page);
		
		const heading = page.getByRole('heading', { level: 1 });
		// const main = page.get
		await expect.element(heading).toBeInTheDocument();
	});
});
