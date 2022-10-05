<template>
  <div id="ChartPanel">
    <div class="chartContent">
      <loading v-if="load" />
      <el-scrollbar v-else :height="height">
        <chartDom />
      </el-scrollbar>
    </div>
    <paramsPanel />
  </div>
</template>

<script lang='ts'>
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
import loading from "@/components/loading.vue";
const paramsPanel = defineAsyncComponent(
  () => import("@/components/paramsPanel.vue")
);
import chartDom from "@/components/chartDom.vue";

interface comInitData {
  id: string;
  height: string;
  load: boolean
}

export default defineComponent({
  name: "ChartPanel",
  components: {
    paramsPanel,
    chartDom,
    loading,
  },
  setup() {
    const _this: any = getCurrentInstance();
    const router = useRouter();
    const data: comInitData = reactive({
      id: "",
      height: document.documentElement.clientHeight + "px",
      load: true
    });
    onMounted(() => {
      data.id = router.currentRoute.value.query.id as string;
      _this.proxy.$Bus.emit("idChange", data.id);

      _this.proxy.$Bus.on("resize", (e: number) => {
        data.height = e + "px";
      });
      setTimeout(() => {
        data.load = false
      }, 1000);
    });

    watch(
      () => router.currentRoute.value.query.id,
      (n, o) => {
        data.id = n as string;
        _this.proxy.$Bus.emit("idChange", data.id);
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
  .chartContent {
    flex: 1;
    .el-scrollbar {
      position: relative;
    }
  }
}
</style>