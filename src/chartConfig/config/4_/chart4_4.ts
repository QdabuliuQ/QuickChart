import { markRaw } from 'vue';
import useCommonStore from "@/store/common";
import title from "@/chartConfig/commonParams/title";
import canvas from "@/chartConfig/commonParams/canvas";
import grid from "@/chartConfig/commonParams/grid";
import waterMark from "@/chartConfig/commonParams/waterMark";
import legend from "@/chartConfig/commonParams/legend";
import { point_series_label, point_series_labelLine } from '@/chartConfig/option';
import paramsPointLine from "@/views/ChartPanel/components/paramsPoint/paramsPointLine.vue";
import paramsPointText from "@/views/ChartPanel/components/paramsPoint/paramsPointText.vue";
import lodash from 'lodash';

const common: any = useCommonStore()
const data = [
  [20, 22, 33, 'Australia'],
  [3, 25, 50, 'Canada'],
  [41, 50, 60, 'China'],
  [13, 74, 40, 'Cuba'],
  [28, 51, 49, 'Finland'],
  [12, 34, 59, 'France'],
  [51, 37, 45, 'Germany'],
  [15, 54, 22, 'Iceland'],
  [17, 5, 76, 'India', 10],
  [20, 7, 15, 'Japan', 18],
  [21, 67.9, 24, 'North Korea', 13],
  [17, 30, 30, 'South Korea', 21],
  [21, 75.4, 34, 'New Zealand', 10],
  [46, 76.8, 45, 'Norway', 11],
  [18, 70.8, 38, 'Poland', 10],
  [29, 6, 16, 'Russia', 10],
  [10, 67, 53, 'Turkey', 90],
  [33, 75, 53, 'United Kingdom', 10],
  [37, 7, 25, 'United States', 1]
];

const getOption = () => {
  grid.defaultOption.grid.left = 40
  grid.defaultOption.grid.right = 130
  return [
    title,
    canvas,
    grid,
    legend,
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
      name: '数据',
      opName: 'series',
      chartOption: true,
      menuOption: false,
      defaultOption: {
        series: [
          {
            data,
            type: 'scatter',
            symbolSize: function (data: any) {
              return data[2]
            },
            emphasis: {
              focus: 'self'
            },
            labelLayout: function () {
              return {
                x: (document.getElementById('chartDom')?.clientWidth) as number - 100,
                moveOverlap: 'shiftY'
              };
            },
            labelLine: point_series_labelLine({
              'show': true,
              'length': null,
              'length2': 10,
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
              minMargin: 2
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
  let datas = config.series[0].data
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

export const conveyExcelData = (rows: any) => { 
  let series = lodash.cloneDeep(common.option.series)
  let dataObj = {
    series
  }
  let length: number = Object.keys(rows).length
  dataObj.series[0].data = []
  for(let i = 0; i < length; i ++) {
    let val1 = rows[i] && rows[i].cells && rows[i].cells[0] ? parseInt(rows[i].cells[0].text) : ''
    let val2 = rows[i] && rows[i].cells && rows[i].cells[1] ? parseInt(rows[i].cells[1].text) : ''
    let val3 = rows[i] && rows[i].cells && rows[i].cells[2] ? parseInt(rows[i].cells[2].text) : ''
    let val4 = rows[i] && rows[i].cells && rows[i].cells[3] ? rows[i].cells[3].text : ''
    dataObj.series[0].data.push([val1, val2, val3, val4])
  }
  console.log(dataObj.series);
  
  return dataObj
}