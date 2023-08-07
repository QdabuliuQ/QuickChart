import useCommonStore from "@/store/common";
import titleOption from "@/chartConfig/commonParams/title";
import canvasOption from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import colorOption from "@/chartConfig/commonParams/color";
import graphicOption from "@/chartConfig/commonParams/graphic";
import {
  sankey_series,
  sankey_series_itemStyle,
  sankey_series_label,
  sankey_series_lineStyle
} from "@/chartConfig/option";
import { createExcelData as _createExcelData, conveyExcelData as _conveyExcelData } from './chart7_1'
import {chartPath} from "@/chartConfig/constant";

const common: any = useCommonStore()

export default () => {
  return [
    titleOption({
      'show': true,
      'text': '区域成交用地性质占比',
      'left': '50%',
      'top': '3%',
      'textAlign': 'center',
      'textStyle.color': '#fff'
    }),
    canvasOption('rgba(68, 68, 68, 1)'),
    gridOption(),
    graphicOption(),
    colorOption([
      "#e9bae8",
      "#3dc5e7",
      "#2aa12d",
      "#e88886",
      "#feda66",
      "#c92123",
      "#8bc77b",
      "#fb7f10",
      "#e492d0",
      "#2aa12d",
      "#fb7f10",
      "#98c0fd",
      "#4393c3",
      "#2166ac",
      "#f97494",
    ]),
    {
      name: '数据',
      opName: 'series',
      chartOption: true,
      menuOption: false,
      defaultOption: {
        series: {
          type: 'sankey',
          layout: 'none',
          draggable: false,
          ...sankey_series({
            'right': '10%',
            'top': '10%'
          }),
          label: sankey_series_label({
            color: '#fff'
          }),
          itemStyle: sankey_series_itemStyle(),
          lineStyle: sankey_series_lineStyle({
            'color': 'gradient',
            'opacity': 0.5,
          }),
          emphasis: {
            focus: 'adjacency'
          },
          data: [
            {name: '惠城区'},
            {name: '仲恺区'},
            {name: '惠阳区'},
            {name: '大亚湾'},
            {name: '博罗县'},
            {name: '惠东县'},
            {name: '龙门县'},
            {name: '商服用地'},
            {name: '商住用地'},
            {name: '住宅用地'},
            {name: '商业用地'},
            {name: '科教用地'},
            {name: '仓储用地'},
            {name: '工业用地'},
            {name: '其他用地'}
          ],
          links: [
            {source: "惠城区", target: "商服用地", value: 712359.3},
            {source: "惠城区", target: "商住用地", value: 12500.2},
            {source: "惠城区", target: "科教用地", value: 50241.4},
            {source: "惠城区", target: "仓储用地", value: 42212.9},
            {source: "惠城区", target: "工业用地", value: 180555.06},
            {source: "惠城区", target: "其他用地", value: 8560.2},

            {source: "仲恺区", target: "商服用地", value: 618180.6},
            {source: "仲恺区", target: "商住用地", value: 436696.23},
            {source: "仲恺区", target: "科教用地", value: 213535},
            {source: "仲恺区", target: "工业用地", value: 1856227.4},

            {source: "惠阳区", target: "商服用地", value: 8950},
            {source: "惠阳区", target: "商住用地", value: 177577.6},
            {source: "惠阳区", target: "工业用地", value: 523499},
            {source: "惠阳区", target: "其他用地", value: 110113},

            {source: "大亚湾", target: "商服用地", value: 145857},
            {source: "大亚湾", target: "商住用地", value: 413287.5},
            {source: "大亚湾", target: "住宅用地", value: 73910.8},
            {source: "大亚湾", target: "工业用地", value: 442695},
            {source: "大亚湾", target: "其他用地", value: 2764.4},

            {source: "博罗县", target: "商服用地", value: 134172},
            {source: "博罗县", target: "商住用地", value: 294527},
            {source: "博罗县", target: "住宅用地", value: 6851},
            {source: "博罗县", target: "科教用地", value: 121422},
            {source: "博罗县", target: "工业用地", value: 989856.58},
            {source: "博罗县", target: "其他用地", value: 9134},

            {source: "惠东县", target: "商服用地", value: 33732.97},
            {source: "惠东县", target: "商住用地", value: 65556.41},
            {source: "惠东县", target: "住宅用地", value: 295348.5},
            {source: "惠东县", target: "商业用地", value: 7391.31},
            {source: "惠东县", target: "工业用地", value: 549721.16},

            {source: "龙门县", target: "商服用地", value: 146022.81},
            {source: "龙门县", target: "住宅用地", value: 146422.47},
            {source: "龙门县", target: "商业用地", value: 49587.21},
            {source: "龙门县", target: "仓储用地", value: 36218.96},
            {source: "龙门县", target: "工业用地", value: 267393.02},
            {source: "龙门县", target: "其他用地", value: 4131.95},
          ]
        }
      }
    },
    {
      name: '桑基图样式',
      opName: 'sankeyStyle',
      chartOption: false,
      menuOption: true,
      icon: 'i_sankey_chart',
      componentPath: chartPath + 'paramsSankey/paramsSankeyStyle',
    },
    {
      name: '文本样式',
      opName: 'label',
      chartOption: false,
      menuOption: true,
      icon: 'i_text',
      componentPath: chartPath + 'paramsSankey/paramsSankeyLabel',
    },
    {
      name: '节点矩形样式',
      opName: 'itemStyle',
      chartOption: false,
      menuOption: true,
      icon: 'i_rect',
      componentPath: chartPath + 'paramsSankey/paramsSankeyItem',
    },
    {
      name: '图边样式',
      opName: 'lineStyle',
      chartOption: false,
      menuOption: true,
      icon: 'i_sankey_line',
      componentPath: chartPath + 'paramsSankey/paramsSankeyLine',
    },
  ]
}

export function combineOption(data: any) {
  let series = common.option.series
  series.data = data.data
  series.links = data.linksData
  return {
    series
  }
}
export const createExcelData = _createExcelData
export const conveyExcelData = _conveyExcelData