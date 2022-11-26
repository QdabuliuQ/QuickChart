<template>
  <div
    :style="{
      width: width + 'px',
      height: height + 'px',
      marginTop: '15vh'
    }"
    ref="chartDomRef"
    id="chartDom"
  ></div>
  <el-dialog
    class="codeDialogClass"
    v-model="codeDialog"
    title="Echarts配置"
    width="40%"
  >
    <highlightjs
      class="language-javascript"
      language="javascript"
      :code="code"
    />
  </el-dialog>
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

import useCommonStore from "@/store/common";

interface comInitData {
  options: any;
  height: number;
  width: number;
  bgc: string;
  codeDialog: boolean;
  code: string;
  option: any;
}

export default defineComponent({
  name: "chartDom",
  setup() {
    const common: any = useCommonStore();
    const _this: any = getCurrentInstance();
    const chartDomRef = ref();
    const data: comInitData = reactive({
      options: null,
      height: 500,
      width: 700,
      bgc: "#fff",
      codeDialog: false,
      code: "",
      option: null,
    });

    //下载
    const downloadFile = (fileName: string, content: string) => {
      let aLink = document.createElement("a");
      let blob = base64ToBlob(content); //new Blob([content]);
      let evt = document.createEvent("HTMLEvents");
      evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
      aLink.download = fileName;
      aLink.href = URL.createObjectURL(blob);
      aLink.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );
    };
    //base64转blob
    const base64ToBlob = (code: string) => {
      let parts = code.split(";base64,");
      let contentType = parts[0].split(":")[1];
      let raw = window.atob(parts[1]);
      let rawLength = raw.length;
      let uInt8Array = new Uint8Array(rawLength);
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], { type: contentType });
    };
    const getCode = () => {
      Reflect.deleteProperty(data.option, "waterMark");
      let jdata: any = JSON.stringify(data.option, null, 4);
      data.code = jdata.replace(/"(\w+)":/g, "$1:");
    };

    onMounted(() => {
      let chartInstance: any = _this.proxy.$echarts.init(chartDomRef.value);
      chartInstance.setOption(common.option);
      data.option = common.option;
      data.code = common.option;
      getCode();


      // 监听图表配置变化
      _this.proxy.$Bus.on("optionChange", (e: any) => {
        let k: string = Object.keys(e)[0];
        if (k != "series") {
          chartInstance.setOption(e);
        }
        for (let key in data.option) {
          if (key == k) {
            data.option[key] = e[key];
            break;
          }
        }
        if (k == "series") {
          chartInstance.setOption(data.option, true);
        }
        common.$patch((state: any) => {
          state.option = data.option;
        });
        getCode();
      });

      // 监听图表数据变化
      _this.proxy.$Bus.on("dataChange", (e: any) => {

        let piniaOption = common.option
        for(let key in e) {
          piniaOption[key] = e[key]
        }
        
        // 修改图表配置
        chartInstance.setOption(e);
        // 修改pinia数据
        common.$patch((state: any) => {
          state.option = piniaOption
        });
      });

      // 监听图表画布配置变化
      _this.proxy.$Bus.on("canvasChange", (e: any) => {
        let { width, height, bgc } = e;
        data.width = width;
        data.height = height;
        data.option.backgroundColor = bgc;
        getCode();
        chartInstance.setOption({
          backgroundColor: bgc,
        });
      });

      // 生成代码
      _this.proxy.$Bus.on("createCode", () => {
        getCode();
        data.codeDialog = true;
      });

      // 下载图表
      _this.proxy.$Bus.on("downloadChart", () => {
        let res = chartInstance.getDataURL({
          pixelRatio: 2,
        });
        downloadFile("chart.png", res);
      });

      // 重置数据
      _this.proxy.$Bus.on("resetChartData", () => {
        let p = common.option.series

        common.$patch((state: any) => {
          state.option.series = state.defaultOption.series;
          state.option.xAxis = state.defaultOption.xAxis;
          state.option.yAxis = state.defaultOption.yAxis;
        });
        setTimeout(() => {
          chartInstance.setOption(common.option, true);
        }, 0);
      });
    });
    return {
      chartDomRef,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#chartDom {
  position: relative;
  margin: 0 auto;
}
.hljs {
  overflow-y: scroll;
  max-height: 420px;
  font-size: 18px;
}
.codeDialogClass {
  .el-dialog__body {
    padding: 0 15px 15px;
  }
}
</style>