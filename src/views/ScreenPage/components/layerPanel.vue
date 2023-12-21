<template>
  <el-popover
    placement="top-start"
    :width="200"
    trigger="click"
    popper-class="layer-panel-popper-class"
  >
    <template #reference>
      <slot></slot>
    </template>
    <el-scrollbar height="400px">
      <div
        @mouseenter="enterEvent(idx)"
        @mouseleave="leaveEvent"
        v-for="(item, idx) in screen.getScreenOptionOfElements"
        :key="item.id"
        class="element-item">
        <div class="element-info">
          <div class="element-icon">
            <img
              v-if="item.type === 'chart' || item.type === 'map'"
              :src="item.cover" />
            <img
              v-else-if="item.type === 'image'"
              :src="item.url" />
            <i v-else :class='["iconfont", getIconClass(item.type)]'></i>
          </div>
          <div class="element-title">
            {{getTitle(item.type)}}
          </div>
        </div>
        <div class="element-status">
          <i @click="lockStatusChange(idx, item.isLock)" style="font-size: 15px" :class="['iconfont', item.isLock ? 'i_unlock' : 'i_lock']"></i>
          <i style="font-size: 17px" class="iconfont i_see"></i>
        </div>
      </div>
    </el-scrollbar>
  </el-popover>
</template>
<script setup lang="ts">
import {reactive} from "vue";
import useStore from "@/store";

const {screen}: any = useStore()

const getIconClass = (type: string) => {
  switch (type) {
    case "text":
      return "i_text"
    case "shape":
      return "i_shape"
  }
}
const getTitle = (type: string) => {
  switch (type) {
    case "chart":
      return "图表"
    case "map":
      return "地图"
    case "text":
      return "文本"
    case "shape":
      return "形状"
    case "image":
      return "图片"
  }
}

const enterEvent = (idx: number) => {
  console.log(idx)
  screen.updateActiveElementIdx(idx)
}
const leaveEvent = () => {
  screen.updateActiveElementIdx(-1)
}
const lockStatusChange = (idx: number, isLock: boolean) => {
  screen.updateElementOfItem(idx, 'isLock', !isLock)
}

</script>
<style lang="less">
.layer-panel-popper-class {
  .element-item {
    padding: 8px;
    cursor: pointer;
    border-radius: 8px;
    box-sizing: border-box;
    border: 1px solid transparent;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:hover {
      background-color: rgba(248, 181, 87, 0.33);
      border: 1px solid @theme;
    }
    .element-info {
      flex: 1;
      display: flex;
      align-items: center;
    }
    .element-icon {
      width: 55%;
      height: 50px;
      object-fit: contain;
      border-radius: 8px;
      background-color: #424242;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 100%;
        height: 100%;
      }
      .iconfont {
        font-size: 30px;
      }
    }
    .element-title {
      font-size: 12px;
      margin-left: 10px;
    }
    .element-status {
      display: flex;
      align-items: center;
      flex-direction: column;
      .iconfont {
        cursor: pointer;
        &:hover {
          color: @theme;
        }
      }
    }
  }
}
</style>