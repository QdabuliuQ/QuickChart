import { markRaw } from "vue";
import lodash from 'lodash'
import useCommonStore from "@/store/common";
// 导入独立组件
import paramsBarSort from "@/views/ChartPanel/components/paramsBar/paramsBarSort.vue";
import {
  asisOpNameList
} from "@/chartConfig/constant";
import titleOption from "@/chartConfig/commonParams/title";
import canvas from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import legendOption from "@/chartConfig/commonParams/legend";
import waterMark from "@/chartConfig/commonParams/waterMark";
import xAxis, { xAxisOption } from "@/chartConfig/commonParams/xAxis";
import yAxis, { yAxisOption } from "@/chartConfig/commonParams/yAxis";
import { conveyToExcel } from "@/chartConfig/conveyUtils/conveyData";

const common: any = useCommonStore()

const getOption = () => {
  let grid = gridOption()
  grid.defaultOption.grid.containLabel = true
  grid.allOption.grid.containLabel = true
  grid.defaultOption.grid.left = grid.allOption.grid.left = 30
  grid.defaultOption.grid.top = grid.allOption.grid.top = 60
  grid.defaultOption.grid.bottom = grid.allOption.grid.bottom = 30
  grid.defaultOption.grid.right = grid.allOption.grid.right = 60
  return [
    titleOption({
      'show': false
    }),
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

export function combineOption(data: any) {
  let dataset = common.option.dataset
  if(!data) return {}
  dataset[0].source = data.sourceData
  dataset[0].dimensions = data.dimenstionsData
  return {
    dataset
  }
}

export const createExcelData = (config: any) => {
  return conveyToExcel([
    {
      direction: 'row',
      data: config.dataset[0].dimensions,
      startRow: 0
    },
    {
      direction: 'col',
      data: config.dataset[0].source,
      startRow: 1
    },
  ])
}

export const conveyExcelData = (rows: any) => {
  if(!rows) return null
  let datas: any = {
    sourceData: <any>[],
    dimenstionsData: <any>[]
  }
  if(rows[0]) {
    let row1Length: number = Object.keys(rows[0].cells).length
    for(let i = 0; i < row1Length; i ++) {
      if(rows[0] && rows[0].cells && rows[0].cells[i] && rows[0].cells[i].text) {
        datas.dimenstionsData.push(rows[0].cells[i].text)
      } else break
    }
  }
  
  let length: number = Object.keys(rows).length
  outer: for(let i = 1; i < length; i ++) {
    if (!rows[i]) break
    for(let j = 0; j < Object.keys(rows[i].cells).length; j ++) {
      if(rows[i].cells && rows[i].cells[j] && rows[i].cells[j].text) {
        if(!datas.sourceData[i-1]) datas.sourceData[i-1] = []
        if (isNaN(rows[i].cells[j].text)) {
          datas.sourceData[datas.sourceData.length-1].push(rows[i].cells[j].text)
        } else {
          datas.sourceData[datas.sourceData.length-1].push(parseFloat(rows[i].cells[j].text))
        }
      } else break outer
    }
  }
  console.log(datas.sourceData);
  
  return datas
}