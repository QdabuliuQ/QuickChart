<template>
	<border v-if="itemInfo" v-bind="itemInfo" />
</template>
<script setup lang="ts">
import { onUnmounted, reactive, watch } from 'vue'

import border from '@/views/ScreenPage/elements/borderElement/index.vue'

import { getOffset } from '@/utils/screenUtil.ts'
import { debounce } from '@/utils'

import { IStyle } from '@/types/screen.ts'

type TProps = {
	c_height: number
	c_width: number
	width: number
	height: number
	id: string
	type: 'border'
	isLock: boolean
	code: number
	style: {
		duration?: number
		borderTitleWidth?: number
		borderTitleHeight?: number
		borderTitleColor?: string
		borderTitleSize?: number
		borderTitle?: string
		color1: string
		color2: string
	} & IStyle
}
const props = defineProps<TProps>()

const itemInfo = reactive<TProps>(
	JSON.parse(
		JSON.stringify({
			...props,
			idx: -1
		})
	) as any
)

const stop = watch(
	() => props,
	debounce(() => {
		console.log(JSON.parse(JSON.stringify(itemInfo)), 'before')
		itemInfo.style.width = getOffset(props.width, props.c_width, props.style.width) - 0
		itemInfo.style.height = getOffset(props.height, props.c_height, props.style.height) - 0
		itemInfo.style.translateX = getOffset(props.width, props.c_width, props.style.translateX) - 0
		itemInfo.style.translateY = getOffset(props.height, props.c_height, props.style.translateY) - 0
		if (itemInfo.style.borderTitleWidth) {
			itemInfo.style.borderTitleWidth =
				getOffset(props.width, props.c_width, itemInfo.style.borderTitleWidth) - 0
		}
		// if (itemInfo.style.borderTitleHeight) {
		// 	itemInfo.style.borderTitleHeight =
		// 		getOffset(props.width, props.c_width, itemInfo.style.borderTitleHeight) - 0
		// }
		// if (itemInfo.style.borderTitleSize) {
		// 	itemInfo.style.borderTitleSize =
		// 		getOffset(props.width, props.c_width, itemInfo.style.borderTitleSize) - 0
		// }
		console.log(itemInfo, 'after')
	}),
	{
		deep: true
	}
)

onUnmounted(() => {
	stop()
})
</script>

<style lang="less">
.preview-page {
	.border-element {
		position: absolute;
	}
}
</style>
