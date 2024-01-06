<template>
  <div class="comment-item">
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
    <div class="comment-data">
      <div v-login="praiseEvent" :class="[props.is_praise == '1' ? 'active' : '', 'dataItem']">
        <i class="iconfont i_praise"></i>
        {{props.praise_count ? props.praise_count : '点赞'}}
      </div>
      <el-popconfirm
        v-if="props.self"
        confirm-button-text="删除"
        cancel-button-text="取消"
        title="是否删除该评论？"
        :persistent="true"
        :hide-after="100"
        :width="180"
        @confirm="confirmEvent"
      >
        <template #reference>
          <div class="dataItem">
            <i class="iconfont i_delete_2"></i>
            删除
          </div>
        </template>
      </el-popconfirm>
    </div>
  </div>
</template>

<script setup lang="ts">

import useProxy from "@/hooks/useProxy";

interface PropsInt {
  comment_id: string
  idx: number
  id: string
  content: string
  user_id: string
  user_pic: string
  nickname: string
  time: number
  self?: number
  is_praise?: number
  praise_count?: number
}
const emits = defineEmits(['delete', 'praise'])
const props = defineProps<PropsInt>()
const proxy = useProxy()

const confirmEvent = () => {
  emits('delete', props)
}
const praiseEvent = () => {
  emits('praise', props)
}

</script>

<style lang="less">
.comment-item {
  &:not(:last-child) {
    margin-bottom: 15px;
    .comment-data {
      border-bottom: 1px solid #525252;
      padding-bottom: 15px;
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
        margin-bottom: 3px;
        font-size: 14px;
      }
      .time {
        font-size: 12px;
        color: #929292;
      }
    }
  }
  .bottomContent {
    margin-bottom: 10px;
    margin-left: 50px;
    word-break: break-all;
    line-height: 25px;
  }
  .comment-data {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 50px;
    font-size: 13px;
    .active {
      color: @theme !important;
    }
    .dataItem {
      display: flex;
      align-items: center;
      color: #8c8c8c;
      cursor: pointer;
      i {
        margin-right: 5px;
      }
      &:hover {
        color: @theme;
      }
    }
  }
}
</style>