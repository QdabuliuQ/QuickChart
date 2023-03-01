<template>
  <div id="paramsBar">
    <div class="uniqueOptionContainer barContainer">
      <div v-for="item,index in seriesData" :key="index" class="optionItem">
        <div>(背景色){{item.name}}</div>
        <div class="optionOperation">
          <el-color-picker
            show-alpha
            @change='valueChange'
            v-model="item.backgroundStyle.color"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, getCurrentInstance } from 'vue'
import useCommonStore from "@/store/common";

interface comInitData {
  seriesData: any[]
}

export default defineComponent({
  name: 'paramsBar',
  setup(props) {
    const _this: any = getCurrentInstance()
    const common: any = useCommonStore()
    const data: comInitData = reactive({
      seriesData: []
    })

    // 修改颜色
    const valueChange = () => {
      _this.proxy.$Bus.emit('optionChange', {
        series: data.seriesData
      })
    }

    data.seriesData = common.option.series
    
    onMounted(() => {
      _this.proxy.$Bus.on("updateData", (e: any) => {
        data.seriesData = e.series
      })
    })

    return {
      valueChange,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
</style>