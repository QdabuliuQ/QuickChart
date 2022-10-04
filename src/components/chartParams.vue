<template>
  <div id="chartParams">
    <el-scrollbar :height="height">
      <div class="chartCover">
        <img :src="image" alt="">
      </div>
      <div class="btnList">
        <div @click="createCode" style="margin-right: 10px" class="btnItem">
          <i class="iconfont i_code"></i>
          配置
        </div>
        <div @click="downloadChart" class="btnItem">
          <i class="iconfont i_download"></i>
          下载
        </div>
      </div>
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
          <paramsWatermark
            v-else-if="item.name == '水印'"
            :defaultOption="item.defaultOption"
            :allOption="item.allOption"
            :opNameList="item.opNameList"
          />
          <paramsColor
            v-else-if="item.name == '颜色'"
            :defaultOption="item.defaultOption"
            :allOption="item.allOption"
          />
          <paramsXasis
            v-else-if="item.name == 'x轴'"
            :defaultOption="item.defaultOption.xAxis"
            :allOption="item.allOption.xAxis"
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
import { useRouter } from "vue-router";
import paramsTitle from "@/views/ChartPanel/components/paramsTitle.vue";
import paramsCanvas from "@/views/ChartPanel/components/paramsCanvas.vue";
import paramsGrid from "@/views/ChartPanel/components/paramsGrid.vue";
import paramsLegend from "@/views/ChartPanel/components/paramsLegend.vue";
import paramsWatermark from "@/views/ChartPanel/components/paramsWatermark.vue";
import paramsColor from "@/views/ChartPanel/components/paramsColor.vue";
import paramsXasis from "@/views/ChartPanel/components/paramsXasis.vue";

interface comInitData {
  height: string
  config: any
  options: any
  image: string
}

export default defineComponent({
  name: "chartParams",
  components: {
    paramsTitle,
    paramsCanvas,
    paramsGrid,
    paramsLegend,
    paramsWatermark,
    paramsColor,
    paramsXasis,
  },
  setup(props) {
    const router = useRouter()
    const _this: any = getCurrentInstance();
    const data: comInitData = reactive({
      height: "",
      config: null,
      options: [],
      image: ''
    });

    const createCode = (): void => {
      _this.proxy.$Bus.emit('createCode')
    }
    const downloadChart = (): void => {
      _this.proxy.$Bus.emit('downloadChart')
    }

    onMounted(() => {
      import('@/chartConfig/chart1_1').then((res: any) => {
        let tmpOption: any[] = []
        for (const item of res.default) {
          if(item.allOption) tmpOption.push(item)
        }
        data.options = tmpOption;
      })
      
      data.image = require('@/assets/image/'+router.currentRoute.value.query.id+'.jpg')

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
      createCode,
      downloadChart,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#chartParams {
  height: 100%;
  background-color: @curColor;
  .chartCover {
    width: 90%;
    height: 130px;
    overflow: hidden;
    position: relative;
    border-radius: 10px;
    margin: 10px auto;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
    }
  }
  .btnList {
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
    user-select: none;
    .btnItem {
      flex: 1;
      padding: 6px 0 8px;
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: @theme;
      color: #fff;
      border-radius: 6px;
      cursor: pointer;
      &:hover {
        background-color: @hover;
      }
      i {
        margin-right: 5px;
        font-size: 18px;
      }
    }
  }
  .optionItem {
    padding: 6px 0;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #a9a8a8;
    .optionOperation {
      width: 55%;
      display: flex;
      justify-content: flex-end;
    }
  }
  .el-collapse {
    padding: 0 12px 12px;
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
      user-select: none;
    }
  }
}
</style>