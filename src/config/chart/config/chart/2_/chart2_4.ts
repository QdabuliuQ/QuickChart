import canvasOption from '@/config/chart/commonParams/canvas'
import colorOption from '@/config/chart/commonParams/color'
import graphicOption from '@/config/chart/commonParams/graphic'
import gridOption from '@/config/chart/commonParams/grid'
import legendOption from '@/config/chart/commonParams/legend'
import titleOption from '@/config/chart/commonParams/title'
import { chartPath } from '@/config/chart/constant'
import { conveyToExcel } from '@/config/chart/conveyUtils/conveyData'
import { bar_series_label } from '@/config/chart/option'

import useStore from '@/store'
const { chart }: any = useStore()

export default () => {
	return [
		titleOption({
			show: false
		}),
		canvasOption(),
		gridOption({
			bottom: '5%'
		}),
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
						['ten', -0.07],
						['nine', -0.09],
						['eight', 0.2],
						['seven', 0.44],
						['six', -0.23],
						['five', 0.08],
						['four', -0.17],
						['three', 0.47],
						['two', -0.36],
						['one', 0.18]
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
				xAxis: [
					{
						type: 'value',
						position: 'top',
						splitLine: {
							lineStyle: {
								type: 'dashed'
							}
						}
					}
				]
			}
		},
		{
			name: 'Y轴样式',
			opName: 'yAxis',
			chartOption: true,
			menuOption: false,
			icon: 'i_Y',
			defaultOption: {
				yAxis: [
					{
						type: 'category',
						axisLine: { show: false },
						axisLabel: { show: false },
						axisTick: { show: false },
						splitLine: { show: false }
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
						stack: 'Total',
						label: bar_series_label(),
						showBackground: false,
						backgroundStyle: {
							color: '',
							borderColor: '',
							borderWidth: 0,
							borderType: 'solid',
							borderRadius: 0,
							shadowBlur: 0,
							shadowColor: '',
							shadowOffsetX: 0,
							shadowOffsetY: 0,
							opacity: 1
						}
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
		datas.datasetData[i][0] = rows[i].cells[0].text
		datas.datasetData[i][1] = parseFloat(rows[i].cells[1].text)
	}
	return datas
}
