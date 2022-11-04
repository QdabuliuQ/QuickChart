import {
  colors,
} from "@/chartConfig/constant";
import { Common } from "../interface";
interface ColorInterface {
  defaultOption: {
    color: any[]
  }
  allOption: {
    color: any[]
  }
}

let color: Common & ColorInterface = {
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
}

export default color