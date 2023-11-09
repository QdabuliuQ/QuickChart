<template>
  <div class="paramsRadarStyle">
    <optionItems :config="config" />
  </div>
</template>

<script setup lang='ts'>
import { reactive, watch } from 'vue';
import optionItems from '@/components/optionItems.vue'
import useProxy from '@/hooks/useProxy';
import useStore from "@/store";
import { ConfigInt } from '@/types/common';
import { radar } from '@/chartConfig/opname';
import { debounce } from '@/utils';
import { shape } from "@/chartConfig/constant";
const proxy = useProxy()
const common: any = useStore()
const config = reactive<ConfigInt>({
  shape: {
    type: 'select',
    title: radar.shape,
    options: shape,
    value: common.option.radar.shape
  },
  nameGap: {
    type: 'input_number',
    title: radar.nameGap,
    value: common.option.radar.nameGap,
    max: 500,
  },
  splitNumber: {
    type: 'input_number',
    title: radar.splitNumber,
    value: common.option.radar.splitNumber,
    max: 100,
  },
  centerX: {
    type: 'input_number',
    title: radar.centerX,
    value: parseFloat(common.option.radar.center[0]),
    max: 100,
  },
  centerY: {
    type: 'input_number',
    title: radar.centerY,
    value: parseFloat(common.option.radar.center[1]),
    max: 100,
  },
  radius: {
    type: 'input_number',
    title: radar.radius,
    value: parseFloat(common.option.radar.radius),
    max: 100,
  },
  startAngle: {
    type: 'input_number',
    title: radar.startAngle,
    value: common.option.radar.startAngle,
    max: 360,
    min: -360
  },
})

const getData = () => {
  let radar = common.option.radar
  for(let key in config) {
    if(key == 'centerX') {
      radar.center[0] = config[key].value + '%'
    } else if(key == 'centerY') {
      radar.center[1] = config[key].value + '%'
    } else if(key == 'radius') {
      radar.radius = config[key].value + '%'
    } else {
      radar[key] = config[key].value
    }
  }
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