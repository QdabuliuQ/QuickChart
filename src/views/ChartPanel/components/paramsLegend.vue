<template>
  <div class="paramsLegend">
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
import useStore from "@/store";
import optionItems from '@/components/optionItems.vue'
import {debounce, getConfigValue} from "@/utils"
import {orient, symbol} from "@/chartConfig/constant";
const proxy = useProxy()
const _common: any = useStore()

const config = reactive<ConfigInt>({
  show: {
    type: 'switch',
    title: common.show,
    value: _common.option.legend.show
  },
  icon: {
    type: 'select',
    title: '图形图标',
    options: symbol,
    value: _common.option.legend.icon
  },
  left: {
    type: 'input_number',
    title: common.left + '(%)',
    value: parseInt(_common.option.legend.left),
    max: 100,
  },
  top: {
    type: 'input_number',
    title: common.top + '(%)',
    value: parseInt(_common.option.legend.top),
    max: 100,
  },
  itemGap: {
    type: 'input_number',
    title: '图例间隔',
    max: 200,
    value: _common.option.legend.itemGap
  },
  itemWidth: {
    type: 'input_number',
    title: common.width ,
    value: parseInt(_common.option.legend.itemWidth),
    max: 100,
  },
  itemHeight: {
    type: 'input_number',
    title: common.height,
    value: parseInt(_common.option.legend.itemHeight),
    max: 100,
  },
  orient: {
    type: 'select',
    title: common.orient,
    options: orient,
    value: _common.option.legend.orient
  }
})

const getData = () => {
  let legend = getConfigValue(config)
  legend.left = legend.left + '%'
  legend.top = legend.top + '%'
  return legend
}
watch(() => config, debounce(() => {
  proxy.$Bus.emit("optionChange", {
    legend: getData(),
  });
}, 500), {
  deep: true
})
</script>

<style lang='less'>
</style>