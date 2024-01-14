import useStore from '@/store'
import titleOption from '@/config/chart/commonParams/title'
import canvasOption from '@/config/chart/commonParams/canvas'
import gridOption from '@/config/chart/commonParams/grid'
import xAxisOption from '@/config/chart/commonParams/xAxis'
import yAxisOption from '@/config/chart/commonParams/yAxis'
import { conveyToExcel } from '@/config/chart/conveyUtils/conveyData'
import { kline_series_itemstyle } from '@/config/chart/option'
import colorOption from '@/config/chart/commonParams/color'
import graphicOption from '@/config/chart/commonParams/graphic'
import { chartPath } from '@/config/chart/constant'
const { chart }: any = useStore()

export default () => {
	return [
		titleOption({
			show: false
		}),
		gridOption({
			right: '5%',
			left: '8%'
		}),
		canvasOption(),
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
						['2017-10-24', 20, 34, 10, 38],
						['2017-10-25', 40, 35, 30, 50],
						['2017-10-26', 31, 38, 33, 44],
						['2017-10-27', 38, 15, 5, 42]
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
						...yAxisOption()
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
						type: 'candlestick',
						itemStyle: kline_series_itemstyle()
					}
				]
			}
		},
		{
			name: 'K线样式',
			opName: 'kLineStyle',
			chartOption: false,
			menuOption: true,
			uniqueOption: true,
			icon: 'i_kline',
			componentPath: chartPath + 'paramsKLine/paramsKLineStyle'
		}
	]
}

export function combineOption(data: any) {
	const dataset = chart.getOption.dataset
	const series = data.seriesData
	dataset.source = data.datasetData
	return {
		dataset,
		series
	}
}

export const createExcelData = (config: any) => {
	return conveyToExcel([
		{
			direction: 'col',
			data: config.dataset.source
		}
	])
}

// 收集数据并进行转换
export const conveyExcelData = (rows: any, options: any) => {
	if (!rows) return null
	const datas: any = {
		datasetData: <any>[],
		seriesData: <any>[]
	}
	// 遍历数据项
	const rowsTLength = Object.keys(rows).length
	for (let i = 0; i < rowsTLength; i++) {
		const val1 = rows[i] && rows[i].cells[0] ? rows[i].cells[0].text : ''
		const val2 = rows[i] && rows[i].cells[1] ? parseFloat(rows[i].cells[1].text) : NaN
		const val3 = rows[i] && rows[i].cells[2] ? parseFloat(rows[i].cells[2].text) : NaN
		const val4 = rows[i] && rows[i].cells[3] ? parseFloat(rows[i].cells[3].text) : NaN
		const val5 = rows[i] && rows[i].cells[4] ? parseFloat(rows[i].cells[4].text) : NaN
		if (val1 == '' || isNaN(val2) || isNaN(val3) || isNaN(val4) || isNaN(val5)) break
		datas.datasetData.push([val1, val2, val3, val4, val5])
	}
	if (datas.datasetData.length && options.series.length) {
		datas.seriesData.push(options.series[0])
	}
	return datas
}
