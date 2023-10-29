<template>
  <div class="dragItems">
    <template v-for="(item, idx) in props.options">
      <img
        :class="['dragItem', 'item_' + idx]"
        v-if="item.type === 'chart'"
        @click="itemClick(idx, $event)"
        :style="{
          width: item.style.width,
          height: item.style.height,
          transform: item.style.transform
        }"
        :src="(item as IChart).cover"/>
      <span
        :class="['dragItem', 'item_' + idx]"
        v-else-if="item.type === 'text'"
        @click="itemClick(idx, $event)"
        style="display: inline-block"
      >{{ (item as IText).content }}</span>
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
import {nextTick, onMounted, onUnmounted, reactive, ref, watch} from "vue";

interface IStyle {
  width: string
  height: string
  transform: string
}

interface IShape {
  style: IStyle
  type: "text" | "chart"
}

interface IText extends IShape {
  content: string
}

interface IChart extends IShape {
  cover: string
}

interface IProps {
  options: Array<IChart | IText>
}

const emits = defineEmits([
  "update:options"
])

const proxy = useProxy()
const props = defineProps<IProps>()
const target = ref<HTMLElement | null>(null)
const targetIdx = ref<number>(-1)
const bounds = {
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  position: "css",
}
const elementGuidelines = reactive<Array<string>>([])

let timer: any = null
const onRender = (e: any) => {
  e.target.style.cssText += e.cssText;
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    let i = 0
    let styleInfo: {
      [propName: string]: any
    } = {
      style: {}
    }
    while (e.target.style[i]) {
      styleInfo.style[e.target.style[i]] = e.target.style[e.target.style[i]]
      i++
    }
    proxy.$Bus.emit("updateStyle", styleInfo)
  }, 500)
}

const itemClick = (idx: number, e: any) => {
  e.stopPropagation()
  if (target.value) updateElementStyle(target.value, targetIdx.value)
  nextTick(() => {
    targetIdx.value = idx
    target.value = e.target
    proxy.$Bus.emit("selectItem", {
      info: JSON.parse(JSON.stringify(props.options[idx])),
      idx
    })
  })
}

const updateElementStyle = (target: HTMLElement, idx: number) => {
  if (idx <= -1 || !target) return
  let styles = target.style.cssText.replace(/\s/g, '').split(";").filter(item => Boolean(item))
  let styleInfo: {
    [propName: string]: any
  } = {}
  for (let item of styles) {
    let [key, val] = item.split(":")
    styleInfo[key] = val
  }
  props.options[idx].style = styleInfo as any
  emits("update:options", props.options)
  proxy.$Bus.emit("selectItem", null)
}

const cancelClickEvent = (e: any) => {
  let doms = document.getElementsByClassName("dragItem")
  if (doms) updateElementStyle(target.value as HTMLElement, targetIdx.value)
  target.value = null
  targetIdx.value = -1
}

const setElementGuidelines = () => {  // 设置元素引导线
  elementGuidelines.length = 0
  for (let i = 0; i < props.options.length; i++) {
    elementGuidelines.push('.item_' + i)
  }
}

const deleteChart = (idx: number) => {  // 删除图表回调
  props.options.splice(targetIdx.value, 1)  // 删除配置对象
  emits("update:options", props.options)  // 更新
  targetIdx.value = -1  // 选中索引设置为 -1
  target.value = null  // 选中元素设置为 null
  proxy.$Bus.emit("selectItem", null)  // 关闭右侧选项卡
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
        onClick: () => deleteChart(targetIdx.value)
      }),
    ]);
  }
}

let stop = watch(() => props.options, () => {
  setElementGuidelines()
}, {
  deep: true,
  immediate: true
})

onMounted(() => {
  document.documentElement.addEventListener("click", cancelClickEvent)
  proxy.$Bus.on("deleteChart", deleteChart)
})

onUnmounted(() => {
  document.documentElement.removeEventListener("click", cancelClickEvent)
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