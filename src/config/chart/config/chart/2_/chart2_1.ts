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
import { bar_series_backgroundStyle, bar_series_label } from '@/config/chart/option'

import useStore from '@/store'

const { chart }: any = useStore()
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
						['Mon', 120],
						['Tue', 200],
						['Wed', 150],
						['Thu', 80],
						['Fri', 70],
						['Sat', 110],
						['Sun', 130]
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
						type: 'bar',
						showBackground: true,
						backgroundStyle: bar_series_backgroundStyle({
							color: 'rgba(180, 180, 180, 0.2)'
						}),
						label: bar_series_label({
							show: false
						})
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
		},
		{
			name: '背景样式',
			opName: 'bgStyle',
			chartOption: false,
			menuOption: true,
			uniqueOption: true,
			icon: 'i_bg',
			componentPath: chartPath + 'paramsBar/paramsBarBgStyle'
		}
	]
}

export function combineOption(data: any) {
	const dataset = chart.getOption.dataset
	dataset.source = data.datasetData
	return {
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

// 收集数据并进行转换
export const conveyExcelData = (rows: any) => {
	if (!rows) return null
	const datas = {
		datasetData: <any>[]
	}
	const length: number = Object.keys(rows).length

	for (let i = 0; i < length; i++) {
		if (JSON.stringify(rows[i].cells) == '{}') break
		datas.datasetData[i] = []
		const val1 = rows[i].cells[0].text
		const val2 = parseFloat(rows[i].cells[1].text)
		datas.datasetData[i] = [val1, val2]
	}
	return datas
}
