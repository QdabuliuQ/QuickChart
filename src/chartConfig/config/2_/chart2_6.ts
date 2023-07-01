import { markRaw } from "vue";
import lodash from 'lodash'
import useCommonStore from "@/store/common";
// 导入独立组件
import paramsBarPolar from "@/views/ChartPanel/components/paramsBar/paramsBarPolar.vue";
import paramsBarAxis_2 from "@/views/ChartPanel/components/paramsBar/paramsBarAxis_2.vue";
import titleOption from "@/chartConfig/commonParams/title";
import canvas from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import waterMark from "@/chartConfig/commonParams/waterMark";
import { conveyToExcel } from "@/chartConfig/conveyUtils/conveyData";

const common: any = useCommonStore()

const getOption = () => {
  return [
    titleOption({
      'show': false
    }),
    canvas,
    gridOption(),
    waterMark,
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
      name: '圈内层次',
      opName: 'radiusAxis',
      chartOption: true,
      menuOption: false,
      uniqueOption: false,
      icon: 'i_radiusAxis',
      defaultOption: {
        radiusAxis: {
          type: 'category',
          data: ['a', 'b', 'c', 'd'],
        },
      },
      allOption: {},
    },
    {
      name: '内圈角度',
      opName: 'angleAxis',
      chartOption: true,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_angle',
      component: markRaw(paramsBarAxis_2),
      defaultOption: {
        angleAxis: {
          max: 4,
          startAngle: 75
        },
      },
      allOption: {},
    },
    {
      name: '数据',
      opName: 'series',
      chartOption: true,
      menuOption: false,
      defaultOption: {
        series: {
          type: 'bar',
          data: [2, 1.2, 2.4, 3.6],
          coordinateSystem: 'polar',
          label: {
            show: true,
            position: 'middle',
            formatter: '{b}: {c}'
          }
        }
      }
    },
  ]
}

export default getOption

export function combineOption(data: any) {
  let radiusAxis = common.option.radiusAxis
  let series = common.option.series
  series.data = data.seriesData
  radiusAxis.data = data.radiusAxisData
  return {
    series,
    radiusAxis
  }
}

export const createExcelData = (config: any) => {
  return conveyToExcel([
    {
      direction: 'col',
      data: config.radiusAxis.data,
      startCol: 0,
      startRow: 0
    },
    {
      direction: 'col',
      data: config.series.data,
      startCol: 1,
      startRow: 0
    },
  ])
}

// 收集数据并进行转换
export const conveyExcelData = (rows: any) => {
  if (!rows) return null
  let datas = {
    radiusAxisData: <any>[],
    seriesData: <any>[]
  }
  for (let key in rows) {
    if (JSON.stringify(rows[key].cells) != '{}') {
      if (rows[key].cells[0].text == '') {
        datas.radiusAxisData.push('')
      } else {
        datas.radiusAxisData.push(rows[key].cells[0].text)
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