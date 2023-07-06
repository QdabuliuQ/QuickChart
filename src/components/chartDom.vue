<template>
  <div :style="{
    width: width + 'px',
    height: height + 'px',
    marginTop: '15vh',
  }" ref="chartDomRef" class="transparentBg" id="chartDom"></div>
  <el-dialog class="codeDialogClass" v-model="codeDialog" title="代码配置" width="40%">
    <highlightjs class="language-javascript" language="javascript" :code="code" />
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
  onUnmounted,
} from "vue";
import useCommonStore from "@/store/common";
import { deepCopy } from '@/utils/index'

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
    let chart_i: any = null
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
    const getCode = (type: string) => {
      Reflect.deleteProperty(data.option, "waterMark");
      let jdata: any = JSON.stringify(data.option, null, 4);
      const optionCode = jdata.replace(/"(\w+)":/g, "$1:");
      if(type == 'js') {
        data.code = `const chart = echarts.init(document.getElementById('chart'));\nconst option = ${optionCode};\nchart.setOption(option);  //设置option`
      } else {
        data.code = optionCode
      }
    };
    const initChart = () => {
      let chartInstance = _this.proxy.$echarts.init(chartDomRef.value);
      chart_i = chartInstance
      chartInstance.setOption(common.option);
      chartInstance.on('finished', () => {
        setTimeout(() => {
          _this.proxy.$Bus.emit('loadFinished')
        }, 1000);
      })
      data.option = common.option;
      data.code = common.option;

      // 监听图表配置变化
      _this.proxy.$Bus.on("optionChange", (e: any) => {
        let k: string = Object.keys(e)[0];
        for (let key in data.option) {
          if (key == k) {
            data.option[key] = e[key];
            break;
          }
        }
        chartInstance.setOption(data.option, true);
        common.$patch((state: any) => {
          state.option = data.option;
        });
      });

      // 监听图表数据变化
      _this.proxy.$Bus.on("dataChange", (e: any) => {
        let piniaOption = common.option
        for (let key in e) {
          piniaOption[key] = e[key]
        }
        chartInstance.setOption(piniaOption, true);
        // 修改pinia数据
        common.$patch((state: any) => {
          state.option = piniaOption
        });
      });

      // 监听图表画布配置变化
      _this.proxy.$Bus.on("canvasChange", (e: any) => {
        if(e.hasOwnProperty('backgroundColor')) {
          const { backgroundColor } = e;
          data.option.backgroundColor = backgroundColor;
          chartInstance.setOption({
            backgroundColor,
          });
        } else {
          chartInstance.setOption({
            backgroundColor: e,
          });
        }
      });

      // 生成代码
      _this.proxy.$Bus.on("createCode", (e: string) => {
        getCode(e);
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
        let option = deepCopy(common.defaultOption)
        data.option = option
        common.$patch((state: any) => {
          state.option = option
        });
        setTimeout(() => {
          chartInstance.setOption(common.option, true);
        }, 0);
      });
    }

    onMounted(() => {
      initChart()
    });

    onUnmounted(() => {
      // 清空图表实例
      chart_i.clear()
      chart_i.dispose()
      chart_i = null
      // 事件监听销毁
      _this.proxy.$Bus.off('optionChange')
      _this.proxy.$Bus.off('dataChange')
      _this.proxy.$Bus.off('canvasChange')
      _this.proxy.$Bus.off('createCode')
      _this.proxy.$Bus.off('downloadChart')
      _this.proxy.$Bus.off('resetChartData')
    })

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
.transparentBg {
  background-image: url("../assets/image/bg.jpg");
  background-size: cover;
  background-repeat: repeat;
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