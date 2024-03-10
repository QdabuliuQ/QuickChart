<template>
	<div class="paramsGaugePointer">
		<option-items :config="config" />
	</div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'

import optionItems from '@/components/optionItems.vue'

import { borderType } from '@/config/chart/constant'

import useWatchData from '@/hooks/useWatchData'

import useStore from '@/store'

import { getConfigValue } from '@/utils'

import { oss } from '@/network'
import { ConfigInt } from '@/types/common'

const { chart }: any = useStore()
const seriesPointer = chart.getOption.series.pointer
const config = reactive<ConfigInt>({
	show: {
		type: 'switch',
		value: seriesPointer.show
	},
	icon: {
		type: 'imgload',
		title: '指针图标',
		imgType: 'url',
		imgSize: 10,
		url: `${oss}/upload/chartImage`,
		value: seriesPointer.icon ? seriesPointer.icon.replace('image://', '') : ''
	},
	offsetX: {
		type: 'input_number',
		max: 500,
		min: -500,
		unit: '%',
		value: parseInt(seriesPointer.offsetCenter[0])
	},
	offsetY: {
		type: 'input_number',
		max: 500,
		min: -500,
		unit: '%',
		value: parseInt(seriesPointer.offsetCenter[1])
	},
	length: {
		type: 'input_number',
		max: 500,
		unit: '%',
		suf: '(%)',
		value: parseInt(seriesPointer.length)
	},
	width: {
		type: 'input_number',
		max: 500,
		value: seriesPointer.width
	},
	color: {
		type: 'color_picker',
		prefixs: ['itemStyle'],
		value: seriesPointer.itemStyle.color
	},
	borderColor: {
		type: 'color_picker',
		prefixs: ['itemStyle'],
		value: seriesPointer.itemStyle.borderColor
	},
	borderWidth: {
		type: 'input_number',
		prefixs: ['itemStyle'],
		max: 100,
		value: seriesPointer.itemStyle.borderWidth
	},
	borderType: {
		type: 'select',
		prefixs: ['itemStyle'],
		options: borderType,
		value: seriesPointer.itemStyle.borderType
	},
	shadowBlur: {
		type: 'input_number',
		prefixs: ['itemStyle'],
		max: 100,
		value: seriesPointer.itemStyle.shadowBlur
	},
	shadowColor: {
		type: 'color_picker',
		prefixs: ['itemStyle'],
		value: seriesPointer.itemStyle.shadowColor
	},
	shadowOffsetX: {
		type: 'input_number',
		prefixs: ['itemStyle'],
		max: 500,
		min: -500,
		value: seriesPointer.itemStyle.shadowOffsetX
	},
	shadowOffsetY: {
		type: 'input_number',
		prefixs: ['itemStyle'],
		max: 500,
		min: -500,
		value: seriesPointer.itemStyle.shadowOffsetY
	},
	opacity: {
		type: 'input_number',
		prefixs: ['itemStyle'],
		max: 1,
		value: seriesPointer.itemStyle.opacity
	}
})

const getData = () => {
	const series = chart.getOption.series
	const option = getConfigValue(config)
	option.offsetCenter = [option.offsetY, option.offsetX]
	console.log(option)
	// if(option.icon) option.icon = "image://" + option.icon
	if (option.icon) {
		option.icon = 'image://' + option.icon
	}
	delete option.offsetX
	delete option.offsetY
	series.pointer = option
	return series
}

useWatchData(config, 'series', getData)
</script>
