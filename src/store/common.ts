import { defineStore } from 'pinia'
import canvas from "@/chartConfig/commonParams/canvas";

export default defineStore('common', {
  state: () => {
    return {
      tmp_option: null,
      option: null,
      chartConfig: null,  
      defaultOption: null,  // 默认配置
      mapJSON: null,  // 地图JSON
      type: '',

      screenOption: null,  // 大屏配置
    }
  },

  getters: {  // 获取数据
    getScreenOption(state: any) {
      return state.screenOption
    }
  },

  actions: {
    updateScreenOptionOfCanvas(data: any) {
      this.screenOption['canvas'] = data
    },
    updateScreenOptionOfElements(data: any, idx: number) {
      if(idx < 0 || idx >= this.screenOption['elements'].length) return
      this.screenOption['elements'][idx] = data
    },
    addScreenOptionOfElements(data: any) {
      this.screenOption['elements'].push(data)
    },
    deleteScreenOptionOfElements(idx: number) {
      if(this.screenOption['elements'].length <= idx) return
      this.screenOption['elements'].splice(idx, 1)
    }
  }
});