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
import pie_label from "@/chartConfig/commonParams/pie_label";
import pie_labelLine from "@/chartConfig/commonParams/pie_labelLine";

const common: any = useCommonStore()

const getOption = () => {
  legend.defaultOption.legend.top = '5%'
  legend.defaultOption.legend.left = 'center'
  legend.defaultOption.legend.orient = 'horizontal'
  title.defaultOption.title.show = false
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
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '70%'],
            startAngle: 180,
            label: {
              ...pie_label
            },
            labelLine: {
              ...pie_labelLine
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' },
              {
                value: 1048 + 735 + 580 + 484 + 300,
                itemStyle: {
                  color: 'none',
                  decal: {
                    symbol: 'none'
                  }
                },
                label: {
                  show: false
                }
              }
            ]
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

export const createExcelData = (config: any) => {
  return create(config, (series: any) => {
    let data = JSON.parse(JSON.stringify(series))
    data.splice(Object.keys(series).length - 1, 1)
    return data
  })
}
// 收集数据并进行转换
export const conveyExcelData = (rows: any) => {
  return convey(rows, common.option.series, (dataObj: any) => {
    let dataOption = {
      value: 0,
      itemStyle: {
        color: 'none',
        decal: {
          symbol: 'none'
        }
      },
      label: {
        show: false
      }
    }
    let sum: number = 0
    for(let { value } of dataObj.series[0].data) {
      sum += parseInt(value)
    }
    dataOption.value = sum
    dataObj.series[0].data.push(dataOption)
    return dataObj
  })
}
