<template>
  <div class="info-panel">
    <div v-login="toPraise" :class="['infoBtn', props.is_praise == 1 ? 'active' : '']">
      <div class="btn-container">
        <i class="iconfont i_praise"></i>
        <span>{{props.praise_count == 0 ? '点赞' : props.praise_count}}</span>
      </div>
    </div>
    <div @click="showComment" class="infoBtn">
      <div class="btn-container">
        <i class="iconfont i_comment"></i>
        <span>{{props.comment_count == 0 ? '评论' : props.comment_count}}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {postComment} from "@/network/chart";
import useProxy from "@/hooks/useProxy";

const props = defineProps<{
  chart_id: string
  is_praise: number
  praise_count: number
  comment_count: number
  praiseEvent: Function
}>()
const emits = defineEmits([
  'update:is_praise',
  'update:praise_count',
  'showDrawer'
])
const comments = reactive<any>([])
const toPraise = () => {
  let state = props.is_praise == 1 ? 0 : 1
  props.praiseEvent && props.praiseEvent(state).then(() => {
    emits("update:is_praise", state)
    emits("update:praise_count", state === 1 ? props.praise_count + 1 : props.praise_count - 1)
  })
}

/**
 * 打开弹窗
 * @return void
 */
const showComment = async () => {
  emits('showDrawer')
}

/**
 * 发送评论
 * @param content 评论消息
 * @return Promise<boolean> 返回Promise
 */
const send = (content: string) => {
  return new Promise( async (resolve, reject) => {
    let data: any = await postComment({
      chart_id: props.chart_id,
      content
    })
    if(data.status) {
      comments.unshift(data.data)
      resolve(true)
    }
    else reject(false)
  })
}
</script>

<style lang="less">
.comment-drawer-custom-class {
  .el-drawer__header {
    padding: 15px 10px 10px;
    margin-bottom: 0;
  }
  .el-drawer__body {
    padding: 20px 15px;
    &::-webkit-scrollbar{
      width:10px;
      height:10px;
    }
    &::-webkit-scrollbar-track{
      background: #323232;
      border-radius:2px;
    }
    &::-webkit-scrollbar-thumb{
      background: #565656;
      border-radius:10px;
    }
    &::-webkit-scrollbar-corner{
      background: #179a16;
    }
    .comment-item {
      &:not(:last-child) {
        .comment-data {
          border-bottom: 1px solid #2f2f2f;
        }
      }
    }
  }
}
.info-panel {
  position: absolute;
  bottom: 10px;
  left: 10px;
  .active {
    color: #fff !important;
    background-color: @theme !important;
  }
  .infoBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 55px;
    height: 55px;
    background-color: #424242;
    border-radius: 50%;
    transition: .2s all linear;
    cursor: pointer;
    &:hover {
      background-color: #595959;
    }
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    .btn-container {
      display: flex;
      text-align: center;
      flex-flow: column nowrap;
    }
    .iconfont {
      margin-bottom: 3px;
      font-size: 16px;
      .flex();
    }
    span {
      font-size: 11px;
    }
  }
}
</style>