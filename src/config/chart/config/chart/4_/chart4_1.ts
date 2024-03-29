import useStore from '@/store'
import titleOption from '@/config/chart/commonParams/title'
import canvasOption from '@/config/chart/commonParams/canvas'
import gridOption from '@/config/chart/commonParams/grid'
import xAxisOption from '@/config/chart/commonParams/xAxis'
import yAxisOption from '@/config/chart/commonParams/yAxis'
import {
	point_series_itemStyle,
	point_series_label,
	point_series_labelLine
} from '@/config/chart/option'
import { conveyToExcel } from '@/config/chart/conveyUtils/conveyData'
import colorOption from '@/config/chart/commonParams/color'
import graphicOption from '@/config/chart/commonParams/graphic'
import { chartPath } from '@/config/chart/constant'

const { chart }: any = useStore()

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
						[10.0, 8.04],
						[8.07, 6.95],
						[13.0, 7.58],
						[9.05, 8.81],
						[11.0, 8.33],
						[14.0, 7.66],
						[13.4, 6.81],
						[10.0, 6.33],
						[14.0, 8.96],
						[12.5, 6.82],
						[9.15, 7.2],
						[11.5, 7.2],
						[3.03, 4.23],
						[12.2, 7.83],
						[2.02, 4.47],
						[1.05, 3.33],
						[4.05, 4.96],
						[6.03, 7.24],
						[12.0, 6.26],
						[12.0, 8.84],
						[7.08, 5.82],
						[5.02, 5.68]
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
				xAxis: [{ ...xAxisOption() }]
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
				yAxis: [{ ...yAxisOption() }]
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
						symbol: 'circle',
						color: '',
						symbolSize: 20,
						itemStyle: point_series_itemStyle(),
						label: point_series_label(),
						labelLine: point_series_labelLine(),
						type: 'scatter'
					}
				]
			}
		},
		{
			name: '散点样式',
			opName: 'pointStyle',
			chartOption: false,
			menuOption: true,
			uniqueOption: true,
			icon: 'i_point',
			componentPath: chartPath + 'paramsPoint/paramsPointStyle'
		},
		{
			name: '文本样式',
			opName: 'textStyle',
			chartOption: false,
			menuOption: true,
			uniqueOption: true,
			icon: 'i_text',
			componentPath: chartPath + 'paramsPoint/paramsPointText'
		},
		{
			name: '引导线样式',
			opName: 'lineStyle',
			chartOption: false,
			menuOption: true,
			uniqueOption: true,
			icon: 'i_gline',
			componentPath: chartPath + 'paramsPoint/params-point-line'
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
			startRow: 0
		}
	])
}
// 收集数据并进行转换
export const conveyExcelData = (rows: any) => {
	if (!rows) return null
	const datas: any = {
		datasetData: <any>[]
	}
	const length: number = Object.keys(rows).length
	for (let i = 0; i < length; i++) {
		const val1 =
			rows[i] && rows[i].cells && rows[i].cells[0] ? parseFloat(rows[i].cells[0].text) : NaN
		const val2 =
			rows[i] && rows[i].cells && rows[i].cells[1] ? parseFloat(rows[i].cells[1].text) : NaN
		if (isNaN(val1) || isNaN(val2)) break
		datas.datasetData.push([val1, val2])
	}
	return datas
}
