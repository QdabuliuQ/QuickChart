<template>
  <div class="configItem">
    <el-scrollbar :height="height + 'px'">
      <div class="container">
        <chart-config v-if="common.getCurElementIdx !== -1 && common.screenOption.elements[common.curElementIdx].type === 'chart'" :info="common.screenOption.elements[common.curElementIdx]" />
        <canvas-config v-else />
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import useProxy from "@/hooks/useProxy";
import {onMounted, ref} from "vue";
import {useWatchResize} from "@/hooks/useWatchResize";
import ChartConfig from "./chartConfig.vue"
import CanvasConfig from "./canvasConfig.vue"
import useCommonStore from "@/store/common";

const proxy = useProxy()
const height = ref<number>(0)

const common = useCommonStore()

useWatchResize(() => {
  height.value = document.documentElement.clientHeight
})

onMounted(() => {
  height.value = document.documentElement.clientHeight
})
</script>
<style lang="less">
.configItem {
  width: 210px;
  height: 100%;
  background-color: @curColor;
  box-sizing: border-box;
  .container {
    padding: 10px;
  }
}
</style>