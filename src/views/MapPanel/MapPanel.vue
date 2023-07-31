<template>
  <div class="MapPanel">
    <div class="infoContainer" v-if="state === 1">
      <div class="leftChartContainer">
        <map-detail
          :loading="chart_loading"
          :detail-type="detailType"
          :type="type"/>
      </div>
    </div>
    <div v-else class="emptyContainer">
      <empty-tip />
    </div>
  </div>
</template>
<script setup lang="ts">

import {useRouter} from "vue-router";
import {getCityJSON} from "@/network/map";
import {ref} from "vue";
import EmptyTip from "@/components/emptyTip.vue";
import MapDetail from "@/components/mapDetail.vue";
import {deepCopy} from "@/utils";
import useCommonStore from "@/store/common";

const common: any = useCommonStore();
const router = useRouter()
const {
  id,
  adcode
} = router.currentRoute.value.params
const detailType = ref<string>('')
const type = ref<string>('')
const state = ref<number>(1)
const image = ref<string>('')
const chart_loading = ref<boolean>(true)
let JSONData: any = ''
const getJSON = async () => {
  if(localStorage.getItem("MAP"+adcode)) {
    JSONData = localStorage.getItem("MAP"+adcode)
  } else {
    let data = await getCityJSON({
      adcode: adcode as string
    })
    JSONData = data.data
    localStorage.setItem("MAP"+adcode, JSONData)
  }
}

const getConfig = async () => {
  await getJSON()
  detailType.value = id as string
  type.value = parseInt(id as string).toString()
  let m = await import("@/assets/image/" +
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
    state.JSON = JSON.stringify(JSONData)
  });
  chart_loading.value = false
}
getConfig()

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