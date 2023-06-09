import { markRaw } from "vue";
import lodash from 'lodash'
import useCommonStore from "@/store/common";
// 导入独立组件
import paramsBarPolar from "@/views/ChartPanel/components/paramsBar/paramsBarPolar.vue";
import paramsBarAxis from "@/views/ChartPanel/components/paramsBar/paramsBarAxis.vue";
import paramsBarAngle from "@/views/ChartPanel/components/paramsBar/paramsBarAngle.vue";
import title from "@/chartConfig/commonParams/title";
import canvas from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import waterMark from "@/chartConfig/commonParams/waterMark";

const common: any = useCommonStore()

const getOption = () => {
  return [
    title,
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

export const createExcelData = (config: any) => {
  let excelData: any = {}

  let series = config.series
  let angleAxis = config.angleAxis.data
  let length = series.length > angleAxis.length ? series.length : angleAxis.length
  for (let i = 0; i < length; i++) {
    excelData[i] = {
      cells: {}
    }
  }

  for (let i = 0; i < angleAxis.length; i++) {
    excelData[i].cells[0] = {
      text: angleAxis[i]
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
  let angleAxis = lodash.cloneDeep(common.option.angleAxis)
  let series = lodash.cloneDeep(common.option.series)
  let data = [], seriesData = []

  let dataObj: any = {
    angleAxis,
    series,
  }

  for (let key in rows) {
    if (rows[key].cells) {
      data.push(rows[key].cells[0]?.text)
      seriesData.push(rows[key].cells[1]?.text)
    }
  }
  
  dataObj.series.data = seriesData
  angleAxis.data = data
  return dataObj
}