import useCommonStore from "@/store/common";
import titleOption from "@/chartConfig/commonParams/title";
import canvasOption from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import graphicOption from "@/chartConfig/commonParams/graphic";
import {mapPath} from "@/chartConfig/constant";
import {map_series_label, map_visual_map} from "@/chartConfig/option";
import {conveyToExcel} from "@/chartConfig/conveyUtils/conveyData";

const common: any = useCommonStore()

export default () => {
  return [
    titleOption(),
    canvasOption(),
    gridOption(),
    graphicOption(),
    {
      name: '视觉映射',
      opName: 'visualMap',
      chartOption: true,
      menuOption: true,
      icon: "i_mapping",
      componentPath: mapPath + "paramsVisualMap",
      defaultOption: {
        visualMap: {
          type: 'piecewise',
          ...map_visual_map({
            "left": "2%",
            "top": "68%",
            "color": "EMPTY",
            "itemWidth": 20,
            "itemHeight": 20
          }),
          showLabel: true,
          pieces: [{
            lte: 9999,
            gte: 1001,
            label: "> 1001 人",
            color: "#7f1100"
          }, {
            lte: 1000,
            gte: 501,
            label: "501 - 1000 人",
            color: "#ff5428"
          }, {
            lte: 500,
            gte: 101,
            label: "101 - 500人",
            color: "#ff8c71"
          }, {
            lte: 100,
            gte: 1,
            label: "1 - 100人",
            color: "#ffd768"
          }, {
            lte: 0,
            gte: 0,
            label: '0人',
            color: "#d7d7d7"
          }]
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
            label: map_series_label()
          }
        ]
      }
    },
    {
      name: '文本样式',
      opName: 'label',
      chartOption: false,
      menuOption: true,
      icon: 'i_text',
      componentPath: mapPath + 'paramsLabel',
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
  for (let i = 0; i < rowsLength; i++) {
    if (!rows[i] || JSON.stringify(rows[i].cells) == '{}') break
    if (!rows[i].cells[0] || !rows[i].cells[1]) break
    datas.seriesData.push({
      name: rows[i].cells[0].text,
      value: parseFloat(rows[i].cells[1].text)
    })
  }
  return datas
}