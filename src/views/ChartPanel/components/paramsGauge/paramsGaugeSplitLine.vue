<template>
  <div class="paramsGaugeSplitLine">
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
const seriesSplitLine = _common.option.series.splitLine
// show: true,
//   length: 10,
//   : 10,
//   lineStyle: {
//   color: '#63677A' ,
//     : 3 ,
//     : 'solid' ,
//     : 0 ,
//     : '' ,
//     : 0 ,
//     : 0 ,
//     : 1
// },
const config = reactive<ConfigInt>({
  show: {
    type: 'switch',
    value: seriesSplitLine.show,
  },
  length: {
    type: 'input_number',
    value: seriesSplitLine.length,
  },
  distance: {
    type: 'input_number',
    max: 500,
    min: -500,
    value: seriesSplitLine.distance,
  },
  color: {
    type: 'color_picker',
    prefixs: ['lineStyle'],
    value: seriesSplitLine.lineStyle.color,
  },
  width: {
    type: 'input_number',
    prefixs: ['lineStyle'],
    value: seriesSplitLine.lineStyle.width,
  },
  type: {
    type: 'select',
    prefixs: ['lineStyle'],
    options: borderType,
    value: seriesSplitLine.lineStyle.type,
  },
  shadowBlur: {
    type: 'input_number',
    prefixs: ['lineStyle'],
    max: 100,
    value: seriesSplitLine.lineStyle.shadowBlur,
  },
  shadowColor: {
    type: 'color_picker',
    prefixs: ['lineStyle'],
    value: seriesSplitLine.lineStyle.shadowColor,
  },
  shadowOffsetX: {
    type: 'input_number',
    prefixs: ['lineStyle'],
    max: 500,
    min: -500,
    value: seriesSplitLine.lineStyle.shadowOffsetX,
  },
  shadowOffsetY: {
    type: 'input_number',
    prefixs: ['lineStyle'],
    max: 500,
    min: -500,
    value: seriesSplitLine.lineStyle.shadowOffsetY,
  },
  opacity: {
    type: 'input_number',
    prefixs: ['lineStyle'],
    max: 1,
    value: seriesSplitLine.lineStyle.opacity,
  },
})

const getData = () => {
  const series = _common.option.series
  series.splitLine = getConfigValue(config)
  return series
}

useWatchData(config, 'series', getData)
</script>