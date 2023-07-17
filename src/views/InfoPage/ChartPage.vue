<template>
  <div class="ChartPage">
    <div class="pageTitle">我的图表</div>
    <div v-if="charts.length" class="chartContainer">
      <chart-item v-for="item in charts"
        :chart_id="item.chart_id"
        :name="item.name"
        :cover="item.cover"
        :option="item.option"
        :state="item.state"
        :time="item.time"
        :type="item.type"
        :user_id="item.user_id"/>
    </div>
    <el-empty v-else description="暂无图表"/>
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
const offset = ref<number>(0)
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
  charts.length = 0
  for (let item of data.data) {
    charts.push(item)
  }
  console.log(charts)
}
getData()

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