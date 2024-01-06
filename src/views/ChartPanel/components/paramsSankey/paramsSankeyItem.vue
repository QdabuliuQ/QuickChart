<template>
  <div class="params-sankey-item">
    <option-items :config="config" />
  </div>
</template>
<script setup lang="ts">
import { reactive} from 'vue';
import optionItems from '@/components/optionItems.vue'
import useProxy from '@/hooks/useProxy';
import useStore from "@/store";
import { ConfigInt } from '@/types/common';
import { common } from '@/chartConfig/opname';
import { getConfigValue } from '@/utils';
import {borderType} from "@/chartConfig/constant";
import useWatchData from "@/hooks/useWatchData";
const proxy = useProxy()
const {chart}: any = useStore()
const seriesItemStyle = chart.getOption.series.itemStyle
const config = reactive<ConfigInt>({
  borderWidth: {
    type: 'input_number',
    title: common.borderWidth,
    max: 100,
    value: seriesItemStyle.borderWidth
  },
  borderType: {
    type: 'select',
    title: common.borderType,
    options: borderType,
    value: seriesItemStyle.borderType
  },
  borderColor: {
    type: 'color_picker',
    title: common.borderColor,
    value: seriesItemStyle.borderColor
  },
  shadowBlur: {
    type: 'input_number',
    title: common.shadowBlur,
    max: 50,
    value: seriesItemStyle.shadowBlur
  },
  shadowColor: {
    type: 'color_picker',
    title: common.shadowColor,
    value: seriesItemStyle.shadowColor
  },
  shadowOffsetX: {
    type: 'input_number',
    title: common.shadowOffsetX,
    max: 500,
    min: -500,
    value: seriesItemStyle.shadowOffsetX
  },
  shadowOffsetY: {
    type: 'input_number',
    title: common.shadowOffsetY,
    max: 500,
    min: -500,
    value: seriesItemStyle.shadowOffsetY
  },
  opacity: {
    type: 'input_number',
    title: common.opacity,
    max: 1,
    value: seriesItemStyle.opacity
  },
})
const getData = () => {
  const series = chart.getOption.series
  series.itemStyle = getConfigValue(config)
  return series
}
useWatchData(config, 'series', getData)
</script>