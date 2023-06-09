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
                            { value: 1048, name: 'Search Engine' },
                            { value: 735, name: 'Direct' },
                            { value: 580, name: 'Email' },
                            { value: 484, name: 'Union Ads' },
                            { value: 300, name: 'Video Ads' }
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
            icon: 'i_line',
            component: markRaw(paramsPieLine),
            allOption: {},
        },
    ]
}

export default getOption

export const createExcelData = create
// 收集数据并进行转换
export const conveyExcelData = (rows: any) => {
    return convey(rows, common.option.series)
}


