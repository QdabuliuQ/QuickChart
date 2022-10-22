<template>
  <div id="paramsPanel">
    <div class="panelBtnList">
      <div @click="btnClick(0)" :class="[type == 0 ? 'active' : '', 'btnItem']">
        编辑数据
      </div>
      <div @click="btnClick(1)" :class="[type == 1 ? 'active' : '', 'btnItem']">
        编辑表格
      </div>
    </div>
    <div class="paramsContainer">
      <dataParams v-if="type == 0" />
      <chartParams v-show="type == 1" />
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  defineAsyncComponent
} from "vue";
const chartParams = defineAsyncComponent(() => import("@/components/paramsPanel/components/chartParams.vue"))
const dataParams = defineAsyncComponent(() => import("@/components/paramsPanel/components/dataParams.vue"))

interface comInitData {
  type: number;
}

export default defineComponent({
  name: "paramsPanel",
  components: {
    chartParams,
    dataParams
  },
  setup() {
    const data: comInitData = reactive({
      type: 1,
    });

    const btnClick = (e: number) => {
      data.type = e;
    };

    return {
      btnClick,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#paramsPanel {
  width: 210px;
  height: 100%;
  background-color: #303030;
  .panelBtnList {
    padding: 20px 0 0;
    display: flex;
    align-items: center;
    font-size: 12.5px;
    font-weight: bold;
    .btnItem {
      flex: 1;
      text-align: center;
      padding: 9px 0;
      color: rgb(150, 150, 150);
      transition: 0.2s all linear;
      cursor: pointer;
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