<template>
  <div id="ChartPanel">
    <div class="chartContent">
      <el-scrollbar :height="height">
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
} from "vue";
import paramsPanel from "@/components/paramsPanel.vue";
import { useRouter } from "vue-router";
import chartDom from "@/components/chartDom.vue";

interface comInitData {
  id: string
  height: string
}

export default defineComponent({
  name: "ChartPanel",
  components: {
    paramsPanel,
    chartDom,
  },
  setup() {
    const _this: any = getCurrentInstance();
    const router = useRouter();
    const data: comInitData = reactive({
      id: "",
      height: document.documentElement.clientHeight + 'px'
    });
    onMounted(() => {
      data.id = router.currentRoute.value.query.id as string;
      _this.proxy.$Bus.emit("idChange", data.id);

      _this.proxy.$Bus.on('resize', (e: number) => {
        data.height = e + 'px'
      })
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