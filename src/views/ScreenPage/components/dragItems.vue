<template>
  <div class="dragItems">
    <context-menu
      :menu="item.isLock ? lockMenu : unlockMenu"
      @select="(info: any) => selectElement(info, idx as number)"
      v-for="(item, idx) in screen.screenOption.elements"
    >
      <img
        :class="['dragItem', 'item_' + idx]"
        v-if="item.type === 'chart'"
        @click="itemClick(idx as number, $event)"
        :style="{
          width: item.style.width + 'px',
          height: item.style.height + 'px',
          transform: `translate(${item.style.translateX}px, ${item.style.translateY}px) rotate(${item.style.rotate}deg)`,
          zIndex: item.style.zIndex
        }"
        :src="item.cover"/>
      <div
        :class="['dragItem', 'item_' + idx]"
        v-else-if="item.type === 'text'"
        @click="itemClick(idx as number, $event)"
        :style="{
          width: item.style.width + 'px',
          height: item.style.height + 'px',
          transform: `translate(${item.style.translateX}px, ${item.style.translateY}px) rotate(${item.style.rotate}deg)`,
          zIndex: item.style.zIndex,
          fontSize: item.style.fontSize + 'px',
          fontWeight: item.style.fontWeight,
          color: item.style.color,
          textAlign: item.style.textAlign,
          fontStyle: item.style.fontStyle,
          letterSpacing: item.style.letterSpacing + 'px',
          lineHeight: item.style.lineHeight + 'px',
          textDecorationLine: item.style.textDecorationLine,
          textDecorationColor: item.style.textDecorationColor,
          textDecorationStyle: item.style.textDecorationStyle,
        }"
      >
        <span
          class="textInfo"
          :contenteditable="!item.isLock"
          @click.stop="null"
          :style="{
            backgroundColor: item.style.backgroundColor
          }"
        >{{ item.content }}</span>
      </div>
      <div
        @click="itemClick(idx as number, $event)"
        :class="['dragItem', 'item_' + idx]"
        v-else-if="item.type === 'shape'"
        :style="{
          width: item.style.width + 'px',
          height: item.style.height + 'px',
          transform: `translate(${item.style.translateX}px, ${item.style.translateY}px) rotate(${item.style.rotate}deg)`,
          zIndex: item.style.zIndex,
          filter: `drop-shadow(${item.style.shadowColor} ${item.style.shadowX}px ${item.style.shadowY}px ${item.style.shadowBlur}px)`
        }"
      >
        <svg
          width="100%"
          height="100%"
        >
          <g :transform="`scale(${item.style.width / item.viewBox[0]}, ${item.style.height / item.viewBox[1]}) translate(0,0) matrix(1,0,0,1,0,0)`">
            <path
              class="outlined"
              vector-effect="non-scaling-stroke"
              stroke-linecap="butt"
              stroke-miterlimit="8"
              :fill="item.style.fill"
              :stroke="item.style.stroke"
              :stroke-width="item.style.strokeWidth"
              :d="item.path"
            ></path>
          </g>
        </svg>
      </div>
      <img
        :class="['imgElement', 'dragItem', 'item_' + idx]"
        v-else-if="item.type === 'image'"
        @click="itemClick(idx as number, $event)"
        :style="{
          width: item.style.width + 'px',
          height: item.style.height + 'px',
          transform: `translate(${item.style.translateX}px, ${item.style.translateY}px) rotate(${item.style.rotate}deg)`,
          zIndex: item.style.zIndex,
          border: `${item.style.borderWidth}px ${item.style.borderType} ${item.style.borderColor}`,
          boxShadow: `${item.style.shadowX}px ${item.style.shadowY}px ${item.style.shadowBlur}px ${item.style.shadowColor}`
        }"
        :src="item.url"
      />
    </context-menu>
    <Moveable
      :target="target"
      :ables="[Deleteable]"
      :props="({ deleteable: true })"
      :draggable="true"
      :resizable="true"
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
      @drag-end="dragEnd"
      @rotate="onRotate"
      @resize="onResize"
    />
  </div>
