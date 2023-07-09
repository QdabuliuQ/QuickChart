import {Common} from "../interface";

const canvas = {
  name: '图表画布',
  opName: 'backgroundColor',
  chartOption: true,
  menuOption: true,
  icon: 'i_canvas',
  componentPath: 'paramsCanvas.vue',
  defaultOption: {
    backgroundColor: null,
  }
}

const canvasOption = (option?: any): Common => {
  canvas.defaultOption.backgroundColor = option ? option : '#fff'
  return canvas
}
export default canvasOption