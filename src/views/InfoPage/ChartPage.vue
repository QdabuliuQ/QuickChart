<template>
  <div class="info_ChartPage">
    <div class="pageTitle">我的图表</div>
    <div class="types">
      <div @click="toggleType('chart')" :class="[type === 'chart' ? 'active' : '', 'typeItem']">图表</div>
      <div @click="toggleType('map')" :class="[type === 'map' ? 'active' : '', 'typeItem']">地图</div>
    </div>
    <div v-if="charts.length" class="chartContainer">
      <chart-item v-for="(item,idx) in charts"
                  :key="item.chart_id ? item.chart_id : item.map_id"
                  :chart_id="item.chart_id ? item.chart_id : (item.map_id as string)"
                  :name="item.name"
                  :cover="item.cover + '?tempid='+Math.random()"
                  :option="item.option"
                  :state="item.state"
                  :time="item.time"
                  :type="item.type"
                  :user_id="item.user_id"
                  :idx="idx"
                  :blur="blurEvent"
                  @click-item="clickItem"
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
import {deleteChart, getChart, putChartName} from "@/network/chart";
import {getChart as getMap, putChartName as putMapName, deleteChart as deleteMap} from "@/network/map"
import useProxy from "@/hooks/useProxy";
import ChartItem from "./components/chartItem.vue";
import {useRouter} from "vue-router";

const router = useRouter()
const charts = reactive<{
  chart_id: string
  map_id?: string
  cover: string
  name: string
  option: string
  state: string
  time: number
  type: string
  user_id: string
  adcode?: string
}[]>([])
const type = ref<"map" | "chart">('chart')
const offset = ref<number>(1)
const count = ref<number>(0)
const limit = ref<number>(0)
const proxy = useProxy()

const getData = async () => {
  let data: any = null
  if (type.value === "chart") {
    data = await getChart({
      offset: offset.value
    })
  } else {
    data = await getMap({
      offset: offset.value
    })
  }
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
getData()

// 输入框失焦回调  修改图表名称
const blurEvent = (newName: string, chart_id: string) => {
  return new Promise(async (resolve, reject) => {
    let data: any;
    if (type.value === "chart") {
      data = await putChartName({  // 调用接口
        name: newName,
        chart_id
      })
    } else {
      data = await putMapName({  // 调用接口
        name: newName,
        map_id: chart_id
      })
    }
    if (!data.status) {
      proxy.$notice({
        type: 'error',
        message: data.msg,
        position: 'top-left'
      })
      reject(false)
      return
    }
    resolve(true)
    proxy.$notice({
      type: 'success',
      message: data.msg,
      position: 'top-left'
    })
  })
}

const clickItem = (id: string) => {
  if (type.value === 'chart') router.push('/chart/'+id)
  else router.push('/map/'+id)
}

// 刪除图表
const deleteItem = async (info: {
  idx: number
  id: string
}) => {
  let data: any;
  if(type.value === "chart") {
    data = await deleteChart({
      chart_id: info.id
    })
  } else {
    data = await deleteMap({
      map_id: info.id
    })
  }
  if(!data.status) return proxy.$notice({
    type: 'error',
    message: data.msg,
    position: 'top-left'
  })
  proxy.$notice({
    type: 'success',
    message: data.msg,
    position: 'top-left'
  })
  charts.splice(info.idx, 1)
}

const currentChange = (e: number) => {
  offset.value = e
  getData()
}

const toggleType = (_type: "chart" | "map") => {
  if (_type !== type.value) {
    offset.value = 1
    type.value = _type
    charts.length = 0
    getData()
  }
}

</script>
<style lang="less">
.info_ChartPage {
  .el-empty {
    padding: 80px 0;
  }

  .chartContainer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
  }

  .types {
    display: flex;
    margin-bottom: 20px;

    .typeItem {
      margin-right: 20px;
      padding: 6px 20px 8px;
      color: #fff;
      border-radius: 20px;
      transition: .2s all linear;
      cursor: pointer;
      font-size: 13px;
    }

    .active {
      background-color: @theme;
    }
  }
}
</style>