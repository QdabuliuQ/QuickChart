<template>
  <div class="ChartPage">
    <div class="pageTitle">我的图表</div>
    <div v-if="charts.length" class="chartContainer">

    </div>
    <el-empty v-else description="暂无图表" />
  </div>
</template>
<script setup lang="ts">
import {reactive} from "vue";

const charts = reactive([])
</script>
<style lang="less">
.ChartPage {
  .el-empty {
    padding: 80px 0;
  }
}
</style>