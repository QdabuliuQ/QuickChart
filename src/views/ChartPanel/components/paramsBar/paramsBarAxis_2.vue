<template>
  <div id="paramsBarAxis_2">
    <div class="uniqueOptionContainer">
      <div class="seriesItem">
        <div style="width: 100%">内圈层次</div>
        <div class="optionOperation">
          <el-input-number
            size="small"
            v-model="max"
            :min="1"
            @change="handleChange"
          />
        </div>
      </div>
      <div class="seriesItem">
        <div style="width: 100%">内圈角度</div>
        <div class="optionOperation">
          <el-input-number
            size="small"
            v-model="startAngle"
            :min="1"
            @change="handleChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, getCurrentInstance } from 'vue'
import useCommonStore from "@/store/common";

interface comInitData {
  max: number
  startAngle: number
}

export default defineComponent({
  name: 'paramsBarAxis_2',
  setup() {
    let timer: any = null
    const _this: any = getCurrentInstance();
    const common: any = useCommonStore();
    const data: comInitData = reactive({
      max: 5,
      startAngle: 0
    })

    data.max = common.option.angleAxis.max
    data.startAngle = common.option.angleAxis.startAngle

    const handleChange = () => {
      if(timer) clearTimeout(timer)
      timer = setTimeout(() => {
        _this.proxy.$Bus.emit('optionChange', {
          angleAxis: {
            max: data.max,
            startAngle: data.startAngle
          },
        })
      }, 500);
    }

    return {
      handleChange,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
</style>