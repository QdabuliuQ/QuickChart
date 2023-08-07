import {Common} from "../interface";
import {chartPath} from "@/chartConfig/constant";

const graphicOption = (): Common => {
  return {
    name: '图形组件',
    opName: 'graphic',
    chartOption: true,
    menuOption: true,
    icon: 'i_component',
    componentPath: chartPath + 'paramsGraphic',
    defaultOption: {
      graphic: []
    },
  }
}

export default graphicOption