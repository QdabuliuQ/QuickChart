import useStore from '@/store'
import titleOption from '@/config/chart/commonParams/title'
import canvasOption from '@/config/chart/commonParams/canvas'
import gridOption from '@/config/chart/commonParams/grid'
import { chartPath, pointData } from '@/config/chart/constant'
import { point_series_itemStyle } from '@/config/chart/option'
import { conveyToExcel } from '@/config/chart/conveyUtils/conveyData'
import colorOption from '@/config/chart/commonParams/color'
import graphicOption from '@/config/chart/commonParams/graphic'

const { chart }: any = useStore()
const axisData = [
	'12a',
	'1a',
	'2a',
	'3a',
	'4a',
	'5a',
	'6a',
	'7a',
	'8a',
	'9a',
	'10a',
	'11a',
	'12p',
	'1p',
	'2p',
	'3p',
	'4p',
	'5p',
	'6p',
	'7p',
	'8p',
	'9p',
	'10p',
	'11p'
]
const rAxisData = ['Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday']

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
					source: pointData
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
						name: 'dataName',
						type: 'scatter',
						coordinateSystem: 'polar',
						symbol: 'circle',
						color: '',
						itemStyle: point_series_itemStyle(),
						symbolSize: function (val: any) {
							return val[2] * 2
						}
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
			name: '内外圈大小',
			opName: 'polar',
			chartOption: true,
			menuOption: false,
			uniqueOption: false,
			defaultOption: {
				polar: {}
			}
		},
		{
			name: '极坐标角度轴',
			opName: 'angleAxis',
			chartOption: true,
			menuOption: true,
			uniqueOption: true,
			icon: 'i_angleAxis',
			componentPath: chartPath + 'paramsPoint/paramsPointAngleAxis',
			defaultOption: {
				angleAxis: {
					type: 'category',
					data: axisData,
					boundaryGap: false,
					splitLine: {
						show: true,
						lineStyle: {
							color: 'rgba(195, 195, 195, 1)',
							width: 1,
							type: 'solid',
							shadowBlur: 0,
							shadowColor: '',
							shadowOffsetX: 0,
							shadowOffsetY: 0,
							opacity: 1
						}
					},
					axisLine: {
						show: false
					}
				}
			}
		},
		{
			name: 'radiusAxis',
			opName: 'radiusAxis',
			chartOption: true,
			menuOption: false,
			uniqueOption: false,
			icon: '',
			defaultOption: {
				radiusAxis: {
					type: 'category',
					data: rAxisData,
					axisLine: {
						show: false
					},
					axisLabel: {
						rotate: 45
					}
				}
			},
			allOption: {}
		}
	]
}

export const createExcelData = (config: any) => {
	return conveyToExcel([
		{
			direction: 'row',
			data: config.angleAxis.data,
			startRow: 0
		},
		{
			direction: 'row',
			data: config.radiusAxis.data,
			startRow: 1
		},
		{
			direction: 'col',
			data: config.dataset.source,
			startRow: 2
		}
	])
}

export function combineOption(data: any) {
	const angleAxis = chart.getOption.angleAxis
	const radiusAxis = chart.getOption.radiusAxis
	const dataset = chart.getOption.dataset

	angleAxis.data = data.angleAxisData
	radiusAxis.data = data.radiusAxisData
	dataset.source = data.datasetData
	return {
		angleAxis,
		radiusAxis,
		dataset
	}
}

export function conveyExcelData(rows: any) {
	if (!rows) return null
	const datas = {
		angleAxisData: <any>[],
		radiusAxisData: <any>[],
		datasetData: <any>[]
	}
	const length: number = Object.keys(rows).length - 1
	for (let i = 0; i < length; i++) {
		if (i == 0) {
			const n: number = Object.keys(rows[i].cells).length
			for (let j = 0; j < n; j++) {
				datas.angleAxisData.push(rows[i].cells[j].text)
			}
		} else if (i == 1) {
			const n: number = Object.keys(rows[i].cells).length
			for (let j = 0; j < n; j++) {
				datas.radiusAxisData.push(rows[i].cells[j].text)
			}
		} else {
			const val1 =
				rows[i] && rows[i].cells && rows[i].cells[0] ? parseFloat(rows[i].cells[0].text) : NaN
			const val2 =
				rows[i] && rows[i].cells && rows[i].cells[1] ? parseFloat(rows[i].cells[1].text) : NaN
			const val3 =
				rows[i] && rows[i].cells && rows[i].cells[2] ? parseFloat(rows[i].cells[2].text) : NaN
			if (isNaN(val1) || isNaN(val2) || isNaN(val3)) break
			datas.datasetData.push([val1, val2, val3])
		}
	}
	return datas
}
