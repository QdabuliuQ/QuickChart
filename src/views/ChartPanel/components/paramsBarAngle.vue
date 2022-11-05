<template>
  <div id="paramsBarAngle">
    <div class="uniqueOptionContainer">
      <div class="seriesItem">
        <div style="width: 100%">旋转角度</div>
        <div class="optionOperation">
          <el-input-number
            size="small"
            v-model="startAngle"
            :min="0"
            :max="360"
            @change="handleChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, getCurrentInstance, toRefs } from 'vue'
import useCommonStore from "@/store/common";

interface comInitData {
  startAngle: number
}

export default defineComponent({
  name: 'paramsBarAngle',
  setup() {
    const _this: any = getCurrentInstance();
    const common: any = useCommonStore();
    const data: comInitData = reactive({
      startAngle: 0
    })

    data.startAngle = common.option.angleAxis.startAngle;
    
    const handleChange = () => {
      _this.proxy.$Bus.emit('optionChange', {
        angleAxis: {
          type: 'category',
          data: common.option.angleAxis.data,
          startAngle: data.startAngle
        },
      })
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