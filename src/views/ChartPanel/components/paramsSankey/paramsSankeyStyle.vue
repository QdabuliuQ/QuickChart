<template>
  <div class="paramsSankeyStyle">
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
import {common} from '@/chartConfig/opname';
import {getConfigValue} from '@/utils';

const proxy = useProxy()
const _common: any = useStore()

const config = reactive<ConfigInt>({
  left: {
    type: 'input_number',
    title: common.left + '(%)',
    max: 100,
    unit: '%',
    value: parseInt(_common.option.series.left)
  },
  top: {
    type: 'input_number',
    title: common.top + '(%)',
    max: 100,
    unit: '%',
    value: parseInt(_common.option.series.top)
  },
  right: {
    type: 'input_number',
    title: common.right + '(%)',
    max: 100,
    unit: '%',
    value: parseInt(_common.option.series.right)
  },
  bottom: {
    type: 'input_number',
    title: common.bottom + '(%)',
    max: 100,
    unit: '%',
    value: parseInt(_common.option.series.bottom)
  },
  nodeWidth: {
    type: 'input_number',
    title: '组件' + common.width,
    max: 500,
    value: _common.option.series.nodeWidth
  },
  nodeGap: {
    type: 'input_number',
    title: '组件间距',
    max: 500,
    value: _common.option.series.nodeGap
  },
  nodeAlign: {
    type: 'select',
    title: '对齐方式',
    options: [
      {
        label: '双端对齐',
        value: 'justify'
      },
      {
        label: '左对齐',
        value: 'left'
      },
      {
        label: '右对齐',
        value: 'right'
      }
    ],
    value: _common.option.series.nodeAlign
  },
  orient: {
    type: 'select',
    title: '布局' + common.orient,
    options: [
      {
        label: '水平',
        value: 'horizontal',
      },
      {
        label: '垂直',
        value: 'vertical'
      }
    ],
    value: _common.option.series.orient
  },
})

const getData = () => {
  const series = _common.option.series
  const option = getConfigValue(config)
  for (let key in option) {
    series[key] = option[key]
  }
  return series
}
useWatchData(config, 'series', getData)
</script>