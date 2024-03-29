import canvasOption from '@/config/chart/commonParams/canvas'
import colorOption from '@/config/chart/commonParams/color'
import graphicOption from '@/config/chart/commonParams/graphic'
import gridOption from '@/config/chart/commonParams/grid'
import titleOption from '@/config/chart/commonParams/title'
import { asisOpNameList, chartPath } from '@/config/chart/constant'
import { conveyToExcel } from '@/config/chart/conveyUtils/conveyData'
import { line_series, line_series_label } from '@/config/chart/option'

import useStore from '@/store'

const { chart }: any = useStore()
const lineSeriesOption = line_series(),
	lineSeriesLabelOption = line_series_label()
export default () => {
	return [
		titleOption({
			show: false
		}),
		canvasOption(),
		gridOption(),
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
						[10, 40],
						[50, 100],
						[40, 20]
					]
				}
			},
			allOption: {}
		},
		{
			name: 'X轴样式',
			opName: 'xAxis',
			chartOption: true,
			menuOption: false,
			icon: 'i_X',
			defaultOption: {
				xAxis: [{}]
			}
		},
		{
			name: 'Y轴样式',
			opName: 'yAxis',
			chartOption: true,
			menuOption: false,
			icon: 'i_Y',
			defaultOption: {
				yAxis: [{}]
			},
			allOption: {
				yAxis: [{}]
			},
			opNameList: asisOpNameList
		},
		{
			name: '数据',
			opName: 'series',
			chartOption: true,
			menuOption: false,
			defaultOption: {
				series: [
					{
						type: 'line',
						...lineSeriesOption,
						label: {
							...lineSeriesLabelOption
						}
					}
				]
			}
		},
		{
			name: '线段样式',
			opName: 'lineStyle',
			chartOption: false,
			menuOption: true,
			uniqueOption: true,
			icon: 'i_line',
			componentPath: chartPath + 'paramsLine/paramsLineStyle'
		},
		{
			name: '字体样式',
			opName: 'textStyle',
			chartOption: false,
			menuOption: true,
			uniqueOption: true,
			icon: 'i_text',
			componentPath: chartPath + 'paramsLine/paramsLineText'
		}
	]
}

export function combineOption(data: any) {
	const dataset = chart.getOption.dataset
	dataset.source = data.datasetData
	return {
		dataset,
		series: data.seriesData
	}
}

export const createExcelData = (config: any) => {
	return conveyToExcel([
		{
			direction: 'col',
			data: config.dataset.source,
			startRow: 0
		}
	])
}

// 收集数据并进行转换
export const conveyExcelData = (rows: any, options: any) => {
	const length: number = Object.keys(rows).length
	if (!rows || length <= 0) return null
	const datas = {
		datasetData: <any>[],
		seriesData: <any>[]
	}
	const seriesOptionItem = options.series[0] ?? null
	for (let i = 0; i < length; i++) {
		if (JSON.stringify(rows[i].cells) == '{}') break
		datas.datasetData[i] = []
		const rowsLength: number = Object.keys(rows[i].cells).length
		for (let j = 0; j < rowsLength; j++) {
			datas.datasetData[i].push(parseFloat(rows[i].cells[j].text))
		}
	}
	for (let i = 0; i < datas.datasetData.length; i++) {
		datas.seriesData.push(seriesOptionItem)
	}
	return datas
}
