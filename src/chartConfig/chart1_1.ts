import {
  leftText,
  topText,
  bottomText,
  rightText,
  colors,
  shadowY,
  shadowX,
  shadowColor,
  shadowBlur,
  fontWeight,
  fontFamily,
  fontStyle,
  borderType,
  locationType,
  asisOpNameList
} from "./constant";
import getColor from '@/utils/getColor';

const config = [
  {
    name: '标题样式',
    opName: 'title',
    chartOption: true,
    menuOption: true,
    icon: 'i_title',
    defaultOption: {
      title: {
        text: '图表标题',
        show: true,
        textAlign: 'left',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        textStyle: {
          color: '#333',
          fontWeight: 'bolder',
          fontSize: 18,
        }
      },
    },
    allOption: {
      title: {
        text: '',
        show: [true, false],
        textAlign: [
          {
            value: 'left',
            label: '左对齐',
          },
          {
            value: 'center',
            label: '居中',
          },
          {
            value: 'right',
            label: '右对齐',
          },
        ],
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: '',
        textStyle: {
          color: '',
          fontWeight,
          fontSize: 18,
        }
      },
    },
    opNameList: {
      text: '文本标题',
      show: '显示',
      textAlign: '对齐方式',
      left: leftText,
      right: rightText,
      top: topText,
      bottom: bottomText,
      backgroundColor: '背景色',
      color: '文本颜色',
      fontWeight: '文本加粗',
      fontSize: '字体大小',
    }
  },
  {
    name: '图表画布',
    opName: 'canvas',
    chartOption: false,
    menuOption: true,
    icon: 'i_canvas',
    defaultOption: {
      width: 700,
      height: 500,
      bgc: '#fff',
    },
    allOption: {
      width: 0,
      height: 0,
      bgc: '',
    },
    opNameList: {
      width: '画布宽度',
      height: '画布高度',
      bgc: '画布颜色'
    }
  },
  {
    name: '图表布局',
    opName: 'grid',
    chartOption: true,
    menuOption: true,
    icon: 'i_grid',
    defaultOption: {
      grid: {
        show: false,
        left: 60,
        top: 60,
        bottom: 60,
        right: 60,
        width: 'auto',
        height: 'auto',
        backgroundColor: 'transparent',
        borderColor: '#ccc',
        borderWidth: 1,
        shadowBlur: 10,
        shadowColor: '',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
      }
    },
    allOption: {
      grid: {
        show: false,
        left: 60,
        top: 60,
        bottom: 60,
        right: 60,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderColor: '#ccc',
        borderWidth: 1,
        shadowBlur: 10,
        shadowColor: '',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
      }
    },
    opNameList: {
      show: '显示网格',
      left: leftText,
      top: topText,
      bottom: bottomText,
      right: rightText,
      width: '宽度',
      height: '高度',
      backgroundColor: '背景色',
      borderColor: '边框颜色',
      borderWidth: '边框线宽',
      shadowBlur: shadowBlur,
      shadowColor: shadowColor,
      shadowOffsetX: shadowX,
      shadowOffsetY: shadowY,
    }
  },
  {
    name: '图例样式',
    opName: 'legend',
    chartOption: true,
    menuOption: true,
    icon: 'i_legend',
    defaultOption: {
      legend: {
        show: true,
        icon: 'circle',
        left: 'auto',
        top: 'auto',
        right: 1,
        bottom: 'auto',
        width: 'auto',
        height: 'auto',
        orient: 'horizontal',
        itemWidth: 25,
        itemHeight: 14,
      }
    },
    allOption: {
      legend: {
        show: true,
        icon: [
          {
            value: 'circle',
            label: '圆形',
          },
          {
            value: 'rect',
            label: '方形',
          },
          {
            value: 'roundRect',
            label: '圆角方形',
          },
          {
            value: 'triangle',
            label: '三方形',
          },
          {
            value: 'diamond',
            label: '菱形',
          },
          {
            value: 'arrow',
            label: '箭头',
          },
        ],
        left: 0,
        top: 0,
        right: 1,
        bottom: 0,
        width: 0,
        height: 0,
        orient: [
          {
            value: 'horizontal',
            label: '水平',
          },
          {
            value: 'vertical',
            label: '竖直',
          },
        ],
        itemWidth: 25,
        itemHeight: 14,
      }
    },
    opNameList: {
      show: '显示图例',
      icon: '图例类型',
      left: leftText,
      top: topText,
      right: rightText,
      bottom: bottomText,
      width: '宽度',
      height: '高度',
      orient: '布局朝向',
      itemWidth: '图例宽度',
      itemHeight: '图例高度',
    }
  },
  {
    name: '图表水印',
    opName: 'waterMark',
    chartOption: false,
    menuOption: true,
    icon: 'i_mark',
    defaultOption: {
      waterMark: {
        show: false,
        text: '',
        opacity: 0.5,
        color: '#ccc',
        size: 20,
        rotate: 4
      }
    },
    allOption: {
      waterMark: {
        show: false,
        text: '',
        opacity: 0.5,
        color: '#ccc',
        size: 20,
        rotate: 4
      }
    },
    opNameList: {
      show: '显示水印',
      text: '水印文本',
      opacity: '透明度',
      color: '字体颜色',
      size: '字体大小',
      rotate: '旋转角度'
    }
  },
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
        },
        {
          name: '系列二',
          data: [110, 290, 124, 558, 133, 147, 660],
          type: 'line',
        },
      ]
    },
  },
]

// let allColorsOption = getColor(config[config.length - 1].defaultOption.series, 'all')
// let colorsOption = getColor(config[config.length - 1].defaultOption.series)
// config[5]!.allOption!.color = allColorsOption
// config[5].defaultOption.color = colorsOption

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