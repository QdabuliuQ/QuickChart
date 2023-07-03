<template>
  <div class="paramsLineText uniqueOptionContainer">
    <optionItems :config="config" />
  </div>
</template>

<script setup lang='ts'>
import { reactive, watch } from 'vue';
import optionItems from '@/components/optionItems.vue';
import useCommonStore from "@/store/common";
import useProxy from '@/hooks/useProxy';
import { ConfigInt } from '@/types/common';
import { debounce, getConfigValue } from '@/utils';
import { borderType, fontFamily, fontStyle, fontWeight, position } from '@/chartConfig/constant';
import { label } from "@/chartConfig/opname";

const proxy = useProxy()
const common: any = useCommonStore()
const config = reactive<ConfigInt>({
  show: {
    type: 'switch',
    title: label.show,
    value: common.option.series[0].label.show
  },
  position: {
    type: 'select',
    title: label.position,
    options: position,
    value: common.option.series[0].label.position
  },
  rotate: {
    type: 'input_number',
    title: label.rotate,
    max: 360,
    min: -360,
    value: common.option.series[0].label.rotate
  },
  color: {
    type: 'color_picker',
    title: label.color,
    value: common.option.series[0].label.color
  },
  fontStyle: {
    type: 'select',
    title: label.fontStyle,
    options: fontStyle,
    value: common.option.series[0].label.fontStyle
  },
  fontWeight: {
    type: 'select',
    title: label.fontWeight,
    options: fontWeight,
    value: common.option.series[0].label.fontWeight
  },
  fontFamily: {
    type: 'select',
    title: label.fontFamily,
    options: fontFamily,
    value: common.option.series[0].label.fontFamily
  },
  fontSize: {
    type: 'input_number',
    title: label.fontSize,
    max: 100,
    value: common.option.series[0].label.fontSize
  },
  offsetX: {
    type: 'input_number',
    title: label.offsetX,
    max: 500,
    min: -500,
    value: common.option.series[0].label.offset[0]
  },
  offsetY: {
    type: 'input_number',
    title: label.offsetY,
    max: 500,
    min: -500,
    value: common.option.series[0].label.offset[1]
  },
  backgroundColor: {
    type: 'color_picker',
    title: label.backgroundColor,
    value: common.option.series[0].label.backgroundColor
  },
  borderWidth: {
    type: 'input_number',
    title: label.borderWidth,
    value: common.option.series[0].label.borderWidth
  },
  borderColor: {
    type: 'color_picker',
    title: label.borderColor,
    value: common.option.series[0].label.borderColor
  },
  borderType: {
    type: 'select',
    title: label.borderType,
    options: borderType,
    value: common.option.series[0].label.borderType
  },
  shadowColor: {
    type: 'color_picker',
    title: label.shadowColor,
    value: common.option.series[0].label.shadowColor
  },
  shadowBlur: {
    type: 'input_number',
    title: label.shadowBlur,
    max: 50,
    value: common.option.series[0].label.shadowBlur
  },
  shadowOffsetX: {
    type: 'input_number',
    title: label.shadowOffsetX,
    max: 500,
    min: -500,
    value: common.option.series[0].label.shadowOffsetX
  },
  shadowOffsetY: {
    type: 'input_number',
    title: label.shadowOffsetY,
    max: 500,
    min: -500,
    value: common.option.series[0].label.shadowOffsetY
  },
  textBorderColor: {
    type: 'color_picker',
    title: label.textBorderColor,
    value: common.option.series[0].label.textBorderColor
  },
  textBorderWidth: {
    type: 'input_number',
    title: label.textBorderWidth,
    max: 50,
    value: common.option.series[0].label.textBorderWidth
  },
  textBorderType: {
    type: 'select',
    title: label.textBorderType,
    options: borderType,
    value: common.option.series[0].label.textBorderType
  },
  textShadowColor: {
    type: 'color_picker',
    title: label.textShadowColor,
    value: common.option.series[0].label.textShadowColor
  },
  textShadowBlur: {
    type: 'input_number',
    title: label.textShadowBlur,
    max: 50,
    value: common.option.series[0].label.textShadowBlur
  },
  textShadowOffsetX: {
    type: 'input_number',
    max: 500,
    min: -500,
    title: label.textShadowOffsetX,
    value: common.option.series[0].label.textShadowOffsetX
  },
  textShadowOffsetY: {
    type: 'input_number',
    max: 500,
    min: -500,
    title: label.textShadowOffsetY,
    value: common.option.series[0].label.textShadowOffsetY
  },
})

const getData = () => {
  let s = common.option.series
  let option = getConfigValue(config)
  option['offset'] = [config.offsetX.value, config.offsetY.value]
  for(let i = 0; i < s.length; i ++) {
    s[i].label = option
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