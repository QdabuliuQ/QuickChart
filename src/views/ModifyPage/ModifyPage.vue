<template>
  <div class="modifyPage">
    <div class="infoContainer" v-if="state === 1">
      <div class="leftExcelContainer">
        <chart-data
          :detail_type="detailType"
          :type="type"
          :loading="data_loading" />
      </div>
      <div class="centerChartContainer">
        <chart-detail
          :back="true"
          :update="true"
          :share="true"
          :loading="chart_loading"
          :detail-type="detailType"
          :chart_id="id as string"
          :type="type" />
      </div>
      <div class="rightParamsContainer">
        <chart-params :loading="params_loading" :image="image" />
      </div>
    </div>
    <div v-else class="emptyContainer">
      <empty-tip />
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
import chartData from "@/components/chartData.vue"
import chartParams from "@/components/chartParams.vue"
import chartDetail from "@/components/chartDetail.vue"
import emptyTip from "@/components/emptyTip.vue"
import {useRouter} from "vue-router";
import {getChartDetail} from "@/network/chart";
import useProxy from "@/hooks/useProxy";
import {createImage, deepCopy} from "@/utils";
import useCommonStore from "@/store/common";


const common: any = useCommonStore();
const proxy = useProxy()
const router = useRouter()
const { id } = router.currentRoute.value.params  // 获取图表ID

const state = ref<number>(1)
const detailType = ref<string>('')
const type = ref<string>('')
const chart_loading = ref<boolean>(true)
const params_loading = ref<boolean>(true)
const data_loading = ref<boolean>(true)
const image = ref<string>('')

const getConfig = async () => {
  let data = await getChartDetail({
    chart_id: id as string
  })
  if(!data.status) {
    state.value = 0
    return proxy.$notice({
      type: 'error',
      message: data.msg,
      position: 'top-left'
    })
  }
  image.value = data.data.cover
  detailType.value = data.data.type
  type.value = parseInt(data.data.type).toString()
  if(typeof data.data.option.backgroundColor === 'object') {  // 处理背景颜色
    let src = data.data.option.backgroundColor.image
    data.data.option.backgroundColor.image = createImage(src)
    data.data.option.backgroundColor.url = src
  }
  if(data.data.option.graphic.length) {  // 处理图形组件
    for(let item of data.data.option.graphic) {
      if(item.type === 'image') {
        let src = item.style.image
        item.style.image = createImage(src)
        item.style.url = src
      }
    }
  }
  try {
    let res = await import(`@/chartConfig/config/${parseInt(data.data.type)}_/chart${data.data.type}`)
    let option = res.default()
    let chartConfig: any[] = [];
    for(let item of option) {
      if(data.data.option.hasOwnProperty(item.opName)) {
        item.defaultOption[item.opName] = data.data.option[item.opName]
      }
      if (item.menuOption) {
        chartConfig.push(item);
      }
    }
    common.$patch((state: any) => {
      state.option = data.data.option;
      state.chartConfig = chartConfig;
      state.defaultOption = deepCopy(data.data.option);
    });
    chart_loading.value = false
    setTimeout(() => {
      params_loading.value = false
      data_loading.value = false
    }, 800)
  } catch (err) {
    state.value = 0
  }
}
getConfig()

</script>
<style lang="less">
.modifyPage {
  width: 100vw;
  height: 100vh;
  .infoContainer {
    width: 100%;
    height: 100%;
    display: flex;
    .leftExcelContainer {
      width: 450px;
    }
    .centerChartContainer {
      flex: 1;
    }
    .rightParamsContainer {
      width: 220px;
    }
  }
  .emptyContainer {
    width: 100vw;
    height: 100vh;
  }
}
</style>