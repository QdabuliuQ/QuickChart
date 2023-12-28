<template>
  <el-popover
    ref="mapPopoverRef"
    popper-class="functionListPopoverClass"
    placement="right-start"
    trigger="click"
    :hide-after="0"
  >
    <el-scrollbar height="400px">
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
              @click="itemClick(item)"
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
      <button-item
        @click-event="getData"
        title="地图"
        icon="i_map"
        tip="插入地图" />
    </template>
  </el-popover>
</template>
<script setup lang="ts">
import {reactive, ref} from "vue";
import Skeleton from "@/components/skeleton.vue";
import {ajaxRequest, uuid} from "@/utils";
import {Map} from "@/types/screen"
import useStore from "@/store";
import {getChart} from "@/network/map";
import ButtonItem from "@/views/ScreenPage/components/buttonItem.vue";

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

const mapList = reactive<IItem[]>([]);
const {screen} = useStore()
const mapPopoverRef = ref()
const mapInfo = reactive<IInfo>({
  status: "1",
  offset: 1,
  limit: 15,
  count: 0,
});

const itemClick = (info: any) => {
  mapPopoverRef.value.hide()
  let option: Map = {
    id: uuid(6, 36),
    type: 'map',
    cover: info.cover,
    option: info.option,
    isLock: false,
    adcode: info.adcode,
    style: {
      display: "block",
      width: 200,
      height: 130,
      translateX: 0,
      translateY: 0,
      rotate: 0,
      zIndex: 0,
    },
  }
  screen.addScreenOptionOfElements(option)
}

const getData = async () => {
  if (mapList.length !== 0) {
    return;
  }
  let res: any = await ajaxRequest(getChart, {
    offset: mapInfo.offset,
  });
  mapInfo.status = "1"
  if (!res || !res.status || res.data.length == 0) {
    mapInfo.status = "3"
    return
  } else {
    mapInfo.status = "2"
  }
  if (res.status) {
    for (let item of res.data) {
      mapList.push(item);
    }
    mapInfo.count = res.count
    mapInfo.limit = res.limit
  }
};

const mapCurrentChange = (e: number) => {
  mapInfo.offset = e;
  mapList.length = 0;
  getData();
};

</script>