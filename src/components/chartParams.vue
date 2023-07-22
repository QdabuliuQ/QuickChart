<template>
  <div class="chartParams">
    <loading v-if="props.loading" :bgc="'rgb(66, 66, 66)'" text="" />
    <el-scrollbar v-else :height="height">
      <div class="chartCover">
        <img :src="props.image" alt=""/>
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
      <div :key="key" class="collapseContainer">
        <div v-for="item in options" :key="item.opName" class="collapseItem">
          <div
            v-if="item.menuOption"
            @click="toggleItem(item.opName, item.componentPath)"
            :class="[
              activeIndex == item.opName ? 'activeCollapseTitle' : '',
              'collapseTitle',
            ]"
          >
            <div class="leftContent">
              <i style="margin-right: 5px"
                 :class="['iconfont', activeIndex == item.opName && icon_loading ? 'i_loading loadingAnimation' : item.icon]"></i>
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
            <component class="paramsPanel" :is="componentsMap.get(item.componentPath)"></component>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import {onMounted, defineProps, reactive, ref, markRaw, defineAsyncComponent, watch, onUnmounted} from "vue";
import Loading from "@/components/loading.vue";
import useProxy from "@/hooks/useProxy";
import useCommonStore from "@/store/common";

const props = defineProps<{
  image: string
  loading: boolean
}>()

const common: any = useCommonStore();
const proxy = useProxy()
const height = ref<string>('0px')
const activeIndex = ref<string>()
const componentsMap = reactive(new Map<string, any>())
const icon_loading = ref<boolean>(false)
const options = reactive<Array<any>>([])
const key = ref<number>(0)

const initOptions = () => {
  options.push(...common.chartConfig)
}

const toggleItem = (e: string, p: string) => {
  if (e == activeIndex.value) {
    activeIndex.value = "";
  } else {
    activeIndex.value = e;
    // 查看map中是否存在组件缓存
    if (!componentsMap.has(p)) {
      icon_loading.value = true
      setTimeout(() => {
        componentsMap.set(p, markRaw(defineAsyncComponent(() => import(`@/views/ChartPanel/components/${p}`))))
        icon_loading.value = false
      }, 0)
    }
  }
};

const createCode = (type: string): void => {
  proxy.$Bus.emit("createCode", type);
};
const downloadChart = (type: string): void => {
  proxy.$Bus.emit("downloadChart", type);
};


const changeEvent = ({cb}: { cb: Function }) => {
  initOptions()
  cb()
}
proxy.$Bus.on('chartChange', changeEvent)
const resetEvent = () => {
  key.value += 1
  initOptions()
}
proxy.$Bus.on('resetChartData', resetEvent)
const resizeEvent = (e: number) => {
  height.value = document.documentElement.clientHeight + "px";
}
proxy.$Bus.on("resize", resizeEvent);

let stop = watch(() => props.loading, () => {
  componentsMap.clear()
  options.length = 0
  initOptions()
})

onMounted(() => {
  height.value = document.documentElement.clientHeight + 'px'
})
onUnmounted(() => {``
  // 取消订阅
  proxy.$Bus.off('chartChange', changeEvent)
  proxy.$Bus.off("resetChartData", resetEvent)
  proxy.$Bus.off("resize", resizeEvent)
  stop()
})

</script>
<style lang="less">
.configDropDownClass {
  .el-dropdown-menu__item {
    font-size: 12px;
  }
}
.chartParams {
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