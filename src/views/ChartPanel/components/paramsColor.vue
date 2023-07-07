<template>
  <div class="paramsColor">
    <div v-for="(item, idx) in colors" class="colorItem">
      <el-color-picker show-alpha v-model="colors[idx]" />
      <i @click="deleteItem(idx)" class="iconfont i_delete"></i>
    </div>
    <div @click="addItem" class="addBtn">
      <i class="iconfont i_jia"></i>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {
  watch,
  reactive
} from "vue";
import useProxy from "@/hooks/useProxy";
import useCommonStore from "@/store/common";
import {debounce} from "@/utils";
const proxy = useProxy()
const _common: any = useCommonStore()
const colors = reactive<string[]>(_common.option.color)

const deleteItem = (idx: number) => {
  colors.splice(idx, 1)
}
const addItem = () => {
  if(colors.length <= 100) {
    colors.push('#000')
  }
}

watch(() => colors, debounce(() => {
  console.log(colors)
  proxy.$Bus.emit("optionChange", {
    color: [...colors],
  });
}, 500), {
  deep: true
})
</script>

<style lang='less'>
.paramsColor {
  margin: 10px 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  .colorItem {
    display: flex;
    align-items: center;
    .iconfont {
      margin-left: 3px;
      cursor: pointer;
      &:hover {
        color: #f32c2c;
      }
    }
  }
  .addBtn {
    width: 31px;
    height: 31px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    border: 1px solid #5c5c5c;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
      background-color: #4f4b4b;
    }
    .iconfont {
      font-size: 13px;
      position: relative;
      top: .5px;
    }
  }
}
</style>