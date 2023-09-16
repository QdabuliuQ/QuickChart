import useCommonStore from "@/store/common";
import titleOption from "@/chartConfig/commonParams/title";
import canvasOption from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import graphicOption from "@/chartConfig/commonParams/graphic"
import colorOption from "@/chartConfig/commonParams/color";
import { conveyToExcel } from '@/chartConfig/conveyUtils/conveyData';
import {chartPath} from "@/chartConfig/constant";
const common: any = useCommonStore()

export default () => {
  return [
    titleOption({
      'show': false
    }),
    gridOption(),
    canvasOption(),
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
            [
              4200, 5000, 20000, 22000, 41000, 14000
            ],
            [
              5300, 12000, 17000, 15000, 50000, 18000
            ],
          ]
        },
      },
      allOption: {},
    },
    {
      name: 'radar',
      opName: 'radar',
      chartOption: true,
      menuOption: false,
      uniqueOption: false,
      defaultOption: {
        radar: {
          shape: 'polygon',
          nameGap: 15,
          splitNumber: 5,
          center: ['50%', '50%'],
          radius: '75%',
          startAngle: 90,
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(250,250,250,0.3)','rgba(200,200,200,0.3)'],
              shadowBlur: 0 ,
              shadowColor: '' ,
              shadowOffsetX: 0 ,
              shadowOffsetY: 0 ,
              opacity: 1 ,
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#ccc',
              width: 1 ,
              type: 'solid',
              shadowBlur: 0 ,
              shadowColor: null,
              shadowOffsetX: 0 ,
              shadowOffsetY: 0 ,
              opacity: 1 ,
            }
          },
          axisLabel: {
            show: false,
            rotate: 0,
            margin: 8,
            color: '',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontFamily: 'sans-serif',
            fontSize: 12,
            borderColor: '',
            borderWidth: 0,
            borderType: 'solid',
            shadowColor: '',
            shadowBlur: 0,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#333',
              width: 1,
              type: 'solid',
              shadowBlur: 0,
              shadowColor: '',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              opacity: 1,
            }
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: '',
              width: 1,
              type: 'solid',
              shadowBlur: 0,
              shadowColor: '',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              opacity: 1,
            },
          },
          axisName: {
            show: true,
            color: '#333',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontFamily: 'sans-serif',
            fontSize: 12,
            backgroundColor: '',
            textBorderColor: '',
            textBorderWidth: 0,
            textBorderType: 'solid',
            textShadowColor: '',
            textShadowBlur: 0,
            textShadowOffsetX: 0,
            textShadowOffsetY: 0,
          },
          indicator: [
            { name: 'Sales' },
            { name: 'Administration' },
            { name: 'Information Technology' },
            { name: 'Customer Support' },
            { name: 'Development' },
            { name: 'Marketing' }
          ]
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
            type: 'radar',
            symbol: 'circle' ,
            symbolSize: 4 ,
            symbolRotate: 0,
            lineStyle: {
              width: 1 ,
              type: 'solid' ,
              opacity: 1 ,
            },
            label: {
              show: false,
              fontSize: 12,
              rotate: 0,
              position: 'top',
              fontStyle: 'normal' ,
              fontWeight: 'normal' ,
              fontFamily: 'sans-serif',
              color: '#000'
            }
          },
        ]
      }
    },
    {
      name: '雷达图样式',
      opName: 'radarStyle',
      chartOption: false,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_radar_chart',
      componentPath: chartPath + "paramsRadar/paramsRadarStyle",
    },
    {
      name: '文本样式',
      opName: 'textStyle',
      chartOption: false,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_text',
      componentPath: chartPath + "paramsRadar/paramsRadarAxisName",
    },
    {
      name: '坐标轴样式',
      opName: 'axisLineStyle',
      chartOption: false,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_sline',
      componentPath: chartPath + "paramsRadar/paramsRadarAxisLine",
    },
    {
      name: '轴刻度样式',
      opName: 'axisTickStyle',
      chartOption: false,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_tick',
      componentPath: chartPath + "paramsRadar/paramsRadarAxisTick",
    },
    {
      name: '轴刻尺样式',
      opName: 'axisLabelStyle',
      chartOption: false,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_num',
      componentPath: chartPath + "paramsRadar/paramsRadarAxisLabel",
    },
    {
      name: '分割线样式',
      opName: 'splitLineStyle',
      chartOption: false,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_gsline',
      componentPath: chartPath + "paramsRadar/paramsRadarSplitLine",
    },
    {
      name: '分割域样式',
      opName: 'splitAreaStyle',
      chartOption: false,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_sarea',
      componentPath: chartPath + "paramsRadar/paramsRadarSplitArea",
    },
    {
      name: '线段样式',
      opName: 'lineStyle',
      chartOption: false,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_radar_line',
      componentPath: chartPath + "paramsRadar/paramsRadarLineStyle",
    },
  ]
}

export function combineOption(data: any) {
  let dataset = common.option.dataset
  let radar = common.option.radar
  let series = common.option.series

  dataset.source = data.datasetData
  radar.indicator = data.indicatorData
  series[0].data = data.datasetData
  return {
    dataset,
    radar,
    series
  }
}

export const createExcelData = (config: any) => {
  return conveyToExcel([
    {
      direction: 'row',
      data: config.radar.indicator.map((item: any) => item.name),
      startRow: 0,
    },
    {
      direction: 'col',
      data: config.dataset.source,
      startRow: 1,
    },
  ])
}

// 收集数据并进行转换
export const conveyExcelData = (rows: any, options: any) => {
  if (!rows) return null
  let datas: any = {
    datasetData: <any>[],
    seriesData: <any>[],
    indicatorData: <any>[]
  }
  // 遍历数据项
  let len = Object.keys(rows).length;
  outer: for (let i = 0; i < len; i++) {
    let rowsLength = Object.keys(rows[i].cells).length
    if (i == 0) {
      for (let j = 0; j < rowsLength; j++) {
        if (!rows[i].cells || !rows[i].cells[j]) break outer
        datas.indicatorData.push({
          name: rows[i].cells[j].text,
        })
      }
    } else {
      datas.datasetData[i - 1] = []
      for (let j = 0; j < rowsLength; j++) {
        if (!rows[i].cells || !rows[i].cells[j]) break outer
        datas.datasetData[i - 1].push(parseFloat(rows[i].cells[j].text))
      }
    }
  }
  if (datas.datasetData.length && options.series.length) {
    datas.seriesData.push(options.series[0])
  }
  return datas
}