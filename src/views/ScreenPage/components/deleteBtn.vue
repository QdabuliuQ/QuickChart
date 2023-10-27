<template>
  <div @click="emits('btnClick')" class="deleteBtn">
    <i class="iconfont i_delete_2"></i>
    {{props.label}}
  </div>
</template>
<script setup lang="ts">
interface IProps {
  label: string
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
  border: 1px solid rgb(255, 66, 66);
  font-size: 13px;
  margin: 10px 0;
  cursor: pointer;
  color: #fff;
  background-color: rgb(255, 66, 66);
  .iconfont {
    margin-right: 5px;
  }
}
</style>