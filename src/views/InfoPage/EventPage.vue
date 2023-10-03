<template>
  <div class="EventPage">
    <skeleton
      :status="status"
      :count="2"
      :loading-class="['el-avatar', 'nickname', 'time', 'content', 'chart']"
      :hidden-class="['mask', 'cover', 'operation']" >
      <template v-slot:template="{ setSlotRef }" style="display: block">
        <eventItem
          :ref="(el)=>setSlotRef(el)"
          :chart_id="'xxxxxxxxx'"
          :content="'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'"
          :cover="'xxxxxxxxx'"
          :event_id="'xxxxxxxxx'"
          :name="'xxxxxxxxx'"
          :nickname="'xxxxxxxxx'"
          :state="'xxxxxxxxx'"
          :user_id="'xxxxxxxxx'"
          :user_pic="'xxxxxxxxx'"/>
      </template>
      <template v-slot:content>
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
          :comment_count="item.comment_count"
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
      <template v-slot:empty>
        <el-empty description="空空如也~~~"/>
      </template>
    </skeleton>
  </div>
</template>
<script setup lang="ts">
import {nextTick, reactive, ref} from "vue";
import {ajaxRequest, getInfo} from "@/utils";
import {getUserEvent} from "@/network/event";
import useProxy from "@/hooks/useProxy";
import {EventInt} from "@/types/common";
import eventItem from "@/components/eventItem.vue"
import usePagination from "@/hooks/usePagination";
import Skeleton from "@/components/skeleton.vue";

const proxy = useProxy()
const info = getInfo()
const status = ref<'1'|'2'|'3'>('1')
const events = reactive<EventInt[]>([])


const getData = async () => {
  window.scrollTo(0, 0)
  status.value = '1'
  let data: any = await ajaxRequest(getUserEvent, {
    user_id: info.user_id,
    offset: offset.value
  })
  if (!data.status || data.data.length === 0) {
    status.value = '3'
  } else {
    status.value = '2'
  }
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