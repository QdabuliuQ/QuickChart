<template>
  <div id="ChartPanel">
    <div v-loading="loadChart" text="正在加载图表..." element-loading-background="rgba(0, 0, 0, 1)" class="chartContent">
      <div class="scrollContainer">
        <chartDom :key="key1" />
      </div>
    </div>

    <div v-loading="loadParams" element-loading-background="#292929" class="paramsPanelContainer">
      <paramsPanel ref="paramsPanelRef" :key="key2" />
    </div>
  </div>
</template>

<script lang='ts'>
import asynImport from "@/utils/asynImport";
import {
  defineComponent,
  reactive,
  onMounted,
  toRefs,
  watch,
  getCurrentInstance,
  defineAsyncComponent,
  ref,
} from "vue";
import { useRouter } from "vue-router";
import useCommonStore from "@/store/common";
import loading from "@/components/loading.vue";
import { deepCopy } from "@/utils";


// 定义异步组件，这里这样写是为了查看效果
const paramsPanel: any = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    (async function () {
      try {
        await asynImport(700);
        const res: any = import(
          "@/components/paramsPanel/paramsPanel.vue"
        );
        resolve(res);
      } catch (error) {
        reject(error);
      }
    })();
  });
});
const chartDom: any = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    (async function () {
      try {
        await asynImport(300);
        const res: any = await import("@/components/chartDom.vue");
        resolve(res);
      } catch (error) {
        reject(error);
      }
    })();
  });
});

interface comInitData {
  id: string;
  height: string;
  loadParams: boolean;
  loadChart: boolean;
  key1: number;
  key2: number;
  paramsPanelWidth: number;
  chartBoxWidth: number;
}

export default defineComponent({
  name: "ChartPanel",
  components: {
    paramsPanel,
    chartDom,
    loading,
  },
  setup() {
    const paramsPanelRef = ref();
    const common: any = useCommonStore();
    const _this: any = getCurrentInstance();
    const router = useRouter();
    const data: comInitData = reactive({
      id: "",
      height: document.documentElement.clientHeight + "px",
      loadParams: true,
      loadChart: true,
      key1: 0,
      key2: 0,
      paramsPanelWidth: 0,
      chartBoxWidth: 0,
    });

    const getChartOption = (cb?: () => void) => {
      let res: any = router.currentRoute.value.params.id?.toString().split("_");
      import(
        `@/chartConfig/config/${res[0]}_/chart${router.currentRoute.value.params.id}`
      ).then((res: any) => {
        // 如果返回是函数 则执行 不是则直接使用配置对象
        let option = typeof res.default == 'function' ? res.default() : res.default
        let tmpOption: any = {}; // 临时配置
        let chartConfig: any[] = [];
        for (let item of option) {
          if (item.chartOption) {
            tmpOption[item.opName] = item.defaultOption[item.opName];
          }
          if (item.allOption) {
            chartConfig.push(item);
          }
        }
        tmpOption.backgroundColor = "#fff";
        console.log(tmpOption);
        
        // 保存数据到pinia
        common.$patch((state: any) => {
          state.option = tmpOption;
          state.chartConfig = chartConfig;
          state.defaultOption = deepCopy(tmpOption);
        });
        if (cb) cb(); // 执行回调函数
      });
    };

    getChartOption();

    onMounted(() => {
      data.chartBoxWidth =
        (document.getElementById("ChartPanel")?.clientWidth as number) - 210;
      data.id = router.currentRoute.value.params.id as string;

      _this.proxy.$Bus.on("resize", (e: number) => {
        data.height = e + "px";
        data.chartBoxWidth =
          (document.getElementById("ChartPanel")?.clientWidth as number) - 210;
      });

      data.loadChart = false;
      _this.proxy.$Bus.on('loadFinished', () => {
        if(data.loadParams) data.loadParams = false;
      })
    });

    watch(
      () => router.currentRoute.value.params.id,
      (n, o) => {
        data.id = n as string;
        data.loadParams = true;
        data.loadChart = true;
        getChartOption(() => {
          data.key1++;
          data.key2++;
          setTimeout(() => {
            data.loadParams = false;
            data.loadChart = false;
          }, 1000);
        });

      }
    );

    return {
      paramsPanelRef,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#ChartPanel {
  display: flex;
  height: 100%;
  justify-content: space-between;

  .scrollContainer {
    width: calc(100vw - 60px - 250px - 210px);
    height: 100vh;
    overflow: auto;

    /* 滚动条整体 */
    &::-webkit-scrollbar {
      height: 10px;
      width: 10px;
    }

    /* 两个滚动条交接处 -- x轴和y轴 */
    &::-webkit-scrollbar-corner {
      background-color: transparent;
    }

    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #535353;
    }

    /* 滚动条轨道 */
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      background: transparent;
    }
  }

  .chartContent {
    .el-scrollbar .el-scrollbar__wrap .el-scrollbar__view {
      white-space: nowrap;
      display: inline-block;
    }

    .el-scrollbar__wrap {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .paramsPanelContainer {
    width: 210px;
    height: 100%;
  }
}
</style>