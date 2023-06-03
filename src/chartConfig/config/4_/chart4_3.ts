import { markRaw } from 'vue';
import useCommonStore from "@/store/common";
import title from "@/chartConfig/commonParams/title";
import canvas from "@/chartConfig/commonParams/canvas";
import grid from "@/chartConfig/commonParams/grid";
import waterMark from "@/chartConfig/commonParams/waterMark";
import legend from "@/chartConfig/commonParams/legend";
import { pointData } from "@/chartConfig/constant";
import { 
  point_series_itemStyle
} from "@/chartConfig/option";
import paramsPointStyle from "@/views/ChartPanel/components/paramsPoint/paramsPointStyle.vue";
import paramsPointAngleAxis from "@/views/ChartPanel/components/paramsPoint/paramsPointAngleAxis.vue";
import lodash from 'lodash';

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
const datas = pointData

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
            symbol: 'circle',
            color: '',
            itemStyle: point_series_itemStyle(),
            symbolSize: function (val: any) {
              return val[2] * 2;
            },
            data: datas,
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
      component: markRaw(paramsPointStyle),
      allOption: {},
    },
    {
      name: '内外圈大小',
      opName: 'polar',
      chartOption: true,
      menuOption: false,
      uniqueOption: false,
      icon: '',
      defaultOption: {
        polar: {},
      },
      allOption: {},
    },
    {
      name: '极坐标角度轴',
      opName: 'angleAxis',
      chartOption: true,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_angleAxis',
      component: markRaw(paramsPointAngleAxis),
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
      allOption: {},
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

export default getOption

export const createExcelData = (config: any) => {
  let excelData: any = {}
  let angleAxisData = config.angleAxis.data
  let radiusAxisData = config.radiusAxis.data
  let data = config.series[0].data
  excelData[0] = {
    cells: {
    }
  }
  excelData[1] = {
    cells: {
    }
  }
  for(let i = 0; i < angleAxisData.length; i ++) {
    excelData[0].cells[i] = {
      text: angleAxisData[i]
    }
  }
  for(let i = 0; i < radiusAxisData.length; i ++) {
    excelData[1].cells[i] = {
      text: radiusAxisData[i]
    }
  }
  for(let i = 0; i < data.length; i ++) {
    excelData[2+i] = {
      cells: {
        0: {text: data[i] ? data[i][0].toString() : ''},
        1: {text: data[i] ? data[i][1].toString() : ''},
        2: {text: data[i] ? data[i][2].toString() : ''},
      }
    }
  }
  return excelData
}
// 收集数据并进行转换
export const conveyExcelData = (rows: any) => {
  
  let angleAxis = lodash.cloneDeep(common.option.angleAxis)
  let radiusAxis = lodash.cloneDeep(common.option.radiusAxis)
  let series = lodash.cloneDeep(common.option.series)
  let xLength = Object.keys(rows[0].cells).length
  let yLength = Object.keys(rows[1].cells).length
  let dataObj = {
    angleAxis,
    radiusAxis,
    series
  }
  dataObj.angleAxis.data = []
  dataObj.radiusAxis.data = []
  dataObj.series[0].data = []
  for(let i = 0; i < xLength; i ++) {
    dataObj.angleAxis.data[i] = rows[0] && rows[0].cells && rows[0].cells[i] ? rows[0].cells[i].text : ''
  }
  for(let i = 0; i < yLength; i ++) {
    dataObj.radiusAxis.data[i] = rows[1] && rows[1].cells && rows[1].cells[i] ? rows[1].cells[i].text : ''
  }
  for(let i = 2; i < rows.len; i ++) {
    let val1 = rows[i] && rows[i].cells && rows[i].cells[0] ? parseInt(rows[i].cells[0].text) : ''
    let val2 = rows[i] && rows[i].cells && rows[i].cells[1] ? parseInt(rows[i].cells[1].text) : ''
    let val3 = rows[i] && rows[i].cells && rows[i].cells[2] ? parseInt(rows[i].cells[2].text) : ''
    dataObj.series[0].data[i-2] = [val1, val2, val3]
  }
  
  return dataObj
}
