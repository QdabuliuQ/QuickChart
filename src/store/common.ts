import { defineStore } from 'pinia'

export default defineStore('common', {
  state: () => {
    return {
      option: null,
      chartConfig: null,  
      defaultOption: null,  // 默认配置
    }
  }
});