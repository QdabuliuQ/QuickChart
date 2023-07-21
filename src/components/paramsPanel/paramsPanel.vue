<template>
  <div id="paramsPanel">
    <div class="panelBtnList">
      <div @click="btnClick(0)" :class="[data.type == 0 ? 'active' : '', 'btnItem']">
        编辑数据
      </div>
      <div @click="btnClick(1)" :class="[data.type == 1 ? 'active' : '', 'btnItem']">
        编辑图表
      </div>
    </div>
    <div class="paramsContainer">
      <dataParams v-if="data.type == 0"/>
      <chartParams :type='data.type' v-show="data.type == 1"/>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {
  reactive,
  defineAsyncComponent
} from "vue";

const chartParams = defineAsyncComponent(() => import("@/components/paramsPanel/components/chartParams.vue"))
const dataParams = defineAsyncComponent(() => import("@/components/paramsPanel/components/dataParams.vue"))

interface comInitData {
  type: number;
}

const data: comInitData = reactive({
  type: 1,
});

const btnClick = (e: number) => {
  data.type = e;
};
</script>

<style lang='less'>
#paramsPanel {
  width: 100%;
  height: 100%;
  background-color: #303030;

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
  }
}
</style>