import { create } from "@/chartConfig/conveyUtils/lineConvey";
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

export default [
  title,
  canvas,
  grid,
  color,
  waterMark,
  {
    name: 'X轴样式',
    opName: 'xAxis',
    chartOption: true,
    menuOption: false,
    icon: 'i_X',
    defaultOption: {
      xAxis: [
        {
          type: 'value'
        }
      ],
    },
    allOption: {
      xAxis: [
        {
          type: 'value'
        }
      ]
    },
    opNameList: asisOpNameList
  },
  {
    name: 'Y轴样式',
    opName: 'yAxis',
    chartOption: true,
    menuOption: false,
    icon: 'i_Y',
    defaultOption: {
      yAxis: [
        {
          type: 'value'
        }
      ],
    },
    allOption: {
      yAxis: [
        {
          type: 'value'
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
          data: [
            [10, 40],
            [50, 100],
            [40, 20]
          ],
          type: 'line'
        },
      ]
    },
  },
]

export const createExcelData = (config: any) => {
  let excelData: any = {}

  let series = config.series[0].data

  // 初始化
  for (let i = 0; i < series.length + 1; i++) {
    excelData[i] = {
      cells: {}
    }
  }
  excelData[0].cells[0] = {
    text: 'X坐标',
  }
  excelData[0].cells[1] = {
    text: 'Y坐标',
  }

  for (let i = 0; i < series.length; i++) {
    excelData[i + 1].cells[0] = {
      text: series[i][0],
    }
    excelData[i + 1].cells[1] = {
      text: series[i][1],
    }
  }

  return excelData
}
// 收集数据并进行转换
export const conveyExcelData = (rows: any) => {
  let dataObj: any = {
    categoryData: [],
    series: []
  }
  dataObj.series[0] = {
    name: '系列一',
    data: [
    ],
    type: 'line'
  }
  // 遍历数据项

  let index = 1
  while (rows[index]) {
    dataObj.series[0].data.push([
      rows[index].cells[0]?.text,
      rows[index].cells[1]?.text,
    ])
    index++
  }

  console.log(dataObj);
  return dataObj
}