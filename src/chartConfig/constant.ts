interface ListInt {
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