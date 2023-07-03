<template>
  <div id="paramsBarBgStyle" class="uniqueOptionContainer">
    <optionItems :config="config" />
  </div>
</template>

<script setup lang='ts'>
import { ComponentInternalInstance, getCurrentInstance, reactive, watch } from 'vue';
import optionItems from '@/components/optionItems.vue'
import useCommonStore from "@/store/common";
import useProxy from '@/hooks/useProxy';
import { borderType, ListInt } from "@/chartConfig/constant";
import { ConfigInt } from '@/types/common';
import { debounce } from '@/utils';

const proxy = useProxy()
const common: any = useCommonStore();
const config = reactive<ConfigInt>({
  showBackground: {
    type: 'switch',
    title: '是否显示',
    value: common.option.series[0].showBackground
  },
  color: {
    type: 'color_picker',
    title: '背景颜色',
    value: common.option.series[0].backgroundStyle.color
  },
  borderColor: {
    type: 'color_picker',
    title: '边框颜色',
    value: common.option.series[0].backgroundStyle.borderColor
  },
  borderWidth: {
    type: 'input_number',
    title: '边框宽度',
    max: 50,
    value: common.option.series[0].backgroundStyle.borderWidth
  },
  borderType: {
    type: 'select',
    title: '边框类型',
    options: borderType as ListInt[],
    value: common.option.series[0].backgroundStyle.borderType
  },
  shadowBlur: {
    type: 'input_number',
    title: '阴影模糊',
    max: 50,
    value: common.option.series[0].backgroundStyle.shadowBlur
  },
  shadowColor: {
    type: 'color_picker',
    title: '阴影颜色',
    value: common.option.series[0].backgroundStyle.shadowColor
  },
  shadowOffsetX: {
    type: 'input_number',
    title: '阴影偏移X',
    max: 400,
    min: -400,
    value: common.option.series[0].backgroundStyle.shadowOffsetX
  },
  shadowOffsetY: {
    type: 'input_number',
    title: '阴影偏移Y',
    max: 400,
    min: -400,
    value: common.option.series[0].backgroundStyle.shadowOffsetY
  },
  opacity: {
    type: 'input_number',
    title: '透明度',
    max: 1,
    step: 0.1,
    value: common.option.series[0].backgroundStyle.opacity
  },
})

const getData = () => {
  let res: {
    [propsName: string]: any
  } = {}
  for(let key in config) {
    if(key == 'showBackground') continue
    res[key] = config[key].value
  }
  return res
}

const cbEvent = debounce(() => {
  let s = common.option.series
  s[0].backgroundStyle = getData()
  s[0].showBackground = config.showBackground.value
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

<style lang='less'>
</style>