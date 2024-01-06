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
      <config-btn :icon="'i_delete_2'" :bg-color="'rgb(255, 66, 66)'" @btn-click="deleteEvent" label="删除元素" />
    </template>
  </div>
</template>
<script setup lang="ts">
import {onMounted, onUnmounted, ref, watch} from "vue";
import useStore from "@/store";
import {Chart, ElementTypeProperties} from "@/types/screen";
import useProxy from "@/hooks/useProxy";
import {debounce} from "@/utils";
import ConfigTitle from "@/views/ScreenPage/components/configTitle.vue";
import SeriesItem from "@/components/seriesItem.vue";
import ConfigBtn from "@/views/ScreenPage/components/configBtn.vue";
import CommonConfig from "@/views/ScreenPage/components/commonConfig.vue";
import {setCommonStyle} from "@/utils/screenUtil";

const props = defineProps<{
  id: string
}>()
const proxy = useProxy()
const {screen} = useStore()
const baseInfo = ref(screen.getScreenOptionOfElements[screen.getCurElementIdx] as ElementTypeProperties<'chart'>)
const idx = ref<number>(-1)
let info = ref<Chart | null>(null)
const deleteEvent = () => {  // 删除图表
  proxy.$Bus.emit("deleteChart", screen.curElementIdx)
}

const updateInfo = () => {
  if (screen.getCurElementIdx !== -1) {
    idx.value = screen.getCurElementIdx
    info.value = JSON.parse(JSON.stringify(screen.getScreenOptionOfElements[screen.getCurElementIdx] as ElementTypeProperties<'chart'>))
  }
}
let stop = watch(() => info, debounce(() => {
  setCommonStyle(baseInfo, info)
  screen.updateScreenOptionOfElementStyle(JSON.parse(JSON.stringify(info.value!.style)), idx.value)
}), {
  deep: true
})
let stop2 = watch(() => screen.curElementIdx, (newVal: number) => {
  if (newVal !== -1 && screen.getScreenOptionOfElements[newVal].id === props.id) {
    baseInfo.value = screen.getScreenOptionOfElements[screen.getCurElementIdx]
    updateInfo()
  }
})

onMounted(() => {
  updateInfo()
})

onUnmounted(() => {
  stop()
  stop2()
})

</script>
<style lang="less">
.chartConfig {
  .cover {
    overflow: hidden;
    width: 100%;
    background-repeat: repeat;
    background-size: cover;
    border-radius: 10px;
    aspect-ratio: 1/.7;
    background-image: url("../../../assets/image/bg.jpg");
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      vertical-align: middle;
    }
  }
}
</style>