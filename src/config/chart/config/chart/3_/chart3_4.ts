import useStore from '@/store'
import titleOption from '@/config/chart/commonParams/title'
import canvasOption from '@/config/chart/commonParams/canvas'
import gridOption from '@/config/chart/commonParams/grid'
import legendOption from '@/config/chart/commonParams/legend'
import pie_label from '@/config/chart/commonParams/pie_label'
import pie_labelLine from '@/config/chart/commonParams/pie_labelLine'
import { conveyToExcel } from '@/config/chart/conveyUtils/conveyData'
import colorOption from '@/config/chart/commonParams/color'
import graphicOption from '@/config/chart/commonParams/graphic'

const { chart }: any = useStore()

export default () => {
	return [
		titleOption({
			show: false
		}),
		canvasOption(),
		gridOption(),
		legendOption({
			icon: 'roundRect',
			top: '5%',
			left: '18%',
			orient: 'horizontal'
		}),
		graphicOption(),
		colorOption(),
		{
			name: '数据',
			opName: 'series',
			chartOption: true,
			menuOption: false,
			defaultOption: {
				series: [
					{
						name: 'Access From',
						type: 'pie',
						radius: ['40%', '70%'],
						center: ['50%', '70%'],
						startAngle: 180,
						label: {
							...pie_label
						},
						labelLine: {
							...pie_labelLine
						},
						data: [
							{ name: 'Search Engine', value: 1048 },
							{ name: 'Direct', value: 735 },
							{ name: 'Email', value: 580 },
							{ name: 'Union Ads', value: 484 },
							{ name: 'Video Ads', value: 300 },
							{
								value: 1048 + 735 + 580 + 484 + 300,
								itemStyle: {
									color: 'none',
									decal: {
										symbol: 'none'
									}
								},
								label: {
									show: false
								}
							}
						]
					}
				]
			}
		},
		{
			name: '饼图样式',
			opName: 'pieStyle',
			chartOption: false,
			menuOption: true,
			uniqueOption: true,
			icon: 'i_pie',
			componentPath: 'paramsPie/paramsPieStyle.vue'
		},
		{
			name: '文本样式',
			opName: 'textStyle',
			chartOption: false,
			menuOption: true,
			uniqueOption: true,
			icon: 'i_text',
			componentPath: 'paramsPie/paramsPieText.vue'
		},
		{
			name: '引导线样式',
			opName: 'lineStyle',
			chartOption: false,
			menuOption: true,
			uniqueOption: true,
			icon: 'i_gline',
			componentPath: 'paramsPie/paramsPieLine.vue'
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
	const series = JSON.parse(JSON.stringify(config.series[0].data))
	series.splice(series.length - 1, 1)
	return conveyToExcel([
		{
			direction: 'col',
			data: series
		}
	])
}

// 收集数据并进行转换
export const conveyExcelData = (rows: any) => {
	if (!rows) return null
	const datas: any = {
		seriesData: <any>[]
	}
	// 遍历数据项
	const rowsTLength = Object.keys(rows).length
	for (let i = 0; i < rowsTLength; i++) {
		const val1 = rows[i] && rows[i].cells[0] ? rows[i].cells[0].text : ''
		const val2 = rows[i] && rows[i].cells[1] ? parseFloat(rows[i].cells[1].text) : NaN
		if (isNaN(val2) || val1 == '') break
		datas.seriesData.push({
			// 创建series
			value: val2,
			name: val1
		})
	}
	const dataOption = {
		value: 0,
		itemStyle: {
			color: 'none',
			decal: {
				symbol: 'none'
			}
		},
		label: {
			show: false
		}
	}
	for (const item of datas.seriesData) {
		dataOption.value += item.value
	}
	datas.seriesData.push(dataOption)
	return datas
}
