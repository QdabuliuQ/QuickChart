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
        <el-dropdown trigger="click">
          <el-button class="downloadBtn" color="#626aef">
            <template #icon>
              <i style="margin-right: 4px; font-size: 14px" class="iconfont i_download"></i>
            </template>
            下载
          </el-button>
          <template #dropdown>
            <el-dropdown-menu class="configDropDownClass">
              <el-dropdown-item @click="downloadChart('html')"><i class="iconfont i_html"></i> HTML文件
              </el-dropdown-item>
              <el-dropdown-item @click="downloadChart('png')"><i class="iconfont i_png"></i> PNG图片</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
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
              <i style="margin-right: 5px" :class="['iconfont', data.activeIndex == item.opName && data.loading ? 'i_loading loadingAnimation' : item.icon]"></i>
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
  loading: boolean
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
  loading: false,
  collapseList: {},
});

const toggleItem = (e: string, p: string) => {
  if (e == data.activeIndex) {
    data.activeIndex = "";
  } else {
    data.activeIndex = e;
    // 查看map中是否存在组件缓存
    if(!componentsMap.value.has(p)) {
      data.loading = true
      setTimeout(() => {
        componentsMap.value.set(p, markRaw(defineAsyncComponent(() => import(`@/views/ChartPanel/components/${p}`))))
        data.loading = false
      }, 0)
    }
    if (!data.collapseList[e]) {
      data.collapseList[e] = true;
    }
  }
};

const createCode = (type: string): void => {
  proxy.$Bus.emit("createCode", type);
};
const downloadChart = (type: string): void => {
  proxy.$Bus.emit("downloadChart", type);
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
          .i_loading {
            transform-origin: 50% 50%;
          }
          .loadingAnimation {
            animation: rotateAnimation 1s linear infinite;
          }
          @keyframes rotateAnimation {
            0% {
              transform: rotate(0);
            }
            100% {
              transform: rotate(360deg);
            }
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
      .splitLine {
        font-size: 12px;
        font-weight: bold;
        color: @theme;
        margin: 8px 0 6px 0;
        position: relative;
        display: flex;
        align-items: center;
        padding-bottom: 5px;
        &::after {
          position: absolute;
          content: '';
          width: 30%;
          height: 3px;
          bottom: 0;
          left: 0;
          background-color: @theme;
          opacity: .4;
        }
      }
      .uniqueOptionContainer {
        padding: 0 12px;
      }
    }
  }
}
</style>