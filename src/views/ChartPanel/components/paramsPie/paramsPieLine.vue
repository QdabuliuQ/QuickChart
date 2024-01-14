<template>
	<div class="paramsPieLine">
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
	length: {
		type: 'input_number',
		title: '线段1长度',
		max: 500,
		value: chart.getOption.series[0].labelLine.length
	},
	length2: {
		type: 'input_number',
		title: '线段2长度',
		max: 500,
		value: chart.getOption.series[0].labelLine.length2
	},
	smooth: {
		type: 'switch',
		title: '平滑',
		value: chart.getOption.series[0].labelLine.smooth
	},
	width: {
		type: 'input_number',
		title: '线段' + common.width,
		max: 50,
		prefixs: ['lineStyle'],
		value: chart.getOption.series[0].labelLine.lineStyle.width
	},
	type: {
		type: 'select',
		title: '线段' + common.type,
		options: borderType,
		prefixs: ['lineStyle'],
		value: chart.getOption.series[0].labelLine.lineStyle.type
	}
})

const getData = () => {
	let series = chart.getOption.series
	const option = getConfigValue(config)
	for (let item of series) {
		item.labelLine = option
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
