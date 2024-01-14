import canvasOption from '@/config/chart/commonParams/canvas'
import colorOption from '@/config/chart/commonParams/color'
import graphicOption from '@/config/chart/commonParams/graphic'
import gridOption from '@/config/chart/commonParams/grid'
import legendOption from '@/config/chart/commonParams/legend'
import titleOption from '@/config/chart/commonParams/title'
import xAxisOption from '@/config/chart/commonParams/xAxis'
import yAxisOption from '@/config/chart/commonParams/yAxis'
import { combineOption as _combineOption } from '@/config/chart/config/chart/1_/chart1_1'
import { chartPath } from '@/config/chart/constant'
import { conveyToExcel } from '@/config/chart/conveyUtils/conveyData'
import { line_series, line_series_label } from '@/config/chart/option'

const lineSeriesOption = line_series(),
	lineSeriesLabelOption = line_series_label()
export default () => {
	return [
		titleOption({
			show: false
		}),
		canvasOption(),
		gridOption(),
		legendOption(),
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
						['items', 'Step Start', 'Step Middle', 'Step End'],
						['Mon', 120, 220, 450],
						['Tue', 132, 282, 432],
						['Wed', 101, 201, 401],
						['Thu', 134, 234, 454],
						['Fri', 90, 290, 590],
						['Sat', 230, 430, 530],
						['Sun', 210, 410, 510]
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
						boundaryGap: false,
						type: 'category'
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
						type: 'value'
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
						type: 'line',
						step: 'middle',
						...lineSeriesOption,
						label: {
							...lineSeriesLabelOption
						}
					},
					{
						type: 'line',
						step: 'middle',
						...lineSeriesOption,
						label: {
							...lineSeriesLabelOption
						}
					},
					{
						type: 'line',
						step: 'middle',
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

export const combineOption = _combineOption

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
export const conveyExcelData = (rows: any) => {
	if (!rows) return null
	const seriesOptionItem = {
		type: 'line',
		step: 'middle'
	}
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
			datas.datasetData[i].push(
				isNaN(rows[i].cells[j].text) ? rows[i].cells[j].text : parseFloat(rows[i].cells[j].text)
			)
		}
	}
	if (datas.datasetData.length) {
		for (let i = 0; i < datas.datasetData[0].length - 1; i++) {
			datas.seriesData.push(seriesOptionItem)
		}
	}
	return datas
}
