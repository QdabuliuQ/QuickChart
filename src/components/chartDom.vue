<template>
  <div
    :style="{
      width: width + 'px',
      height: height + 'px',
      backgroundColor: bgc,
    }"
    ref="chartDomRef"
    id="chartDom"
  ></div>
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

interface comInitData {
  options: any;
  height: number;
  width: number;
  bgc: string;
}

export default defineComponent({
  name: "chartDom",
  setup() {
    const router = useRouter();
    const _this: any = getCurrentInstance();
    const chartDomRef = ref();
    const data: comInitData = reactive({
      options: null,
      height: 500,
      width: 700,
      bgc: "#fff",
    });

    onMounted(() => {
      let tmpOption: any = {};
      let myChart: any = null;
      import("@/chartConfig/chart" + router.currentRoute.value.query.id).then(
        (res: any) => {
          for (let item of res.default) {
            tmpOption[item.opName] = item.defaultOption[item.opName];
          }
          myChart = _this.proxy.$echarts.init(chartDomRef.value);
          myChart.setOption(tmpOption);
        }
      );

      // 监听图表配置变化
      _this.proxy.$Bus.on("optionChange", (e: any) => {
        console.log(e);
        
        myChart.setOption(e);
      });

      // 监听图表画布配置变化
      _this.proxy.$Bus.on("canvasChange", (e: any) => {
        let { width, height, bgc } = e;
        data.width = width;
        data.height = height;
        data.bgc = bgc;
      });
    });
    return {
      chartDomRef,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#chartDom {
  // width: 700px;
  // height: 500px;
  // background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>