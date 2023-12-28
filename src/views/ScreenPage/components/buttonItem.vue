<template>
  <div @click="clickEvent" class="button-item" :title="props.tip">
    <i :class="['iconfont', props.icon]"></i>
    {{props.title}}
  </div>
</template>
<script setup lang="ts">

interface IProps {
  icon: string
  title: string
  tip: string
}
const props = defineProps<IProps>()
const emits = defineEmits(['clickEvent'])

const clickEvent = () => {
  emits('clickEvent')
}
</script>
<style lang="less">
.button-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 13px;
  cursor: pointer;
  padding: 15px 20px;
  transition: 0.2s all linear;
  .iconfont {
    margin-bottom: 5px;
    font-size: 23px;
  }
  &:hover {
    background-color: #4d4d4d;
    color: @theme;
  }
}
</style>