<template>
	<div class="params-title">
		<optionItems :config="config" />
		<optionItems :config="textStyleConfig" />
	</div>
</template>

<script setup lang="ts">
import { watch, reactive } from 'vue'
import useProxy from '@/hooks/useProxy'
import { ConfigInt } from '@/types/common'
import { common, label } from '@/config/chart/opname'
import useStore from '@/store'
import { fontWeight, textAlign } from '@/config/chart/constant'
import optionItems from '@/components/optionItems.vue'
import { debounce, getConfigValue } from '@/utils'
import { IOption, TSelectOption } from '@/types/option'
import useWatchData from '@/hooks/useWatchData'

const { chart }: any = useStore()

interface IConfig {
	text: IOption<'input_text'>
	show: IOption<'switch'>
	textAlign: IOption<'select'>
	left: IOption<'input_number'>
	top: IOption<'input_number'>
	backgroundColor: IOption<'color_picker'>
}
const config = reactive<IConfig>({
	text: {
		type: 'input_text',
		title: '文本标题',
		value: chart.getOption.title.text
	},
	show: {
		type: 'switch',
		title: common.show,
		value: chart.getOption.title.show
	},
	textAlign: {
		type: 'select',
		title: '对齐方式',
		options: textAlign,
		value: chart.getOption.title.textAlign
	},
	left: {
		type: 'input_number',
		title: common.left + '(%)',
		max: 100,
		value: parseInt(chart.getOption.title.left)
	},
	top: {
		type: 'input_number',
		title: common.top + '(%)',
		max: 100,
		value: parseInt(chart.getOption.title.top)
	},
	backgroundColor: {
		type: 'color_picker',
		title: common.backgroundColor,
		value: chart.getOption.title.backgroudColor
	}
})

interface ITextStyleConfig {
	color: IOption<'color_picker'>
	fontWeight: IOption<'select'>
	fontSize: IOption<'input_number'>
}
const textStyleConfig = reactive<ITextStyleConfig>({
	color: {
		type: 'color_picker',
		title: label.color,
		value: chart.getOption.title.textStyle.color
	},
	fontWeight: {
		type: 'select',
		title: label.fontWeight,
		options: fontWeight,
		value: chart.getOption.title.textStyle.fontWeight
	},
	fontSize: {
		type: 'input_number',
		title: label.fontSize,
		max: 100,
		value: chart.getOption.title.textStyle.fontSize
	}
})
const proxy = useProxy()

const getData = (type: string) => {
	let title = chart.getOption.title
	if (type == 'title') {
		const option = getConfigValue(config)
		for (let key in option) {
			if (key == 'left' || key == 'top') {
				title[key] = option[key] + '%'
			} else {
				title[key] = option[key]
			}
		}
	} else if (type == 'textStyle') {
		title.textStyle = getConfigValue(textStyleConfig)
	}
	return title
}

useWatchData(config, 'title', () => getData('title'))
useWatchData(textStyleConfig, 'title', () => getData('textStyle'))
</script>
