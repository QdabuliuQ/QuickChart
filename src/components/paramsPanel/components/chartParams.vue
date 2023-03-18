<template>
  <div id="chartParams">
    <el-scrollbar :height="height">
      <div class="chartCover">
        <img :src="image" alt="" />
      </div>
      <div class="btnList">
        <el-button @click="createCode" type="success">
          <template #icon>
            <i class="iconfont i_code"></i>
          </template>
          配置
        </el-button>
        <el-button @click="downloadChart" color="#626aef">
          <template #icon>
            <i class="iconfont i_download"></i>
          </template>
          下载
        </el-button>
      </div>
      <div class="collapseContainer">
        <div v-for="item in options" :key="item.opName" class="collapseItem">
          <div
            v-if="item.menuOption"
            @click="toggleItem(item.opName)"
            :class="[
              activeIndex == item.opName ? 'activeCollapseTitle' : '',
              'collapseTitle',
            ]"
          >
            <div class="leftContent">
              <i style="margin-right: 5px" :class="['iconfont', item.icon]"></i>
              {{ item.name }}
            </div>
            <div class="rightIcon">
              <i
                :class="[
                  activeIndex == item.opName ? 'rotateIcon' : '',
                  'iconfont',
                  'i_hide',
                ]"
              ></i>
            </div>
          </div>
          <div v-show="activeIndex == item.opName" class="collapseContent">
            <paramsTitle
              class="paramsPanel"
              v-if="collapseList[item.opName] && item.opName == 'title'"
              :defaultOption="item.defaultOption"
              :allOption="item.allOption"
              :opNameList="item.opNameList"
            />
            <paramsCanvas
              class="paramsPanel"
              v-else-if="collapseList[item.opName] && item.opName == 'canvas'"
              :defaultOption="item.defaultOption"
              :allOption="item.allOption"
              :opNameList="item.opNameList"
            />
            <paramsGrid
              class="paramsPanel"
              v-else-if="collapseList[item.opName] && item.opName == 'grid'"
              :defaultOption="item.defaultOption"
              :allOption="item.allOption"
              :opNameList="item.opNameList"
            />
            <paramsLegend
              class="paramsPanel"
              v-else-if="collapseList[item.opName] && item.opName == 'legend'"
              :defaultOption="item.defaultOption"
              :allOption="item.allOption"
              :opNameList="item.opNameList"
            />
            <paramsWatermark
              class="paramsPanel"
              v-else-if="
                collapseList[item.opName] && item.opName == 'waterMark'
              "
              :defaultOption="item.defaultOption"
              :allOption="item.allOption"
              :opNameList="item.opNameList"
            />
            <paramsColor
              class="paramsPanel"
              v-else-if="collapseList[item.opName] && item.opName == 'color'"
              :defaultOption="item.defaultOption"
              :allOption="item.allOption"
            />
            <paramsAxis
              class="paramsPanel"
              v-else-if="collapseList[item.opName] && item.opName == 'xAxis'"
              :asis="'xAxis'"
              :defaultOption="item.defaultOption.xAxis"
              :allOption="item.allOption.xAxis"
              :opNameList="item.opNameList"
            />
            <paramsAxis
              class="paramsPanel"
              v-else-if="collapseList[item.opName] && item.opName == 'yAxis'"
              :asis="'yAxis'"
              :defaultOption="item.defaultOption.yAxis"
              :allOption="item.allOption.yAxis"
              :opNameList="item.opNameList"
            />
            <component v-if="item.uniqueOption" :is="item.component"></component>

          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  onMounted,
  toRefs,
  getCurrentInstance,
  defineAsyncComponent,
  watch,
} from "vue";
import { useRouter } from "vue-router";
import useCommonStore from "@/store/common";
const paramsTitle = defineAsyncComponent(
  () => import("@/views/ChartPanel/components/paramsTitle.vue")
);
const paramsCanvas = defineAsyncComponent(
  () => import("@/views/ChartPanel/components/paramsCanvas.vue")
);
const paramsGrid = defineAsyncComponent(
  () => import("@/views/ChartPanel/components/paramsGrid.vue")
);
const paramsLegend = defineAsyncComponent(
  () => import("@/views/ChartPanel/components/paramsLegend.vue")
);
const paramsWatermark = defineAsyncComponent(
  () => import("@/views/ChartPanel/components/paramsWatermark.vue")
);
const paramsColor = defineAsyncComponent(
  () => import("@/views/ChartPanel/components/paramsColor.vue")
);
const paramsAxis = defineAsyncComponent(
  () => import("@/views/ChartPanel/components/paramsAxis.vue")
);

