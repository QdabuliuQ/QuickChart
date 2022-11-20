import { markRaw } from "vue";
import lodash from 'lodash'
import useCommonStore from "@/store/common";
// 导入独立组件
import { convey } from "@/chartConfig/conveyUtils/lineConvey";
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

grid.defaultOption.grid.containLabel = true
grid.allOption.grid.containLabel = true
grid.defaultOption.grid.left = grid.allOption.grid.left = 30
grid.defaultOption.grid.top = grid.allOption.grid.top = 30
grid.defaultOption.grid.bottom = grid.allOption.grid.bottom = 30
grid.defaultOption.grid.right = grid.allOption.grid.right = 60


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
        type: 'value',
      }],
    },
    allOption: {
      xAxis: [
        {
          ...xAxisOption,
          type: 'value',
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
        type: 'category',
        data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
      }],
    },
    allOption: {
      yAxis: [
        {
          ...yAxisOption,
          type: 'category',
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
          name: '2011',
          type: 'bar',
          data: [18203, 23489, 29034, 104970, 131744, 630230]
        },
        {
          name: '2012',
          type: 'bar',
          data: [19325, 23438, 31000, 121594, 134141, 681807]
        }
      ]
    }
  },
]

export const createExcelData = (config: any) => {
  let excelData: any = {}
  
  let series = config.series
  let yAxis = config.yAxis[0].data

  // 初始化
  for (let i = 0; i < yAxis.length + 1; i++) {
    excelData[i] = {
      cells: {}
    }
  }
  for (let i = 0; i < series.length; i++) {
    excelData[0].cells[i + 1] = {
      text: series[i].name
    }
  }

  for (let i = 0; i < yAxis.length; i++) {
    excelData[i + 1].cells[0] = {
      text: yAxis[i]
    }
    for (let j = 0; j < series.length; j++) {
      excelData[i + 1].cells[j + 1] = {
        text: series[j].data[i]
      }
    }
  }
  return excelData
}

export const conveyExcelData = (rows: any) => { 
  let yAxis = lodash.cloneDeep(common.option.yAxis)

  let res = convey(rows, {
    type: 'bar',
  })
  
  yAxis[0].data = res.category
  let dataObj: any = {
    yAxis,
    series: res.series
  }
  
  return dataObj
}