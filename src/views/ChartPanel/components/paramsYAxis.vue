<template>
  <div class="paramsYAxis">
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
import {ConfigInt} from "@/types/common";
import {common, label} from '@/chartConfig/opname';
import useCommonStore from "@/store/common";
import optionItems from '@/components/optionItems.vue';
import {borderType, fontFamily, fontStyle, fontWeight, locationType} from "@/chartConfig/constant";
import {debounce, getConfigValue} from "@/utils";
const proxy = useProxy()
const _common: any = useCommonStore()

const config = reactive<ConfigInt>({
  show: {
    type: 'switch',
    title: common.show,
    value: _common.option.yAxis[0].show
  },
  position: {
    type: 'select',
    title: '轴' + common.position,
    options: [
      {
        value: 'left',
        label: '左侧'
      },
      {
        value: 'right',
        label: '右侧'
      },
    ],
    value: _common.option.yAxis[0].position
  },
  inverse: {
    type: 'switch',
    title: '轴翻转',
    value: _common.option.yAxis[0].inverse
  },
  offset: {
    type: 'input_number',
    title: '文本' + common.offset,
    max: 100,
    value: _common.option.yAxis[0].offset
  },
  name: {
    type: 'input_text',
    title: '轴名称',
    value: _common.option.yAxis[0].name
  },
  nameLocation: {
    type: 'select',
    title: '轴名称' + common.position,
    options: [
      {
        label: '上面',
        value: 'end',
      },
      {
        label: '中间',
        value: 'middle',
      },
      {
        label: '下面',
        value: 'start',
      },
    ],
    value: _common.option.yAxis[0].nameLocation
  },
  nameGap: {
    type: 'input_number',
    title: '轴名称间距',
    max: 100,
    value: _common.option.yAxis[0].nameGap
  },
  nameRotate: {
    type: 'input_number',
    title: '轴名称旋转',
    max: 360,
    min: -360,
    value: _common.option.yAxis[0].nameRotate
  }
})
const textStyleConfig = reactive<ConfigInt>({
  color: {
    type: 'color_picker',
    title: common.color,
    value: _common.option.yAxis[0].nameTextStyle.color,
  },
  fontWeight: {
    type: 'select',
    title: label.fontWeight,
    options: fontWeight,
    value: _common.option.yAxis[0].nameTextStyle.fontWeight
  },
  fontFamily: {
    type: 'select',
    title: label.fontFamily,
    options: fontFamily,
    value: _common.option.yAxis[0].nameTextStyle.fontFamily
  },
  fontSize: {
    type: 'input_number',
    title: label.fontSize,
    max: 50,
    value: _common.option.yAxis[0].nameTextStyle.fontSize
  },
})
const axisLineConfig = reactive<ConfigInt>({
  show: {
    type: 'switch',
    title: common.show,
    value: _common.option.yAxis[0].axisLine.show,
  },
  color: {
    type: 'color_picker',
    title: common.color,
    value: _common.option.yAxis[0].axisLine.lineStyle.color,
  },
  width: {
    type: 'input_number',
    title: common.width,
    max: 50,
    value: _common.option.yAxis[0].axisLine.lineStyle.width,
  },
  type: {
    type: 'select',
    title: '线段'+common.type,
    options: borderType,
    value: _common.option.yAxis[0].axisLine.lineStyle.type
  },
  opacity: {
    type: 'input_number',
    title: common.opacity,
    max: 1,
    step: .1,
    value: _common.option.yAxis[0].axisLine.lineStyle.opacity,
  },
})
const axisTickConfig = reactive<ConfigInt>({
  show: {
    type: 'switch',
    title: common.show,
    value: _common.option.yAxis[0].axisTick.show,
  },
  color: {
    type: 'color_picker',
    title: common.color,
    value: _common.option.yAxis[0].axisTick.lineStyle.color,
  },
  width: {
    type: 'input_number',
    title: common.width,
    max: 50,
    value: _common.option.yAxis[0].axisTick.lineStyle.width,
  },
  type: {
    type: 'select',
    title: '线段'+common.type,
    options: borderType,
    value: _common.option.yAxis[0].axisTick.lineStyle.type
  },
  opacity: {
    type: 'input_number',
    title: common.opacity,
    max: 1,
    step: .1,
    value: _common.option.yAxis[0].axisTick.lineStyle.opacity,
  },
})
const axisLabelConfig = reactive<ConfigInt>({
  show: {
    type: 'switch',
    title: common.show,
    value: _common.option.yAxis[0].axisLabel.show
  },
  rotate: {
    type: 'input_number',
    title: label.rotate,
    max: 360,
    min: -360,
    value: _common.option.yAxis[0].axisLabel.rotate
  },
  margin: {
    type: 'input_number',
    title: '外边距',
    max: 100,
    value: _common.option.yAxis[0].axisLabel.margin
  },
  color: {
    type: 'color_picker',
    title: label.color,
    value: _common.option.yAxis[0].axisLabel.color
  },
  fontStyle: {
    type: 'select',
    title: label.fontStyle,
    options: fontStyle,
    value: _common.option.yAxis[0].axisLabel.fontStyle
  },
  fontWeight: {
    type: 'select',
    title: label.fontWeight,
    options: fontWeight,
    value: _common.option.yAxis[0].axisLabel.fontWeight
  },
  fontFamily: {
    type: 'select',
    title: label.fontFamily,
    options: fontFamily,
    value: _common.option.yAxis[0].axisLabel.fontFamily
  },
  fontSize: {
    type: 'input_number',
    title: label.fontSize,
    max: 100,
    value: _common.option.yAxis[0].axisLabel.fontSize
  },
})

