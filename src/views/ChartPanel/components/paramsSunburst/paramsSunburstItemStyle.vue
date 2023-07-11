<template>
  <div class="paramsSunburstItemStyle">
    <option-items :config="config" />
  </div>
</template>

<script setup lang="ts">
import {reactive} from 'vue';
import optionItems from '@/components/optionItems.vue'
import useProxy from '@/hooks/useProxy';
import useWatchData from "@/hooks/useWatchData";
import useCommonStore from "@/store/common";
import {ConfigInt} from '@/types/common';
import {getConfigValue} from '@/utils';
import {borderType} from "@/chartConfig/constant";

const proxy = useProxy()
const _common: any = useCommonStore()
const seriesItemStyle = _common.option.series.itemStyle

const config = reactive<ConfigInt>({
  borderColor: {
    type: 'color_picker',
    value: seriesItemStyle.borderColor,
  },
  borderWidth: {
    type: 'input_number',
    max: 100,
    value: seriesItemStyle.borderWidth,
  },
  borderType: {
    type: 'select',
    options: borderType,
    value: seriesItemStyle.borderType,
  },
  shadowBlur: {
    type: 'input_number',
    max: 100,
    value: seriesItemStyle.shadowBlur,
  },
  shadowColor: {
    type: 'color_picker',
    value: seriesItemStyle.shadowColor,
  },
  shadowOffsetX: {
    type: 'input_number',
    max: 500,
    min: -500,
    value: seriesItemStyle.shadowOffsetX,
  },
  shadowOffsetY: {
    type: 'input_number',
    max: 500,
    min: -500,
    value: seriesItemStyle.shadowOffsetY,
  },
  opacity: {
    type: 'input_number',
    max: 1,
    value: seriesItemStyle.opacity,
  },
  borderRadius: {
    type: 'input_number',
    max: 500,
    title: '圆角半径',
    value: seriesItemStyle.borderRadius,
  },
})

const getData = () => {
  const series = _common.option.series
  series.itemStyle = getConfigValue(config)
  return series
}
useWatchData(config, 'series', getData)
</script>