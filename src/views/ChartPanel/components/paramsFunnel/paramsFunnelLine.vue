<template>
	<div class="paramsFunnelLine">
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
import { borderType } from '@/config/chart/constant'

const proxy = useProxy()
const { chart }: any = useStore()
const seriesLine = chart.getOption.series.labelLine
const config = reactive<ConfigInt>({
	show: {
		type: 'switch',
		title: common.show,
		value: seriesLine.show
	},
	length: {
		type: 'input_number',
		title: '线段' + common.length,
		max: 500,
		value: seriesLine.length
	},
	width: {
		type: 'input_number',
		title: '线段' + common.width,
		max: 100,
		prefixs: ['lineStyle'],
		value: seriesLine.lineStyle.width
	},
	type: {
		type: 'select',
		title: '线段' + common.type,
		options: borderType,
		prefixs: ['lineStyle'],
		value: seriesLine.lineStyle.type
	},
	opacity: {
		type: 'input_number',
		title: '线段' + common.opacity,
		max: 1,
		prefixs: ['lineStyle'],
		value: seriesLine.lineStyle.opacity
	},
	color: {
		type: 'color_picker',
		title: '线段' + common.color,
		prefixs: ['lineStyle'],
		value: seriesLine.lineStyle.color
	}
})

const getData = () => {
	const series = chart.getOption.series
	series.labelLine = getConfigValue(config)
	return series
}
useWatchData(config, 'series', getData)
</script>
