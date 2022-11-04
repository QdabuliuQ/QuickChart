<template>
  <div id="ChartPanel">
    <div
      v-loading="loadChart"
      text="正在加载图表..."
      element-loading-background="rgba(0, 0, 0, 1)"
      class="chartContent"
    >
      <el-scrollbar :height="height">
        <chartDom :key='key1' />
      </el-scrollbar>
    </div>

    <div
      v-loading="loadParams"
      element-loading-background="#292929"
      class="paramsPanelContainer"
    >
      <paramsPanel :key='key2' />
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
} from "vue";
import { useRouter } from "vue-router";
import useCommonStore from "@/store/common";
import loading from "@/components/loading.vue";

// 定义异步组件，这里这样写是为了查看效果
const paramsPanel = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    (async function () {
      try {
        await asynImport(700);
        const res: any = await import(
          "@/components/paramsPanel/paramsPanel.vue"
        );
        resolve(res);
      } catch (error) {
        reject(error);
      }
    })();
  });
});
const chartDom = defineAsyncComponent(() => {
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
  key1: number
  key2: number
}

export default defineComponent({
  name: "ChartPanel",
  components: {
    paramsPanel,
    chartDom,
    loading,
  },
  setup() {
    const common: any = useCommonStore();
    const _this: any = getCurrentInstance();
    const router = useRouter();
    const data: comInitData = reactive({
      id: "",
      height: document.documentElement.clientHeight + "px",
      loadParams: true,
      loadChart: true,
      key1: 0,
      key2: 0
    });

    const getChartOption = (cb?:()=>void) => {
      let res: any = router.currentRoute.value.query.id?.toString().split('_')
      import(`@/chartConfig/config/${res[0]}_/chart${router.currentRoute.value.query.id}`).then(
        (res: any) => {
          let tmpOption: any = {}; // 临时配置
          let defaultOption: any = {}; // 默认配置
          let chartConfig: any[] = [];
          for (let item of res.default) {
            if (item.chartOption) {
              tmpOption[item.opName] = item.defaultOption[item.opName];
              defaultOption[item.opName] = item.defaultOption[item.opName];
            }
            if (item.allOption) {
              chartConfig.push(item);
            }
          }
          tmpOption.backgroundColor = "#fff";
          // 保存数据到pinia
          common.$patch((state: any) => {
            state.option = tmpOption;
            state.chartConfig = chartConfig;
            state.defaultOption = defaultOption;
          });
          if(cb) cb()  // 执行回调函数
        }
      );
    };

    getChartOption();

    onMounted(() => {
      data.id = router.currentRoute.value.query.id as string;

      _this.proxy.$Bus.on("resize", (e: number) => {
        data.height = e + "px";
      });

      data.loadChart = false;
      setTimeout(() => {
        data.loadParams = false;
      }, 1000);
    });

    watch(
      () => router.currentRoute.value.query.id,
      (n, o) => {
        data.id = n as string;
        data.loadParams = true;
        data.loadChart = true;
        getChartOption(() => {
          data.key1 ++
          data.key2 ++
          setTimeout(() => {
            data.loadParams = false;
            data.loadChart = false;
          }, 1000);
        })
        
        
        // _this.proxy.$Bus.emit("idChange", data.id);
      }
    );

    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#ChartPanel {
  display: flex;
  height: 100%;
  .chartContent {
    flex: 1;
    .el-scrollbar {
      position: relative;
    }
  }
  .paramsPanelContainer {
    width: 210px;
    height: 100%;
  }
}
</style>