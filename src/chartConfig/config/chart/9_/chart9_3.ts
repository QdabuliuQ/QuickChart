import useCommonStore from "@/store/common";
import titleOption from "@/chartConfig/commonParams/title";
import canvasOption from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import colorOption from "@/chartConfig/commonParams/color";
import graphicOption from "@/chartConfig/commonParams/graphic";
import legendOption from "@/chartConfig/commonParams/legend";
import {
  gauge_series, gauge_series_axisLabel,
  gauge_series_axisLine,
  gauge_series_axisTick, gauge_series_detail, gauge_series_pointer,
  gauge_series_progress,
  gauge_series_splitLine
} from "@/chartConfig/option";
import {
  createExcelData as _createExcelData,
  conveyExcelData as _conveyExcelData
} from './chart9_1'
import {chartPath} from "@/chartConfig/constant";

const common: any = useCommonStore()

export default () => {
  return [
    titleOption({
      'show': false
    }),
    canvasOption(),
    gridOption(),
    legendOption({
      'show': true,
      'left': '23%',
      'icon': 'roundRect'
    }),
    graphicOption(),
    colorOption(),
    {
      name: 'series',
      opName: 'series',
      chartOption: true,
      menuOption: false,
      uniqueOption: false,
      defaultOption: {
        series: {
          type: 'gauge',
          ...gauge_series({
            'radius': '80%'
          }),
          axisLine: gauge_series_axisLine({
            'lineStyle.width': 30,
            'lineStyle.color': [
              [0.333333333333, '#67e0e3'],
              [0.666666666666, '#37a2da'],
              [1, '#fd666d']
            ],
          }),
          progress: gauge_series_progress({
            'show': false,
          }),
          splitLine: gauge_series_splitLine({
            'distance': -30,
            'length': 30,
            'lineStyle.color': '#fff',
            'lineStyle.width': 4
          }),
          axisTick: gauge_series_axisTick({
            'distance': -30,
            'length': 8,
            'lineStyle.color': '#fff',
            'lineStyle.width': 2
          }),
          axisLabel: gauge_series_axisLabel({
            'color': '#999',
            'distance': 40,
            'fontSize': 20
          }),
          pointer: gauge_series_pointer(),
          detail: gauge_series_detail(),
          data: [
            {
              value: 70,
            }
          ]
        }
      }
    },
    {
      name: '仪表盘样式',
      opName: 'gaugeStyle',
      chartOption: false,
      menuOption: true,
      icon: 'i_gauge_chart',
      componentPath: chartPath + 'paramsGauge/paramsGaugeStyle',
    },
    {
      name: '轴线样式',
      opName: 'axisLine',
      chartOption: false,
      menuOption: true,
      icon: 'i_circle',
      componentPath: chartPath + 'paramsGauge/paramsGaugeAxisLine',
    },
    {
      name: '进度条样式',
      opName: 'progress',
      chartOption: false,
      menuOption: true,
      icon: 'i_progress',
      componentPath: chartPath + 'paramsGauge/paramsGaugeProgress',
    },
    {
      name: '分割线样式',
      opName: 'splitLine',
      chartOption: false,
      menuOption: true,
      icon: 'i_sline',
      componentPath: chartPath + 'paramsGauge/paramsGaugeSplitLine',
    },
    {
      name: '刻度样式',
      opName: 'axisTick',
      chartOption: false,
      menuOption: true,
      icon: 'i_tick',
      componentPath: chartPath + 'paramsGauge/paramsGaugeAxisTick',
    },
    {
      name: '刻度文本样式',
      opName: 'axisLabel',
      chartOption: false,
      menuOption: true,
      icon: 'i_text',
      componentPath: chartPath + 'paramsGauge/paramsGaugeAxisLabel',
    },
    {
      name: '指针样式',
      opName: 'pointer',
      chartOption: false,
      menuOption: true,
      icon: 'i_pointer',
      componentPath: chartPath + 'paramsGauge/paramsGaugePointer',
    },
    {
      name: '数据文本样式',
      opName: 'detail',
      chartOption: false,
      menuOption: true,
      icon: 'i_num',
      componentPath: chartPath + 'paramsGauge/paramsGaugeDetail',
    },
  ]
}

export function combineOption(data: any) {
  let series = common.option.series
  series.data = data.data
  return {
    series
  }
}

export const createExcelData = _createExcelData
export const conveyExcelData = _conveyExcelData