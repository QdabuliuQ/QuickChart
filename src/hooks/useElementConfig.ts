import { onMounted, onUnmounted, ref, watch } from 'vue'

import useProxy from '@/hooks/useProxy'

import useStore from '@/store'

import { getRecordOption, setCommonStyle } from '@/utils/screenUtil'
import { debounce } from '@/utils'

import { Border, Chart, ElementTypeProperties, Image, Shape, Text } from '@/types/screen'

export function useElementConfig<T extends Image | Chart | Text | Shape | Border>() {
	const proxy = useProxy()
	const { screen } = useStore()
	const baseInfo = ref(
		screen.getScreenOptionOfElements[screen.getCurElementIdx] as ElementTypeProperties<T['type']>
	)
	const idx = ref<number>(-1)
	const info = ref<T>(null as any)

	const deleteEvent = () => {
		// 删除图表
		proxy.$Bus.emit('deleteChart', screen.curElementIdx)
	}

	const updateInfo = () => {
		if (screen.getCurElementIdx !== -1) {
			idx.value = screen.getCurElementIdx
			info.value = JSON.parse(
				JSON.stringify(screen.getScreenOptionOfElements[screen.getCurElementIdx] as T)
			)
		}
	}

	const stop = watch(
		() => info,
		debounce(() => {
			setCommonStyle(baseInfo, info)
			screen.updateScreenOptionOfElementStyle(
				JSON.parse(JSON.stringify(info.value!.style)),
				idx.value
			)
			screen.addOperationRecordItem(getRecordOption('modify', info.value.type as any))
		}),
		{
			deep: true
		}
	)
	const stop2 = watch(
		() => screen.curElementIdx,
		() => {
			baseInfo.value = screen.getScreenOptionOfElements[screen.getCurElementIdx]
			updateInfo()
		}
	)

	onMounted(() => {
		updateInfo()
	})

	onUnmounted(() => {
		stop()
		stop2()
	})

	return {
		baseInfo,
		info,
		idx,
		deleteEvent
	}
}
