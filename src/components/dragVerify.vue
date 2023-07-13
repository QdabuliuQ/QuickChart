
<template>
  <div class="drag-verify">
    <div class="range" :class="verifyResult ? 'success' : ''">
      <div class="block" @mousedown="onStart" @touchstart="onStart">
        <i :class="verifyResult ? successIcon : startIcon"></i>
      </div>
      <span class="text">{{ verifyResult ? successText : startText }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const emit = defineEmits(['update:value'])
defineProps({
  value: {
    type: Boolean,
    defalut: false,
  },
  // 成功图标
  successIcon: {
    type: String,
    default: 'iconfont i_success',
  },
  // 成功文字
  successText: {
    type: String,
    default: '验证成功',
  },
  // 开始的图标
  startIcon: {
    type: String,
    default: 'iconfont i_slide_right',
  },
  // 开始的文字
  startText: {
    type: String,
    default: '拖动滑块到最右边',
  },
})

const verifyResult = ref(false) // 验证结果
const isTouch = 'ontouchstart' in document.documentElement
const moveEvent = isTouch ? 'touchmove' : 'mousemove'
const upEvent = isTouch ? 'touchend' : 'mouseup'

// 滑块触摸开始
const onStart = (ev: MouseEvent | TouchEvent) => {
  let disX = 0 // 滑块移动距离
  const iconWidth = 40 // 滑动图标宽度
  const ele = document.querySelector('.drag-verify .block') as HTMLElement
  const startX = (ev as MouseEvent).clientX || (ev as TouchEvent).touches[0].pageX
  const parentWidth = ele.offsetWidth
  const MaxX = parentWidth - iconWidth
  if (verifyResult.value) {
    return false
  }

  // 滑块触摸移动
  const onMove = (e: MouseEvent | TouchEvent) => {
    const endX = (e as MouseEvent).clientX || (e as TouchEvent).touches[0].pageX
    disX = endX - startX
    if (disX <= 0) {
      disX = 0
    }
    if (disX >= MaxX - iconWidth) {
      disX = MaxX
    }
    ele.style.transition = '.1s all'
    ele.style.transform = `translateX(${disX}px)`
  }

  // 滑块触摸结束
  const onEnd = () => {
    if (disX !== MaxX) {
      ele.style.transition = '.5s all'
      ele.style.transform = 'translateX(0)'
    } else {
      // 执行成功
      verifyResult.value = true
      emit('update:value', verifyResult.value)
    }

    document.removeEventListener(moveEvent, onMove)
    document.removeEventListener(upEvent, onEnd)
  }

  document.addEventListener(moveEvent, onMove)
  document.addEventListener(upEvent, onEnd)
}
</script>
<style lang="less" scoped>

.flex() {
  display: flex;
  justify-content: center;
  align-items: center;
}
.drag-verify {
  width: 100%;
  .range {
    background-color: #ececee;
    position: relative;
    border-radius: 4px;
    transition: 1s all;
    user-select: none;
    color: #666;
    overflow: hidden;
    height: 40px;
    .flex();
    &.success {
      background-color: @theme;
      color: #fff;
      .text {
        position: relative;
        z-index: 1;
      }
      .block i {
        color: @theme;
      }
    }
    .block {
      display: block;
      position: absolute;
      left: calc(-100% + 40px);
      width: 100%;
      height: 99%;
      background: @theme;
      border-radius: 4px;
      overflow: hidden;
      i {
        position: absolute;
        right: 0;
        width: 40px;
        height: 100%;
        font-size: 16px;
        color: #c8c9cc;
        background-color: #fff;
        border: 1px solid #e5e5e5;
        border-radius: 4px;
        cursor: pointer;
        box-sizing: border-box;
        .flex();
      }
      .i_slide_right {
        color: @grey;
      }
    }
  }
}
</style>