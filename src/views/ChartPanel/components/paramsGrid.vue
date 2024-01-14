<template>
	<div class="paramsGrid">
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
import { IOption } from '@/types/option'
import useWatchData from '@/hooks/useWatchData'
const proxy = useProxy()
const { chart }: any = useStore()
interface IConfig {
	show: IOption<'switch'>
	left: IOption<'input_number'>
	top: IOption<'input_number'>
	right: IOption<'input_number'>
	bottom: IOption<'input_number'>
	backgroundColor: IOption<'color_picker'>
	borderColor: IOption<'color_picker'>
	borderWidth: IOption<'input_number'>
	shadowBlur: IOption<'input_number'>
	shadowColor: IOption<'color_picker'>
	shadowOffsetX: IOption<'input_number'>
	shadowOffsetY: IOption<'input_number'>
}
const config = reactive<IConfig>({
	show: {
		type: 'switch',
		title: common.show,
		value: chart.getOption.grid.show
	},
	left: {
		type: 'input_number',
		title: common.left + '(%)',
		max: 100,
		value: parseInt(chart.getOption.grid.left)
	},
	top: {
		type: 'input_number',
		title: common.top + '(%)',
		max: 100,
		value: parseInt(chart.getOption.grid.top)
	},
	right: {
		type: 'input_number',
		title: common.right + '(%)',
		max: 100,
		value: parseInt(chart.getOption.grid.right)
	},
	bottom: {
		type: 'input_number',
		title: common.bottom + '(%)',
		max: 100,
		value: parseInt(chart.getOption.grid.bottom)
	},
	backgroundColor: {
		type: 'color_picker',
		title: common.backgroundColor,
		value: chart.getOption.grid.backgroundColor
	},
	borderColor: {
		type: 'color_picker',
		title: common.borderColor,
		value: chart.getOption.grid.borderColor
	},
	borderWidth: {
		type: 'input_number',
		title: common.borderWidth,
		max: 100,
		value: chart.getOption.grid.borderWidth
	},
	shadowBlur: {
		type: 'input_number',
		title: common.shadowBlur,
		max: 100,
		value: chart.getOption.grid.shadowBlur
	},
	shadowColor: {
		type: 'color_picker',
		title: common.shadowColor,
		value: chart.getOption.grid.shadowColor
	},
	shadowOffsetX: {
		type: 'input_number',
		title: common.shadowOffsetX,
		max: 500,
		min: -500,
		value: chart.getOption.grid.shadowOffsetX
	},
	shadowOffsetY: {
		type: 'input_number',
		title: common.shadowOffsetY,
		max: 500,
		min: -500,
		value: chart.getOption.grid.shadowOffsetY
	}
})

const getData = () => {
	let grid = getConfigValue(config)
	grid.left = grid.left + '%'
	grid.right = grid.right + '%'
	grid.top = grid.top + '%'
	grid.bottom = grid.bottom + '%'
	return grid
}

useWatchData(config, 'grid', getData)
</script>
