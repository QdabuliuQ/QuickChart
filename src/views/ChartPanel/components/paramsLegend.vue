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
import { common } from '@/chartConfig/opname';
import useStore from "@/store";
import optionItems from '@/components/optionItems.vue'
import { getConfigValue} from "@/utils"
import {orient, symbol} from "@/chartConfig/constant";
import {IOption } from "@/types/option";
import useWatchData from "@/hooks/useWatchData";
const proxy = useProxy()
const {chart}: any = useStore()

interface IConfig {
  show:  IOption<'switch'>
  icon:  IOption<'select'>
  left: IOption<'input_number'>
  top: IOption<'input_number'>
  itemGap: IOption<'input_number'>
  itemWidth: IOption<'input_number'>
  itemHeight: IOption<'input_number'>
  orient: IOption<'select'>
}
const config = reactive<IConfig>({
  show: {
    type: 'switch',
    title: common.show,
    value: chart.getOption.legend.show
  },
  icon: {
    type: 'select',
    title: '图形图标',
    options: symbol,
    value: chart.getOption.legend.icon
  },
  left: {
    type: 'input_number',
    title: common.left + '(%)',
    value: parseInt(chart.getOption.legend.left),
    max: 100,
  },
  top: {
    type: 'input_number',
    title: common.top + '(%)',
    value: parseInt(chart.getOption.legend.top),
    max: 100,
  },
  itemGap: {
    type: 'input_number',
    title: '图例间隔',
    max: 200,
    value: chart.getOption.legend.itemGap
  },
  itemWidth: {
    type: 'input_number',
    title: common.width ,
    value: parseInt(chart.getOption.legend.itemWidth),
    max: 100,
  },
  itemHeight: {
    type: 'input_number',
    title: common.height,
    value: parseInt(chart.getOption.legend.itemHeight),
    max: 100,
  },
  orient: {
    type: 'select',
    title: common.orient,
    options: orient,
    value: chart.getOption.legend.orient
  }
})

const getData = () => {
  let legend = getConfigValue(config)
  legend.left = legend.left + '%'
  legend.top = legend.top + '%'
  return legend
}

useWatchData(config, 'legend', getData)
</script>

<style lang='less'>
</style>