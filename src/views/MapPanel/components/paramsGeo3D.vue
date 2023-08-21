<template>
  <div class="paramsGeo3D">
    <option-items :config="config" />
  </div>
</template>
<script setup lang="ts">
import {reactive} from "vue";
import {ConfigInt} from "@/types/common";
import useCommonStore from "@/store/common";
import OptionItems from "@/components/optionItems.vue";
import useWatchData from "@/hooks/useWatchData";
import {getConfigValue} from "@/utils";
import {fontFamily} from "@/chartConfig/constant";

const _common: any = useCommonStore()
const series = _common.option.series[0]
const config = reactive<ConfigInt>({
  regionHeight: {
    type: "input_number",
    title: "地图厚度",
    max: 100,
    value: series.regionHeight
  },
  show: {
    type: "switch",
    pre: "文本",
    value: series.label.show,
    prefixs: ["label"]
  },
  color: {
    type: "color_picker",
    pre: "文本",
    value: series.label.textStyle.color,
    prefixs: ["label", "textStyle"]
  },
  fontSize: {
    type: "input_number",
    max: 500,
    value: series.label.textStyle.fontSize,
    prefixs: ["label", "textStyle"]
  },
  fontFamily: {
    type: "select",
    options: fontFamily,
    value: series.label.textStyle.fontFamily,
    prefixs: ["label", "textStyle"]
  },
  backgroundColor: {
    type: "color_picker",
    value: series.label.textStyle.backgroundColor,
    prefixs: ["label", "textStyle"]
  },
  opacity: {
    type: "input_number",
    max: 1,
    value: series.itemStyle.opacity,
    prefixs: ["itemStyle"]
  },
  borderWidth: {
    type: "input_number",
    max: 100,
    value: series.itemStyle.borderWidth,
    prefixs: ["itemStyle"]
  },
  borderColor: {
    type: "color_picker",
    value: series.itemStyle.borderColor,
    prefixs: ["itemStyle"]
  },
})

const getData = () => {
  const series = _common.option.series
  Object.assign(series[0], getConfigValue(config))
  return series
}
useWatchData(config, "series", getData)
</script>