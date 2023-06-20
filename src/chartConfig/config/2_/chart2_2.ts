import useCommonStore from "@/store/common";
import { create, convey } from "@/chartConfig/conveyUtils/lineConvey";
import {
  asisOpNameList
} from "@/chartConfig/constant";
import title from "@/chartConfig/commonParams/title";
import canvas from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import legendOption from "@/chartConfig/commonParams/legend";
import waterMark from "@/chartConfig/commonParams/waterMark";
import xAxis, { xAxisOption } from "@/chartConfig/commonParams/xAxis";
import yAxis, { yAxisOption } from "@/chartConfig/commonParams/yAxis";
import { conveyToExcel } from "@/chartConfig/conveyUtils/conveyData";

const common: any = useCommonStore()

const getOption = () => {
  return [
    title,
    canvas,
    gridOption(),
    legendOption(),
    waterMark,
    {
      name: 'dataset',
      opName: 'dataset',
      chartOption: true,
      menuOption: false,
      uniqueOption: false,
      defaultOption: {
        dataset: {
          source: [
            ['Mon', 120],
            ['Tue', 200],
            ['Wed', 150],
            ['Thu', 80],
            ['Fri', 70],
            ['Sat', 110],
            ['Sun', 130]
          ]
        },
      },
      allOption: {},
    },
    {
      name: 'X轴样式',
      opName: 'xAxis',
      chartOption: true,
      menuOption: true,
      icon: 'i_X',
      defaultOption: {
        xAxis: [{
          ...xAxis,
          type: 'category',
        }],
      },
      allOption: {
        xAxis: [
          {
            ...xAxisOption,
            type: 'category',
          }
        ]
      },
      opNameList: asisOpNameList
    },
    {
      name: 'Y轴样式',
      opName: 'yAxis',
      chartOption: true,
      menuOption: true,
      icon: 'i_Y',
      defaultOption: {
        yAxis: [{
          ...yAxis,
          type: 'value',
        }],
      },
      allOption: {
        yAxis: [
          {
            ...yAxisOption,
            type: 'value',
          }
        ]
      },
      opNameList: asisOpNameList
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
          }
        ]
      }
    },
  ]
}

export default getOption

export function combineOption(data: any) {
  let series = common.option.series
  let dataset = common.option.dataset
  series = data.seriesData
  dataset.source = data.datasetData
  return {
    series,
    dataset
  }
}

export const createExcelData = (config: any) => {
  return conveyToExcel([
    {
      direction: 'col',
      data: config.dataset.source,
      startRow: 0,
      startCol: 0
    }
  ])
}
// 收集数据并进行转换
export const conveyExcelData = (rows: any) => {
  if(!rows) return
  const seriesOptionItem = {
    type: 'bar',
  }
  let datas = {
    datasetData: <any>[],
    seriesData: <any>[]
  }
  let length: number = Object.keys(rows).length
  for(let i = 0; i < length; i ++) {
    if(JSON.stringify(rows[i].cells) == '{}') break
    datas.datasetData[i] = []
    let rowsLength: number = Object.keys(rows[i].cells).length
    for(let j = 0; j < rowsLength; j ++) {
      if (rows[i].cells[j].text == '') {
        datas.datasetData[i].push('')
      } else {
        datas.datasetData[i].push(isNaN(rows[i].cells[j].text) ? rows[i].cells[j].text : parseFloat(rows[i].cells[j].text))
      }
    }
  } 
  if(datas.datasetData.length) {
    for(let i = 0; i < datas.datasetData[0].length-1; i ++) {
      datas.seriesData.push(seriesOptionItem)
    }
  }
  return datas
}