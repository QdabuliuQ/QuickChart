<template>
  <div class="paramsSunburstStyle">
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

const proxy = useProxy()
const _common: any = useCommonStore()
const series = _common.option.series
const config = reactive<ConfigInt>({
  sort: {
    type: 'select',
    options: [
      {
        label: '降序',
        value: 'desc'
      },
      {
        label: '升序',
        value: 'asc'
      },
    ],
    value: series.sort
  },
  innerSize: {
    type: 'input_number',
    max: 100,
    unit: '%',
    value: parseInt(series.radius[0])
  },
  outerSize: {
    type: 'input_number',
    max: 100,
    unit: '%',
    value: parseInt(series.radius[1])
  },
  offsetX: {
    type: 'input_number',
    max: 100,
    unit: '%',
    value: parseInt(series.center[0])
  },
  offsetY: {
    type: 'input_number',
    max: 100,
    unit: '%',
    value: parseInt(series.center[1])
  },
})

const getData = () => {
  let series = _common.option.series
  const option = getConfigValue(config)
  option['radius'] = [option.innerSize, option.outerSize]
  delete option.innerSize
  delete option.outerSize
  option['center'] = [option.offsetX, option.offsetY]
  for(let key in option) {
    series[key] = option[key]
  }
  return series
}
useWatchData(config, 'series', getData)
</script>