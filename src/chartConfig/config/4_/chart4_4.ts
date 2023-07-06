import useCommonStore from "@/store/common";
import titleOption from "@/chartConfig/commonParams/title";
import canvas from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import { point_series_label, point_series_labelLine } from '@/chartConfig/option';
import { pointData_2 } from "@/chartConfig/constant";
import { conveyToExcel } from '@/chartConfig/conveyUtils/conveyData';

const common: any = useCommonStore()
const data = pointData_2;

export default () => {
  return [
    titleOption({
      'show': false
    }),
    canvas,
    gridOption(),
    {
      name: 'xAxis',
      opName: 'xAxis',
      chartOption: true,
      menuOption: false,
      uniqueOption: false,
      defaultOption: {
        xAxis: {
          splitLine: { show: false }
        },
      },
      allOption: {},
    },
    {
      name: 'yAxis',
      opName: 'yAxis',
      chartOption: true,
      menuOption: false,
      uniqueOption: false,
      defaultOption: {
        yAxis: {
          splitLine: { show: false },
          scale: true
        },
      },
      allOption: {},
    },
    {
      name: 'dataset',
      opName: 'dataset',
      chartOption: true,
      menuOption: false,
      uniqueOption: false,
      defaultOption: {
        dataset: {
          source: data
        },
      },
      allOption: {},
    },
    {
      name: '数据',
      opName: 'series',
      chartOption: true,
      menuOption: false,
      defaultOption: {
        series: [
          {
            type: 'scatter',
            symbolSize: function (data: any) {
              return data[2]
            },
            emphasis: {
              focus: 'self'
            },
            labelLayout: {
              y: '10%',
              x: '85%',
              hideOverlap: true,
              moveOverlap: 'shiftY'
            },
            labelLine: point_series_labelLine({
              'show': true,
              'length': null,
              'length2': 5,
              'lineStyle.color': '#bbb'
            }),
            label: {
              ...point_series_label({
                'show': true,
                'color': '#000',
                'offset': [null, null],
                'align': null
              }),
              formatter: function (param: any) {
                return param.data[3];
              },
              minMargin: 4
            }
          }
        ]
      },
      allOption: {},
    },
    {
      name: '文本样式',
      opName: 'textStyle',
      chartOption: false,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_text',
      componentPath: "paramsPoint/paramsPointText.vue",
    },
    {
      name: '引导线样式',
      opName: 'lineStyle',
      chartOption: false,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_gline',
      componentPath: "paramsPoint/paramsPointLine.vue",
    },
  ]
}

export const createExcelData = (config: any) => {
  return conveyToExcel([
    {
      direction: 'col',
      data: config.dataset.source,
      startRow: 0,
    }
  ])
}

export function combineOption(data: any) {
  let dataset = common.option.dataset
  dataset.source = data.datasetData
  return {
    dataset
  }
}

export const conveyExcelData = (rows: any) => {
  if(!rows) return null
  let datas  = {
    datasetData: <any>[]
  }
  let length: number = Object.keys(rows).length-1
  for(let i = 0; i < length; i ++) {
    let val1 = rows[i] && rows[i].cells && rows[i].cells[0] ? parseFloat(rows[i].cells[0].text) : NaN
    let val2 = rows[i] && rows[i].cells && rows[i].cells[1] ? parseFloat(rows[i].cells[1].text) : NaN
    let val3 = rows[i] && rows[i].cells && rows[i].cells[2] ? parseFloat(rows[i].cells[2].text) : NaN
    let val4 = rows[i] && rows[i].cells && rows[i].cells[3] ? rows[i].cells[3].text : ''
    if (isNaN(val1) || isNaN(val2) || isNaN(val3) || val4 == '') break
    datas.datasetData.push([val1,val2,val3,val4])
  }
  return datas
}