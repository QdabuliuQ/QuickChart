import useCommonStore from "@/store/common";
import titleOption from "@/chartConfig/commonParams/title";
import canvasOption from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import graphicOption from "@/chartConfig/commonParams/graphic";
import {mapPath} from "@/chartConfig/constant";
import {map_series_itemStyle, map_series_label} from "@/chartConfig/option";
import {conveyToExcel} from "@/chartConfig/conveyUtils/conveyData";

const common: any = useCommonStore()

export default () => {
  return [
    titleOption(),
    canvasOption(),
    gridOption(),
    graphicOption(),
    {
      defaultOption: {
        geo: {
          map: 'map',
          aspectScale: 0.9,
          roam: false,
          zoom: 1.2,
          layoutSize: '95%',
          layoutCenter: ['55%', '50%'],
        }
      }
    },
    {
      name: '数据',
      opName: 'series',
      chartOption: true,
      menuOption: false,
      defaultOption: {
        series: [
          {
            type: 'map',
            map: 'map',
            data: [],
            roam: true,
            label: map_series_label(),
            itemStyle: map_series_itemStyle(),
            labelLine: {
              show: true
            }
          }
        ]
      },
    },
    {
      name: '文本样式',
      opName: 'label',
      chartOption: false,
      menuOption: true,
      icon: 'i_text',
      componentPath: mapPath + 'paramsLabel',
    },
    {
      name: '板块样式',
      opName: 'itemStyle',
      chartOption: false,
      menuOption: true,
      icon: 'i_block',
      componentPath: mapPath + 'paramsItem',
    },
  ]
}

export function combineOption(data: any) {
  let series = common.option.series
  series[0].data = data.seriesData
  return {
    series
  }
}

export const createExcelData = (config: any) => {
  return conveyToExcel([
    {
      direction: 'col',
      data: config.series[0].data,
      startCol: 0,
    },
  ])
}

export const conveyExcelData = (rows: any, options: any) => {
  if (!rows) return null
  let datas = {
    seriesData: <any>[]
  }
  let rowsLength = Object.keys(rows).length
  for(let i = 0; i < rowsLength; i ++) {
    if(!rows[i] || JSON.stringify(rows[i].cells) == '{}') break
    if(!rows[i].cells[0] || !rows[i].cells[1]) break
    datas.seriesData.push({
      name: rows[i].cells[0].text,
      value: parseFloat(rows[i].cells[1].text)
    })
  }
  return datas
}