import lodash from 'lodash'

export const create = (config: any) => {
  let excelData: any = {}
  console.log(config);
  
  let series = config.series
  let xAxis = config.xAxis[0].data

  // 初始化
  for (let i = 0; i < xAxis.length + 1; i++) {
    excelData[i] = {
      cells: {}
    }
  }
  for (let i = 0; i < series.length; i++) {
    excelData[0].cells[i + 1] = {
      text: series[i].name
    }
  }

  for (let i = 0; i < xAxis.length; i++) {
    excelData[i + 1].cells[0] = {
      text: xAxis[i]
    }
    for (let j = 0; j < series.length; j++) {
      excelData[i + 1].cells[j + 1] = {
        text: series[j].data[i]
      }
    }
  }
  return excelData
}

export const convey = (rows: any, seriesOption: any): {
  category: any,
  series: any
} => {
  let data = {
    category: <any>[],
    series: <any>[]
  }

  let rowsTLength = Object.keys(rows[0].cells).length;

  for (let i = 1; i <= rowsTLength; i++) {
    data.series.push({  // 创建series
      name: rows[0].cells[i].text,
      data: [],
      ...lodash.cloneDeep(seriesOption)
    })
  }

  let rowsALength = Object.keys(rows).length - 1;
  for (let i = 1; i < rowsALength; i++) {
    let rowsItemLength = Object.keys(rows[i].cells).length;
    data.category.push(rows[i].cells[0] ? rows[i].cells[0].text : '')
    // 将对应数据放入series当中
    for (let j = 1; j < rowsItemLength; j++) {
      if (!data.series[j - 1]) {
        data.series[j - 1] = {
          name: '',
          data: [],
          ...lodash.cloneDeep(seriesOption)
        }
      }
      data.series[j - 1].data.push(rows[i].cells[j].text)
    }
  }

  return data
}