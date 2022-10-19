<template>
  <div id="dataParams">
    <div class="excelContainer">
      <div class="excelBox">
        <div class="topBtnList" style="margin: 8px 0">
          <div class="leftBtn">
            <el-button color="#626aef">
              <template #icon>
                <i class="iconfont i_upload"></i>
              </template>
              上传数据
            </el-button>
            <el-button color="#626aef" >
              <template #icon>
                <i class="iconfont i_download"></i>
              </template>
              下载数据
            </el-button>
          </div>
          <div class="rightBtn">
            <el-button class="saveBtn" type="info">
              <template #icon>
                <i class="iconfont i_refresh"></i>
              </template>
              重置
            </el-button>
            <el-button class="saveBtn" type="success">
              <template #icon>
                <i class="iconfont i_save"></i>
              </template>
              保存
            </el-button>
          </div>
        </div>
        <dataExcel
          ref="dataExcelRef"
          :key="values"
          :seriesName="seriesName"
          :values="values"
          :keys="keys"
        />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  getCurrentInstance,
  ref,
} from "vue";
import useCommonStore from "@/store/common";
import dataExcel from "./dataExcel.vue";

interface comInitData {
  height: string;
  series: any[] | null;
  xAxis: any[] | null;
  dataTableDrawer: boolean;
  values: number[] | null;
  keys: number[] | string[] | null;
  seriesName: string | number;
  dataType: string;
}

export default defineComponent({
  name: "dataParams",
  props: ["type"],
  components: {
    dataExcel,
  },
  setup() {
    const _this: any = getCurrentInstance();
    const common: any = useCommonStore();
    const dataExcelRef = ref();
    const data: comInitData = reactive({
      height: "",
      series: null,
      xAxis: null,
      dataTableDrawer: false,
      values: [],
      keys: [],
      seriesName: "",
      dataType: "",
    });

    // 添加X轴
    const addXasis = () => {};
    // 添加数据
    const addSeriesData = () => {
      let d = {
        name: "系列" + (common.option.series.length + 1),
        data: [],
        type: "line",
      };
      let series = common.option.series;
      series.push(d);
      _this.proxy.$Bus.emit("optionChange", {
        series,
      });
    };
    // 保存数据
    const saveData = () => {
      // 修改的series数据
      if (data.dataType.length == 2) {
        let series = common.option.series;
        // 修改数据
        let seriesName =
          dataExcelRef.value.sheetObj.getData()[0].rows[0].cells[0].text;

        series[parseInt(data.dataType[1])].name = seriesName;
        series[parseInt(data.dataType[1])].data = dataExcelRef.value.values;
        // 发送数据
        _this.proxy.$Bus.emit("optionChange", {
          series,
        });
      } else {
        // 修改的是轴数据
      }
      // 关闭抽屉
      data.dataTableDrawer = false;
      data.dataType = "";
    };
    // 删除数据
    const deleteData = (i: number) => {
      let series = common.option.series;
      series.splice(i, 1);
      console.log(series);

      // 发送数据
      _this.proxy.$Bus.emit("optionChange", {
        series,
      });
    };
    // 编辑数据
    const editData = (name: string, _data: number[], index: number) => {
      data.dataType = "s" + index;
      data.seriesName = name;
      data.values = _data;
      data.keys =
        common.option.xAxis[0].type == "category"
          ? common.option.xAxis[0].data
          : common.option.yAxis[0].data;
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
      common,
      dataExcelRef,
      addSeriesData,
      saveData,
      deleteData,
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
  position: relative;
  .excelContainer {
    position: absolute;
    right: 0;
    width: 490px;
    height: 100%;
    background-color: #424242;
    .excelBox {
      padding: 0 10px;
      height: 91%;
      .topBtnList {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .saveBtn {
          span {
            position: relative;
            top: 0.5px;
          }
        }
      }
    }
  }
}
</style>