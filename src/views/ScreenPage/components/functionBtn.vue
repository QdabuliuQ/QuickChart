<template>
  <div @click="emits('clickEvent')" class="function-btn">
    <i :class="['iconfont', props.icon]"></i>
  </div>
</template>
<script setup lang="ts">

interface IProps {
  icon: string
}
const props = defineProps<IProps>()
const emits = defineEmits(['clickEvent'])
</script>
<style lang="less">
.function-btn {
  padding: 15px;
  color: #fff;
  background-color: #4b4b4b;
  border-radius: 50%;
  cursor: pointer;
  
  &:hover {
    background-color: #676767;
  }
  .iconfont {
    font-size: 20px;
  }
}
</style>