<template>
  <div class="paramsBarAxis">
    <option-items :config="config"/>
  </div>
</template>

<script setup lang='ts'>
import useProxy from "@/hooks/useProxy";
import useStore from "@/store";
import optionItems from '@/components/optionItems.vue';
import {reactive} from "vue";
import {IOption, TOption} from "@/types/option";
import useWatchData from "@/hooks/useWatchData";
import {getConfigValue} from "@/utils";

const proxy = useProxy()
const {chart}: any = useStore();

interface IProps<T extends TOption> {
  'clockwise': IOption<'switch'>
  'startAngle': IOption<'input_number'>
}
const config = reactive<IProps<TOption>>({
  clockwise: {
    type: 'switch',
    value: chart.getOption.angleAxis.clockwise,
    title: '顺时针'
  },
  startAngle: {
    type: 'input_number',
    value: chart.getOption.angleAxis.startAngle,
    title: '旋转角度',
    max: 360,
  }
})

const getData = () => {
  return getConfigValue(config)
}

useWatchData(config, 'angleAxis', getData)

</script>