<template>
  <div class="MapPanel">
    <div class="infoContainer" v-if="state === 1">
      <div class="leftChartContainer">
        <map-detail
          :loading="chart_loading"
          :detail-type="detailType"
          :type="type"
          :adcode="router.currentRoute.value.params.adcode as string"/>
      </div>
      <div class="rightParamsContainer">
        <div class="panelBtnList">
          <div @click="toggle(0)" :class="[opType == 0 ? 'active' : '', 'btnItem']">
            编辑数据
          </div>
          <div @click="toggle(1)" :class="[opType == 1 ? 'active' : '', 'btnItem']">
            编辑图表
          </div>
        </div>
        <div :style="{
          width: opType === 0 ? '450px' : '220px'
        }" class="paramsContainer">
          <chart-data
            v-show="opType == 0"
            :detail_type="detailType"
            :type="type"
            :key="detailType"
            :loading="data_loading" />
          <chart-params
            v-show="opType == 1"
            :loading="params_loading"
            :image="image"
            :path="'@/views/MapPanel/components/'"/>
        </div>
      </div>
    </div>
    <div v-else class="emptyContainer">
      <empty-tip />
    </div>
  </div>
</template>
<script setup lang="ts">
import {nextTick, ref} from "vue";
import useCommonStore from "@/store/common";
import {onBeforeRouteUpdate, useRouter} from "vue-router";
import {getCityJSON} from "@/network/map";
import {deepCopy} from "@/utils";
import EmptyTip from "@/components/emptyTip.vue";
import MapDetail from "@/components/mapDetail.vue";
import ChartParams from "@/components/chartParams.vue";
import ChartData from "@/components/chartData.vue";

const common: any = useCommonStore();
const router = useRouter()
let {
  id,
  adcode
} = router.currentRoute.value.params
const detailType = ref<string>('')
const type = ref<string>('')
const state = ref<number>(1)
const image = ref<string>('')
const opType = ref<number>(1)
const chart_loading = ref<boolean>(true)
const params_loading = ref<boolean>(true)
const data_loading = ref<boolean>(true)

let JSONData: any = ''
const getJSON = async () => {
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

const getConfig = async () => {
  await getJSON()
  detailType.value = id as string
  type.value = parseInt(id as string).toString()
  let m = await import("@/assets/image/map" +
  detailType.value +
  ".webp");
  image.value = m.default
  let res = await import(`@/chartConfig/config/map/${type.value}_/map${detailType.value}`)
  let option = res.default()
  let chartConfig: any[] = [];
  let tmpOption: any = {}; // 临时配置
  for(let item of option) {
    if (item.chartOption) {
      tmpOption[item.opName] = item.defaultOption[item.opName];
    }
    if (item.menuOption) {
      chartConfig.push(item);
    }
  }
  common.$patch((state: any) => {
    state.option = tmpOption;
    state.chartConfig = chartConfig;
    state.defaultOption = deepCopy(tmpOption);
    state.mapJSON = JSONData
    state.type = 'map'
  });
  chart_loading.value = false
  setTimeout(() => {
    params_loading.value = false
  }, 800)
}
getConfig()

const toggle = (type: number) => {
  opType.value = type
  if(type === 0 && data_loading.value) {
    setTimeout(() => {
      data_loading.value = false
    }, 500)
  }
}

onBeforeRouteUpdate(() => {
  chart_loading.value = true
  params_loading.value = true
  setTimeout(() => {
    id = router.currentRoute.value.params.id
    adcode = router.currentRoute.value.params.adcode
    console.log(id, adcode)
    getConfig()
  }, 300)
})

</script>
<style lang="less">
.MapPanel {
  width: 100%;
  height: 100%;
  .infoContainer {
    width: 100%;
    height: 100%;
    display: flex;
    .leftChartContainer {
      flex: 1;
    }
    .rightParamsContainer {
      width: 220px;
      .panelBtnList {
        padding: 20px 0 0;
        display: flex;
        align-items: center;
        font-size: 12.5px;
        .btnItem {
          flex: 1;
          text-align: center;
          padding: 9px 0;
          color: rgb(150, 150, 150);
          transition: 0.2s all linear;
          cursor: pointer;
          letter-spacing: 1px;
          text-indent: 1px;
        }

        .active {
          background-color: @curColor;
          color: @theme;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }
      }
      .paramsContainer {
        height: calc(100vh - 34.8px - 20px);
        position: absolute;
        right: 0;
      }
    }
  }
  .emptyContainer {
    width: 100%;
    height: 100%;
  }
}
</style>