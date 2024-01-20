<template>
	<img
		:class="[
			'chart-element',
			'drag-item',
			'item-' + props.id,
			screen.getActiveElementIdx === props.idx ? 'active-item' : ''
		]"
		@click="itemClick($event)"
		:style="{
			display: props.style.display,
			width: props.style.width + 'px',
			height: props.style.height + 'px',
			transform: `translate(${props.style.translateX}px, ${props.style.translateY}px) rotate(${props.style.rotate}deg)`,
			zIndex: props.style.zIndex
		}"
		:src="props.cover" />
</template>

<script setup lang="ts">
import useStore from '@/store'

import { IStyle } from '@/types/screen.ts'

const { screen } = useStore()

type Chart = {
	idx: number
	id: string
	type: 'chart'
	isLock: boolean
	cover: string
	option: string
	style: IStyle
}
const emits = defineEmits(['itemClick'])
const props = defineProps<Chart>()

const itemClick = (event: MouseEvent) => {
	emits('itemClick', {
		idx: props.idx,
		e: event
	})
}
</script>
