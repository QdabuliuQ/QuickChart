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
      <div class="chart">
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
        <div class="item"><i class="iconfont i_comment"></i>{{ '评论'}}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits
} from "vue"
import useProxy from "@/hooks/useProxy";
import {postPraise} from "@/network/event";

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
  au_nickname: string
  au_user_pic: string
  au_user_id: string
  type: string
}

const props = defineProps<EventInt>()
const emits = defineEmits(['praiseEvent'])
const proxy = useProxy()

const praiseEvent = async () => {
  let type = (props.is_praise === 1 ? 0 : 1).toString()
  let data = await postPraise({
    event_id: props.event_id,
    type,
  })
  if(data.status === 0) return proxy.$notice({
    type: 'error',
    message: data.message,
    position: 'top-left'
  })
  if(data.status === -2) return proxy.$Bus.emit('showLoginDialog')
  emits('praiseEvent', type)
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
        color: #ccc;
      }
    }
  }
  .eventInfo {
    margin-left: 55px;
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