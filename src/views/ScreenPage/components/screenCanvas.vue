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
const exportImage = async ({size, type}: any) => {
  console.log(size, type)
  let loading = proxy.$loading({
    lock: true,
    text: "正在导出图片，请稍后...",
    background: "rgba(0, 0, 0, 0.7)",
  })
  let res: any = await postScreenImage({  // 发起请求在后端生成
    option: JSON.stringify(screen.getScreenOption),
    width: size[0],
    height: size[1],
    c_width: document.getElementById("dragElement")?.clientWidth.toString() as string,
    c_height: document.getElementById("dragElement")?.clientHeight.toString() as string,
    type
  })
  loading.close()
  if(res.status) {
    let link = document.createElement("a")
    link.href = res.img
    link.download = `screen.${type}`;
    link.click()
    proxy.$notice({
      type: "success",
      message: "图片下载成功",
      position: "top-left"
    })
  }
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
    width: 1070px;
    height: 652px;
    margin: 40px auto;
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