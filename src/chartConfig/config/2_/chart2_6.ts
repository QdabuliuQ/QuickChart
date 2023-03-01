import { markRaw } from "vue";
import lodash from 'lodash'
import useCommonStore from "@/store/common";
// 导入独立组件
import paramsBarPolar from "@/views/ChartPanel/components/paramsBar/paramsBarPolar.vue";
import paramsBarAxis_2 from "@/views/ChartPanel/components/paramsBar/paramsBarAxis_2.vue";

import title from "@/chartConfig/commonParams/title";
import canvas from "@/chartConfig/commonParams/canvas";
import grid from "@/chartConfig/commonParams/grid";
import waterMark from "@/chartConfig/commonParams/waterMark";

const common: any = useCommonStore()

export default [
  title,
  canvas,
  grid,
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

export const createExcelData = (config: any) => {
  let excelData: any = {}

  let series = config.series
  let radiusAxis = config.radiusAxis.data
  let length = series.length > radiusAxis.length ? series.length : radiusAxis.length
  for (let i = 0; i < length; i++) {
    excelData[i] = {
      cells: {}
    }
  }

  for (let i = 0; i < radiusAxis.length; i++) {
    excelData[i].cells[0] = {
      text: radiusAxis[i]
    }
  }
  for (let i = 0; i < series.data.length; i++) {
    excelData[i].cells[1] = {
      text: series.data[i]
    }
  }
  return excelData
}

// 收集数据并进行转换
export const conveyExcelData = (rows: any) => {
  // 进行深拷贝
  let radiusAxis = lodash.cloneDeep(common.option.radiusAxis)
  let series = lodash.cloneDeep(common.option.series)
  let data = [], seriesData = []

  let dataObj: any = {
    radiusAxis,
    series,
  }

  for (let key in rows) {
    if (rows[key].cells) {
      data.push(rows[key].cells[0]?.text)
      seriesData.push(rows[key].cells[1]?.text)
    }
  }

  dataObj.series.data = seriesData
  radiusAxis.data = data
  return dataObj
}