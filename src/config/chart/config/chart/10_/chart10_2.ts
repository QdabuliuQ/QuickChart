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
import {
	createExcelData as _createExcelData,
	conveyExcelData as _conveyExcelData
} from './chart10_1'
import { chartPath } from '@/config/chart/constant'
const { chart }: any = useStore()

export default () => {
	return [
		titleOption({
			show: false
		}),
		canvasOption('#000'),
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
							name: 'A',
							children: [
								{
									name: 'AA',
									children: [
										{
											name: 'AAA',
											value: 2
										},
										{
											name: 'AAB',
											value: 1
										},
										{
											name: 'AAC',
											value: 1
										},
										{
											name: 'AAD',
											value: 0.5
										}
									]
								},
								{
									name: 'AB',
									value: 2
								}
							]
						},
						{
							name: 'B',
							children: [
								{
									name: 'BA',
									children: [
										{
											name: 'BAA',
											value: 2
										}
									]
								}
							]
						},
						{
							name: 'C',
							children: [
								{
									name: 'CA',
									children: [
										{
											name: 'CAA',
											value: 2
										}
									]
								}
							]
						},
						{
							name: 'D',
							children: [
								{
									name: 'DA',
									children: [
										{
											name: 'DAA',
											value: 1
										}
									]
								}
							]
						}
					],
					...sunburst_series(),
					label: sunburst_series_label(),
					itemStyle: sunburst_series_itemStyle({
						borderColor: '#000',
						borderWidth: 2
					}),
					levels: [
						{},
						{
							itemStyle: {
								color: '#9ee54a'
							}
						},
						{
							itemStyle: {
								color: '#38e1c5'
							}
						},
						{
							itemStyle: {
								color: '#2791ee'
							}
						}
					]
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

export const createExcelData = _createExcelData
export const conveyExcelData = _conveyExcelData
