import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	plugins: [vue(), VueSetupExtend()],
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
				additionalData: `@import "${path.resolve(__dirname, 'src/assets/less/variables.less')}";`
			}
		}
	}
})
