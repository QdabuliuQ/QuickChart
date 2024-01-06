<template>
  <div class="configTitle">
    {{props.title}}
  </div>
</template>
<script setup lang="ts">
interface IProps {
  title: string
}
const props = defineProps<IProps>()
</script>
<style lang="less">
.configTitle {
  position: relative;
  padding: 10px 0;
  font-size: 14px;
  text-align: center;
  color: @theme;
  font-weight: bold;

  &::after {
    position: absolute;
    bottom: 3px;
    left: 50%;
    width: 70px;
    height: 2px;
    background-color: @theme;
    content: '';
    transform: translateX(-50%);
  }
}
</style>