<template>
  <div class="series-item">
    <div class="item-title">
      <span v-if="props.title !== 'slot'">{{ props.title }}</span>
      <slot v-else name="title"></slot>
    </div>
    <div class="option-operation">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  title: string
}
const props = defineProps<IProps>()
</script>

<style lang='less'>
.series-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 6px 0;
  font-size: 12px;
  color: #a9a8a8;
  .item-title {
    position: relative;
    top: 4px;
  }
  .option-operation {
    display: flex;
    justify-content: flex-end;
    width: 55%;
  }
}
</style>