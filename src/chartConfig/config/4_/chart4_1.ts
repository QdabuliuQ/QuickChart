import { markRaw } from 'vue';
import useCommonStore from "@/store/common";
import title from "@/chartConfig/commonParams/title";
import canvas from "@/chartConfig/commonParams/canvas";
import grid from "@/chartConfig/commonParams/grid";
import waterMark from "@/chartConfig/commonParams/waterMark";
import {
  asisOpNameList
} from "@/chartConfig/constant";
import xAxis, { xAxisOption } from "@/chartConfig/commonParams/xAxis";
import yAxis, { yAxisOption } from "@/chartConfig/commonParams/yAxis";
import paramsPointStyle from "@/views/ChartPanel/components/paramsPoint/paramsPointStyle.vue";

const common: any = useCommonStore()

const getOption = () => {
  return [
    title,
    canvas,
    grid,
    waterMark,
    {
      name: 'X轴样式',
      opName: 'xAxis',
      chartOption: true,
      menuOption: true,
      icon: 'i_X',
      defaultOption: {
        xAxis: [{...xAxis}],
      },
      allOption: {
        xAxis: [
          {
            ...xAxisOption,
            type: 'category',
          }
        ]
      },
      opNameList: asisOpNameList
    },
    {
      name: 'Y轴样式',
      opName: 'yAxis',
      chartOption: true,
      menuOption: true,
      icon: 'i_Y',
      defaultOption: {
        yAxis: [{...yAxis}],
      },
      allOption: {
        yAxis: [
          {
            ...yAxisOption,
            type: 'value',
          }
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
            symbol: 'circle',
            color: '',
            symbolSize: 20,
            itemStyle: {
              borderColor: '#000',
              borderWidth: 0,
              borderType: 'solid',
              shadowBlur: 0 ,
              shadowColor: '' ,
              shadowOffsetX: 0 ,
              shadowOffsetY: 0 ,
            },
            label: {
              show: false,
              fontStyle: 'normal' ,
              fontWeight: 'normal' ,
              fontFamily: 'sans-serif' ,
              fontSize: 12,
              align: '',
            },
            type: 'scatter',
            data: [
              [10.0, 8.04],
              [8.07, 6.95],
              [13.0, 7.58],
              [9.05, 8.81],
              [11.0, 8.33],
              [14.0, 7.66],
              [13.4, 6.81],
              [10.0, 6.33],
              [14.0, 8.96],
              [12.5, 6.82],
              [9.15, 7.2],
              [11.5, 7.2],
              [3.03, 4.23],
              [12.2, 7.83],
              [2.02, 4.47],
              [1.05, 3.33],
              [4.05, 4.96],
              [6.03, 7.24],
              [12.0, 6.26],
              [12.0, 8.84],
              [7.08, 5.82],
              [5.02, 5.68]
            ]
          }
        ]
      }
    },
    {
      name: '散点样式',
      opName: 'pieStyle',
      chartOption: false,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_point',
      component: markRaw(paramsPointStyle),
      allOption: {},
    },
  ]
}

export default getOption

export const createExcelData = (config: any) => {
  // return create(config, (series: any) => {
  //   let data = JSON.parse(JSON.stringify(series))
  //   data.splice(Object.keys(series).length - 1, 1)
  //   return data
  // })
}
// 收集数据并进行转换
export const conveyExcelData = (rows: any) => {
  // return convey(rows, common.option.series, (dataObj: any) => {
  //   let dataOption = {
  //     value: 0,
  //     itemStyle: {
  //       color: 'none',
  //       decal: {
  //         symbol: 'none'
  //       }
  //     },
  //     label: {
  //       show: false
  //     }
  //   }
  //   let sum: number = 0
  //   for(let { value } of dataObj.series[0].data) {
  //     sum += parseInt(value)
  //   }
  //   dataOption.value = sum
  //   dataObj.series[0].data.push(dataOption)
  //   return dataObj
  // })
}
