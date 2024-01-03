<template>
  <div ref="scrollTextRef" class="scroll-text-element">
    <div
      ref="scrollTextMainRef"
      class="scroll-text-main">
      {{ props.text }}
    </div>
  </div>
</template>
<script setup lang="ts">
// animationDuration: scrollTextMainRef && scrollTextMainRef.offsetWidth / 150 + 's'
import {onMounted, onUnmounted, ref} from "vue";

interface IProps {
  text: string
}

const props = defineProps<IProps>()
const scrollTextMainRef = ref<HTMLDivElement>()
const scrollTextRef = ref<HTMLDivElement>()
const width = ref<number>(0)

onMounted(() => {
  let timer: NodeJS.Timeout;
  function startMarquee() {
    const marqueeText = scrollTextMainRef.value as HTMLDivElement;
    const containerWidth = (scrollTextRef.value as HTMLDivElement).offsetWidth;
    const textWidth = marqueeText.offsetWidth;
    let position = containerWidth;

    function moveText() {
      position--;
      if (position < -textWidth) {
        position = containerWidth;
      }
      marqueeText.style.left = position + "px";
      requestAnimationFrame(moveText);
    }

    moveText();
  }

  startMarquee();

  // 创建 MutationObserver 对象
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "style"
      ) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          console.log("change")
          startMarquee(); // 容器宽度变化后重新启动走马灯效果
        }, 50)
      }
    });
  });

  // 监听容器样式属性变化
  observer.observe(scrollTextRef.value as HTMLDivElement, {attributes: true});
})

onUnmounted(() => {

})

</script>

<style lang="less">
.scroll-text-element {
  white-space: nowrap;

  .scroll-text-main {
    position: absolute;
    white-space: nowrap;
  }
}
</style>