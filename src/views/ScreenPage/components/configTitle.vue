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
  font-size: 14px;
  font-weight: bold;
  margin: 10px 0;
  text-align: center;
  position: relative;
  color: @theme;

  &:after {
    position: absolute;
    content: '';
    width: 70px;
    height: 2px;
    background-color: @theme;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>