import useCommonStore from "@/store/common";
import titleOption from "@/chartConfig/commonParams/title";
import canvasOption from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import colorOption from "@/chartConfig/commonParams/color";
import graphicOption from "@/chartConfig/commonParams/graphic";
import {sunburst_series, sunburst_series_itemStyle, sunburst_series_label} from "@/chartConfig/option";

const common: any = useCommonStore()

export default () => {
  return [
    titleOption({
      'show': false
    }),
    canvasOption(),
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
              name: 'Grandpa',
              children: [
                {
                  name: 'Uncle Leo',
                  value: 15,
                  children: [
                    {
                      name: 'Cousin Jack',
                      value: 2
                    },
                    {
                      name: 'Cousin Mary',
                      value: 5,
                      children: [
                        {
                          name: 'Jackson',
                          value: 2
                        }
                      ]
                    },
                    {
                      name: 'Cousin Ben',
                      value: 4
                    }
                  ]
                },
                {
                  name: 'Father',
                  value: 10,
                  children: [
                    {
                      name: 'Me',
                      value: 5
                    },
                    {
                      name: 'Brother Peter',
                      value: 1
                    }
                  ]
                }
              ]
            },
            {
              name: 'Nancy',
              children: [
                {
                  name: 'Uncle Nike',
                  children: [
                    {
                      name: 'Cousin Betty',
                      value: 1
                    },
                    {
                      name: 'Cousin Jenny',
                      value: 2
                    }
                  ]
                }
              ]
            }
          ],
          ...sunburst_series(),
          label: sunburst_series_label(),
          itemStyle: sunburst_series_itemStyle()
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
      componentPath: 'paramsSunburst/paramsSunburstItemStyle.vue'
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
const convey = (data: any[]) => {
  let ans: any[][] = []
  const dfs = (data: any[], name: string) => {
    for (let item of data) {
      ans.push([name, item.name])
      if (item.value) ans[ans.length - 1].push(item.value)
      if (item.children) dfs(item.children, item.name)

    }
  }
  for (let item of data) {
    if (item.children) {
      dfs(item.children, item.name)
    }
  }
  return ans
}


export const createExcelData = (config: any) => {
  if(!config.series.data) return []
  let res = convey(config.series.data)
  const excelData: any = {}
  for(let i = 0; i < res.length; i ++) {
    excelData[i] = {
      cells: {}
    }
    for(let j = 0; j < res[i].length; j ++) {
      excelData[i].cells[j] = {
        text: res[i][j]
      }
    }
  }
  return excelData
}
const reset = (data: any) => null
export const conveyExcelData = (rows: any) => {
  let res: any[] = []
  let length = Object.keys(rows).length
  outer: for(let i = 0; i < length; i ++) {
    res[i] = []
    for(let j = 0; j < 3; j ++) {
      if(!rows[i] || JSON.stringify(rows[i].cells) == '{}') break outer
      if(!rows[i].cells[0] || !rows[i].cells[1]) break outer
      res[i].push(
        rows[i].cells[0].text,
        rows[i].cells[1].text
      )
      if(rows[i].cells[2] && rows[i].cells[2].text) {
        res[i].push(parseInt(rows[i].cells[2].text))
      }
    }
  }
  let datas = {
    data: reset(res)
  }
  console.log(datas)
  return datas
}