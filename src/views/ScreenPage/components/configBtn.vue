<template>
  <div :style="{
    backgroundColor: props.bgColor
  }" @click="emits('btnClick')" class="deleteBtn">
    <i :class="['iconfont', props.icon]"></i>
    {{props.label}}
  </div>
</template>
<script setup lang="ts">
interface IProps {
  label: string
  icon: string
  bgColor: string
}
const props = defineProps<IProps>()
const emits = defineEmits([
  'btnClick'
])
</script>
<style lang="less">
.deleteBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0 9px 0;
  border-radius: 8px;
  font-size: 13px;
  margin: 6px 0;
  cursor: pointer;
  color: #fff;
  transition: .2s all linear;
  .iconfont {
    margin-right: 5px;
  }
}
</style>