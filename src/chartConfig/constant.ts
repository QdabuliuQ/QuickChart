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
export const symbol: ListInt[] = [
  {
    value: 'circle',
    label: '圆形',
  },
  {
    value: 'rect',
    label: '矩形',
  },
  {
    value: 'roundRect',
    label: '圆角矩形',
  },
  {
    value: 'triangle',
    label: '三角形',
  },
  {
    value: 'diamond',
    label: '菱形',
  },
  {
    value: 'pin',
    label: '坐标',
  },
  {
    value: 'arrow',
    label: '箭头',
  },
]
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
export const align: ListInt[] = [
  {
    value: 'left',
    label: '左侧'
  },
  {
    value: 'center',
    label: '中间'
  },
  {
    value: 'right',
    label: '右侧'
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
export const position: ListInt[] = [
  {
    value: 'top',
    label: '上方'
  },
  {
    value: 'left',
    label: '左侧'
  },
  {
    value: 'right',
    label: '右侧'
  },
  {
    value: 'bottom',
    label: '下方'
  },
  {
    value: 'inside',
    label: '内侧'
  },
  {
    value: 'insideLeft',
    label: '内侧左方'
  },
  {
    value: 'insideRight',
    label: '内侧右方'
  },
  {
    value: 'insideTop',
    label: '内侧上方'
  },
  {
    value: 'insideBottom',
    label: '内侧下方'
  },
  {
    value: 'insideTopLeft',
    label: '内侧左上方'
  },
  {
    value: 'insideBottomLeft',
    label: '内侧左下方'
  },
  {
    value: 'insideTopRight',
    label: '内侧右上方'
  },
  {
    value: 'insideBottomRight',
    label: '内侧右下方'
  },
]
export const verticalAlign: ListInt[] = [
  {
    value: 'top',
    label: '上方'
  },
  {
    value: 'middle',
    label: '中间'
  },
  {
    value: 'bottom',
    label: '下方'
  },
]
export const shape: ListInt[] = [
  {
    value: 'polygon',
    label: '多边形',
  },
  {
    value: 'circle',
    label: '圆形'
  }
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
export const pointData = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]];
export const pointData_2 = [
  [20, 22, 33, 'Australia'],
  [3, 25, 50, 'Canada'],
  [41, 50, 60, 'China'],
  [13, 74, 40, 'Cuba'],
  [28, 51, 49, 'Finland'],
  [12, 34, 59, 'France'],
  [51, 37, 45, 'Germany'],
  [15, 54, 22, 'Iceland'],
  [17, 5, 76, 'India'],
  [20, 7, 15, 'Japan'],
  [21, 67.9, 24, 'North Korea'],
  [17, 30, 30, 'South Korea'],
  [21, 75.4, 34, 'New Zealand'],
  [46, 76.8, 45, 'Norway'],
  [18, 70.8, 38, 'Poland'],
  [29, 6, 16, 'Russia'],
  [10, 67, 53, 'Turkey'],
  [33, 75, 53, 'United Kingdom'],
  [37, 7, 25, 'United States']
]

