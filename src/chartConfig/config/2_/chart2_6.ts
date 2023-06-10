import { markRaw } from "vue";
import lodash from 'lodash'
import useCommonStore from "@/store/common";
// 导入独立组件
import paramsBarPolar from "@/views/ChartPanel/components/paramsBar/paramsBarPolar.vue";
import paramsBarAxis_2 from "@/views/ChartPanel/components/paramsBar/paramsBarAxis_2.vue";
import title from "@/chartConfig/commonParams/title";
import canvas from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import waterMark from "@/chartConfig/commonParams/waterMark";
import { conveyToExcel } from "@/chartConfig/conveyUtils/conveyData";

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

console.log(conveyToExcel([
  {
    direction: 'row',
    data: [
      '12a', '1a', '2a', '3a', '4a', '5a', '6a',
      '7a', '8a', '9a', '10a', '11a',
      '12p', '1p', '2p', '3p', '4p', '5p',
      '6p', '7p', '8p', '9p', '10p', '11p', '15p'
    ],
    startRow: 0
  },
  {
    direction: 'row',
    data: [ 
      'Saturday', 'Friday', 'Thursday',
      'Wednesday', 'Tuesday', 'Monday', 'Sunday'
    ],
    startRow: 1
  },
  {
    direction: 'col',
    data: [[0, 0, 5],[1, 0, 1],[2, 0, 0],[3, 0, 0],[4, 0, 0],[5, 0, 0],[6, 0, 0],[7, 0, 0],[8, 0, 0],[9, 0, 0],[10, 0, 0],[11, 0, 2],[12, 0, 4],[13, 0, 1],[14, 0, 1],[15, 0, 3],[16, 0, 4],[17, 0, 6],[18, 0, 4],[19, 0, 4],[20, 0, 3],[21, 0, 3],[22, 0, 2],[23, 0, 5],[0, 1, 7],[1, 1, 0],[2, 1, 0],[3, 1, 0],[4, 1, 0],[5, 1, 0],[6, 1, 0],[7, 1, 0],[8, 1, 0],[9, 1, 0],[10, 1, 5],[11, 1, 2],[12, 1, 2],[13, 1, 6],[14, 1, 9],[15, 1, 11],[16, 1, 6],[17, 1, 7],[18, 1, 8],[19, 1, 12],[20, 1, 5],[21, 1, 5],[22, 1, 7],[23, 1, 2],[0, 2, 1],[1, 2, 1],[2, 2, 0],[3, 2, 0],[4, 2, 0],[5, 2, 0],[6, 2, 0],[7, 2, 0],[8, 2, 0],[9, 2, 0],[10, 2, 3],[11, 2, 2],[12, 2, 1],[13, 2, 9],[14, 2, 8],[15, 2, 10],[16, 2, 6],[17, 2, 5],[18, 2, 5],[19, 2, 5],[20, 2, 7],[21, 2, 4],[22, 2, 2],[23, 2, 4],[0, 3, 7],[1, 3, 3],[2, 3, 0],[3, 3, 0],[4, 3, 0],[5, 3, 0],[6, 3, 0],[7, 3, 0],[8, 3, 1],[9, 3, 0],[10, 3, 5],[11, 3, 4],[12, 3, 7],[13, 3, 14],[14, 3, 13],[15, 3, 12],[16, 3, 9],[17, 3, 5],[18, 3, 5],[19, 3, 10],[20, 3, 6],[21, 3, 4],[22, 3, 4],[23, 3, 1],[0, 4, 1],[1, 4, 3],[2, 4, 0],[3, 4, 0],[4, 4, 0],[5, 4, 1],[6, 4, 0],[7, 4, 0],[8, 4, 0],[9, 4, 2],[10, 4, 4],[11, 4, 4],[12, 4, 2],[13, 4, 4],[14, 4, 4],[15, 4, 14],[16, 4, 12],[17, 4, 1],[18, 4, 8],[19, 4, 5],[20, 4, 3],[21, 4, 7],[22, 4, 3],[23, 4, 0],[0, 5, 2],[1, 5, 1],[2, 5, 0],[3, 5, 3],[4, 5, 0],[5, 5, 0],[6, 5, 0],[7, 5, 0],[8, 5, 2],[9, 5, 0],[10, 5, 4],[11, 5, 1],[12, 5, 5],[13, 5, 10],[14, 5, 5],[15, 5, 7],[16, 5, 11],[17, 5, 6],[18, 5, 0],[19, 5, 5],[20, 5, 3],[21, 5, 4],[22, 5, 2],[23, 5, 0],[0, 6, 1],[1, 6, 0],[2, 6, 0],[3, 6, 0],[4, 6, 0],[5, 6, 0],[6, 6, 0],[7, 6, 0],[8, 6, 0],[9, 6, 0],[10, 6, 1],[11, 6, 0],[12, 6, 2],[13, 6, 1],[14, 6, 3],[15, 6, 4],[16, 6, 0],[17, 6, 0],[18, 6, 0],[19, 6, 0],[20, 6, 1],[21, 6, 2],[22, 6, 2],[23, 6, 6]],
    startRow: 2
  }
]));

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