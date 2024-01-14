import useStore from '@/store'
import titleOption from '@/config/chart/commonParams/title'
import canvasOption from '@/config/chart/commonParams/canvas'
import gridOption from '@/config/chart/commonParams/grid'
import graphicOption from '@/config/chart/commonParams/graphic'
import { mapPath } from '@/config/chart/constant'
import { map_series_itemStyle, map_series_label } from '@/config/chart/option'
import { conveyToExcel } from '@/config/chart/conveyUtils/conveyData'

const { chart }: any = useStore()

export default () => {
	return [
		titleOption(),
		canvasOption(),
		gridOption(),
		graphicOption(),
		{
			defaultOption: {
				geo: {
					map: 'map',
					aspectScale: 0.9,
					roam: false,
					zoom: 1.2,
					layoutSize: '95%',
					layoutCenter: ['55%', '50%']
				}
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
						type: 'map',
						map: 'map',
						data: [],
						roam: true,
						label: map_series_label(),
						itemStyle: map_series_itemStyle(),
						labelLine: {
							show: true
						}
					}
				]
			}
		},
		{
			name: '文本样式',
			opName: 'label',
			chartOption: false,
			menuOption: true,
			icon: 'i_text',
			componentPath: mapPath + 'paramsLabel'
		},
		{
			name: '板块样式',
			opName: 'itemStyle',
			chartOption: false,
			menuOption: true,
			icon: 'i_block',
			componentPath: mapPath + 'paramsItem'
		}
	]
}

export function combineOption(data: any) {
	const series = chart.getOption.series
	series[0].data = data.seriesData
	return {
		series
	}
}

export const createExcelData = (config: any) => {
	return conveyToExcel([
		{
			direction: 'col',
			data: config.series[0].data,
			startCol: 0
		}
	])
}

export const conveyExcelData = (rows: any) => {
	if (!rows) return null
	const datas = {
		seriesData: <any>[]
	}
	const rowsLength = Object.keys(rows).length
	for (let i = 0; i < rowsLength; i++) {
		if (!rows[i] || JSON.stringify(rows[i].cells) == '{}') break
		if (!rows[i].cells[0] || !rows[i].cells[1]) break
		datas.seriesData.push({
			name: rows[i].cells[0].text,
			value: parseFloat(rows[i].cells[1].text)
		})
	}
	return datas
}