</template>
<script setup lang="ts">
import Moveable from "vue3-moveable";
import useProxy from "@/hooks/useProxy";
import {onMounted, onUnmounted, reactive, ref, watch} from "vue";
import useStore from "@/store";
import {ElementTypeProperties, IStyle} from "@/types/screen";
import {debounce} from "@/utils";
import ContextMenu from "@/components/contextMenu.vue";
import {useCopyElement} from "@/hooks/useCopyElement";
import {cutElement, lockElement, unlockElement} from "@/utils/screenUtil";

const proxy = useProxy()
const {screen} = useStore()
const target = ref<HTMLElement | null>(null)
const bounds = {
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  position: "css",
}
const elementGuidelines = reactive<Array<string>>([])
const unlockMenu = [
  {
    label: '复制',
    icon: "i_copy"
  },
  {
    label: '剪切',
    icon: "i_cut"
  },
  {
    label: '上移一层',
    icon: "i_top"
  },
  {
    label: '下移一层',
    icon: "i_down"
  },
  {
    label: '锁定',
    icon: "i_lock"
  },
  {
    label: '删除',
    icon: "i_delete_2"
  }
]
const lockMenu = [
  {
    label: '解锁',
    icon: "i_unlock"
  },
]


const onRender = (e: any) => {
  e.target.style.cssText += e.cssText;
}

let [element, getElementByNewPoint] = useCopyElement()
const selectElement = (info: any, idx: number) => {
  switch (info.label) {
    case '剪切':
      (element as any).value = screen.getScreenOptionOfElements[idx]
      cutElement(idx)
      target.value = null
      break
    case '复制':
      (element as any).value = screen.getScreenOptionOfElements[idx]
      break
    case '锁定':
      lockElement(idx)
      target.value = null
      break
    case '解锁':
      unlockElement(idx)
      break
    case '删除':
      deleteChart(idx)
  }
}

const itemClick = (idx: number, e: any) => {
  e.stopPropagation()
  if (target.value) updateElementStyle(target.value, screen.getCurElementIdx)
  if (screen.getScreenOptionOfElements[idx].isLock) {
    target.value = null  // 清空
  } else {
    target.value = e.currentTarget  // 设置为选定的元素
    screen.updateCurElementIdx(idx)  // 设置选中元素索引值
  }
}

const updateElementStyle = (target: HTMLElement, idx: number) => {
  if (idx <= -1 || !target) return
  let i = 0
  let styleInfo: {
    [propName: string]: any
  } = {}
  while (target.style[i]) {
    styleInfo[target.style[i]] = target.style[target.style[i] as any]
    i++
  }
  let [x,y,d] = styleInfo['transform'] ? styleInfo['transform'].match(/\d+(\.\d+)?/g).map((item: string) => parseFloat(item)) : [0,0,0,1,1]
  let info: IStyle = {
    width: styleInfo.width ? parseFloat(styleInfo.width) : 0,
    height: styleInfo.height ? parseFloat(styleInfo.height) : 0,
    translateX: x ? x : 0,
    translateY: y ? y : 0,
    rotate: d ? d : 0,
    zIndex: parseInt(styleInfo['z-index'])
  }
  if (screen.getScreenOptionOfElements[idx].type === 'text') {
    setStyle(styleInfo, info)
  } else if(screen.getScreenOptionOfElements[idx].type === 'shape') {
    setShapeStyle(info, idx)
  } else if (screen.getScreenOptionOfElements[idx].type === 'image') {
    setImageStyle(info, idx)
  }
  screen.updateScreenOptionOfElementStyle(info, idx)
}

