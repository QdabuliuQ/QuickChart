<template>
	<div
		@click="clickEvent($event)"
		:class="[
			'shape-element',
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
		<svg width="100%" height="100%">
			<g
				:transform="`scale(${props.style.width / props.viewBox[0]}, ${
					props.style.height / props.viewBox[1]
				}) translate(0,0) matrix(1,0,0,1,0,0)`">
				<path
					vector-effect="non-scaling-stroke"
					stroke-linecap="butt"
					stroke-miterlimit="8"
					:fill="props.style.fill"
					:stroke="props.style.stroke"
					:stroke-width="props.style.strokeWidth"
					:d="props.path"></path>
			</g>
		</svg>
	</div>
</template>
<script setup lang="ts">
import useElementClick from '@/hooks/useElementClick.ts'

import useStore from '@/store'

import { IStyle } from '@/types/screen.ts'

type Shape = {
	idx: number
	id: string
	type: 'shape'
	isLock: boolean
	path: string
	viewBox: [number, number]
	style: {
		fill: string
		stroke: string
		strokeWidth: number
		shadowColor: string
		shadowX: number
		shadowY: number
		shadowBlur: number
	} & IStyle
}

const { screen } = useStore()
const props = defineProps<Shape>()
const emits = defineEmits(['itemClick'])
const clickEvent = useElementClick(props.idx, emits)
</script>
