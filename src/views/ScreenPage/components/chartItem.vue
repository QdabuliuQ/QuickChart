<template>
  <div class="chartItem">
    <div ref="titleRef" class="title">
      <i @click="router.push('/')" class="iconfont i_home"></i>
      插入图表
    </div>
    <div ref="typeRef" class="types">
      <div @click="toggleType('chart')" :class="[type === 'chart' ? 'typeActive' : '', 'typeItem' ]">图表</div>
      <div @click="toggleType('map')" :class="[type === 'map' ? 'typeActive' : '', 'typeItem']">地图</div>
    </div>
    <el-scrollbar :height="height">
      <div class="itemList">
        <skeleton
          :count="3"
          :status="status"
          :loading-class="[
            'cover',
            'name'
          ]">
          <template v-slot:template="{setSlotRef}">
            <div class="item">
              <div class="cover" style="width: 100%; aspect-ratio: 2/1.3"></div>
              <div class="name">xxxxxxxxxxx</div>
            </div>
          </template>
          <template v-slot:content>
            <div @click="itemClick(item, type)" class="item" v-for="item in itemlist" :key="item.cover">
              <div class="mask">插入图表</div>
              <el-image style="width: 100%; aspect-ratio: 2/1.3" :src="item.cover" fit="cover" />
              <div class="name">{{item.name}}</div>
            </div>
            <el-pagination
              class="paginationClass"
              v-model:current-page="offset"
              hide-on-single-page
              background
              layout="prev, pager, next"
              :page-size="limit"
              :total="count"
              @current-change="currentChange"/>
          </template>
          <template v-slot:empty>
            <el-empty description="暂无图表"/>
          </template>
        </skeleton>
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, onUnmounted, reactive, ref} from "vue";
import {getChart} from "@/network/chart";
import {getChart as getMap} from "@/network/map"
import Skeleton from "@/components/skeleton.vue";
import {ajaxRequest} from "@/utils";
import useProxy from "@/hooks/useProxy";

type TYPE = "chart" | "map"
type STATUS = '1'|'2'|'3'

const router = useRouter()
const height = ref<string>("0px")
const titleRef = ref<HTMLDivElement>()
const typeRef = ref<HTMLDivElement>()

const itemlist = reactive<{
  cover: string
  name: string
  [propName: string]: any
}[]>([])
const type = ref<TYPE>("chart")

const proxy = useProxy()
const status = ref<STATUS>('1')
const offset = ref<number>(1)
const limit = ref<number>(15)
const count = ref<number>(0)
const currentChange = (e: number) => {
  offset.value = e
  itemlist.length = 0
  getData()
}
const getData = async () => {
  let res: any = null
  status.value = '1'
  if(type.value === "chart") {
    res = await ajaxRequest(getChart, {
      offset: offset.value
    })
  } else {
    res = await ajaxRequest(getMap, {
      offset: offset.value
    })
  }
  if (!res.status || res.data.length == 0) {
    status.value = '3'
  } else {
    status.value = '2'
  }
  if(res.status) {
    for(let item of res.data) {
      itemlist.push(item)
    }
    count.value = res.count
    limit.value = res.limit
  }
}
getData()
const toggleType = (t: TYPE) => {
  type.value = t
  offset.value = 1
  itemlist.length = 0
  getData()
}

const resizeEvent = () => {
  height.value =
    document.documentElement.clientHeight -
    titleRef.value!.offsetHeight -
    5 - typeRef.value!.offsetHeight - 10 +
    "px";
}

const itemClick = (info: any, type: TYPE) => {
  proxy.$Bus.emit("chartSelect", Object.assign(info, {
    type
  }))
}

onMounted(() => {
  resizeEvent()
  proxy.$Bus.on("resize", resizeEvent)
})

onUnmounted(() => {
  proxy.$Bus.off("resize", resizeEvent)
})

</script>
<style lang="less">
.chartItem {
  width: 250px;
  height: 100%;
  background-color: @curColor;
  .title {
    position: relative;
    padding: 20px 10px 0;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 15px;
    .iconfont {
      position: absolute;
      bottom: 0;
      left: 10px;
      cursor: pointer;
      font-size: 20px;
    }
  }
  .typeActive {
    position: relative;
    color: @theme;
    &:after {
      position: absolute;
      content: '';
      width: 160%;
      height: 2px;
      bottom: 0;
      left: 50%;
      background-color: @theme;
      transform: translateX(-50%);
    }
  }
  .types {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: 10px;
    box-shadow: 0 8px 10px rgba(0, 0, 0, 0.1);
    .typeItem {
      font-size: 14px;
      cursor: pointer;
      padding: 8px 0;
    }
  }
  .itemList {
    padding: 12px;
    .el-image {
      border-radius: 10px;
      overflow: hidden;
      background-color: #fff;
      box-sizing: border-box;
      border: 1px solid #ccc;
    }
    .item {
      margin-bottom: 12px;
      position: relative;
      .name {
        margin-top: 5px;
        text-align: center;
        font-size: 14px;
      }
      &:hover .mask {
        opacity: 1;
      }
      .mask {
        position: absolute;
        z-index: 2;
        width: 100%;
        aspect-ratio: 2/1.3;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(255, 180, 75, 0.509);
        color: #fff;
        font-weight: bold;
        font-size: 14px;
        cursor: pointer;
        opacity: 0;
        transition: 0.2s all linear;
        box-sizing: border-box;
        border: 2px solid @theme;
        border-radius: 10px;
        overflow: hidden;
      }
    }
  }
}
</style>