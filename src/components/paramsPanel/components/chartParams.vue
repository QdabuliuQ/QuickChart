<template>
  <div id="chartParams">
    <el-scrollbar :height="data.height">
      <div class="chartCover">
        <img :src="data.image" alt=""/>
      </div>
      <div class="btnList">
        <el-dropdown trigger="click">
          <el-button type="success">
            <template #icon>
              <i style="margin-right: 4px; font-size: 15px" class="iconfont i_code"></i>
            </template>
            配置
          </el-button>
          <template #dropdown>
            <el-dropdown-menu class="configDropDownClass">
              <el-dropdown-item @click="createCode('echart')"><i class="iconfont i_object"></i> Echarts配置
              </el-dropdown-item>
              <el-dropdown-item @click="createCode('js')"><i class="iconfont i_js"></i> JS完整配置</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button class="downloadBtn" @click="downloadChart" color="#626aef">
          <template #icon>
            <i style="margin-right: 4px; font-size: 14px" class="iconfont i_download"></i>
          </template>
          下载
        </el-button>
      </div>
      <div :key="data.key" class="collapseContainer">
        <div v-for="item in data.options" :key="item.opName" class="collapseItem">
          <div
              v-if="item.menuOption"
              @click="toggleItem(item.opName, item.componentPath)"
              :class="[
              data.activeIndex == item.opName ? 'activeCollapseTitle' : '',
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
                  data.activeIndex == item.opName ? 'rotateIcon' : '',
                  'iconfont',
                  'i_hide',
                ]"
              ></i>
            </div>
          </div>
          <div v-show="data.activeIndex == item.opName" class="collapseContent">
            <component class="paramsPanel" :is="componentsMap.get(item.componentPath)"></component>
            <!--            <paramsTitle-->
            <!--              class="paramsPanel"-->
            <!--              v-if="collapseList[item.opName] && item.opName == 'title'"-->
            <!--            />-->
            <!--            <paramsCanvas-->
            <!--              class="paramsPanel"-->
            <!--              v-else-if="collapseList[item.opName] && item.opName == 'canvas'"-->
            <!--              :defaultOption="item.defaultOption"-->
            <!--              :allOption="item.allOption"-->
            <!--              :opNameList="item.opNameList"-->
            <!--            />-->
            <!--            <paramsGrid-->
            <!--              class="paramsPanel"-->
            <!--              v-else-if="collapseList[item.opName] && item.opName == 'grid'"-->
            <!--              :defaultOption="item.defaultOption"-->
            <!--              :allOption="item.allOption"-->
            <!--              :opNameList="item.opNameList"-->
            <!--            />-->
            <!--            <paramsLegend-->
            <!--              class="paramsPanel"-->
            <!--              v-else-if="collapseList[item.opName] && item.opName == 'legend'"-->
            <!--              :defaultOption="item.defaultOption"-->
            <!--              :allOption="item.allOption"-->
            <!--              :opNameList="item.opNameList"-->
            <!--            />-->
            <!--            <paramsColor-->
            <!--              class="paramsPanel"-->
            <!--              v-else-if="collapseList[item.opName] && item.opName == 'color'"-->
            <!--              :defaultOption="item.defaultOption"-->
            <!--              :allOption="item.allOption"-->
            <!--            />-->
            <!--            <paramsXAxis class="paramsPanel"-->
            <!--              v-else-if="collapseList[item.opName] && item.opName == 'xAxis'"-->
            <!--            />-->
            <!--            <paramsYAxis class="paramsPanel"-->
            <!--              v-else-if="collapseList[item.opName] && item.opName == 'yAxis'"-->
            <!--            />-->
            <!--            <params-graphic-->
            <!--                v-else-if="collapseList[item.opName] && item.opName == 'graphic'"-->
            <!--            />-->
            <!--            <component v-else-if="item.uniqueOption" :is="item.component"></component>-->
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang='ts'>
import {
  reactive,
  onMounted,
  defineAsyncComponent,
  watch, ref, markRaw, shallowRef,
} from "vue";
import {useRouter} from "vue-router";
import useCommonStore from "@/store/common";
import useProxy from "@/hooks/useProxy";
const props = defineProps<{
  type: number
}>()

interface comInitData {
  height: string;
  config: any;
  options: any;
  image: string;
  activeIndex: string;
  collapseList: any;
  key: number
}

const common: any = useCommonStore();
const router = useRouter();
const proxy = useProxy()
const componentsMap = ref(new Map<string, any>())
const data: comInitData = reactive({
  height: "",
  config: null,
  options: [],
  image: "",
  activeIndex: "",
  key: 0,
  collapseList: {},
});

