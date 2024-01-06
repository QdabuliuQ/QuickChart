<template>
  <router-view />
  <login-dialog/>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { InitData } from "@/types/App";
import { getCurrentInstance } from "vue";
import loginDialog from '@/components/loginDialog.vue'

let timer: any;
export default defineComponent({
  name: "App",
  components: {
    loginDialog
  },
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
  padding: 0;
  margin: 0;
  color: #d0d0d0;
  background-color: #282828;
}
::selection {
  color: #fff;
  background: #ffae3453;
}
::selection {
  color: #fff;
  background: #ffae3453;
}
::-webkit-selection {
  color: #fff;
  background: #ffae3453;
}
.params-select-popper-class {
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
.hljs {
  overflow-y: scroll;
  max-height: 430px;
  font-size: 18px;
}
.code-dialog-class {
  .el-dialog__body {
    padding: 0 15px 15px;
  }
}
.pagination-class {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
