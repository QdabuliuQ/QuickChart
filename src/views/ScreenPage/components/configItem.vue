<template>
  <div class="configItem">
    <el-scrollbar :height="height + 'px'">
      <div class="container">
        <chart-config v-if="type === 'item' && info.type === 'chart'" :idx="idx" :info="info" />
        <canvas-config v-else />
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import useProxy from "@/hooks/useProxy";
import {onMounted, onUnmounted, reactive, ref} from "vue";
import {useWatchResize} from "@/hooks/useWatchResize";
import ChartConfig from "./chartConfig.vue"
import CanvasConfig from "./canvasConfig.vue"

const proxy = useProxy()
const type = ref<"item" | "global">('global')
const height = ref<number>(0)
let info = reactive<any>({})
const idx = ref<number>(-1)
const selectItemEvent = (e: any) => {
  if(e) {
    info = Object.assign(info, e.info)
    idx.value = e.idx
    type.value = 'item'
  } else {
    for(let key in info) {
      delete info[key]
    }
    type.value = 'global'
    console.log(type.value)
  }
}

useWatchResize(() => {
  height.value = document.documentElement.clientHeight
})

onMounted(() => {
  proxy.$Bus.on("selectItem", selectItemEvent)
  height.value = document.documentElement.clientHeight
})
onUnmounted(() => {
  proxy.$Bus.off("selectItem", selectItemEvent)
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