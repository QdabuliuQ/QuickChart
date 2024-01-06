<template>
  <div class="params-radar-line-style">
    <optionItems :config="config" />
    <optionItems :config="lineStyleConfig" />
    <optionItems :config="labelConfig" />
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import optionItems from '@/components/optionItems.vue'
import useProxy from '@/hooks/useProxy';
import useStore from "@/store";
import { ConfigInt } from '@/types/common';
import { common, label } from '@/chartConfig/opname';
import {borderType, fontFamily, fontStyle, fontWeight, position, symbol} from "@/chartConfig/constant";
import {debounce, getConfigValue} from "@/utils";
const proxy = useProxy()
const {chart}: any = useStore()

const config = reactive<ConfigInt>({
  symbol: {
    type: 'select',
    title: common.symbol,
    options: symbol,
    value: chart.getOption.series[0].symbol
  },
  symbolSize: {
    type: 'input_number',
    title: common.symbolSize,
    max: 100,
    value: chart.getOption.series[0].symbolSize
  },
  symbolRotate: {
    type: 'input_number',
    title: common.symbolRotate,
    max: 360,
    min: -360,
    value: chart.getOption.series[0].symbolRotate
  },
})
const lineStyleConfig = reactive<ConfigInt>({
  width: {
    type: 'input_number',
    title: '线段' + common.width,
    max: 100,
    value: chart.getOption.series[0].lineStyle.width
  },
  type: {
    type: 'select',
    title: '线段' + common.type,
    options: borderType,
    value: chart.getOption.series[0].lineStyle.type
  },
  opacity: {
    type: 'input_number',
    title: common.opacity,
    max: 1,
    step: .1,
    value: chart.getOption.series[0].lineStyle.opacity
  }
})
const labelConfig = reactive<ConfigInt>({
  show: {
    type: 'switch',
    title: '文本' + common.show,
    value: chart.getOption.series[0].label.show,
  },
  fontSize: {
    type: 'input_number',
    title: label.fontSize,
    max: 100,
    value: chart.getOption.series[0].label.fontSize,
  },
  color: {
    type: 'color_picker',
    title: label.color,
    value: chart.getOption.series[0].label.color,
  },
  rotate: {
    type: 'input_number',
    title: label.rotate,
    max: 360,
    min: -360,
    value: chart.getOption.series[0].label.rotate,
  },
  position: {
    type: 'select',
    title: label.position,
    options: position,
    value: chart.getOption.series[0].label.position,
  },
  fontStyle: {
    type: 'select',
    title: label.fontStyle,
    options: fontStyle,
    value: chart.getOption.series[0].label.fontStyle,
  },
  fontWeight: {
    type: 'select',
    title: label.fontWeight,
    options: fontWeight,
    value: chart.getOption.series[0].label.fontWeight,
  },
  fontFamily: {
    type: 'select',
    title: label.fontFamily,
    options: fontFamily,
    value: chart.getOption.series[0].label.fontFamily,
  },
})

const getData = (type: string) => {
  if(chart.getOption.series.length) {
    let series = chart.getOption.series
    if(type == 'series') {
      const option = getConfigValue(config)
      series[0].symbol = option.symbol
      series[0].symbolSize = option.symbolSize
      series[0].symbolRotate = option.symbolRotate
      return series
    } else if(type == 'lineStyle') {
      series[0].lineStyle = getConfigValue(lineStyleConfig)
    } else if(type == 'label') {
      series[0].label = getConfigValue(labelConfig)
    }
    return series
  }
  return []
}
watch(() => config, debounce(() => {
  proxy.$Bus.emit("optionChange", {
    series: getData('series'),
  });
}, 500), {
  deep: true
})
watch(() => lineStyleConfig, debounce(() => {
  proxy.$Bus.emit("optionChange", {
    series: getData('lineStyle'),
  });
}, 500), {
  deep: true
})
watch(() => labelConfig, debounce(() => {
  proxy.$Bus.emit("optionChange", {
    series: getData('label'),
  });
}, 500), {
  deep: true
})
</script>