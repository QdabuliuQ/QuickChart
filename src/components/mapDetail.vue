<template>
  <loading v-if="props.loading" text="加载图表中..." />
  <div v-else class="mapDetail">
    <div class="chartContainer">
      <div class="scrollContainer">
        <map-dom />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Loading from "@/components/loading.vue";
import MapDom from "@/components/mapDom.vue";

const props = defineProps<{
  loading: boolean
}>()

</script>
<style lang="less">
.mapDetail {
  width: 100%;
  height: 100%;
  .chartContainer {
    height: 100%;
    .el-scrollbar .el-scrollbar__wrap .el-scrollbar__view {
      white-space: nowrap;
      display: inline-block;
    }

    .el-scrollbar__wrap {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .scrollContainer {
      width: 100%;
      height: 100%;
      overflow: auto;
      position: relative;
      .scrollContainer();
    }
  }
}
</style>