import useCommonStore from "@/store/common";
import titleOption from "@/chartConfig/commonParams/title";
import canvasOption from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import legendOption from "@/chartConfig/commonParams/legend";
import xAxisOption from "@/chartConfig/commonParams/xAxis";
import yAxisOption from "@/chartConfig/commonParams/yAxis";
import { line_series, line_series_label } from "@/chartConfig/option";
import { conveyToExcel } from "@/chartConfig/conveyUtils/conveyData";
import colorOption from "@/chartConfig/commonParams/color";
import graphicOption from "@/chartConfig/commonParams/graphic";
import {chartPath} from "@/chartConfig/constant";

const common: any = useCommonStore()
const lineSeriesOption = line_series(), lineSeriesLabelOption = line_series_label()
const getOption = () => {
  return [
    titleOption({
      'show': false
    }),
    canvasOption(),
    gridOption({
      'right': '5%'
    }),
    legendOption({
      'left': '2%',
      'top': '2%'
    }),
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
            ['items', 'Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
            ['Mon', 120, 220, 150, 320, 820],
            ['Tue', 132, 182, 232, 332, 932],
            ['Wed', 101, 191, 201, 301, 901],
            ['Thu', 134, 234, 154, 334, 934],
            ['Fri', 90, 290, 190, 390, 1290],
            ['Sat', 230, 330, 330, 330, 1330],
            ['Sun', 210, 310, 410, 320, 1320],
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
      componentPath: chartPath +  'paramsXAxis',
      defaultOption: {
        xAxis: [{
          ...xAxisOption(),
          boundaryGap: false,
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
      componentPath: chartPath +  'paramsYAxis',
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
            ...lineSeriesOption,
            label: {
              ...lineSeriesLabelOption
            },
            stack: 'Total',
          },
          {
            type: 'line',
            ...lineSeriesOption,
            label: {
              ...lineSeriesLabelOption
            },
            stack: 'Total',
          },
          {
            type: 'line',
            ...lineSeriesOption,
            label: {
              ...lineSeriesLabelOption
            },
            stack: 'Total',
          },
          {
            type: 'line',
            ...lineSeriesOption,
            label: {
              ...lineSeriesLabelOption
            },
            stack: 'Total',
          },
          {
            type: 'line',
            ...lineSeriesOption,
            label: {
              ...lineSeriesLabelOption
            },
            stack: 'Total',
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
      componentPath: chartPath + 'paramsLine/paramsLineStyle'
    },
    {
      name: '字体样式',
      opName: 'textStyle',
      chartOption: false,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_text',
      componentPath: chartPath +  'paramsLine/paramsLineText'
    },
  ]
}
export default getOption

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