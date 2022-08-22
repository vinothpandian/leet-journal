import adapter from '@sveltejs/adapter-auto';
import { resolve } from 'path';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: true,
	}),

	kit: {
		adapter: adapter(),
		alias: {
			$components: resolve('./src/components'),
			$icons: resolve('./src/icons'),
			$lib: resolve('./src/lib'),
			$db: resolve('./src/db'),
			$store: resolve('./src/store'),
			$constants: resolve('./src/constants'),
		},
	},
};

export default config;
