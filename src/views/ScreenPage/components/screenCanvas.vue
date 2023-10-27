<template>
  <div :style="{
    width: props.width,
    height: props.height
  }" class="screenCanvas">
    <div class="mainCanvas">
      <drag-items v-model:options="options">
      </drag-items>
    </div>
  </div>
</template>
<script setup lang="ts">
import moveItem from "./moveItem.vue"
import useProxy from "@/hooks/useProxy";
import {onMounted, onUnmounted, reactive} from "vue";
import DragItems from "./dragItems.vue";
interface IProps {
  width: string
  height: string
}
interface IStyle {
  width?: string
  height?: string
  transform?: string
}
interface IShape {
  style: IStyle
  type: "text" | "chart"
}
interface IText extends IShape {
  content: string
}
interface IChart extends IShape {
  cover: string
}

const options = reactive<Array<any>>([{
  style: {
    width: '200px',
    height: "130px",
    transform: `translate(100px, 100px) rotate(0deg)`
  },
  cover: 'http://127.0.0.1:3031/chartCover/type9/VY4RV4HY39MNEQUXHRIB.octet-stream',
  type: "chart",
}])
const props = defineProps<IProps>()
const proxy = useProxy()

const items = reactive<(IText | IChart)[]>([])

const chartInsert = (info: any) => {
  let chart: IChart = {
    style: {
      width: '200px',
      height: "130px",
      transform: `translate(100px, 100px) rotate(0deg)`
    },
    cover: info.cover,
    type: "chart",
  }
  options.push(chart)
}
const chartChange = ({info, idx}: any) => {
  options[idx].style = {
    width: info.width + 'px',
    height: info.height + 'px',
    transform: `translate(${info.x}px, ${info.y}px) rotate(${info.d}deg) scale(${info.sx ? info.sx : 1}, ${info.sy ? info.sy : 1})`
  }
}

onMounted(() => {
  proxy.$Bus.on("chartSelect", chartInsert)
  proxy.$Bus.on("chartChange", chartChange)
})

onUnmounted(() => {
  proxy.$Bus.off("chartSelect", chartInsert)
  proxy.$Bus.off("chartChange", chartChange)
})

</script>
<style lang="less">
.screenCanvas {
  flex: 1;
  overflow: scroll;
  .scrollContainer();
  .mainCanvas {
    width: 870px;
    height: 550px;
    background-color: #fff;
    margin: 75px auto;
    position: relative;
  }
}
</style>