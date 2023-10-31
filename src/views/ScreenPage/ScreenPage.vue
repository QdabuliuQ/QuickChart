<template>
  <div class="ScreenPage">
    <function-list v-if="option" ref="functionListRef"></function-list>
    <screen-canvas v-if="option" :width="width + 'px'" :height="height + 'px'" />
    <config-item v-if="option" ref="configItemRef" />
  </div>
</template>

<script setup lang="ts">
import {nextTick, onMounted, onUnmounted, reactive, ref} from "vue";
import ChartItem from "./components/chartItem.vue"
import FunctionList from "./components//functionList"
import ScreenCanvas from "./components/screenCanvas.vue";
import ConfigItem from "./components/configItem.vue";
import useProxy from "@/hooks/useProxy";
import useCommonStore from "@/store/common";

const width = ref<number>(0)
const height = ref<number>(0)
const functionListRef = ref<HTMLElement>()
const configItemRef = ref<HTMLElement>()
const common = useCommonStore();
const option = ref<any>(null)
const proxy = useProxy()

const getWidth = () => {
  return document.getElementsByClassName("ScreenPage")[0].clientWidth - (functionListRef.value as any).$el.clientWidth - (configItemRef.value as any).$el.clientWidth
}
const resizeEvent = (h: number) => {
  width.value = getWidth()
  height.value = h
}
onMounted(async () => {
  let { default: res } = await import("@/screenConfig/config.ts")
  common.initScreenOption(res)
  option.value = res

  nextTick(() => {
    width.value = getWidth()
    height.value = document.documentElement.clientHeight
  })
  proxy.$Bus.on("resize", resizeEvent)
})

onUnmounted(() => {
  proxy.$Bus.off("resize", resizeEvent)
})
</script>

<style lang="less">
.ScreenPage {
  height: 100%;
  display: flex;
}
</style>