<template>
  <div class="paramsXAxis">
    <option-items :config="config" />
    <div class="splitLine">
      坐标轴名称样式
    </div>
    <option-items :config="textStyleConfig" />
    <div class="splitLine">
      坐标轴样式
    </div>
    <option-items :config="axisLineConfig" />
    <div class="splitLine">
      坐标轴文本样式
    </div>
    <option-items :config="axisLabelConfig" />
    <div class="splitLine">
      坐标轴刻度样式
    </div>
    <option-items :config="axisTickConfig" />
  </div>
</template>
<script setup lang="ts">
import {
  watch, reactive
} from "vue";
import useProxy from "@/hooks/useProxy";
import {common, label} from '@/chartConfig/opname';
import useStore from "@/store";
import optionItems from '@/components/optionItems.vue';
import {borderType, fontFamily, fontStyle, fontWeight, locationType} from "@/chartConfig/constant";
import {debounce, getConfigValue} from "@/utils";
import {IOption, TSelectOption} from "@/types/option";
import useWatchData from "@/hooks/useWatchData";
const proxy = useProxy()
const {chart}: any = useStore()

interface IConfig {
  show: IOption<'switch'>
  position: IOption<'select'>
  inverse: IOption<'switch'>
  offset: IOption<'input_number'>
  name: IOption<'input_text'>
  nameLocation: IOption<'select'>
  nameGap: IOption<'input_number'>
  nameRotate: IOption<'input_number'>
}
const config = reactive<IConfig>({
  show: {
    type: 'switch',
    title: common.show,
    value: chart.getOption.xAxis[0].show
  },
  position: {
    type: 'select',
    title: '轴' + common.position,
    options: [
      {
        value: 'top',
        label: '上方',
      },
      {
        value: 'bottom',
        label: '下方',
      },
    ],
    value: chart.getOption.xAxis[0].position
  },
  inverse: {
    type: 'switch',
    title: '轴翻转',
    value: chart.getOption.xAxis[0].inverse
  },
  offset: {
    type: 'input_number',
    title: '文本' + common.offset,
    max: 100,
    value: chart.getOption.xAxis[0].offset
  },
  name: {
    type: 'input_text',
    title: '轴名称',
    value: chart.getOption.xAxis[0].name
  },
  nameLocation: {
    type: 'select',
    title: '轴名称' + common.position,
    options: locationType,
    value: chart.getOption.xAxis[0].nameLocation
  },
  nameGap: {
    type: 'input_number',
    title: '轴名称间距',
    max: 100,
    value: chart.getOption.xAxis[0].nameGap
  },
  nameRotate: {
    type: 'input_number',
    title: '轴名称旋转',
    max: 360,
    min: -360,
    value: chart.getOption.xAxis[0].nameRotate
  }
})

interface ITextStyleConfig {
  color: IOption<'color_picker'>
  fontWeight: IOption<'select'>
  fontFamily: IOption<'select'>
  fontSize: IOption<'input_number'>
}
const textStyleConfig = reactive<ITextStyleConfig>({
  color: {
    type: 'color_picker',
    title: common.color,
    value: chart.getOption.xAxis[0].nameTextStyle.color,
  },
  fontWeight: {
    type: 'select',
    title: label.fontWeight,
    options: fontWeight,
    value: chart.getOption.xAxis[0].nameTextStyle.fontWeight
  },
  fontFamily: {
    type: 'select',
    title: label.fontFamily,
    options: fontFamily,
    value: chart.getOption.xAxis[0].nameTextStyle.fontFamily
  },
  fontSize: {
    type: 'input_number',
    title: label.fontSize,
    max: 50,
    value: chart.getOption.xAxis[0].nameTextStyle.fontSize
  },
})

interface IAxisConfig {
  show: IOption<'switch'>
  color: IOption<'color_picker'>
  width: IOption<'input_number'>
  type: IOption<'select'>
  opacity: IOption<'input_number'>
}
const axisLineConfig = reactive<IAxisConfig>({
  show: {
    type: 'switch',
    title: common.show,
    value: chart.getOption.xAxis[0].axisLine.show,
  },
  color: {
    type: 'color_picker',
    title: common.color,
    value: chart.getOption.xAxis[0].axisLine.lineStyle.color,
  },
  width: {
    type: 'input_number',
    title: common.width,
    max: 50,
    value: chart.getOption.xAxis[0].axisLine.lineStyle.width,
  },
  type: {
    type: 'select',
    title: '线段'+common.type,
    options: borderType,
    value: chart.getOption.xAxis[0].axisLine.lineStyle.type
  },
  opacity: {
    type: 'input_number',
    title: common.opacity,
    max: 1,
    step: .1,
    value: chart.getOption.xAxis[0].axisLine.lineStyle.opacity,
  },
})

