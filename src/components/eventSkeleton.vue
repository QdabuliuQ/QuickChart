<template>
  <div class="eventSkeleton">
    <div v-for="_ in count" class="skeletonItem">
      <div class="avatar skeletonLoading"></div>
    </div>
  </div>
</template>
<script setup lang="ts">

const props = withDefaults(defineProps<{
  count: number
}>(), {
  count: 1
})

</script>
<style lang="less">
.eventSkeleton {
  .skeletonItem {
    .avatar {
      width: 40px;
      height: 40px;
    }
  }
}
</style>