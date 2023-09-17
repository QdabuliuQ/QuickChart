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
        v-model:comments="events[idx].comments"
        v-model:is_praise="events[idx].is_praise"
        v-model:praise_count="events[idx].praise_count"
        :au_nickname="item.au_nickname"
        :au_user_pic="item.au_user_pic"
        :au_user_id="item.au_user_id"
        :comments="item.comments"
        :type="item.type" />
      <el-pagination
        class="paginationClass"
        v-model:current-page="offset"
        background
        layout="prev, pager, next"
        :page-size="limit"
        :total="total"
        @current-change="changeEvent"/>
    </template>
  </div>
</template>
<script setup lang="ts">
import {nextTick, reactive, ref} from "vue";
import {getInfo} from "@/utils";
import {getUserEvent} from "@/network/event";
import useProxy from "@/hooks/useProxy";
import {EventInt} from "@/types/common";
import eventItem from "@/components/eventItem.vue"
import usePagination from "@/hooks/usePagination";

const proxy = useProxy()
const info = getInfo()
const events = reactive<EventInt[]>([])


const getData = async () => {
  nextTick(() => {
    proxy.$Bus.emit("infoPageScrollToTop")
  })
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
    item.comments = []
    events.push(item)
  }
}
let [limit, total, offset, changeEvent]: any = usePagination(getData)
getData()


</script>
<style lang="less">
.EventPage {

}
</style>