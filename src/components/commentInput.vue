<template>
  <div :class="[isFocus ? 'commentInputActive' : '', 'commentInput']">
    <textarea
      @keyup.enter="send"
      ref="textareaRef"
      v-model="comment"
      maxlength="150"
      @focus="isFocus = true"
      @blur="blurEvent"
      placeholder="快来发布评论吧~~~"></textarea>
    <div @click="send" class="send">发布</div>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
import useProxy from "@/hooks/useProxy";
import {getMessageOption} from "@/utils";

const props = defineProps<{
  send: Function
}>()
const comment = ref<string>('')
const isFocus = ref<boolean>(false)
const textareaRef = ref<HTMLTextAreaElement>()
const proxy = useProxy()

const blurEvent = () => {
  if(comment.value.length === 0) isFocus.value = false
}

const send = () => {
  if(comment.value.length === 0 || comment.value.length > 150) return
  props.send(comment.value).then(() => {
    proxy.$notice(getMessageOption('success','发表评论成功'))
    comment.value = ''
    isFocus.value = false
    textareaRef.value?.blur()
  }, () => {
    proxy.$notice(getMessageOption('error','发表评论失败'))
  })
}

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
    width: 100%;
    height: 100%;
    padding: 8px 10px;
    font-size: 15px;
    background-color: #3d3d3d;
    border: 0;
    border-radius: 10px;
    outline: none;
    resize: none;
    flex: 1;
    line-height: 35px;
    box-sizing: border-box;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }

  .send {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 25px;
    margin-left: 10px;
    font-size: 16px;
    color: #fff;
    background-color: #ffc97c;
    border-radius: 10px;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      background-color: @theme;
    }
  }
}
</style>