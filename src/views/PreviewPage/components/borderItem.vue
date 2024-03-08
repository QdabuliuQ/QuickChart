<template>
	<border v-if="itemInfo" v-bind="itemInfo" />
</template>
<script setup lang="ts">
import { onUnmounted, reactive, watch } from 'vue'

import border from '@/views/ScreenPage/elements/borderElement/index.vue'

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
		itemInfo.style = props.style
		itemInfo.style.width = Number(props.style.width)
		itemInfo.style.height = Number(props.style.height)
		itemInfo.style.translateX = Number(props.style.translateX)
		itemInfo.style.translateY = Number(props.style.translateY)

		if (itemInfo.style.borderTitleWidth) {
			itemInfo.style.borderTitleWidth = Number(itemInfo.style.borderTitleWidth)
		}
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
#preview-container {
	.border-element {
		position: absolute;
	}
}
</style>
