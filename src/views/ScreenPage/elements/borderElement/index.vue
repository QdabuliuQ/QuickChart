<template>
	<div
		@click="clickEvent"
		:class="[
			'border-element',
			'drag-item',
			'item-' + props.id,
			screen.getActiveElementIdx === props.idx ? 'active-item' : ''
		]"
		:style="{
			display: props.style.display,
			width: props.style.width + 'px',
			height: props.style.height + 'px',
			transform: `translate(${props.style.translateX}px, ${props.style.translateY}px) rotate(${props.style.rotate}deg)`,
			zIndex: props.style.zIndex,
			filter: `drop-shadow(${props.style.shadowColor} ${props.style.shadowX}px ${props.style.shadowY}px ${props.style.shadowBlur}px)`
		}">
		<border1
			v-if="props.code === 1"
			:w="props.style.width"
			:h="props.style.height"
			:color1="props.style.color1"
			:color2="props.style.color2" />
	</div>
</template>
<script setup lang="ts">
import border1 from './border1.vue'

import useElementClick from '@/hooks/useElementClick.ts'

import useStore from '@/store'

import { IStyle } from '@/types/screen.ts'

type Border = {
	idx: number
	id: string
	type: 'border'
	isLock: boolean
	code: number
	style: {
		color1: string
		color2: string
	} & IStyle
}
const emits = defineEmits(['itemClick'])
const props = defineProps<Border>()
const { screen } = useStore()
const clickEvent = useElementClick(props.idx, emits)
</script>

<style lang="less">
.border-element {
	.border-item {
		position: absolute;
		top: 0;
		left: 0;
	}
	.right-top {
		right: 0;
		transform: rotateY(180deg);
	}
	.left-bottom {
		bottom: 0;
		transform: rotateX(180deg);
	}
	.right-bottom {
		right: 0;
		bottom: 0;
		transform: rotateX(180deg) rotateY(180deg);
	}
}
</style>