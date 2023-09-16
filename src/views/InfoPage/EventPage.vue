<template>
  <div class="EventPage">
    <template style="display: block">
      <eventItem
        v-for="(item, idx) in events"
        :key="item.event_id"
        :chart_id="item.chart_id"
        :content="item.content"
        :cover="item.cover"
        :event_id="item.event_id"
        :name="item.name"
        :nickname="item.nickname"
        :state="item.state"
        :time="item.time"
        :user_id="item.user_id"
        :user_pic="item.user_pic"
        v-model:is_praise="events[idx].is_praise"
        v-model:praise_count="events[idx].praise_count"
        :au_nickname="item.au_nickname"
        :au_user_pic="item.au_user_pic"
        :au_user_id="item.au_user_id"
        :comments="item.comments"
        :type="item.type" />
      <div class="paginationContainer">
        <el-pagination
          v-model:current-page="offset"
          hide-on-single-page
          background
          layout="prev, pager, next"
          :page-size="limit"
          :total="total"
          @current-change="currentChange"/>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import {reactive, ref} from "vue";
import {getInfo} from "@/utils";
import {getUserEvent} from "@/network/event";
import useProxy from "@/hooks/useProxy";
import {EventInt} from "@/types/common";
import eventItem from "@/components/eventItem.vue"

const proxy = useProxy()
const info = getInfo()
const offset = ref<number>(1)
const total = ref<number>(0)
const limit = ref<number>(0)
const events = reactive<EventInt[]>([])

const getData = async () => {
  let data: any = await getUserEvent({
    user_id: info.user_id,
    offset: offset.value
  })
  if(!data.status) return proxy.$notice({
    type: 'error',
    message: data.msg,
    position: 'top-left'
  })
  total.value = data.count
  limit.value = data.limit
  events.length = 0
  for(let item of data.data) {
    item.comments = [
      {
        user_id: '1',
        user_pic: 'http://127.0.0.1:3031/avatar/1689414168218nmr4C.jpeg',
        nickname: '1111',
        content: 'dsadasdads',
        comment_id: '1',
        event_id: '1',
        time: 1694356157803
      },
      {
        user_id: '1',
        user_pic: 'http://127.0.0.1:3031/avatar/1689414168218nmr4C.jpeg',
        nickname: '1111',
        content: 'dsadasdads',
        comment_id: '2',
        event_id: '1',
        time: 1694356157803
      },
    ]
    events.push(item)
  }
}
getData()

const currentChange = (e: number) => {
  offset.value = e
  getData()
}

</script>
<style lang="less">
.EventPage {

}
</style>