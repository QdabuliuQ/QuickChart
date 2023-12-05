<template>
  <div class="paramsBarAngleAxisTick">
    <option-items :config="config" />
  </div>
</template>

<script setup lang='ts'>
import { reactive, watch } from 'vue';
import optionItems from '@/components/optionItems.vue';
import useStore from "@/store";
import useProxy from '@/hooks/useProxy';
import { ConfigInt } from '@/types/common';
import { debounce, getConfigValue } from '@/utils';
import {common} from "@/chartConfig/opname";
import {borderType} from "@/chartConfig/constant";

const proxy = useProxy()
const {chart}: any = useStore()

const config = reactive<ConfigInt>({
  show: {
    type: 'switch',
    title: common.show,
    value: chart.getOption.angleAxis.axisTick.show
  },
  color: {
    type: 'color_picker',
    title: common.color,
    prefixs: ['lineStyle'],
    value: chart.getOption.angleAxis.axisTick.lineStyle.color
  },
  width: {
    type: 'input_number',
    title: common.width,
    max: 100,
    prefixs: ['lineStyle'],
    value: chart.getOption.angleAxis.axisTick.lineStyle.width
  },
  length: {
    type: 'input_number',
    title: '线段长度',
    max: 200,
    value: chart.getOption.angleAxis.axisTick.length
  },
  type: {
    type: 'select',
    title: '线段' + common.type,
    options: borderType,
    prefixs: ['lineStyle'],
    value: chart.getOption.angleAxis.axisTick.lineStyle.type
  },
  opacity: {
    type: 'input_number',
    title: common.opacity,
    max: 1,
    step: .1,
    prefixs: ['lineStyle'],
    value: chart.getOption.angleAxis.axisTick.lineStyle.opacity
  },
})

const getData = () => {
  const angleAxis = chart.getOption.angleAxis
  angleAxis.axisTick = getConfigValue(config)
  console.log(angleAxis)
  return angleAxis
}

watch(() => config, debounce(() => {
  proxy.$Bus.emit("optionChange", {
    angleAxis: getData(),
  });
}, 500), {
  deep: true
})
</script>