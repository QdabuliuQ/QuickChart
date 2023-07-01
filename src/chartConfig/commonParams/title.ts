import {
  leftText,
  topText,
  bottomText,
  rightText,
  fontWeight,
} from "@/chartConfig/constant";
import { Common } from "../interface";
import { replaceOptionValue } from "@/chartConfig/tools";
interface TitleInterface {
  defaultOption: {
    title: {
      [propName: string]: any
    } | null
  }
  allOption: {
    title: {
      [propName: string]: any
    }
  }
  opNameList: {
    [propName: string]: any
  }
}

const opNameList: { [propName: string]: any } = {
  text: '文本标题',
  show: '显示',
  textAlign: '对齐方式',
  left: leftText,
  right: rightText,
  top: topText,
  bottom: bottomText,
  backgroundColor: '背景色',
  color: '文本颜色',
  fontWeight: '文本加粗',
  fontSize: '字体大小',
}

const allOption = {
  title: {
    text: '',
    show: [true, false],
    textAlign: [
      {
        value: 'left',
        label: '左对齐',
      },
      {
        value: 'center',
        label: '居中',
      },
      {
        value: 'right',
        label: '右对齐',
      },
    ],
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '',
    textStyle: {
      color: '',
      fontWeight,
      fontSize: 18,
    }
  },
}

const title: Common & TitleInterface = {
  name: '标题样式',
  opName: 'title',
  chartOption: true,
  menuOption: true,
  icon: 'i_title',
  defaultOption: {
    title: null,
  },
  allOption,
  opNameList,
}

const titleOption = (options?: any): Common & TitleInterface => {
  const dOption = {
    text: '图表标题',
    show: true,
    textAlign: 'left',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0)',
    textStyle: {
      color: '#333',
      fontWeight: 'bolder',
      fontSize: 18,
    }
  }
  replaceOptionValue(dOption, options)
  title.defaultOption.title = dOption
  return title
}

export default titleOption;