import { markRaw } from "vue";
import lodash from 'lodash'
import useCommonStore from "@/store/common";
// 导入独立组件
import paramsBarRank from "@/views/ChartPanel/components/paramsBar/paramsBarRank.vue";
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

const allData = [
  [141, 138, 129, 109, 68],
  [161, 158, 149, 119, 88],
  [190, 198, 159, 129, 110],
  [210, 238, 180, 149, 138],
]

const getOption = () => {
  grid.defaultOption.grid.containLabel = true
  grid.allOption.grid.containLabel = true
  grid.defaultOption.grid.left = grid.allOption.grid.left = 30
  grid.defaultOption.grid.top = grid.allOption.grid.top = 60
  grid.defaultOption.grid.bottom = grid.allOption.grid.bottom = 30
  grid.defaultOption.grid.right = grid.allOption.grid.right = 60
  return [
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
          max: 'dataMax'
        }],
      },
      allOption: {
        xAxis: [
          {
            ...xAxisOption,
            max: 'dataMax'
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
          data: ['A', 'B', 'C', 'D', 'E'],
          inverse: true,
          animationDuration: 300,
          animationDurationUpdate: 300,
          max: 4
        }],
      },
      allOption: {
        yAxis: [
          {
            ...yAxisOption,
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
            realtimeSort: true,
            type: 'bar',
            data: allData[0],
            label: {
              show: true,
              position: 'right',
              valueAnimation: true
            }
          }
        ]
      }
    },
    {
      name: '所有数据',
      opName: 'allData',
      chartOption: true,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_params',
      component: markRaw(paramsBarRank),
      defaultOption: {
        allData,
      },
      allOption: {}
    }
  ]
}

export default getOption

export const createExcelData = (config: any) => {
  let excelData: any = {}
  excelData[0] = {
    cells: {
    }
  }


  let yAxis = config.yAxis[0].data
  let allData = config.allData
  for (let i = 0; i < yAxis.length; i++) {
    excelData[0].cells[i] = {
      text: yAxis[i]
    }
  }

  for (let i = 0; i < allData.length; i++) {
    for (let j = 0; j < allData[i].length; j++) {
      if (!excelData[i + 1]) {
        excelData[i + 1] = {
          cells: {
            [j]: {
              text: allData[i][j]
            }
          }
        }
      } else {
        excelData[i + 1].cells[j] = {
          text: allData[i][j]
        }
      }
    }
  }

  return excelData
}

export const conveyExcelData = (rows: any) => {
  console.log(rows);

  let yAxis = lodash.cloneDeep(common.option.yAxis)
  let r1Length = Object.keys(rows[0].cells).length;
  let r2Length = Object.keys(rows).length
  console.log(r2Length);

  let yData = [], aData = []
  for (let i = 0; i < r1Length; i++) {
    yData.push(rows[0].cells[i] ? rows[0].cells[i].text : '')
  }
  yAxis[0].data = yData
  for (let i = 1; i < r2Length - 1; i++) {
    let l = Object.keys(rows[i].cells).length
    let arr = []
    for (let j = 0; j < l; j++) {
      arr.push(rows[i].cells[j] ? parseInt(rows[i].cells[j].text) : '')
    }
    aData.push(arr)
  }

  let dataObj = {
    allData: aData,
    yAxis
  }
  return dataObj
}