import useCommonStore from "@/store/common";
import titleOption from "@/chartConfig/commonParams/title";
import canvasOption from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import colorOption from "@/chartConfig/commonParams/color";
import graphicOption from "@/chartConfig/commonParams/graphic";
import legendOption from "@/chartConfig/commonParams/legend";
import {conveyToExcel} from "@/chartConfig/conveyUtils/conveyData";
import {
  gauge_series, gauge_series_axisLabel,
  gauge_series_axisLine,
  gauge_series_axisTick, gauge_series_detail, gauge_series_pointer,
  gauge_series_progress,
  gauge_series_splitLine
} from "@/chartConfig/option";

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
          ...gauge_series(),
          axisLine: gauge_series_axisLine(),
          progress: gauge_series_progress(),
          splitLine: gauge_series_splitLine(),
          axisTick: gauge_series_axisTick(),
          axisLabel: gauge_series_axisLabel(),
          pointer: gauge_series_pointer(),
          detail: gauge_series_detail(),
          data: [
            {
              value: 20,
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
      componentPath: 'paramsGauge/paramsGaugeStyle.vue',
    },
    {
      name: '轴线样式',
      opName: 'axisLine',
      chartOption: false,
      menuOption: true,
      icon: 'i_circle',
      componentPath: 'paramsGauge/paramsGaugeAxisLine.vue',
    },
    {
      name: '进度条样式',
      opName: 'progress',
      chartOption: false,
      menuOption: true,
      icon: 'i_progress',
      componentPath: 'paramsGauge/paramsGaugeProgress.vue',
    },
    {
      name: '分割线样式',
      opName: 'splitLine',
      chartOption: false,
      menuOption: true,
      icon: 'i_sline',
      componentPath: 'paramsGauge/paramsGaugeSplitLine.vue',
    },
    {
      name: '刻度样式',
      opName: 'axisTick',
      chartOption: false,
      menuOption: true,
      icon: 'i_tick',
      componentPath: 'paramsGauge/paramsGaugeAxisTick.vue',
    },
    {
      name: '刻度文本样式',
      opName: 'axisLabel',
      chartOption: false,
      menuOption: true,
      icon: 'i_text',
      componentPath: 'paramsGauge/paramsGaugeAxisLabel.vue',
    },
    {
      name: '指针样式',
      opName: 'pointer',
      chartOption: false,
      menuOption: true,
      icon: 'i_pointer',
      componentPath: 'paramsGauge/paramsGaugePointer.vue',
    },
    {
      name: '数据文本样式',
      opName: 'detail',
      chartOption: false,
      menuOption: true,
      icon: 'i_num',
      componentPath: 'paramsGauge/paramsGaugeDetail.vue',
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

export const createExcelData = (config: any) => {
  return conveyToExcel([
    {
      direction: 'col',
      data: config.series.data,
      startCol: 0,
    },
  ])
}

export const conveyExcelData = (rows: any) => {
  if(!rows) return null
  let datas = {
    data: [rows[0].cells[0].text]
  }
  return datas
}