<template>
  <div id="loading">
    <div
      class="loadingContainer"
      :element-loading-text="text"
      element-loading-background="#292929"
      v-loading="isLoading"
    ></div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  onMounted,
  toRefs,
} from "vue";

interface comInitData {
  isLoading: boolean;
}

interface Props {
  text?: string | number;
}

export default defineComponent({
  name: "loading",
  props: {
    text: {
      type: String,
      default: "加载中...",
    },
  },
  setup() {
    const data: comInitData = reactive({
      isLoading: true,
    });
    onMounted(() => {});
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#loading {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 99;
  .loadingContainer {
    width: 100%;
    height: 100%;
  }
  .el-loading-mask {
    z-index: 1;
    .el-loading-spinner .circular {
      width: 54px;
      height: 54px;
    }
    .el-loading-spinner .path {
      stroke: var(--el-color-primary);
    }
    .el-loading-text {
      color: var(--el-color-primary);
    }
  }
}
</style>