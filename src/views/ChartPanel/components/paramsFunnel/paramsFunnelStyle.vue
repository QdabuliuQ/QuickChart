<template>
  <div class="paramsFunnelStyle">
    <option-items :config="config" />
  </div>
</template>

<script setup lang="ts">
import {reactive} from 'vue';
import optionItems from '@/components/optionItems.vue'
import useProxy from '@/hooks/useProxy';
import useWatchData from "@/hooks/useWatchData";
import useStore from "@/store";
import {ConfigInt} from '@/types/common';
import {common} from '@/chartConfig/opname';
import {getConfigValue} from '@/utils';
import {align, orient} from "@/chartConfig/constant";

const proxy = useProxy()
const {chart}: any = useStore()
const series = chart.getOption.series
const config = reactive<ConfigInt>({
  min: {
    type: 'input_number',
    title: '数据最小值',
    max: 1000000000,
    min: -1000000000,
    value: series.min
  },
  max: {
    type: 'input_number',
    title: '数据最小值',
    max: 1000000000,
    min: -1000000000,
    value: series.max
  },
  minSize: {
    type: 'input_number',
    title: '最小宽度(%)',
    max: 100,
    unit: '%',
    value: parseInt(series.minSize)
  },
  maxSize: {
    type: 'input_number',
    title: '最大宽度(%)',
    max: 100,
    unit: '%',
    value: parseInt(series.maxSize)
  },
  orient: {
    type: 'select',
    title: common.orient,
    options: orient,
    value: series.orient
  },
  sort: {
    type: 'select',
    title: '数据排序',
    options: [
      {
        label: '降序',
        value: 'descending'
      },
      {
        label: '升序',
        value: 'ascending'
      },
      {
        label: '不排序',
        value: 'none'
      },
    ],
    value: series.sort
  },
  left: {
    type: 'input_number',
    title: common.left,
    max: 100,
    unit: '%',
    value: parseInt(series.left)
  },
  right: {
    type: 'input_number',
    title: common.right,
    max: 100,
    unit: '%',
    value: parseInt(series.right)
  },
  top: {
    type: 'input_number',
    title: common.top,
    max: 100,
    unit: '%',
    value: parseInt(series.top)
  },
  bottom: {
    type: 'input_number',
    title: common.bottom,
    max: 100,
    unit: '%',
    value: parseInt(series.bottom)
  },
  funnelAlign: {
    type: 'select',
    title: common.align,
    options: align,
    value: series.funnelAlign
  },
  gap: {
    type: 'input_number',
    title: '图形间距',
    value: series.gap
  },
})

const getData = () => {
  const series = chart.getOption.series
  const option = getConfigValue(config)
  for (let key in option) {
    series[key] = option[key]
  }
  return series
}
useWatchData(config, 'series', getData)
</script>