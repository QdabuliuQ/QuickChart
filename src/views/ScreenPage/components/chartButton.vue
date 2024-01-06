<template>
  <el-popover
    ref='chartPopoverRef'
    popper-class="functionListPopoverClass"
    placement="right-start"
    trigger="click"
    :hide-after="0"
  >
    <el-scrollbar height="400px">
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
              @click="itemClick(item)"
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
            class="pagination-class"
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
      <button-item
        @click-event="getData"
        title="图表"
        icon="i_chart"
        tip="插入图表" />
    </template>
  </el-popover>
</template>
<script setup lang="ts">
import {reactive, ref} from "vue";
import Skeleton from "@/components/skeleton.vue";
import {ajaxRequest, uuid} from "@/utils";
import useStore from "@/store";
import {getChart} from "@/network/chart";
import {Chart} from "@/types/screen";
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

const {screen} = useStore()
const chartPopoverRef = ref()
const chartList = reactive<IItem[]>([]);
const chartInfo = reactive<IInfo>({
  status: "1",
  offset: 1,
  limit: 15,
  count: 0,
});


const itemClick = (info: any) => {
  chartPopoverRef.value.hide()
  let option: Chart = {
    id: uuid(6, 36),
    type: 'chart',
    cover: info.cover,
    option: info.option,
    isLock: false,
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
  if (chartList.length !== 0) {
    return;
  }
  let res: any = await ajaxRequest(getChart, {
    offset: chartInfo.offset,
  });
  if (!res || !res.status || res.data.length == 0) {
    chartInfo.status = "3"
    return
  } else {
    chartInfo.status = "2"
  }
  if (res.status) {
    for (let item of res.data) {
      chartList.push(item);
    }
    chartInfo.count = res.count
    chartInfo.limit = res.limit
  }
};

const chartCurrentChange = (e: number) => {
  chartInfo.offset = e;
  chartList.length = 0;
  getData();
};
</script>