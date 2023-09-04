import titleOption from "@/chartConfig/commonParams/title";
import canvasOption from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import graphicOption from "@/chartConfig/commonParams/graphic";
import {mapPath} from "@/chartConfig/constant";
import {map_series_label, map_visual_map} from "@/chartConfig/option";
import {
  combineOption as _combineOption,
  createExcelData as _createExcelData,
  conveyExcelData as _conveyExcelData
} from "./map1_1"

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
          type: 'continuous',
          ...map_visual_map({
            "left": "3%",
            "top": "65%"
          }),
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