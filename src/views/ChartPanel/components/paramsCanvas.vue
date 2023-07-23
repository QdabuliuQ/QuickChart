<template>
  <div class="paramsCanvas">
    <option-items :config="config" />
  </div>
</template>

<script setup lang='ts'>
import {
  watch,
  reactive
} from "vue";
import useProxy from "@/hooks/useProxy";
import {ConfigInt} from "@/types/common";
import { common } from '@/chartConfig/opname';
import useCommonStore from "@/store/common";
import optionItems from '@/components/optionItems.vue'
import {debounce, getConfigValue} from "@/utils";
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
    value: typeof _common.option.backgroundColor === 'object' ? _common.option.backgroundColor.url : ''
  }
})

const getData = () => {
  const option = getConfigValue(config)
  console.log(option)
  if(option.bgImage) {
    return {
      repeat: 'repeat',
      image: option.bgImage
      // image: createImage(option.bgImage),
      // url: option.bgImage
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