<template>
  <div :class="[isFocus ? 'commentInputActive' : '', 'commentInput']">
    <textarea maxlength="150" @focus="isFocus = true" @blur="isFocus = false" placeholder="快来发布评论吧~~~"></textarea>
    <div class="send">发布</div>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";

const comment = ref<string>()
const isFocus = ref<boolean>(false)


</script>
<style lang="less">
.commentInputActive {
  height: 80px !important;
}
.commentInput {
  display: flex;
  align-items: center;
  height: 50px;
  margin-bottom: 15px;
  transition: .1s height linear;
  textarea:focus {
    background-color: #4e4e4e;
    border: 1px solid @theme;
  }
  textarea {
    flex: 1;
    padding: 8px 10px;
    outline: none;
    border: 0;
    resize: none;
    width: 100%;
    height: 100%;
    background-color: #3d3d3d;
    border-radius: 10px;
    font-size: 15px;
    line-height: 35px;
    box-sizing: border-box;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }

  .send {
    margin-left: 10px;
    font-size: 16px;
    font-weight: bold;
    padding: 0 25px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffc97c;
    color: #fff;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      background-color: @theme;
    }
  }
}
</style>