<template>
	<div class="params-sankey-style">
		<option-items :config="config" />
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import optionItems from '@/components/optionItems.vue'
import useProxy from '@/hooks/useProxy'
import useWatchData from '@/hooks/useWatchData'
import useStore from '@/store'
import { ConfigInt } from '@/types/common'
import { common } from '@/config/chart/opname'
import { getConfigValue } from '@/utils'

const proxy = useProxy()
const { chart }: any = useStore()

const config = reactive<ConfigInt>({
	left: {
		type: 'input_number',
		title: common.left + '(%)',
		max: 100,
		unit: '%',
		value: parseInt(chart.getOption.series.left)
	},
	top: {
		type: 'input_number',
		title: common.top + '(%)',
		max: 100,
		unit: '%',
		value: parseInt(chart.getOption.series.top)
	},
	right: {
		type: 'input_number',
		title: common.right + '(%)',
		max: 100,
		unit: '%',
		value: parseInt(chart.getOption.series.right)
	},
	bottom: {
		type: 'input_number',
		title: common.bottom + '(%)',
		max: 100,
		unit: '%',
		value: parseInt(chart.getOption.series.bottom)
	},
	nodeWidth: {
		type: 'input_number',
		title: '组件' + common.width,
		max: 500,
		value: chart.getOption.series.nodeWidth
	},
	nodeGap: {
		type: 'input_number',
		title: '组件间距',
		max: 500,
		value: chart.getOption.series.nodeGap
	},
	nodeAlign: {
		type: 'select',
		title: '对齐方式',
		options: [
			{
				label: '双端对齐',
				value: 'justify'
			},
			{
				label: '左对齐',
				value: 'left'
			},
			{
				label: '右对齐',
				value: 'right'
			}
		],
		value: chart.getOption.series.nodeAlign
	},
	orient: {
		type: 'select',
		title: '布局' + common.orient,
		options: [
			{
				label: '水平',
				value: 'horizontal'
			},
			{
				label: '垂直',
				value: 'vertical'
			}
		],
		value: chart.getOption.series.orient
	}
})

const getData = () => {
	const series = chart.getOption.series
	const option = getConfigValue(config)
	for (let key in option) {
		series[key] = option[key]
	}
	return series
}
useWatchData(config, 'series', getData)
</script>