const axisTickConfig = reactive<IAxisConfig>({
  show: {
    type: 'switch',
    title: common.show,
    value: chart.getOption.xAxis[0].axisTick.show,
  },
  color: {
    type: 'color_picker',
    title: common.color,
    value: chart.getOption.xAxis[0].axisTick.lineStyle.color,
  },
  width: {
    type: 'input_number',
    title: common.width,
    max: 50,
    value: chart.getOption.xAxis[0].axisTick.lineStyle.width,
  },
  type: {
    type: 'select',
    title: '线段'+common.type,
    options: borderType,
    value: chart.getOption.xAxis[0].axisTick.lineStyle.type
  },
  opacity: {
    type: 'input_number',
    title: common.opacity,
    max: 1,
    step: .1,
    value: chart.getOption.xAxis[0].axisTick.lineStyle.opacity,
  },
})

interface IAxisLabelConfig {
  show: IOption<'switch'>
  rotate: IOption<'input_number'>
  margin: IOption<'input_number'>
  color: IOption<'color_picker'>
  fontStyle: IOption<'select'>
  fontWeight: IOption<'select'>
  fontFamily: IOption<'select'>
  fontSize: IOption<'input_number'>
}
const axisLabelConfig = reactive<IAxisLabelConfig>({
  show: {
    type: 'switch',
    title: common.show,
    value: chart.getOption.xAxis[0].axisLabel.show
  },
  rotate: {
    type: 'input_number',
    title: label.rotate,
    max: 360,
    min: -360,
    value: chart.getOption.xAxis[0].axisLabel.rotate
  },
  margin: {
    type: 'input_number',
    title: '外边距',
    max: 100,
    value: chart.getOption.xAxis[0].axisLabel.margin
  },
  color: {
    type: 'color_picker',
    title: label.color,
    value: chart.getOption.xAxis[0].axisLabel.color
  },
  fontStyle: {
    type: 'select',
    title: label.fontStyle,
    options: fontStyle,
    value: chart.getOption.xAxis[0].axisLabel.fontStyle
  },
  fontWeight: {
    type: 'select',
    title: label.fontWeight,
    options: fontWeight,
    value: chart.getOption.xAxis[0].axisLabel.fontWeight
  },
  fontFamily: {
    type: 'select',
    title: label.fontFamily,
    options: fontFamily,
    value: chart.getOption.xAxis[0].axisLabel.fontFamily
  },
  fontSize: {
    type: 'input_number',
    title: label.fontSize,
    max: 100,
    value: chart.getOption.xAxis[0].axisLabel.fontSize
  },
})

const getData = (type: string) => {
  let xAxis = chart.getOption.xAxis
  if(type == 'config') {
    const option = getConfigValue(config)
    for(let key in option) {
      xAxis[0][key] = option[key]
    }
  } else if(type == 'textStyleConfig') {
    xAxis[0].nameTextStyle = getConfigValue(textStyleConfig)
  } else if(type == 'axisLineConfig') {
    const option = getConfigValue(axisLineConfig)
    xAxis[0].axisLine.show = option.show
    delete option.show
    xAxis[0].axisLine.lineStyle = option
  } else if(type == 'axisTickConfig') {
    const option = getConfigValue(axisTickConfig)
    xAxis[0].axisTick.show = option.show
    delete option.show
    xAxis[0].axisTick.lineStyle = option
  } else if(type == 'axisLabelConfig') {
    xAxis[0].axisLabel = getConfigValue(axisLabelConfig)
  }
  return xAxis
}

useWatchData(config, 'xAxis', () => getData('config'))
useWatchData(textStyleConfig, 'xAxis', () => getData('textStyleConfig'))
useWatchData(axisLineConfig, 'xAxis', () => getData('axisLineConfig'))
useWatchData(axisTickConfig, 'xAxis', () => getData('axisTickConfig'))
useWatchData(axisLabelConfig, 'xAxis', () => getData('axisLabelConfig'))
</script>