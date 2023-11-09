<template>
  <div class="chartData">
    <div class="excelContainer">
      <div class="topBtnList" style="margin: 8px 0">
        <div class="leftBtn">
          <input
            @change="changeEvent"
            accept=".xls,.xlsx"
            ref="uploadExcelInputRef"
            style="display: none"
            type="file"
          />
          <el-button @click="uploadExcelInputRef.click()" color="#626aef">
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
        element-loading-background="rgba(0, 0, 0, 1)"
        v-loading="loading"
      >
        <div id="dataExcel"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {onUnmounted, ref, watch} from "vue";
// import Worker from "worker-loader!@/workers/worker";
import Spreadsheet from "x-data-spreadsheet";
import zhCN from "x-data-spreadsheet/src/locale/zh-cn";
Spreadsheet.locale("zh-cn", zhCN);
import {fileType} from "@/utils/fileType";
import {exportFile, importFile, stox} from "@/utils/excelOpe";
import useProxy from "@/hooks/useProxy";
import useStore from "@/store";
import {deepCopy} from "@/utils";

const props = defineProps<{
  loading: boolean
  detail_type: string
  type: string
}>()

let timer: any;
let excelData: any, originData: any;
let sheetObj: any;
let conveyData: any, combineData: any, createInitiativeData: any;
const proxy = useProxy()
const common = useStore()
const worker = proxy.$worker
const uploadExcelInputRef = ref();
const loading = ref<boolean>(props.loading)

const setExcelData = () => {
  worker.postMessage({
    data: JSON.stringify(sheetObj.getData()[0].rows),
    options: JSON.stringify(common.option),
    handle: conveyData.toString(),
    type: 'edit'
  })
};

const changeEvent = (e: any) => {
  let file = uploadExcelInputRef.value.files[0];
  if (fileType(file.name) == "excel") {
    importFile(file, (workbook) => {
      sheetObj.loadData(stox(workbook));
      proxy.$notice({
        title: "成功",
        message: "文件上传成功",
        type: "success",
        position: "top-left",
      })
      setExcelData()
    });

  } else {
    // 类型错误
    proxy.$notice({
      title: "文件类型错误",
      message: "请上传xls，xlsx类型的文件",
      type: "error",
      position: "top-left",
    });
  }
};

const resetChartData = () => {
  loading.value = true;
  proxy.$Bus.emit("resetChartData");
  setTimeout(() => {
    sheetObj.loadData({
      name: "sheet11",
      rows: originData,
    })
  }, 0);
  setTimeout(() => {
    loading.value = false;
  }, 400);
};

const exportExcel = () => {
  exportFile(sheetObj.getData());
};


const initData = () => {
  setTimeout(() => {
    let w = document.getElementById("dataExcel")?.clientWidth;
    let h = document.getElementById("dataExcel")?.clientHeight;
    let option: any = {
      // 图表配置
      mode: "edit", // edit | read
      showToolbar: false, // 顶部工具栏
      showGrid: true,
      showContextmenu: false, // 切换右键菜单显示状态
      showBottomBar: false, // 底部工具栏
      view: {
        height: () => h,
        width: () => w,
      },
      row: {
        len: 200,
        height: 25,
      },
      col: {
        len: 100,
        width: 100,
        indexWidth: 60,
        minWidth: 60,
      },
      style: {
        bgcolor: "#ffffff",
        align: "left",
        valign: "middle",
        textwrap: false,
        strike: false,
        underline: false,
        color: "#0a0a0a",
        font: {
          name: "Helvetica",
          size: 10,
          bold: false,
          italic: false,
        },
      },
    };

    const data1 = {
      name: "sheet11",
      rows: excelData,
    };
    sheetObj = new Spreadsheet("#dataExcel", option)
      .loadData(data1) // load data
      .change((res) => {  // 图表数据修改
        clearTimeout(timer);
        timer = setTimeout(() => {
          worker.postMessage({
            data: JSON.stringify(res.rows),
            options: JSON.stringify(common.option),
            handle: conveyData.toString(),
            type: 'edit'
          })
        }, 1000);
      });
    // 设置冻结
    sheetObj.sheet.data.setFreeze(1, 0);
    sheetObj.validate();
  }, 200);
};

// worker响应函数
worker.onmessage = (e: {data: any}) => {
  if (e.data.type == 'edit') {
    // 获取计算过后的data 合并成为option
    proxy.$Bus.emit("dataChange", combineData(e.data.res));
  }
}

const initHandleFun = () => {
  const {
    createExcelData,
    conveyExcelData,
    combineOption
  } = require(`@/chartConfig/config/${common.type}/${props.type}_/${common.type}${props.detail_type}`)
  createInitiativeData = createExcelData;
  conveyData = conveyExcelData;
  combineData = combineOption
  excelData = createInitiativeData(common.option)
  originData = deepCopy(excelData)
  initData()
}

let flag = 0
let stop = watch(() => props.loading, (nval: boolean) => {
  initHandleFun()
  loading.value = nval
})
let stop2 = watch(() => props.detail_type, (nval: string) => {
  flag = 0
})

onUnmounted(() => {
  stop()
  stop2()
})

</script>
<style lang="less">
.chartData {
  height: 100%;
  padding: 0 10px;
  background-color: @curColor;
  position: relative;
  .excelContainer {
    width: 100%;
    height: 100%;
    overflow: hidden;
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
    .excelDataBox {
      height: 91%;
      border-radius: 6px;
      overflow: hidden;
      #dataExcel {
        width: 100%;
        height: 100%;
        .x-spreadsheet-scrollbar {
          /* 滚动条整体 */
          &::-webkit-scrollbar {
            height: 10px;
            width: 10px;
          }
          /* 两个滚动条交接处 -- x轴和y轴 */
          &::-webkit-scrollbar-corner {
            background-color: transparent;
          }

          /* 滚动条滑块 */
          &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            background: #535353;
          }

          /* 滚动条轨道 */
          &::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            background: #ededed;
          }
        }
      }
    }
  }
}
</style>