<template>
  <div ref="marqueeRef" class="marquee-element">
    <span ref="marqueeTextRef" class="marquee-text">{{ props.content }}</span>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";

interface IProps {
  content: string
  speed: number
}

const props = defineProps<IProps>()
const marqueeRef = ref<HTMLDivElement>()
const marqueeTextRef = ref<HTMLDivElement>()
const width = ref<number>(0)

onMounted(() => {
  function startMarquee(step = 1) {
    const textWidth = (marqueeTextRef.value as HTMLDivElement).offsetWidth;
    let position = (marqueeRef.value as HTMLDivElement).offsetWidth;
    function moveText() {
      position = position - props.speed;
      if (position < -textWidth) {
        position = (marqueeRef.value as HTMLDivElement).offsetWidth;
      }
      (marqueeTextRef.value as HTMLDivElement).style.left = position + "px";
      requestAnimationFrame(moveText);
    }
    moveText();
  }
  startMarquee(2);
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