<template>
	<div class="params-gauge-axis-line">
		<series-item :title="'颜色'">
			<colorPanel @colorChange="colorChange" :colors="colors" />
		</series-item>
		<option-items :config="config" />
	</div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import colorPanel from '@/components/colorsPanel.vue'
import seriesItem from '@/components/seriesItem.vue'
import optionItems from '@/components/optionItems.vue'
import useProxy from '@/hooks/useProxy'
import useWatchData from '@/hooks/useWatchData'
import useStore from '@/store'
import { ConfigInt } from '@/types/common'
import { common } from '@/config/chart/opname'
import { getConfigValue } from '@/utils'

const proxy = useProxy()
const { chart }: any = useStore()
const seriesAxisLine = chart.getOption.series.axisLine
const colors = reactive([...seriesAxisLine.lineStyle.color.map((item: any) => item[1])])
const config = reactive<ConfigInt>({
	show: {
		type: 'switch',
		value: seriesAxisLine.show
	},
	roundCap: {
		type: 'switch',
		value: seriesAxisLine.roundCap
	},
	width: {
		type: 'input_number',
		max: 100,
		prefixs: ['lineStyle'],
		value: seriesAxisLine.lineStyle.width
	},
	shadowBlur: {
		type: 'input_number',
		max: 100,
		prefixs: ['lineStyle'],
		value: seriesAxisLine.lineStyle.shadowBlur
	},
	shadowColor: {
		type: 'color_picker',
		prefixs: ['lineStyle'],
		value: seriesAxisLine.lineStyle.shadowColor
	},
	shadowOffsetX: {
		type: 'input_number',
		max: 500,
		min: -500,
		prefixs: ['lineStyle'],
		value: seriesAxisLine.lineStyle.shadowOffsetX
	},
	shadowOffsetY: {
		type: 'input_number',
		max: 500,
		min: -500,
		prefixs: ['lineStyle'],
		value: seriesAxisLine.lineStyle.shadowOffsetY
	},
	opacity: {
		type: 'input_number',
		max: 1,
		prefixs: ['lineStyle'],
		value: seriesAxisLine.lineStyle.opacity
	}
})

const colorConfig = (colors: string[]): [][] => {
	let colorItem: any = []
	if (colors.length) {
		let cnt = colors.length
		let p = 1 / cnt
		for (let i = 1; i <= cnt; i++) {
			colorItem.push([i * p, colors[i - 1]])
		}
	}
	return colorItem
}

const colorChange = (_colors: string[]) => {
	const series = chart.getOption.series
	if (_colors.length) {
		// let cnt = colors.length
		// let p = 1 / cnt
		// let colorItem = []
		// for(let i = 1; i <= cnt; i ++) {
		//   colorItem.push([i*p, colors[i-1]])
		// }
		series.axisLine.lineStyle.color = colorConfig(_colors)
	} else {
		series.axisLine.lineStyle.color = null
	}
	proxy.$Bus.emit('optionChange', {
		series
	})
}
const getData = () => {
	const series = chart.getOption.series
	series.axisLine = getConfigValue(config)
	series.axisLine.lineStyle.color = colorConfig(colors)
	console.log(series.axisLine)
	return series
}
useWatchData(config, 'series', getData)
</script>

<style lang="less">
.params-gauge-axis-line {
	.series-item {
		.colors-panel {
			margin: 0;
		}
	}
}
</style>
