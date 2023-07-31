import useCommonStore from "@/store/common";
import titleOption from "@/chartConfig/commonParams/title";
import canvasOption from "@/chartConfig/commonParams/canvas";
import gridOption from "@/chartConfig/commonParams/grid";
import graphicOption from "@/chartConfig/commonParams/graphic";

const common: any = useCommonStore()

export default () => {
  return [
    titleOption({
      'show': true,
      'text': '哈哈哈'
    }),
    canvasOption(),
    gridOption(),
    graphicOption(),
    {
      defaultOption: {
        geo: {
          map: '洛阳',  //这个名称
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
            type:'map',
            map: '洛阳',
            data: [
              {name: '吉利区',value: '100' },
            ]
          }
        ]
      },
    },
  ]
}