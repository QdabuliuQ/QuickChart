import { markRaw } from 'vue';
import useCommonStore from "@/store/common";
import { create, convey } from "@/chartConfig/conveyUtils/pieConvey";
import paramsPieStyle from "@/views/ChartPanel/components/paramsPie/paramsPieStyle.vue";
import paramsPieText from "@/views/ChartPanel/components/paramsPie/paramsPieText.vue";
import paramsPieLine from "@/views/ChartPanel/components/paramsPie/paramsPieLine.vue";
import title from "@/chartConfig/commonParams/title";
import canvas from "@/chartConfig/commonParams/canvas";
import grid from "@/chartConfig/commonParams/grid";
import legend from "@/chartConfig/commonParams/legend";
import waterMark from "@/chartConfig/commonParams/waterMark";

const common: any = useCommonStore()
legend.defaultOption.legend.bottom = 'bottom'
legend.defaultOption.legend.orient = 'horizontal'
title.defaultOption.title.show = false


export default [
  title,
  canvas,
  grid,
  legend,
  waterMark,
  {
    name: '数据',
    opName: 'series',
    chartOption: true,
    menuOption: false,
    defaultOption: {
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: [30, 90],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          label: {
            show: true,
            color: '#000',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontFamily: 'sans-serif',
            fontSize: 12,
            textShadowColor: 'transparent',
            position: 'outer',
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
            { value: 40, name: 'rose 1' },
            { value: 38, name: 'rose 2' },
            { value: 32, name: 'rose 3' },
            { value: 30, name: 'rose 4' },
            { value: 28, name: 'rose 5' },
            { value: 26, name: 'rose 6' },
            { value: 22, name: 'rose 7' },
            { value: 18, name: 'rose 8' }
          ],
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