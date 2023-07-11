<template>
  <div class="paramsGaugeDetail">
    <option-items :config="config"/>
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
import { fontFamily, fontStyle, fontWeight} from "@/chartConfig/constant";

const proxy = useProxy()
const _common: any = useCommonStore()
const seriesDetail = _common.option.series.detail

const config = reactive<ConfigInt>({
  show: {
    type: 'switch',
    value: seriesDetail.show
  },
  color: {
    type: 'color_picker',
    value: seriesDetail.color
  },
  fontStyle: {
    type: 'select',
    options: fontStyle,
    value: seriesDetail.fontStyle
  },
  fontWeight: {
    type: 'select',
    options: fontWeight,
    value: seriesDetail.fontWeight
  },
  fontFamily: {
    type: 'select',
    options: fontFamily,
    value: seriesDetail.fontFamily
  },
  fontSize: {
    type: 'input_number',
    value: seriesDetail.fontSize
  },
  offsetX: {
    type: 'input_number',
    max: 500,
    min: -500,
    unit: '%',
    value: parseInt(seriesDetail.offsetCenter[0])
  },
  offsetY: {
    type: 'input_number',
    max: 500,
    min: -500,
    unit: '%',
    value: parseInt(seriesDetail.offsetCenter[1])
  },
})

const getData = () => {
  const series = _common.option.series
  const option = getConfigValue(config)
  option.offsetCenter = [option.offsetX, option.offsetY]
  delete option.offsetX
  delete option.offsetY
  series.detail = option
  return series
}

useWatchData(config, 'series', getData)
</script>