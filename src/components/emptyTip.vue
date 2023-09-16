<template>
  <div class="emptyTip">
    <el-empty description="找不到相关图表信息">
      <template #image>
        <img style="width: 100%;" src="@/assets/image/empty.png" />
      </template>
    </el-empty>
  </div>
</template>
<script setup lang="ts">

</script>
<style lang="less">
.emptyTip {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .el-empty {
    padding: 0;
  }
  .el-empty__image {
    width: 300px;
  }
  .el-empty__description p{
    font-size: 18px;
  }
}
</style>