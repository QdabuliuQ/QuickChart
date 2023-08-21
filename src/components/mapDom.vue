<template>
  <div :style="{
    width: width + 'px',
    height: height + 'px',
    margin: '15vh auto 0',
  }" class="transparentBg">
    <div ref="mapDomRef" id="mapDom"></div>
  </div>
</template>
<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import useProxy from "@/hooks/useProxy";
import useCommonStore from "@/store/common";
import {downloadFile} from "@/utils";


const proxy = useProxy()
const width = ref<number>(700)
const height = ref<number>(500)
const mapDomRef = ref<any>(null)
const common: any = useCommonStore()

let chartInstance: any;
let option: any = null
const optionChange = (e: any) => {
  let k: string = Object.keys(e)[0];
  for (let key in option) {
    if (key == k) {
      option[key] = e[key];
      break;
    }
  }
  // chartInstance.setOption(option, true);
  chartInstance.setOption(option);
  common.$patch((state: any) => {
    state.option = option;
  });
}
const canvasChange = (e: any) => {
  if (e.hasOwnProperty('backgroundColor')) {
    const {backgroundColor} = e;
    option.backgroundColor = backgroundColor;
    chartInstance.setOption({
      backgroundColor,
    });
  } else {
    option.backgroundColor = e
    chartInstance.setOption({
      backgroundColor: e,
    });
  }
  // 修改pinia数据
  common.$patch((state: any) => {
    state.option = option
  });
}
const downloadChart = (type: string) => {
  if (type == 'png') {
    let res = chartInstance.getDataURL({
      pixelRatio: 2,
    });
    downloadFile("chart.png", res);
  } else {
    // // 生成html字符串
    // const html = getHTML(getCode('js'));
    // // 创建一个a标签
    // let a = document.createElement("a");
    // // 创建一个包含blob对象的url
    // let url = window.URL.createObjectURL(
    //   new Blob([html], {
    //     type: "",
    //   })
    // );
    // a.href = url;
    // a.download = "chart.html";
    // a.click();
    // window.URL.revokeObjectURL(url);
  }
}
const dataChange = (e: any) => {
  let piniaOption = common.option
  for (let key in e) {
    piniaOption[key] = e[key]
  }
  chartInstance.setOption(piniaOption, true);
  // 修改pinia数据
  common.$patch((state: any) => {
    state.option = piniaOption
  });
}
const initChart = () => {
  chartInstance = proxy.$echarts.init((mapDomRef.value) as HTMLElement);
  chartInstance.clear()
  proxy.$echarts.registerMap('map', common.mapJSON);
  chartInstance.setOption(common.option);
  option = common.option;

  proxy.$Bus.on("optionChange", optionChange);  // 监听图表配置变化
  proxy.$Bus.on("canvasChange", canvasChange);  // 修改画布
  proxy.$Bus.on("downloadChart", downloadChart);  // 下载图表
  proxy.$Bus.on("dataChange", dataChange);  // 修改数据
}

onMounted(() => {
  initChart()
})

onUnmounted(() => {
  chartInstance.clear()
  proxy.$Bus.off("optionChange", optionChange);
  proxy.$Bus.off("canvasChange", canvasChange);
  proxy.$Bus.off("downloadChart", downloadChart);
})

</script>
<style lang="less">
.transparentBg {
  background-image: url("../assets/image/bg.jpg");
  background-size: cover;
  background-repeat: repeat;
  #mapDom {
    position: relative;
    margin: 0 auto;
    width: 100%;
    height: 100%;
  }
}
</style>