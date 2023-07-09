import useCommonStore from "@/store/common";
import titleOption from "@/chartConfig/commonParams/title";
import canvasOption from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import { pointData } from "@/chartConfig/constant";
import { 
  point_series_itemStyle
} from "@/chartConfig/option";
import { conveyToExcel } from '@/chartConfig/conveyUtils/conveyData';
import colorOption from "@/chartConfig/commonParams/color";
import graphicOption from "@/chartConfig/commonParams/graphic";


const common: any = useCommonStore()
const axisData = [
  '12a', '1a', '2a', '3a', '4a', '5a', '6a',
  '7a', '8a', '9a', '10a', '11a',
  '12p', '1p', '2p', '3p', '4p', '5p',
  '6p', '7p', '8p', '9p', '10p', '11p'
];
const rAxisData = [
  'Saturday', 'Friday', 'Thursday','Wednesday', 'Tuesday', 'Monday', 'Sunday'
]

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
          source: pointData
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
        series: [
          {
            name: 'dataName',
            type: 'scatter',
            coordinateSystem: 'polar',
            symbol: 'circle',
            color: '',
            itemStyle: point_series_itemStyle(),
            symbolSize: function (val: any) {
              return val[2] * 2;
            },
          }
        ]
      }
    },
    {
      name: '散点样式',
      opName: 'pointStyle',
      chartOption: false,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_point',
      componentPath: "paramsPoint/paramsPointStyle.vue",
    },
    {
      name: '内外圈大小',
      opName: 'polar',
      chartOption: true,
      menuOption: false,
      uniqueOption: false,
      defaultOption: {
        polar: {},
      },
    },
    {
      name: '极坐标角度轴',
      opName: 'angleAxis',
      chartOption: true,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_angleAxis',
      componentPath: "paramsPoint/paramsPointAngleAxis.vue",
      defaultOption: {
        angleAxis: {
          type: 'category',
          data: axisData,
          boundaryGap: false,
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(195, 195, 195, 1)',
              width: 1,
              type: 'solid',
              shadowBlur: 0,
              shadowColor: '',
              shadowOffsetX: 0 ,
              shadowOffsetY: 0 ,
              opacity: 1 ,
            }
          },
          axisLine: {
            show: false
          }
        },
      },
    },
    {
      name: 'radiusAxis',
      opName: 'radiusAxis',
      chartOption: true,
      menuOption: false,
      uniqueOption: false,
      icon: '',
      defaultOption: {
        radiusAxis: {
          type: 'category',
          data: rAxisData,
          axisLine: {
            show: false
          },
          axisLabel: {
            rotate: 45
          }
        },
      },
      allOption: {},
    },
  ]
}

export const createExcelData = (config: any) => {
  return conveyToExcel([
    {
      direction: 'row',
      data: config.angleAxis.data,
      startRow: 0
    },
    {
      direction: 'row',
      data: config.radiusAxis.data,
      startRow: 1
    },
    {
      direction: 'col',
      data: config.dataset.source,
      startRow: 2
    },
  ])
}

export function combineOption(data: any) {
  let angleAxis = common.option.angleAxis
  let radiusAxis = common.option.radiusAxis
  let dataset = common.option.dataset

  angleAxis.data = data.angleAxisData
  radiusAxis.data = data.radiusAxisData
  dataset.source = data.datasetData
  return {
    angleAxis,
    radiusAxis,
    dataset
  }
}

export function conveyExcelData (rows: any) {
  if(!rows) return null
  let datas = {
    angleAxisData: <any>[],
    radiusAxisData: <any>[],
    datasetData: <any>[],
  }
  let length: number = Object.keys(rows).length-1
  for(let i = 0; i < length; i ++) {
    if(i == 0) {
      let n: number = Object.keys(rows[i].cells).length
      for(let j = 0; j < n; j ++) {
        datas.angleAxisData.push(rows[i].cells[j].text)
      }
    } else if(i == 1) {
      let n: number = Object.keys(rows[i].cells).length
      for(let j = 0; j < n; j ++) {
        datas.radiusAxisData.push(rows[i].cells[j].text)
      }
    } else {
      let val1 = rows[i] && rows[i].cells && rows[i].cells[0] ? parseFloat(rows[i].cells[0].text) : NaN
      let val2 = rows[i] &&rows[i].cells && rows[i].cells[1] ? parseFloat(rows[i].cells[1].text) : NaN
      let val3 = rows[i] &&rows[i].cells && rows[i].cells[2] ? parseFloat(rows[i].cells[2].text) : NaN
      if(isNaN(val1) || isNaN(val2) || isNaN(val3)) break
      datas.datasetData.push([val1, val2, val3])
    }
  }
  return datas
}
