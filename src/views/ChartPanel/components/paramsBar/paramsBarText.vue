<template>
  <div id="paramsBarText">
    <div class="uniqueOptionContainer">
      <div v-for="(item, index) in seriesData" :key="index">
        <div class="seriesItemTitle">
          {{ item.name }}
        </div>
        <div class="seriesItem" :key="i2" v-for="(series, i2) in item.data">
          <div style="width: 100%">(文本)柱体{{ i2 + 1 }}</div>
          <div class="optionOperation">
            <el-select @change="optionChange" v-model="series.label.position" size="small">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
import lodash from "lodash";
import useCommonStore from "@/store/common";

interface comInitData {
  seriesData: any[];
  options: {label: string, value: string}[]
}

export default defineComponent({
  name: "paramsBarText",
  setup() {
    const _this: any = getCurrentInstance();
    const common: any = useCommonStore();
    const data: comInitData = reactive({
      seriesData: [],
      options: [
        {
          label: '上方',
          value: 'top',
        },
        {
          label: '下方',
          value: 'bottom',
        },
        {
          label: '左侧',
          value: 'left',
        },
        {
          label: '右侧',
          value: 'right',
        },
      ]
    });

    data.seriesData = lodash.cloneDeep(common.option.series);
    
    const optionChange = () => {
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
      optionChange,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#paramsBarText {
  .seriesItemTitle {
    font-weight: bold;
    color: @theme;
    font-size: 13px;
    padding: 6px 0;
  }
}
</style>