import useCommonStore from "@/store/common";
import titleOption from "@/chartConfig/commonParams/title";
import canvasOption from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import legendOption from "@/chartConfig/commonParams/legend";
import colorOption from "@/chartConfig/commonParams/color";
import xAxisOption from "@/chartConfig/commonParams/xAxis";
import yAxisOption from "@/chartConfig/commonParams/yAxis";
import { conveyToExcel } from '@/chartConfig/conveyUtils/conveyData';
import { line_series, line_series_label } from "@/chartConfig/option";
import graphicOption from "@/chartConfig/commonParams/graphic";
import {chartPath} from "@/chartConfig/constant";

const common: any = useCommonStore()
const lineSeriesOption = line_series({
  'symbolSize': 10,
  'symbol': 'circle',
  'smooth': true,
  'lineStyle.width': 3,
  'lineStyle.shadowColor': 'rgba(0,0,0,0.3)',
  'lineStyle.shadowBlur': 10,
  'lineStyle.shadowOffsetY': 8
}), lineSeriesLabelOption = line_series_label()

export default () => {
  return [
    titleOption({
      'show': false
    }),
    canvasOption(),
    gridOption(),
    legendOption({
      'show': true,
      'top': '2%',
      'left': '16%',
      'icon': 'pin',
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
            ['item', 'Altitude (km) vs. temperature (°C)'],
            ['0', 15],
            ['10km', -50],
            ['20km', -56.5],
            ['30km', -46.5],
            ['40km', -22.1],
            ['50km', -2.5],
            ['60km', -27.7],
            ['70km', -55.7],
            ['80km', -76.5],
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
          type: 'value',
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
          ...yAxisOption({
            "axisLine.onZero": false
          }),
          type: 'category',
          boundaryGap: false,
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
            type: 'line',
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
      componentPath: chartPath + 'paramsLine/paramsLineStyle'
    },
    {
      name: '字体样式',
      opName: 'textStyle',
      chartOption: false,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_text',
      componentPath: chartPath + 'paramsLine/paramsLineText'
    },
  ]
}

export function combineOption(data: any) {
  let dataset = common.option.dataset
  dataset.source = data.datasetData
  return {
    dataset,
    series: data.seriesData
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
  let datas = {
    datasetData: <any>[],
    seriesData: <any>[]
  }
  const seriesOptionItem = options.series[0] ?? null
  let length: number = Object.keys(rows).length
  for(let i = 0; i < length; i ++) {
    if (JSON.stringify(rows[i].cells) == '{}') break
    datas.datasetData[i] = []
    let rowsLength: number = Object.keys(rows[i].cells).length
    for(let j = 0; j < rowsLength; j ++) {
      datas.datasetData[i].push(isNaN(rows[i].cells[j].text) ? rows[i].cells[j].text : parseFloat(rows[i].cells[j].text))
    }
  }
  
  if (datas.datasetData.length) {
    for(let i = 0; i < datas.datasetData[0].length-1; i ++) {
      datas.seriesData.push(seriesOptionItem)
    }
  }
  return datas
}