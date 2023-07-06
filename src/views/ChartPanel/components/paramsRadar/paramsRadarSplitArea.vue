<template>
  <div class="paramsRadarSplitArea">
    <optionItems :config="config" />
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import optionItems from '@/components/optionItems.vue'
import useProxy from '@/hooks/useProxy';
import useCommonStore from "@/store/common";
import { ConfigInt } from '@/types/common';
import { common, label } from '@/chartConfig/opname';
import { debounce, getConfigValue } from '@/utils';

const proxy = useProxy()
const _common: any = useCommonStore()
const config = reactive<ConfigInt>({
  show: {
    type: 'switch',
    title: common.show,
    value: _common.option.radar.splitArea.show
  },
  color: {
    type: 'color_picker',
    title: common.color,
    value: _common.option.radar.splitArea.areaStyle.color[0]
  },
  color0: {
    type: 'color_picker',
    title: common.color,
    value: _common.option.radar.splitArea.areaStyle.color[1]
  },
  shadowBlur: {
    type: 'input_number',
    title: common.shadowBlur,
    max: 100,
    value: _common.option.radar.splitArea.areaStyle.shadowBlur
  },
  shadowColor: {
    type: 'color_picker',
    title: common.shadowColor,
    value: _common.option.radar.splitArea.areaStyle.shadowColor
  },
  shadowOffsetX: {
    type: 'input_number',
    title: common.shadowOffsetX,
    max: 500,
    min: -500,
    value: _common.option.radar.splitArea.areaStyle.shadowOffsetX
  },
  shadowOffsetY: {
    type: 'input_number',
    title: common.shadowOffsetY,
    max: 500,
    min: -500,
    value: _common.option.radar.splitArea.areaStyle.shadowOffsetY
  },
  opacity: {
    type: 'input_number',
    title: common.opacity,
    max: 1,
    step: .1,
    value: _common.option.radar.splitArea.areaStyle.opacity
  }
})

const getData = () => {
  let radar = _common.option.radar
  const option = getConfigValue(config)
  radar.splitArea.show = option.show
  delete option.show
  radar.splitArea.areaStyle = option
  radar.splitArea.areaStyle.color = [option.color, option.color0]
  delete radar.splitArea.areaStyle.color0
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

<style lang="less">

</style>