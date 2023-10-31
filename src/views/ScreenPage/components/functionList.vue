<template>
  <div class="functionList">
    <div class="funcItem" title="插入文本">
      <i class="iconfont i_text"></i>
      文本
    </div>
    <div class="funcItem" title="插入图形">
      <i class="iconfont i_shape"></i>
      图形
    </div>
    <el-popover
      ref='chartPopoverRef'
      popper-class="functionListPopoverClass"
      placement="right-start"
      trigger="click"
      :hide-after="0"
    >
      <el-scrollbar height="500px">
        <skeleton
          :count="4"
          :status="chartInfo.status"
          :loading-class="['cover', 'name']"
        >
          <template v-slot:template="{ setSlotRef }">
            <div class="item">
              <div class="cover" style="width: 100%; aspect-ratio: 2/1.3"></div>
              <div class="name" style="margin-top: 5px">xxxxxxxxxxx</div>
            </div>
          </template>
          <template v-slot:content>
            <div class="functionListChartContainer">
              <div
                @click="itemClick(item, type)"
                class="item"
                v-for="item in chartList"
                :key="item.cover"
              >
                <div class="mask">插入图表</div>
                <el-image
                  style="width: 100%; aspect-ratio: 2/1.3"
                  :src="item.cover"
                  fit="cover"
                />
                <div class="name">{{ item.name }}</div>
              </div>
            </div>
            <el-pagination
              class="paginationClass"
              v-model:current-page="chartInfo.offset"
              hide-on-single-page
              background
              layout="prev, pager, next"
              :page-size="chartInfo.limit"
              :total="chartInfo.count"
              @current-change="chartCurrentChange"
            />
          </template>
          <template v-slot:empty>
            <el-empty description="暂无图表" />
          </template>
        </skeleton>
      </el-scrollbar>
      <template #reference>
        <div @click="funcClick('chart')" class="funcItem" title="插入图表">
          <i class="iconfont i_chart"></i>
          图表
        </div>
      </template>
    </el-popover>
    <el-popover
      ref="mapPopoverRef"
      popper-class="functionListPopoverClass"
      placement="right-start"
      trigger="click"
      :hide-after="0"
    >
      <el-scrollbar height="500px">
        <skeleton
          :count="4"
          :status="mapInfo.status"
          :loading-class="['cover', 'name']"
        >
          <template v-slot:template="{ setSlotRef }">
            <div class="item">
              <div class="cover" style="width: 100%; aspect-ratio: 2/1.3"></div>
              <div class="name" style="margin-top: 5px">xxxxxxxxxxx</div>
            </div>
          </template>
          <template v-slot:content>
            <div class="functionListChartContainer">
              <div
                @click="itemClick(item, type)"
                class="item"
                v-for="item in mapList"
                :key="item.cover"
              >
                <div class="mask">插入图表</div>
                <el-image
                  style="width: 100%; aspect-ratio: 2/1.3"
                  :src="item.cover"
                  fit="cover"
                />
                <div class="name">{{ item.name }}</div>
              </div>
            </div>
            <el-pagination
              class="paginationClass"
              v-model:current-page="mapInfo.offset"
              hide-on-single-page
              background
              layout="prev, pager, next"
              :page-size="mapInfo.limit"
              :total="mapInfo.count"
              @current-change="mapCurrentChange"
            />
          </template>
          <template v-slot:empty>
            <el-empty description="暂无图表" />
          </template>
        </skeleton>
      </el-scrollbar>
      <template #reference>
        <div @click="funcClick('map')" class="funcItem" title="插入地图">
          <i class="iconfont i_map"></i>
          地图
        </div>
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { getChart } from "@/network/chart";
import { getChart as getMap } from "@/network/map";
import { ajaxRequest } from "@/utils";
import Skeleton from "@/components/skeleton.vue";
import useProxy from "@/hooks/useProxy";
import useCommonStore from "@/store/common";

type STATUS = '1' | '2'| '3'
interface IItem {
  cover: string;
  name: string;
  [propName: string]: any;
}
interface IInfo {
  status: STATUS
  offset: number
  limit: number
  count: number
}
const proxy = useProxy()
const chartPopoverRef = ref()
const mapPopoverRef = ref()
const chartList = reactive<IItem[]>([]);
const mapList = reactive<IItem[]>([]);
const chartInfo = reactive<IInfo>({
  status: "1",
  offset: 1,
  limit: 15,
  count: 0,
});
const mapInfo = reactive<IInfo>({
  status: "1",
  offset: 1,
  limit: 15,
  count: 0,
});
const type = ref<"chart" | "map">("chart");

const getData = async () => {
  if (
    (type.value === "chart" && chartList.length !== 0) ||
    (type.value === "map" && mapList.length !== 0)
  ) {
    return;
  }
  let res: any = null;
  type.value === "chart" ? (chartInfo.status = "1") : (mapInfo.status = "1");
  if (type.value === "chart") {
    res = await ajaxRequest(getChart, {
      offset: chartInfo.offset,
    });
  } else {
    res = await ajaxRequest(getMap, {
      offset: mapInfo.offset,
    });
  }
  if (!res.status || res.data.length == 0) {
    type.value === "chart" ? (chartInfo.status = "3") : (mapInfo.status = "3");
  } else {
    type.value === "chart" ? (chartInfo.status = "2") : (mapInfo.status = "2");
  }
  if (res.status) {
    for (let item of res.data) {
      if (type.value === "chart") {
        chartList.push(item);
      } else {
        mapList.push(item);
      }
    }
    type.value === "chart"
      ? (chartInfo.count = res.count)
      : (mapInfo.count = res.count);
    type.value === "chart"
      ? (chartInfo.limit = res.limit)
      : (mapInfo.limit = res.limit);
  }
};

const chartCurrentChange = (e: number) => {
  chartInfo.offset = e;
  chartList.length = 0;
  getData();
};
const mapCurrentChange = (e: number) => {
  mapInfo.offset = e;
  mapList.length = 0;
  getData();
};

const common = useCommonStore()
const itemClick = (info: any, _type: "chart" | "map") => {
  if (type.value === 'chart') {
    chartPopoverRef.value.hide()
  } else {
    mapPopoverRef.value.hide()
  }
  common.addScreenOptionOfElements({
    type: "chart",
    cover: info.cover,
    option: "",
    style: {
      width: 200,
      height: 130,
      translateX: 0,
      translateY: 0,
      scaleX: 1,
      scaleY: 1,
      rotate: 0,
    },
  })
  // proxy.$Bus.emit("chartSelect", Object.assign(info, {
  //   _type
  // }))
}

const funcClick = (_type: "chart" | "map") => {
  type.value = _type;
  if (_type === "chart") {
    getData();
  } else {
    getData();
  }
};
</script>

<style lang="less">
.functionListPopoverClass {
  width: auto !important;
  .skeleton_loading {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    width: 500px;
  }
  .functionListChartContainer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    width: 500px;
    .el-image {
      border-radius: 10px;
      overflow: hidden;
      background-color: #fff;
      box-sizing: border-box;
      border: 1px solid #ccc;
    }
    .item {
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
.functionList {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  background-color: @curColor;
  .active {
    background-color: #4d4d4d !important;
    color: @theme !important;
  }
  .funcItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 13px;
    cursor: pointer;
    padding: 15px 20px;
    transition: 0.2s all linear;
    .iconfont {
      margin-bottom: 5px;
      font-size: 23px;
    }
    &:hover {
      background-color: #4d4d4d;
      color: @theme;
    }
  }
}
</style>
