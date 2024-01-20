<template>
	<div
		:data-color1="props.style.color1"
		:data-color2="props.style.color2"
		:data-duration="props.style.duration"
		:data-borderTitleWidth="props.style.borderTitleWidth"
		:data-borderTitleHeight="props.style.borderTitleHeight"
		:data-borderTitleColor="props.style.borderTitleColor"
		:data-borderTitleSize="props.style.borderTitleSize"
		:data-borderTitle="props.style.borderTitle"
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
			zIndex: props.style.zIndex
		}">
		<div style="width: 100%; height: 100%">
			<border1 v-if="props.code === 1" v-bind="props.style" />
			<border2 v-else-if="props.code === 2" v-bind="props.style" />
			<border3 v-else-if="props.code === 3" v-bind="props.style" />
			<border4 v-else-if="props.code === 4" v-bind="props.style" :id="props.id" />
			<border5 v-else-if="props.code === 5" v-bind="props.style" />
      <border6 v-else-if="props.code === 6" v-bind="props.style" />
		</div>
	</div>
</template>
<script setup lang="ts">
import border1 from './border1.vue'
import border2 from './border2.vue'
import border3 from './border3.vue'
import border4 from './border4.vue'
import border5 from './border5.vue'
import border6 from './border6.vue'

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
		borderTitleWidth?: number
		borderTitleHeight?: number
		borderTitleColor?: string
		borderTitleSize?: number
		borderTitle?: string
		duration?: number
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
