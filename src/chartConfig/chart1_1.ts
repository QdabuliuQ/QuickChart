// const leftText = '左边距'
// const topText = '上边距'
// const bottomText = '下边距'
// const rightText = '右边距'
import { leftText, topText, bottomText, rightText, colors } from "./constant";


export default [
  {
    name: '标题',
    opName: 'title',
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
          fontWeight: [
            {
              value: 'lighter',
              label: 100,
            },
            {
              value: 'normal',
              label: 200,
            },
            {
              value: 'bold',
              label: 300,
            },
            {
              value: 'bolder',
              label: 400,
            },
          ],
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
    name: '画布',
    opName: 'canvas',
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
      shadowBlur: '阴影模糊',
      shadowColor: '阴影颜色',
      shadowOffsetX: '阴影偏移X',
      shadowOffsetY: '阴影偏移Y',
    }
  },
  {
    name: '图例',
    opName: 'legend',
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
    name: '水印',
    opName: 'waterMark',
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
    name: '颜色',
    opName: 'color',
    defaultOption: {
      color: [
        colors[0],
        colors[1],
      ]
    },
    allOption: {
      color: [
        {
          title: '系列1',
          c: colors[0]
        },
        {
          title: '系列2',
          c: colors[1]
        },
      ]
    },
  },
  {
    name: 'x轴',
    opName: 'xAxis',
    defaultOption: {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
    }
  },
  {
    name: 'y轴',
    opName: 'yAxis',
    defaultOption: {
      yAxis: {
        type: 'value',
      },
    }
  },

  {
    name: '数据',
    opName: 'series',
    defaultOption: {
      series: [
        {
          name: '系列1',
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        },
        {
          name: '系列2',
          data: [222, 340, 224, 111, 135, 19, 260],
          type: 'line'
        },
      ]
    },
  },
]

// xAxis: {
//   type: 'category',
//   data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
// },
// yAxis: {
//   type: 'value'
// },
// series: [
//   {
//     data: [150, 230, 224, 218, 135, 147, 260],
//     type: 'line'
//   }
// ]