<template>
	<div class="paramsGaugeDetail">
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
import { getConfigValue } from '@/utils'
import { fontFamily, fontStyle, fontWeight } from '@/config/chart/constant'

const proxy = useProxy()
const { chart }: any = useStore()
const seriesDetail = chart.getOption.series.detail

const config = reactive<ConfigInt>({
	show: {
		type: 'switch',
		value: seriesDetail.show
	},
	color: {
		type: 'color_picker',
		value: seriesDetail.color
	},
	fontStyle: {
		type: 'select',
		options: fontStyle,
		value: seriesDetail.fontStyle
	},
	fontWeight: {
		type: 'select',
		options: fontWeight,
		value: seriesDetail.fontWeight
	},
	fontFamily: {
		type: 'select',
		options: fontFamily,
		value: seriesDetail.fontFamily
	},
	fontSize: {
		type: 'input_number',
		value: seriesDetail.fontSize
	},
	offsetX: {
		type: 'input_number',
		max: 500,
		min: -500,
		unit: '%',
		value: parseInt(seriesDetail.offsetCenter[0])
	},
	offsetY: {
		type: 'input_number',
		max: 500,
		min: -500,
		unit: '%',
		value: parseInt(seriesDetail.offsetCenter[1])
	}
})

const getData = () => {
	const series = chart.getOption.series
	const option = getConfigValue(config)
	option.offsetCenter = [option.offsetX, option.offsetY]
	delete option.offsetX
	delete option.offsetY
	series.detail = option
	return series
}

useWatchData(config, 'series', getData)
</script>
