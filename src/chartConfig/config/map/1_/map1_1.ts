import useCommonStore from "@/store/common";
import titleOption from "@/chartConfig/commonParams/title";
import canvasOption from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import graphicOption from "@/chartConfig/commonParams/graphic";
import {mapPath} from "@/chartConfig/constant";

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
          map: 'map',  //这个名称
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
            label: {
              show: false,
              rotate: 0,
              offset: [0, 0],
              color: '#000',
              fontStyle: 'normal',
              fontWeight: 'normal',
              fontFamily: 'sans-serif',
              fontSize: 12,
              borderColor: null,
              borderWidth: 0,
              borderType: 'solid',
            },
            itemStyle: {
              areaColor: '#eee',
              borderColor: 'rgba(152, 152, 152, 1)',
              borderWidth: 1,
              borderType: 'solid',
              shadowBlur: 0,
              shadowColor: '',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
            },
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
      componentPath: mapPath + '/paramsLabel',
    },
    {
      name: '板块样式',
      opName: 'itemStyle',
      chartOption: false,
      menuOption: true,
      icon: 'i_block',
      componentPath: mapPath + '/paramsItem',
    },
  ]
}