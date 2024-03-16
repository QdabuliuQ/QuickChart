import { onMounted, onUnmounted } from 'vue'

export default function useResize(callback: () => any) {
	onMounted(() => {
		console.log('rsar')
		window.addEventListener('resize', callback)
		callback()
	})

	onUnmounted(() => {
		window.removeEventListener('resize', callback)
	})
}
