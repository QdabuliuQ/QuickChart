<template>
  <div id="typeItem">
    <div class="itemContainer">
      <div ref="typeTitleRef" class="title">插入图表</div>
      <el-scrollbar :height="height">
        <div class="itemList">
          <div class="itemBox" v-for="item in list" :key="item.id">
            <div @click="item.show = !item.show" class="typeCard">
              <i :class="['iconfont', item.show ? 'i_show' : 'i_hide']"></i>
              {{ item.type }}
            </div>
            <div v-show="item.show" class="listContainer">
              <chartItem
                v-for="chart in item.charts"
                :key="chart.id"
                :cover="chart.cover"
                :id="chart.id"
                :name="chart.name"
              />
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  onMounted,
  toRefs,
  ref,
  getCurrentInstance,
} from "vue";
import chartItem from "./chartItem.vue";
import list, { ListInt } from "@/utils/chartItem";

interface comInitData {
  list: ListInt[];
  height: any;
}

export default defineComponent({
  name: "typeItem",
  components: {
    chartItem,
  },
  setup() {
    const _this: any = getCurrentInstance();
    const typeTitleRef = ref();
    const data: comInitData = reactive({
      list: [],
      height: 0,
    });
    onMounted(() => {
      data.height =
        document.documentElement.clientHeight -
        typeTitleRef.value.offsetHeight -
        5 +
        "px";

      data.list = list;
      _this.proxy.$Bus.on("resize", (e: number) => {
        data.height = e - typeTitleRef.value.offsetHeight - 5 + "px";
      });
    });
    return {
      typeTitleRef,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#typeItem {
  width: 250px;
  height: 100%;
  background-color: @curColor;
  .itemContainer {
    .title {
      padding: 20px 10px 0;
      text-align: center;
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .itemList {
      padding-bottom: 15px;
      .itemBox {
        .typeCard {
          padding: 8px 10px;
          margin-bottom: 5px;
          cursor: pointer;
          font-size: 14px;
          color: #fff;
          font-weight: bold;
          display: flex;
          align-items: center;
          i {
            margin-right: 5px;
            position: relative;
            top: 1px;
          }
          &:hover {
            background: @theme;
          }
        }
        .listContainer {
          padding: 0 10px 20px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 8px;
        }
      }
    }
  }
}
</style>