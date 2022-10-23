<template>
  <div id="paramsColor">
    <div
      v-for="(value, key, index) in colorsData"
      :key="index"
      class="optionItem"
      :style="{ padding: value ? '4px 0' : '0' }"
    >
      <div>{{ value.name }}</div>
      <div class="optionOperation">
        <el-color-picker @change='valueChange' v-model="value.color" />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  watch,
  getCurrentInstance,
  onMounted,
} from "vue";
import useCommonStore from "@/store/common";
import { colors } from "@/chartConfig/constant";

interface comInitData {
  colorsData: { name: string; color: string }[];
}

let timer: any;
export default defineComponent({
  name: "paramsColor",
  props: ["defaultOption", "allOption", "opNameList"],

  setup(props) {
    const common = useCommonStore()
    const _this: any = getCurrentInstance();
    const data: comInitData = reactive({
      colorsData: [],
    });

    const setColor = (e: any) => {
      let res = [];
      for (let i = 0; i < e.series.length; i++) {
        res.push({
          name: e.series[i].name,
          color: colors[i % colors.length],
        });
      }
      data.colorsData = res;
    };

    // 颜色值改变
    const valueChange = () => {
      let color = []
      for(let item of data.colorsData) {
        color.push(item.color)
      }
      _this.proxy.$Bus.emit("optionChange", {
        color
      });
    }

    onMounted(() => {
      _this.proxy.$Bus.on("updateData", (e: any) => {
        setColor(e)
      });

      setColor(common.option)
    });

    watch(
      () => props.allOption.color,
      (e: any) => {
        clearTimeout(timer);

        timer = setTimeout(() => {
          let newColor = [];
          for (const item of e) {
            newColor.push(item.c);
          }
          _this.proxy.$Bus.emit("optionChange", {
            color: newColor,
          });
        }, 500);
      },
      {
        deep: true,
      }
    );

    return {
      valueChange,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
</style>