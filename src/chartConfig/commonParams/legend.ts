import { Common } from "../interface";
import { replaceOptionValue } from "../tools";

const legend: Common = {
  name: '图例样式',
  opName: 'legend',
  chartOption: true,
  menuOption: true,
  icon: 'i_legend',
  componentPath: 'paramsLegend.vue',
  defaultOption: {
    legend: null
  },
}

const legendOption = (options?: any): Common => {
  const dOption = {
    show: true,
    icon: 'circle',
    left: '3%',
    top: '3%',
    orient: 'horizontal',
    itemWidth: 25,
    itemHeight: 14,
    itemGap: 10,
  }
  replaceOptionValue(dOption, options)
  legend.defaultOption.legend = dOption
  return legend
}
export default legendOption