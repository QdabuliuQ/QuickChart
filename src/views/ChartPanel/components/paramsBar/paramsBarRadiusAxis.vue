<template>
  <div class="paramsBarRadiusAxis">
    <option-items :config="config" />
    <div class="splitLine">
      坐标轴轴线样式
    </div>
    <option-items :config="axisLineConfig" />
    <div class="splitLine">
      坐标轴标签样式
    </div>
    <option-items :config="axisLabelConfig" />
  </div>
</template>

<script setup lang='ts'>
import { reactive, watch } from 'vue';
import optionItems from '@/components/optionItems.vue';
import useCommonStore from "@/store/common";
import useProxy from '@/hooks/useProxy';
import { ConfigInt } from '@/types/common';
import { debounce, getConfigValue } from '@/utils';
import {common, label} from "@/chartConfig/opname";
import {borderType, fontFamily, fontStyle, fontWeight} from "@/chartConfig/constant";

const proxy = useProxy()
const _common: any = useCommonStore()

const config = reactive<ConfigInt>({
  max: {
    type: 'input_number',
    title: '刻度最大值',
    value: _common.option.radiusAxis.max
  },
  splitNumber: {
    type: 'input_number',
    title: '分割段数',
    value: _common.option.radiusAxis.splitNumber
  }
})
const axisLineConfig = reactive<ConfigInt>({
  show: {
    type: 'switch',
    title: common.show,
    value: _common.option.radiusAxis.axisLine.show
  },
  color: {
    type: 'color_picker',
    title: common.color,
    prefixs: ['lineStyle'],
    value: _common.option.radiusAxis.axisLine.lineStyle.color
  },
  width: {
    type: 'input_number',
    title: common.width,
    max: 100,
    prefixs: ['lineStyle'],
    value: _common.option.radiusAxis.axisLine.lineStyle.width
  },
  type: {
    type: 'select',
    title: common.type,
    options: borderType,
    prefixs: ['lineStyle'],
    value: _common.option.radiusAxis.axisLine.lineStyle.type
  },
  opacity: {
    type: 'input_number',
    title: common.opacity,
    max: 1,
    step: .1,
    prefixs: ['lineStyle'],
    value: _common.option.radiusAxis.axisLine.lineStyle.opacity
  },
})
const axisLabelConfig = reactive<ConfigInt>({
  show: {
    type: 'switch',
    title: common.show,
    value: _common.option.radiusAxis.axisLabel.show
  },
  rotate: {
    type: 'input_number',
    title: common.rotate,
    max: 360,
    min: -360,
    value: _common.option.radiusAxis.axisLabel.rotate
  },
  margin: {
    type: 'input_number',
    title: common.margin,
    max: 500,
    value: _common.option.radiusAxis.axisLabel.margin
  },
  color: {
    type: 'color_picker',
    title: common.color,
    value: _common.option.radiusAxis.axisLabel.color
  },
  fontStyle: {
    type: 'select',
    title: label.fontStyle,
    options: fontStyle,
    value: _common.option.radiusAxis.axisLabel.fontStyle
  },
  fontWeight: {
    type: 'select',
    title: label.fontWeight,
    options: fontWeight,
    value: _common.option.radiusAxis.axisLabel.fontWeight
  },
  fontFamily: {
    type: 'select',
    title: label.fontFamily,
    options: fontFamily,
    value: _common.option.radiusAxis.axisLabel.fontFamily
  },
  fontSize: {
    type: 'input_number',
    title: label.fontSize,
    max: 100,
    value: _common.option.radiusAxis.axisLabel.fontSize
  },
})

const getData = (type?: string) => {
  const radiusAxis = _common.option.radiusAxis
  if(type == 'config') {
    const option = getConfigValue(config)
    for(let key in option) {
      radiusAxis[key] = option[key]
    }
    return radiusAxis
  } else {
    radiusAxis.axisLine = getConfigValue(axisLineConfig)
    radiusAxis.axisLabel = getConfigValue(axisLabelConfig)
    console.log(radiusAxis)
    return radiusAxis
  }
}

watch(() => config, debounce(() => {
  proxy.$Bus.emit("optionChange", {
    radiusAxis: getData('config'),
  });
}, 500), {
  deep: true
})

watch([() => axisLineConfig, () => axisLabelConfig], debounce(() => {
  proxy.$Bus.emit("optionChange", {
    radiusAxis: getData(),
  });
}, 500), {
  deep: true
})
</script>