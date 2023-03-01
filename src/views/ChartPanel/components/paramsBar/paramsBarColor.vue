<template>
  <div id="paramsBarColor">
    <div class="uniqueOptionContainer">
      <div v-for="(item, index) in seriesData" :key="index">
        <div class="seriesItemTitle">
          {{ item.name }}
        </div>
        <div class="seriesItem" :key="i2" v-for="(series, i2) in item.data">
          <div>(颜色)柱体{{ i2 + 1 }}</div>
          <div class="optionOperation">
            <el-color-picker @change="valueChange" v-model="series.itemStyle.color" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  onMounted,
  toRefs,
  getCurrentInstance,
} from "vue";
import lodash from 'lodash'
import useCommonStore from "@/store/common";

interface comInitData {
  seriesData: any[];
}

export default defineComponent({
  name: "paramsBarColor",
  setup() {
    const _this: any = getCurrentInstance();
    const common: any = useCommonStore();
    const data: comInitData = reactive({
      seriesData: [],
    });

    data.seriesData = lodash.cloneDeep(common.option.series);
    for (let item of data.seriesData) {
      for (let c of item.data) {
        if (!c.itemStyle.color) {
          c.itemStyle.color = "";
        }
      }
    }
    
    const valueChange = () => {
      for (const item of data.seriesData) {
        for(let se of item.data) {
          if(se.itemStyle.color == '') {
            se.itemStyle = {}
          }
        }
      }
      _this.proxy.$Bus.emit('optionChange', {
        series: data.seriesData
      })
    }

    onMounted(() => {
      _this.proxy.$Bus.on("updateData", (e: any) => {
        data.seriesData = e.series;
      });
    });

    return {
      valueChange,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#paramsBarColor {
  .seriesItemTitle {
    font-weight: bold;
    color: @theme;
    font-size: 13px;
    padding: 6px 0;
  }
  .seriesItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 0;
    margin-left: 20px;
    font-size: 13px;
  }
}
</style>