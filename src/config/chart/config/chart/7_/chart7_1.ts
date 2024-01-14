import useStore from '@/store'
import titleOption from '@/config/chart/commonParams/title'
import canvasOption from '@/config/chart/commonParams/canvas'
import gridOption from '@/config/chart/commonParams/grid'
import colorOption from '@/config/chart/commonParams/color'
import graphicOption from '@/config/chart/commonParams/graphic'
import { conveyToExcel } from '@/config/chart/conveyUtils/conveyData'
import {
	sankey_series,
	sankey_series_itemStyle,
	sankey_series_label,
	sankey_series_lineStyle
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
			name: '数据',
			opName: 'series',
			chartOption: true,
			menuOption: false,
			defaultOption: {
				series: {
					type: 'sankey',
					layout: 'none',
					draggable: false,
					...sankey_series(),
					label: sankey_series_label(),
					itemStyle: sankey_series_itemStyle(),
					lineStyle: sankey_series_lineStyle(),
					emphasis: {
						focus: 'adjacency'
					},
					data: [
						{
							name: 'a'
						},
						{
							name: 'b'
						},
						{
							name: 'a1'
						},
						{
							name: 'a2'
						},
						{
							name: 'b1'
						},
						{
							name: 'c'
						}
					],
					links: [
						{
							source: 'a',
							target: 'a1',
							value: 5
						},
						{
							source: 'a',
							target: 'a2',
							value: 3
						},
						{
							source: 'b',
							target: 'b1',
							value: 8
						},
						{
							source: 'a',
							target: 'b1',
							value: 3
						},
						{
							source: 'b1',
							target: 'a1',
							value: 1
						},
						{
							source: 'b1',
							target: 'c',
							value: 20
						}
					]
				}
			}
		},
		{
			name: '桑基图样式',
			opName: 'sankeyStyle',
			chartOption: false,
			menuOption: true,
			icon: 'i_sankey',
			componentPath: chartPath + 'paramsSankey/paramsSankeyStyle'
		},
		{
			name: '文本样式',
			opName: 'label',
			chartOption: false,
			menuOption: true,
			icon: 'i_text',
			componentPath: chartPath + 'paramsSankey/paramsSankeyLabel'
		},
		{
			name: '节点矩形样式',
			opName: 'itemStyle',
			chartOption: false,
			menuOption: true,
			icon: 'i_rect',
			componentPath: chartPath + 'paramsSankey/paramsSankeyItem'
		},
		{
			name: '图边样式',
			opName: 'lineStyle',
			chartOption: false,
			menuOption: true,
			icon: 'i_sankey',
			componentPath: chartPath + 'paramsSankey/paramsSankeyLine'
		}
	]
}

export function combineOption(data: any) {
	const series = chart.getOption.series
	series.data = data.data
	series.links = data.linksData
	return {
		series
	}
}

export const createExcelData = (config: any) => {
	return conveyToExcel([
		{
			direction: 'col',
			data: config.series.links,
			startCol: 0
		}
	])
}

export const conveyExcelData = (rows: any) => {
	if (!rows) return null
	const datas = {
		linksData: <
			{
				source: any
				target: any
				value: number
			}[]
		>[],
		data: <{ name: string }[]>[]
	}
	const set = new Set<string>()
	const rowsTLength = Object.keys(rows).length
	for (let i = 0; i < rowsTLength; i++) {
		if (!rows[i] || JSON.stringify(rows[i].cells) == '{}') break
		if (!rows[i].cells[0] || !rows[i].cells[1] || !rows[i].cells[2]) break
		datas.linksData.push({
			source: rows[i].cells[0].text,
			target: rows[i].cells[1].text,
			value: parseFloat(rows[i].cells[2].text)
		})
		set.add(rows[i].cells[0].text).add(rows[i].cells[1].text)
	}
	if (datas.linksData.length) {
		for (const item of set) {
			datas.data.push({
				name: item
			})
		}
	}
	return datas
}
