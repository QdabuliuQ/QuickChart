<template>
  <div class="paramsSunburstItem">
    <series-item v-if="series.levels" :title='"层级颜色"'>
      <colorPanel @colorChange="colorChange" :colors="colors" />
    </series-item>
    <option-items :config="config" />
  </div>
</template>

<script setup lang="ts">
import {reactive} from 'vue';
import seriesItem from "@/components/seriesItem.vue";
import colorPanel from "@/components/colorsPanel.vue"
import optionItems from '@/components/optionItems.vue'
import useProxy from '@/hooks/useProxy';
import useWatchData from "@/hooks/useWatchData";
import useCommonStore from "@/store/common";
import {ConfigInt} from '@/types/common';
import {getConfigValue} from '@/utils';
import {borderType} from "@/chartConfig/constant";

const proxy = useProxy()
const _common: any = useCommonStore()
const series: any = _common.option.series
const seriesItemStyle = series.itemStyle
const colors = reactive<string[]>([])
if(series.levels) {
  for(let i = 1; i < series.levels.length; i ++) {
    colors.push(series.levels[i].itemStyle.color)
  }
  console.log(colors)
}
const config = reactive<ConfigInt>({
  borderColor: {
    type: 'color_picker',
    value: seriesItemStyle.borderColor,
  },
  borderWidth: {
    type: 'input_number',
    max: 100,
    value: seriesItemStyle.borderWidth,
  },
  borderType: {
    type: 'select',
    options: borderType,
    value: seriesItemStyle.borderType,
  },
  shadowBlur: {
    type: 'input_number',
    max: 100,
    value: seriesItemStyle.shadowBlur,
  },
  shadowColor: {
    type: 'color_picker',
    value: seriesItemStyle.shadowColor,
  },
  shadowOffsetX: {
    type: 'input_number',
    max: 500,
    min: -500,
    value: seriesItemStyle.shadowOffsetX,
  },
  shadowOffsetY: {
    type: 'input_number',
    max: 500,
    min: -500,
    value: seriesItemStyle.shadowOffsetY,
  },
  opacity: {
    type: 'input_number',
    max: 1,
    value: seriesItemStyle.opacity,
  },
  borderRadius: {
    type: 'input_number',
    max: 500,
    title: '圆角半径',
    value: seriesItemStyle.borderRadius,
  },
})

const colorChange = (colors: string) => {
  const series = _common.option.series
  let levels: {
    [props: string]: any
  }[] = [
    {}
  ]
  for(let item of colors) {
    levels.push({
      itemStyle: {
        color: item
      }
    })
  }
  series.levels = levels
  proxy.$Bus.emit("optionChange", {
    series
  })
}

const getData = () => {
  const series = _common.option.series
  series.itemStyle = getConfigValue(config)
  return series
}
useWatchData(config, 'series', getData)
</script>

<style lang="less">
.paramsSunburstItem {
  .colorsPanel {
    margin: 0;
  }
}
</style>