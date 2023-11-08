<template>
  <div class="shapeConfig">
    <template v-if="info">
      <config-title title="图形参数" />
      <common-config :info="baseInfo" />
      <config-title title="图形配置" />
      <series-item title="层级">
        <el-input-number :min="1" :max="100" size="small" v-model="info.style.zIndex" />
      </series-item>
      <series-item title="阴影颜色">
        <el-color-picker size="small" v-model="info.style.shadowColor" show-alpha />
      </series-item>
      <series-item title="阴影偏移X">
        <el-input-number :min="-200" :max="200" size="small" v-model="info.style.shadowX" />
      </series-item>
      <series-item title="阴影偏移Y">
        <el-input-number :min="-200" :max="200" size="small" v-model="info.style.shadowY" />
      </series-item>
      <series-item title="阴影模糊">
        <el-input-number :min="0" :max="100" size="small" v-model="info.style.shadowBlur" />
      </series-item>
      <series-item title="图形颜色">
        <el-color-picker size="small" v-model="info.style.fill" show-alpha />
      </series-item>
      <series-item title="边框颜色">
        <el-color-picker size="small" v-model="info.style.stroke" show-alpha />
      </series-item>
      <series-item title="边框宽度">
        <el-input-number :min="0" :max="100" size="small" v-model="info.style.strokeWidth" />
      </series-item>
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
import SeriesItem from "@/components/seriesItem.vue";
import {setCommonStyle} from "@/utils/screenUtil";

let info = ref<Shape | null>(null)
const idx = ref<number>(-1)
const common = useCommonStore()
const baseInfo = common.getScreenOptionOfElements[common.getCurElementIdx] as ElementTypeProperties<'text'>

const updateInfo = () => {
  idx.value = common.getCurElementIdx
  info.value = JSON.parse(JSON.stringify(common.getScreenOptionOfElements[common.getCurElementIdx] as ElementTypeProperties<'shape'>))
}

let stop = watch(() => info, debounce(() => {
  setCommonStyle(baseInfo, info)
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