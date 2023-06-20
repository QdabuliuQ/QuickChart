import { markRaw } from 'vue';
import useCommonStore from "@/store/common";
import { create, convey } from "@/chartConfig/conveyUtils/pieConvey";
import paramsPieStyle from "@/views/ChartPanel/components/paramsPie/paramsPieStyle.vue";
import paramsPieText from "@/views/ChartPanel/components/paramsPie/paramsPieText.vue";
import paramsPieLine from "@/views/ChartPanel/components/paramsPie/paramsPieLine.vue";
import title from "@/chartConfig/commonParams/title";
import canvas from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import legendOption from "@/chartConfig/commonParams/legend";
import waterMark from "@/chartConfig/commonParams/waterMark";
import pie_label from "@/chartConfig/commonParams/pie_label";
import pie_labelLine from "@/chartConfig/commonParams/pie_labelLine";
import { conveyToExcel } from '@/chartConfig/conveyUtils/conveyData';
const common: any = useCommonStore()

const getOption = () => {
    let legend = legendOption()
    legend.defaultOption.legend!.left = 1
    legend.defaultOption.legend!.orient = 'vertical'
    legend.defaultOption.legend!.icon = 'roundRect'
    title.defaultOption.title.show = false
    return [
        title,
        canvas,
        gridOption(),
        legend,
        waterMark,
        {
            name: 'series',
            opName: 'series',
            chartOption: true,
            defaultOption: {
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: '60%',
                        center: ['50%', '50%'],
                        label: {
                            ...pie_label,
                        },
                        labelLine: {
                            ...pie_labelLine
                        },
                        data: [
                            { name: 'Search Engine', value: 1048 },
                            { name: 'Direct', value: 735 },
                            {  name: 'Email', value: 580 },
                            { name: 'Union Ads', value: 484 },
                            { name: 'Video Ads', value: 300, }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
        },
        {
            name: '饼图样式',
            opName: 'pieStyle',
            chartOption: false,
            menuOption: true,
            uniqueOption: true,
            icon: 'i_pie',
            component: markRaw(paramsPieStyle),
            allOption: {},
        },
        {
            name: '文本样式',
            opName: 'textStyle',
            chartOption: false,
            menuOption: true,
            uniqueOption: true,
            icon: 'i_text',
            component: markRaw(paramsPieText),
            allOption: {},
        },
        {
            name: '引导线样式',
            opName: 'lineStyle',
            chartOption: false,
            menuOption: true,
            uniqueOption: true,
            icon: 'i_gline',
            component: markRaw(paramsPieLine),
            allOption: {},
        },
    ]
}

export default getOption

export function combineOption(data: any) {
    let series = common.option.series
    series[0].data = data.seriesData
    return {
        series
    }
}
export const createExcelData = (config: any) => {
    return conveyToExcel([
        {
            direction: 'col',
            data: config.series[0].data
        }
    ])
}
// 收集数据并进行转换
export const conveyExcelData = (rows: any) => {
    if (!rows) return null
    let datas: any = {
        seriesData: <any>[]
    }
    // 遍历数据项
    console.log(rows);
    
    let rowsTLength = Object.keys(rows).length;
    for (let i = 0; i < rowsTLength; i++) {
        let val1 = rows[i] && rows[i].cells[0] ? rows[i].cells[0].text : ''
        let val2 = rows[i] && rows[i].cells[1] ? parseFloat(rows[i].cells[1].text) : NaN
        if (val1 == '' || isNaN(val2)) break
        datas.seriesData.push({  // 创建series
            name: val1,
            value: val2
        })
    }
    console.log(datas);
    
    return datas
}


