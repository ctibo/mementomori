import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$lib: path.resolve('./src/lib'),
			$assets: path.resolve('./src/assets'),
			$components: path.resolve('./src/components'),
			$fa: '@fortawesome/fontawesome-free/svgs',
		},
	},
	ssr: {
		external: [ 
			'algostack'
		],
	},
};

export default config;
