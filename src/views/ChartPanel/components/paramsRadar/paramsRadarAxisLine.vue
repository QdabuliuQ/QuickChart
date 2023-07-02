<template>
  <div class="paramsRadarAxisLine uniqueOptionContainer">
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
import { borderType } from '@/chartConfig/constant';
const proxy = useProxy()
const _common: any = useCommonStore()

const config = reactive<ConfigInt>({
  show: {
    type: 'switch',
    title: common.show,
    value: _common.option.radar.axisLine.show
  },
  color: {
    type: 'color_picker',
    title: common.color,
    value: _common.option.radar.axisLine.lineStyle.color
  },
  width: {
    type: 'input_number',
    title: common.width,
    max: 100,
    value: _common.option.radar.axisLine.lineStyle.width
  },
  type: {
    type: 'select',
    title: '线段' + common.type,
    options: borderType,
    value: _common.option.radar.axisLine.lineStyle.type
  },
  shadowBlur: {
    type: 'input_number',
    title: common.shadowBlur,
    max: 100,
    value: _common.option.radar.axisLine.lineStyle.shadowBlur
  },
  shadowColor: {
    type: 'color_picker',
    title: label.shadowColor,
    value: _common.option.radar.axisLine.lineStyle.shadowColor
  },
  shadowOffsetX: {
    type: 'input_number',
    title: label.shadowOffsetX,
    max: 500,
    min: -500,
    value: _common.option.radar.axisLine.lineStyle.shadowOffsetX
  },
  shadowOffsetY: {
    type: 'input_number',
    title: label.shadowOffsetY,
    max: 500,
    min: -500,
    value: _common.option.radar.axisLine.lineStyle.shadowOffsetY
  },
  opacity: {
    type: 'input_number',
    title: common.opacity,
    max: 1,
    step: .1,
    value: _common.option.radar.axisLine.lineStyle.opacity
  },
})

const getData = () => {
  let radar = _common.option.radar
  const option = getConfigValue(config)
  radar.axisLine.show = option.show
  delete option.show
  radar.axisLine.lineStyle = option
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