<template>
  <div class="chartMenu">
    <div class="itemContainer">
      <div ref="typeTitleRef" class="title">
        <i @click="router.push('/')" class="iconfont i_home"></i>
        插入图表
      </div>
      <el-scrollbar :height="height">
        <div class="itemList">
          <div class="itemBox" v-for="item in list" :key="item.id">
            <div @click="item.show = !item.show" class="typeCard">
              <i style="margin-right: 8px;" :class="['iconfont', item.icon]"></i>
              {{ item.type }}
              <i
                :class="['iconfont more', item.show ? 'rotateIcon' : '', 'i_hide']"
              ></i>
            </div>
            <div v-show="item.show" class="listContainer">
              <chart-item
                v-for="chart in item.charts"
                :key="chart.id"
                :cover="chart.cover"
                :id="chart.id"
                :name="chart.name"
                @click-event="clickEvent"
              />
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup lang="ts">

import {useRouter} from "vue-router";
import useProxy from "@/hooks/useProxy";
import {onMounted, onUnmounted, reactive, ref} from "vue";
import {ListInt} from "@/utils/chartItem";
import chartItem from "./chartItem.vue";

const router = useRouter()
const proxy = useProxy()
const props = defineProps<{
  itemlist: ListInt[],
  clickEvent: Function
}>()
const list = reactive<ListInt[]>(props.itemlist)
const height = ref<string>('')
const typeTitleRef = ref();

const resizeEvent = (e: number) => {
  height.value = e - typeTitleRef.value.offsetHeight - 5 + "px";
}

const clickEvent = (id: string) => {
  props.clickEvent(id)
}

proxy.$Bus.on("resize", resizeEvent);

onMounted(() => {
  height.value =
    document.documentElement.clientHeight -
    typeTitleRef.value.offsetHeight -
    5 +
    "px";
});

onUnmounted(() => {
  proxy.$Bus.off("resize", resizeEvent);
})

</script>
<style lang="less">
.chartMenu {
  width: 250px;
  height: 100%;
  background-color: @curColor;
  .title {
    position: relative;
    padding: 20px 10px 0;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
    .iconfont {
      position: absolute;
      bottom: 0;
      left: 10px;
      cursor: pointer;
      font-size: 20px;
    }
  }
  .itemList {
    padding-bottom: 15px;
    .itemBox {
      .typeCard {
        padding: 12px 15px;
        cursor: pointer;
        font-size: 13px;
        color: #e0e0e0;
        font-weight: bold;
        display: flex;
        align-items: center;
        position: relative;
        box-sizing: border-box;
        border-bottom: 1px solid #555;
        .more {
          position: absolute;
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
        }
        .rotateIcon {
          transform: translateY(-50%) rotateZ(90deg) !important;
        }
        i {
          margin-right: 5px;
          transition: 0.1s all linear;
        }
        &:hover {
          background: @theme;
          color: #fff;
        }
      }
      .listContainer {
        padding: 15px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 8px;
        box-sizing: border-box;
        border-bottom: 1px solid #555;
      }
    }
  }
}
</style>