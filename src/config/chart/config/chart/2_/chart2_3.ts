import canvasOption from '@/config/chart/commonParams/canvas'
import colorOption from '@/config/chart/commonParams/color'
import graphicOption from '@/config/chart/commonParams/graphic'
import gridOption from '@/config/chart/commonParams/grid'
import legendOption from '@/config/chart/commonParams/legend'
import titleOption from '@/config/chart/commonParams/title'
import xAxisOption from '@/config/chart/commonParams/xAxis'
import yAxisOption from '@/config/chart/commonParams/yAxis'
import { chartPath } from '@/config/chart/constant'
import { conveyToExcel } from '@/config/chart/conveyUtils/conveyData'
import { bar_series_label } from '@/config/chart/option'

import useStore from '@/store'

const { chart }: any = useStore()
const series_label = bar_series_label({
	show: true,
	position: 'inside',
	formatter: null
})
export default () => {
	return [
		titleOption({
			show: false
		}),
		canvasOption(),
		gridOption({
			containLabel: true,
			left: '5%',
			bottom: '5%',
			right: '7%'
		}),
		legendOption({
			left: '33%',
			top: '2%',
			icon: 'roundRect'
		}),
		graphicOption(),
		colorOption(),
		{
			name: 'dataset',
			opName: 'dataset',
			chartOption: true,
			menuOption: false,
			uniqueOption: false,
			defaultOption: {
				dataset: {
					source: [
						['items', 'Profit', 'Income', 'Expenses'],
						['Mon', 200, 320, -120],
						['Tue', 170, 302, -132],
						['Wed', 240, 341, -101],
						['Thu', 244, 374, -134],
						['Fri', 200, 390, -190],
						['Sat', 220, 450, -230],
						['Sun', 210, 420, -210]
					]
				}
			},
			allOption: {}
		},
		{
			name: 'X轴样式',
			opName: 'xAxis',
			chartOption: true,
			menuOption: true,
			icon: 'i_X',
			componentPath: chartPath + 'paramsXAxis',
			defaultOption: {
				xAxis: [
					{
						...xAxisOption(),
						type: 'value'
					}
				]
			}
		},
		{
			name: 'Y轴样式',
			opName: 'yAxis',
			chartOption: true,
			menuOption: true,
			icon: 'i_Y',
			componentPath: chartPath + 'paramsYAxis',
			defaultOption: {
				yAxis: [
					{
						...yAxisOption(),
						type: 'category'
					}
				]
			}
		},
		{
			name: '数据',
			opName: 'series',
			chartOption: true,
			menuOption: false,
			defaultOption: {
				series: [
					{
						type: 'bar',
						label: series_label
					},
					{
						type: 'bar',
						label: series_label
					},
					{
						type: 'bar',
						label: series_label
					}
				]
			}
		},
		{
			name: '文本样式',
			opName: 'textStyle',
			chartOption: false,
			menuOption: true,
			uniqueOption: true,
			icon: 'i_text',
			componentPath: chartPath + 'paramsBar/paramsBarText'
		}
	]
}

export function combineOption(data: any) {
	const series = data.seriesData
	const dataset = chart.getOption.dataset
	dataset.source = data.datasetData
	return {
		series,
		dataset
	}
}

export const createExcelData = (config: any) => {
	return conveyToExcel([
		{
			direction: 'col',
			data: config.dataset.source,
			startRow: 0,
			startCol: 0
		}
	])
}

export const conveyExcelData = (rows: any, options: any) => {
	if (!rows) return null
	const datas = {
		datasetData: <any>[],
		seriesData: <any>[]
	}
	const length: number = Object.keys(rows).length
	for (let i = 0; i < length; i++) {
		if (JSON.stringify(rows[i].cells) == '{}') break
		datas.datasetData[i] = []
		const rowsLength: number = Object.keys(rows[i].cells).length
		for (let j = 0; j < rowsLength; j++) {
			if (i == 0) {
				datas.datasetData[i].push(rows[i].cells[j].text)
			} else {
				if (rows[i].cells[j].text == '') {
					datas.datasetData[i].push('')
				} else {
					datas.datasetData[i].push(
						isNaN(rows[i].cells[j].text) ? rows[i].cells[j].text : parseFloat(rows[i].cells[j].text)
					)
				}
			}
		}
	}
	if (datas.datasetData.length) {
		for (let i = 0; i < datas.datasetData[0].length - 1; i++) {
			datas.seriesData.push(options.series[0])
		}
	}
	return datas
}
