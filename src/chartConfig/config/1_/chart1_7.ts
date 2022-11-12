import lodash from 'lodash'
import useCommonStore from "@/store/common";
import { convey } from "@/chartConfig/conveyUtils/lineConvey";
import {
  asisOpNameList
} from "@/chartConfig/constant";
import title from "@/chartConfig/commonParams/title";
import canvas from "@/chartConfig/commonParams/canvas";
import grid from "@/chartConfig/commonParams/grid";
import legend from "@/chartConfig/commonParams/legend";
import waterMark from "@/chartConfig/commonParams/waterMark";
import color from "@/chartConfig/commonParams/color";
import xAxis, { xAxisOption } from "@/chartConfig/commonParams/xAxis";
import yAxis, { yAxisOption } from "@/chartConfig/commonParams/yAxis";

const common: any = useCommonStore()

export default [
  title,
  canvas,
  grid,
  legend,
  waterMark,
  color,
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
        axisLine: { onZero: false },
        boundaryGap: false,
        data: ['0℃', '10℃', '20℃', '30℃', '40℃', '50℃', '60℃', '70℃', '80℃']
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
    menuOption: true,
    defaultOption: {
      series: [
        {
          name: '系列一',
          type: 'line',
          symbolSize: 10,
          symbol: 'circle',
          smooth: true,
          lineStyle: {
            width: 3,
            shadowColor: 'rgba(0,0,0,0.3)',
            shadowBlur: 10,
            shadowOffsetY: 8
          },
          data: [15, -50, -56.5, -46.5, -22.1, -2.5, -27.7, -55.7, -76.5]
        }
      ]
    },
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

// 收集数据并进行转换
export const conveyExcelData = (rows: any) => {
  let yAxis = common.option.yAxis

  let res = convey(rows, {
    type: 'line',
    symbolSize: 10,
    symbol: 'circle',
    smooth: true,
    lineStyle: {
      width: 3,
      shadowColor: 'rgba(0,0,0,0.3)',
      shadowBlur: 10,
      shadowOffsetY: 8
    },
  })
  
  yAxis[0].data = res.category
  
  let dataObj = {
    yAxis,
    series: res.series
  }

  return dataObj
}