<template>
	<div class="params-point-line">
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
		value: chart.getOption.series[0].labelLine.show
	},
	length2: {
		type: 'input_number',
		title: '线段2长度',
		max: 500,
		value: chart.getOption.series[0].labelLine.length2
	},
	color: {
		type: 'color_picker',
		title: common.color,
		prefixs: ['lineStyle'],
		value: chart.getOption.series[0].labelLine.lineStyle.color
	},
	type: {
		type: 'select',
		title: '线段' + common.type,
		options: borderType,
		prefixs: ['lineStyle'],
		value: chart.getOption.series[0].labelLine.lineStyle.type
	},
	width: {
		type: 'input_number',
		title: '线段' + common.width,
		max: 50,
		prefixs: ['lineStyle'],
		value: chart.getOption.series[0].labelLine.lineStyle.width
	}
})
if (chart.getOption.series[0].labelLine.length) {
	config['length'] = {
		type: 'input_number',
		title: '线段1长度',
		max: 500,
		value: chart.getOption.series[0].labelLine.length
	}
}

const getData = () => {
	let series = chart.getOption.series
	const option = getConfigValue(config)
	for (let item of series) {
		Object.assign(item.labelLine, option)
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
