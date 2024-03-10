import { onMounted, onUnmounted } from 'vue'

import useProxy from '@/hooks/useProxy'

export function useWatchResize(resizeEvent: (prop: any) => void) {
	const proxy = useProxy()
	onMounted(() => {
		proxy.$Bus.on('resize', resizeEvent)
	})
	onUnmounted(() => {
		proxy.$Bus.off('resize', resizeEvent)
	})
}
