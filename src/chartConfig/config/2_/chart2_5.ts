import useCommonStore from "@/store/common";
import titleOption from "@/chartConfig/commonParams/title";
import canvasOption from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import {conveyToExcel} from "@/chartConfig/conveyUtils/conveyData";
import {bar_angleAxis_axis, bar_series_label} from "@/chartConfig/option";
import colorOption from "@/chartConfig/commonParams/color";
import graphicOption from "@/chartConfig/commonParams/graphic";

const common: any = useCommonStore()
const series_label = bar_series_label({
  'position': 'middle',
})
export default () => {
  return [
    titleOption({
      'show': false
    }),
    canvasOption(),
    gridOption(),
    graphicOption(),
    colorOption(),
    {
      name: 'dataset',
      opName: 'dataset',
      chartOption: true,
      menuOption: false,
      uniqueOption: false,
      defaultOption: {
        dataset: {
          source: [
            ['a', 2],
            ['b', 1.2],
            ['c', 2.4],
            ['d', 3.6],
          ]
        },
      },
    },
    {
      name: '内外圈大小',
      opName: 'polar',
      chartOption: true,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_angleAxis',
      componentPath: 'paramsBar/paramsBarPolar.vue',
      defaultOption: {
        polar: {
          radius: ['15%', '80%']
        },
      },
    },
    {
      name: '径向轴样式',
      opName: 'radiusAxis',
      chartOption: true,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_radiusAxis',
      componentPath: 'paramsBar/paramsBarRadiusAxis.vue',
      defaultOption: {
        radiusAxis: {
          max: 5,
          splitNumber: 5,
          axisLine: bar_angleAxis_axis({
            'lineStyle.color': '#ccc'
          }),
          axisLabel: {
            show: true,
            rotate: 0,
            margin: 8,
            color: '#000',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontFamily: 'sans-serif',
            fontSize: 12,
          }
        },
      },
    },
    {
      name: '极坐标系',
      opName: 'angleAxis',
      chartOption: true,
      menuOption: false,
      uniqueOption: false,
      defaultOption: {
        angleAxis: {
          type: 'category',
          clockwise: false,
          startAngle: 75,
          axisLine: bar_angleAxis_axis(),
          axisTick: bar_angleAxis_axis({
            'length': 5,
            'lineStyle.color': '#000'
          }),
          splitLine: bar_angleAxis_axis({
            'show': false
          }),
        },
      },
    },
    {
      name: '数据',
      opName: 'series',
      chartOption: true,
      menuOption: false,
      defaultOption: {
        series: [
          {
            type: 'bar',
            coordinateSystem: 'polar',
            label: series_label
          }
        ]
      }
    },
    {
      name: '坐标轴轴线',
      opName: 'axisLine',
      chartOption: false,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_circle',
      componentPath: 'paramsBar/paramsBarAngleAxisLine.vue',
    },
    {
      name: '坐标轴刻度',
      opName: 'axisTick',
      chartOption: false,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_tick',
      componentPath: 'paramsBar/paramsBarAngleAxisTick.vue',
    },
    {
      name: '坐标轴分割线',
      opName: 'splitLine',
      chartOption: false,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_sline',
      componentPath: 'paramsBar/paramsBarAngleSplitLine.vue',
    },
    {
      name: '文本样式',
      opName: 'textStyle',
      chartOption: false,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_text',
      componentPath: 'paramsBar/paramsBarText.vue'
    },
  ]
}

export function combineOption(data: any) {
  let dataset = common.option.dataset
  dataset.source = data.datasetData
  return {
    dataset,
  }
}

export const createExcelData = (config: any) => {
  return conveyToExcel([
    {
      direction: 'col',
      data: config.dataset.source,
      startCol: 0,
    },
  ])
}

// 收集数据并进行转换
export const conveyExcelData = (rows: any) => {
  if (!rows) return null
  let datas = {
    datasetData: <any>[],
  }
  for (let key in rows) {
    if (JSON.stringify(rows[key].cells) != '{}') {
      if (!rows[key].cells[0] || !rows[key].cells[1]) break
      datas.datasetData.push([
        rows[key].cells[0].text,
        rows[key].cells[1].text
      ])
    } else break
  }
  return datas
}