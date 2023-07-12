import useCommonStore from "@/store/common";
import titleOption from "@/chartConfig/commonParams/title";
import canvasOption from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import colorOption from "@/chartConfig/commonParams/color";
import graphicOption from "@/chartConfig/commonParams/graphic";
import {sunburst_series, sunburst_series_itemStyle, sunburst_series_label} from "@/chartConfig/option";
import {
  createExcelData as _createExcelData,
  conveyExcelData as _conveyExcelData
} from './chart10_1'
const common: any = useCommonStore()

export default () => {
  return [
    titleOption({
      'show': false
    }),
    canvasOption('#000'),
    gridOption(),
    graphicOption(),
    colorOption(),
    {
      name: 'series',
      opName: 'series',
      chartOption: true,
      menuOption: false,
      uniqueOption: false,
      defaultOption: {
        series: {
          type: 'sunburst',
          data: [
            {
              name: 'A',
              children: [
                {
                  name: 'AA',
                  children: [
                    {
                      name: 'AAA',
                      value: 2
                    },
                    {
                      name: 'AAB',
                      value: 1
                    },
                    {
                      name: 'AAC',
                      value: 1
                    },
                    {
                      name: 'AAD',
                      value: 0.5
                    }
                  ]
                },
                {
                  name: 'AB',
                  value: 2
                }
              ]
            },
            {
              name: 'B',
              children: [
                {
                  name: 'BA',
                  children: [
                    {
                      name: 'BAA',
                      value: 2
                    }
                  ]
                }
              ]
            },
            {
              name: 'C',
              children: [
                {
                  name: 'CA',
                  children: [
                    {
                      name: 'CAA',
                      value: 2
                    }
                  ]
                }
              ]
            },
            {
              name: 'D',
              children: [
                {
                  name: 'DA',
                  children: [
                    {
                      name: 'DAA',
                      value: 1
                    }
                  ]
                }
              ]
            }
          ],
          ...sunburst_series(),
          label: sunburst_series_label(),
          itemStyle: sunburst_series_itemStyle({
            borderColor: '#000',
            borderWidth: 2,
          }),
          levels: [
            {},
            {
              itemStyle: {
                color: '#9ee54a'
              }
            },
            {
              itemStyle: {
                color: '#38e1c5'
              }
            },
            {
              itemStyle: {
                color: '#2791ee'
              }
            },
          ]
        }
      }
    },
    {
      name: '旭日图样式',
      opName: 'sunburstStyle',
      chartOption: false,
      menuOption: true,
      icon: 'i_sunburst_chart',
      componentPath: 'paramsSunburst/paramsSunburstStyle.vue'
    },
    {
      name: '文本样式',
      opName: 'label',
      chartOption: false,
      menuOption: true,
      icon: 'i_text',
      componentPath: 'paramsSunburst/paramsSunburstLabel.vue'
    },
    {
      name: '图扇样式',
      opName: 'itemStyle',
      chartOption: false,
      menuOption: true,
      icon: 'i_circle_item',
      componentPath: 'paramsSunburst/paramsSunburstItem.vue'
    },
  ]
}

export function combineOption(datas: any) {
  let series = common.option.series
  series.data = datas.data
  return {
    series
  }
}

export const createExcelData = _createExcelData
export const conveyExcelData = _conveyExcelData