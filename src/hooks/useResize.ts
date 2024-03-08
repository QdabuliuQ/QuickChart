import { onMounted, onUnmounted } from 'vue'

export default function useResize(callback: () => any) {
	onMounted(() => {
		window.addEventListener('resize', callback)

		callback && callback()
	})
	onUnmounted(() => {
		window.removeEventListener('resize', callback)
	})
}
