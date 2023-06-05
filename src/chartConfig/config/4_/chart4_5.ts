import { markRaw } from 'vue';
import useCommonStore from "@/store/common";
import title from "@/chartConfig/commonParams/title";
import canvas from "@/chartConfig/commonParams/canvas";
import grid from "@/chartConfig/commonParams/grid";
import waterMark from "@/chartConfig/commonParams/waterMark";
import { point_series_label, point_series_labelLine } from '@/chartConfig/option';
import { pointData_2 } from "@/chartConfig/constant";
import paramsPointLine from "@/views/ChartPanel/components/paramsPoint/paramsPointLine.vue";
import paramsPointText from "@/views/ChartPanel/components/paramsPoint/paramsPointText.vue";
import lodash from 'lodash';

const common: any = useCommonStore()
const data = pointData_2;

const getOption = () => {
  title.defaultOption.title.show = false
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
        xAxis: {},
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
      name: 'series',
      opName: 'series',
      chartOption: true,
      menuOption: false,
      uniqueOption: false,
      defaultOption: {
        series: [
          {
            type: 'scatter',
            symbolSize: function (data: any) {
              return data[2];
            },
            emphasis: {
              focus: 'self'
            },
            labelLayout: {
              y: 20,
              align: 'center',
              hideOverlap: true,
              moveOverlap: 'shiftX'
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
                'color': '#000'
              }),
              formatter: function (param: any) {
                return param.data[3];
              },
              position: 'top'
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
let copyData: any[][] = []
export const createExcelData = (config: any) => {
  let datas = lodash.cloneDeep(common.option.dataset.source)
  copyData = datas
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

export const conveyExcelData = (rows: any, cache: {
  val: any
  i: number
  j: number
}[] | null) => {
  if(cache && cache.length) {
    for(let {val, i, j} of cache) {
      if(i > copyData.length) continue
      if(!copyData[i]) copyData[i] = []
      copyData[i][j] = isNaN(parseInt(val)) ? val : parseInt(val)
    }
    return {
      dataset: {
        source: copyData
      }
    }
  }
  
  // if(val==undefined || i==undefined || j==undefined) return {}
  // if(i > copyData.length) return {}
  // if(!copyData[i]) copyData[i] = []
  
  // copyData[i][j] = isNaN(parseInt(val)) ? val : parseInt(val)
  
  return {}
}