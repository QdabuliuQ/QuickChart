import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { autoComplete, Plugin as importToCDN } from 'vite-plugin-cdn-import'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	plugins: [
		vue(),
		VueSetupExtend()
		// AutoImport({
		// 	resolvers: [ElementPlusResolver()]
		// }),
		// Components({
		// 	resolvers: [ElementPlusResolver()]
		// }),

		// importToCDN({
		// 	prodUrl: 'https://unpkg.com/{name}@{version}/{path}',
		// 	modules: [
		// 		autoComplete('vue'),
		// 		autoComplete('axios'),
		// 		{
		// 			name: 'element-plus',
		// 			var: 'ElementPlus', //根据main.js中定义的来
		// 			version: '2.2.17',
		// 			path: 'dist/index.full.js',
		// 			css: 'dist/index.css'
		// 		},
		// 		{
		// 			name: 'moment',
		// 			var: 'moment',
		// 			version: '2.29.4',
		// 			path: 'moment.js'
		// 		},
		// 		{
		// 			name: 'echarts',
		// 			var: 'echarts',
		// 			version: '5.2.0',
		// 			path: 'dist/echarts.min.js'
		// 		},
		// 		{
		// 			name: 'echarts-gl',
		// 			version: '2.0.8',
		// 			path: 'dist/echarts-gl.min.js'
		// 		},
		// 		{
		// 			name: 'mitt',
		// 			version: '3.0.0',
		// 			var: 'mitt',
		// 			path: 'dist/mitt.js'
		// 		},
		// 		{
		// 			name: 'moment',
		// 			version: '2.29.4',
		// 			var: 'mitt',
		// 			path: 'dist/mitt.js'
		// 		},
		// 		{
		// 			name: 'vue',
		// 			version: '3.3.11',
		// 			var: 'Vue',
		// 			path: 'dist/vue.global.js'
		// 		},
		// 		{
		// 			name: 'vue-router',
		// 			version: '4.0.0',
		// 			var: 'VueRouter',
		// 			path: 'dist/vue-router.global.js'
		// 		},
		// 		{
		// 			name: 'xlsx',
		// 			version: '0.18.5',
		// 			var: 'XLSX',
		// 			path: 'dist/xlsx.full.min.js'
		// 		}
		// 	]
		// })
	],
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
				additionalData: `@import "${path.resolve(__dirname, 'src/assets/less/variables.less')}";`
			}
		}
	},
	build: {
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true
			}
		}
	}
})
