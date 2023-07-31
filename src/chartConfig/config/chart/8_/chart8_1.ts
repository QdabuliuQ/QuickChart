import useCommonStore from "@/store/common";
import titleOption from "@/chartConfig/commonParams/title";
import canvasOption from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import colorOption from "@/chartConfig/commonParams/color";
import graphicOption from "@/chartConfig/commonParams/graphic";
import legendOption from "@/chartConfig/commonParams/legend";
import {conveyToExcel} from "@/chartConfig/conveyUtils/conveyData";

const common: any = useCommonStore()

export default () => {
  return [
    titleOption({
      'show': false
    }),
    canvasOption(),
    gridOption(),
    legendOption({
      'show': true,
      'left': '23%',
      'icon': 'roundRect'
    }),
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
            ['Visit', 60],
            ['Inquiry', 40],
            ['Order', 20],
            ['Click', 80],
            ['Show', 100]
          ]
        },
      },
    },
    {
      name: '数据',
      opName: 'series',
      chartOption: true,
      menuOption: false,
      defaultOption: {
        series: {
          type: 'funnel',
          min: 0,
          max: 100,
          minSize: '0%',
          maxSize: '100%',
          orient: 'vertical',
          sort: 'descending',
          left: '10%',
          right: '10%',
          top: '10%',
          bottom: '10%',
          funnelAlign: 'center',
          gap: 2,
          label: {
            show: true,
            position: 'inside',
            color: null,
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontFamily: 'sans-serif',
            fontSize: 12,
          },
          labelLine: {
            show: false,
            length: 10,
            lineStyle: {
              width: 1,
              type: 'solid',
              opacity: 1,
              color: "#000",
            }
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1,
            borderType: 'solid',
            shadowBlur: 0,
            shadowColor: '',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            opacity: 1,
          },
        }
      },
    },
    {
      name: '漏斗样式',
      opName: 'lineStyle',
      chartOption: false,
      menuOption: true,
      icon: 'i_funnel',
      componentPath: 'paramsFunnel/paramsFunnelStyle.vue',
    },
    {
      name: '文本样式',
      opName: 'label',
      chartOption: false,
      menuOption: true,
      icon: 'i_text',
      componentPath: 'paramsFunnel/paramsFunnelLabel.vue',
    },
    {
      name: '引导线样式',
      opName: 'labelLine',
      chartOption: false,
      menuOption: true,
      icon: 'i_gline',
      componentPath: 'paramsFunnel/paramsFunnelLine.vue',
    },
    {
      name: '图形样式',
      opName: 'itemStyle',
      chartOption: false,
      menuOption: true,
      icon: 'i_triangle',
      componentPath: 'paramsFunnel/paramsFunnelItem.vue',
    },
  ]
}

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
      startCol: 0,
    },
  ])
}

export const conveyExcelData = (rows: any) => {
  if (!rows) return null
  let datas = {
    datasetData: <any>[]
  }
  let rowsLength = Object.keys(rows).length
  for(let i = 0; i < rowsLength; i ++) {
    if(!rows[i] || JSON.stringify(rows[i].cells) == '{}') break
    if(!rows[i].cells[0] || !rows[i].cells[1]) break
    datas.datasetData.push([
      rows[i].cells[0].text,
      parseInt(rows[i].cells[1].text)
    ])
  }
  return datas
}