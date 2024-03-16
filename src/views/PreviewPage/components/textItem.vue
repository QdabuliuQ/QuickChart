<template>
	<div
		class="preview-page-text-item"
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
			{{ props.content }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { IStyle } from '@/types/screen'

interface Text {
	id: string
	type: 'text'
	isLock: boolean
	content: string
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

const props = defineProps<Text>()
</script>
<style lang="less">
.preview-page-text-item {
	position: absolute;
}
</style>
