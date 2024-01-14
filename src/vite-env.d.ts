/// <reference types="vite/client" />
declare module 'element-plus'
declare module '*.vue' {
	import { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, any>
	export default component
}
declare module 'x-data-spreadsheet/src/locale/zh-cn'
