<template>
  <div class="function-btn">
    <i @click="emits('clickEvent')" :class="['iconfont', props.icon]"></i>
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
  border-radius: 50%;
  background-color: #4b4b4b;
  cursor: pointer;
  
  &:hover {
    background-color: #676767;
  }
  .iconfont {
    font-size: 20px;
  }
}
</style>