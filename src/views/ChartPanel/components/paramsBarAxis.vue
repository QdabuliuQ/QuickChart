<template>
  <div id="paramsBarAxis">
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
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, getCurrentInstance } from 'vue'
import useCommonStore from "@/store/common";

interface comInitData {
  max: number
}

export default defineComponent({
  name: 'paramsBarAxis',
  setup() {
    const _this: any = getCurrentInstance();
    const common: any = useCommonStore();
    const data: comInitData = reactive({
      max: 5
    })

    data.max = common.option.radiusAxis.max

    const handleChange = () => {
      _this.proxy.$Bus.emit('optionChange', {
        radiusAxis: {
          max: data.max
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