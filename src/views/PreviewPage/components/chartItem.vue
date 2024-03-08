<template>
	<div
		:style="{
			width: '700px',
			height: '500px',
			transform: `scale(${props.width / 700}, ${props.height / 500})`,
			zIndex: props.style.zIndex,
			display: props.style.display,
			left: `${props.style.translateX}px`,
			top: `${props.style.translateY}px`
		}"
		class="preview-page-chart-item">
		<div
			:style="{
				height: '100%',
				transform: `rotate(${props.style.rotate}deg)`,
				transformOrigin: '50% 50%'
			}">
			<div ref="chartItemRef" class="chart-item-main"></div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'

import useProxy from '@/hooks/useProxy'

import { oss } from '@/network'
import { IStyle } from '@/types/screen'

interface Chart {
	id: string
	type: 'chart'
	isLock: boolean
	cover: string
	option: string
	style: IStyle
	c_width: number
	c_height: number
	width: number
	height: number
}

const props = defineProps<Chart>()
const proxy = useProxy()

const chartItemRef = ref(null)

onMounted(() => {
	const chart = proxy.$echarts.init(chartItemRef.value)
	const option = props.option.replace(/\$#url#\$/g, oss)
	chart.setOption(JSON.parse(option))
})
</script>
<style lang="less">
.preview-page-chart-item {
	position: absolute;
	transform-origin: 0 0;

	.chart-item-main {
		width: 100%;
		height: 100%;
	}
}
</style>
