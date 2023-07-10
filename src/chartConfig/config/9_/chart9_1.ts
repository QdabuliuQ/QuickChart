import useCommonStore from "@/store/common";
import titleOption from "@/chartConfig/commonParams/title";
import canvasOption from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import colorOption from "@/chartConfig/commonParams/color";
import graphicOption from "@/chartConfig/commonParams/graphic";
import legendOption from "@/chartConfig/commonParams/legend";
import {conveyToExcel} from "@/chartConfig/conveyUtils/conveyData";
import {gauge_series, gauge_series_axisLine} from "@/chartConfig/option";

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
          data: [
            {
              value: 20,
              name: 'SCORE'
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
  ]
}

export function combineOption(data: any) {
  // let series = common.option.series
  // series.data = data.data
  // series.links = data.linksData
  // return {
  //   series
  // }
}

export const createExcelData = (config: any) => {
  // return conveyToExcel([
  //   {
  //     direction: 'col',
  //     data: config.series.links,
  //     startCol: 0,
  //   },
  // ])
}

export const conveyExcelData = (rows: any) => {
  if(!rows) return null
}