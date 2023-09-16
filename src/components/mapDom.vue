<template>
  <div :style="{
    width: width + 'px',
    height: height + 'px',
    margin: '15vh auto 0',
  }" class="transparentBg">
    <div ref="mapDomRef" id="mapDom"></div>
    <el-dialog class="codeDialogClass" v-model="codeDialog" title="代码配置" width="50%">
      <highlightjs class="language-javascript" language="javascript" :code="code" />
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import useProxy from "@/hooks/useProxy";
import useCommonStore from "@/store/common";
import {downloadFile, generateMapCode, htmlDownload} from "@/utils";
import {useRoute} from "vue-router";
import {oss} from "@/network";

const common: any = useCommonStore()
const route = useRoute()
const proxy = useProxy()
const width = ref<number>(700)
const height = ref<number>(500)
const codeDialog = ref<boolean>(false)
const code = ref<string>('')
const mapDomRef = ref<any>(null)
const chart_i = ref<any>()

defineExpose({
  chartInstance: chart_i
})

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
    // 生成html字符串
    const html = generateMapCode(
      common.option,
      width.value,
      height.value,
      route.params.adcode as string
    )
    htmlDownload(html)
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

const createCode = (type: string) => {

  const jData = JSON.stringify(common.option, null, 4);
  const option = jData.replace(/"(\w+)":/g, "$1:");
  if (type === "js") {
    code.value = `// mapJson url: ${oss}/map/cityJSON?adcode=${route.params.adcode}
const chart = echarts.init(document.getElementById('chart'));
const option = ${option};
chart.setOption(option);  //设置option`
  } else {
    code.value = option
  }
  codeDialog.value = true
}

const initChart = () => {
  chartInstance = proxy.$echarts.init((mapDomRef.value) as HTMLElement);
  chart_i.value = chartInstance
  chartInstance.clear()
  proxy.$echarts.registerMap('map', common.mapJSON);
  chartInstance.setOption(common.option);
  option = common.option;

  proxy.$Bus.on("optionChange", optionChange);  // 监听图表配置变化
  proxy.$Bus.on("canvasChange", canvasChange);  // 修改画布
  proxy.$Bus.on("downloadChart", downloadChart);  // 下载图表
  proxy.$Bus.on("dataChange", dataChange);  // 修改数据
  proxy.$Bus.on("createCode", createCode);
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