<template>
	<div
		class="preview-page-shape-item"
		:style="{
			width: getOffset(props.width, props.c_width, props.style.width) + 'px',
			height: getOffset(props.height, props.c_height, props.style.height) + 'px',
			transform: `translate(${getOffset(
				props.width,
				props.c_width,
				props.style.translateX
			)}px, ${getOffset(props.height, props.c_height, props.style.translateY)}px) rotate(${
				props.style.rotate
			}deg)`,
			zIndex: props.style.zIndex
		}">
		<div
			:style="{
				width: '100%',
				height: '100%',
				filter: `drop-shadow(${props.style.shadowColor} ${props.style.shadowX}px ${props.style.shadowY}px ${props.style.shadowBlur}px)`
			}">
			<svg width="100%" height="100%">
				<g
					:transform="`scale(${
						getOffset(props.width, props.c_width, props.style.width) / props.viewBox[0]
					}, ${
						getOffset(props.height, props.c_height, props.style.height) / props.viewBox[1]
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
	</div>
</template>
<script setup lang="ts">
import { IStyle } from '@/types/screen'
import { getOffset } from '@/utils/screenUtil'

interface Shape {
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
	c_width: number
	c_height: number
	width: number
	height: number
}
const props = defineProps<Shape>()
</script>
<style lang="less">
.preview-page-shape-item {
	position: absolute;
}
</style>
