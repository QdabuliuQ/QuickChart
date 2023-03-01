import lodash from 'lodash'

export const create = (config: any) => {
  let excelData: any = {}
  let series = config.series[0].data

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


export const convey = (rows: any, seriesOption: any): {
  category: any,
  series: any
} => {
  let series = lodash.cloneDeep(seriesOption)
  let dataObj: any = {
    series
  }
  // 遍历数据项
  let rowsTLength = Object.keys(rows).length;
  dataObj.series[0].data = []

  for (let i = 0; i < rowsTLength - 1; i++) {
    dataObj.series[0].data.push({  // 创建series
      name: rows[i].cells[0] ? rows[i].cells[0].text : '',
      value: rows[i].cells[1] ? rows[i].cells[1].text : ''
    })
  }

  return dataObj
}