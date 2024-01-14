import { DirectiveBinding } from 'vue'

export default {
	mounted: (el: HTMLImageElement, binding: DirectiveBinding) => {
		const observer = new IntersectionObserver(
			([{ isIntersecting }]) => {
				if (isIntersecting) {
					observer.unobserve(el)
					// 表示绑定的 dom 进入可视区域
					el.src = binding.value
				}
			},
			{
				threshold: 0
			}
		)
		// 监视 dom
		observer.observe(el)
	}
}
