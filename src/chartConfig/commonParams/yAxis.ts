import {replaceOptionValue} from "@/chartConfig/tools";

const yAxisOption = (options?: any): any => {
  const dOption = {
    show: true,
    position: 'left',
    offset: 0,
    name: '',
    nameLocation: 'end',
    nameGap: 15,
    nameRotate: 0,
    inverse: false,  // 反向坐标
    nameTextStyle: {
      color: '#ccc',
      fontWeight: 'normal',
      fontFamily: 'sans-serif',
      fontSize: 12,
    },
    axisLine: {  // 轴样式
      show: true,
      lineStyle: {
        color: '#333',
        width: 1,
        type: 'solid',
        opacity: 1,
      }
    },
    axisTick: {  // 轴刻度样式
      show: true,
      lineStyle: {
        color: '',
        width: 1,
        type: 'solid',
        opacity: 1,
      }
    },
    axisLabel: {  // 轴文本样式
      show: true,
      rotate: 0,
      margin: 8,
      color: '',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontFamily: 'sans-serif',
      fontSize: 12,
    }
  }
  replaceOptionValue(dOption, options)
  console.log(dOption)
  return dOption
}
export default yAxisOption