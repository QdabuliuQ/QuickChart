<template>
  <div class="paramsCanvas">
    <option-items :config="config" />
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
import optionItems from '@/components/optionItems.vue'
import {debounce, getConfigValue} from "@/utils";
const props = defineProps<{
  defaultOption: any
  allOption: any
  opNameList: any
}>()
const _common: any = useCommonStore()
const proxy = useProxy()
const config = reactive<ConfigInt>({
  backgroundColor: {
    type: 'color_picker',
    title: common.backgroundColor,
    value: _common.option.backgroundColor
  },
  bgImage: {
    type: 'imgload',
    title: '背景图片',
    value: ''
  }
})

const getData = () => {
  const option = getConfigValue(config)
  if(option.bgImage) {
    console.log(option.bgImage)
    return {
      image: option.bgImage,
    }
  } else {
    delete option.bgImage
    return option
  }
}
watch(() => config, debounce(() => {
  proxy.$Bus.emit("canvasChange", getData());
}, 500), {
  deep: true
})
</script>

<style lang='less'>
.paramsCanvas {
  .el-button--small {
    span {
      zoom: .95;
    }
  }

  .image {
    cursor: pointer;
    margin-top: 5px;
  }
}
</style>