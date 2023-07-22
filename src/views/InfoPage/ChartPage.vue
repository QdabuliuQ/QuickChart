<template>
  <div class="ChartPage">
    <div class="pageTitle">我的图表</div>
    <div v-if="charts.length" class="chartContainer">
      <chart-item v-for="(item,idx) in charts"
        :key="item.chart_id"
        :chart_id="item.chart_id"
        :name="item.name"
        :cover="item.cover + '?tempid='+Math.random()"
        :option="item.option"
        :state="item.state"
        :time="item.time"
        :type="item.type"
        :user_id="item.user_id"
        :idx="idx"
        @delete-item="deleteItem"/>
    </div>
    <el-empty v-else description="暂无图表"/>
    <div class="paginationContainer">
      <el-pagination
        v-model:current-page="offset"
        hide-on-single-page
        background
        layout="prev, pager, next"
        :page-size="limit"
        :total="count"
        @current-change="currentChange"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import {reactive, ref} from "vue";
import {getChart} from "@/network/chart";
import useProxy from "@/hooks/useProxy";
import ChartItem from "./components/chartItem.vue";


const charts = reactive<{
  chart_id: string
  cover: string
  name: string
  option: string
  state: string
  time: number
  type: string
  user_id: string
}[]>([])
const offset = ref<number>(1)
const count = ref<number>(0)
const limit = ref<number>(0)
const proxy = useProxy()

const getData = async () => {
  let {data} = await getChart({
    offset: offset.value
  })
  if (!data.status) return proxy.$notice({
    type: 'error',
    message: data.msg,
    position: 'top-left'
  })
  count.value = data.count
  limit.value = data.limit
  charts.length = 0
  for (let item of data.data) {
    charts.push(item)
  }
}
console.log('执行了')
getData()

const deleteItem = (idx: number) => {
  charts.splice(idx, 1)
}

const currentChange = (e: number) => {
  offset.value = e
  getData()
}

</script>
<style lang="less">
.ChartPage {
  .el-empty {
    padding: 80px 0;
  }

  .chartContainer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
  }
}
</style>