const isVisited = new Set(['transform', 'width', 'height', 'z-index'])
const setStyle = (styleInfo: any, info: any) => {
  for(let key in styleInfo) {
    if (!styleInfo.hasOwnProperty(key) || isVisited.has(key)) continue
    let _key = key
    if(/-\w/.test(key)) {
      key = key.replace(/-\w/g, (char: string) => char[1].toUpperCase())
    }
    info[key] = /\d+px/.test(styleInfo[_key]) ? parseInt(styleInfo[_key]) : styleInfo[_key]
  }
}
const setShapeStyle = (info: any, idx: number) => {  // 更新形状样式
  const rootDom = document.getElementsByClassName("dragItem")[idx] as HTMLElement
  const pathDom: HTMLElement = rootDom.childNodes[0].childNodes[0].childNodes[0] as HTMLElement
  let [shadowX, shadowY, shadowBlur] = (rootDom.style.filter.match(/\d+px/g) as any).map((item: string) => parseInt(item))
  info['shadowX'] = shadowX
  info['shadowY'] = shadowY
  info['shadowBlur'] = shadowBlur
  info['shadowColor'] = rootDom.style.filter.substring(rootDom.style.filter.indexOf('(')+1, rootDom.style.filter.indexOf(')')+1)
  info['fill'] = pathDom.getAttribute("fill")
  info['stroke'] = pathDom.getAttribute("stroke")
  info['strokeWidth'] = parseInt(pathDom.getAttribute("stroke-width") as string)

}
const setImageStyle = (info: any, idx: number) => {
  const dom = document.getElementsByClassName("dragItem")[idx] as HTMLElement
  let style: any = dom.style
  let i: number = style.boxShadow.indexOf(')')+1
  let shadowColor = style.boxShadow.substring(0, i)
  let shadowStyle = style.boxShadow.substring(i+1)
  let [shadowX, shadowY, shadowBlur] = shadowStyle.split(" ")
  info['shadowX'] = parseInt(shadowX)
  info['shadowY'] = parseInt(shadowY)
  info['shadowBlur'] = parseInt(shadowBlur)
  info['shadowColor'] = shadowColor;
  info['borderWidth'] = parseInt(style.borderWidth)
  info['borderType'] = style.borderStyle
  info['borderColor'] = style.borderColor
  console.log("info", info)
}

const cancelClickEvent = (e: any) => {
  if (target.value) updateElementStyle(target.value as HTMLElement, screen.getCurElementIdx)
  target.value = null
  screen.updateCurElementIdx(-1)
}

const setElementGuidelines = () => {  // 设置元素引导线
  elementGuidelines.length = 0
  for (let i = 0; i < screen.screenOption.elements.length; i++) {
    elementGuidelines.push('.item_' + i)
  }
}

const deleteChart = (idx: number = screen.getCurElementIdx) => {  // 删除图表回调
  screen.deleteScreenOptionOfElements(idx)
  target.value = null  // 选中元素设置为 null
  screen.updateCurElementIdx(-1)
}

// 停止拖动
const dragEnd = debounce(() => {
  if (target.value) {
    // 更新元素样式
    updateElementStyle(target.value as HTMLElement, screen.getCurElementIdx)
  }
}, 50)

const onRotate = dragEnd  // 旋转
const onResize = dragEnd  // 缩放

let closeImg = require("@/assets/image/close.png")
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
      React.createElement("img", {
        src: closeImg,
        style: {
          width: '21px',
          height: '21px',
          cursor: 'pointer'
        },
        onClick: () => deleteChart(screen.getCurElementIdx)
      }),
    ]);
  }
}

let stop = watch(() => screen.screenOption.elements, () => {
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
  [contenteditable] {
    outline: none;
    border: 0;
    width: 100%;
  }

  [contenteditable]:focus {
    outline: 1px solid @theme;
  }
  .imgElement {
    -webkit-user-drag: none;
  }
  .dragItem {
    position: absolute;
    overflow: hidden;
    .textInfo {
      word-break: break-all;
    }
  }
}
</style>