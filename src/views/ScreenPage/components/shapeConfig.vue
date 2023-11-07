<template>
  <div class="shapeConfig">
    <template v-if="info">
      <config-title title="图形参数" />
      <common-config :info="baseInfo" />
    </template>
  </div>
</template>
<script setup lang="ts">
import {onMounted, onUnmounted, ref, watch} from "vue";
import CommonConfig from "./commonConfig.vue";
import {ElementTypeProperties, Shape} from "@/types/screen";
import useCommonStore from "@/store/common";
import ConfigTitle from "@/views/ScreenPage/components/configTitle.vue";
import {debounce} from "@/utils";

let info = ref<Shape | null>(null)
const idx = ref<number>(-1)
const common = useCommonStore()
const baseInfo = common.getScreenOptionOfElements[common.getCurElementIdx] as ElementTypeProperties<'text'>

const updateInfo = () => {
  idx.value = common.getCurElementIdx
  info.value = JSON.parse(JSON.stringify(common.getScreenOptionOfElements[common.getCurElementIdx] as ElementTypeProperties<'shape'>))
}

let stop = watch(() => info, debounce(() => {
  common.updateScreenOptionOfElementStyle(JSON.parse(JSON.stringify(info.value!.style)), idx.value)
}), {
  deep: true
})

onMounted(() => {
  updateInfo()
})
onUnmounted(() => {
  stop()
})

</script>
<style lang="less">

</style>