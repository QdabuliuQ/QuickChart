import useStore from '@/store'
import titleOption from '@/config/chart/commonParams/title'
import canvasOption from '@/config/chart/commonParams/canvas'
import gridOption from '@/config/chart/commonParams/grid'
import colorOption from '@/config/chart/commonParams/color'
import graphicOption from '@/config/chart/commonParams/graphic'
import legendOption from '@/config/chart/commonParams/legend'
import { conveyToExcel } from '@/config/chart/conveyUtils/conveyData'
import { chartPath } from '@/config/chart/constant'

const { chart }: any = useStore()

export default () => {
	return [
		titleOption({
			show: false
		}),
		canvasOption(),
		gridOption(),
		legendOption({
			show: true,
			left: '23%',
			icon: 'roundRect'
		}),
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
						['Visit', 60],
						['Inquiry', 40],
						['Order', 20],
						['Click', 80],
						['Show', 100]
					]
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
					type: 'funnel',
					min: 0,
					max: 100,
					minSize: '0%',
					maxSize: '100%',
					orient: 'vertical',
					sort: 'descending',
					left: '10%',
					right: '10%',
					top: '10%',
					bottom: '10%',
					funnelAlign: 'center',
					gap: 2,
					label: {
						show: true,
						position: 'inside',
						color: null,
						fontStyle: 'normal',
						fontWeight: 'normal',
						fontFamily: 'sans-serif',
						fontSize: 12
					},
					labelLine: {
						show: false,
						length: 10,
						lineStyle: {
							width: 1,
							type: 'solid',
							opacity: 1,
							color: '#000'
						}
					},
					itemStyle: {
						borderColor: '#fff',
						borderWidth: 1,
						borderType: 'solid',
						shadowBlur: 0,
						shadowColor: '',
						shadowOffsetX: 0,
						shadowOffsetY: 0,
						opacity: 1
					}
				}
			}
		},
		{
			name: '漏斗样式',
			opName: 'lineStyle',
			chartOption: false,
			menuOption: true,
			icon: 'i_funnel',
			componentPath: chartPath + 'paramsFunnel/paramsFunnelStyle'
		},
		{
			name: '文本样式',
			opName: 'label',
			chartOption: false,
			menuOption: true,
			icon: 'i_text',
			componentPath: chartPath + 'paramsFunnel/paramsFunnelLabel'
		},
		{
			name: '引导线样式',
			opName: 'labelLine',
			chartOption: false,
			menuOption: true,
			icon: 'i_gline',
			componentPath: chartPath + 'paramsFunnel/paramsFunnelLine'
		},
		{
			name: '图形样式',
			opName: 'itemStyle',
			chartOption: false,
			menuOption: true,
			icon: 'i_triangle',
			componentPath: chartPath + 'paramsFunnel/paramsFunnelItem'
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
			startCol: 0
		}
	])
}

export const conveyExcelData = (rows: any) => {
	if (!rows) return null
	const datas = {
		datasetData: <any>[]
	}
	const rowsLength = Object.keys(rows).length
	for (let i = 0; i < rowsLength; i++) {
		if (!rows[i] || JSON.stringify(rows[i].cells) == '{}') break
		if (!rows[i].cells[0] || !rows[i].cells[1]) break
		datas.datasetData.push([rows[i].cells[0].text, parseFloat(rows[i].cells[1].text)])
	}
	return datas
}
