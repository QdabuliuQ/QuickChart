import { Common } from "../interface";
interface GraphicInterface {
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

const graphicOption = (): Common & GraphicInterface => {
    return {
        name: '图形组件',
        opName: 'graphic',
        chartOption: true,
        menuOption: true,
        icon: 'i_component',
        defaultOption: {
            graphic: []
        },
        allOption: {
            graphic: []
        },
        opNameList: {}
    }
}

export default graphicOption