export interface ListInt {
  value: string | number
  label: string | number
}

export const colors: string[] = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
export const leftText: string = '左边距'
export const topText: string = '上边距'
export const bottomText: string = '下边距'
export const rightText: string = '右边距'
export const shadowX: string = '阴影偏移X'
export const shadowY: string = '阴影偏移Y'
export const shadowColor: string = '阴影颜色'
export const shadowBlur: string = '阴影模糊'
export const fontWeight: ListInt[] = [
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
]
export const fontPosition: ListInt[] = [
  {
    value: 'outside',
    label: '外侧'
  },
  {
    value: 'inside',
    label: '内部'
  },
  {
    value: 'center',
    label: '中间'
  },
]
export const fontFamily: ListInt[] = [
  {
    value: 'sans-serif',
    label: 'sans-serif',
  },
  {
    value: 'serif',
    label: 'serif',
  },
  {
    value: 'monospace',
    label: 'monospace',
  },
  {
    value: 'Arial',
    label: 'Arial',
  },
  {
    value: 'Courier New',
    label: 'Courier New',
  },
  {
    value: 'Microsoft YaHei',
    label: 'Microsoft YaHei',
  },
]
export const fontStyle: ListInt[] = [
  {
    value: 'normal',
    label: '常规',
  },
  {
    value: 'italic',
    label: '斜体',
  }
]
export const borderType: ListInt[] = [
  {
    value: 'solid',
    label: '实线',
  },
  {
    value: 'dashed',
    label: '虚线',
  },
  {
    value: 'dotted',
    label: '点线',
  },
]
export const locationType: ListInt[] = [
  {
    value: 'start',
    label: '左侧'
  },
  {
    value: 'center',
    label: '中间'
  },
  {
    value: 'end',
    label: '右侧'
  },
]
export const asisOpNameList: any = {
  show: '显示',
  position: '位置',
  offset: '偏移量',
  name: '坐标轴名称',
  nameLocation: '轴名称位置',
  nameGap: '离轴线距离',
  nameRotate: '轴名称旋转',
  inverse: '反向坐标轴',
  color: '颜色',
  fontWeight: '字体粗细',
  fontFamily: '字体系列',
  fontSize: '字体大小',
  backgroundColor: '背景颜色',
  borderColor: '边框颜色',
  borderWidth: '边框宽度',
  borderRadius: '边框圆角',
  padding: '内边距',
  shadowColor,
  shadowBlur,
  shadowOffsetX: shadowX,
  shadowOffsetY: shadowY,
  textShadowColor: '文本'+shadowColor,
  textShadowBlur: '文本'+shadowBlur,
  textShadowOffsetX: '文本'+shadowX,
  textShadowOffsetY: '文本'+shadowY,
  width: '宽度',
  type: '线类型',
  opacity: '透明度',
  rotate: '旋转角度',
  margin: '外边距',
  fontStyle: '字体风格',
  borderType: '边框类型',
  textBorderColor: '边框颜色',
  textBorderWidth: '边框宽度',
  textBorderType: '边框类型',
}