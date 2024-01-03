<template>
  <el-popover
    ref='shapePopoverRef'
    popper-class="functionListPopoverClass"
    placement="right-start"
    trigger="click"
    :hide-after="0"
  >
    <el-scrollbar height="350px">
      <div class="popover-text-list">
        <div @click="normalTextClick" class="text-item text-item-normal">
          <div class="text-item-cover">
            <i class="iconfont i_text"></i>
          </div>
          <div class="text-item-title">
            普通文本
          </div>
        </div>
        <div @click="scrollTextClick" class="text-item text-item-scroll">
          <div class="text-item-cover">
            <i class="iconfont i_scroll_text"></i>
          </div>
          <div class="text-item-title">
            滚动文本
          </div>
        </div>
      </div>
    </el-scrollbar>
    <template #reference>
      <button-item
        title="文本"
        icon="i_text"
        tip="插入文本" />
    </template>
  </el-popover>
</template>
<script setup lang="ts">
import {ref} from "vue";
import {getTextConfig} from "@/utils/screenUtil";
import useStore from "@/store";
import ButtonItem from "./buttonItem.vue";

const shapePopoverRef = ref()
const {screen} = useStore()
const normalTextClick = () => {
  screen.addScreenOptionOfElements(getTextConfig())
  shapePopoverRef.value.hide()
}

const scrollTextClick = () => {
  console.log(111)
}
</script>

<style lang="less">
.functionListPopoverClass {
  .popover-text-list {
    width: 400px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
    .text-item {
      cursor: pointer;
      &:hover .text-item-cover{
        border: 1px solid @theme;
      }
    }
    .text-item-cover {
      width: 100%;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: @theme;
      border-radius: 10px;
      background-color: #383838;
      margin-bottom: 5px;
      box-sizing: border-box;
      border: 1px solid transparent;
      transition: all .2s linear;
      .iconfont {
        font-size: 50px;
      }
    }
    .text-item-title {
      text-align: center;
      font-size: 13px;
    }
  }
}

</style>