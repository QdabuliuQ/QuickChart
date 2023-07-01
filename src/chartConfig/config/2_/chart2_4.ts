import { markRaw } from "vue";
import useCommonStore from "@/store/common";
// 导入独立组件
import paramsBarText from "@/views/ChartPanel/components/paramsBar/paramsBarText.vue";
import paramsBarBgStyle from "@/views/ChartPanel/components/paramsBar/paramsBarBgStyle.vue";
import {
  asisOpNameList
} from "@/chartConfig/constant";
import titleOption from "@/chartConfig/commonParams/title";
import canvas from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import legendOption from "@/chartConfig/commonParams/legend";
import waterMark from "@/chartConfig/commonParams/waterMark";
import { conveyToExcel } from "@/chartConfig/conveyUtils/conveyData";
const common: any = useCommonStore()

const getOption = () => {
  let grid = gridOption()
  grid.defaultOption.grid.top = 80
  grid.defaultOption.grid.bottom = 30
  return [
    titleOption({
      'show': false
    }),
    canvas,
    grid,
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
            ['ten', -0.07],
            ['nine', -0.09],
            ['eight', 0.2],
            ['seven', 0.44],
            ['six', -0.23],
            ['five', 0.08],
            ['four', -0.17],
            ['three', 0.47],
            ['two', -0.36],
            ['one', 0.18],
          ]
        },
      },
      allOption: {},
    },
    {
      name: 'X轴样式',
      opName: 'xAxis',
      chartOption: true,
      menuOption: false,
      icon: 'i_X',
      defaultOption: {
        xAxis: [{
          type: 'value',
          position: 'top',
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        }],
      },
      allOption: {
        xAxis: [
          {
            type: 'value',
            position: 'top',
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
          }
        ]
      },
      opNameList: asisOpNameList
    },
    {
      name: 'Y轴样式',
      opName: 'yAxis',
      chartOption: true,
      menuOption: false,
      icon: 'i_Y',
      defaultOption: {
        yAxis: [{
          type: 'category',
          axisLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
        }],
      },
      allOption: {
        yAxis: [
          {
            type: 'category',
            axisLine: { show: false },
            axisLabel: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
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
            stack: 'Total',
            label: {
              show: true,
              rotate: 0,
              color: '#fff',
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
              position: 'inside',
              formatter: '{b}'
            },
            showBackground: false,
            backgroundStyle: {
              color: '',
              borderColor: '',
              borderWidth: 0,
              borderType: 'solid',
              borderRadius: 0,
              shadowBlur: 0,
              shadowColor: '',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              opacity: 1,
            }
          },
        ]
      }
    },
    {
      name: '文本样式',
      opName: 'textStyle',
      chartOption: false,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_text',
      component: markRaw(paramsBarText),
      allOption: {},
    },
    {
      name: '背景样式',
      opName: 'bgStyle',
      chartOption: false,
      menuOption: true,
      uniqueOption: true,
      icon: 'i_bg',
      component: markRaw(paramsBarBgStyle),
      allOption: {},
    },
  ]
}

export default getOption

export function combineOption(data: any) {
  let dataset = common.option.dataset
  dataset.source = data.datasetData
  return {
    dataset
  }
}

export const createExcelData = (config: any) => {
  return conveyToExcel([
    {
      direction: 'col',
      data: config.dataset.source,
      startRow: 0,
      startCol: 0,
    },
  ])
}

// 收集数据并进行转换
export const conveyExcelData = (rows: any) => {
  if (!rows) return null
  let datas = {
    datasetData: <any>[]
  }
  let length: number = Object.keys(rows).length
  for (let i = 0; i < length; i++) {
    if (JSON.stringify(rows[i].cells) == '{}') break
    datas.datasetData[i] = []
    datas.datasetData[i][0] = rows[i].cells[0].text
    datas.datasetData[i][1] = parseFloat(rows[i].cells[1].text)
  }
  return datas
}