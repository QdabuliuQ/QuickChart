<template>
  <div ref="marqueeRef" class="marquee-element">
    <span ref="marqueeTextRef" class="marquee-text">{{ props.content }}</span>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import {debounce} from "@/utils";

interface IProps {
  content: string
  speed: number
}

const props = defineProps<IProps>()
const marqueeRef = ref<HTMLDivElement>()
const marqueeTextRef = ref<HTMLDivElement>()
const textWidth = ref<number>()
const width = ref<number>(0)

onMounted(() => {
  function startMarquee() {
    textWidth.value = (marqueeTextRef.value as HTMLDivElement).offsetWidth
    let position = (marqueeRef.value as HTMLDivElement).offsetWidth;
    function moveText() {
      position = position - props.speed;
      if (position < - (textWidth.value as number)) {
        position = (marqueeRef.value as HTMLDivElement).offsetWidth;
      }
      (marqueeTextRef.value as HTMLDivElement).style.left = position + "px";
      requestAnimationFrame(moveText);
    }
    moveText();
  }
  startMarquee();

  // 监听text文化宽度是否发生变化 重新获取宽度
  let observer = new MutationObserver(debounce(() => {
    textWidth.value = (marqueeTextRef.value as HTMLDivElement).offsetWidth
  }, 100));

  observer.observe(marqueeRef.value as HTMLDivElement, {
    attributes: true,//检测属性变动
  });

  return () => {
    // 取消监听
    observer.disconnect();
  }
})

</script>

<style lang="less">
.marquee-element {
  overflow: hidden;
  position: relative;

  .marquee-text {
    white-space: nowrap;
    position: absolute;
  }
}
</style>