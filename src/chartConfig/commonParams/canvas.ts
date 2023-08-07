import {Common} from "../interface";
import {chartPath} from "@/chartConfig/constant";

const canvas = {
  name: '图表画布',
  opName: 'backgroundColor',
  chartOption: true,
  menuOption: true,
  icon: 'i_canvas',
  componentPath: chartPath + 'paramsCanvas',
  defaultOption: {
    backgroundColor: null,
  }
}

const canvasOption = (option?: any): Common => {
  canvas.defaultOption.backgroundColor = option ? option : '#fff'
  return canvas
}
export default canvasOption