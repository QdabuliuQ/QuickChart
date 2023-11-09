<template>
  <div class="paramsItem">
    <option-items :config="config" />
  </div>
</template>
<script setup lang="ts">
import OptionItems from "@/components/optionItems.vue";
import {reactive} from "vue";
import {ConfigInt} from "@/types/common";
import {common} from "@/chartConfig/opname";
import useStore from "@/store";
import {borderType} from "@/chartConfig/constant";
import useWatchData from "@/hooks/useWatchData";
import {getConfigValue} from "@/utils";

const _common: any = useStore()
const itemStyle = _common.option.series[0].itemStyle
const config = reactive<ConfigInt>({
  areaColor: {
    type: 'color_picker',
    title: common.color,
    value: itemStyle.areaColor
  },
  borderColor: {
    type: 'color_picker',
    title: common.borderColor,
    value: itemStyle.borderColor
  },
  borderWidth: {
    type: 'input_number',
    title: common.borderWidth,
    value: itemStyle.borderWidth
  },
  borderType: {
    type: 'select',
    title: common.borderType,
    value: itemStyle.borderType,
    options: borderType,
  },
  shadowBlur: {
    type: 'input_number',
    title: common.shadowBlur,
    value: itemStyle.shadowBlur,
    max: 50,
  },
  shadowColor: {
    type: 'color_picker',
    title: common.shadowColor,
    value: itemStyle.shadowColor,
  },
  shadowOffsetX: {
    type: 'input_number',
    title: common.shadowOffsetX,
    value: itemStyle.shadowOffsetX,
    max: 500,
    min: -500
  },
  shadowOffsetY: {
    type: 'input_number',
    title: common.shadowOffsetY,
    value: itemStyle.shadowOffsetY,
    max: 500,
    min: -500
  },
})

const getData = () => {
  const series = _common.option.series
  series[0].itemStyle = getConfigValue(config)
  return series
}
useWatchData(config, 'series', getData)
</script>