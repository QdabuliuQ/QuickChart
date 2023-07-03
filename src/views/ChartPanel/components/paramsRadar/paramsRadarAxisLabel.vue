<template>
  <div class="paramsRadarAxisLabel uniqueOptionContainer">
    <optionItems :config="config" />
  </div>
</template>

<script setup lang='ts'>
import { reactive, watch } from 'vue';
import optionItems from '@/components/optionItems.vue'
import useProxy from '@/hooks/useProxy';
import useCommonStore from "@/store/common";
import { ConfigInt } from '@/types/common';
import { label, common } from '@/chartConfig/opname';
import { debounce, getConfigValue } from '@/utils';
import {borderType, fontFamily, fontStyle, fontWeight} from "@/chartConfig/constant";
const proxy = useProxy()
const _common: any = useCommonStore()
const config = reactive<ConfigInt>({
  show: {
    type: 'switch',
    title: common.show,
    value: _common.option.radar.axisLabel.show
  },
  rotate: {
    type: 'input_number',
    title: label.rotate,
    max: 360,
    min: -360,
    value: _common.option.radar.axisLabel.rotate
  },
  margin: {
    type: 'input_number',
    title: label.margin,
    max: 100,
    value: _common.option.radar.axisLabel.margin
  },
  color: {
    type: 'color_picker',
    title: label.color,
    value: _common.option.radar.axisLabel.color
  },
  fontStyle: {
    type: 'select',
    title: label.fontStyle,
    options: fontStyle,
    value: _common.option.radar.axisLabel.fontStyle
  },
  fontWeight: {
    type: 'select',
    title: label.fontWeight,
    options: fontWeight,
    value: _common.option.radar.axisLabel.fontWeight
  },
  fontFamily: {
    type: 'select',
    title: label.fontFamily,
    options: fontFamily,
    value: _common.option.radar.axisLabel.fontFamily
  },
  fontSize: {
    type: 'input_number',
    title: label.fontSize,
    max: 100,
    value: _common.option.radar.axisLabel.fontSize
  },
  borderColor: {
    type: 'color_picker',
    title: label.borderColor,
    value: _common.option.radar.axisLabel.borderColor
  },
  borderWidth: {
    type: 'input_number',
    title: label.borderWidth,
    max: 100,
    value: _common.option.radar.axisLabel.borderWidth
  },
  borderType: {
    type: 'select',
    title: label.borderType,
    options: borderType,
    value: _common.option.radar.axisLabel.borderType
  },
  shadowColor: {
    type: 'color_picker',
    title: label.shadowColor,
    value: _common.option.radar.axisLabel.shadowColor
  },
  shadowBlur: {
    type: 'input_number',
    title: label.shadowBlur,
    max: 100,
    value: _common.option.radar.axisLabel.shadowBlur
  },
  shadowOffsetX: {
    type: 'input_number',
    title: label.shadowOffsetX,
    max: 500,
    min: -500,
    value: _common.option.radar.axisLabel.shadowOffsetX
  },
  shadowOffsetY: {
    type: 'input_number',
    title: label.shadowOffsetY,
    max: 500,
    min: -500,
    value: _common.option.radar.axisLabel.shadowOffsetY
  },
})

const getData = () => {
  let radar = _common.option.radar
  radar.axisLabel = getConfigValue(config)
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