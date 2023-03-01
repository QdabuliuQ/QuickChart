<template>
  <div id="paramsCanvas">
    <div
      v-for="(value, key, index) in allOption"
      :key="index"
      class="optionItem"
      :style="{ padding: opNameList[key] ? '6px 0' : '0' }"
    >
      <div>{{ opNameList ? opNameList[key] : "" }}</div>
      <div class="optionOperation">
        <el-input-number
          v-if="(key as unknown) == 'width' || (key as unknown) == 'height'"
          size="small"
          :max="900"
          :min="400"
          v-model="defaultOption[key]"
        />
        <el-color-picker
          v-else-if="(key as unknown) == 'bgc'"
          v-model="defaultOption[key]"
        />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  getCurrentInstance,
  watch,
} from "vue";

let timer: any

export default defineComponent({
  name: "paramsCanvas",
  props: ["defaultOption", "allOption", "opNameList"],
  setup(props) {
    const _this: any = getCurrentInstance();
    const data = reactive({});

    watch(() => props.defaultOption, (e: any) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        _this.proxy.$Bus.emit('canvasChange', e)
      }, 500);
    }, {deep: true})

    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
</style>