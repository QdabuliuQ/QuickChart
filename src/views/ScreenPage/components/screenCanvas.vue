<template>
  <div class="screenCanvas">
    <context-menu
      @contextmenu="contextmenu"
      @select="selectItem"
      :menu="menu">
      <div class="opacityBg" :style="{
        width: size[0] + 'px',
        height: size[1] + 'px'
      }">
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
    </context-menu>
  </div>
</template>
<script setup lang="ts">
import useStore from "@/store";
import useProxy from "@/hooks/useProxy";
import {onMounted, onUnmounted, reactive} from "vue";
import {postScreenImage} from "@/network/screen";
import ContextMenu from "@/components/contextMenu.vue";
import DragItems from "./dragItems.vue";
import FunctionBtn from "@/views/ScreenPage/components/functionBtn.vue";
import LayerPanel from "@/views/ScreenPage/components/layerPanel.vue";
import {uuid} from "@/utils";

interface IProps {
  width: string
  height: string
}

const props = defineProps<IProps>()
const {screen}: any = useStore()
const menu = [
  {
    label: '粘贴',
    icon: "i_paste"
  },
  {
    label: '清空剪切板',
    icon: "i_clear"
  }
]
const size = reactive<[number, number]>([0, 0])
const proxy = useProxy()
const exportImage = async ({size, type}: any) => {
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
  if (res.status) {
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

const selectItem = ({label}: {label: string}) => {
  switch (label) {
    case '粘贴':
      if (screen.getTmpElement) {
        let element = screen.getTmpElement
        element.id = uuid(6, 36)
        element.style.translateX = lastPoint[0]
        element.style.translateY = lastPoint[1]
        screen.addScreenOptionOfElements(element)
        screen.setTmpElement(null)  // 清空粘贴的元素
      }
      break;
    case '清空剪切板':
      if (screen.getTmpElement) {
        screen.setTmpElement(null)
      }
      break;
  }
}

const lastPoint: [number, number] = [0, 0]
const contextmenu = (point: [number, number]) => {
  lastPoint[0] = point[0]
  lastPoint[1] = point[1]
}

onMounted(() => {
  let container = document.getElementsByClassName("screenCanvas")[0]
  size[0] = container.clientWidth * 0.95
  size[1] = size[0] * document.documentElement.clientHeight / document.documentElement.clientWidth
})

onUnmounted(() => {
  proxy.$Bus.off("exportImage", exportImage)
})

</script>
<style lang="less">
.screenCanvas {
  flex: 1;
  overflow: scroll;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .scrollContainer();

  .btn-container {
    position: absolute;
    bottom: 15px;
    left: 25px;
  }

  .opacityBg {
    //width: 1070px;
    //height: 652px;
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