<template>
  <div id="dataParams">
    <div class="excelContainer">
      <div class="excelBox">
        <div class="topBtnList" style="margin: 8px 0">
          <div class="leftBtn">
            <input
              @change="changeEvent"
              accept=".xls,.xlsx"
              ref="uploadExecelInputRef"
              style="display: none"
              type="file"
            />
            <el-button @click="uploadExcel" color="#626aef">
              <template #icon>
                <i class="iconfont i_upload"></i>
              </template>
              上传数据
            </el-button>
            <el-button @click="exportExcel" color="#626aef">
              <template #icon>
                <i class="iconfont i_download"></i>
              </template>
              下载数据
            </el-button>
          </div>
          <div class="rightBtn">
            <el-button @click="resetChartData" class="resetBtn" type="info">
              <template #icon>
                <i class="iconfont i_refresh"></i>
              </template>
              重置
            </el-button>
          </div>
        </div>
        <div
          class="excelDataBox"
          style="height: 100%"
          element-loading-background="rgba(0, 0, 0, 1)"
          v-loading="loading"
        >
          <dataExcel :key="key" ref="dataExcelRef" />
        </div>
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
import dataExcel from "@/components/dataExcel.vue";
import loading from "@/components/loading.vue";
import { exportFile, importFile, stox } from "@/utils/excelOpe";
import { fileType } from "@/utils/fileType";

interface comInitData {
  height: string;
  series: any[] | null;
  xAxis: any[] | null;
  dataTableDrawer: boolean;
  values: number[] | null;
  keys: number[] | string[] | null;
  seriesName: string | number;
  dataType: string;
  key: number;
  loading: boolean;
}

export default defineComponent({
  name: "dataParams",
  props: ["type"],
  components: {
    dataExcel,
    loading,
  },
  setup() {
    const _this: any = getCurrentInstance();
    const common: any = useCommonStore();
    const dataExcelRef = ref();
    const uploadExecelInputRef = ref();
    const data: comInitData = reactive({
      height: "",
      series: null,
      xAxis: null,
      dataTableDrawer: false,
      values: [],
      keys: [],
      seriesName: "",
      dataType: "",
      key: 0,
      loading: true,
    });

    // 重置图表数据
    const resetChartData = () => {
      data.loading = true;
      _this.proxy.$Bus.emit("resetChartData");
      setTimeout(() => {
        data.key++;
      }, 0);
      setTimeout(() => {
        data.loading = false;
      }, 400);
    };

    // 导出文件
    const exportExcel = () => {
      exportFile(dataExcelRef.value.sheetObj.getData());
    };
    // 导入文件
    const uploadExcel = () => {
      uploadExecelInputRef.value.click();
    };
    // 监听上传的文件
    const changeEvent = (e: any) => {
      let file = uploadExecelInputRef.value.files[0];
      if (fileType(file.name) == "excel") {
        importFile(file, (workbook) => {
          dataExcelRef.value.sheetObj.loadData(stox(workbook));
          console.log(dataExcelRef.value.sheetObj.getData());

        });
        
      } else {
        // 类型错误
        _this.proxy.$notice({
          title: "文件类型错误",
          message: "请上传xls，xlsx类型的文件",
          type: "error",
          position: "top-left",
        });
      }
    };

    onMounted(() => {
      // 监听窗口大小变化
      _this.proxy.$Bus.on("resize", (e: number) => {
        data.height = e - 54.8 + "px";
      });

      setTimeout(() => {
        data.loading = false;
      }, 400);
    });
    return {
      common,
      dataExcelRef,
      uploadExecelInputRef,
      exportExcel,
      changeEvent,
      uploadExcel,
      resetChartData,
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
      .excelDataBox {
        border-radius: 6px;
        overflow: hidden;
      }
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