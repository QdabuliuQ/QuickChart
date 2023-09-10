<template>
  <div class="EventPage">
    <template style="display: block">
      <eventItem
        v-for="item in events"
        :key="item.event_id"
        v-bind="item" />
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