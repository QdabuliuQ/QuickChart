<template>
  <div class="paramsLabel">
    <option-items :config="config" />
  </div>
</template>
<script setup lang="ts">
import OptionItems from "@/components/optionItems.vue";
import {reactive} from "vue";
import {ConfigInt} from "@/types/common";
import {common} from "@/chartConfig/opname";
import {borderType, fontFamily, fontStyle, fontWeight, position} from "@/chartConfig/constant";

import useCommonStore from "@/store/common";
import useWatchData from "@/hooks/useWatchData";
import {getConfigValue} from "@/utils";

const _common: any = useCommonStore()
const label = _common.option.series[0].label
const config = reactive<ConfigInt>({
  show: {
    type: "switch",
    title: common.show,
    value: label.show
  },
  rotate: {
    type: "input_number",
    title: common.rotate,
    max: 360,
    min: -360,
    value: label.rotate
  },
  offsetX: {
    type: 'input_number',
    title: label.offsetX,
    max: 360,
    min: -360,
    value: label.offset[0]
  },
  offsetY: {
    type: 'input_number',
    title: label.offsetY,
    max: 360,
    min: -360,
    value: label.offset[1]
  },
  color: {
    type: "color_picker",
    title: common.color,
    value: label.color
  },
  fontStyle: {
    type: "select",
    title: common.fontStyle,
    value: label.fontStyle,
    options: fontStyle,
  },
  fontWeight: {
    type: "select",
    title: common.fontWeight,
    value: label.fontWeight,
    options: fontWeight,
  },
  fontFamily: {
    type: "select",
    title: common.fontFamily,
    value: label.fontFamily,
    options: fontFamily,
  },
  fontSize: {
    type: "input_number",
    title: common.fontSize,
    value: label.fontSize,
  },
  borderColor: {
    type: "color_picker",
    title: common.borderColor,
    value: label.borderColor,
  },
  borderWidth: {
    type: "input_number",
    title: common.borderWidth,
    value: label.borderWidth,
  },
  borderType: {
    type: "select",
    title: common.borderType,
    value: label.borderType,
    options: borderType
  },
})

const getData = () => {
  const series = _common.option.series
  const option = getConfigValue(config)
  option.offset = [option.offsetX, option.offsetY]
  delete option.offsetX
  delete option.offsetY
  series[0].label = option
  return series
}
useWatchData(config, 'series', getData)
</script>
<style lang="less">

</style>