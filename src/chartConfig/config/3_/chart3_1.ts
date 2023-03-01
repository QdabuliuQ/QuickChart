import lodash from 'lodash'
import { markRaw } from 'vue';
import useCommonStore from "@/store/common";
import { create, convey } from "@/chartConfig/conveyUtils/lineConvey";
import paramsPieStyle from "@/views/ChartPanel/components/paramsPie/paramsPieStyle.vue";
import paramsPieText from "@/views/ChartPanel/components/paramsPie/paramsPieText.vue";
import paramsPieLine from "@/views/ChartPanel/components/paramsPie/paramsPieLine.vue";
import title from "@/chartConfig/commonParams/title";
import canvas from "@/chartConfig/commonParams/canvas";
import grid from "@/chartConfig/commonParams/grid";
import legend from "@/chartConfig/commonParams/legend";
import waterMark from "@/chartConfig/commonParams/waterMark";


const common: any = useCommonStore()
legend.defaultOption.legend.left = 'left'
legend.defaultOption.legend.orient = 'vertical'
title.defaultOption.title.show = false

export default [
    title,
    canvas,
    grid,
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
                        show: true,
                        color: '#000',
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        fontFamily: 'sans-serif',
                        fontSize: 12,
                        textShadowColor: 'transparent',
                        position: 'outside',
                    },
                    labelLine: {
                        show: true,
                        length: 10,
                        length2: 20,
                        smooth: false,
                        lineStyle: {
                            width: 1,
                            type: 'solid'
                        }
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

export const createExcelData = create
// 收集数据并进行转换
export const conveyExcelData = (rows: any) => {
  return convey(rows, common.option.series)
}