const toggleItem = (e: string, p: string): void => {
  if (e == data.activeIndex) {
    data.activeIndex = "";
  } else {
    data.activeIndex = e;
    // 查看map中是否存在组件缓存
    if(!componentsMap.value.has(p)) {
      componentsMap.value.set(p, markRaw(defineAsyncComponent(() => import(`@/views/ChartPanel/components/${p}`))))
    }
    if (!data.collapseList[e]) {
      data.collapseList[e] = true;
    }
  }
};

const createCode = (type: string): void => {
  proxy.$Bus.emit("createCode", type);
};
const downloadChart = (): void => {
  proxy.$Bus.emit("downloadChart");
};

const initParams = () => {
  data.options = common.chartConfig;
  for (let item of data.options) {
    if (item.menuOption) {
      data.collapseList[item.opName] = false;
    }
  }

  data.image = require("@/assets/image/" +
      router.currentRoute.value.params.id +
      ".webp");
}

onMounted(() => {
  initParams()
  proxy.$Bus.on('chartChange', ({cb}: { cb: Function }) => {
    initParams()
    cb()
  })
  // 监听窗口大小变化
  proxy.$Bus.on("resize", (e: number) => {
    data.height = e - 54.8 + "px";
  });

  proxy.$Bus.on('resetChartData', () => {
    data.key++
    initParams()
  })
});

watch(
    () => props.type,
    (n: number) => {
      if (n) {
        data.options = common.chartConfig;
        proxy.$Bus.emit("updateData", common.option);
      } else {
        proxy.$Bus.emit("editData");
      }
    }
);


// export default defineComponent({
//   name: "chartParams",
//   props: ["type"],
//   components: {
//     ParamsGraphic,
//     paramsTitle,
//     paramsCanvas,
//     paramsGrid,
//     paramsLegend,
//     paramsColor,
//     paramsXAxis,
//     paramsYAxis
//   },
//   setup(props) {
//     const common: any = useCommonStore();
//     const router = useRouter();
//     const _this: any = getCurrentInstance();
//     const data: comInitData = reactive({
//       height: "",
//       config: null,
//       options: [],
//       image: "",
//       activeIndex: "",
//       key: 0,
//       collapseList: {},
//     });
//
//     const toggleItem = (e: string): void => {
//       if (e == data.activeIndex) {
//         data.activeIndex = "";
//       } else {
//         data.activeIndex = e;
//         if (!data.collapseList[e]) {
//           data.collapseList[e] = true;
//         }
//       }
//     };
//     const createCode = (type: string): void => {
//       proxy.$Bus.emit("createCode", type);
//     };
//     const downloadChart = (): void => {
//       proxy.$Bus.emit("downloadChart");
//     };
//
//     const initParams = () => {
//       data.options = common.chartConfig;
//       for (let item of data.options) {
//         if (item.menuOption) {
//           data.collapseList[item.opName] = false;
//         }
//       }
//
//       data.image = require("@/assets/image/" +
//         router.currentRoute.value.params.id +
//         ".webp");
//     }
//
//     onMounted(() => {
//       initParams()
//       proxy.$Bus.on('chartChange', ({cb}: {cb: Function}) => {
//         initParams()
//         cb()
//       })
//       // 监听窗口大小变化
//       proxy.$Bus.on("resize", (e: number) => {
//         data.height = e - 54.8 + "px";
//       });
//
//       proxy.$Bus.on('resetChartData', () => {
//         data.key ++
//         initParams()
//       })
//     });
//
//     watch(
//       () => props.type,
//       (n: number) => {
//         if (n) {
//           data.options = common.chartConfig;
//           proxy.$Bus.emit("updateData", common.option);
//         } else {
//           proxy.$Bus.emit("editData");
//         }
//       }
//     );
//     return {
//       toggleItem,
//       createCode,
//       downloadChart,
//       ...toRefs(data),
//     };
//   },
// });
</script>

<style lang='less'>
.configDropDownClass {
  .el-dropdown-menu__item {
    font-size: 12px;
  }
}

#chartParams {
  height: 100%;
  background-color: @curColor;

  .chartCover {
    width: 90%;
    margin: 10px auto;

    img {
      width: 100%;
      border-radius: 8px;
      vertical-align: middle;
    }
  }

  .btnList {
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;

    .el-button {
      font-size: 13px !important;
      padding: 6px 24px !important;

      span {
        position: relative;
        top: -.5px;
      }
    }

    .downloadBtn:hover {
      background-color: #454bb0;
      border-color: #454bb0;
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
    margin: 10px 0;

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