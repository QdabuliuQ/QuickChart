<template>
  <div class="paramsKLineStyle">
    <optionItems :config="config" />
  </div>
</template>

<script setup lang='ts'>
import { reactive, watch } from 'vue';
import optionItems from '@/components/optionItems.vue'
import useProxy from '@/hooks/useProxy';
import useStore from "@/store";
import { ConfigInt } from '@/types/common';
import { candlestick_itemStyle } from '@/chartConfig/opname';
import { debounce, getConfigValue } from '@/utils';

const proxy = useProxy()
const {chart}: any = useStore()
const config = reactive<ConfigInt>({
  color: {
    type: 'color_picker',
    title: candlestick_itemStyle.color,
    value: !chart.getOption.series.length ? '' : chart.getOption.series[0].itemStyle.color
  },
  color0: {
    type: 'color_picker',
    title: candlestick_itemStyle.color0,
    value: !chart.getOption.series.length ? '' : chart.getOption.series[0].itemStyle.color0
  },
  borderColor: {
    type: 'color_picker',
    title: candlestick_itemStyle.borderColor,
    value: !chart.getOption.series.length ? '' : chart.getOption.series[0].itemStyle.borderColor
  },
  borderColor0: {
    type: 'color_picker',
    title: candlestick_itemStyle.borderColor0,
    value: !chart.getOption.series.length ? '' : chart.getOption.series[0].itemStyle.borderColor0
  },
  borderWidth: {
    type: 'input_number',
    title: candlestick_itemStyle.borderWidth,
    max: 50,
    value: !chart.getOption.series.length ? '' : chart.getOption.series[0].itemStyle.borderWidth
  },
  shadowBlur: {
    type: 'input_number',
    max: 50,
    title: candlestick_itemStyle.shadowBlur,
    value: !chart.getOption.series.length ? '' : chart.getOption.series[0].itemStyle.shadowBlur
  },
  shadowColor: {
    type: 'color_picker',
    title: candlestick_itemStyle.shadowColor,
    value: !chart.getOption.series.length ? '' : chart.getOption.series[0].itemStyle.shadowColor
  },
  shadowOffsetX: {
    type: 'input_number',
    min: -500,
    max: 500,
    title: candlestick_itemStyle.shadowOffsetX,
    value: !chart.getOption.series.length ? '' : chart.getOption.series[0].itemStyle.shadowOffsetX
  },
  shadowOffsetY: {
    type: 'input_number',
    min: -500,
    max: 500,
    title: candlestick_itemStyle.shadowOffsetY,
    value: !chart.getOption.series.length ? '' : chart.getOption.series[0].itemStyle.shadowOffsetY
  },
  opacity: {
    type: 'input_number',
    max: 1,
    step: .1,
    title: candlestick_itemStyle.opacity,
    value: !chart.getOption.series.length ? '' : chart.getOption.series[0].itemStyle.opacity
  },
})

const getData = () => {
  let s = chart.getOption.series
  let option = getConfigValue(config)
  for(let i = 0; i < s.length; i ++) {
    s[i].itemStyle = option
  }
  return s
}

watch(() => config, debounce(() => {
  proxy.$Bus.emit("optionChange", {
    series: getData(),
  });
}, 500), {
  deep: true
})

</script>