<template>
  <div class="commonConfig">
    <series-item title="slot">
      <template #title>
        <i class="iconfont i_width"></i>
        <span>宽度</span>
      </template>
      <div class="data">
        {{props.info.style.width}}px
      </div>
    </series-item>
    <series-item title="slot">
      <template #title>
        <i class="iconfont i_height"></i>
        <span>高度</span>
      </template>
      <div class="data">{{props.info.style.height}}px</div>
    </series-item>
    <series-item title="slot">
      <template #title>
        <i class="iconfont i_rotate"></i>
        <span>旋转角度</span>
      </template>
      <div class="data">{{props.info.style.rotate.toFixed(2)}}°</div>
    </series-item>
    <series-item title="slot">
      <template #title>
        <i class="iconfont i_move"></i>
        <span>X轴偏移</span>
      </template>
      <div class="data">{{props.info.style.translateX.toFixed(2)}}px</div>
    </series-item>
    <series-item title="slot">
      <template #title>
        <i class="iconfont i_move"></i>
        <span>Y轴偏移</span>
      </template>
      <div class="data">{{props.info.style.translateY.toFixed(2)}}px</div>
    </series-item>
  </div>
</template>
<script setup lang="ts">
import SeriesItem from "@/components/seriesItem.vue";
import {Elements, ElementTypeProperties} from "@/types/screen";

interface IProps {
  info: ElementTypeProperties<Elements>
}
const props = defineProps<IProps>()
</script>
<style lang="less">
.commonConfig {
  .series-item {
    padding: 8px 0;
    .item-title {
      top: 0;
      display: flex;
      align-items: center;
      font-size: 13px;
      letter-spacing: 1px;
    }
    .iconfont {
      margin-right: 7px;
      font-size: 14px;
    }
    .data {
      font-size: 14px;
      color: @theme;
      font-weight: bold;
    }
    .option-operation {
      width: 50%;
    }
  }
}
</style>