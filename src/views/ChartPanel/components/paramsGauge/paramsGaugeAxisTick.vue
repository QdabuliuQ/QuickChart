<template>
  <div class="paramsGaugeAxisTick">
    <option-items :config="config"/>
  </div>
</template>
<script setup lang="ts">
import {reactive} from 'vue';
import optionItems from '@/components/optionItems.vue'
import useProxy from '@/hooks/useProxy';
import useWatchData from "@/hooks/useWatchData";
import useStore from "@/store";
import {ConfigInt} from '@/types/common';
import {getConfigValue} from '@/utils';
import {borderType} from "@/chartConfig/constant";

const proxy = useProxy()
const {chart}: any = useStore()
const seriesAxisTick = chart.getOption.series.axisTick
const config = reactive<ConfigInt>({
  show: {
    type: 'switch',
    value: seriesAxisTick.show
  },
  splitNumber: {
    type: 'input_number',
    title: '刻度数',
    max: 100,
    value: seriesAxisTick.splitNumber
  },
  length: {
    type: 'input_number',
    max: 100,
    value: seriesAxisTick.length
  },
  distance: {
    type: 'input_number',
    max: 500,
    min: -500,
    value: seriesAxisTick.distance
  },
  color: {
    type: 'color_picker',
    prefixs: ['lineStyle'],
    value: seriesAxisTick.lineStyle.color
  },
  width: {
    type: 'input_number',
    prefixs: ['lineStyle'],
    max: 100,
    value: seriesAxisTick.lineStyle.width
  },
  type: {
    type: 'select',
    prefixs: ['lineStyle'],
    options: borderType,
    value: seriesAxisTick.lineStyle.type
  },
  shadowBlur: {
    type: 'input_number',
    prefixs: ['lineStyle'],
    max: 100,
    value: seriesAxisTick.lineStyle.shadowBlur
  },
  shadowColor: {
    type: 'color_picker',
    prefixs: ['lineStyle'],
    value: seriesAxisTick.lineStyle.shadowColor
  },
  shadowOffsetX: {
    type: 'input_number',
    prefixs: ['lineStyle'],
    max: 500,
    min: -500,
    value: seriesAxisTick.lineStyle.shadowOffsetX
  },
  shadowOffsetY: {
    type: 'input_number',
    prefixs: ['lineStyle'],
    max: 500,
    min: -500,
    value: seriesAxisTick.lineStyle.shadowOffsetY
  },
  opacity: {
    type: 'input_number',
    prefixs: ['lineStyle'],
    max: 1,
    value: seriesAxisTick.lineStyle.opacity
  },
})

const getData = () => {
  const series = chart.getOption.series
  series.axisTick = getConfigValue(config)
  return series
}

useWatchData(config, 'series', getData)
</script>