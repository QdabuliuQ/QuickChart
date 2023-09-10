<template>
  <div class="Modify_MapPage">
    <div class="infoContainer" v-if="state === 1">
      <div class="leftExcelContainer">
        <chart-data
          :detail_type="detailType"
          :type="type"
          :loading="data_loading" />
      </div>
      <div class="centerChartContainer">
        <map-detail
          :loading="chart_loading"
          :detail-type="detailType"
          :type="type"
          :update="self"
          :share="true"
          :back="true"
          :adcode="adcode"
          :map_id="id as string"/>
      </div>
      <div class="rightParamsContainer">
        <chart-params
          :loading="params_loading"
          :image="image" />
      </div>
    </div>
    <div v-else class="emptyContainer">
      <empty-tip />
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import EmptyTip from "@/components/emptyTip.vue";
import {getChartDetail, getCityJSON} from "@/network/map"
import {useRoute} from "vue-router";
import {createImage, deepCopy} from "@/utils";
import useCommonStore from "@/store/common";
import ChartData from "@/components/chartData.vue";
import MapDetail from "@/components/mapDetail.vue";
import ChartParams from "@/components/chartParams.vue";

const common: any = useCommonStore();
const route = useRoute()
const { id } = route.params
let JSONData: any = null
const state = ref<number>(1)
const detailType = ref<string>('')
const type = ref<string>('')
const chart_loading = ref<boolean>(true)
const params_loading = ref<boolean>(true)
const data_loading = ref<boolean>(true)
const adcode = ref<string>('')
const image = ref<string>('')
const self = ref<boolean>(false)

const getDetail = async () => {
  let data: any = await getChartDetail({
    map_id: id as string
  })
  state.value = data.status
  if (data.status !== 1) return
  adcode.value = data.data.adcode
  image.value = data.data.cover
  self.value = data.self
  await getJSON(adcode.value)
  await getConfig(data.data.type, data.data.option)
}
const getJSON = async (adcode: string) => {
  if(localStorage.getItem(adcode as string)) {
    JSONData = JSON.parse(localStorage.getItem(adcode as string) as string)
  } else {
    let data = await getCityJSON({
      adcode: adcode as string
    })
    JSONData = data.data
    localStorage.setItem(adcode as string, JSON.stringify(data.data))
  }
}
const getConfig = async (_type: string, _option: any) => {
  detailType.value = _type
  type.value = parseInt(_type).toString()

  if(typeof _option.backgroundColor === 'object') {  // 处理背景颜色
    let src = _option.backgroundColor.image
    _option.backgroundColor.image = createImage(src)
    _option.backgroundColor.url = src
  }
  if(_option.graphic.length) {  // 处理图形组件
    for(let item of _option.graphic) {
      if(item.type === 'image') {
        // let src = item.style.url
        item.style.image = createImage(item.style.url)
        // item.style.url = src
      }
    }
  }
  try {
    let res = await import(`@/chartConfig/config/map/${type.value}_/map${detailType.value}`)
    let option = res.default()
    let chartConfig: any[] = [];
    for(let item of option) {
      if(_option.hasOwnProperty(item.opName)) {
        item.defaultOption[item.opName] = _option[item.opName]
      }
      if (item.menuOption) {
        chartConfig.push(item);
      }
    }
    common.$patch((state: any) => {
      state.option = _option;
      state.chartConfig = chartConfig;
      state.defaultOption = deepCopy(_option);
      state.mapJSON = JSONData
      state.type = 'map'
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
getDetail()

</script>

<style lang="less">
.Modify_MapPage {
  height: 100vh;
  max-height: 100vh;
  min-height: 100vh;
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