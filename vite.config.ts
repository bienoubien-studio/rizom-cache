import { defineConfig } from 'vitest/config';
import { rizom } from 'rizom/vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [rizom(), sveltekit()],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
