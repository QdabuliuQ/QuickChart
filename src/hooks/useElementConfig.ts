import { onUnmounted, watch } from 'vue'

import useProxy from '@/hooks/useProxy'

import useStore from '@/store'

import { getRecordOption } from '@/utils/screenUtil'
import { debounce } from '@/utils'

export function useElementConfig() {
	const proxy = useProxy()
	const { screen } = useStore()
	const stop = watch(
		() => screen.getScreenOptionOfElements[screen.getCurElementIdx],
		debounce(() => {
			screen.addOperationRecordItem(
				getRecordOption(
					'modify',
					screen.getScreenOptionOfElements[screen.getCurElementIdx].type as any
				)
			)
		}, 300),
		{
			deep: true
		}
	)

	const deleteEvent = () => {
		// 删除图表
		proxy.$Bus.emit('deleteChart', screen.curElementIdx)
	}

	onUnmounted(() => {
		stop()
	})

	return {
		deleteEvent,
		screen
	}
}
