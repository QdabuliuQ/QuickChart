import {
  colors,
  fontWeight,
  fontFamily,
  fontStyle,
  borderType,
  locationType,
  asisOpNameList
} from "./constant";

import title from "./common/title";
import canvas from "./common/canvas";
import grid from "./common/grid";
import legend from "./common/legend";
import waterMark from "./common/waterMark";

const config = [
  title,
  canvas,
  grid,
  legend,
  waterMark,
  {
    name: '系列颜色',
    opName: 'color',
    chartOption: true,
    menuOption: true,
    icon: 'i_color',
    defaultOption: {
      color: colors
    },
    allOption: {
      color: <any>[]
    },
  },
  {
    name: 'X轴样式',
    opName: 'xAxis',
    chartOption: true,
    menuOption: true,
    icon: 'i_X',
    defaultOption: {
      xAxis: [{
        show: true,
        position: 'bottom',
        offset: 0,
        name: '',
        nameLocation: 'end',
        nameGap: 15,
        nameRotate: 0,
        inverse: false,  // 反向坐标
        nameTextStyle: {
          color: '#ccc',
          fontWeight: 'normal',
          fontFamily: 'sans-serif',
          fontSize: 12,
          backgroundColor: '',
          borderColor: '',
          borderWidth: 0,
          borderRadius: 0,
          padding: 0,
          shadowColor: '',
          shadowBlur: 0,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          textShadowColor: '',
          textShadowBlur: 0,
          textShadowOffsetX: 0,
          textShadowOffsetY: 0,
        },
        axisLine: {  // 轴样式
          show: true,
          lineStyle: {
            color: '#333',
            width: 1,
            type: 'solid',
            shadowBlur: 0,
            shadowColor: '',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            opacity: 1,
          }
        },
        axisTick: {  // 轴刻度样式
          show: true,
          lineStyle: {
            color: '',
            width: 1,
            type: 'solid',
            shadowBlur: 0,
            shadowColor: '',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            opacity: 1,
          }
        },
        axisLabel: {  // 轴文本样式
          show: true,
          rotate: 0,
          margin: 8,
          color: '',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontFamily: 'sans-serif',
          fontSize: 12,
          backgroundColor: 'transparent',
          borderColor: '',
          borderWidth: 0,
          borderType: 'solid',
          borderRadius: 0,
          padding: 0,
          shadowColor: 'transparent',
          shadowBlur: 0,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          textBorderColor: '',
          textBorderWidth: 0,
          textBorderType: 'solid',
          textShadowColor: 'transparent',
          textShadowBlur: 0,
          textShadowOffsetX: 0,
          textShadowOffsetY: 0,
        },
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }],
    },
    allOption: {
      xAxis: [
        {
          show: true,
          position: [
            {
              value: 'top',
              label: '上方'
            },
            {
              value: 'bottom',
              label: '下方'
            },
          ],
          inverse: false,  // 反向坐标
          offset: 0,
          name: '',
          nameLocation: locationType,
          nameGap: 15,
          nameRotate: 0,
          nameTextStyle: {
            color: '#ccc',
            fontWeight: fontStyle,
            fontFamily,
            fontSize: 12,
            backgroundColor: '',
            borderColor: '',
            borderWidth: 0,
            borderRadius: 0,
            padding: 0,
            shadowColor: '',
            shadowBlur: 0,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            textShadowColor: '',
            textShadowBlur: 0,
            textShadowOffsetX: 0,
            textShadowOffsetY: 0,
          },
          axisLine: {  // 轴样式
            show: true,
            lineStyle: {
              color: '#333',
              width: 1,
              type: borderType,
              shadowBlur: 0,
              shadowColor: '',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              opacity: 1,
            }
          },
          axisTick: {  // 轴刻度样式
            show: true,
            lineStyle: {
              color: '',
              width: 1,
              type: borderType,
              shadowBlur: 0,
              shadowColor: '',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              opacity: 1,
            }
          },
          axisLabel: {  // 轴文本样式
            show: true,
            rotate: 0,
            margin: 8,
            color: '',
            fontStyle,
            fontWeight,
            fontFamily,
            fontSize: 12,
            backgroundColor: '',
            borderColor: '',
            borderWidth: 0,
            borderType: borderType,
            borderRadius: 0,
            padding: 0,
            shadowColor: '',
            shadowBlur: 0,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            textBorderColor: '',
            textBorderWidth: 0,
            textBorderType: borderType,
            textShadowColor: '',
            textShadowBlur: 0,
            textShadowOffsetX: 0,
            textShadowOffsetY: 0,
          },
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
      yAxis: [{
        show: true,
        position: 'left',
        offset: 0,
        name: '',
        nameLocation: 'end',
        nameGap: 15,
        nameRotate: 0,
        inverse: false,  // 反向坐标
        nameTextStyle: {
          color: '#ccc',
          fontWeight: 'normal',
          fontFamily: 'sans-serif',
          fontSize: 12,
          backgroundColor: '',
          borderColor: '',
          borderWidth: 0,
          borderRadius: 0,
          padding: 0,
          shadowColor: '',
          shadowBlur: 0,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          textShadowColor: '',
          textShadowBlur: 0,
          textShadowOffsetX: 0,
          textShadowOffsetY: 0,
        },
        axisLine: {  // 轴样式
          show: true,
          lineStyle: {
            color: '#333',
            width: 1,
            type: 'solid',
            shadowBlur: 0,
            shadowColor: '',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            opacity: 1,
          }
        },
        axisTick: {  // 轴刻度样式
          show: true,
          lineStyle: {
            color: '',
            width: 1,
            type: 'solid',
            shadowBlur: 0,
            shadowColor: '',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            opacity: 1,
          }
        },
        axisLabel: {  // 轴文本样式
          show: true,
          rotate: 0,
          margin: 8,
          color: '',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontFamily: 'sans-serif',
          fontSize: 12,
          backgroundColor: 'transparent',
          borderColor: '',
          borderWidth: 0,
          borderType: 'solid',
          borderRadius: 0,
          padding: 0,
          shadowColor: 'transparent',
          shadowBlur: 0,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          textBorderColor: '',
          textBorderWidth: 0,
          textBorderType: 'solid',
          textShadowColor: 'transparent',
          textShadowBlur: 0,
          textShadowOffsetX: 0,
          textShadowOffsetY: 0,
        },
        type: 'value',
      }],
    },
    allOption: {
      yAxis: [
        {
          show: true,
          position: [
            {
              value: 'left',
              label: '左侧'
            },
            {
              value: 'right',
              label: '右侧'
            },
          ],
          inverse: false,  // 反向坐标
          offset: 0,
          name: '',
          nameLocation: locationType,
          nameGap: 15,
          nameRotate: 0,
          nameTextStyle: {
            color: '#ccc',
            fontWeight: fontStyle,
            fontFamily,
            fontSize: 12,
            backgroundColor: '',
            borderColor: '',
            borderWidth: 0,
            borderRadius: 0,
            padding: 0,
            shadowColor: '',
            shadowBlur: 0,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            textShadowColor: '',
            textShadowBlur: 0,
            textShadowOffsetX: 0,
            textShadowOffsetY: 0,
          },
          axisLine: {  // 轴样式
            show: true,
            lineStyle: {
              color: '#333',
              width: 1,
              type: borderType,
              shadowBlur: 0,
              shadowColor: '',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              opacity: 1,
            }
          },
          axisTick: {  // 轴刻度样式
            show: true,
            lineStyle: {
              color: '',
              width: 1,
              type: borderType,
              shadowBlur: 0,
              shadowColor: '',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              opacity: 1,
            }
          },
          axisLabel: {  // 轴文本样式
            show: true,
            rotate: 0,
            margin: 8,
            color: '',
            fontStyle,
            fontWeight,
            fontFamily,
            fontSize: 12,
            backgroundColor: '',
            borderColor: '',
            borderWidth: 0,
            borderType: borderType,
            borderRadius: 0,
            padding: 0,
            shadowColor: '',
            shadowBlur: 0,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            textBorderColor: '',
            textBorderWidth: 0,
            textBorderType: borderType,
            textShadowColor: '',
            textShadowBlur: 0,
            textShadowOffsetX: 0,
            textShadowOffsetY: 0,
          },
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
    menuOption: true,
    defaultOption: {
      series: [
        {
          name: '系列一',
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
        }
      ]
    },
  },
]

// 创建初始数据
export const createExcelData = (config: any) => {
  let excelData: any = {}

  let series = config.series
  let xAxis = config.xAxis[0].data

  // 初始化
  for (let i = 0; i < xAxis.length + 1; i++) {
    excelData[i] = {
      cells: {}
    }
  }
  for (let i = 0; i < series.length; i++) {
    excelData[0].cells[i + 1] = {
      text: series[i].name
    }
  }

  for (let i = 0; i < xAxis.length; i++) {
    excelData[i + 1].cells[0] = {
      text: xAxis[i]
    }
    for (let j = 0; j < series.length; j++) {
      excelData[i + 1].cells[j + 1] = {
        text: series[j].data[i]
      }
    }
  }
  return excelData
}

// 收集数据并进行转换
export const conveyExcelData = (rows: any) => {
  let dataObj: any = {
    categoryData: [],
    series: []
  }
  // 遍历数据项
  let rowsTLength = Object.keys(rows[0].cells).length;

  for (let i = 1; i <= rowsTLength; i++) {
    dataObj.series.push({  // 创建series
      name: rows[0].cells[i].text,
      data: [],
      type: 'line'
    })
  }
  let rowsALength = Object.keys(rows).length - 1;
  for (let i = 1; i < rowsALength; i++) {
    let rowsItemLength = Object.keys(rows[i].cells).length;
    dataObj.categoryData.push(rows[i].cells[0].text)
    // 将对应数据放入series当中
    for (let j = 1; j < rowsItemLength; j++) {
      dataObj.series[j - 1].data.push(rows[i].cells[j].text)
    }
  }
  return dataObj
}

export default config