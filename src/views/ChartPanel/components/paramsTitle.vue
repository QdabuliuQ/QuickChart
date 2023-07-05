<template>
  <div class="paramsTitle">
    <optionItems :config="config" />
    <optionItems :config="textStyleConfig" />
  </div>
</template>

<script setup lang='ts'>
import {
  watch,
  defineProps, reactive
} from "vue";
import useProxy from "@/hooks/useProxy";
import {ConfigInt} from "@/types/common";
import { common, label } from '@/chartConfig/opname';
import useCommonStore from "@/store/common";
import {fontWeight, textAlign} from "@/chartConfig/constant";
import optionItems from '@/components/optionItems.vue'
import {debounce, getConfigValue} from "@/utils";

const props = defineProps<{
  defaultOption: any
  allOption: any
  opNameList: any
}>()
const _common: any = useCommonStore()
const config = reactive<ConfigInt>({
  text: {
    type: 'input_text',
    title: '文本标题',
    value: _common.option.title.text,
  },
  show: {
    type: 'switch',
    title: common.show,
    value: _common.option.title.show
  },
  textAlign: {
    type: 'select',
    title: '对齐方式',
    options: textAlign,
    value: _common.option.title.textAlign
  },
  left: {
    type: 'input_number',
    title: common.left + '(%)',
    max: 100,
    value: parseInt(_common.option.title.left)
  },
  top: {
    type: 'input_number',
    title: common.top + '(%)',
    max: 100,
    value: parseInt(_common.option.title.top)
  },
  backgroundColor: {
    type: 'color_picker',
    title: common.backgroundColor,
    value: _common.option.title.backgroudColor
  },
})
const textStyleConfig = reactive<ConfigInt>({
  color: {
    type: 'color_picker',
    title: label.color,
    value: _common.option.title.textStyle.color
  },
  fontWeight: {
    type: 'select',
    title: label.fontWeight,
    options: fontWeight,
    value: _common.option.title.textStyle.fontWeight
  },
  fontSize: {
    type: 'input_number',
    title: label.fontSize,
    max: 100,
    value: _common.option.title.textStyle.fontSize
  },
})
const proxy = useProxy()

const getData = (type: string) => {
  let title = _common.option.title
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
  proxy.$Bus.emit("optionChange", {
    title: getData('textStyle'),
  });
}, 500), {
  deep: true
})
</script>