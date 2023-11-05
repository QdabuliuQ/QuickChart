<template>
  <div :style="{
    width: props.width,
    height: props.height,
  }" class="screenCanvas">
    <div class="opacityBg">
      <div
        class="mainCanvas"
        :style="{
        [common.screenOption.canvas.bgType === 'color' ? 'background' : 'background-image']: common.getScreenOptionOfCanvas.bgType === 'color' ? common.getScreenOptionOfCanvas.bgColor : `url(${common.screenOption.canvas.bgImage})`,
        fontSize: common.getScreenOptionOfCanvas.fontSize,
        color: common.getScreenOptionOfCanvas.color,
        backgroundRepeat: common.getScreenOptionOfCanvas.backgroundRepeat,
        backgroundSize: common.getScreenOptionOfCanvas.backgroundSize
      }"
      >
        <drag-items />
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import DragItems from "./dragItems.vue";
import useCommonStore from "@/store/common";
interface IProps {
  width: string
  height: string
}

const props = defineProps<IProps>()
const common = useCommonStore()

</script>
<style lang="less">
.screenCanvas {
  flex: 1;
  overflow: scroll;
  .scrollContainer();
  .opacityBg {
    width: 870px;
    height: 550px;
    margin: 75px auto;
    background-image: url("../../../assets/image/bg.jpg");
    background-repeat: repeat;
    background-size: cover;
  }
  .mainCanvas {
    width: 100%;
    height: 100%;
    position: relative;
  }
}
</style>