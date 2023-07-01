import { markRaw } from "vue";
import lodash from 'lodash'
import useCommonStore from "@/store/common";
// 导入独立组件
import paramsBarPolar from "@/views/ChartPanel/components/paramsBar/paramsBarPolar.vue";
import paramsBarAxis from "@/views/ChartPanel/components/paramsBar/paramsBarAxis.vue";
import paramsBarAngle from "@/views/ChartPanel/components/paramsBar/paramsBarAngle.vue";
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
      menuOption: true,
      uniqueOption: true,
      icon: 'i_radiusAxis',
      component: markRaw(paramsBarAxis),
      defaultOption: {
        radiusAxis: {
          max: 5
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
      component: markRaw(paramsBarAngle),
      defaultOption: {
        angleAxis: {
          type: 'category',
          data: ['a', 'b', 'c', 'd'],
          startAngle: 60
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
  let angleAxis = common.option.angleAxis
  let series = common.option.series
  series.data = data.seriesData
  angleAxis.data = data.radiusAxisData
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