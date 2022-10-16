<template>
  <div id="dataParams">
    <el-scrollbar :height="height">
      <div class="itemListContainer">
        <div class="dataItem seriesData">
          <div class="itemTitle">图表数据</div>
          <div class="itemTip">编辑图表的各项数据</div>
          <div v-for="(item, index) in series" :key="index" class="item">
            <div class="optionTitle">
              <i class="iconfont i_data"></i>
              {{ item.name }}
            </div>
            <div class="optionBtn">
              <el-button
                @click="editData(item.name, item.data)"
                type="primary"
                size="small"
                >编辑数据</el-button
              >
            </div>
          </div>
          <div class="addDataItem">
            <i class="iconfont i_plus"></i>
            添加数据项
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
  <el-drawer v-model="dataTableDrawer" custom-class="dataTableDrawerClass">
    <template #header>
      <h4>编辑数据</h4>
    </template>
    <template #default>
      <dataExcel />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button>取消</el-button>
        <el-button type="primary">保存</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  getCurrentInstance,
} from "vue";
import useCommonStore from "@/store/common";
import dataExcel from './dataExcel.vue'

interface comInitData {
  height: string;
  series: any[] | null;
  xAxis: any[] | null;
  dataTableDrawer: boolean;
}

export default defineComponent({
  name: "dataParams",
  props: ["type"],
  components: {
    dataExcel
  },
  setup() {
    const _this: any = getCurrentInstance();
    const common = useCommonStore();
    const data: comInitData = reactive({
      height: "",
      series: null,
      xAxis: null,
      dataTableDrawer: false,
      
    });

    const editData = (name: string, _data: number[]) => {
      data.dataTableDrawer = true;
    };
    const getData = () => {
      let { series } = common.option as any;
      data.series = series;

      let { xAxis } = common.option as any;
      data.xAxis = xAxis;
    };
    onMounted(() => {
      getData();
      // 监听窗口大小变化
      _this.proxy.$Bus.on("resize", (e: number) => {
        data.height = e - 54.8 + "px";
      });
    });
    return {
      editData,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
.dataTableDrawerClass {
  width: 40% !important;
  .el-drawer__header {
    padding: 15px 15px 0;
    margin-bottom: 0;
    h4 {
      margin: 10px 0;
    }
  }
  .el-drawer__body {
    position: relative;
    margin: 10px;
    padding: 0;
  }
  .el-drawer__footer {
    .el-button {
      font-size: 13px;
    }
  }
}
#dataParams {
  height: 100%;
  background-color: @curColor;
  .itemListContainer {
    padding: 12px;
    .dataItem {
      .itemTitle {
        font-size: 13px;
        color: @theme;
        font-weight: bold;
      }
      .itemTip {
        margin-top: 3px;
        margin-bottom: 10px;
        font-size: 12px;
        color: #a9a8a8;
        letter-spacing: 2px;
      }
      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        .optionTitle {
          font-size: 12px;
          display: flex;
          align-items: center;
          .iconfont {
            margin-right: 3px;
          }
        }
      }
      .addDataItem {
        width: 100%;
        padding: 8px 0 9px;
        text-align: center;
        font-size: 12px;
        border: 1px solid #636363;
        border-radius: 5px;
        transition: 0.2s all linear;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        .iconfont {
          margin-right: 5px;
        }
        &:hover {
          background-color: #ffae3445;
          color: @theme;
          border: 1px solid @theme;
        }
      }
    }
  }
}
</style>