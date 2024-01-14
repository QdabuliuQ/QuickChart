import useStore from '@/store'
import titleOption from '@/config/chart/commonParams/title'
import canvasOption from '@/config/chart/commonParams/canvas'
import gridOption from '@/config/chart/commonParams/grid'
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
			name: '内外圈大小',
			opName: 'polar',
			chartOption: true,
			menuOption: true,
			uniqueOption: true,
			icon: 'i_circle',
			componentPath: chartPath + 'paramsBar/paramsBarPolar',
			defaultOption: {
				polar: {
					radius: [30, '80%']
				}
			}
		},
		{
			name: '圈内层次',
			opName: 'radiusAxis',
			chartOption: true,
			menuOption: false,
			uniqueOption: false,
			icon: 'i_radiusAxis',
			defaultOption: {
				radiusAxis: {
					type: 'category',
					data: ['a', 'b', 'c', 'd']
				}
			},
			allOption: {}
		},
		{
			name: '内圈角度',
			opName: 'angleAxis',
			chartOption: true,
			menuOption: true,
			uniqueOption: true,
			icon: 'i_angle',
			componentPath: chartPath + 'paramsBar/paramsBarAxis',
			defaultOption: {
				angleAxis: {
					clockwise: false,
					startAngle: 75
				}
			}
		},
		{
			name: '数据',
			opName: 'series',
			chartOption: true,
			menuOption: false,
			defaultOption: {
				series: {
					type: 'bar',
					data: [2, 1.2, 2.4, 3.6],
					coordinateSystem: 'polar',
					label: {
						show: true,
						position: 'middle',
						formatter: '{b}: {c}'
					}
				}
			}
		}
	]
}

export function combineOption(data: any) {
	const radiusAxis = chart.getOption.radiusAxis
	const series = chart.getOption.series
	series.data = data.seriesData
	radiusAxis.data = data.radiusAxisData
	return {
		series,
		radiusAxis
	}
}

export const createExcelData = (config: any) => {
	return conveyToExcel([
		{
			direction: 'col',
			data: config.radiusAxis.data,
			startCol: 0,
			startRow: 0
		},
		{
			direction: 'col',
			data: config.series.data,
			startCol: 1,
			startRow: 0
		}
	])
}

// 收集数据并进行转换
export const conveyExcelData = (rows: any) => {
	if (!rows) return null
	const datas = {
		radiusAxisData: <any>[],
		seriesData: <any>[]
	}
	for (const key in rows) {
		if (JSON.stringify(rows[key].cells) != '{}') {
			if (rows[key].cells[0].text == '') {
				datas.radiusAxisData.push('')
			} else {
				datas.radiusAxisData.push(rows[key].cells[0].text)
			}
			if (rows[key].cells[1].text == '') {
				datas.seriesData.push('')
			} else {
				datas.seriesData.push(parseFloat(rows[key].cells[1].text))
			}
		} else break
	}
	return datas
}
