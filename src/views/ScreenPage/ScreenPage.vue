<template>
  <div class="ScreenPage">
    <chart-item ref="chartItemRef" />
    <screen-canvas :width="width + 'px'" :height="height + 'px'" />
    <config-item ref="configItemRef" />
  </div>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import ChartItem from "./components/chartItem.vue"
import ScreenCanvas from "./components/screenCanvas.vue";
import ConfigItem from "./components/configItem.vue";
import useProxy from "@/hooks/useProxy";

const width = ref<number>(0)
const height = ref<number>(0)
const chartItemRef = ref<HTMLElement>()
const configItemRef = ref<HTMLElement>()

const proxy = useProxy()

const getWidth = () => {
  return document.getElementsByClassName("ScreenPage")[0].clientWidth - (chartItemRef.value as any).$el.clientWidth - (configItemRef.value as any).$el.clientWidth
}
const resizeEvent = (h: number) => {
  width.value = getWidth()
  height.value = h
}
onMounted(() => {
  width.value = getWidth()
  height.value = document.documentElement.clientHeight
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