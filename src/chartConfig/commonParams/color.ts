import { Common } from "../interface";

let color: Common = {
  name: '系列颜色',
  opName: 'color',
  chartOption: true,
  menuOption: true,
  icon: 'i_color',
  componentPath: 'paramsColor.vue',
  defaultOption: {
    color: null
  },
}

const colorOption = (option?: any) => {
  color.defaultOption.color = option ? option : ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
  return color
}

export default colorOption