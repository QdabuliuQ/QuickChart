import {
  colors,
} from "@/chartConfig/constant";
import { Common } from "../interface";


let color: Common = {
  name: '系列颜色',
  opName: 'color',
  chartOption: true,
  menuOption: true,
  icon: 'i_color',
  componentPath: 'paramsColor.vue',
  defaultOption: {
    color: colors
  },
}

export default color