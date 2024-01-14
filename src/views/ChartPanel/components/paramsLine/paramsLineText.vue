<template>
	<div class="paramsLineText">
		<optionItems :config="config" />
	</div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import optionItems from '@/components/optionItems.vue'
import useStore from '@/store'
import useProxy from '@/hooks/useProxy'
import { ConfigInt } from '@/types/common'
import { debounce, getConfigValue } from '@/utils'
import { borderType, fontFamily, fontStyle, fontWeight, position } from '@/config/chart/constant'
import { label } from '@/config/chart/opname'

const proxy = useProxy()
const { chart }: any = useStore()
const config = reactive<ConfigInt>({
	show: {
		type: 'switch',
		title: label.show,
		value: chart.getOption.series[0].label.show
	},
	position: {
		type: 'select',
		title: label.position,
		options: position,
		value: chart.getOption.series[0].label.position
	},
	rotate: {
		type: 'input_number',
		title: label.rotate,
		max: 360,
		min: -360,
		value: chart.getOption.series[0].label.rotate
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
	offsetX: {
		type: 'input_number',
		title: label.offsetX,
		max: 500,
		min: -500,
		value: chart.getOption.series[0].label.offset[0]
	},
	offsetY: {
		type: 'input_number',
		title: label.offsetY,
		max: 500,
		min: -500,
		value: chart.getOption.series[0].label.offset[1]
	},
	backgroundColor: {
		type: 'color_picker',
		title: label.backgroundColor,
		value: chart.getOption.series[0].label.backgroundColor
	},
	borderWidth: {
		type: 'input_number',
		title: label.borderWidth,
		value: chart.getOption.series[0].label.borderWidth
	},
	borderColor: {
		type: 'color_picker',
		title: label.borderColor,
		value: chart.getOption.series[0].label.borderColor
	},
	borderType: {
		type: 'select',
		title: label.borderType,
		options: borderType,
		value: chart.getOption.series[0].label.borderType
	},
	shadowColor: {
		type: 'color_picker',
		title: label.shadowColor,
		value: chart.getOption.series[0].label.shadowColor
	},
	shadowBlur: {
		type: 'input_number',
		title: label.shadowBlur,
		max: 50,
		value: chart.getOption.series[0].label.shadowBlur
	},
	shadowOffsetX: {
		type: 'input_number',
		title: label.shadowOffsetX,
		max: 500,
		min: -500,
		value: chart.getOption.series[0].label.shadowOffsetX
	},
	shadowOffsetY: {
		type: 'input_number',
		title: label.shadowOffsetY,
		max: 500,
		min: -500,
		value: chart.getOption.series[0].label.shadowOffsetY
	},
	textBorderColor: {
		type: 'color_picker',
		title: label.textBorderColor,
		value: chart.getOption.series[0].label.textBorderColor
	},
	textBorderWidth: {
		type: 'input_number',
		title: label.textBorderWidth,
		max: 50,
		value: chart.getOption.series[0].label.textBorderWidth
	},
	textBorderType: {
		type: 'select',
		title: label.textBorderType,
		options: borderType,
		value: chart.getOption.series[0].label.textBorderType
	},
	textShadowColor: {
		type: 'color_picker',
		title: label.textShadowColor,
		value: chart.getOption.series[0].label.textShadowColor
	},
	textShadowBlur: {
		type: 'input_number',
		title: label.textShadowBlur,
		max: 50,
		value: chart.getOption.series[0].label.textShadowBlur
	},
	textShadowOffsetX: {
		type: 'input_number',
		max: 500,
		min: -500,
		title: label.textShadowOffsetX,
		value: chart.getOption.series[0].label.textShadowOffsetX
	},
	textShadowOffsetY: {
		type: 'input_number',
		max: 500,
		min: -500,
		title: label.textShadowOffsetY,
		value: chart.getOption.series[0].label.textShadowOffsetY
	}
})

const getData = () => {
	let s = chart.getOption.series
	let option = getConfigValue(config)
	option['offset'] = [config.offsetX.value, config.offsetY.value]
	for (let i = 0; i < s.length; i++) {
		s[i].label = option
	}
	return s
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
