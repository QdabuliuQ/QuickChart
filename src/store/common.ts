import { defineStore } from 'pinia'

export default defineStore('common', {
  state: () => {
    return {
      tmp_option: null,
      option: null,
      chartConfig: null,  
      defaultOption: null,  // 默认配置
      JSON: null
    }
  }
});