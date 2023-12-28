import {defineStore} from "pinia";
import {Elements, ElementTypeProperties, IConfig, IStyle} from "@/types/screen";
export interface IStore {
  screenOption: IConfig | null
  curElementIdx: number
  activeElementIdx: number
  tmpElement: IConfig | null
}

const useScreenStore = defineStore('screen', {
  state: (): IStore => {
    return {
      screenOption: null,  // 大屏配置
      curElementIdx: -1,  // 选择元素索引
      activeElementIdx: -1,  // 激活元素索引
      tmpElement: null
    }
  },

  getters: {
    getTmpElement(state: any): IConfig | null {
      return state.tmpElement
    },
    getScreenOption(state: any): IConfig | null {
      return state.screenOption
    },
    getScreenOptionOfElements(state: any) {
      return state.screenOption ? state.screenOption.elements : null
    },
    getScreenOptionOfCanvas(state: any) {
      return state.screenOption.canvas
    },
    getCurElementIdx(state: any) {
      return state.curElementIdx
    },
    getActiveElementIdx(state: any) {
      return state.activeElementIdx
    }
  },

  actions: {
    setTmpElement(element: IConfig | null) {
      this.tmpElement = element
    },
    initScreenOption(data: any) {
      this.screenOption = data
    },
    updateScreenOptionOfCanvasByKey<T extends keyof IConfig['canvas']>(key: T, val: IConfig['canvas'][T]) {
      this.screenOption['canvas'][key] = val
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
    updateScreenOptionOfElementStyleItem(idx: number, key: keyof IStyle, val: any) {
      if(idx < 0 || idx >= this.screenOption['elements'].length) return
      this.screenOption['elements'][idx]['style'][key] = val
    },
    updateTextContent(content: string, idx: number) {
      this.screenOption['elements'][idx]['content'] = content
    },
    addScreenOptionOfElements(data: ElementTypeProperties<Elements>) {
      this.screenOption['elements'].push(data)
    },
    deleteScreenOptionOfElements(idx: number) {
      if(this.screenOption['elements'].length <= idx) return
      return this.screenOption['elements'].splice(idx, 1)
    },
    updateActiveElementIdx(idx: number) {
      this.activeElementIdx = idx
    },
    updateCurElementIdx(idx: number) {
      this.curElementIdx = idx
    },
    updateElementOfShapePath(path: string, viewBox: [number, number], i: number) {
      if (this.screenOption['elements'].length <= i && this.screenOption['elements'].type !== 'shape') return
      this.screenOption['elements'][i].path = path
      this.screenOption['elements'][i].viewBox = viewBox
    },
    updateElementOfItem(i: number, key: string, val: any) {
      if (this.screenOption['elements'].length <= i) return
      this.screenOption['elements'][i][key] = val
    }
  }
})

export default useScreenStore