import { markRaw } from "vue";
import lodash from 'lodash'
import useCommonStore from "@/store/common";
// 导入独立组件
import paramsBarColor from "@/views/ChartPanel/components/paramsBar/paramsBarColor.vue";

import {
  asisOpNameList
} from "@/chartConfig/constant";
import title from "@/chartConfig/commonParams/title";
import canvas from "@/chartConfig/commonParams/canvas";
import grid from "@/chartConfig/commonParams/grid";
import legend from "@/chartConfig/commonParams/legend";
import waterMark from "@/chartConfig/commonParams/waterMark";
import xAxis, { xAxisOption } from "@/chartConfig/commonParams/xAxis";
import yAxis, { yAxisOption } from "@/chartConfig/commonParams/yAxis";

const common: any = useCommonStore()

export default [
  title,
  canvas,
  grid,
  legend,
  waterMark,
  {
    name: 'X轴样式',
    opName: 'xAxis',
    chartOption: true,
    menuOption: true,
    icon: 'i_X',
    defaultOption: {
      xAxis: [{
        ...xAxis,
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }],
    },
    allOption: {
      xAxis: [
        {
          ...xAxisOption,
          type: 'category',
        }
      ]
    },
    opNameList: asisOpNameList
  },
  {
    name: 'Y轴样式',
    opName: 'yAxis',
    chartOption: true,
    menuOption: true,
    icon: 'i_Y',
    defaultOption: {
      yAxis: [{
        ...yAxis,
        type: 'value',
      }],
    },
    allOption: {
      yAxis: [
        {
          ...yAxisOption,
          type: 'value',
        }
      ]
    },
    opNameList: asisOpNameList
  },
  {
    name: '数据',
    opName: 'series',
    chartOption: true,
    menuOption: false,
    defaultOption: {
      series: [
        {
          name: '系列一',
          data: [
            {
              value: 100,
              itemStyle: {
              }
            },
            {
              value: 200,
              itemStyle: {
                color: '#a90000'
              }
            },
            {
              value: 150,
              itemStyle: {
              }
            },
            {
              value: 80,
              itemStyle: {
              }
            },
            {
              value: 70,
              itemStyle: {
              }
            },
            {
              value: 110,
              itemStyle: {
              }
            },
            {
              value:130,
              itemStyle: {
              }
            },
            
          ],
          type: 'bar',
        }
      ]
    }
  },
  {
    name: '柱体样式',
    opName: 'barStyle',
    chartOption: false,
    menuOption: true,
    uniqueOption: true,
    icon: 'i_bar',
    component: markRaw(paramsBarColor),
    allOption: {}
  }
]

export const createExcelData = (config: any) => {
  let excelData: any = {}

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
        text: series[j].data[i] ? series[j].data[i].value : ''
      }
    }
  }
  return excelData
}

// 收集数据并进行转换
export const conveyExcelData = (rows: any) => {
  let series = lodash.cloneDeep(common.option.series)
  let xAxis = lodash.cloneDeep(common.option.xAxis)
  let data = []
  console.log(common.option.series, '---');
  
  let dataObj: any = {
    xAxis,
    series: []
  }
  // 遍历数据项
  let rowsTLength = Object.keys(rows[0].cells).length;

  for (let i = 1; i <= rowsTLength; i++) {
    dataObj.series.push({  // 创建series
      name: rows[0].cells[i].text,
      data: series[i - 1] ? series[i - 1].data : [],
      type: 'bar',
    })
    
  }
  let rowsALength = Object.keys(rows).length - 1;
  for (let i = 1; i < rowsALength; i++) {
    let rowsItemLength = Object.keys(rows[i].cells).length;
    
    // dataObj.categoryData.push(rows[i].cells[0].text)
    data.push(rows[i].cells[0].text)

    // 将对应数据放入series当中
    for (let j = 1; j < rowsItemLength; j++) {
      if (!dataObj.series[j - 1]) {
        dataObj.series[j - 1] = {  // 创建series
          name: rows[0].cells[i] ? rows[0].cells[i].text : '',
          data: [],
          type: 'bar',
        }
      }
      if (dataObj.series[j - 1].data[i - 1]) {
        dataObj.series[j - 1].data[i - 1].value = rows[i].cells[j].text
      } else {
        dataObj.series[j - 1].data[i - 1] = {
          value: rows[i].cells[j].text,
          itemStyle: {
          }
        }
      }
    }
  }
  dataObj.xAxis[0].data = data
  
  return dataObj
}