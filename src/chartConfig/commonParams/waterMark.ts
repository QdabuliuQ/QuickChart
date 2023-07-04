import { Common } from "../interface";
interface WaterMarkInterface {
  defaultOption: {
    waterMark: {
      [propName: string]: any
    }
  }
  allOption: {
    waterMark: {
      [propName: string]: any
    }
  }
  opNameList: {
    [propName: string]: any
  }
}

let waterMark: Common & WaterMarkInterface = {
  name: '图表水印',
  opName: 'waterMark',
  chartOption: false,
  menuOption: true,
  icon: 'i_mark',
  defaultOption: {
    waterMark: {
      show: false,
      text: '',
      opacity: 1,
      color: '#ccc',
      size: 20,
      rotate: 4
    }
  },
  allOption: {
    waterMark: {
      show: false,
      text: '',
      opacity: 0.5,
      color: '#ccc',
      size: 20,
      rotate: 4
    }
  },
  opNameList: {
    show: '显示水印',
    text: '水印文本',
    opacity: '透明度',
    color: '字体颜色',
    size: '字体大小',
    rotate: '旋转角度'
  }
}

export default waterMark