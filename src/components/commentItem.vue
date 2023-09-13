<template>
  <div class="commentItem">
    <div class="topInfo">
      <el-avatar :size="40" :src="props.user_pic" />
      <div class="detail">
        <div class="nickname">{{props.nickname}}</div>
        <div class="time">{{proxy.$moment(props.time).format('YYYY-MM-DD&nbsp;&nbsp;hh:mm:ss')}}</div>
      </div>
    </div>
    <div class="bottomContent">
      {{props.content}}
    </div>
  </div>
</template>

<script setup lang="ts">

import useProxy from "@/hooks/useProxy";

interface PropsInt {
  comment_id: string
  event_id: string
  content: string
  user_id: string
  user_pic: string
  nickname: string
  time: number
}
const props = defineProps<PropsInt>()
const proxy = useProxy()
</script>

<style lang="less">
.commentItem {
  &:not(:last-child) {
    margin-bottom: 15px;
    .bottomContent {
      padding-bottom: 15px;
      border-bottom: 1px solid #525252;
    }
  }
  .topInfo {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    .detail {
      margin-left: 10px;
      .el-avatar {
        width: 40px;
        height: 40px;
      }
      .nickname {
        font-size: 14px;
        margin-bottom: 3px;
      }
      .time {
        font-size: 12px;
        color: #929292;
      }
    }
  }
  .bottomContent {
    margin-left: 50px;
    word-break: break-all;
    line-height: 25px;
  }
}
</style>