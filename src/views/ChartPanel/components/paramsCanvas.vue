<template>
  <div id="paramsCanvas">
    <div v-for="(value, key, index) in allOption" :key="index" class="optionItem"
      :style="{ padding: opNameList[key] ? '6px 0' : '0' }">
      <div>{{ opNameList ? opNameList[key] : "" }}</div>
      <div class="optionOperation">
        <el-color-picker v-if="(key as any) == 'bgc'" v-model="defaultOption[key]" />
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
  ref,
} from "vue";
let timer: any

export default defineComponent({
  name: "paramsCanvas",
  props: ["defaultOption", "allOption", "opNameList"],
  setup(props) {
    const _this: any = getCurrentInstance();
    const imageUploadInputRef = ref()
    const data = reactive({});

    watch(() => props.defaultOption, (e: any) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        _this.proxy.$Bus.emit('canvasChange', e)
      }, 500);
    }, { deep: true })

    return {
      imageUploadInputRef,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#paramsCanvas {
  .el-button--small {
    span {
      zoom: .95;
    }
  }

  .image {
    cursor: pointer;
    margin-top: 5px;
  }
}
</style>