<template>
	<div
		:class="[
			'marquee-element',
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
			fontSize: props.style.fontSize + 'px',
			fontWeight: props.style.fontWeight,
			color: props.style.color,
			textAlign: props.style.textAlign,
			fontStyle: props.style.fontStyle,
			letterSpacing: props.style.letterSpacing + 'px',
			lineHeight: props.style.lineHeight + 'px',
			textDecorationLine: props.style.textDecorationLine,
			textDecorationColor: props.style.textDecorationColor,
			textDecorationStyle: props.style.textDecorationStyle
		}"
		@click="clickEvent($event)"
		ref="marqueeRef"
		class="marquee-element">
		<span ref="marqueeTextRef" class="marquee-text">{{ props.content }}</span>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'

import useElementClick from '@/hooks/useElementClick.ts'

import useStore from '@/store'

import { debounce } from '@/utils'

import { IStyle } from '@/types/screen.ts'

type Marquee = {
	idx: number
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
}

const { screen } = useStore()
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

	// 监听text文化宽度是否发生变化 重新获取宽度
	let observer = new MutationObserver(
		debounce(() => {
			textWidth.value = (marqueeTextRef.value as HTMLDivElement).offsetWidth
		}, 100)
	)

	observer.observe(marqueeRef.value as HTMLDivElement, {
		attributes: true //检测属性变动
	})

	return () => {
		// 取消监听
		observer.disconnect()
	}
})

const emits = defineEmits(['itemClick'])
const clickEvent = useElementClick(props.idx, emits)
</script>

<style lang="less">
.marquee-element {
	position: relative;
	overflow: hidden;

	.marquee-text {
		position: absolute;
		white-space: nowrap;
	}
}
</style>