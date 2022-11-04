import {
  asisOpNameList
} from "@/chartConfig/constant";
import { create } from "@/chartConfig/conveyUtils/lineConvey";
import title from "@/chartConfig/commonParams/title";
import canvas from "@/chartConfig/commonParams/canvas";
import grid from "@/chartConfig/commonParams/grid";
import legend from "@/chartConfig/commonParams/legend";
import waterMark from "@/chartConfig/commonParams/waterMark";
import color from "@/chartConfig/commonParams/color";
import xAxis, { xAxisOption } from "@/chartConfig/commonParams/xAxis";
import yAxis, { yAxisOption } from "@/chartConfig/commonParams/yAxis";

const config = [
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
    menuOption: true,
    defaultOption: {
      series: [
        {
          name: '系列一',
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
        }
      ]
    },
  },
]

// 创建初始数据
export const createExcelData = create

// 收集数据并进行转换
export const conveyExcelData = (rows: any) => {
  let dataObj: any = {
    categoryData: [],
    series: []
  }
  // 遍历数据项
  let rowsTLength = Object.keys(rows[0].cells).length;

  for (let i = 1; i <= rowsTLength; i++) {
    dataObj.series.push({  // 创建series
      name: rows[0].cells[i].text,
      data: [],
      type: 'line'
    })
  }
  let rowsALength = Object.keys(rows).length - 1;
  for (let i = 1; i < rowsALength; i++) {
    let rowsItemLength = Object.keys(rows[i].cells).length;
    dataObj.categoryData.push(rows[i].cells[0].text)
    // 将对应数据放入series当中
    for (let j = 1; j < rowsItemLength; j++) {
      dataObj.series[j - 1].data.push(rows[i].cells[j].text)
    }
  }
  return dataObj
}

export default config