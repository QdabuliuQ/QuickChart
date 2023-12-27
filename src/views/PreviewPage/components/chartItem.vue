<template>
  <div :style="{
    width: '700px',
    height: '500px',
    transform: `scale(${getOffset(props.width, props.c_width, props.style.width) / 700}, ${getOffset(props.height, props.c_height, props.style.height) / 500})`,
    zIndex: props.style.zIndex,
    display: props.style.display,
    left: `${getOffset(props.width, props.c_width, props.style.translateX)}px`,
    top: `${getOffset(props.height, props.c_height, props.style.translateY)}px`,
  }" class="preview-page-chart-item">
    <div :style="{
      height: '100%',
      transform: `rotate(${props.style.rotate}deg)`,
      transformOrigin: '50% 50%'
    }">
      <div ref="chartItemRef" class="chart-item-main"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import {IStyle} from "@/types/screen";
import useProxy from "@/hooks/useProxy";
import {getOffset} from "@/utils/screenUtil";
import {oss} from "@/network";

interface Chart {
  id: string
  type: 'chart'
  isLock: boolean
  cover: string
  option: string
  style: IStyle
  c_width: number
  c_height: number
  width: number
  height: number
}

const props = defineProps<Chart>()
const proxy = useProxy()
const width = ref<number>(0)
const height = ref<number>(0)

const chartItemRef = ref(null)

onMounted(() => {
  const chart = proxy.$echarts.init(chartItemRef.value)
  const option = props.option.replace(/\$#url#\$/g, oss);
  chart.setOption(JSON.parse(option));
})


</script>
<style lang="less">
.preview-page-chart-item {
  position: absolute;
  transform-origin: 0 0;
  .chart-item-main {
    width: 100%;
    height: 100%;
  }
}
</style>