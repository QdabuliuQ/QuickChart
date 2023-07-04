<template>
  <div class="graphicComItem">
    <div
        @click="toggleItem(idx)"
        :class="['comItem', idx == aIdx ? 'activeItem' : '']"
        v-for="(item, idx) in props.components">
      {{ getTypeName(item.type.value) }}
      <i @click.stop="deleteItem(idx)" class="iconfont i_close"></i>
    </div>
    <el-dropdown trigger="click">
      <div class="comItem">
        <i class="iconfont i_plus"></i>
        添加组件
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item class="componentDropdownItem" @click="addItem('image')">图形组件</el-dropdown-item>
          <el-dropdown-item class="componentDropdownItem" @click="addItem('text')">文本组件</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  defineEmits
} from "vue";
let props = defineProps<{
  components: any[]
}>()
const emits = defineEmits([
    'addItem',
    'toggleItem',
    'deleteItem'
])
let aIdx = ref<number>(0)

const deleteItem = (idx: number) => {
  emits('deleteItem', idx)
}
const toggleItem = (idx: number) => {
  aIdx.value = idx
  emits('toggleItem', idx)
}
const addItem = (type: string) => {
  emits('addItem', type)
}
const getTypeName = (type: string) => {
  switch (type) {
    case "image":
      return "图形组件"
    case "text":
      return "文本组件"
  }
}
</script>

<style lang="less">
.componentDropdownItem {
  font-size: 13px;
}
.graphicComItem {
  display: flex;
  flex-wrap: wrap;
  .comItem {
    margin: 0 10px 10px 0;
    padding: 6px 15px;
    font-size: 12px;
    border-radius: 15px;
    cursor: pointer;
    color: #b8b8b8;
    border: 1px solid #575757;
    transition: .2s all linear;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: #4f4f4f;
    }
    .i_plus {
      font-size: 12px;
      margin-right: 8px;
    }
    .i_close {
      font-size: 12px;
      margin-left: 8px;
      &:hover {
        color: #f54040;
      }
    }
  }
  .activeItem {
    background-color: @theme !important;
    color: #fff;
  }
}
</style>