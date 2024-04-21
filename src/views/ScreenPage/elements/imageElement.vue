<template>
	<img
		:class="[
			'img-element',
			'drag-item',
			'item-' + props.id,
			screen.getActiveElementIdx === idx ? 'active-item' : ''
		]"
		@click="clickEvent($event)"
		:style="{
			display: props.style.display,
			width: props.style.width + 'px',
			height: props.style.height + 'px',
			transform: `translate(${props.style.translateX}px, ${props.style.translateY}px) rotate(${props.style.rotate}deg)`,
			zIndex: props.style.zIndex,
			border: `${props.style.borderWidth}px ${props.style.borderType} ${props.style.borderColor}`,
			boxShadow: `${props.style.shadowX}px ${props.style.shadowY}px ${props.style.shadowBlur}px ${props.style.shadowColor}`
		}"
		:src="props.url" />
</template>
<script setup lang="ts">
import useElementClick from '@/hooks/useElementClick.ts'

import useStore from '@/store'

import { BorderType } from '@/types/element.ts'
import { IStyle } from '@/types/screen.ts'

type Image = {
	idx: number
	id: string
	type: 'image'
	isLock: boolean
	url: string
	file: any
	style: {
		borderWidth: number
		borderType: BorderType
		borderColor: string
		shadowX: number
		shadowY: number
		shadowBlur: number
		shadowColor: string
	} & IStyle
}

const { screen } = useStore()
const props = defineProps<Image>()

const emits = defineEmits(['itemClick'])
const clickEvent = useElementClick(props.idx, props.id, emits)
</script>

<style lang="less">
.img-element {
	-webkit-user-drag: none;
}
</style>
