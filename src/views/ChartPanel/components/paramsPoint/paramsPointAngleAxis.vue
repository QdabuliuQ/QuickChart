<template>
	<div class="params-point-angle-axis">
		<option-items :config="config" />
	</div>
</template>

<script setup lang="ts">
import { watch, reactive } from 'vue'
import useProxy from '@/hooks/useProxy'
import { ConfigInt } from '@/types/common'
import { common } from '@/config/chart/opname'
import useStore from '@/store'
import optionItems from '@/components/optionItems.vue'
import { debounce, getConfigValue } from '@/utils'
import { borderType } from '@/config/chart/constant'
const proxy = useProxy()
const { chart }: any = useStore()

const config = reactive<ConfigInt>({
	show: {
		type: 'switch',
		title: common.show,
		value: chart.getOption.angleAxis.splitLine.show
	},
	color: {
		type: 'color_picker',
		title: common.color,
		prefixs: ['lineStyle'],
		value: chart.getOption.angleAxis.splitLine.lineStyle.color
	},
	width: {
		type: 'input_number',
		title: common.width,
		max: 50,
		prefixs: ['lineStyle'],
		value: chart.getOption.angleAxis.splitLine.lineStyle.width
	},
	type: {
		type: 'select',
		title: '线段' + common.type,
		prefixs: ['lineStyle'],
		options: borderType,
		value: chart.getOption.angleAxis.splitLine.lineStyle.type
	},
	shadowBlur: {
		type: 'input_number',
		title: common.shadowBlur,
		max: 50,
		prefixs: ['lineStyle'],
		value: chart.getOption.angleAxis.splitLine.lineStyle.shadowBlur
	},
	shadowColor: {
		type: 'color_picker',
		title: common.shadowColor,
		prefixs: ['lineStyle'],
		value: chart.getOption.angleAxis.splitLine.lineStyle.shadowColor
	},
	shadowOffsetX: {
		type: 'input_number',
		title: common.shadowOffsetX,
		prefixs: ['lineStyle'],
		max: 500,
		min: -500,
		value: chart.getOption.angleAxis.splitLine.lineStyle.shadowOffsetX
	},
	shadowOffsetY: {
		type: 'input_number',
		title: common.shadowOffsetY,
		prefixs: ['lineStyle'],
		max: 500,
		min: -500,
		value: chart.getOption.angleAxis.splitLine.lineStyle.shadowOffsetY
	},
	opacity: {
		type: 'input_number',
		title: common.opacity,
		prefixs: ['lineStyle'],
		max: 1,
		step: 0.1,
		value: chart.getOption.angleAxis.splitLine.lineStyle.opacity
	}
})

const getData = () => {
	let angleAxis = chart.getOption.angleAxis
	angleAxis.splitLine = getConfigValue(config)
	return angleAxis
}

watch(
	() => config,
	debounce(() => {
		proxy.$Bus.emit('optionChange', {
			angleAxis: getData()
		})
	}, 500),
	{
		deep: true
	}
)
</script>
