<template>
  <div class="paramsGrid">
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
const proxy = useProxy()
const _common: any = useCommonStore()
const config = reactive<ConfigInt>({
  show: {
    type: 'switch',
    title: common.show,
    value: _common.option.grid.show
  },
  left: {
    type: 'input_number',
    title: common.left + '(%)',
    max: 100,
    value: parseInt(_common.option.grid.left)
  },
  top: {
    type: 'input_number',
    title: common.top + '(%)',
    max: 100,
    value: parseInt(_common.option.grid.top)
  },
  right: {
    type: 'input_number',
    title: common.right + '(%)',
    max: 100,
    value: parseInt(_common.option.grid.right)
  },
  bottom: {
    type: 'input_number',
    title: common.bottom + '(%)',
    max: 100,
    value: parseInt(_common.option.grid.bottom)
  },
  backgroundColor: {
    type: 'color_picker',
    title: common.backgroundColor,
    value: _common.option.grid.backgroundColor
  },
  borderColor: {
    type: 'color_picker',
    title: common.borderColor,
    value: _common.option.grid.borderColor
  },
  borderWidth: {
    type: 'input_number',
    title: common.borderWidth,
    max: 100,
    value: _common.option.grid.borderWidth
  },
  shadowBlur: {
    type: 'input_number',
    title: common.shadowBlur,
    max: 100,
    value: _common.option.grid.shadowBlur
  },
  shadowColor: {
    type: 'color_picker',
    title: common.shadowColor,
    value: _common.option.grid.shadowColor
  },
  shadowOffsetX: {
    type: 'input_number',
    title: common.shadowOffsetX,
    max: 500,
    min: -500,
    value: _common.option.grid.shadowOffsetX
  },
  shadowOffsetY: {
    type: 'input_number',
    title: common.shadowOffsetY,
    max: 500,
    min: -500,
    value: _common.option.grid.shadowOffsetY
  },
})

const getData = () => {
  let grid = getConfigValue(config)
  grid.left = grid.left + '%'
  grid.right = grid.right + '%'
  grid.top = grid.top + '%'
  grid.bottom = grid.bottom + '%'
  return grid
}
watch(() => config, debounce(() => {
  proxy.$Bus.emit("optionChange", {
    grid: getData(),
  });
}, 500), {
  deep: true
})
</script>

<style lang='less'>
</style>