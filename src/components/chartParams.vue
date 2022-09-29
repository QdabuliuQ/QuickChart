<template>
  <div id="chartParams">
    <el-scrollbar :height="height">
      <el-collapse :accordion='true' v-if="options.length">
        <el-collapse-item
          v-for="item in options"
          :key="item.opName"
          :title="item.name"
          :name="item.opName"
        >
          <paramsTitle
            v-if="item.name == '标题'"
            :defaultOption="item.defaultOption"
            :allOption="item.allOption"
            :opNameList="item.opNameList"
          />
          <paramsCanvas
            v-else-if="item.name == '画布'"
            :defaultOption="item.defaultOption"
            :allOption="item.allOption"
            :opNameList="item.opNameList"
          />
          <paramsGrid
            v-else-if="item.name == '图表布局'"
            :defaultOption="item.defaultOption"
            :allOption="item.allOption"
            :opNameList="item.opNameList"
          />
          <paramsLegend
            v-else-if="item.name == '图例'"
            :defaultOption="item.defaultOption"
            :allOption="item.allOption"
            :opNameList="item.opNameList"
          />
        </el-collapse-item>
      </el-collapse>
    </el-scrollbar>
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
import paramsTitle from "@/views/ChartPanel/components/paramsTitle.vue";
import paramsCanvas from "@/views/ChartPanel/components/paramsCanvas.vue";
import paramsGrid from "@/views/ChartPanel/components/paramsGrid.vue";
import paramsLegend from "@/views/ChartPanel/components/paramsLegend.vue";

interface comInitData {
  height: string;
  config: any;
  options: any;
}

export default defineComponent({
  name: "chartParams",
  components: {
    paramsTitle,
    paramsCanvas,
    paramsGrid,
    paramsLegend,
  },
  setup(props) {
    const _this: any = getCurrentInstance();
    const data: comInitData = reactive({
      height: "",
      config: null,
      options: [],
    });
    onMounted(() => {
      import('@/chartConfig/chart1_1').then((res: any) => {
        let tmpOption: any[] = []
        for (const item of res.default) {
          if(item.allOption) tmpOption.push(item)
        }
        data.options = tmpOption;
      })

      // 监听窗口大小变化
      _this.proxy.$Bus.on("resize", (e: number) => {
        data.height = e - 54.8 + "px";
      });

      // 监听图标类型切换
      _this.proxy.$Bus.on("idChange", (e: string) => {
        let res = require("@/chartConfig/chart" + e + ".ts");
        data.options = res.default;
      });

    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#chartParams {
  height: 100%;
  background-color: @curColor;
  .optionItem {
    padding: 6px 0;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #a9a8a8;
    &:first-child {
      margin-top: 6px;
    }
    &:last-child {
      margin-bottom: 6px;
    }
    .optionOperation {
      width: 60%;
      display: flex;
      justify-content: flex-end;
    }
  }
  .el-collapse {
    padding:12px;
    border-bottom: 0;
    .el-collapse-item__wrap {
      border: 0;
    }
    .el-collapse-item__content {
      padding-bottom: 0;
    }
    .is-active {
      color: @theme !important;
      .el-collapse-item__header {
        border-bottom: 1px solid @theme;
      }
    }
    .el-collapse-item__header {
      font-weight: bold;
      height: 40px;
      box-sizing: border-box;
      color: rgb(179, 179, 179);
      border-bottom: 1px solid #575757;
    }
  }
}
</style>