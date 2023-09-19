<template>
  <div class="eventItem">
    <div class="userInfo">
      <el-avatar :size="45" :src="props.user_pic" />
      <div class="right">
        <span class="nickname">{{ props.nickname }}</span>
        <span class="time">{{ proxy.$moment(props.time).format('YYYY-MM-DD&nbsp;&nbsp;hh:mm:ss') }}</span>
      </div>
    </div>
    <div class="eventInfo">
      <div class="content" v-if="props.content">{{props.content}}</div>
      <div @click="toDetail" class="chart">
        <div class="mask">
          <div class="chartInfo">
            <div class="edit">编辑</div>
            <div class="name">{{ props.name }}</div>
            <div class="author">
              <el-avatar :size="27" :src="props.au_user_pic" />
              <span>{{props.au_nickname}}</span>
            </div>
          </div>
          <i :class="['iconfont', props.type === 'chart' ? 'i_bar' : 'i_map']"></i>
        </div>
        <img :alt="props.name" :src="props.cover"  />
      </div>
      <div class="operation">
        <div v-login="praiseEvent" :class="[props.is_praise ? 'active' : '', 'item']"><i class="iconfont i_praise"></i>{{props.praise_count ? props.praise_count : '点赞'}}</div>
        <div class="item" @click="getComment"><i class="iconfont i_comment"></i>{{ props.comment_count ? props.comment_count : '评论'}}</div>
      </div>
      <div v-show="showComment" class="commentInfo">
        <CommentInput :send="send" />
        <template v-if="comments.length">
          <CommentItem
            v-for="(item, idx) in props.comments"
            :key="item.comment_id"
            :comment_id="item.comment_id"
            :event_id="item.event_id"
            :user_id="item.user_id"
            :user_pic="item.user_pic"
            :nickname="item.nickname"
            :time="item.time"
            :content="item.content"/>
          <el-pagination @current-change="changeEvent" hide-on-single-page class="paginationClass" background layout="prev, pager, next" :page-size="limit" :total="total" />
        </template>
        <el-empty v-else description="暂无评论哦" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  ref
} from "vue"
import {useRouter} from "vue-router";
import useProxy from "@/hooks/useProxy";
import {postComment, postPraise} from "@/network/event";
import CommentItem from "@/components/commentItem.vue";
import {CommentInt} from "@/types/common";
import CommentInput from "@/components/commentInput.vue";
import {getComment as getCommentData} from "@/network/event"
import usePagination from "@/hooks/usePagination";

interface EventInt {
  chart_id: string
  content: string
  cover: string
  event_id: string
  name: string
  nickname: string
  state: string
  time: number
  user_id: string
  user_pic: string
  is_praise: number
  praise_count: number
  comment_count: number
  au_nickname: string
  au_user_pic: string
  au_user_id: string
  type: string
  comments: CommentInt[]
}

const router = useRouter()
const props = defineProps<EventInt>()
const emits = defineEmits([
  'update:is_praise',
  'update:praise_count',
  'update:comments'
])
const proxy = useProxy()
const showComment = ref<boolean>(false)

const toDetail = () => {
  router.push((props.type === 'chart' ? `/chart/` : '/map/') + props.chart_id)
}

/**
 * 获取评论数据
 */
const getData = async () => {
  let data: any = await getCommentData({
    event_id: props.event_id,
    offset: offset.value
  })
  emits("update:comments", data.data)
  total.value = data.count
  limit.value = data.limit
}
let [limit, total, offset, changeEvent]: any = usePagination(getData)

/**
 * 点赞动态
 * @return void
 */
const praiseEvent = async () => {
  let type = (props.is_praise === 1 ? 0 : 1).toString()
  let data: any = await postPraise({
    event_id: props.event_id,
    type,
  })
  if(data.status === 0) return proxy.$notice({
    type: 'error',
    message: data.msg,
    position: 'top-left'
  })
  if(data.status === -2) return proxy.$Bus.emit('showLoginDialog')

  emits('update:is_praise', type == '1' ? 1 : 0)
  emits('update:praise_count', type === '1' ? props.praise_count + 1 : props.praise_count-1)
}

/**
 * 打开评论面板
 * @return void
 */
const getComment = () => {
  showComment.value = !showComment.value
  if(props.comments.length === 0) {
    getData()
  }
}

/**
 * 发送评论
 * @param comment 评论消息
 * @return Promise<boolean> 返回Promise
 */
const send = (comment: string): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    let data: any = await postComment({
      content: comment,
      event_id: props.event_id
    })
    if(data.status) resolve(true)
    else reject(false)
  })
}

</script>

<style lang="less">
.eventItem {
  width: 100%;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
  .userInfo {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    .el-avatar {
      margin-right: 10px;
    }
    .right {
      display: flex;
      flex-direction: column;
      .time {
        margin-top: 4px;
        font-size: 13px;
        color: #929292;
      }
    }
  }
  .eventInfo {
    margin-left: 55px;
    .commentInfo {
      padding: 15px 0;
      border-bottom: 1px solid #525252;
    }
    .content {
      width: 100%;
      word-break: break-all;
      font-size: 17px;
      line-height: 25px;
      margin-bottom: 15px;
    }
    .chart {
      width: 300px;
      aspect-ratio: 2/1.4;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 15px;
      position: relative;
      cursor: pointer;
      .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #00000078;
        display: flex;
        align-items: center;
        justify-content: center;
        .iconfont {
          position: absolute;
          left: 10px;
          bottom: 10px;
          font-size: 25px;
        }
        .chartInfo {
          display: flex;
          flex-direction: column;
          align-items: center;
          .edit {
            padding: 6px 14px 7px;
            font-size: 12px;
            color: #fff;
            border-radius: 15px;
            background-color: #00000087;
            margin-bottom: 10px;
            .flex();
          }
          .name {
            max-width: 180px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-size: 15px;
          }
          .author {
            display: flex;
            align-items: center;
            margin-top: 5px;
            span {
              margin-left: 5px;
              font-size: 14px;
            }
          }
        }
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .operation {
      display: flex;
      align-items: center;
      padding-bottom: 15px;
      border-bottom: 1px solid #525252;
      .item {
        flex: 1;
        font-size: 14px;
        cursor: pointer;
        .iconfont {
          font-size: 15px;
          margin-right: 7px;
        }
        &:hover {
          color: @theme;
        }
      }
      .active {
        color: @theme;
      }
    }
  }
}
</style>