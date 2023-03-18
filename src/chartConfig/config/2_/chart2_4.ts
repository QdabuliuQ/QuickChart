import { markRaw } from "vue";
import lodash from 'lodash'
import useCommonStore from "@/store/common";
// 导入独立组件
import paramsBarText from "@/views/ChartPanel/components/paramsBar/paramsBarText.vue";

import {
  asisOpNameList
} from "@/chartConfig/constant";
import title from "@/chartConfig/commonParams/title";
import canvas from "@/chartConfig/commonParams/canvas";
import grid from "@/chartConfig/commonParams/grid";
import legend from "@/chartConfig/commonParams/legend";
import waterMark from "@/chartConfig/commonParams/waterMark";
const common: any = useCommonStore()

const getOption = () => {
  grid.defaultOption.grid.top = 80
  grid.defaultOption.grid.bottom = 30
  return [
    title,
    canvas,
    grid,
    legend,
    waterMark,
    {
      name: 'X轴样式',
      opName: 'xAxis',
      chartOption: true,
      menuOption: false,
      icon: 'i_X',
      defaultOption: {
        xAxis: [{
          type: 'value',
          position: 'top',
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        }],
      },
      allOption: {
        xAxis: [
          {
            type: 'value',
            position: 'top',
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
          }
        ]
      },
      opNameList: asisOpNameList
    },
    {
      name: 'Y轴样式',
      opName: 'yAxis',
      chartOption: true,
      menuOption: false,
      icon: 'i_Y',
      defaultOption: {
        yAxis: [{
          type: 'category',
          axisLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
          data: [
            'ten',
            'nine',
            'eight',
            'seven',
            'six',
            'five',
            'four',
            'three',
            'two',
            'one'
          ]
        }],
      },
      allOption: {
        yAxis: [
          {
            type: 'category',
            axisLine: { show: false },
            axisLabel: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            data: [
              'ten',
              'nine',
              'eight',
              'seven',
              'six',
              'five',
              'four',
              'three',
              'two',
              'one'
            ]
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
            name: '系列一',
            type: 'bar',
            stack: 'Total',
            label: {
              show: true,
              formatter: '{b}'
            },
            data: [
              { value: -0.07, label: { position: 'right' } },
              { value: -0.09, label: { position: 'right' } },
              { value: 0.2, label: { position: 'right' } },
              { value: 0.44, label: { position: 'right' } },
              { value: -0.23, label: { position: 'right' } },
              { value: 0.08, label: { position: 'right' } },
              { value: -0.17, label: { position: 'right' } },
              { value: 0.47, label: { position: 'right' } },
              { value: -0.36, label: { position: 'right' } },
              { value: 0.18, label: { position: 'right' } },
            ]
          },
        ]
      }
    },
    {
      name: '字体位置',
      opName: 'textStyle',
      chartOption: false,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_bar',
      component: markRaw(paramsBarText),
      allOption: {}
    }
  ]
}

export default getOption

export const createExcelData = (config: any) => {
  let excelData: any = {}

  let series = config.series
  let yAxis = config.yAxis[0].data

  // 初始化
  for (let i = 0; i < yAxis.length + 1; i++) {
    excelData[i] = {
      cells: {}
    }
  }
  for (let i = 0; i < series.length; i++) {
    excelData[0].cells[i + 1] = {
      text: series[i].name
    }
  }

  for (let i = 0; i < yAxis.length; i++) {
    excelData[i + 1].cells[0] = {
      text: yAxis[i]
    }
    for (let j = 0; j < series.length; j++) {
      excelData[i + 1].cells[j + 1] = {
        text: series[j].data[i]?.value
      }
    }
  }
  return excelData
}

// 收集数据并进行转换
export const conveyExcelData = (rows: any) => {
  let series = lodash.cloneDeep(common.option.series)
  let yAxis = lodash.cloneDeep(common.option.yAxis)
  let data = []
  let dataObj: any = {
    yAxis,
    series: []
  }
  // 遍历数据项
  let rowsTLength = Object.keys(rows[0].cells).length;

  for (let i = 1; i <= rowsTLength; i++) {
    dataObj.series.push({  // 创建series
      name: rows[0].cells[i].text,
      data: series[i - 1] ? series[i - 1].data : [],
      type: 'bar',
      stack: 'Total',
      label: {
        show: true,
        formatter: '{b}'
      },
    })

  }
  let rowsALength = Object.keys(rows).length - 1;
  for (let i = 1; i < rowsALength; i++) {
    let rowsItemLength = Object.keys(rows[i].cells).length;

    data.push(rows[i].cells[0] ? rows[i].cells[0].text : '')
    // 将对应数据放入series当中
    for (let j = 1; j < rowsItemLength; j++) {
      if (dataObj.series[j - 1].data[i - 1]) {
        dataObj.series[j - 1].data[i - 1].value = rows[i].cells[j].text
      } else {
        dataObj.series[j - 1].data[i - 1] = {
          value: rows[i].cells[j].text,
          label: {
            position: 'right'
          }
        }
      }

    }
  }
  dataObj.yAxis[0].data = data

  return dataObj
}