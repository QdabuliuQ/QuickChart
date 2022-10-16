<template>
  <div id="dataExcel"></div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, ref } from "vue";

import Spreadsheet from "x-data-spreadsheet";
import zhCN from "x-data-spreadsheet/src/locale/zh-cn";
Spreadsheet.locale("zh-cn", zhCN);

interface comInitData {
  sheetObj: any;
}

export default defineComponent({
  name: "dataExcel",
  props: ["keys", "values", "seriesName"],
  setup(props) {
    const willtableRef = ref();
    const data: comInitData = reactive({
      sheetObj: null,
    });

    // 根据keys和values创建数据
    const createData = () => {
      let e_data: any = {
        0: {
          cells: {
            0: { text: props.seriesName, editable: true },
            1: { text: "值/数据", editable: false },
          },
        },
      };
      for (let i = 0, j = 1; i < props.keys.length; i++, j++) {
        e_data[j] = {
          cells: {
            0: { text: props.keys[i], editable: false },
            1: { text: props.values[i], editable: true },
          },
        };
      }
      return e_data;
    };

    // 初始化图表
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
            len: 100,
            height: 25,
          },
          col: {
            len: 5,
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
          rows: createData(),
        };

        data.sheetObj = new Spreadsheet("#dataExcel", option)
          .loadData(data1) // load data
          .change((res) => {
            // 导出数据
            console.log(res);
          });

        // 设置冻结
        data.sheetObj.sheet.data.setFreeze(1, 0);

        // 编辑单元格触发
        data.sheetObj.on(
          "cell-edited",
          (text: string, ri: number, ci: number) => {
            props.values[ri] = parseInt(text);
          }
        );

        // data validation
        data.sheetObj.validate();
      }, 200);
    };

    onMounted(() => {
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