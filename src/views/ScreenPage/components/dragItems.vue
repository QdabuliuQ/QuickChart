<template>
  <div class="dragItems">
    <template v-for="(item, idx) in common.screenOption.elements">
      <img
        :class="['dragItem', 'item_' + idx]"
        v-if="item.type === 'chart'"
        @click="itemClick(idx as number, $event)"
        :style="{
          width: item.style.width + 'px',
          height: item.style.height + 'px',
          transform: `translate(${item.style.translateX}px, (${item.style.translateY}px) rotate(${item.style.rotate}deg) scale(${item.style.scaleX}, ${item.style.scaleY})`,
          zIndex: item.style.zIndex
        }"
        :src="item.cover"/>
      <span
        :class="['dragItem', 'item_' + idx]"
        v-else-if="item.type === 'text'"
        @click="itemClick(idx as number, $event)"
        style="display: inline-block"
      >{{ item.content }}</span>
    </template>
    <Moveable
      :target="target"
      :ables="[Deleteable]"
      :props="({ deleteable: true })"
      :draggable="true"
      :scalable="true"
      :rotatable="true"
      :snappable="true"
      :isDisplaySnapDigit="true"
      :snapGap="true"
      :snapRotataionThreshold="5"
      :snapRotationDegrees="[0, 90, 180, 270]"
      :snapDirections='{"top":true,"left":true,"bottom":true,"right":true,"center":true,"middle":true}'
      :elementSnapDirections='{"top":true,"left":true,"bottom":true,"right":true,"center":true,"middle":true}'
      :elementGuidelines="elementGuidelines"
      :bounds="bounds"
      @render="onRender"
    />
  </div>

</template>
<script setup lang="ts">
import Moveable from "vue3-moveable";
import useProxy from "@/hooks/useProxy";
import {onMounted, onUnmounted, reactive, ref, watch} from "vue";
import useCommonStore from "@/store/common";
import {IStyle} from "@/types/common";

const emits = defineEmits([
  "update:options"
])

const proxy = useProxy()
const common = useCommonStore()
const target = ref<HTMLElement | null>(null)
const bounds = {
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  position: "css",
}
const elementGuidelines = reactive<Array<string>>([])

const onRender = (e: any) => {
  e.target.style.cssText += e.cssText;
}

const itemClick = (idx: number, e: any) => {
  e.stopPropagation()
  if (target.value) updateElementStyle(target.value, common.getCurElementIdx)
  common.updateCurElementIdx(idx)  // 设置选中元素索引值
  if (common.getScreenOptionOfElements[idx].isLock) {
    target.value = null  // 清空
  } else {
    target.value = e.target  // 设置为选定的元素
  }
}

const updateElementStyle = (target: HTMLElement, idx: number) => {
  if (idx <= -1 || !target) return
  let i = 0
  let styleInfo: {
    [propName: string]: any
  } = {
  }
  while (target.style[i]) {
    styleInfo[target.style[i]] = target.style[target.style[i] as any]
    i++
  }
  let [x,y,d,sx,sy] = styleInfo['transform'] ? styleInfo['transform'].match(/\d+(\.\d+)?/g).map((item: string) => parseFloat(item)) : [0,0,0,1,1]
  let info: IStyle = {
    width: styleInfo.width ? parseFloat(styleInfo.width) : 0,
    height: styleInfo.height ? parseFloat(styleInfo.height) : 0,
    translateX: x ? x : 0,
    translateY: y ? y : 0,
    rotate: d ? d : 0,
    scaleX: sx ? sx : 1,
    scaleY: sy ? sy : 1,
    zIndex: parseInt(styleInfo['z-index'])
  }
  console.log(info, idx)
  // elements[idx].style = info
  common.updateScreenOptionOfElementStyle(info, idx)
  proxy.$Bus.emit("selectItem", null)
}

const cancelClickEvent = (e: any) => {
  let doms = document.getElementsByClassName("dragItem")
  if (doms) updateElementStyle(target.value as HTMLElement, common.getCurElementIdx)
  target.value = null
  common.updateCurElementIdx(-1)
}

const setElementGuidelines = () => {  // 设置元素引导线
  elementGuidelines.length = 0
  for (let i = 0; i < common.screenOption.elements.length; i++) {
    elementGuidelines.push('.item_' + i)
  }
}

const deleteChart = () => {  // 删除图表回调
  common.deleteScreenOptionOfElements(common.getCurElementIdx)
  target.value = null  // 选中元素设置为 null
  common.updateCurElementIdx(-1)
}

const Deleteable = {
  name: "deleteable",
  props: [],
  events: [],
  render(moveable: any, React: any) {
    const rect = moveable.getRect();
    const EditableViewer = moveable.useCSS("div", `
     {
         position: absolute;
         left: 0px;
         top: 0px;
         will-change: transform;
         transform-origin: 0px 0px;
     }
         `);
    return React.createElement(EditableViewer, {
      key: "dimension-viewer",
      className: "moveable-dimension",
      style: {
        position: "absolute",
        left: `${rect.width / 2}px`,
        top: `${rect.height + 10}px`,
        color: "#ff4242",
        fontSize: "13px",
        willChange: "transform",
        transform: `translate(-50%, 0px)`
      }
    }, [
      React.createElement("i", {
        className: "iconfont i_close",
        onClick: () => deleteChart()
      }),
    ]);
  }
}

let stop = watch(() => common.screenOption.elements, () => {
  setElementGuidelines()
}, {
  deep: true,
  immediate: true
})

onMounted(() => {
  document.getElementsByClassName('mainCanvas')[0].addEventListener("click", cancelClickEvent)
  proxy.$Bus.on("deleteChart", deleteChart)
})

onUnmounted(() => {
  document.getElementsByClassName('mainCanvas')[0].removeEventListener("click", cancelClickEvent)
  proxy.$Bus.off("deleteChart", deleteChart)
  stop()
})

</script>
<style lang="less">
.dragItems {
  width: 100%;
  height: 100%;
  position: relative;

  .dragItem {
    position: absolute;
  }
}
</style>