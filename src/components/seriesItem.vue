<template>
  <div class="seriesItem">
    <div class="itemTitle">{{ title }}</div>
    <div class="optionOperation">
      <slot></slot>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'seriesItem',
  props: ['title'],
  setup() {
    return {
    }
  }
})
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