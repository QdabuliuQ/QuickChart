import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import requireTransform from 'vite-plugin-require-transform'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	plugins: [
		vue(),
		VueSetupExtend(),
		requireTransform({
			fileRegex: /.js$|.vue$|.ts$/
		})
	],
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
				additionalData: `@import "${path.resolve(__dirname, 'src/assets/less/variables.less')}";`
			}
		}
	}
})
