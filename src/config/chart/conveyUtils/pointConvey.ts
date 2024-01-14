import lodash from 'lodash'

export const create = (config: any, middleWare?: (prop: any) => void) => {
	const excelData: any = {}
	const series = middleWare ? middleWare(config.series[0].data) : config.series[0].data
	// 初始化
	for (let i = 0; i < series.length; i++) {
		excelData[i] = {
			cells: {
				0: {},
				1: {}
			}
		}
		excelData[i].cells[0].text = series[i][0]
		excelData[i].cells[1].text = series[i][1]
	}
	return excelData
}

export const convey = (rows: any, seriesOption: any, middleWare?: (prop: any) => void) => {
	const series = lodash.cloneDeep(seriesOption)
	const dataObj: any = {
		series
	}
	dataObj.series[0].data = []
	const rowsTLength = Object.keys(rows).length
	for (let i = 0; i < rowsTLength - 1; i++) {
		dataObj.series[0].data.push([
			// 创建series
			rows[i] && rows[i].cells[0] ? rows[i].cells[0].text : '',
			rows[i] && rows[i].cells[1] ? rows[i].cells[1].text : ''
		])
	}
	return middleWare ? middleWare(dataObj) : dataObj
}
