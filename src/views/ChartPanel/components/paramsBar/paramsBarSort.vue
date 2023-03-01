<template>
  <div id="paramsBarSort">
    <div class="uniqueOptionContainer">
      <div class="optionItem">
        <div>数据列</div>
        <div class="optionOperation">
          <el-select
            @change="selectChange"
            popper-class="paramsSelectPopperClass"
            v-model="dimensions"
            size="small"
          >
            <el-option
              v-for="item in dimensionsList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="optionItem">
        <div>升/降序</div>
        <div class="optionOperation">
          <el-select
            @change="selectChange"
            popper-class="paramsSelectPopperClass"
            v-model="order"
            size="small"
          >
            <el-option
              v-for="item in orderList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
import useCommonStore from "@/store/common";

interface comInitData {
  dimensionsList: any[];
  dimensions: string;
  orderList: { label: string; value: string }[];
  order: string;
}

export default defineComponent({
  name: "paramsBarSort",
  setup() {
    const _this: any = getCurrentInstance();
    const data: comInitData = reactive({
      dimensionsList: [],
      dimensions: "",
      order: "",
      orderList: [
        {
          label: "降序",
          value: "desc",
        },
        {
          label: "升序",
          value: "asc",
        },
      ],
    });
    const common: any = useCommonStore();

    // 切换选项
    const selectChange = () => {
      let dataset = common.option.dataset;
      let series = common.option.series;
      dataset[1].transform.config.order = data.order;
      dataset[1].transform.config.dimension = data.dimensions;
      series[0].encode.y = data.dimensions;
      _this.proxy.$Bus.emit("optionChange", {
        dataset,
        series,
      });
    };

    // 获取数据
    const getData = (d: any) => {
      let res: { label: string; value: string }[] = [];
      for (let item of d) {
        res.push({
          label: item,
          value: item,
        });
      }
      data.dimensionsList = res;
    };

    getData(common.option.dataset[0].dimensions);
    data.dimensions = common.option.dataset[1].transform.config.dimension;
    data.order = common.option.dataset[1].transform.config.order;
    onMounted(() => {
      _this.proxy.$Bus.on("updateData", (e: any) => {
        getData(e.dataset[0].dimensions);
        data.dimensions = e.dataset[1].transform.config.dimension;
        data.order = common.option.dataset[1].transform.config.order;
      });
    });
    return {
      selectChange,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#paramsBarSort {
}
</style>