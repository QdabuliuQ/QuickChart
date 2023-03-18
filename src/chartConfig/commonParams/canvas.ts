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
    bgc: '#fff',
    repeat: 'repeat'
  },
  allOption: {
    bgc: '',
    repeat: 'repeat'
  },
  opNameList: {
    bgc: '画布颜色',
  }
}

export default canvas