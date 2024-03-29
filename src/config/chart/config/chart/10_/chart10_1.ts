import useStore from '@/store'
import titleOption from '@/config/chart/commonParams/title'
import canvasOption from '@/config/chart/commonParams/canvas'
import gridOption from '@/config/chart/commonParams/grid'
import colorOption from '@/config/chart/commonParams/color'
import graphicOption from '@/config/chart/commonParams/graphic'
import {
	sunburst_series,
	sunburst_series_itemStyle,
	sunburst_series_label
} from '@/config/chart/option'
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
			name: 'series',
			opName: 'series',
			chartOption: true,
			menuOption: false,
			uniqueOption: false,
			defaultOption: {
				series: {
					type: 'sunburst',
					data: [
						{
							name: 'Grandpa',
							children: [
								{
									name: 'Uncle Leo',
									value: 15,
									children: [
										{
											name: 'Cousin Jack',
											value: 2
										},
										{
											name: 'Cousin Mary',
											value: 5,
											children: [
												{
													name: 'Jackson',
													value: 2
												}
											]
										},
										{
											name: 'Cousin Ben',
											value: 4
										}
									]
								},
								{
									name: 'Father',
									value: 10,
									children: [
										{
											name: 'Me',
											value: 5
										},
										{
											name: 'Brother Peter',
											value: 1
										}
									]
								}
							]
						},
						{
							name: 'Nancy',
							children: [
								{
									name: 'Uncle Nike',
									children: [
										{
											name: 'Cousin Betty',
											value: 1
										},
										{
											name: 'Cousin Jenny',
											value: 2
										}
									]
								}
							]
						}
					],
					...sunburst_series(),
					label: sunburst_series_label({
						color: '#000'
					}),
					itemStyle: sunburst_series_itemStyle()
				}
			}
		},
		{
			name: '旭日图样式',
			opName: 'sunburstStyle',
			chartOption: false,
			menuOption: true,
			icon: 'i_sunburst',
			componentPath: chartPath + 'paramsSunburst/paramsSunburstStyle'
		},
		{
			name: '文本样式',
			opName: 'label',
			chartOption: false,
			menuOption: true,
			icon: 'i_text',
			componentPath: chartPath + 'paramsSunburst/paramsSunburstLabel'
		},
		{
			name: '图扇样式',
			opName: 'itemStyle',
			chartOption: false,
			menuOption: true,
			icon: 'i_circle_item',
			componentPath: chartPath + 'paramsSunburst/paramsSunburstItem'
		}
	]
}

export function combineOption(datas: any) {
	const series = chart.getOption.series
	series.data = datas.data
	return {
		series
	}
}
const convey = (data: any[]) => {
	const ans: any[][] = []
	const dfs = (data: any[], name: string, value: number | undefined) => {
		for (const item of data) {
			ans.push([name])
			if (value) ans[ans.length - 1].push(value)
			ans[ans.length - 1].push(item.name)
			if (item.value) ans[ans.length - 1].push(item.value)
			if (item.children) dfs(item.children, item.name, item.value)
		}
	}
	for (const item of data) {
		if (item.children) {
			dfs(item.children, item.name, item.value)
		}
	}
	return ans
}

export const createExcelData = (config: any) => {
	if (!config.series.data) return []
	const res = convey(config.series.data)
	const excelData: any = {}
	for (let i = 0; i < res.length; i++) {
		excelData[i] = {
			cells: {}
		}
		for (let j = 0; j < res[i].length; j++) {
			excelData[i].cells[j] = {
				text: res[i][j]
			}
		}
	}
	return excelData
}
const reset = () => null
export const conveyExcelData = (rows: any) => {
	const res: any[] = []
	const length = Object.keys(rows).length
	outer: for (let i = 0; i < length; i++) {
		res[i] = []
		const rowsLength = Object.keys(rows[i].cells).length
		for (let j = 0; j < rowsLength; j++) {
			if (!rows[i] || JSON.stringify(rows[i].cells) == '{}') break outer
			if (!rows[i].cells[0] || !rows[i].cells[1]) break outer
			if (isNaN(rows[i].cells[j])) {
				res[i].push(rows[i].cells[j].text)
			} else {
				res[i].push(parseInt(rows[i].cells[j].text))
			}
		}
	}
	const datas = {
		data: reset()
	}
	return datas
}
