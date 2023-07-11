<template>
  <div class="paramsSunburstLabel">
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
import {align, fontFamily, fontStyle, fontWeight} from "@/chartConfig/constant";

const proxy = useProxy()
const _common: any = useCommonStore()
const seriesLabel = _common.option.series.label
const config = reactive<ConfigInt>({
  show: {
    type: 'switch',
    value: seriesLabel.show
  },
  rotate: {
    type: 'select',
    options: [
      {
        label: '径向旋转',
        value: 'radial'
      },
      {
        label: '切向旋转',
        value: 'tangential'
      },
      {
        label: '自定义',
        value: 'custom'
      }
    ],
    value: seriesLabel.rotate != 'radial'
      && seriesLabel.rotate != 'tangential' ? 'custom'
      : seriesLabel.rotate
  },
  rotate1: {
    type: 'input_number',
    max: 360,
    min: -360,
    title: '旋转度数',
    value: seriesLabel.rotate == 'radial'
    || seriesLabel.rotate == 'tangential' ? 0
      : seriesLabel.rotate
  },
  align: {
    type: 'select',
    options: align,
    value: seriesLabel.align
  },
  color: {
    type: 'color_picker',
    value: seriesLabel.color
  },
  fontStyle: {
    type: 'select',
    options: fontStyle,
    value: seriesLabel.fontStyle
  },
  fontWeight: {
    type: 'select',
    options: fontWeight,
    value: seriesLabel.fontWeight
  },
  fontFamily: {
    type: 'select',
    options: fontFamily,
    value: seriesLabel.fontFamily
  },
  fontSize: {
    type: 'input_number',
    max: 100,
    value: seriesLabel.fontSize
  },
})

const getData = () => {
  const series = _common.option.series
  const option = getConfigValue(config)
  if(option.rotate == 'custom') {
    option.rotate = option.rotate1
  }
  delete option.rotate1
  series.label = option
  return series
}
useWatchData(config, 'series', getData)
</script>