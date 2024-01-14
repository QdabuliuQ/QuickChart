<template>
	<div class="paramsVisualMap">
		<series-item v-if="visualMap.color" :title="'颜色分布'">
			<color-panel @colorChange="colorChange" :colors="colors" />
		</series-item>
		<series-item v-if="visualMap.pieces" :title="'数据图例'">
			<pieces-option
				@pieces-change="piecesChange"
				@pieces-delete="piecesDelete"
				@pieces-add="piecesAdd"
				:pieces="pieces" />
		</series-item>
		<option-items :config="config" />
	</div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { ConfigInt } from '@/types/common'
import { common } from '@/config/chart/opname'
import useStore from '@/store'
import { fontFamily, fontStyle, fontWeight, orient } from '@/config/chart/constant'
import useProxy from '@/hooks/useProxy'
import useWatchData from '@/hooks/useWatchData'
import { getConfigValue } from '@/utils'
import PiecesOption from '.piecesOption.vue'
import OptionItems from '@/components/optionItems.vue'
import SeriesItem from '@/components/seriesItem.vue'
import ColorPanel from '@/components/colorsPanel.vue'

const proxy = useProxy()
const { chart }: any = useStore()
const visualMap = chart.getOption.visualMap
let colors = null
if (visualMap.color) {
	colors = reactive(visualMap.color)
}
let pieces: any = null
if (visualMap.pieces) {
	pieces = reactive(visualMap.pieces)
}

const config = reactive<ConfigInt>({
	show: {
		type: 'switch',
		title: common.show,
		value: visualMap.show
	},
	min: {
		type: 'input_number',
		title: '最小值',
		value: visualMap.min,
		max: 1000000000,
		min: -1000000000
	},
	max: {
		type: 'input_number',
		title: '最大值',
		value: visualMap.max,
		max: 1000000000,
		min: -1000000000
	},
	text1: {
		type: 'input_text',
		title: '文本1',
		value: visualMap.text[0]
	},
	text2: {
		type: 'input_text',
		title: '文本2',
		value: visualMap.text[1]
	},
	inverse: {
		type: 'switch',
		title: '翻转',
		value: visualMap.inverse
	},
	itemWidth: {
		type: 'input_number',
		title: common.width,
		value: visualMap.itemWidth
	},
	itemHeight: {
		type: 'input_number',
		title: common.height,
		value: visualMap.itemHeight
	},
	textGap: {
		type: 'input_number',
		title: '文本间距',
		value: visualMap.textGap
	},
	left: {
		type: 'input_number',
		title: common.left,
		value: parseInt(visualMap.left),
		max: 100,
		unit: '%'
	},
	top: {
		type: 'input_number',
		title: common.top,
		value: parseInt(visualMap.top),
		max: 100,
		unit: '%'
	},
	orient: {
		type: 'select',
		title: common.orient,
		value: visualMap.orient,
		options: orient
	},
	color: {
		type: 'color_picker',
		title: common.color,
		value: visualMap.textStyle.color,
		prefixs: ['textStyle']
	},
	fontStyle: {
		type: 'select',
		title: common.fontStyle,
		value: visualMap.textStyle.fontStyle,
		options: fontStyle,
		prefixs: ['textStyle']
	},
	fontWeight: {
		type: 'select',
		title: common.fontWeight,
		value: visualMap.textStyle.fontWeight,
		options: fontWeight,
		prefixs: ['textStyle']
	},
	fontFamily: {
		type: 'select',
		title: common.fontFamily,
		value: visualMap.textStyle.fontFamily,
		options: fontFamily,
		prefixs: ['textStyle']
	},
	fontSize: {
		type: 'input_number',
		title: common.fontSize,
		value: visualMap.textStyle.fontSize,
		prefixs: ['textStyle']
	}
})

const piecesAdd = () => {
	pieces.push({
		lte: 0,
		gte: 0,
		label: '',
		color: '#ccc'
	})
}
const piecesDelete = (idx: number) => {
	pieces.splice(idx, 1)
}

const colorChange = (colors: string[]) => {
	let visualMap = chart.getOption.visualMap
	visualMap.color = colors
	proxy.$Bus.emit('optionChange', {
		visualMap
	})
}

const piecesChange = (pieces: any[]) => {
	let visualMap = chart.getOption.visualMap
	visualMap.pieces = pieces
	proxy.$Bus.emit('optionChange', {
		visualMap
	})
}

const getData = () => {
	let visualMap = chart.getOption.visualMap
	let option = getConfigValue(config)
	option['text'] = [option['text1'], option['text2']]
	delete option['text1']
	delete option['text2']
	Object.assign(visualMap, option)
	return visualMap
}
useWatchData(config, 'visualMap', getData)
</script>
<style lang="less">
.paramsVisualMap {
	.colors-panel {
		margin: 0 !important;
	}
}
</style>
