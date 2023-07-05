import {
  fontWeight,
  fontFamily,
  fontStyle,
  borderType,
  locationType,
} from "@/chartConfig/constant";

let xAxis = {
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
  },
  axisLine: {  // 轴样式
    show: true,
    lineStyle: {
      color: '#333',
      width: 1,
      type: 'solid',
      opacity: 1,
    }
  },
  axisTick: {  // 轴刻度样式
    show: true,
    lineStyle: {
      color: null,
      width: 1,
      type: 'solid',
      opacity: 1,
    }
  },
  axisLabel: {  // 轴文本样式
    show: true,
    rotate: 0,
    margin: 8,
    color: null,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: 'sans-serif',
    fontSize: 12,
  },
}

export let xAxisOption = {
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
  name: null,
  nameLocation: locationType,
  nameGap: 15,
  nameRotate: 0,
  nameTextStyle: {
    color: '#ccc',
    fontWeight: fontStyle,
    fontFamily,
    fontSize: 12,
    backgroundColor: null,
    borderColor: null,
    borderWidth: 0,
    borderRadius: 0,
    padding: 0,
    shadowColor: null,
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    textShadowColor: null,
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
      shadowColor: null,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      opacity: 1,
    }
  },
  axisTick: {  // 轴刻度样式
    show: true,
    lineStyle: {
      color: null,
      width: 1,
      type: borderType,
      shadowBlur: 0,
      shadowColor: null,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      opacity: 1,
    }
  },
  axisLabel: {  // 轴文本样式
    show: true,
    rotate: 0,
    margin: 8,
    color: null,
    fontStyle,
    fontWeight,
    fontFamily,
    fontSize: 12,
    backgroundColor: null,
    borderColor: null,
    borderWidth: 0,
    borderType: borderType,
    borderRadius: 0,
    padding: 0,
    shadowColor: null,
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    textBorderColor: null,
    textBorderWidth: 0,
    textBorderType: borderType,
    textShadowColor: null,
    textShadowBlur: 0,
    textShadowOffsetX: 0,
    textShadowOffsetY: 0,
  },
}

export default xAxis