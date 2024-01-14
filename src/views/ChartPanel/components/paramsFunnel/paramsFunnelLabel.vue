<template>
	<div class="paramsFunnelLabel">
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
import { common, label } from '@/config/chart/opname'
import { getConfigValue } from '@/utils'
import { fontFamily, fontStyle, fontWeight, orient, position } from '@/config/chart/constant'

const proxy = useProxy()
const { chart }: any = useStore()
const seriesLabel = chart.getOption.series.label
const config = reactive<ConfigInt>({
	show: {
		type: 'switch',
		title: common.show,
		value: seriesLabel.show
	},
	position: {
		type: 'select',
		title: label.position,
		options: position,
		value: seriesLabel.position
	},
	color: {
		type: 'color_picker',
		title: label.color,
		value: seriesLabel.color
	},
	fontStyle: {
		type: 'select',
		title: label.fontStyle,
		options: fontStyle,
		value: seriesLabel.fontStyle
	},
	fontWeight: {
		type: 'select',
		title: label.fontWeight,
		options: fontWeight,
		value: seriesLabel.fontWeight
	},
	fontFamily: {
		type: 'select',
		title: label.fontFamily,
		options: fontFamily,
		value: seriesLabel.fontFamily
	},
	fontSize: {
		type: 'input_number',
		title: label.fontSize,
		value: seriesLabel.fontSize
	}
})

const getData = () => {
	const series = chart.getOption.series
	series.label = getConfigValue(config)
	return series
}
useWatchData(config, 'series', getData)
</script>
