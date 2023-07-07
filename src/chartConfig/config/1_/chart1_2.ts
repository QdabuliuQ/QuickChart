import useCommonStore from "@/store/common";
import {
  asisOpNameList
} from "@/chartConfig/constant";
import titleOption from "@/chartConfig/commonParams/title";
import canvas from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import legendOption from "@/chartConfig/commonParams/legend";
import color from "@/chartConfig/commonParams/color";
import xAxisOption from "@/chartConfig/commonParams/xAxis";
import yAxisOption from "@/chartConfig/commonParams/yAxis";
import { line_series, line_series_label } from "@/chartConfig/option";
import { conveyToExcel } from "@/chartConfig/conveyUtils/conveyData";

const common: any = useCommonStore()
const lineSeriesOption = line_series({
  'smooth': true
}), lineSeriesLabelOption = line_series_label()

export default () => {
  return [
    titleOption({
      'show': false
    }),
    canvas,
    gridOption(),
    legendOption({
      'show': false
    }),
    color,
    {
      name: 'dataset',
      opName: 'dataset',
      chartOption: true,
      menuOption: false,
      uniqueOption: false,
      defaultOption: {
        dataset: {
          source: [
            ['items', '系列一'],
            ['Mon', 820],
            ['Tue', 932],
            ['Wed', 901],
            ['Thu', 934],
            ['Fri', 1290],
            ['Sat', 1330],
            ['Sun', 1320],
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
      componentPath: 'paramsXAxis.vue',
      defaultOption: {
        xAxis: [{
          ...xAxisOption(),
          type: 'category',
        }],
      },
    },
    {
      name: 'Y轴样式',
      opName: 'yAxis',
      chartOption: true,
      menuOption: true,
      icon: 'i_Y',
      componentPath: 'paramsYAxis.vue',
      defaultOption: {
        yAxis: [{
          ...yAxisOption(),
          type: 'value',
        }],
      },
    },
    {
      name: '数据',
      opName: 'series',
      chartOption: true,
      menuOption: false,
      defaultOption: {
        series: [
          {
            type: 'line',
            smooth: true,
            ...lineSeriesOption,
            label: {
              ...lineSeriesLabelOption
            }
          }
        ]
      },
    },
    {
      name: '线段样式',
      opName: 'lineStyle',
      chartOption: false,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_line',
      componentPath: 'paramsLine/paramsLineStyle.vue'
    },
    {
      name: '字体样式',
      opName: 'textStyle',
      chartOption: false,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_text',
      componentPath: 'paramsLine/paramsLineText.vue'
    },
  ]
}

export function combineOption(data: any) {
  let dataset = common.option.dataset
  let series = common.option.series
  dataset.source = data.datasetData
  series = data.seriesData
  return {
    dataset,
    series
  }
}

export const createExcelData = (config: any) => {
  return conveyToExcel([
    {
      direction: 'col',
      data: config.dataset.source,
      startRow: 0
    }
  ])
}

// 收集数据并进行转换
export const conveyExcelData = (rows: any, options: any) => {
  if (!rows) return null
  const seriesOptionItem = options.series[0]
  let datas = {
    datasetData: <any>[],
    seriesData: <any>[]
  }
  let length: number = Object.keys(rows).length
  for(let i = 0; i < length; i ++) {
    if (JSON.stringify(rows[i].cells) == '{}') break
    datas.datasetData[i] = []
    let rowsLength: number = Object.keys(rows[i].cells).length
    for(let j = 0; j < rowsLength; j ++) {
      datas.datasetData[i].push(isNaN(rows[i].cells[j].text) ? rows[i].cells[j].text : parseFloat(rows[i].cells[j].text))
    }
  }
  if(datas.datasetData.length) {
    for(let i = 0; i < datas.datasetData[0].length-1; i ++) {
      datas.seriesData.push(seriesOptionItem)
    }
  }
  return datas
}