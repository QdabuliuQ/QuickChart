<template>
  <div class="textConfig">
    <template v-if="info">
      <config-title title="文本参数" />
      <common-config :info="info" />
      <config-title title="文本配置" />
      <series-item title="层级">
        <el-input-number :min="1" :max="100" size="small" v-model="info.style.zIndex" />
      </series-item>
    </template>
  </div>
</template>
<script setup lang="ts">
import {onUnmounted, ref, watch} from "vue";
import {ElementTypeProperties, Text} from "@/types/common";
import useCommonStore from "@/store/common";
import CommonConfig from "@/views/ScreenPage/components/commonConfig.vue";
import ConfigTitle from "./configTitle.vue";
import SeriesItem from "@/components/seriesItem.vue";

let info = ref<Text | null>(null)
const idx = ref<number>(-1)

const common = useCommonStore()
let stop = watch(() => common.curElementIdx, () => {
  if (common.getCurElementIdx !== -1 && common.getScreenOptionOfElements[common.getCurElementIdx].type === 'text') {
    idx.value = common.getCurElementIdx
    info.value = common.getScreenOptionOfElements[common.getCurElementIdx] as ElementTypeProperties<'text'>
  }
}, {
  deep: true,
  immediate: true
})

onUnmounted(() => {
  stop()
})
</script>
<style lang="less">

</style>