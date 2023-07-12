<template>
  <div class="LoginPage">
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
      <div class="inputContent">
        <div class="text">邮箱密码登录</div>
        <el-input v-model="email" placeholder="请输入邮箱" />
        <el-input v-model="password" placeholder="请输入密码" />
        <div class="tip">
          <span class="forget">忘记密码？</span>
          <span class="register">注册账号</span>
        </div>
        <button class="login">登录</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";

const email = ref('')
const password = ref('')
</script>
<style lang="less">
.LoginPage {
  width: 70%;
  aspect-ratio: 2/1.2;
  background-color: #fff;
  margin: 50px auto;
  display: flex;
  align-items: center;
  border-radius: 10px;
  overflow: hidden;
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
    display: flex;
    align-items: center;
    justify-content: center;
    .inputContent {
      display: flex;
      flex-direction: column;
      .text {
        font-size: 25px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 30px;
      }
    }
    .el-input {
      margin-bottom: 15px;
      width: 300px;
      .el-input__wrapper {
        box-shadow: 0 0 0 1px #ccc;
        input::placeholder {
          font-size: 13px;
        }
      }
      .is-focus {
        box-shadow: 0 0 0 1px @theme !important;
      }
    }
    .tip {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      font-size: 13px;
      span {
        cursor: pointer;
      }
      .forget {
        color: #a1a1a1;
      }
      .register {
        color: @theme;
      }
    }
    .login {
      height: 40px;
      cursor: pointer;
      border-radius: 8px;
      background-color: @theme;
      border: 0;
    }
  }
}
</style>