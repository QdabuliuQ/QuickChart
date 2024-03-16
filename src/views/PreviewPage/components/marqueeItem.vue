<template>
	<div
		class="preview-page-marquee-item"
		ref="marqueeRef"
		:style="{
			width: props.style.width + 'px',
			height: props.style.height + 'px',
			transform: `translate(${props.style.translateX}px, ${props.style.translateY}px) rotate(${props.style.rotate}deg)`,
			zIndex: props.style.zIndex
		}">
		<div
			:style="{
				width: '100%',
				height: '100%',
				fontSize: props.style.fontSize + 'px',
				fontWeight: props.style.fontWeight,
				color: props.style.color,
				textAlign: props.style.textAlign,
				letterSpacing: props.style.letterSpacing,
				fontStyle: props.style.fontStyle,
				lineHeight: props.style.lineHeight + 'px',
				textDecorationLine: props.style.textDecorationLine,
				textDecorationColor: props.style.textDecorationColor,
				textDecorationStyle: props.style.textDecorationStyle,
				backgroundColor: props.style.backgroundColor
			}">
			<span ref="marqueeTextRef" class="marquee-text">
				{{ props.content }}
			</span>
		</div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { IStyle } from '@/types/screen.ts'

interface Marquee {
	id: string
	type: 'marquee'
	isLock: boolean
	content: string
	speed: number
	style: {
		fontSize: number
		fontWeight: string
		color: string
		textAlign: 'left' | 'right' | 'center'
		letterSpacing: number
		fontStyle: 'normal' | 'italic'
		lineHeight: number
		textDecorationLine: 'none' | 'underline' | 'overline' | 'line-through'
		textDecorationColor: string
		textDecorationStyle: 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy'
		backgroundColor: string
	} & IStyle
	c_width: number
	c_height: number
	width: number
	height: number
}
const props = defineProps<Marquee>()
const marqueeRef = ref<HTMLDivElement>()
const marqueeTextRef = ref<HTMLDivElement>()
const textWidth = ref<number>()

onMounted(() => {
	function startMarquee() {
		textWidth.value = (marqueeTextRef.value as HTMLDivElement).offsetWidth
		let position = (marqueeRef.value as HTMLDivElement).offsetWidth

		function moveText() {
			position = position - props.speed
			if (position < -(textWidth.value as number)) {
				position = (marqueeRef.value as HTMLDivElement).offsetWidth
			}
			;(marqueeTextRef.value as HTMLDivElement).style.left = position + 'px'
			requestAnimationFrame(moveText)
		}
		moveText()
	}
	startMarquee()
})
</script>
<style lang="less">
.preview-page-marquee-item {
	position: relative;
	overflow: hidden;

	.marquee-text {
		position: absolute;
		white-space: nowrap;
	}
}
</style>
