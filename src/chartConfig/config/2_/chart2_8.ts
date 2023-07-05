import useCommonStore from "@/store/common";
// 导入独立组件
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
  // let grid = gridOption()
  // grid.defaultOption.grid.containLabel = true
  // grid.allOption.grid.containLabel = true
  // grid.defaultOption.grid.left = grid.allOption.grid.left = 30
  // grid.defaultOption.grid.top = grid.allOption.grid.top = 30
  // grid.defaultOption.grid.bottom = grid.allOption.grid.bottom = 30
  // grid.defaultOption.grid.right = grid.allOption.grid.right = 60

  return [
    titleOption({
      'show': false
    }),
    canvas,
    gridOption({
      'containLabel': true
    }),
    legendOption({
      'left': 'center',
      'top': 5,
      'icon': 'roundRect',
    }),
    waterMark,
    {
      name: 'dataset',
      opName: 'dataset',
      chartOption: true,
      menuOption: false,
      uniqueOption: false,
      defaultOption: {
        dataset: {
          source: [
            ['items', 'Direct', 'Mail Ad', 'Affiliate Ad', 'Video Ad', 'Search Engine'],
            ['Mon', 320, 120, 220, 150, 820],
            ['Tue', 302, 132, 182, 212, 832],
            ['Wed', 301, 101, 191, 201, 901],
            ['Thu', 334, 134, 234, 154, 934],
            ['Fri', 390, 90, 290, 190, 1290],
            ['Sat', 330, 230, 330, 330, 1330],
            ['Sun', 320, 210, 310, 410, 1320]
          ]
        },
      },
      allOption: {},
    },
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
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
          },
          {
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
          },
          {
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
          },
          {
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
          },
          {
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
          }
        ]
      }
    },
  ]
}

export default getOption

export function combineOption(data: any) {
  let series = common.option.series
  let dataset = common.option.dataset
  series = data.seriesData
  dataset.source = data.datasetData
  return {
    series,
    dataset
  }
}

export const createExcelData = (config: any) => {
  return conveyToExcel([
    {
      direction: 'col',
      data: config.dataset.source,
      startRow: 0,
      startCol: 0
    }
  ])
}

export const conveyExcelData = (rows: any) => {
  if(!rows) return null
  const seriesOptionItem = {
    type: 'bar',
    stack: 'total',
    label: {
      show: true
    },
    emphasis: {
      focus: 'series'
    },
  }
  let datas = {
    datasetData: <any>[],
    seriesData: <any>[]
  }
  let length: number = Object.keys(rows).length
  for(let i = 0; i < length; i ++) {
    if(JSON.stringify(rows[i].cells) == '{}') break
    datas.datasetData[i] = []
    let rowsLength: number = Object.keys(rows[i].cells).length
    for(let j = 0; j < rowsLength; j ++) {
      if (i == 0) {
        datas.datasetData[i].push(rows[i].cells[j].text)
      } else {
        if (rows[i].cells[j].text == '') {
          datas.datasetData[i].push('')
        } else {
          datas.datasetData[i].push(isNaN(rows[i].cells[j].text) ? rows[i].cells[j].text : parseFloat(rows[i].cells[j].text))
        }
      }
    }
  }
  
  if(datas.datasetData.length) {
    for(let i = 0; i < datas.datasetData[0].length-1; i ++) {
      datas.seriesData.push(seriesOptionItem)
    }
  }
  return datas
}