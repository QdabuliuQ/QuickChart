<template>
  <div id="paramsColor">
    <div
      v-for="(value, key, index) in allOption.color"
      :key="index"
      class="optionItem"
      :style="{ padding: value ? '6px 0' : '0' }"
    >
      <div>{{ value.title }}</div>
      <div class="optionOperation">
        <el-color-picker v-model="value.c" />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  watch,
  getCurrentInstance,
} from "vue";

let timer: any;
export default defineComponent({
  name: "paramsColor",
  props: ["defaultOption", "allOption", "opNameList"],

  setup(props) {
    const _this: any = getCurrentInstance()
    const data = reactive({});

    watch(
      () => props.allOption.color,
      (e: any) => {
        clearTimeout(timer);
        console.log(e);
        
        timer = setTimeout(() => {
          let newColor = [];
          for (const item of e) {
            newColor.push(item.c);
          }
          _this.proxy.$Bus.emit('optionChange', {
            color: newColor,
          })
        }, 500);
      },
      {
        deep: true,
      }
    );

    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
</style>