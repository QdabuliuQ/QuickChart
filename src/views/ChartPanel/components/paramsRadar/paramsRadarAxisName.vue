<template>
  <div class="paramsRadarAxisName uniqueOptionContainer">
    <optionItems :config="config" />
  </div>
</template>

<script setup lang='ts'>
import { reactive, watch } from 'vue';
import optionItems from '@/components/optionItems.vue'
import useProxy from '@/hooks/useProxy';
import useCommonStore from "@/store/common";
import { ConfigInt } from '@/types/common';
import { label } from '@/chartConfig/opname';
import { debounce, getConfigValue } from '@/utils';
import { borderType, fontFamily, fontStyle, fontWeight } from '@/chartConfig/constant';
const proxy = useProxy()
const common: any = useCommonStore()
const config = reactive<ConfigInt>({
  show: {
    type: 'switch',
    title: label.show,
    value: common.option.radar.axisName.show
  },
  color: {
    type: 'color_picker',
    title: label.color,
    value: common.option.radar.axisName.color
  },
  fontStyle: {
    type: 'select',
    title: label.fontStyle,
    options: fontStyle,
    value: common.option.radar.axisName.fontStyle
  },
  fontWeight: {
    type: 'select',
    title: label.fontWeight,
    options: fontWeight,
    value: common.option.radar.axisName.fontWeight
  },
  fontFamily: {
    type: 'select',
    title: label.fontFamily,
    options: fontFamily,
    value: common.option.radar.axisName.fontFamily
  },
  fontSize: {
    type: 'input_number',
    title: label.fontSize,
    max: 100,
    value: common.option.radar.axisName.fontSize
  },
  backgroundColor: {
    type: 'color_picker',
    title: label.backgroundColor,
    value: common.option.radar.axisName.backgroundColor
  },
  textBorderColor: {
    type: 'color_picker',
    title: label.textBorderColor,
    value: common.option.radar.axisName.textBorderColor
  },
  textBorderWidth: {
    type: 'input_number',
    title: label.textBorderWidth,
    max: 100,
    value: common.option.radar.axisName.textBorderWidth
  },
  textBorderType: {
    type: 'select',
    title: label.textBorderColor,
    options: borderType,
    value: common.option.radar.axisName.textBorderType
  },
  textShadowColor: {
    type: 'color_picker',
    title: label.textShadowColor,
    value: common.option.radar.axisName.textShadowColor
  },
  textShadowBlur: {
    type: 'input_number',
    title: label.textShadowBlur,
    max: 50,
    value: common.option.radar.axisName.textShadowBlur
  },
  textShadowOffsetX: {
    type: 'input_number',
    title: label.textShadowOffsetX,
    max: 500,
    min: -500,
    value: common.option.radar.axisName.textShadowOffsetX
  },
  textShadowOffsetY: {
    type: 'input_number',
    title: label.textShadowOffsetY,
    max: 500,
    min: -500,
    value: common.option.radar.axisName.textShadowOffsetY
  },
})

const getData = () => {
  let radar = common.option.radar
  radar.axisName = getConfigValue(config)
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

<style lang='less'>
</style>