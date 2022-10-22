<template>
  <div id="dataExcel"></div>
  <loading v-if="!sheetObj" />
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  onMounted,
  toRefs,
  ref,
  getCurrentInstance,
} from "vue";
import { useRouter } from "vue-router";
import useCommonStore from '@/store/common'
import Spreadsheet from "x-data-spreadsheet";
import zhCN from "x-data-spreadsheet/src/locale/zh-cn";
Spreadsheet.locale("zh-cn", zhCN);
import loading from './loading.vue'

interface comInitData {
  sheetObj: any;
  excelData: any;
  initativeData: any; // 初始数据
  option: any;
}

let timer: any;
let createInitiativeData: any = null;
let conveyData: any = null;
export default defineComponent({
  name: "dataExcel",
  components: {
    loading
  },
  setup() {
    const common: any = useCommonStore()
    const _this: any = getCurrentInstance();
    const router = useRouter();
    const willtableRef = ref();
    const data: comInitData = reactive({
      sheetObj: null,
      excelData: null,
      initativeData: null,
      option: null,
    });

    // 初始化图表
    const initData = () => {
      setTimeout(() => {
        let w = document.getElementById("dataExcel")?.clientWidth;
        let h = document.getElementById("dataExcel")?.clientHeight;

        data.option = {
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
            len: 100,
            height: 25,
          },
          col: {
            len: 30,
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
          rows: data.excelData,
        };
        data.sheetObj = new Spreadsheet("#dataExcel", data.option)
          .loadData(data1) // load data
          .change((res) => {
            // 导出数据
          });

        // 设置冻结
        data.sheetObj.sheet.data.setFreeze(1, 0);

        // 编辑单元格触发
        data.sheetObj.on(
          "cell-edited",
          () => {
            // 防抖
            clearTimeout(timer);
            timer = setTimeout(() => {
              let chartOption = conveyData(data.sheetObj.getData()[0].rows);
              _this.proxy.$Bus.emit("dataChange", {
                data: chartOption.categoryData,
                series: chartOption.series,
              });
            }, 500);
          }
        );

        let chartOption = conveyData(data.sheetObj.getData()[0].rows);
        _this.proxy.$Bus.emit("dataChange", {
          data: chartOption.categoryData,
          series: chartOption.series,
        });

        // data validation
        data.sheetObj.validate();
      }, 200);
    };
    
    onMounted(() => {
      data.sheetObj = null
      createInitiativeData = require("@/chartConfig/chart" +
        router.currentRoute.value.query.id).createExcelData;
      conveyData = require("@/chartConfig/chart" +
        router.currentRoute.value.query.id).conveyExcelData;
        
      data.excelData = createInitiativeData(common.option);
      data.initativeData = createInitiativeData(common.option);
      
      initData();
    });

    return {
      willtableRef,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
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
</style>