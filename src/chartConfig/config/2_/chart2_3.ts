import useCommonStore from "@/store/common";
import titleOption from "@/chartConfig/commonParams/title";
import canvas from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import legendOption from "@/chartConfig/commonParams/legend";
import waterMark from "@/chartConfig/commonParams/waterMark";
import xAxis, { xAxisOption } from "@/chartConfig/commonParams/xAxis";
import yAxis, { yAxisOption } from "@/chartConfig/commonParams/yAxis";
import { conveyToExcel } from "@/chartConfig/conveyUtils/conveyData";
import {
  asisOpNameList
} from "@/chartConfig/constant";
const common: any = useCommonStore()

const getOption = () => {
  let grid = gridOption()
  grid.defaultOption.grid.containLabel = true
  grid.defaultOption.grid.top = 40
  grid.defaultOption.grid.left = 20
  grid.defaultOption.grid.right = 20
  grid.defaultOption.grid.bottom = 20
  return [
    titleOption({
      'show': false
    }),
    canvas,
    grid,
    legendOption({
      'left': 'center',
      'top': 5,
      'icon': 'roundRect'
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
            ['items', 'Profit', 'Income', 'Expenses'],
            ['Mon', 200, 320, -120],
            ['Tue', 170, 302, -132],
            ['Wed', 240, 341, -101],
            ['Thu', 244, 374, -134],
            ['Fri', 200, 390, -190],
            ['Sat', 220, 450, -230],
            ['Sun', 210, 420, -210],
          ]
        },
      },
      allOption: {},
    },
    {
      name: 'X轴样式',
      opName: 'xAxis',
      chartOption: true,
      menuOption: false,
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
      menuOption: true,
      defaultOption: {
        series: [
          {
            type: 'bar',
            label: {
              show: true,
              position: 'inside'
            },
          },
          {
            type: 'bar',
            label: {
              show: true,
              position: 'inside'
            },
          },
          {
            type: 'bar',
            label: {
              show: true,
              position: 'inside'
            },
          },
        ]
      },
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
      startCol: 0,
    },
  ])
}

export const conveyExcelData = (rows: any) => {
  if(!rows) return null
  const seriesOptionItem = {
    type: 'bar',
    label: {
      show: true,
      position: 'inside'
    },
  }
  let datas = {
    datasetData: <any>[],
    seriesData: <any>[]
  }
  let length: number = Object.keys(rows).length
  for (let i = 0; i < length; i++) {
    if (JSON.stringify(rows[i].cells) == '{}') break
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