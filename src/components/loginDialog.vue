<template>
  <el-dialog class="loginDialogClass" v-model="visible" :show-close="false">
    <i @click="visible = false" class="iconfont i_close_line"></i>
    <div class="leftCover">
      <div>
        <div class="leftText">
          <div class="text1">
            快速生成图表工具
          </div>
          <div class="text2">
            0代码，1分钟，制作炫酷图表
          </div>
          <img src="@/assets/image/login_img.png" />
          <div class="mask"></div>
        </div>
      </div>
    </div>
    <div class="rightContent">
      <div class="tabbar">
        <div @click="active = 'login'" :class="[active == 'login' ? 'active' : '', 'tabItem']">账号登录</div>
        <div @click="active = 'register'" :class="[active == 'register' ? 'active' : '', 'tabItem']">账号注册</div>
      </div>
      <div class="panelContainer">
        <loginPanel v-show="active == 'login'" />
        <register-panel v-show="active == 'register'" />
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import {ref} from "vue";
import loginPanel from './loginPanel.vue'
import registerPanel from "./registerPanel.vue";
import useProxy from "@/hooks/useProxy";

let active = ref('login')
let visible = ref(true)
const proxy = useProxy()

// 收到事件总线 打开登录窗口
proxy.$Bus.on('showLoginDialog', () => {
  visible.value = true
})

</script>

<style lang="less">
.loginDialogClass {
  background-color: #fff !important;
  box-shadow: 0 0 0 0 !important;
  width: 770px !important;
  aspect-ratio: 2/1.2 !important;
  border-radius: 10px !important;
  overflow: hidden !important;

  .el-dialog__header {
    padding: 0;
    display: none;
  }
  .el-dialog__body {
    width: 100%;
    height: 100%;
    padding: 0;
    display: flex !important;
    align-items: center !important;
    position: relative;
  }
  .i_close_line {
    position: absolute;
    right: 20px;
    top: 20px;
    color: @grey;
    cursor: pointer;
    &:hover {
      color: @theme;
    }
  }
  .leftCover {
    width: 35%;
    height: 100%;
    background-color: @theme;
    display: flex;
    align-items: center;
    justify-content: center;
    .leftText {
      text-align: center;
      position: relative;
      .text1 {
        color: #fff;
        font-size: 23px;
        font-weight: bold;
        letter-spacing: 2px;
      }
      .text2 {
        margin-top: 10px;
        color: #fff;
        font-size: 16px;
      }
      img {
        margin-top: 10px;
        width: 65%;
      }
      .mask {
        position: absolute;
        width: 100%;
        height: 100px;
        bottom: -20px;
        background: linear-gradient(to top, @theme, transparent);
      }
    }
  }
  .rightContent {
    flex: 1;
    height: 100%;
    .tabbar {
      margin: 50px 0 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      border-bottom: 2px solid @grey2;
      .tabItem {
        font-weight: bold;
        font-size: 18px;
        margin: 0 30px;
        cursor: pointer;
        padding: 0 15px;
        transition: .2s all linear;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        height: 100%;
      }
      .active {
        color: @theme;
        border-bottom: 2px solid @theme;
      }
    }
    .panelContainer {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>