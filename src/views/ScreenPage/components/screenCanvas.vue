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
        <drag-items/>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import domtoimage from 'dom-to-image';
import {Canvg} from "canvg";
import html2canvas from 'html2canvas';
import DragItems from "./dragItems.vue";
import useStore from "@/store";
import useProxy from "@/hooks/useProxy";
import {onUnmounted} from "vue";
import {postScreenImage} from "@/network/screen";

interface IProps {
  width: string
  height: string
}

const props = defineProps<IProps>()
const {screen}: any = useStore()

const proxy = useProxy()

const exportImage = async () => {

  domtoimage.toPng(document.getElementById("dragElement"), {})
    .then(function (dataUrl: any) {
      let link = document.createElement('a');
      link.download = 'quickchart.jpeg';
      link.href = dataUrl;
      link.click();
    }).catch(function (error: any) {
    console.error('oops, something went wrong!', error);
  });
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