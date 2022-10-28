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
              class='paramsPanel'
              v-if="
                collapseList[item.opName] &&
                item.opName == 'title' &&
                item.menuOption
              "
              :defaultOption="item.defaultOption"
              :allOption="item.allOption"
              :opNameList="item.opNameList"
            />
            <paramsCanvas
              class='paramsPanel'
              v-else-if="
                collapseList[item.opName] &&
                item.opName == 'canvas' &&
                item.menuOption
              "
              :defaultOption="item.defaultOption"
              :allOption="item.allOption"
              :opNameList="item.opNameList"
            />
            <paramsGrid
              class='paramsPanel'
              v-else-if="
                collapseList[item.opName] &&
                item.opName == 'grid' &&
                item.menuOption
              "
              :defaultOption="item.defaultOption"
              :allOption="item.allOption"
              :opNameList="item.opNameList"
            />
            <paramsLegend
              class='paramsPanel'
              v-else-if="
                collapseList[item.opName] &&
                item.opName == 'legend' &&
                item.menuOption
              "
              :defaultOption="item.defaultOption"
              :allOption="item.allOption"
              :opNameList="item.opNameList"
            />
            <paramsWatermark
              class='paramsPanel'
              v-else-if="
                collapseList[item.opName] &&
                item.opName == 'waterMark' &&
                item.menuOption
              "
              :defaultOption="item.defaultOption"
              :allOption="item.allOption"
              :opNameList="item.opNameList"
            />
            <paramsColor
              class='paramsPanel'
              v-else-if="
                collapseList[item.opName] &&
                item.opName == 'color' &&
                item.menuOption
              "
              :defaultOption="item.defaultOption"
              :allOption="item.allOption"
            />
            <paramsAxis
              class='paramsPanel'
              v-else-if="
                collapseList[item.opName] &&
                item.opName == 'xAxis' &&
                item.menuOption
              "
              :asis="'xAxis'"
              :defaultOption="item.defaultOption.xAxis"
              :allOption="item.allOption.xAxis"
              :opNameList="item.opNameList"
            />
            <paramsAxis
              class='paramsPanel'
              v-else-if="
                collapseList[item.opName] &&
                item.opName == 'yAxis' &&
                item.menuOption
              "
              :asis="'yAxis'"
              :defaultOption="item.defaultOption.yAxis"
              :allOption="item.allOption.yAxis"
              :opNameList="item.opNameList"
            />
          </div>
        </div>
      </div>
      <!-- <el-collapse v-model='activeIndex' :accordion="true" v-if="options.length">
        <el-collapse-item
          v-for="item in options"
          :key="item.opName"
          :name="item.opName"
        >
          <template #title>
            <i style="margin-right: 5px" :class="['iconfont', item.icon]"></i>
            {{ item.name }}
          </template>
          <paramsTitle
            v-if="item.opName == 'title' && item.menuOption"
            :defaultOption="item.defaultOption"
            :allOption="item.allOption"
            :opNameList="item.opNameList"
          />
          <paramsCanvas
            v-else-if="item.opName == 'canvas' && item.menuOption"
            :defaultOption="item.defaultOption"
            :allOption="item.allOption"
            :opNameList="item.opNameList"
          />
          <paramsGrid
            v-else-if="item.opName == 'grid' && item.menuOption"
            :defaultOption="item.defaultOption"
            :allOption="item.allOption"
            :opNameList="item.opNameList"
          />
          <paramsLegend
            v-else-if="item.opName == 'legend' && item.menuOption"
            :defaultOption="item.defaultOption"
            :allOption="item.allOption"
            :opNameList="item.opNameList"
          />
          <paramsWatermark
            v-else-if="item.opName == 'waterMark' && item.menuOption"
            :defaultOption="item.defaultOption"
            :allOption="item.allOption"
            :opNameList="item.opNameList"
          />
          <paramsColor
            v-else-if="item.opName == 'color' && item.menuOption"
            :defaultOption="item.defaultOption"
            :allOption="item.allOption"
          />
          <paramsAxis
            v-else-if="item.opName == 'xAxis' && item.menuOption"
            :asis="'xAxis'"
            :defaultOption="item.defaultOption.xAxis"
            :allOption="item.allOption.xAxis"
            :opNameList="item.opNameList"
          />
          <paramsAxis
            v-else-if="item.opName == 'yAxis' && item.menuOption"
            :asis="'yAxis'"
            :defaultOption="item.defaultOption.yAxis"
            :allOption="item.allOption.yAxis"
            :opNameList="item.opNameList"
          />
        </el-collapse-item>
      </el-collapse> -->
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
        console.log(data.collapseList[e], e);

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
      console.log(data.collapseList);

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
    height: 130px;
    overflow: hidden;
    position: relative;
    border-radius: 8px;
    margin: 10px auto;
    img {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
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
  .collapseContainer {
    margin: 15px 0;
    .collapseItem {
      margin: 2.5px 0;
      .collapseTitle {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 10px 11px 12px;
        font-size: 13.5px;
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
    }
  }
  .el-collapse {
    padding: 0 12px 12px;
    border-bottom: 0;
    .el-collapse-item__wrap {
      border: 0;
    }
    .el-collapse-item__content {
      padding-bottom: 0;
    }
    .is-active {
      color: @theme !important;
      .el-collapse-item__header {
        border-bottom: 1px solid @theme;
      }
    }
    .el-collapse-item__header {
      font-weight: bold;
      height: 40px;
      box-sizing: border-box;
      color: rgb(179, 179, 179);
      border-bottom: 1px solid #575757;
      user-select: none;
    }
  }
}
</style>