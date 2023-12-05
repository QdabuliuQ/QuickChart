<template>
  <div class="paramsPieStyle">
    <option-items :config="config" />
  </div>
</template>

<script setup lang='ts'>
import {
  watch,
  reactive
} from "vue";
import useProxy from "@/hooks/useProxy";
import {ConfigInt} from "@/types/common";
import {common} from '@/chartConfig/opname';
import useStore from "@/store";
import optionItems from '@/components/optionItems.vue'
import {debounce, getConfigValue} from "@/utils";

const proxy = useProxy()
const {chart}: any = useStore()

const config = reactive<ConfigInt>({
  offsetX: {
    type: 'input_number',
    title: common.offsetX + '(%)',
    max: 100,
    value: parseInt(chart.getOption.series[0].center[0])
  },
  offsetY: {
    type: 'input_number',
    title: common.offsetY + '(%)',
    max: 100,
    value: parseInt(chart.getOption.series[0].center[1])
  }
})
if(Array.isArray(chart.getOption.series[0].radius)) {
  config.innerSize = {
    type: 'input_number',
    title: '内圈大小(%)',
    max: 100,
    value: parseInt(chart.getOption.series[0].radius[0])
  }
  config.outerSize = {
    type: 'input_number',
    title: '外圈大小(%)',
    max: 100,
    value: parseInt(chart.getOption.series[0].radius[1])
  }
} else {
  config.size = {
    type: 'input_number',
    title: '圈大小(%)',
    max: 100,
    value: parseInt(chart.getOption.series[0].radius)
  }
}

const getData = () => {
  let series = chart.getOption.series
  const option = getConfigValue(config)
  for(let item of series) {
    if(option.innerSize) {
      item.radius = [option.innerSize+'%', option.outerSize+'%']
    } else {
      item.radius = option.size+'%'
    }
    item.center = [option.offsetX+'%', option.offsetY+'%']
  }
  return series
}

watch(() => config, debounce(() => {
  proxy.$Bus.emit("optionChange", {
    series: getData(),
  });
}, 500), {
  deep: true
})
</script>