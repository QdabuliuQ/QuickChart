import useStore from '@/store'
import titleOption from '@/config/chart/commonParams/title'
import canvasOption from '@/config/chart/commonParams/canvas'
import gridOption from '@/config/chart/commonParams/grid'
import { point_series_label, point_series_labelLine } from '@/config/chart/option'
import { chartPath, pointData_2 } from '@/config/chart/constant'
import { conveyToExcel } from '@/config/chart/conveyUtils/conveyData'
import colorOption from '@/config/chart/commonParams/color'
import graphicOption from '@/config/chart/commonParams/graphic'

const { chart }: any = useStore()
const data = pointData_2

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
			name: 'xAxis',
			opName: 'xAxis',
			chartOption: true,
			menuOption: false,
			uniqueOption: false,
			defaultOption: {
				xAxis: {
					splitLine: { show: false }
				}
			},
			allOption: {}
		},
		{
			name: 'yAxis',
			opName: 'yAxis',
			chartOption: true,
			menuOption: false,
			uniqueOption: false,
			defaultOption: {
				yAxis: {
					splitLine: { show: false },
					scale: true
				}
			},
			allOption: {}
		},
		{
			name: 'dataset',
			opName: 'dataset',
			chartOption: true,
			menuOption: false,
			uniqueOption: false,
			defaultOption: {
				dataset: {
					source: data
				}
			},
			allOption: {}
		},
		{
			name: '数据',
			opName: 'series',
			chartOption: true,
			menuOption: false,
			defaultOption: {
				series: [
					{
						type: 'scatter',
						symbolSize: function (data: any) {
							return data[2]
						},
						emphasis: {
							focus: 'self'
						},
						labelLayout: {
							y: '10%',
							x: '85%',
							hideOverlap: true,
							moveOverlap: 'shiftY'
						},
						labelLine: point_series_labelLine({
							show: true,
							length: 'EMPTY',
							length2: 5,
							'lineStyle.color': '#bbb'
						}),
						label: {
							...point_series_label({
								show: true,
								color: '#000',
								offset: 'EMPTY',
								align: 'EMPTY'
							}),
							formatter: function (param: any) {
								return param.data[3]
							},
							minMargin: 4
						}
					}
				]
			},
			allOption: {}
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

export const createExcelData = (config: any) => {
	return conveyToExcel([
		{
			direction: 'col',
			data: config.dataset.source,
			startRow: 0
		}
	])
}

export function combineOption(data: any) {
	const dataset = chart.getOption.dataset
	dataset.source = data.datasetData
	return {
		dataset
	}
}

export const conveyExcelData = (rows: any) => {
	if (!rows) return null
	const datas = {
		datasetData: <any>[]
	}
	const length: number = Object.keys(rows).length - 1
	for (let i = 0; i < length; i++) {
		const val1 =
			rows[i] && rows[i].cells && rows[i].cells[0] ? parseFloat(rows[i].cells[0].text) : NaN
		const val2 =
			rows[i] && rows[i].cells && rows[i].cells[1] ? parseFloat(rows[i].cells[1].text) : NaN
		const val3 =
			rows[i] && rows[i].cells && rows[i].cells[2] ? parseFloat(rows[i].cells[2].text) : NaN
		const val4 = rows[i] && rows[i].cells && rows[i].cells[3] ? rows[i].cells[3].text : ''
		if (isNaN(val1) || isNaN(val2) || isNaN(val3) || val4 == '') break
		datas.datasetData.push([val1, val2, val3, val4])
	}
	return datas
}
