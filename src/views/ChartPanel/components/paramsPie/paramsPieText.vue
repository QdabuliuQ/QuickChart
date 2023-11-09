<template>
  <div class="paramsPieText">
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
import {fontFamily, fontStyle, fontWeight, position} from "@/chartConfig/constant";
const proxy = useProxy()
const _common: any = useStore()

const config = reactive<ConfigInt>({
  show: {
    type: 'switch',
    title: common.show,
    value: _common.option.series[0].label.show
  },
  color: {
    type: 'color_picker',
    title: label.color,
    value: _common.option.series[0].label.color
  },
  fontStyle: {
    type: 'select',
    title: label.fontStyle,
    options: fontStyle,
    value: _common.option.series[0].label.fontStyle
  },
  fontWeight: {
    type: 'select',
    title: label.fontWeight,
    options: fontWeight,
    value: _common.option.series[0].label.fontWeight
  },
  fontFamily: {
    type: 'select',
    title: label.fontFamily,
    options: fontFamily,
    value: _common.option.series[0].label.fontFamily
  },
  fontSize: {
    type: 'input_number',
    title: label.fontSize,
    max: 100,
    value: _common.option.series[0].label.fontSize
  },
  position: {
    type: 'select',
    title: label.position,
    options: [
      {
        label: '外侧',
        value: 'outside'
      },
      {
        label: '内侧',
        value: 'inside'
      },
      {
        label: '中间',
        value: 'center'
      },
    ],
    value: _common.option.series[0].label.position
  }
})

const getData = () => {
  let series = _common.option.series
  const option = getConfigValue(config)
  for(let item of series) {
    item.label = option
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