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
			<border7 v-else-if="props.code === 7" v-bind="props.style" :id="props.id" />
			<border8 v-else-if="props.code === 8" v-bind="props.style" />
			<border9 v-else-if="props.code === 9" v-bind="props.style" />
			<border10 v-else-if="props.code === 10" v-bind="props.style" />
			<border11 v-else-if="props.code === 11" v-bind="props.style" />
			<border12 v-else-if="props.code === 12" v-bind="props.style" />
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
import border7 from './border7.vue'
import border8 from './border8.vue'
import border9 from './border9.vue'
import border10 from './border10.vue'
import border11 from './border11.vue'
import border12 from './border12.vue'

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
const clickEvent = useElementClick(props.idx, props.id, emits)
</script>
<style lang="less">
.go-border-box {
	polyline {
		fill: none;
		stroke-linecap: round;
	}
}
.go-border-line-w-2 {
	stroke-width: 2;
}
.go-border-line-w-5 {
	stroke-width: 5;
}
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
