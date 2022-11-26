import { markRaw } from "vue";
import lodash from 'lodash'
import useCommonStore from "@/store/common";
// 导入独立组件
import paramsBarRank from "@/views/ChartPanel/components/paramsBarRank.vue";
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
grid.defaultOption.grid.top = grid.allOption.grid.top = 60
grid.defaultOption.grid.bottom = grid.allOption.grid.bottom = 30
grid.defaultOption.grid.right = grid.allOption.grid.right = 60

const allData = [
  [141, 138, 129, 109, 68],
  [161, 158, 149, 119, 88],
  [190, 198, 159, 129, 110],
  [210, 238, 180, 149, 138],
]

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
        animationDuration: 1100,
        animationDurationUpdate: 1100,
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
    chartOption: false,
    menuOption: true,
    uniqueOption: true,
    icon: 'i_params',
    component: markRaw(paramsBarRank),
    defaultOption: {
      allData,
    },
    allOption:{}
  }
]

export const createExcelData = (config: any) => {
  let excelData: any = {}
  excelData[0] = {
    cells: {
    }
  }
  
  let source = config.dataset[0].source
  let dimensions = config.dataset[0].dimensions
  for(let i = 0; i < dimensions.length; i ++) {
    excelData[0].cells[i] = {
      text: dimensions[i]
    }
  }
  for(let i = 0; i < source.length; i ++) {
    excelData[i+1] = {
      cells: {
      }
    }
    for(let j = 0; j < source[i].length; j ++) {
      excelData[i+1].cells[j] = {
        text: source[i][j]
      }
    }
  }
  return excelData
}

export const conveyExcelData = (rows: any) => {
  let dataset = lodash.cloneDeep(common.option.dataset)
  let dimensionsList: any[] = []
  let sourceList: any[] = []
  let dataObj: any = {}
  let i = 0
  let rowsTLength = Object.keys(rows[0].cells).length;
  while(i < rowsTLength) {
    dimensionsList.push(rows[0].cells[i].text)
    i ++
  }
  i = 1
  
  let sourceLength = Object.keys(rows).length;
  
  while(i < sourceLength - 1) {
    let j = 0
    sourceList[i-1] = []
    let itemLength = Object.keys(rows[i].cells).length;
    while(j < itemLength) {
      sourceList[i-1].push(rows[i].cells[j].text) 
      j ++
    }
    i ++
  }
  dataset[0].dimensions = dimensionsList
  dataset[0].source = sourceList
  dataObj = {
    dataset
  }
  console.log(dataObj);
  
  return dataObj
}