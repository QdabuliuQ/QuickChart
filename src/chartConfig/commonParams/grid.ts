import {
  leftText,
  topText,
  bottomText,
  rightText,
  shadowY,
  shadowX,
  shadowColor,
  shadowBlur,
} from "@/chartConfig/constant";
import { Common } from "../interface";
interface GridInterface {
  defaultOption: {
    grid: {
      [propName: string]: any
    }
  }
  allOption: {
    grid: {
      [propName: string]: any
    }
  }
  opNameList: {
    [propName: string]: any
  }
}

const gridOption = (): Common & GridInterface => {
  return {
    name: '图表布局',
    opName: 'grid',
    chartOption: true,
    menuOption: true,
    icon: 'i_grid',
    defaultOption: {
      grid: {
        show: false,
        left: 60,
        top: 60,
        bottom: 60,
        right: 60,
        width: 'auto',
        height: 'auto',
        backgroundColor: 'transparent',
        borderColor: '#ccc',
        borderWidth: 1,
        shadowBlur: 10,
        shadowColor: '',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
      }
    },
    allOption: {
      grid: {
        show: false,
        left: 60,
        top: 60,
        bottom: 60,
        right: 60,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderColor: '#ccc',
        borderWidth: 1,
        shadowBlur: 10,
        shadowColor: '',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
      }
    },
    opNameList: {
      show: '显示网格',
      left: leftText,
      top: topText,
      bottom: bottomText,
      right: rightText,
      width: '宽度',
      height: '高度',
      backgroundColor: '背景色',
      borderColor: '边框颜色',
      borderWidth: '边框线宽',
      shadowBlur: shadowBlur,
      shadowColor: shadowColor,
      shadowOffsetX: shadowX,
      shadowOffsetY: shadowY,
    }
  }
}

export default gridOption