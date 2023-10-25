<template>
  <div class="dragItems">
    <template v-for="(item, idx) in props.options">
      <img
        :class="['dragItem', 'item_' + idx]"
        v-if="item.type === 'chart'"
        @click="itemClick"
        :style="{
          width: item.style.width,
          height: item.style.height,
          transform: item.style.transform
        }"
        :src="(item as IChart).cover"/>
      <span
        :class="['dragItem', 'item_' + idx]"
        v-else-if="item.type === 'text'"
        @click="itemClick"
        style="display: inline-block"
      >{{ (item as IText).content }}</span>
    </template>
    <Moveable
      :target="target"
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

const props = defineProps<IProps>()
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

const itemClick = (e: any) => {
  e.stopPropagation()
  target.value = e.target
}

const cancelClickEvent = (e: any) => {
  let doms = document.getElementsByClassName("dragItem")
  for(let i = 0; i < doms.length; i ++) {
    if (doms[i] == target.value) {
      let styles = (target.value as HTMLElement).style.cssText.replace(/\s/g, '').split(";").filter(item => Boolean(item))
      console.log(styles)
      let styleInfo: {
        [propName: string]: any
      } = {}
      for(let item of styles) {
        let [key, val] = item.split(":")
        styleInfo[key] = val
      }
      props.options[i].style = styleInfo as any
      emits("update:options", props.options)
      break
    }
  }
  target.value = null
}

const setElementGuidelines = () => {
  elementGuidelines.length = 0
  for(let i = 0; i < props.options.length; i ++) {
    elementGuidelines.push('.item_' + i)
  }
}

watch(() => props.options, () => {
  nextTick(() => {
    setElementGuidelines()
  })
}, {
  deep: true,
  immediate: true
})

onMounted(() => {
  document.documentElement.addEventListener("click", cancelClickEvent)
})

onUnmounted(() => {
  document.documentElement.removeEventListener("click", cancelClickEvent)
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