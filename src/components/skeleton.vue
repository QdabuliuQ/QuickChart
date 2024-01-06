<template>
  <div class="skeleton">
    <div v-show="props.status === '1'" class="skeleton-loading">
      <div v-for="_ in props.count" class="skeleton-container">
        <slot name="template" :setSlotRef="setSlotRef"></slot>
      </div>
    </div>
    <div v-if="props.status === '2'" class="skeleton-content">
      <slot name="content"></slot>
    </div>
    <div v-else-if="props.status === '3'">
      <slot name="empty"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref, watch} from "vue";

type STATUS = '1' | '2'| '3'
const props = withDefaults(defineProps<{
  status: STATUS
  count: number
  loadingClass: string[]
  hiddenClass?: string[]
  color1?: string
  color2?: string
}>(), {
  status: '1',
  count: 1,
  color1: 'rgb(62, 62, 62)',
  color2: 'rgb(73, 73, 73)'
})
const classSet = new Set(props.loadingClass)
const hiddenClass = new Set(props.hiddenClass)
const loadingBGC = `linear-gradient(111deg, ${props.color1} 25%, ${props.color2} 37%, ${props.color1} 63%)`
const slotRef = ref<HTMLElement>()
let slotContainers: NodeListOf<Element> | null = null
const setSlotRef = (el: HTMLElement)=>{
  slotRef.value = el
}

const addAnimationLoadingClass = (dom: HTMLElement) => {
  if(!dom) return
  if (dom.classList) {
    let classList = Array.from(dom.classList)
    for(let _class of classList) {
      if(hiddenClass.has(_class)) {
        dom.classList.add('hidden-content')
        return;
      }
      if(classSet.has(_class)) {
        let style = window.getComputedStyle(dom)
        let val = style.getPropertyValue('border-radius')
        if(val == '0px' || !val) {
          dom.classList.add('border-radius')
        }
        dom.classList.add('skeleton-loading')
        dom.style.backgroundImage = loadingBGC
        break;
      }
    }
  }
  if(dom.childNodes) {
    for(let child of dom.childNodes) {
      addAnimationLoadingClass(child as HTMLElement)
    }
  }
}

let stop = watch(() => props.status, (newVal: STATUS) => {
  console.log("watch --->", newVal)
})

onMounted(() => {
  slotContainers = document.querySelectorAll('.skeleton-container')
  for(let dom of slotContainers) {
    addAnimationLoadingClass(dom.children[0] as HTMLElement)
  }
})

</script>
<style lang="less">
.skeleton {
  user-select: none;
  .hidden-content {
    display: none;
    opacity: 0;
  }
  .border-radius {
    border-radius: 10px;
  }
  .skeleton-loading {
    color: transparent !important;
    background-position: 100% 50%;
    background-size: 400% 100%;
    animation: skeleton-loading 1.4s ease infinite;
  }

  @keyframes skeleton-loading {
    0% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
}
</style>