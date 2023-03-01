<template>
  <div class="seriesItem">
    <div>{{ title }}</div>
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
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;
  font-size: 12px;
  color: #a9a8a8;

  .optionOperation {
    width: 55%;
    display: flex;
    justify-content: flex-end;
  }
}
</style>