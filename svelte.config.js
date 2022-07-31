import adapter from '@sveltejs/adapter-auto';
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
			$components: 'src/components',
			$icons: 'src/icons',
			$lib: 'src/lib',
			$db: 'src/db',
			$store: 'src/store',
			$constants: 'src/constants',
		},
	},
};

export default config;
