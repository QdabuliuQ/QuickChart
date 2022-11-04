import { Common } from "../interface";
interface CanvasInterface {
  defaultOption: {
    [propName: string]: any
  }
  allOption: {
    [propName: string]: any
  }
  opNameList: {
    [propName: string]: any
  }
}

let canvas: Common & CanvasInterface = {
  name: '图表画布',
  opName: 'canvas',
  chartOption: false,
  menuOption: true,
  icon: 'i_canvas',
  defaultOption: {
    width: 700,
    height: 500,
    bgc: '#fff',
  },
  allOption: {
    width: 0,
    height: 0,
    bgc: '',
  },
  opNameList: {
    width: '画布宽度',
    height: '画布高度',
    bgc: '画布颜色'
  }
}

export default canvas