import useCommonStore from "@/store/common";
import titleOption from "@/chartConfig/commonParams/title";
import canvas from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import legendOption from "@/chartConfig/commonParams/legend";
import xAxisOption from "@/chartConfig/commonParams/xAxis";
import yAxisOption from "@/chartConfig/commonParams/yAxis";
import { conveyToExcel } from '@/chartConfig/conveyUtils/conveyData';
import {bar_series_label} from "@/chartConfig/option";

const common: any = useCommonStore()
const series_label = bar_series_label({
  'position': 'insideBottomRight',
  'formatter': null
})
export default () => {
  return [
    titleOption({
      'show': false
    }),
    canvas,
    gridOption({
      'containLabel': true,
      'left': '4%',
      'right': '6%',
      'bottom': '4%',
    }),
    legendOption({
      'left': 'center',
      'top': 5,
      'icon': 'roundRect',
    }),
    {
      name: 'dataset',
      opName: 'dataset',
      chartOption: true,
      menuOption: false,
      uniqueOption: false,
      defaultOption: {
        dataset: {
          source: [
            ['date', '2011', '2012'],
            ['Brazil', 18203, 19325],
            ['Indonesia', 23489, 23438],
            ['USA', 29034, 31000],
            ['India', 104970, 121594],
            ['China', 131744, 134141],
            ['World', 630230, 681807],
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
      componentPath: 'paramsYAxis.vue',
      defaultOption: {
        yAxis: [{
          ...yAxisOption(),
          type: 'category',
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
            label: series_label
          },
          {
            type: 'bar',
            label: series_label
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
      componentPath: 'paramsBar/paramsBarText.vue'
    },
  ]
}


export function combineOption(data: any) {
  let series = data.seriesData
  let dataset = common.option.dataset
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

export const conveyExcelData = (rows: any, options: any) => {
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
      datas.seriesData.push(options.series[0])
    }
  } else {
    datas.seriesData.push(options.series[0])
  }
  return datas
}