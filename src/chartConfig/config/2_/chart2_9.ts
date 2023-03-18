import { markRaw } from "vue";
import lodash from 'lodash'
import useCommonStore from "@/store/common";
// 导入独立组件
import paramsBarSort from "@/views/ChartPanel/components/paramsBar/paramsBarSort.vue";
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
          type: 'category',
          axisLabel: { interval: 0, rotate: 30 }
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
            type: 'bar',
            encode: { x: 'name', y: 'score' },
            datasetIndex: 1
          }
        ]
      }
    },
    {
      name: '数据选项',
      opName: 'dataset',
      chartOption: true,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_bar',
      component: markRaw(paramsBarSort),
      allOption: {},
      defaultOption: {
        dataset: [
          {
            dimensions: ['name', 'age', 'profession', 'score', 'date'],
            source: [
              ['Hannah Krause', 41, 'Engineer', 314, '2011-02-12'],
              ['Zhao Qian', 20, 'Teacher', 351, '2011-03-01'],
              ['Jasmin Krause ', 52, 'Musician', 287, '2011-02-14'],
              ['Li Lei', 37, 'Teacher', 219, '2011-02-18'],
              ['Karle Neumann', 25, 'Engineer', 253, '2011-04-02'],
              ['Adrian Groß', 19, 'Teacher', '-', '2011-01-16'],
              ['Mia Neumann', 71, 'Engineer', 165, '2011-03-19'],
              ['Böhm Fuchs', 36, 'Musician', 318, '2011-02-24'],
              ['Han Meimei', 67, 'Engineer', 366, '2011-03-12']
            ]
          },
          {
            transform: {
              type: 'sort',
              config: { dimension: 'score', order: 'desc' }
            }
          }
        ],
      }
    },
  ]
}

export default getOption

export const createExcelData = (config: any) => {
  let excelData: any = {}
  excelData[0] = {
    cells: {
    }
  }

  let source = config.dataset[0].source
  let dimensions = config.dataset[0].dimensions
  for (let i = 0; i < dimensions.length; i++) {
    excelData[0].cells[i] = {
      text: dimensions[i]
    }
  }
  for (let i = 0; i < source.length; i++) {
    excelData[i + 1] = {
      cells: {
      }
    }
    for (let j = 0; j < source[i].length; j++) {
      excelData[i + 1].cells[j] = {
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
  while (i < rowsTLength) {
    dimensionsList.push(rows[0].cells[i].text)
    i++
  }
  i = 1

  let sourceLength = Object.keys(rows).length;

  while (i < sourceLength - 1) {
    let j = 0
    sourceList[i - 1] = []
    let itemLength = Object.keys(rows[i].cells).length;
    while (j < itemLength) {
      sourceList[i - 1].push(rows[i].cells[j].text)
      j++
    }
    i++
  }
  dataset[0].dimensions = dimensionsList
  dataset[0].source = sourceList
  dataObj = {
    dataset
  }
  console.log(dataObj);

  return dataObj
}