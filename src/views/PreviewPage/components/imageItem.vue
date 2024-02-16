<template>
	<div
		class="preview-page-image-item"
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
		<img
			:src="props.url"
			:style="{
				width: '100%',
				height: '100%',
				border: `${props.style.borderWidth}px ${props.style.borderType} ${props.style.borderColor}`,
				boxShadow: `${props.style.shadowX}px ${props.style.shadowY}px ${props.style.shadowBlur}px ${props.style.shadowColor}`
			}" />
	</div>
</template>
<script setup lang="ts">
import { getOffset } from '@/utils/screenUtil'

import { BorderType } from '@/types/element'
import { IStyle } from '@/types/screen'

interface Image {
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
	c_width: number
	c_height: number
	width: number
	height: number
}

const props = defineProps<Image>()
</script>
<style lang="less">
.preview-page-image-item {
	position: absolute;
}
</style>
