<template>
  <div class="PreviewPage">
    <div v-if="!screenData.elements.length" class="preview-page-empty">
      <el-empty description="暂无可预览内容" />
    </div>
    <div class="preview-page-container">
      <template
        v-for="item in screenData.elements"
        :key="item.id"
      >
        <ChartItem
          v-if="item.type === 'chart'"
          v-bind="item as ElementTypeProperties<'chart'>"
          :c_height="cHeight"
          :c_width="cWidth"
          :width="width"
          :height="height"
        />
        <MapItem
          v-if="item.type === 'map'"
          v-bind="item as ElementTypeProperties<'map'>"
          :c_height="cHeight"
          :c_width="cWidth"
          :width="width"
          :height="height"
        />
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {ElementTypeProperties, IConfig} from "@/types/screen";
import ChartItem from "./components/chartItem.vue";
import MapItem from "@/views/PreviewPage/components/mapItem.vue";


let screenData = reactive<IConfig>({} as any)
if (localStorage.getItem("screenData")) {
  screenData = JSON.parse(localStorage.getItem("screenData") as string)
}
const width = ref<number>(0)
const height = ref<number>(0)
const cWidth = ref<number>(Number(localStorage.getItem("cWidth")))
const cHeight = ref<number>(Number(localStorage.getItem("cHeight")))

onMounted(() => {
  width.value = document.documentElement.clientWidth
  height.value = document.documentElement.clientHeight
})

</script>
<style lang="less">
.PreviewPage {
  height: 100vh;
  width: 100vw;
  .preview-page-empty {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .preview-page-container {
    width: 100%;
    height: 100%;
    position: relative;
  }
}
</style>