<template>
  <div class="paramsGaugeProgress">
    <option-items :config="config" />
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
const _common: any = useStore()
const seriesProgress = _common.option.series.progress

const config = reactive<ConfigInt>({
  show: {
    type: 'switch',
    value: seriesProgress.show
  },
  roundCap: {
    type: 'switch',
    value: seriesProgress.roundCap,
  },
  width: {
    type: 'input_number',
    max: 100,
    value: seriesProgress.width
  },
  borderColor: {
    type: 'color_picker',
    prefixs: ['itemStyle'],
    value: seriesProgress.itemStyle.borderColor
  },
  borderWidth: {
    type: 'input_number',
    prefixs: ['itemStyle'],
    max: 100,
    value: seriesProgress.itemStyle.borderWidth
  },
  borderType: {
    type: 'select',
    prefixs: ['itemStyle'],
    options: borderType,
    value: seriesProgress.itemStyle.borderType
  },
  shadowBlur: {
    type: 'input_number',
    prefixs: ['itemStyle'],
    max: 100,
    value: seriesProgress.itemStyle.shadowBlur
  },
  shadowColor: {
    type: 'color_picker',
    prefixs: ['itemStyle'],
    value: seriesProgress.itemStyle.shadowColor
  },
  shadowOffsetX: {
    type: 'input_number',
    prefixs: ['itemStyle'],
    max: 500,
    min: -500,
    value: seriesProgress.itemStyle.shadowOffsetX
  },
  shadowOffsetY: {
    type: 'input_number',
    prefixs: ['itemStyle'],
    max: 500,
    min: -500,
    value: seriesProgress.itemStyle.shadowOffsetY
  },
  opacity: {
    type: 'input_number',
    prefixs: ['itemStyle'],
    max: 1,
    value: seriesProgress.itemStyle.opacity
  },
})

const getData = () => {
  const series = _common.option.series
  series.progress = getConfigValue(config)
  return series
}

useWatchData(config, 'series', getData)
</script>