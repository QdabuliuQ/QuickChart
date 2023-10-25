<template>
  <div :style="{
    width: props.width,
    height: props.height
  }" class="screenCanvas">
    <div class="mainCanvas">
      <drag-items v-model:options="options">
      </drag-items>
<!--      <moveItem :style="item.style" v-for="item in items">-->
<!--        <template v-slot:default="{ setSlotRef }">-->
<!--          <img-->
<!--            v-if="item.type === 'chart'"-->
<!--            :src="(item as IChart).cover"-->
<!--            :ref="(el)=>setSlotRef(el)"/>-->
<!--          <span-->
<!--            v-else-if="item.type === 'text'"-->
<!--            style="display: inline-block"-->
<!--            :ref="(el)=>setSlotRef(el)"-->
<!--          >{{ (item as IText).content }}</span>-->
<!--        </template>-->
<!--      </moveItem>-->
<!--      <moveItem :style="item.style" v-for="item in items">-->
<!--        <template v-slot:default>-->
<!--          <img-->
<!--            v-if="item.type === 'chart'"-->
<!--            :src="(item as IChart).cover"/>-->
<!--          <span-->
<!--            v-else-if="item.type === 'text'"-->
<!--            style="display: inline-block"-->
<!--          >{{ (item as IText).content }}</span>-->
<!--        </template>-->
<!--      </moveItem>-->
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

const chartSelect = (info: any) => {
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

onMounted(() => {
  proxy.$Bus.on("chartSelect", chartSelect)
})

onUnmounted(() => {
  proxy.$Bus.off("chartSelect", chartSelect)
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