import {
  asisOpNameList
} from "@/chartConfig/constant";
import useCommonStore from "@/store/common";
import titleOption from "@/chartConfig/commonParams/title";
import canvas from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import color from "@/chartConfig/commonParams/color";
import { conveyToExcel } from "@/chartConfig/conveyUtils/conveyData";
import { line_series, line_series_label } from "@/chartConfig/option";

const common: any = useCommonStore()
const lineSeriesOption = line_series(), lineSeriesLabelOption = line_series_label()
export default () => {
  return [
    titleOption({
      'show': false
    }),
    canvas,
    gridOption(),
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
            [10, 40],
            [50, 100],
            [40, 20]
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
        xAxis: [
          {}
        ],
      },
    },
    {
      name: 'Y轴样式',
      opName: 'yAxis',
      chartOption: true,
      menuOption: false,
      icon: 'i_Y',
      defaultOption: {
        yAxis: [
          {}
        ],
      },
      allOption: {
        yAxis: [
          {}
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
            type: 'line',
            ...lineSeriesOption,
            label: {
              ...lineSeriesLabelOption
            }
          },
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
  let length: number = Object.keys(rows).length
  if (!rows || length <= 0) return null
  let datas = {
    datasetData: <any>[],
    seriesData: <any>[]
  }
  const seriesOptionItem = options.series[0] ?? null
  for(let i = 0; i < length; i ++) {
    if (JSON.stringify(rows[i].cells) == '{}') break
    datas.datasetData[i] = []
    let rowsLength: number = Object.keys(rows[i].cells).length
    for(let j = 0; j < rowsLength; j ++) {
      datas.datasetData[i].push(parseFloat(rows[i].cells[j].text))
    }
  }
  for(let i = 0; i < datas.datasetData.length; i ++) {
    datas.seriesData.push(seriesOptionItem)
  }
  return datas
}