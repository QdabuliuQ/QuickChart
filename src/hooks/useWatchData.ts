import { onUnmounted, watch } from 'vue'

import useProxy from '@/hooks/useProxy'

import { debounce } from '@/utils'
export default function useWatchData(data: any, propName: string, cb: () => void) {
	let proxy: any = useProxy()
	const stop = watch(
		() => data,
		debounce(() => {
			proxy.$Bus.emit('optionChange', {
				[propName]: cb()
			})
		}, 500),
		{
			deep: true
		}
	)

	onUnmounted(() => {
		stop() // 取消监听
		proxy = null
	})
}
