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
			top: '95%',
			left: '7%',
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
						radius: ['30%', '85%'],
						center: ['50%', '50%'],
						roseType: 'area',
						itemStyle: {
							borderRadius: 8
						},
						label: {
							...pie_label
						},
						labelLine: {
							...pie_labelLine
						},
						data: [
							{ name: 'rose 1', value: 40 },
							{ name: 'rose 2', value: 38 },
							{ name: 'rose 3', value: 32 },
							{ name: 'rose 4', value: 30 },
							{ name: 'rose 5', value: 28 },
							{ name: 'rose 6', value: 26 },
							{ name: 'rose 7', value: 22 },
							{ name: 'rose 8', value: 18 }
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
	return conveyToExcel([
		{
			direction: 'col',
			data: config.series[0].data
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
		if (val1 == '' || isNaN(val2)) break
		datas.seriesData.push({
			// 创建series
			name: val1,
			value: val2
		})
	}
	return datas
}
