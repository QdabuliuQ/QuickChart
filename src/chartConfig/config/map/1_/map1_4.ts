import titleOption from "@/chartConfig/commonParams/title";
import canvasOption from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import graphicOption from "@/chartConfig/commonParams/graphic";
import {mapPath} from "@/chartConfig/constant";
import {map_visual_map} from "@/chartConfig/option";
import {
  combineOption as _combineOption,
  createExcelData as _createExcelData,
  conveyExcelData as _conveyExcelData
} from "./map1_1"

export default () => {
  return [
    titleOption(),
    canvasOption("#3b3b3b"),
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
      name: '3D配置',
      opName: 'series',
      chartOption: true,
      menuOption: true,
      icon: "i_threeD",
      componentPath: mapPath + "paramsGeo3D",
      defaultOption: {
        series: [
          {
            type: 'map3D',
            map: 'map',
            boxDepth: 120, //地图倾斜度
            regionHeight: 5, //地图厚度
            label: {
              show: true, //是否显示市
              textStyle: {
                color: "#000", //文字颜色
                fontSize: 12, //文字大小
                fontFamily: 'sans-serif',
                backgroundColor: "rgba(255,255,255,.6)", //透明度0清空文字背景
              },
            },
            itemStyle: {
              opacity: 0.9, // 透明度
              borderWidth: 0.6, //分界线宽度
              borderColor: "#207fce", //分界线颜色
            },
            data: [],
            roam: true,
          }
        ]
      }
    },
  ]
}

export function combineOption(data: any) {
  return _combineOption(data)
}

export const createExcelData = _createExcelData
export const conveyExcelData = _conveyExcelData