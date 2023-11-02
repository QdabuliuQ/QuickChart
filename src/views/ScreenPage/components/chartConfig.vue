<template>
  <div class="chartConfig">
    <template v-if="info">
      <div class="cover">
        <img :src="info.cover"/>
      </div>
      <config-title title="图表参数" />
      <series-item title="slot">
        <template #title>
          <i class="iconfont i_width"></i>
          <span>宽度</span>
        </template>
        <div class="data">
          {{info.style.width}}px
        </div>
      </series-item>
      <series-item title="slot">
        <template #title>
          <i class="iconfont i_height"></i>
          <span>高度</span>
        </template>
        <div class="data">{{info.style.height}}px</div>
      </series-item>
      <series-item title="slot">
        <template #title>
          <i class="iconfont i_rotate"></i>
          <span>旋转角度</span>
        </template>
        <div class="data">{{info.style.rotate}}°</div>
      </series-item>
      <series-item title="slot">
        <template #title>
          <i class="iconfont i_move"></i>
          <span>X轴偏移</span>
        </template>
        <div class="data">{{info.style.translateX}}px</div>
      </series-item>
      <series-item title="slot">
        <template #title>
          <i class="iconfont i_move"></i>
          <span>Y轴偏移</span>
        </template>
        <div class="data">{{info.style.translateY}}px</div>
      </series-item>
      <series-item title="slot">
        <template #title>
          <i class="iconfont i_scale"></i>
          <span>X轴缩放</span>
        </template>
        <div class="data">{{info.style.scaleX}}</div>
      </series-item>
      <series-item title="slot">
        <template #title>
          <i class="iconfont i_scale"></i>
          <span>Y轴缩放</span>
        </template>
        <div class="data">{{info.style.scaleY}}</div>
      </series-item>
      <config-title title="图表配置" />
      <series-item title="层级">
        <el-input-number :min="1" :max="100" size="small" v-model="info.style.zIndex" />
      </series-item>
      <config-btn :icon="'i_delete_2'" :bg-color="'rgb(255, 66, 66)'" @btn-click="deleteEvent" label="删除图表" />
      <config-btn @btn-click="lockClick" :bg-color="info.isLock ? '#79d321' : '#9c9c9c'" :icon="info.isLock ? 'i_unlock' : 'i_lock'" :label="info.isLock ? '解锁图表' : '锁定图表'" />
    </template>
  </div>
</template>
<script setup lang="ts">
import {onUnmounted, ref, watch} from "vue";
import useCommonStore from "@/store/common";
import {Chart, Elements, ElementTypeProperties} from "@/types/common";
import useProxy from "@/hooks/useProxy";
import {debounce} from "@/utils";
import ConfigTitle from "@/views/ScreenPage/components/configTitle.vue";
import SeriesItem from "@/components/seriesItem.vue";
import ConfigBtn from "@/views/ScreenPage/components/configBtn.vue";

interface IProps {
  info: ElementTypeProperties<Elements>
}

const props = defineProps<IProps>()
const proxy = useProxy()
const common = useCommonStore()
const idx = ref<number>(-1)
let info = ref<Chart | null>(null)
const deleteEvent = () => {  // 删除图表
  proxy.$Bus.emit("deleteChart", common.curElementIdx)
}
const lockClick = () => {
  info.value!.isLock = !info.value!.isLock
  common.updateScreenOptionOfElements(info.value)
}

let stop = watch(() => common.curElementIdx, () => {
  if (common.getCurElementIdx !== -1 && common.getScreenOptionOfElements[common.getCurElementIdx].type === 'chart') {
    idx.value = common.getCurElementIdx
    info.value = common.getScreenOptionOfElements[common.getCurElementIdx] as ElementTypeProperties<'chart'>
  }
}, {
  deep: true,
  immediate: true
})
let stop2 = watch(() => info, debounce(() => {
  common.updateScreenOptionOfElementStyle(info.value!.style, idx.value)
}), {
  deep: true
})

onUnmounted(() => {
  stop()
  stop2()
})

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
      width: 50%;
    }
  }
}
</style>