const getData = (type: string) => {
  let yAxis = _common.option.yAxis
  if(type == 'config') {
    const option = getConfigValue(config)
    for(let key in option) {
      yAxis[0][key] = option[key]
    }
  } else if(type == 'textStyleConfig') {
    yAxis[0].nameTextStyle = getConfigValue(textStyleConfig)
  } else if(type == 'axisLineConfig') {
    const option = getConfigValue(axisLineConfig)
    yAxis[0].axisLine.show = option.show
    delete option.show
    yAxis[0].axisLine.lineStyle = option
  } else if(type == 'axisTickConfig') {
    const option = getConfigValue(axisTickConfig)
    yAxis[0].axisTick.show = option.show
    delete option.show
    yAxis[0].axisTick.lineStyle = option
  } else if(type == 'axisLabelConfig') {
    yAxis[0].axisLabel = getConfigValue(axisLabelConfig)
  }
  return yAxis
}
watch(() => config, debounce(() => {
  proxy.$Bus.emit("optionChange", {
    yAxis: getData('config'),
  });
}, 500), {
  deep: true
})
watch(() => textStyleConfig, debounce(() => {
  proxy.$Bus.emit("optionChange", {
    yAxis: getData('textStyleConfig'),
  });
}, 500), {
  deep: true
})
watch(() => axisLineConfig, debounce(() => {
  proxy.$Bus.emit("optionChange", {
    yAxis: getData('axisLineConfig'),
  });
}, 500), {
  deep: true
})
watch(() => axisTickConfig, debounce(() => {
  proxy.$Bus.emit("optionChange", {
    yAxis: getData('axisTickConfig'),
  });
}, 500), {
  deep: true
})
watch(() => axisLabelConfig, debounce(() => {
  proxy.$Bus.emit("optionChange", {
    yAxis: getData('axisLabelConfig'),
  });
}, 500), {
  deep: true
})
</script>
<style lang="less">
.paramsYAxis {
  .splitLine {
    font-size: 12px;
    font-weight: bold;
    color: @theme;
    margin: 8px 0 6px 0;
    position: relative;
    display: flex;
    align-items: center;
    padding-bottom: 5px;
    &::after {
      position: absolute;
      content: '';
      width: 30%;
      height: 3px;
      bottom: 0;
      left: 0;
      background-color: @theme;
      opacity: .4;
    }
  }
}
</style>