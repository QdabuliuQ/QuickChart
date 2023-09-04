import titleOption from "@/chartConfig/commonParams/title";
import canvasOption from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import graphicOption from "@/chartConfig/commonParams/graphic";
import {mapPath} from "@/chartConfig/constant";
import {map_series_label, map_visual_map} from "@/chartConfig/option";
import {
  combineOption as _combineOption,
  conveyExcelData as _conveyExcelData,
  createExcelData as _createExcelData
} from "./map1_1";

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
  return _combineOption(data)
}

export const createExcelData = _createExcelData
export const conveyExcelData = _conveyExcelData