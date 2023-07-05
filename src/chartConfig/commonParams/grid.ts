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
import {Common} from "../interface";
import {replaceOptionValue} from "@/chartConfig/tools";

interface GridInterface {
    defaultOption: {
        grid: {
            [propName: string]: any
        } | null
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

const allOption = {
    grid: {
        show: false,
        left: '10%',
        top: '10%',
        bottom: '10%',
        right: '10%',
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
}
const opNameList = {
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
const grid = {
    name: '图表布局',
    opName: 'grid',
    chartOption: true,
    menuOption: true,
    icon: 'i_grid',
    defaultOption: {
        grid: null
    },
    allOption,
    opNameList,
}
const gridOption = (options?: any): Common & GridInterface => {
    const dOption = {
        show: false,
        left: '10%',
        top: '10%',
        bottom: '10%',
        right: '10%',
        backgroundColor: null,
        borderColor: '#ccc',
        borderWidth: 1,
        shadowBlur: 10,
        shadowColor: null,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        containLabel: false
    }
    replaceOptionValue(dOption, options)
    grid.defaultOption.grid = dOption as any
    return grid
}


export default gridOption