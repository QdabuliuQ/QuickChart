import useScreenStore from "./screen"
import useChartStore from "@/store/chart";
export default function useStore() {
  return {
    screen: useScreenStore(),
    chart: useChartStore()
  }
}

// export default defineStore('common', {
//   state: () => {
//     return {
//       tmp_option: null,
//       option: null,
//       chartConfig: null,
//       defaultOption: null,  // 默认配置
//       mapJSON: null,  // 地图JSON
//       type: '',
//       screenOption: null,  // 大屏配置
//       curElementIdx: -1,  //
//     }
//   },
//
//   getters: {  // 获取数据
//     getScreenOption(state: any) {
//       return state.screenOption
//     },
//     getScreenOptionOfElements(state: any) {
//       return state.screenOption.elements
//     },
//     getScreenOptionOfCanvas(state: any) {
//       return state.screenOption.canvas
//     },
//     getCurElementIdx(state: any) {
//       return state.curElementIdx
//     }
//   },
//
//   actions: {
//     initScreenOption(data: any) {
//       this.screenOption = data
//     },
//     updateScreenOptionOfCanvas(data: any) {
//       this.screenOption['canvas'] = data
//     },
//     updateScreenOptionOfElements(data: any, idx: number) {
//       if(idx < 0 || idx >= this.screenOption['elements'].length) return
//       this.screenOption['elements'][idx] = data
//     },
//     updateScreenOptionOfElementStyle(style: any, idx: number) {
//       if(idx < 0 || idx >= this.screenOption['elements'].length) return
//       this.screenOption['elements'][idx]['style'] = style
//     },
//     addScreenOptionOfElements(data: any) {
//       this.screenOption['elements'].push(data)
//     },
//     deleteScreenOptionOfElements(idx: number) {
//       if(this.screenOption['elements'].length <= idx) return
//       this.screenOption['elements'].splice(idx, 1)
//     },
//     updateCurElementIdx(idx: number) {
//       this.curElementIdx = idx
//     }
//   }
// });