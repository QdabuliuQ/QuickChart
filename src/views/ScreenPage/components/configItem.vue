<template>
  <div class="configItem">
    <el-scrollbar :height="height + 'px'">
      <div class="container">
        <template v-if="common.getCurElementIdx !== -1">
          <chart-config v-if="common.getScreenOptionOfElements[common.curElementIdx].type === 'chart'"/>
          <text-config v-else-if="common.getScreenOptionOfElements[common.curElementIdx].type === 'text'" />
          <shape-config v-else-if="common.getScreenOptionOfElements[common.curElementIdx].type === 'shape'" />
        </template>
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
import TextConfig from "@/views/ScreenPage/components/textConfig.vue";
import ShapeConfig from "@/views/ScreenPage/components/shapeConfig.vue";

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