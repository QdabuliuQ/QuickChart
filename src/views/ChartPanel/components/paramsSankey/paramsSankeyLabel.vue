<template>
  <div class="paramsSankeyLabel">
    <option-items :config="config"/>
  </div>
</template>
<script setup lang="ts">
import {reactive} from 'vue';
import optionItems from '@/components/optionItems.vue'
import useProxy from '@/hooks/useProxy';
import useStore from "@/store";
import {ConfigInt} from '@/types/common';
import {label, common} from '@/chartConfig/opname';
import {getConfigValue} from '@/utils';
import {fontFamily, fontStyle, fontWeight, position} from "@/chartConfig/constant";
import useWatchData from "@/hooks/useWatchData";

const proxy = useProxy()
const _common: any = useStore()
const seriesLabel = _common.option.series.label
const config = reactive<ConfigInt>({
  show: {
    type: 'switch',
    title: common.show,
    value: seriesLabel.show
  },
  position: {
    type: 'select',
    title: label.position,
    options: position,
    value: seriesLabel.position
  },
  rotate: {
    type: 'input_number',
    title: label.rotate,
    max: 360,
    min: -360,
    value: seriesLabel.rotate
  },
  offsetX: {
    type: 'input_number',
    title: label.offsetX,
    max: 360,
    min: -360,
    value: seriesLabel.offset[0]
  },
  offsetY: {
    type: 'input_number',
    title: label.offsetY,
    max: 360,
    min: -360,
    value: seriesLabel.offset[1]
  },
  color: {
    type: 'color_picker',
    title: label.color,
    value: seriesLabel.color
  },
  fontStyle: {
    type: 'select',
    title: label.fontStyle,
    options: fontStyle,
    value: seriesLabel.fontStyle
  },
  fontWeight: {
    type: 'select',
    title: label.fontWeight,
    options: fontWeight,
    value: seriesLabel.fontWeight
  },
  fontFamily: {
    type: 'select',
    title: label.fontFamily,
    options: fontFamily,
    value: seriesLabel.fontFamily
  },
  fontSize: {
    type: 'input_number',
    title: label.fontSize,
    max: 100,
    value: seriesLabel.fontSize
  },
})

const getData = () => {
  const series = _common.option.series
  const option = getConfigValue(config)
  for (let key in option) {
    if (key == 'offsetX' || key == 'offsetY') {
      series.label['offset'][key == 'offsetX' ? 0 : 1] = option[key]
    } else {
      series.label[key] = option[key]
    }
  }
  return series
}
useWatchData(config, 'series', getData)
</script>