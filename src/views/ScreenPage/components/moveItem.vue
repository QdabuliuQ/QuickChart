<template>
  <slot :setSlotRef="setSlotRef"></slot>
  <vue3-moveable
    ref="moveableRef"
    :target="[target]"
    :draggable="true"
    :scalable="true"
    :rotatable="true"
    :snappable="true"
    :resizable="true"
    :bounds="bounds"
    @render="onRender"
  />
<!--  <div class="moveItem">-->
<!--    -->
<!--&lt;!&ndash;    <Selecto&ndash;&gt;-->
<!--&lt;!&ndash;      v-if="slotRef"&ndash;&gt;-->
<!--&lt;!&ndash;      :selectableTargets="['.dragItem']"&ndash;&gt;-->
<!--&lt;!&ndash;      :hitRate="0"&ndash;&gt;-->
<!--&lt;!&ndash;      :selectByClick="true"&ndash;&gt;-->
<!--&lt;!&ndash;      :selectFromInside="true"&ndash;&gt;-->
<!--&lt;!&ndash;      :ratio="0"&ndash;&gt;-->
<!--&lt;!&ndash;      @dragStart="onDragStart"&ndash;&gt;-->
<!--&lt;!&ndash;      @selectEnd="onSelectEnd"&ndash;&gt;-->
<!--&lt;!&ndash;      @blur&ndash;&gt;-->
<!--&lt;!&ndash;    />&ndash;&gt;-->
<!--  </div>-->
</template>
<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import Vue3Moveable from "vue3-moveable";
import Selecto from "vue3-selecto";
import useProxy from "@/hooks/useProxy";

interface IProps {
  style: any
}

const bounds = {
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  position: "css",
}
const proxy = useProxy()
const props = defineProps<IProps>()
const slotRef = ref<HTMLElement>()
const moveableRef = ref(null)
const slot = ref(null)
const target = ref<HTMLElement|null>(null)

const onRender = (e: any) => {
  e.target.style.cssText += e.cssText;
}
const clickEvent = (e: any) => {
  target.value = slotRef.value as HTMLElement
}
const cancelClickEvent = (e: any) => {
  console.log(e)
  target.value = null
}
const setSlotRef = (el: HTMLElement) => {
  if (slotRef.value) return
  slotRef.value = el;
  (slotRef.value as HTMLElement).addEventListener("click", clickEvent)
  document.documentElement.addEventListener("click", cancelClickEvent)
  slotRef.value!.style.width = props.style.width
  slotRef.value!.style.height = props.style.height
  slotRef.value!.style.position = "absolute"
  slotRef.value!.style.transform = `translate(${props.style.x}, ${props.style.y}) rotate(${props.style.deg}`
}

onMounted(() => {
  console.log(moveableRef.value)
})

onUnmounted(() => {
  (slotRef.value as HTMLElement).removeEventListener("click", clickEvent)
  document.documentElement.removeEventListener("click", cancelClickEvent)
})
</script>
<style lang="less">
</style>