<template>
  <div class="chartConfig">
    <div class="cover">
      <img :src="(props.info as Chart).cover"/>
    </div>
    <div class="title">
      参数配置
    </div>
    <template v-if="JSON.stringify(props.info) !== '{}'">
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
        <div class="data">{{props.info.style.rotate}}°</div>
      </series-item>
      <series-item title="slot">
        <template #title>
          <i class="iconfont i_move"></i>
          <span>X轴偏移</span>
        </template>
        <div class="data">{{props.info.style.translateX}}px</div>
      </series-item>
      <series-item title="slot">
        <template #title>
          <i class="iconfont i_move"></i>
          <span>Y轴偏移</span>
        </template>
        <div class="data">{{props.info.style.translateY}}px</div>
      </series-item>
      <series-item title="slot">
        <template #title>
          <i class="iconfont i_scale"></i>
          <span>X轴缩放</span>
        </template>
        <div class="data">{{props.info.style.scaleX}}</div>
      </series-item>
      <series-item title="slot">
        <template #title>
          <i class="iconfont i_scale"></i>
          <span>Y轴缩放</span>
        </template>
        <div class="data">{{props.info.style.scaleY}}</div>
      </series-item>
      <delete-btn @btn-click="deleteEvent" label="删除图表" />
    </template>
  </div>
</template>
<script setup lang="ts">
import SeriesItem from "@/components/seriesItem.vue";
import useProxy from "@/hooks/useProxy";
import DeleteBtn from "@/views/ScreenPage/components/deleteBtn.vue";
import useCommonStore from "@/store/common";
import {Chart, Elements, ElementTypeProperties} from "@/types/common";

interface IProps {
  info: ElementTypeProperties<Elements>
}

const props = defineProps<IProps>()
const proxy = useProxy()
const common = useCommonStore()
const deleteEvent = () => {  // 删除图表
  proxy.$Bus.emit("deleteChart", common.curElementIdx)
}

</script>
<style lang="less">
.chartConfig {
  .cover {
    width: 100%;
    aspect-ratio: 1/.7;
    border-radius: 10px;
    overflow: hidden;
    background-image: url("../../../assets/image/bg.jpg");
    background-size: cover;
    background-repeat: repeat;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      vertical-align: middle;
    }
  }

  .title {
    font-size: 14px;
    font-weight: bold;
    margin: 10px 0;
    text-align: center;
    position: relative;
    color: @theme;

    &:after {
      position: absolute;
      content: '';
      width: 70px;
      height: 2px;
      background-color: @theme;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .seriesItem {
    padding: 8px 0;
    .itemTitle {
      top: 0;
      display: flex;
      align-items: center;
      font-size: 13px;
      letter-spacing: 1px;
    }
    .iconfont {
      font-size: 14px;
      margin-right: 7px;
    }
    .data {
      font-weight: bold;
      color: @theme;
      font-size: 14px;
    }
    .optionOperation {
      width: 40%;
    }
  }
}
</style>