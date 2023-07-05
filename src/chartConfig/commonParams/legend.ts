import {
  leftText,
  topText,
  bottomText,
  rightText,
} from "@/chartConfig/constant";

import { Common } from "../interface";
import { replaceOptionValue } from "../tools";
interface LegendInterface {
  defaultOption: {
    legend: {
      [propName: string]: any
    } | null
  }
  allOption: {
    legend: {
      [propName: string]: any
    }
  }
  opNameList: {
    [propName: string]: any
  }
}

const opNameList = {
  show: '显示图例',
  icon: '图例类型',
  left: leftText,
  top: topText,
  right: rightText,
  bottom: bottomText,
  width: '宽度',
  height: '高度',
  orient: '布局朝向',
  itemWidth: '图例宽度',
  itemHeight: '图例高度',
}
const allOption = {
  legend: {
    show: true,
    icon: [
      {
        value: '',
        label: '默认'
      },
      {
        value: 'circle',
        label: '圆形',
      },
      {
        value: 'rect',
        label: '方形',
      },
      {
        value: 'roundRect',
        label: '圆角方形',
      },
      {
        value: 'triangle',
        label: '三方形',
      },
      {
        value: 'diamond',
        label: '菱形',
      },
      {
        value: 'arrow',
        label: '箭头',
      },
    ],
    left: 0,
    top: 0,
    right: 1,
    bottom: 0,
    width: 0,
    height: 0,
    orient: [
      {
        value: 'horizontal',
        label: '水平排列',
      },
      {
        value: 'vertical',
        label: '竖直排列',
      },
    ],
    itemWidth: 25,
    itemHeight: 14,
  }
}

const legend: Common & LegendInterface = {
  name: '图例样式',
  opName: 'legend',
  chartOption: true,
  menuOption: true,
  icon: 'i_legend',
  defaultOption: {
    legend: null
  },
  allOption,
  opNameList,
}

const legendOption = (options?: any): Common & LegendInterface => {
  const dOption = {
    show: true,
    icon: 'circle',
    left: '3%',
    top: '3%',
    orient: 'horizontal',
    itemWidth: 25,
    itemHeight: 14,
    itemGap: 10,
  }
  replaceOptionValue(dOption, options)
  legend.defaultOption.legend = dOption
  return legend
}
export default legendOption