<template>
  <div class="params-point-text">
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
import {common, label} from '@/chartConfig/opname';
import useStore from "@/store";
import optionItems from '@/components/optionItems.vue'
import {debounce, getConfigValue} from "@/utils";
import {align, fontFamily, fontStyle, fontWeight} from "@/chartConfig/constant";
const proxy = useProxy()
const {chart}: any = useStore()
console.log(chart.getOption.series[0].label)
const config = reactive<ConfigInt>({
  show: {
    type: 'switch',
    title: common.show,
    value: chart.getOption.series[0].label.show
  },
  fontStyle: {
    type: 'select',
    title: label.fontStyle,
    options: fontStyle,
    value: chart.getOption.series[0].label.fontStyle
  },
  fontWeight: {
    type: 'select',
    title: label.fontWeight,
    options: fontWeight,
    value: chart.getOption.series[0].label.fontWeight
  },
  fontFamily: {
    type: 'select',
    title: label.fontFamily,
    options: fontFamily,
    value: chart.getOption.series[0].label.fontFamily
  },
  fontSize: {
    type: 'input_number',
    title: label.fontSize,
    max: 100,
    value: chart.getOption.series[0].label.fontSize
  },
  color: {
    type: 'color_picker',
    title: label.color,
    value: chart.getOption.series[0].label.color
  }
})
if (chart.getOption.series[0].label.offset) {
  config['offsetX'] = {
    type: 'input_number',
    title: label.offsetX,
    max: 500,
    min: -500,
    value: chart.getOption.series[0].label.offset[0]
  }
  config['offsetY'] = {
    type: 'input_number',
    title: label.offsetY,
    max: 500,
    min: -500,
    value: chart.getOption.series[0].label.offset[1]
  }
}
if (chart.getOption.series[0].label.align) {
  config['align'] = {
    type: 'select',
    title: label.align,
    options: align,
    value: chart.getOption.series[0].label.align
  }
}

const getData = () => {
  let series = chart.getOption.series
  const option = getConfigValue(config)
  if (option.offsetX) {
    option.offset = [option.offsetX, option.offsetY]
    delete option.offsetX
    delete option.offsetY
  }
  for(let item of series) {
    item.label = Object.assign(item.label, option)
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