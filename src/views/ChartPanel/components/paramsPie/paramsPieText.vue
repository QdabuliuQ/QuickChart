<template>
	<div class="params-pie-text">
		<option-items :config="config" />
	</div>
</template>

<script setup lang="ts">
import { watch, reactive } from 'vue'
import useProxy from '@/hooks/useProxy'
import { ConfigInt } from '@/types/common'
import { common, label } from '@/config/chart/opname'
import useStore from '@/store'
import optionItems from '@/components/optionItems.vue'
import { debounce, getConfigValue } from '@/utils'
import { fontFamily, fontStyle, fontWeight, position } from '@/config/chart/constant'
const proxy = useProxy()
const { chart }: any = useStore()

const config = reactive<ConfigInt>({
	show: {
		type: 'switch',
		title: common.show,
		value: chart.getOption.series[0].label.show
	},
	color: {
		type: 'color_picker',
		title: label.color,
		value: chart.getOption.series[0].label.color
	},
	fontStyle: {
		type: 'select',
		title: label.fontStyle,
		options: fontStyle,
		value: chart.getOption.series[0].label.fontStyle
	},
	fontWeight: {
		type: 'select',
		title: label.fontWeight,
		options: fontWeight,
		value: chart.getOption.series[0].label.fontWeight
	},
	fontFamily: {
		type: 'select',
		title: label.fontFamily,
		options: fontFamily,
		value: chart.getOption.series[0].label.fontFamily
	},
	fontSize: {
		type: 'input_number',
		title: label.fontSize,
		max: 100,
		value: chart.getOption.series[0].label.fontSize
	},
	position: {
		type: 'select',
		title: label.position,
		options: [
			{
				label: '外侧',
				value: 'outside'
			},
			{
				label: '内侧',
				value: 'inside'
			},
			{
				label: '中间',
				value: 'center'
			}
		],
		value: chart.getOption.series[0].label.position
	}
})

const getData = () => {
	let series = chart.getOption.series
	const option = getConfigValue(config)
	for (let item of series) {
		item.label = option
	}
	return series
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
</script>
