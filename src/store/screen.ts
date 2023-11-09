import {defineStore} from "pinia";
import {IConfig} from "@/types/screen";
export interface IStore {
  screenOption: IConfig | null
  curElementIdx: number
}

const useScreenStore = defineStore('screen', {
  state: (): IStore => {
    return {
      screenOption: null,  // 大屏配置
      curElementIdx: -1,  //
    }
  },

  getters: {
    getScreenOption(state: any) {
      return state.screenOption
    },
    getScreenOptionOfElements(state: any) {
      return state.screenOption.elements
    },
    getScreenOptionOfCanvas(state: any) {
      return state.screenOption.canvas
    },
    getCurElementIdx(state: any) {
      return state.curElementIdx
    }
  },

  actions: {
    initScreenOption(data: any) {
      this.screenOption = data
    },
    updateScreenOptionOfCanvas(data: any) {
      this.screenOption['canvas'] = data
    },
    updateScreenOptionOfElements(data: any, idx: number) {
      if(idx < 0 || idx >= this.screenOption['elements'].length) return
      this.screenOption['elements'][idx] = data
    },
    updateScreenOptionOfElementStyle(style: any, idx: number) {
      if(idx < 0 || idx >= this.screenOption['elements'].length) return
      this.screenOption['elements'][idx]['style'] = style
    },
    addScreenOptionOfElements(data: any) {
      this.screenOption['elements'].push(data)
    },
    deleteScreenOptionOfElements(idx: number) {
      if(this.screenOption['elements'].length <= idx) return
      this.screenOption['elements'].splice(idx, 1)
    },
    updateCurElementIdx(idx: number) {
      this.curElementIdx = idx
    },
    updateElementOfShapePath(path: string, viewBox: [number, number], i: number) {
      if (this.screenOption['elements'].length <= i && this.screenOption['elements'].type !== 'shape') return
      this.screenOption['elements'][i].path = path
      this.screenOption['elements'][i].viewBox = viewBox
    }
  }
})

export default useScreenStore