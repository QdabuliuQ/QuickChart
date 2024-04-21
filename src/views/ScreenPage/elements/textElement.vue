<template>
	<div
		:class="[
			'text-element',
			'drag-item',
			'item-' + props.id,
			screen.getActiveElementIdx === idx ? 'active-item' : ''
		]"
		@click="itemClick($event)"
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
		}">
		<span
			class="textInfo"
			:style="{
				backgroundColor: props.style.backgroundColor
			}">
			{{ props.content }}
		</span>
	</div>
</template>
<script setup lang="ts">
import useStore from '@/store'

import { IStyle } from '@/types/screen.ts'

type Text = {
	idx: number
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
}
const props = defineProps<Text>()
const emits = defineEmits(['itemClick'])
const { screen } = useStore()

const itemClick = (e: MouseEvent) => {
	emits('itemClick', {
		idx: props.idx,
		id: props.id,
		e
	})
}
</script>
<style lang="less">
.text-element {
	.textInfo {
		word-break: break-all;
	}
}
</style>
