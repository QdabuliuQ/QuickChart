import lodash from 'lodash'
import useCommonStore from "@/store/common";
import { create, convey } from "@/chartConfig/conveyUtils/lineConvey";
import {
  asisOpNameList
} from "@/chartConfig/constant";
import title from "@/chartConfig/commonParams/title";
import canvas from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import legendOption from "@/chartConfig/commonParams/legend";
import waterMark from "@/chartConfig/commonParams/waterMark";
import xAxis, { xAxisOption } from "@/chartConfig/commonParams/xAxis";
import yAxis, { yAxisOption } from "@/chartConfig/commonParams/yAxis";

const common: any = useCommonStore()

export default [
  title,
  canvas,
  gridOption(),
  legendOption(),
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
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
        }
      ]
    }
  },
]

export const createExcelData = create
// 收集数据并进行转换
export const conveyExcelData = (rows: any) => {
  let xAxis = common.option.xAxis
  let res = convey(rows, {
    type: 'bar',
  })

  xAxis[0].data = res.category
  let dataObj: any = {
    xAxis,
    series: res.series
  }

  return dataObj
}