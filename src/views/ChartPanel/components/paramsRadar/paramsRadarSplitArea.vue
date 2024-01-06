<template>
  <div class="params-radar-split-area">
    <optionItems :config="config" />
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import optionItems from '@/components/optionItems.vue'
import useProxy from '@/hooks/useProxy';
import useStore from "@/store";
import { ConfigInt } from '@/types/common';
import { common, label } from '@/chartConfig/opname';
import { debounce, getConfigValue } from '@/utils';

const proxy = useProxy()
const {chart}: any = useStore()
const config = reactive<ConfigInt>({
  show: {
    type: 'switch',
    title: common.show,
    value: chart.getOption.radar.splitArea.show
  },
  color: {
    type: 'color_picker',
    title: common.color,
    value: chart.getOption.radar.splitArea.areaStyle.color[0]
  },
  color0: {
    type: 'color_picker',
    title: common.color,
    value: chart.getOption.radar.splitArea.areaStyle.color[1]
  },
  shadowBlur: {
    type: 'input_number',
    title: common.shadowBlur,
    max: 100,
    value: chart.getOption.radar.splitArea.areaStyle.shadowBlur
  },
  shadowColor: {
    type: 'color_picker',
    title: common.shadowColor,
    value: chart.getOption.radar.splitArea.areaStyle.shadowColor
  },
  shadowOffsetX: {
    type: 'input_number',
    title: common.shadowOffsetX,
    max: 500,
    min: -500,
    value: chart.getOption.radar.splitArea.areaStyle.shadowOffsetX
  },
  shadowOffsetY: {
    type: 'input_number',
    title: common.shadowOffsetY,
    max: 500,
    min: -500,
    value: chart.getOption.radar.splitArea.areaStyle.shadowOffsetY
  },
  opacity: {
    type: 'input_number',
    title: common.opacity,
    max: 1,
    step: .1,
    value: chart.getOption.radar.splitArea.areaStyle.opacity
  }
})

const getData = () => {
  let radar = chart.getOption.radar
  const option = getConfigValue(config)
  radar.splitArea.show = option.show
  delete option.show
  radar.splitArea.areaStyle = option
  radar.splitArea.areaStyle.color = [option.color, option.color0]
  delete radar.splitArea.areaStyle.color0
  return radar
}

watch(() => config, debounce(() => {
  proxy.$Bus.emit("optionChange", {
    radar: getData(),
  });
}, 500), {
  deep: true
})
</script>