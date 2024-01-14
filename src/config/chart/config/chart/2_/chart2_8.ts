import useStore from '@/store'
import titleOption from '@/config/chart/commonParams/title'
import canvasOption from '@/config/chart/commonParams/canvas'
import gridOption from '@/config/chart/commonParams/grid'
import legendOption from '@/config/chart/commonParams/legend'
import xAxisOption from '@/config/chart/commonParams/xAxis'
import yAxisOption from '@/config/chart/commonParams/yAxis'
import { conveyToExcel } from '@/config/chart/conveyUtils/conveyData'
import colorOption from '@/config/chart/commonParams/color'
import graphicOption from '@/config/chart/commonParams/graphic'
import { chartPath } from '@/config/chart/constant'

const { chart }: any = useStore()

const getOption = () => {
	return [
		titleOption({
			show: false
		}),
		canvasOption(),
		gridOption({
			containLabel: true
		}),
		legendOption({
			left: 'center',
			top: 5,
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
						['items', 'Direct', 'Mail Ad', 'Affiliate Ad', 'Video Ad', 'Search Engine'],
						['Mon', 320, 120, 220, 150, 820],
						['Tue', 302, 132, 182, 212, 832],
						['Wed', 301, 101, 191, 201, 901],
						['Thu', 334, 134, 234, 154, 934],
						['Fri', 390, 90, 290, 190, 1290],
						['Sat', 330, 230, 330, 330, 1330],
						['Sun', 320, 210, 310, 410, 1320]
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
						stack: 'total',
						label: {
							show: true
						},
						emphasis: {
							focus: 'series'
						}
					},
					{
						type: 'bar',
						stack: 'total',
						label: {
							show: true
						},
						emphasis: {
							focus: 'series'
						}
					},
					{
						type: 'bar',
						stack: 'total',
						label: {
							show: true
						},
						emphasis: {
							focus: 'series'
						}
					},
					{
						type: 'bar',
						stack: 'total',
						label: {
							show: true
						},
						emphasis: {
							focus: 'series'
						}
					},
					{
						type: 'bar',
						stack: 'total',
						label: {
							show: true
						},
						emphasis: {
							focus: 'series'
						}
					}
				]
			}
		}
	]
}

export default getOption

export function combineOption(data: any) {
	let series = chart.getOption.series
	const dataset = chart.getOption.dataset
	series = data.seriesData
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

export const conveyExcelData = (rows: any) => {
	if (!rows) return null
	const seriesOptionItem = {
		type: 'bar',
		stack: 'total',
		label: {
			show: true
		},
		emphasis: {
			focus: 'series'
		}
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
			datas.seriesData.push(seriesOptionItem)
		}
	}
	return datas
}
