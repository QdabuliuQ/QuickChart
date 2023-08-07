import {Common} from "../interface";
import {replaceOptionValue} from "@/chartConfig/tools";
import {chartPath} from "@/chartConfig/constant";

const grid = {
    name: '图表布局',
    opName: 'grid',
    chartOption: true,
    menuOption: true,
    icon: 'i_grid',
    componentPath: chartPath + 'paramsGrid',
    defaultOption: {
        grid: null
    },
}
const gridOption = (options?: any): Common => {
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