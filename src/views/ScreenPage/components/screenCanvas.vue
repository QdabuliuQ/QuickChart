<template>
  <div :style="{
    width: props.width,
    height: props.height,
  }" class="screenCanvas">
    <div class="opacityBg">
      <div
        class="mainCanvas"
        :style="{
        [screen.screenOption!.canvas.bgType === 'color' ? 'background' : 'background-image']: screen.getScreenOptionOfCanvas.bgType === 'color' ? screen.getScreenOptionOfCanvas.bgColor : `url(${screen.screenOption.canvas.bgImage})`,
        fontSize: screen.getScreenOptionOfCanvas.fontSize,
        color: screen.getScreenOptionOfCanvas.color,
        backgroundRepeat: screen.getScreenOptionOfCanvas.backgroundRepeat,
        backgroundSize: screen.getScreenOptionOfCanvas.backgroundSize
      }"
      >
        <drag-items />
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import html2canvas from 'html2canvas';
import DragItems from "./dragItems.vue";
import useStore from "@/store";
import useProxy from "@/hooks/useProxy";
import {onUnmounted} from "vue";
interface IProps {
  width: string
  height: string
}

const props = defineProps<IProps>()
const {screen}: any = useStore()

const proxy = useProxy()

const exportImage = () => {
  html2canvas(document.getElementsByClassName('mainCanvas')[0] as HTMLElement, {
    scale: 1,
    logging:false,
    useCORS:true
  }).then(canvas => {
    let img = document.createElement('a');
    img.href = canvas.toDataURL("image/png")
    img.download = 'quickchart.png';
    img.click();
  })
}
proxy.$Bus.on("exportImage", exportImage)

onUnmounted(() => {
  proxy.$Bus.off("exportImage", exportImage)
})

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