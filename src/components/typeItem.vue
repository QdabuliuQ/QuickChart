<template>
  <div id="typeItem">
    <div class="itemContainer">
      <div ref="typeTitleRef" class="title">
        <i @click="router.push('/')" class="iconfont i_home"></i>
        插入图表
      </div>
      <el-scrollbar :height="height">
        <div class="itemList">
          <div class="itemBox" v-for="item in list" :key="item.id">
            <div @click="item.show = !item.show" class="typeCard">
              <i
                :class="['iconfont', item.show ? 'rotateIcon' : '', 'i_hide']"
              ></i>
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
import { useRouter } from "vue-router";
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
    const router = useRouter()
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
      router,
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
          padding: 10px;
          margin-bottom: 5px;
          cursor: pointer;
          font-size: 13px;
          color: #fff;
          font-weight: bold;
          display: flex;
          align-items: center;
          .rotateIcon {
            transform: rotateZ(90deg) !important;
          }
          i {
            margin-right: 5px;
            transition: 0.1s all linear;
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