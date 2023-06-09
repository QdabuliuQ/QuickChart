import { markRaw } from 'vue';
import useCommonStore from "@/store/common";
import title from "@/chartConfig/commonParams/title";
import canvas from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import waterMark from "@/chartConfig/commonParams/waterMark";
import { point_series_label, point_series_labelLine } from '@/chartConfig/option';
import paramsPointLine from "@/views/ChartPanel/components/paramsPoint/paramsPointLine.vue";
import paramsPointText from "@/views/ChartPanel/components/paramsPoint/paramsPointText.vue";
import { pointData_2 } from "@/chartConfig/constant";

const common: any = useCommonStore()
const data = pointData_2;

const getOption = () => {
  let grid = gridOption()
  grid.defaultOption.grid.left = 40
  grid.defaultOption.grid.right = 130
  return [
    title,
    canvas,
    grid,
    waterMark,
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
      component: markRaw(paramsPointText),
      allOption: {},
    },
    {
      name: '引导线样式',
      opName: 'lineStyle',
      chartOption: false,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_line',
      component: markRaw(paramsPointLine),
      allOption: {},
    },
  ]
}

export default getOption

export const createExcelData = (config: any) => {
  let datas = config.dataset.source
  let excelData: any = {}
  for(let i = 0; i < datas.length; i ++) {
    excelData[i] = {
      cells: {}
    }
    for(let j = 0; j < datas[i].length; j ++) {
      excelData[i].cells[j] = {
        text: datas[i][j]
      }
    }
  }
  return excelData
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
    let row = []
    for(let j = 0; j < 4; j ++) {
      if(rows[i] && rows[i].cells && rows[i] && rows[i].cells[j]) {
        row.push(isNaN(parseInt(rows[i].cells[j].text)) ? rows[i].cells[j].text : parseInt(rows[i].cells[j].text))
      } else {
        row.push('')
      }
    }
    datas.datasetData.push(row)
  }
  
  return datas
}