import {
  leftText,
  topText,
  bottomText,
  rightText,
} from "@/chartConfig/constant";

import { Common } from "../interface";
interface LegendInterface {
  defaultOption: {
    legend: {
      [propName: string]: any
    }
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

let legend: Common & LegendInterface = {
  name: '图例样式',
  opName: 'legend',
  chartOption: true,
  menuOption: true,
  icon: 'i_legend',
  defaultOption: {
    legend: {
      show: true,
      icon: 'circle',
      left: 'auto',
      top: 'auto',
      right: 1,
      bottom: 'auto',
      width: 'auto',
      height: 'auto',
      orient: 'horizontal',
      itemWidth: 25,
      itemHeight: 14,
    }
  },
  allOption: {
    legend: {
      show: true,
      icon: [
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
          label: '水平',
        },
        {
          value: 'vertical',
          label: '竖直',
        },
      ],
      itemWidth: 25,
      itemHeight: 14,
    }
  },
  opNameList: {
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
}

export default legend