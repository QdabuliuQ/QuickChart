<template>
  <div class="paramsFunnelItem">
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
import {common} from '@/chartConfig/opname';
import {getConfigValue} from '@/utils';
import {borderType} from "@/chartConfig/constant";

const proxy = useProxy()
const _common: any = useCommonStore()
const seriesItem = _common.option.series.itemStyle
const config = reactive<ConfigInt>({
  borderColor: {
    type: 'color_picker',
    title: common.borderColor,
    value: seriesItem.borderColor
  },
  borderWidth: {
    type: 'input_number',
    title: common.borderWidth,
    max: 100,
    value: seriesItem.borderWidth
  },
  borderType: {
    type: 'select',
    title: common.borderType,
    options: borderType,
    value: seriesItem.borderType
  },
  shadowBlur: {
    type: 'input_number',
    title: common.shadowBlur,
    max: 100,
    value: seriesItem.shadowBlur
  },
  shadowColor: {
    type: 'color_picker',
    title: common.shadowColor,
    value: seriesItem.shadowColor
  },
  shadowOffsetX: {
    type: 'input_number',
    title: common.shadowOffsetX,
    max: 500,
    min: -500,
    value: seriesItem.shadowOffsetX
  },
  shadowOffsetY: {
    type: 'input_number',
    title: common.shadowOffsetY,
    max: 500,
    min: -500,
    value: seriesItem.shadowOffsetY
  },
  opacity: {
    type: 'input_number',
    title: common.opacity,
    max: 1,
    value: seriesItem.opacity
  },
})

const getData = () => {
  const series = _common.option.series
  series.itemStyle = getConfigValue(config)
  return series
}
useWatchData(config, 'series', getData)
</script>