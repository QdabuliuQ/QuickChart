import {Common} from "../interface";

const graphicOption = (): Common => {
  return {
    name: '图形组件',
    opName: 'graphic',
    chartOption: true,
    menuOption: true,
    icon: 'i_component',
    componentPath: 'paramsGraphic.vue',
    defaultOption: {
      graphic: []
    },
  }
}

export default graphicOption