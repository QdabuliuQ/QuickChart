import { markRaw } from 'vue';
import useCommonStore from "@/store/common";
import title from "@/chartConfig/commonParams/title";
import canvas from "@/chartConfig/commonParams/canvas";
import grid from "@/chartConfig/commonParams/grid";
import waterMark from "@/chartConfig/commonParams/waterMark";
import legend from "@/chartConfig/commonParams/legend";
import paramsBarPolar from "@/views/ChartPanel/components/paramsBar/paramsBarPolar.vue";
import { asisOpNameList } from "@/chartConfig/constant";
import xAxis, { xAxisOption } from "@/chartConfig/commonParams/xAxis";
import yAxis, { yAxisOption } from "@/chartConfig/commonParams/yAxis";

const common: any = useCommonStore()

const getOption = () => {

  return [
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
            type: 'scatter',
            coordinateSystem: 'polar',
            symbolSize: function (val: any) {
              return val[2] * 2;
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
          }
        ]
      }
    },
    {
      name: '内外圈大小',
      opName: 'polar',
      chartOption: true,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_circle',
      component: markRaw(paramsBarPolar),
      defaultOption: {
        polar: {
          radius: [30, '80%']
        },
      },
      allOption: {},
    },
    {
      name: '内外圈大小',
      opName: 'polar',
      chartOption: true,
      menuOption: false,
      uniqueOption: false,
      icon: '',
      
    }
  ]
}