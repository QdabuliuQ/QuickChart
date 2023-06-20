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
  onUnmounted,
} from "vue";
import { useRouter } from "vue-router";
import useCommonStore from "@/store/common";
import Worker from "worker-loader!@/workers/worker";
import Spreadsheet from "x-data-spreadsheet";
import zhCN from "x-data-spreadsheet/src/locale/zh-cn";
Spreadsheet.locale("zh-cn", zhCN);
import loading from "./loading.vue";

interface comInitData {
  sheetObj: any;
  excelData: any;
  initativeData: any; // 初始数据
  option: any;
  conveyData: any;
}

let timer: any;
export default defineComponent({
  name: "dataExcel",
  components: {
    loading,
  },
  setup() {
    let combineData: any = null, createInitiativeData: any = null
    let excelData: any = null, conveyData: any = null
    const worker = new Worker()
    const common: any = useCommonStore();
    const _this: any = getCurrentInstance();
    const router = useRouter();
    const willtableRef = ref();
    const data: comInitData = reactive({
      sheetObj: null,
      excelData: null,
      initativeData: null,
      option: null,
      conveyData: {},
    });

    const setExcelData = () => {
      worker.postMessage({
        data: JSON.stringify(data.sheetObj.getData()[0].rows),
        handle: conveyData.toString(),
        type: 'edit'
      })
    };

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
          rows: data.excelData,
        };
        data.sheetObj = new Spreadsheet("#dataExcel", data.option)
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
        data.sheetObj.sheet.data.setFreeze(1, 0);
        data.sheetObj.validate();
      }, 200);
    };

    // worker响应函数
    worker.onmessage = (e: {data: any}) => {
      if (e.data.type == 'edit') {
        // 获取计算过后的data 合并成为option
        _this.proxy.$Bus.emit("dataChange", combineData(e.data.res));
      }
      //  else if (e.data.type == 'init') {
      //   excelData = e.data.res
      // }
    }
    

    onMounted(() => {
      data.sheetObj = null;
      let res: any = router.currentRoute.value.params.id?.toString().split('_')
      const {
        createExcelData,
        conveyExcelData,
        combineOption
      } = require(`@/chartConfig/config/${res[0]}_/chart${router.currentRoute.value.params.id}`)
      createInitiativeData = createExcelData;
      conveyData = conveyExcelData;
      combineData = combineOption

      data.excelData = createInitiativeData(common.option);
      initData();
      
    });

    onUnmounted(() => {
      worker.terminate()
    })

    return {
      willtableRef,
      setExcelData,
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