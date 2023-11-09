<template>
  <div class="ScreenPage">
    <function-list v-if="option" ref="functionListRef"></function-list>
    <screen-canvas v-if="option" :width="width + 'px'" :height="height + 'px'" />
    <config-item v-if="option" ref="configItemRef" />
  </div>
</template>

<script setup lang="ts">
import {nextTick, onMounted, ref} from "vue";
import FunctionList from "./components//functionList"
import ScreenCanvas from "./components/screenCanvas.vue";
import ConfigItem from "./components/configItem.vue";
import useProxy from "@/hooks/useProxy";
import useStore from "@/store";
import {useWatchResize} from "@/hooks/useWatchResize";

const width = ref<number>(0)
const height = ref<number>(0)
const functionListRef = ref<HTMLElement>()
const configItemRef = ref<HTMLElement>()
const {screen} = useStore();
const option = ref<any>(null)
const proxy = useProxy()

const getWidth = () => {
  return document.getElementsByClassName("ScreenPage")[0].clientWidth - (functionListRef.value as any).$el.clientWidth - (configItemRef.value as any).$el.clientWidth
}

onMounted(async () => {
  let { default: res } = await import("@/screenConfig/config.ts")
  screen.initScreenOption(res)
  option.value = res
  nextTick(() => {
    width.value = getWidth()
    height.value = document.documentElement.clientHeight
  })
})

useWatchResize((h: number) => {
  width.value = getWidth()
  height.value = h
})

</script>

<style lang="less">
.ScreenPage {
  height: 100%;
  display: flex;
  .el-color-picker {
    width: 100%;
    .el-color-picker__trigger {
      width: 100%;
      height: 25px;
    }
  }
}
</style>