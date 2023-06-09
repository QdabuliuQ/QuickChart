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
import gridOption from "@/chartConfig/commonParams/grid";
import legendOption from "@/chartConfig/commonParams/legend";
import waterMark from "@/chartConfig/commonParams/waterMark";
import xAxis, { xAxisOption } from "@/chartConfig/commonParams/xAxis";
import yAxis, { yAxisOption } from "@/chartConfig/commonParams/yAxis";

const common: any = useCommonStore()

const getOption = () => {
  title.defaultOption.title.show = false
  let grid = gridOption()
  grid.defaultOption.grid.containLabel = true
  grid.allOption.grid.containLabel = true
  grid.defaultOption.grid.left = grid.allOption.grid.left = 30
  grid.defaultOption.grid.top = grid.allOption.grid.top = 30
  grid.defaultOption.grid.bottom = grid.allOption.grid.bottom = 30
  grid.defaultOption.grid.right = grid.allOption.grid.right = 60

  return [
    title,
    canvas,
    grid,
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
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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
            name: 'Direct',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [320, 302, 301, 334, 390, 330, 320]
          },
          {
            name: 'Mail Ad',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Affiliate Ad',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'Video Ad',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [150, 212, 201, 154, 190, 330, 410]
          },
          {
            name: 'Search Engine',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [820, 832, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    },
  ]
}

export default getOption

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
    stack: 'total',
    label: {
      show: true
    },
    emphasis: {
      focus: 'series'
    },
  })

  yAxis[0].data = res.category
  let dataObj: any = {
    yAxis,
    series: res.series
  }

  return dataObj
}