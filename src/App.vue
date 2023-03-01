<template>
  <router-view />
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { InitData } from "@/types/App";
import { getCurrentInstance } from "vue";

let timer: any;
export default defineComponent({
  name: "App",
  setup() {
    const _this: any = getCurrentInstance();
    const data = reactive(new InitData());
    onMounted(() => {
      window.addEventListener("resize", () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          data.height = document.documentElement.clientHeight;
          _this.proxy.$Bus.emit("resize", data.height);
        }, 500);
      });
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
  background-color: #282828;
  color: #d0d0d0;
}
::selection {
  background: #ffae3453;
  color: #fff;
}
::-moz-selection {
  background: #ffae3453;
  color: #fff;
}
::-webkit-selection {
  background: #ffae3453;
  color: #fff;
}
.paramsSelectPopperClass {
  .el-select-dropdown__item {
    font-size: 12px;
  }
}
img {
  user-select: none;
}
.el-button {
  span {
    font-size: 13px !important;
  }
}
.el-button:focus-visible {
  outline: 2px solid transparent !important;
}
</style>
