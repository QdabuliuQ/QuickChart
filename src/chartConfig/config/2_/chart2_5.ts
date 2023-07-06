import useCommonStore from "@/store/common";
import titleOption from "@/chartConfig/commonParams/title";
import canvas from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import { conveyToExcel } from "@/chartConfig/conveyUtils/conveyData";
import {bar_series_label} from "@/chartConfig/option";

const common: any = useCommonStore()
const series_label = bar_series_label({
  'position': 'middle',
  'formatter': '{b}: {c}'
})
export default () => {
  return [
    titleOption({
      'show': false
    }),
    canvas,
    gridOption(),
    {
      name: '内外圈大小',
      opName: 'polar',
      chartOption: true,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_circle',
      componentPath: 'paramsBar/paramsBarPolar.vue',
      defaultOption: {
        polar: {
          radius: [30, '80%']
        },
      },
    },
    {
      name: '圈内层次',
      opName: 'radiusAxis',
      chartOption: true,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_radiusAxis',
      componentPath: 'paramsBar/paramsBarAxis.vue',
      defaultOption: {
        radiusAxis: {
          max: 5
        },
      },
    },
    {
      name: '内圈角度',
      opName: 'angleAxis',
      chartOption: true,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_angle',
      componentPath: 'paramsBar/paramsBarAngle.vue',
      defaultOption: {
        angleAxis: {
          type: 'category',
          data: ['a', 'b', 'c', 'd'],
          startAngle: 60
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
            data: [2, 1.2, 2.4, 3.6],
            coordinateSystem: 'polar',
            label: series_label
          }
        ]
      }
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
  let angleAxis = common.option.angleAxis
  let series = common.option.series
  series[0].data = data.seriesData
  angleAxis.data = data.angleAxisData
  return {
    series,
    angleAxis
  }
}

export const createExcelData = (config: any) => {
  return conveyToExcel([
    {
      direction: 'col',
      data: config.angleAxis.data,
      startCol: 0,
      startRow: 0
    },
    {
      direction: 'col',
      data: config.series[0].data,
      startCol: 1,
      startRow: 0
    },
  ])
}

// 收集数据并进行转换
export const conveyExcelData = (rows: any) => {
  if (!rows) return null
  let datas = {
    angleAxisData: <any>[],
    seriesData: <any>[]
  }
  for (let key in rows) {
    if (JSON.stringify(rows[key].cells) != '{}') {
      if (rows[key].cells[0].text == '') {
        datas.angleAxisData.push('')
      } else {
        datas.angleAxisData.push(rows[key].cells[0].text)
      }
      if (rows[key].cells[1].text == '') {
        datas.seriesData.push('')
      } else {
        datas.seriesData.push(parseFloat(rows[key].cells[1].text))
      }
    } else break
  }
  return datas
}