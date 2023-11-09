import useStore from "@/store";
import titleOption from "@/chartConfig/commonParams/title";
import canvasOption from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import legendOption from "@/chartConfig/commonParams/legend";
import xAxisOption from "@/chartConfig/commonParams/xAxis";
import yAxisOption from "@/chartConfig/commonParams/yAxis";
import colorOption from "@/chartConfig/commonParams/color";
import { conveyToExcel } from "@/chartConfig/conveyUtils/conveyData";
import {bar_series_label} from "@/chartConfig/option";
import graphicOption from "@/chartConfig/commonParams/graphic";
import {chartPath} from "@/chartConfig/constant";

const common: any = useStore()

export default () => {
  return [
    titleOption({
      'show': false
    }),
    canvasOption(),
    gridOption(),
    legendOption(),
    graphicOption(),
    colorOption(),
    {
      name: 'dataset',
      opName: 'dataset',
      chartOption: true,
      menuOption: false,
      uniqueOption: false,
      defaultOption: {
        dataset: {
          source: [
            ['Mon', 120],
            ['Tue', 200],
            ['Wed', 150],
            ['Thu', 80],
            ['Fri', 70],
            ['Sat', 110],
            ['Sun', 130]
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
      componentPath: chartPath + 'paramsXAxis',
      defaultOption: {
        xAxis: [{
          ...xAxisOption(),
          type: 'category',
        }],
      }
    },
    {
      name: 'Y轴样式',
      opName: 'yAxis',
      chartOption: true,
      menuOption: true,
      icon: 'i_Y',
      componentPath: chartPath + 'paramsYAxis',
      defaultOption: {
        yAxis: [{
          ...yAxisOption(),
          type: 'value',
        }],
      }
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
            label: bar_series_label({
              'show': false
            }),
          }
        ]
      }
    },
    {
      name: '文本样式',
      opName: 'textStyle',
      chartOption: false,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_text',
      componentPath: chartPath + 'paramsBar/paramsBarText'
    },
  ]
}

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
// 收集数据并进行转换
export const conveyExcelData = (rows: any) => {
  if(!rows) return
  const seriesOptionItem = {
    type: 'bar',
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
      if (rows[i].cells[j].text == '') {
        datas.datasetData[i].push('')
      } else {
        datas.datasetData[i].push(isNaN(rows[i].cells[j].text) ? rows[i].cells[j].text : parseFloat(rows[i].cells[j].text))
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