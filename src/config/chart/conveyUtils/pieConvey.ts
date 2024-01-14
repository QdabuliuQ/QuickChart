import lodash from 'lodash'

export const create = (config: any, middleWare?: (prop: any) => any) => {
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
		excelData[i].cells[0].text = series[i].name
		excelData[i].cells[1].text = series[i].value
	}
	return excelData
}

export const convey = (
	rows: any,
	seriesOption: any,
	middleWare?: (prop: any) => any
): {
	category: any
	series: any
} => {
	const series = lodash.cloneDeep(seriesOption)
	const dataObj: any = {
		series
	}
	// 遍历数据项
	const rowsTLength = Object.keys(rows).length
	dataObj.series[0].data = []

	for (let i = 0; i < rowsTLength - 1; i++) {
		dataObj.series[0].data.push({
			// 创建series
			name: rows[i] && rows[i].cells[0] ? rows[i].cells[0].text : '',
			value: rows[i] && rows[i].cells[1] ? rows[i].cells[1].text : ''
		})
	}

	return middleWare ? middleWare(dataObj) : dataObj
}
