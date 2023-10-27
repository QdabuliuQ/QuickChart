<template>
  <div class="seriesItem">
    <div class="itemTitle">
      <span v-if="props.title !== 'slot'">{{ props.title }}</span>
      <slot v-else name="title"></slot>
    </div>
    <div class="optionOperation">
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
.seriesItem {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 6px 0;
  font-size: 12px;
  color: #a9a8a8;
  .itemTitle {
    position: relative;
    top: 4px;
  }
  .optionOperation {
    width: 55%;
    display: flex;
    justify-content: flex-end;
  }
}
</style>