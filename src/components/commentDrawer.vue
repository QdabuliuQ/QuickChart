<template>
  <el-drawer
    custom-class="comment-drawer-custom-class"
    v-model="drawer"
    direction="ltr"
    title="评论内容"
    @close="closeEvent"
  >
    <comment-input :send="send" />
    <skeleton
      :status="status"
      :count="5"
      :loading-class="['el-avatar','nickname','time', 'bottomContent', 'dataItem']">
      <template v-slot:template="{setSlotRef}">
        <CommentItem
          style="margin-bottom: 15px"
          :comment_id="'null'"
          :id="'null'"
          :idx="1"
          :user_id="'null'"
          :user_pic="'null'"
          :self="1"
          :nickname="'xxxxxxxxxxxxx'"
          :time="123123123"
          :content="'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'"/>
      </template>
      <template v-slot:content>
        <comment-item
          v-for="(item, idx) in comments"
          :key="item.comment_id"
          :comment_id="item.comment_id"
          :id="item.chart_id ? item.chart_id : item.map_id"
          :idx="idx as number"
          :user_id="item.user_id"
          :user_pic="item.user_pic"
          :nickname="item.nickname"
          :time="item.time"
          :self="item.self"
          :content="item.content"
          :is_praise="item.is_praise"
          :praise_count="item.praise_count"
          @delete="deleteEvent"
          @praise="praiseEvent"/>
        <el-pagination
          @current-change="changeEvent"
          hide-on-single-page
          class="pagination-class"
          background
          v-model:current-page="offset"
          layout="prev, pager, next"
          :page-size="limit"
          :total="total" />
      </template>
      <template v-slot:empty>
        <el-empty description="暂无评论哦" />
      </template>
    </skeleton>
  </el-drawer>
</template>
<script setup lang="ts">
import CommentInput from "@/components/commentInput.vue";
import CommentItem from "@/components/commentItem.vue";
import useProxy from "@/hooks/useProxy";
import usePagination from "@/hooks/usePagination";
import {onUnmounted, reactive, ref, watch} from "vue";
import {ajaxRequest} from "@/utils";
import Skeleton from "@/components/skeleton.vue";

const props = defineProps<{
  drawer: boolean
  getData: Function,
  postComment: Function
  deleteComment: Function
  praiseComment: Function
  chart_id: string
}>()
const emits = defineEmits([
  'update:drawer'
])
const comments = reactive<any>([])
const drawer = ref<boolean>(props.drawer)
const status = ref<'1'|'2'|'3'>('1')
const proxy = useProxy()

const closeEvent = () => {
  emits("update:drawer", false)
}

const getCommentData = async (e: number) => {
  status.value = '1'
  let data: any = await ajaxRequest(props.getData, e)
  if(!data.status || data.data.length === 0) {
    status.value = '3'
  } else {
    status.value = '2'
    for(let item of data.data) {
      comments.push(item)
    }
  }
  total.value = data.count
  limit.value = data.limit
}
let [limit, total, offset, changeEvent]: any = usePagination(getCommentData)

/**
 * 评论点赞
 * @param info 评论信息
 */
const praiseEvent = async (info: any) => {
  let data: any = await props.praiseComment(info)
  if(data.status) {
    let type = info.is_praise == '1' ? '0' : '1'
    if(type === '1') {
      comments[info.idx].is_praise = 1
      comments[info.idx].praise_count ++
    } else {
      comments[info.idx].is_praise = 0
      comments[info.idx].praise_count --
    }
  }
}

const deleteEvent = async (info: any) => {
  let data: any = await props.deleteComment({
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

const send = (content: string) => {
  return new Promise( async (resolve, reject) => {
    let data: any = await props.postComment({
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

let stop = watch(() => props.drawer, (newVal: boolean) => {
  drawer.value = newVal
  if(newVal && comments.length === 0) {
    getCommentData(offset.value)
  }
})

onUnmounted(() => {
  stop()
})
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
</style>