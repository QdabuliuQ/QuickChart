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
import {onMounted, onUnmounted, reactive, ref, watch} from "vue";
import {useWatchResize} from "@/hooks/useWatchResize";
import ChartConfig from "./chartConfig.vue"
import CanvasConfig from "./canvasConfig.vue"
import useCommonStore from "@/store/common";

const proxy = useProxy()
// const type = ref<"item" | "global">('global')
const height = ref<number>(0)
// let info = reactive<any>({})
// const idx = ref<number>(-1)

const common = useCommonStore()
console.log(common)
// const stop = watch(() => common.curElementIdx, (i: number) => {
//   if (i === -1) {
//     for(let key in info) {
//       delete info[key]
//     }
//     type.value = 'global'
//   } else {
//     info = Object.assign(info, common.getScreenOptionOfElements[i])
//     idx.value = i
//     type.value = 'item'
//   }
// })

useWatchResize(() => {
  height.value = document.documentElement.clientHeight
})

onMounted(() => {
  height.value = document.documentElement.clientHeight
})
onUnmounted(() => {
  // stop()
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