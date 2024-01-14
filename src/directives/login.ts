import { App, DirectiveBinding } from 'vue'

const verifyLogin = (binding: DirectiveBinding, app: App) => {
	// 没有登录
	if (!localStorage.getItem('info') || !localStorage.getItem('token')) {
		// 判断是否登录
		app.config.globalProperties.$Bus.emit('showLoginDialog') // 弹出登录窗口
	} else {
		binding.value() // 调用回调函数
	}
}
let verifyFun: any

export default (app: App) => {
	return {
		mounted: (el: HTMLElement, binding: DirectiveBinding) => {
			verifyFun = verifyLogin.bind(null, binding, app)
			el.addEventListener('click', verifyFun) // 给元素添加点击事件
		},
		// 卸载回调
		unmounted: (el: HTMLElement) => {
			el.removeEventListener('click', verifyFun) // 移除事件
		}
	}
}
