<template>
  <div id="paramsBarText">
    <optionItems :config="config" />
  </div>
</template>

<script setup lang='ts'>
import { ComponentInternalInstance, getCurrentInstance, reactive, watch } from 'vue';
import optionItems from '@/components/optionItems.vue'
import useCommonStore from "@/store/common";
import { fontFamily, fontWeight, fontStyle, borderType, position, ListInt } from "@/chartConfig/constant";
import { ConfigInt } from '@/types/common';
import { debounce } from '@/utils';

const { appContext } = getCurrentInstance() as ComponentInternalInstance;
const proxy = appContext.config.globalProperties;
const common: any = useCommonStore();
const config = reactive<ConfigInt>({
  show: {
    type: 'switch',
    title: '是否显示',
    value: common.option.series[0].label.show
  },
  rotate: {
    type: 'input_number',
    title: '旋转角度',
    max: 360,
    min: -360,
    value: common.option.series[0].label.rotate
  },
  color: {
    type: 'color_picker',
    title: '字体颜色',
    value: common.option.series[0].label.color
  },
  fontStyle: {
    type: 'select',
    title: '字体样式',
    options: fontStyle as ListInt[],
    value: common.option.series[0].label.fontStyle
  },
  fontWeight: {
    type: 'select',
    title: '字体粗细',
    options: fontWeight as ListInt[],
    value: common.option.series[0].label.fontWeight
  },
  fontFamily: {
    type: 'select',
    title: '字体类型',
    options: fontFamily as ListInt[],
    value: common.option.series[0].label.fontFamily
  },
  fontSize: {
    type: 'input_number',
    title: '字体大小',
    max: 100,
    value: common.option.series[0].label.fontSize
  },
  borderColor: {
    type: 'color_picker',
    title: '边框颜色',
    value: common.option.series[0].label.borderColor
  },
  borderWidth: {
    type: 'input_number',
    title: '边框宽度',
    max: 50,
    value: common.option.series[0].label.borderWidth
  },
  borderType: {
    type: 'select',
    title: '边框类型',
    options: borderType as ListInt[],
    value: common.option.series[0].label.borderType
  },
  shadowColor: {
    type: 'color_picker',
    title: '阴影颜色',
    value: common.option.series[0].label.shadowColor
  },
  shadowBlur: {
    type: 'input_number',
    title: '阴影模糊',
    max: 50,
    value: common.option.series[0].label.shadowBlur
  },
  shadowOffsetX: {
    type: 'input_number',
    title: '阴影偏移X',
    max: 400,
    min: -400,
    value: common.option.series[0].label.shadowOffsetX
  },
  shadowOffsetY: {
    type: 'input_number',
    title: '阴影偏移Y',
    max: 400,
    min: -400,
    value: common.option.series[0].label.shadowOffsetY
  },
  position: {
    type: 'select',
    title: '文本位置',
    options: position as ListInt[],
    value: common.option.series[0].label.position
  },
})

const getData = () => {
  let res: {
    [propsName: string]: any
  } = {}
  for(let key in config) {
    res[key] = config[key].value
  }
  return res
}

const cbEvent = debounce(() => {
  let s = common.option.series
  console.log(s)
  for(let item of s) {
    item.label = getData()
  }
  // console.log(s)
  proxy.$Bus.emit("optionChange", {
    series: s,
  });
})

watch(() => config, () => {
  cbEvent && cbEvent()
}, {
  deep: true
})

</script>