import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter(),
		alias: {
			$assets: 'src/lib/assets',
			$components: 'src/lib/components',
			$layouts: 'src/lib/layouts',
			$models: 'src/lib/models',
			$utils: 'src/lib/utils'
		}
	}
};

export default config;
