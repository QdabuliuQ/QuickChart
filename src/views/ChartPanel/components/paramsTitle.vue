<template>
  <div class="paramsTitle">
    <optionItems :config="config" />
    <optionItems :config="textStyleConfig" />
  </div>
</template>

<script setup lang='ts'>
import {
  watch,
  reactive
} from "vue";
import useProxy from "@/hooks/useProxy";
import {ConfigInt} from "@/types/common";
import { common, label } from '@/chartConfig/opname';
import useStore from "@/store";
import {fontWeight, textAlign} from "@/chartConfig/constant";
import optionItems from '@/components/optionItems.vue'
import {debounce, getConfigValue} from "@/utils";

const {chart}: any = useStore()
const config = reactive<ConfigInt>({
  text: {
    type: 'input_text',
    title: '文本标题',
    value: chart.getOption.title.text,
  },
  show: {
    type: 'switch',
    title: common.show,
    value: chart.getOption.title.show
  },
  textAlign: {
    type: 'select',
    title: '对齐方式',
    options: textAlign,
    value: chart.getOption.title.textAlign
  },
  left: {
    type: 'input_number',
    title: common.left + '(%)',
    max: 100,
    value: parseInt(chart.getOption.title.left)
  },
  top: {
    type: 'input_number',
    title: common.top + '(%)',
    max: 100,
    value: parseInt(chart.getOption.title.top)
  },
  backgroundColor: {
    type: 'color_picker',
    title: common.backgroundColor,
    value: chart.getOption.title.backgroudColor
  },
})
const textStyleConfig = reactive<ConfigInt>({
  color: {
    type: 'color_picker',
    title: label.color,
    value: chart.getOption.title.textStyle.color
  },
  fontWeight: {
    type: 'select',
    title: label.fontWeight,
    options: fontWeight,
    value: chart.getOption.title.textStyle.fontWeight
  },
  fontSize: {
    type: 'input_number',
    title: label.fontSize,
    max: 100,
    value: chart.getOption.title.textStyle.fontSize
  },
})
const proxy = useProxy()

const getData = (type: string) => {
  let title = chart.getOption.title
  if(type == 'title') {
    const option = getConfigValue(config)
    for(let key in option) {
      if(key == 'left' || key == 'top') {
        title[key] = option[key] + '%'
      } else {
        title[key] = option[key]
      }
    }
  } else if(type == 'textStyle'){
    title.textStyle = getConfigValue(textStyleConfig)
  }
  return title
}
watch(() => config, debounce(() => {
  proxy.$Bus.emit("optionChange", {
    title: getData('title'),
  });
}, 500), {
  deep: true
})
watch(() => textStyleConfig, debounce(() => {
  proxy.$Bus.emit(" ", {
    title: getData('textStyle'),
  });
}, 500), {
  deep: true
})
</script>