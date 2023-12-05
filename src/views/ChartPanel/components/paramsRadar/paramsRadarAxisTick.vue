<template>
  <div class="paramsRadarAxisTick">
    <optionItems :config="config" />
  </div>
</template>

<script setup lang='ts'>
import { reactive, watch } from 'vue';
import optionItems from '@/components/optionItems.vue'
import useProxy from '@/hooks/useProxy';
import useStore from "@/store";
import { ConfigInt } from '@/types/common';
import { label, common } from '@/chartConfig/opname';
import { debounce, getConfigValue } from '@/utils';
import { borderType } from '@/chartConfig/constant';
const proxy = useProxy()
const {chart}: any = useStore()

const config = reactive<ConfigInt>({
  show: {
    type: 'switch',
    title: common.show,
    value: chart.getOption.radar.axisTick.show
  },
  color: {
    type: 'color_picker',
    title: common.color,
    value: chart.getOption.radar.axisTick.lineStyle.color
  },
  width: {
    type: 'input_number',
    title: common.width,
    max: 100,
    value: chart.getOption.radar.axisTick.lineStyle.width
  },
  type: {
    type: 'select',
    title: '线段' + common.type,
    options: borderType,
    value: chart.getOption.radar.axisTick.lineStyle.type
  },
  shadowBlur: {
    type: 'input_number',
    title: common.shadowBlur,
    max: 100,
    value: chart.getOption.radar.axisTick.lineStyle.shadowBlur
  },
  shadowColor: {
    type: 'color_picker',
    title: label.shadowColor,
    value: chart.getOption.radar.axisTick.lineStyle.shadowColor
  },
  shadowOffsetX: {
    type: 'input_number',
    title: label.shadowOffsetX,
    max: 500,
    min: -500,
    value: chart.getOption.radar.axisTick.lineStyle.shadowOffsetX
  },
  shadowOffsetY: {
    type: 'input_number',
    title: label.shadowOffsetY,
    max: 500,
    min: -500,
    value: chart.getOption.radar.axisTick.lineStyle.shadowOffsetY
  },
  opacity: {
    type: 'input_number',
    title: common.opacity,
    max: 1,
    step: .1,
    value: chart.getOption.radar.axisTick.lineStyle.opacity
  },
})

const getData = () => {
  let radar = chart.getOption.radar
  const option = getConfigValue(config)
  radar.axisTick.show = option.show
  delete option.show
  radar.axisTick.lineStyle = option
  return radar
}

watch(() => config, debounce(() => {
  proxy.$Bus.emit("optionChange", {
    radar: getData(),
  });
}, 500), {
  deep: true
})
</script>

<style lang='less'>
</style>