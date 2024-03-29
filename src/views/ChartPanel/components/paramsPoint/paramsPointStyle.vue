<template>
	<div class="params-point-style">
		<option-items :config="config" />
		<option-items :config="itemStyleConfig" />
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
import { borderType, symbol } from '@/config/chart/constant'
const proxy = useProxy()
const { chart }: any = useStore()

const config = reactive<ConfigInt>({
	symbol: {
		type: 'select',
		title: common.symbol,
		options: symbol,
		value: chart.getOption.series[0].symbol
	},
	color: {
		type: 'color_picker',
		title: common.color,
		value: chart.getOption.series[0].color
	}
})
if (typeof chart.getOption.series[0].symbolSize == 'number') {
	config.symbolSize = {
		type: 'input_number',
		title: common.symbolSize,
		max: 100,
		value: chart.getOption.series[0].symbolSize
	}
}
const itemStyleConfig = reactive<ConfigInt>({
	borderColor: {
		type: 'color_picker',
		title: common.borderColor,
		value: chart.getOption.series[0].itemStyle.borderColor
	},
	borderWidth: {
		type: 'input_number',
		title: common.borderWidth,
		max: 50,
		value: chart.getOption.series[0].itemStyle.borderWidth
	},
	borderType: {
		type: 'select',
		title: common.borderType,
		options: borderType,
		value: chart.getOption.series[0].itemStyle.borderType
	},
	shadowBlur: {
		type: 'input_number',
		title: common.shadowBlur,
		max: 50,
		value: chart.getOption.series[0].itemStyle.shadowBlur
	},
	shadowColor: {
		type: 'color_picker',
		title: common.shadowColor,
		max: 50,
		value: chart.getOption.series[0].itemStyle.shadowColor
	},
	shadowOffsetX: {
		type: 'input_number',
		title: common.shadowOffsetX,
		max: 500,
		min: -500,
		value: chart.getOption.series[0].itemStyle.shadowOffsetX
	},
	shadowOffsetY: {
		type: 'input_number',
		title: common.shadowOffsetY,
		max: 500,
		min: -500,
		value: chart.getOption.series[0].itemStyle.shadowOffsetY
	}
})

const getData = (type: string) => {
	let series = chart.getOption.series
	if (type == 'config') {
		const options = getConfigValue(config)
		for (let item of series) {
			item.symbol = options.symbol
			item.color = options.color
			if (options.symbolSize) {
				item.symbolSize = options.symbolSize
			}
		}
	} else {
		const options = getConfigValue(itemStyleConfig)
		for (let item of series) {
			item.itemStyle = options
		}
	}
	return series
}

watch(
	() => config,
	debounce(() => {
		proxy.$Bus.emit('optionChange', {
			series: getData('config')
		})
	}, 500),
	{
		deep: true
	}
)

watch(
	() => itemStyleConfig,
	debounce(() => {
		proxy.$Bus.emit('optionChange', {
			series: getData('itemStyleConfig')
		})
	}, 500),
	{
		deep: true
	}
)
</script>
