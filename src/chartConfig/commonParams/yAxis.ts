import {
  fontWeight,
  fontFamily,
  fontStyle,
  borderType,
  locationType,
} from "@/chartConfig/constant";

let yAxis = {
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
      color: '',
      width: 1,
      type: 'solid',
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
  },
}

export let yAxisOption = {
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
  },
  axisLine: {  // 轴样式
    show: true,
    lineStyle: {
      color: '#333',
      width: 1,
      type: borderType,
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
}

export default yAxis