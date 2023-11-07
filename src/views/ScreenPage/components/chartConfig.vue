<template>
  <div class="chartConfig">
    <template v-if="info">
      <div class="cover">
        <img :src="info.cover"/>
      </div>
      <config-title title="图表参数" />
      <common-config :info="baseInfo" />
      <config-title title="图表配置" />
      <series-item title="层级">
        <el-input-number :min="1" :max="100" size="small" v-model="info.style.zIndex" />
      </series-item>
      <config-btn :icon="'i_delete_2'" :bg-color="'rgb(255, 66, 66)'" @btn-click="deleteEvent" label="删除图表" />
      <config-btn @btn-click="lockClick" :bg-color="info.isLock ? '#79d321' : '#9c9c9c'" :icon="info.isLock ? 'i_unlock' : 'i_lock'" :label="info.isLock ? '解锁图表' : '锁定图表'" />
    </template>
  </div>
</template>
<script setup lang="ts">
import {onMounted, onUnmounted, ref, watch} from "vue";
import useCommonStore from "@/store/common";
import {Chart, Elements, ElementTypeProperties} from "@/types/screen";
import useProxy from "@/hooks/useProxy";
import {debounce} from "@/utils";
import ConfigTitle from "@/views/ScreenPage/components/configTitle.vue";
import SeriesItem from "@/components/seriesItem.vue";
import ConfigBtn from "@/views/ScreenPage/components/configBtn.vue";
import CommonConfig from "@/views/ScreenPage/components/commonConfig.vue";

const proxy = useProxy()
const common = useCommonStore()
const baseInfo = common.getScreenOptionOfElements[common.getCurElementIdx] as ElementTypeProperties<'chart'>
const idx = ref<number>(-1)
let info = ref<Chart | null>(null)
const deleteEvent = () => {  // 删除图表
  proxy.$Bus.emit("deleteChart", common.curElementIdx)
}
const lockClick = () => {
  info.value!.isLock = !info.value!.isLock
  common.updateScreenOptionOfElements(info.value)
}

const updateInfo = () => {
  idx.value = common.getCurElementIdx
  info.value = JSON.parse(JSON.stringify(common.getScreenOptionOfElements[common.getCurElementIdx] as ElementTypeProperties<'chart'>))
}
let stop = watch(() => info, debounce(() => {
  common.updateScreenOptionOfElementStyle(JSON.parse(JSON.stringify(info.value!.style )), idx.value)
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
.chartConfig {
  .cover {
    width: 100%;
    aspect-ratio: 1/.7;
    border-radius: 10px;
    overflow: hidden;
    background-image: url("../../../assets/image/bg.jpg");
    background-size: cover;
    background-repeat: repeat;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      vertical-align: middle;
    }
  }
}
</style>