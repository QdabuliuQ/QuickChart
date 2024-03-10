<template>
	<div class="params-radar-axis-name">
		<optionItems :config="config" />
	</div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'

import optionItems from '@/components/optionItems.vue'

import { borderType, fontFamily, fontStyle, fontWeight } from '@/config/chart/constant'
import { common, label } from '@/config/chart/opname'

import useProxy from '@/hooks/useProxy'

import useStore from '@/store'

import { debounce, getConfigValue } from '@/utils'

import { ConfigInt } from '@/types/common'
const proxy = useProxy()
const { chart }: any = useStore()
const config = reactive<ConfigInt>({
	show: {
		type: 'switch',
		title: common.show,
		value: chart.getOption.radar.axisName.show
	},
	color: {
		type: 'color_picker',
		title: label.color,
		value: chart.getOption.radar.axisName.color
	},
	fontStyle: {
		type: 'select',
		title: label.fontStyle,
		options: fontStyle,
		value: chart.getOption.radar.axisName.fontStyle
	},
	fontWeight: {
		type: 'select',
		title: label.fontWeight,
		options: fontWeight,
		value: chart.getOption.radar.axisName.fontWeight
	},
	fontFamily: {
		type: 'select',
		title: label.fontFamily,
		options: fontFamily,
		value: chart.getOption.radar.axisName.fontFamily
	},
	fontSize: {
		type: 'input_number',
		title: label.fontSize,
		max: 100,
		value: chart.getOption.radar.axisName.fontSize
	},
	backgroundColor: {
		type: 'color_picker',
		title: label.backgroundColor,
		value: chart.getOption.radar.axisName.backgroundColor
	},
	textBorderColor: {
		type: 'color_picker',
		title: label.textBorderColor,
		value: chart.getOption.radar.axisName.textBorderColor
	},
	textBorderWidth: {
		type: 'input_number',
		title: label.textBorderWidth,
		max: 100,
		value: chart.getOption.radar.axisName.textBorderWidth
	},
	textBorderType: {
		type: 'select',
		title: label.textBorderColor,
		options: borderType,
		value: chart.getOption.radar.axisName.textBorderType
	},
	textShadowColor: {
		type: 'color_picker',
		title: label.textShadowColor,
		value: chart.getOption.radar.axisName.textShadowColor
	},
	textShadowBlur: {
		type: 'input_number',
		title: label.textShadowBlur,
		max: 50,
		value: chart.getOption.radar.axisName.textShadowBlur
	},
	textShadowOffsetX: {
		type: 'input_number',
		title: label.textShadowOffsetX,
		max: 500,
		min: -500,
		value: chart.getOption.radar.axisName.textShadowOffsetX
	},
	textShadowOffsetY: {
		type: 'input_number',
		title: label.textShadowOffsetY,
		max: 500,
		min: -500,
		value: chart.getOption.radar.axisName.textShadowOffsetY
	}
})

const getData = () => {
	let radar = chart.getOption.radar
	radar.axisName = getConfigValue(config)
	return radar
}

watch(
	() => config,
	debounce(() => {
		proxy.$Bus.emit('optionChange', {
			radar: getData()
		})
	}, 500),
	{
		deep: true
	}
)
</script>
