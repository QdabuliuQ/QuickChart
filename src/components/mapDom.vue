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
import {onMounted, ref} from "vue";
import useProxy from "@/hooks/useProxy";
import useCommonStore from "@/store/common";
import json from "@/assets/410300.js"

console.log(json)

const proxy = useProxy()
const width = ref<number>(700)
const height = ref<number>(500)
const mapDomRef = ref(null)
const common: any = useCommonStore()

const initChart = () => {
  let chartInstance = proxy.$echarts.init(mapDomRef.value);
  console.log(common.JSON)
  proxy.$echarts.registerMap('洛阳', json);
  console.log(common.option)
  chartInstance.setOption(common.option);
}

onMounted(() => {
  initChart()
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