<template>
  <div class="paramsKLineStyle uniqueOptionContainer">
    <optionItems :config="config" />
  </div>
</template>

<script setup lang='ts'>
import { reactive, watch } from 'vue';
import optionItems from '@/components/optionItems.vue'
import useProxy from '@/hooks/useProxy';
import useCommonStore from "@/store/common";
import { ConfigInt } from '@/types/common';
import { candlestick_itemStyle } from '@/chartConfig/opname';
import { debounce, getConfigValue } from '@/utils';

const proxy = useProxy()
const common: any = useCommonStore()
const config = reactive<ConfigInt>({
  borderColor: {
    type: 'color_picker',
    title: candlestick_itemStyle.borderColor,
    value: !common.option.series.length ? '' : common.option.series[0].itemStyle.borderColor
  },
  borderColor0: {
    type: 'color_picker',
    title: candlestick_itemStyle.borderColor0,
    value: !common.option.series.length ? '' : common.option.series[0].itemStyle.borderColor0
  },
  borderWidth: {
    type: 'input_number',
    title: candlestick_itemStyle.borderWidth,
    max: 50,
    value: !common.option.series.length ? '' : common.option.series[0].itemStyle.borderWidth
  },
  shadowBlur: {
    type: 'input_number',
    max: 50,
    title: candlestick_itemStyle.shadowBlur,
    value: !common.option.series.length ? '' : common.option.series[0].itemStyle.shadowBlur
  },
  shadowColor: {
    type: 'color_picker',
    title: candlestick_itemStyle.shadowColor,
    value: !common.option.series.length ? '' : common.option.series[0].itemStyle.shadowColor
  },
  shadowOffsetX: {
    type: 'input_number',
    min: -500,
    max: 500,
    title: candlestick_itemStyle.shadowOffsetX,
    value: !common.option.series.length ? '' : common.option.series[0].itemStyle.shadowOffsetX
  },
  shadowOffsetY: {
    type: 'input_number',
    min: -500,
    max: 500,
    title: candlestick_itemStyle.shadowOffsetY,
    value: !common.option.series.length ? '' : common.option.series[0].itemStyle.shadowOffsetY
  },
  opacity: {
    type: 'input_number',
    max: 1,
    step: .1,
    title: candlestick_itemStyle.opacity,
    value: !common.option.series.length ? '' : common.option.series[0].itemStyle.opacity
  },
})

const getData = () => {
  let s = common.option.series
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

<style lang='less'>
</style>