interface comInitData {
  height: string;
  config: any;
  options: any;
  image: string;
  activeIndex: string;
  collapseList: any;
}

export default defineComponent({
  name: "chartParams",
  props: ["type"],
  components: {
    paramsTitle,
    paramsCanvas,
    paramsGrid,
    paramsLegend,
    paramsWatermark,
    paramsColor,
    paramsAxis,
  },
  setup(props) {
    const common: any = useCommonStore();
    const router = useRouter();
    const _this: any = getCurrentInstance();
    const data: comInitData = reactive({
      height: "",
      config: null,
      options: [],
      image: "",
      activeIndex: "",
      collapseList: {},
    });

    const toggleItem = (e: string): void => {
      if (e == data.activeIndex) {
        data.activeIndex = "";
      } else {
        data.activeIndex = e;
        if (!data.collapseList[e]) {
          data.collapseList[e] = true;
        }
      }
    };
    const createCode = (): void => {
      _this.proxy.$Bus.emit("createCode");
    };
    const downloadChart = (): void => {
      _this.proxy.$Bus.emit("downloadChart");
    };

    onMounted(() => {
      data.options = common.chartConfig;
      
      for (let item of data.options) {
        if (item.menuOption) {
          data.collapseList[item.opName] = false;
        }
      }

      data.image = require("@/assets/image/" +
        router.currentRoute.value.query.id +
        ".webp");

      // 监听窗口大小变化
      _this.proxy.$Bus.on("resize", (e: number) => {
        data.height = e - 54.8 + "px";
      });
      
    });

    watch(
      () => props.type,
      (n: number) => {
        if (n) {
          data.options = common.chartConfig;
          _this.proxy.$Bus.emit("updateData", common.option);
        } else {
          _this.proxy.$Bus.emit("editData");
        }
      }
    );
    return {
      toggleItem,
      createCode,
      downloadChart,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#chartParams {
  height: 100%;
  background-color: @curColor;
  .chartCover {
    width: 90%;
    margin: 10px auto;
    img {
      width: 100%;
      border-radius: 8px;
    }
  }
  .btnList {
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
    user-select: none;
    .el-button {
      font-size: 13px !important;
      padding: 6px 20px !important;
      span {
        position: relative;
        top: -1px;
      }
    }
  }
  .optionItem {
    padding: 6px 0;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #a9a8a8;
    .optionOperation {
      width: 55%;
      display: flex;
      justify-content: flex-end;
    }
  }
  .seriesItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 0;
    font-size: 12px;
    color: #a9a8a8;
    .optionOperation {
      width: 55%;
      display: flex;
      justify-content: flex-end;
    }
  }
  .collapseContainer {
    margin: 15px 0;
    .collapseItem {
      margin: 2.5px 0;
      .collapseTitle {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 10px 12px 12px;
        font-size: 13px;
        transition: 0.1s all linear;
        border-bottom: 1px solid #565656;
        &:hover {
          background: @theme;
          color: #fff;
        }
        .leftContent {
          display: flex;
          align-items: center;
          .iconfont {
            position: relative;
            top: 0.5px;
          }
        }
        .rightIcon {
          .iconfont {
            display: block;
            font-size: 18px;
            position: relative;
            top: 1px;
            transition: 0.1s all linear;
          }
        }
      }
      .activeCollapseTitle {
        background: @theme;
        color: #fff;
      }
      .rotateIcon {
        transform: rotateZ(90deg) !important;
      }
    }
    .collapseContent {
      .paramsPanel {
        padding: 0 12px;
      }
      .uniqueOptionContainer {
        padding: 0 12px;
      }
    }
  }
}
</style>