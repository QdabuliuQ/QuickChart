<template>
  <el-popover
    ref='shapePopoverRef'
    popper-class="functionListPopoverClass"
    placement="right-start"
    trigger="click"
    :hide-after="0"
  >
    <el-scrollbar height="500px">
      <shape-list @shape-click="shapeClick" />
    </el-scrollbar>
    <template #reference>
      <button-item title="图形" icon="i_shape" tip="插入图形" />
    </template>
  </el-popover>
</template>
<script setup lang="ts">
import {ref} from "vue";
import {ShapePoolItem} from "@/types/shape";
import {getShapeConfig} from "@/utils/screenUtil";
import useStore from "@/store";
import ButtonItem from "./buttonItem.vue";
import ShapeList from "./shapeList.vue";

const shapePopoverRef = ref()
const {screen} = useStore()
const shapeClick = (shape: ShapePoolItem & {idx: number}) => {  // 插入图形
  screen.addScreenOptionOfElements(getShapeConfig({
    viewBox: shape.viewBox,
    path: shape.path,
  } as any))
  shapePopoverRef.value.hide()
}
</script>
<style lang="less">

</style>