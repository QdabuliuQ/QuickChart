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
import useStore from "@/store";
import useProxy from '@/hooks/useProxy';
import { ConfigInt } from '@/types/common';
import { debounce, getConfigValue } from '@/utils';
import {common, label} from "@/chartConfig/opname";
import {borderType, fontFamily, fontStyle, fontWeight} from "@/chartConfig/constant";

const proxy = useProxy()
const {chart}: any = useStore()

const config = reactive<ConfigInt>({
  max: {
    type: 'input_number',
    title: '刻度最大值',
    value: chart.getOption.radiusAxis.max
  },
  splitNumber: {
    type: 'input_number',
    title: '分割段数',
    value: chart.getOption.radiusAxis.splitNumber
  }
})
const axisLineConfig = reactive<ConfigInt>({
  show: {
    type: 'switch',
    title: common.show,
    value: chart.getOption.radiusAxis.axisLine.show
  },
  color: {
    type: 'color_picker',
    title: common.color,
    prefixs: ['lineStyle'],
    value: chart.getOption.radiusAxis.axisLine.lineStyle.color
  },
  width: {
    type: 'input_number',
    title: common.width,
    max: 100,
    prefixs: ['lineStyle'],
    value: chart.getOption.radiusAxis.axisLine.lineStyle.width
  },
  type: {
    type: 'select',
    title: common.type,
    options: borderType,
    prefixs: ['lineStyle'],
    value: chart.getOption.radiusAxis.axisLine.lineStyle.type
  },
  opacity: {
    type: 'input_number',
    title: common.opacity,
    max: 1,
    step: .1,
    prefixs: ['lineStyle'],
    value: chart.getOption.radiusAxis.axisLine.lineStyle.opacity
  },
})
const axisLabelConfig = reactive<ConfigInt>({
  show: {
    type: 'switch',
    title: common.show,
    value: chart.getOption.radiusAxis.axisLabel.show
  },
  rotate: {
    type: 'input_number',
    title: common.rotate,
    max: 360,
    min: -360,
    value: chart.getOption.radiusAxis.axisLabel.rotate
  },
  margin: {
    type: 'input_number',
    title: common.margin,
    max: 500,
    value: chart.getOption.radiusAxis.axisLabel.margin
  },
  color: {
    type: 'color_picker',
    title: common.color,
    value: chart.getOption.radiusAxis.axisLabel.color
  },
  fontStyle: {
    type: 'select',
    title: label.fontStyle,
    options: fontStyle,
    value: chart.getOption.radiusAxis.axisLabel.fontStyle
  },
  fontWeight: {
    type: 'select',
    title: label.fontWeight,
    options: fontWeight,
    value: chart.getOption.radiusAxis.axisLabel.fontWeight
  },
  fontFamily: {
    type: 'select',
    title: label.fontFamily,
    options: fontFamily,
    value: chart.getOption.radiusAxis.axisLabel.fontFamily
  },
  fontSize: {
    type: 'input_number',
    title: label.fontSize,
    max: 100,
    value: chart.getOption.radiusAxis.axisLabel.fontSize
  },
})

const getData = (type?: string) => {
  const radiusAxis = chart.getOption.radiusAxis
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