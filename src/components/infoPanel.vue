<template>
  <div class="infoPanel">
    <div v-login="toPraise" :class="['infoBtn', props.is_praise == 1 ? 'active' : '']">
      <div class="btnContainer">
        <i class="iconfont i_praise"></i>
        <span>{{props.praise_count == 0 ? '点赞' : props.praise_count}}</span>
      </div>
    </div>
    <div @click="showComment" class="infoBtn">
      <div class="btnContainer">
        <i class="iconfont i_comment"></i>
        <span>评论</span>
      </div>
    </div>
    <el-drawer
      custom-class="commentDrawerCustomClass"
      v-model="drawer"
      direction="ltr"
      title="评论内容"
    >
      <comment-input :send="send" />
      <template v-if="comments.length">
        <CommentItem
          v-for="(item, idx) in comments"
          :key="item.comment_id"
          :comment_id="item.comment_id"
          :id="item.chart_id"
          :idx="idx as number"
          :user_id="item.user_id"
          :user_pic="item.user_pic"
          :nickname="item.nickname"
          :time="item.time"
          :self="item.self"
          :content="item.content"
          @delete="deleteEvent"/>
        <el-pagination
          @current-change="changeEvent"
          hide-on-single-page
          class="paginationClass"
          background
          v-model:current-page="offset"
          layout="prev, pager, next"
          :page-size="limit"
          :total="total" />
      </template>
      <el-empty v-else description="暂无评论哦" />
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import CommentInput from "@/components/commentInput.vue";
import CommentItem from "@/components/commentItem.vue";
import {deleteComment, postComment} from "@/network/chart";
import usePagination from "@/hooks/usePagination";
import useProxy from "@/hooks/useProxy";

const props = defineProps<{
  chart_id: string
  is_praise: number
  praise_count: number
  praiseEvent: Function
  getData: Function
}>()
const emits = defineEmits([
  'update:is_praise',
  'update:praise_count'
])
const comments = reactive<any>([])
let flag = false
const drawer = ref<boolean>(false)
const proxy = useProxy()

const toPraise = () => {
  let state = props.is_praise == 1 ? 0 : 1
  props.praiseEvent && props.praiseEvent(state).then(() => {
    emits("update:is_praise", state)
    emits("update:praise_count", state === 1 ? props.praise_count + 1 : props.praise_count - 1)
  })
}

const getCommentData = async (e: number) => {
  comments.length = 0
  let data = await props.getData(e)
  for(let item of data.data) {
    comments.push(item)
  }
  total.value = data.count
  limit.value = data.limit
}

let [limit, total, offset, changeEvent]: any = usePagination(getCommentData)

/**
 * 打开弹窗
 * @return void
 */
const showComment = async () => {
  drawer.value = true
  if(comments.length === 0) {
    let data: any = await props.getData(offset.value)
    for(let item of data.data) {
      comments.push(item)
    }
    total.value = data.count
    limit.value = data.limit
  }
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

const deleteEvent = async (info: any) => {
  let data: any = await deleteComment({
    comment_id: info.comment_id
  })
  if(data.status) {
    comments.splice(info.idx, 1)
    proxy.$notice({
      type: "success",
      message: data.msg,
      position: "top-left"
    })
  }
}

</script>

<style lang="less">
.commentDrawerCustomClass {
  .el-drawer__header {
    margin-bottom: 0;
    padding: 15px 10px 10px;
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
    .commentItem {
      &:not(:last-child) {
        .commentData {
          border-bottom: 1px solid #2f2f2f;
        }
      }
    }
  }
}
.infoPanel {
  position: absolute;
  bottom: 10px;
  left: 10px;
  .active {
    background-color: @theme !important;
    color: #fff !important;
  }
  .infoBtn {
    display: flex;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    background-color: #424242;
    cursor: pointer;
    transition: .2s all linear;
    &:hover {
      background-color: #595959;
    }
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    .btnContainer {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      text-align: center;
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