<template>
  <div class="configItem">
    <el-scrollbar :height="height + 'px'">
      <div v-if="info && info.type" class="container">
        <chart-config v-if="info.type === 'chart'" :idx="idx" :info="info" />
      </div>
      <div style="display: flex; align-items: center; justify-content: center; height: 100vh" v-else>
        <el-empty :image-size="120" description="请选择图表" />
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import useProxy from "@/hooks/useProxy";
import {onMounted, onUnmounted, reactive, ref} from "vue";
import {useWatchResize} from "@/hooks/useWatchResize";
import chartConfig from "./chartConfig.vue"

const proxy = useProxy()
const height = ref<number>(0)
let info = reactive<any>({})
const idx = ref<number>(-1)
const selectItemEvent = (e: any) => {
  info = Object.assign(info, e.info)
  idx.value = e.idx
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