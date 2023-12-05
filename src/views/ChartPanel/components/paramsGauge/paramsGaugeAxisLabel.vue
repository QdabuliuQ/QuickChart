<template>
  <div class="paramsGaugeAxisLabel">
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
import {fontFamily, fontStyle, fontWeight} from "@/chartConfig/constant";

const proxy = useProxy()
const {chart}: any = useStore()
const seriesAxisLabel = chart.getOption.series.axisLabel
const config = reactive<ConfigInt>({
  show: {
    type: 'switch',
    value: seriesAxisLabel.show
  },
  distance: {
    type: 'input_number',
    max: 500,
    min: -500,
    value: seriesAxisLabel.distance
  },
  color: {
    type: 'color_picker',
    value: seriesAxisLabel.color
  },
  fontStyle: {
    type: 'select',
    options: fontStyle,
    value: seriesAxisLabel.fontStyle
  },
  fontWeight: {
    type: 'select',
    options: fontWeight,
    value: seriesAxisLabel.fontWeight
  },
  fontFamily: {
    type: 'select',
    options: fontFamily,
    value: seriesAxisLabel.fontFamily
  },
  fontSize: {
    type: 'input_number',
    max: 100,
    value: seriesAxisLabel.fontSize
  }
})

const getData = () => {
  const series = chart.getOption.series
  series.axisLabel = getConfigValue(config)
  return series
}
useWatchData(config, 'series', getData)
</script>