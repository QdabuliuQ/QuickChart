<template>
  <div class="paramsSankeyLine">
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

const proxy = useProxy()
const _common: any = useCommonStore()
const seriesLine = _common.option.series.lineStyle
const config = reactive<ConfigInt>({
  colorType: {
    type: 'select',
    title: '取色方式',
    options: [
      {
        label: '源节点颜',
        value: 'source'
      },
      {
        label: '目标节点颜色',
        value: 'target'
      },
      {
        label: '渐变颜色',
        value: 'gradient'
      },
      {
        label: '自定义',
        value: 'custom'
      }
    ],
    value: seriesLine.color != 'source' && seriesLine.color != 'target' && seriesLine.color != 'gradient' ? 'custom' : seriesLine.color
  },
  color: {
    type: 'color_picker',
    title: common.color,
    value: seriesLine.color
  },
  opacity: {
    type: 'input_number',
    title: common.opacity,
    max: 1,
    value: seriesLine.opacity
  },
  curveness: {
    type: 'input_number',
    title: '图边曲度',
    max: 1,
    value: seriesLine.curveness
  },
  shadowBlur: {
    type: 'input_number',
    title: common.shadowBlur,
    max: 100,
    value: seriesLine.shadowBlur
  },
  shadowColor: {
    type: 'color_picker',
    title: common.shadowColor,
    value: seriesLine.shadowColor
  },
  shadowOffsetX: {
    type: 'input_number',
    title: common.shadowOffsetX,
    max: 500,
    min: -500,
    value: seriesLine.shadowOffsetX
  },
  shadowOffsetY: {
    type: 'input_number',
    title: common.shadowOffsetY,
    max: 500,
    min: -500,
    value: seriesLine.shadowOffsetY
  },
})

const getData = () => {
  const series = _common.option.series
  const option = getConfigValue(config)
  option.color = option.colorType != 'source' && option.colorType != 'target' && option.colorType != 'gradient' ? option.color : option.colorType
  delete option.colorType
  series.lineStyle = option
  return series
}
useWatchData(config, 'series', getData)
</script>