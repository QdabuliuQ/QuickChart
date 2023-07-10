<template>
  <div class="paramsGaugeStyle">
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
const series = _common.option.series
const config = reactive<ConfigInt>({
  centerX: {
    type: 'input_number',
    title: common.offsetX + '(%)',
    max: 100,
    unit: '%',
    value: parseInt(series.center[0])
  },
  centerY: {
    type: 'input_number',
    title: common.offsetY + '(%)',
    max: 100,
    unit: '%',
    value: parseInt(series.center[1])
  },
  radius: {
    type: 'input_number',
    title: '仪表盘半径(%)',
    max: 100,
    unit: '%',
    value: parseInt(series.radius)
  },
  startAngle: {
    type: 'input_number',
    title: '起始角度',
    max: 360,
    min: -360,
    value: series.startAngle
  },
  endAngle: {
    type: 'input_number',
    title: '结束角度',
    max: 360,
    min: -360,
    value: series.endAngle
  },
  splitNumber: {
    type: 'input_number',
    title: '分割段数',
    max: 500,
    value: parseInt(series.splitNumber)
  },
  min: {
    type: 'input_number',
    title: '最小值',
    max: 100000000,
    min: -100000000,
    value: parseInt(series.min)
  },
  max: {
    type: 'input_number',
    title: '最大值',
    max: 100000000,
    min: -100000000,
    value: parseInt(series.max)
  },
  clockwise: {
    type: 'switch',
    title: '顺时针增长',
    value: series.clockwise
  },
})

const getData = () => {
  const series = _common.option.series
  const option = getConfigValue(config)
  option['center'] = [option.centerX, option.centerY]
  delete option.centerX
  delete option.centerY
  for (let key in option) {
    series[key] = option[key]
  }
  return series
}
useWatchData(config, 'series', getData)
</script>