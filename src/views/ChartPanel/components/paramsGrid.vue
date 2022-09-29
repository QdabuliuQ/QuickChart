<template>
  <div id="paramsGrid">
    <div
      v-for="(value, key, index) in allOption.grid"
      :key="index"
      class="optionItem"
      :style="{ padding: opNameList[key] ? '6px 0' : '0' }"
    >
      <div>{{ opNameList ? opNameList[key] : "" }}</div>
      <div class="optionOperation">
        <el-switch
          v-if="key == 'show'"
          size="small"
          v-model="defaultOption.grid[key]"
        />
        <el-input-number
          v-else-if="
            key == 'left' || key == 'right' || key == 'top' || key == 'bottom'
          "
          size="small"
          v-model="defaultOption.grid[key]"
        />
        <el-input-number
          :min="0"
          v-else-if="key == 'width'"
          size="small"
          v-model="width"
        />
        <el-input-number
          :min="0"
          v-else-if="key == 'height'"
          size="small"
          v-model="height"
        />
        <el-color-picker v-else-if="key == 'backgroundColor'" v-model="bgc" />
        <el-color-picker
          v-else-if="key == 'borderColor' || key == 'shadowColor'"
          v-model="defaultOption.grid[key]"
        />
        <el-input-number
          v-else-if="
            key == 'borderWidth' ||
            key == 'shadowBlur' ||
            key == 'shadowOffsetX' ||
            key == 'shadowOffsetY'
          "
          :max="100"
          size="small"
          v-model="defaultOption.grid[key]"
        />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, watch, getCurrentInstance } from "vue";

interface comInitData {
  width: string | number;
  height: string | number;
  bgc: string;
}
let timer: any
export default defineComponent({
  name: "paramsGrid",
  props: ["defaultOption", "allOption", "opNameList"],
  setup(props) {
    const _this: any = getCurrentInstance()
    const data: comInitData = reactive({
      width: 0,
      height: 0,
      bgc: "",
    });

    // 监听整个属性变化
    watch(
      () => props.defaultOption.grid,
      (e) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          data.width = e.width == "auto" ? 0 : e.width;
          data.height = e.height == "auto" ? 0 : e.height;
          data.bgc = e.backgroundColor == "transparent" ? "" : e.backgroundColor;

          _this.proxy.$Bus.emit('optionChange', props.defaultOption)
          console.log(props.defaultOption);
          
        }, 500);
      },
      {
        immediate: true,
        deep: true
      }
    );

    watch(() => data.width, (e) => {
      props.defaultOption.grid.width = e == 0 ? 'auto' : e
    })
    watch(() => data.height, (e) => {
      props.defaultOption.grid.height = e == 0 ? 'auto' : e
    })
    watch(() => data.bgc, (e) => {
      props.defaultOption.grid.backgroundColor = e == 'transparent' ? '' : e
    })

    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
</style>