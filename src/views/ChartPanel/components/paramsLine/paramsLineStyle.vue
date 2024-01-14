<template>
	<div class="paramsLineStyle">
		<optionItems :config="config" />
		<optionItems :config="lineConfig" />
	</div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import optionItems from '@/components/optionItems.vue'
import useStore from '@/store'
import { ConfigInt } from '@/types/common'
import useProxy from '@/hooks/useProxy'
import { symbol, borderType } from '@/config/chart/constant'
import { debounce, getConfigValue } from '@/utils'

const proxy = useProxy()
const { chart }: any = useStore()
const config = reactive<ConfigInt>({
	showSymbol: {
		type: 'switch',
		title: '显示图形',
		value: chart.getOption.series[0].showSymbol
	},
	symbol: {
		type: 'select',
		title: '标记图形',
		options: symbol,
		value: chart.getOption.series[0].symbol
	},
	symbolSize: {
		type: 'input_number',
		title: '图形大小',
		max: 50,
		value: chart.getOption.series[0].symbolSize
	},
	symbolRotate: {
		type: 'input_number',
		title: '图形旋转',
		max: 360,
		min: -360,
		value: chart.getOption.series[0].symbolRotate
	}
})
const lineConfig = reactive<ConfigInt>({
	width: {
		type: 'input_number',
		max: 30,
		title: '线段宽度',
		value: chart.getOption.series[0].lineStyle.width
	},
	type: {
		type: 'select',
		title: '线段类型',
		options: borderType,
		value: chart.getOption.series[0].lineStyle.type
	},
	shadowBlur: {
		type: 'input_number',
		title: '阴影模糊',
		max: 100,
		value: chart.getOption.series[0].lineStyle.shadowBlur
	},
	shadowColor: {
		type: 'color_picker',
		title: '阴影颜色',
		max: 100,
		value: chart.getOption.series[0].lineStyle.shadowColor
	},
	shadowOffsetX: {
		type: 'input_number',
		title: '阴影偏移X',
		max: 500,
		min: -500,
		value: chart.getOption.series[0].lineStyle.shadowOffsetX
	},
	shadowOffsetY: {
		type: 'input_number',
		title: '阴影偏移Y',
		max: 500,
		min: -500,
		value: chart.getOption.series[0].lineStyle.shadowOffsetY
	},
	opacity: {
		type: 'input_number',
		title: '透明度',
		max: 1,
		step: 0.1,
		value: chart.getOption.series[0].lineStyle.opacity
	}
})

const getData = () => {
	let s = chart.getOption.series
	for (let i = 0; i < s.length; i++) {
		for (let k in s[i]) {
			if (typeof s[i][k] == 'object' || !config[k]) continue
			s[i][k] = config[k].value
		}
	}
	return s
}

const getLineData = () => {
	let s = chart.getOption.series
	let option = getConfigValue(lineConfig)
	for (let i = 0; i < s.length; i++) {
		s[i].lineStyle = option
	}
	return s
}

watch(
	() => config,
	debounce(() => {
		proxy.$Bus.emit('optionChange', {
			series: getData()
		})
	}, 500),
	{
		deep: true
	}
)

watch(
	() => lineConfig,
	debounce(() => {
		proxy.$Bus.emit('optionChange', {
			series: getLineData()
		})
	}, 500),
	{
		deep: true
	}
)
</script>
