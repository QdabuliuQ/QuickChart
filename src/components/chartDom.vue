<template>
<!-- backgroundColor: bgc, -->
  <div
    :style="{
      width: width + 'px',
      height: height + 'px',
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
import { useRouter } from "vue-router";

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
    const router = useRouter();
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

      // aLink.dispatchEvent(evt);
      //aLink.click()
      aLink.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      ); //兼容火狐
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
      Reflect.deleteProperty(data.option, 'waterMark')
      let jdata: any = JSON.stringify(data.option, null, 4);
      data.code = jdata.replace(/"(\w+)":/g, "$1:");
    }

    onMounted(() => {
      let tmpOption: any = {};
      let myChart: any = null;
      import("@/chartConfig/chart" + router.currentRoute.value.query.id).then(
        (res: any) => {
          for (let item of res.default) {
            tmpOption[item.opName] = item.defaultOption[item.opName];
          }
          tmpOption.backgroundColor = '#fff'
          myChart = _this.proxy.$echarts.init(chartDomRef.value);
          myChart.setOption(tmpOption);
          data.option = tmpOption;
          data.code = tmpOption;

          getCode()
        }
      );

      // 监听图表配置变化
      _this.proxy.$Bus.on("optionChange", (e: any) => {
        console.log(e);
        
        myChart.setOption(e);
        let k: string = Object.keys(e)[0];
        console.log(k, data.option);
        
        for (let key in data.option) {
          if (key == k) {
            console.log('111');
            
            data.option[key] = e[key];
            break;
          }
        }
        getCode()
      });

      // 监听图表画布配置变化
      _this.proxy.$Bus.on("canvasChange", (e: any) => {
        let { width, height, bgc } = e;
        data.width = width;
        data.height = height;
        data.option.backgroundColor = bgc
        getCode()
        // data.bgc = bgc;
        myChart.setOption({
          backgroundColor: bgc
        })
      });

      // 生成代码
      _this.proxy.$Bus.on("createCode", () => {
        getCode()
        data.codeDialog = true;
      });

      // 下载图表
      _this.proxy.$Bus.on("downloadChart", () => {
        let res = myChart.getDataURL({
          pixelRatio: 2,
        });
        downloadFile('chart.png', res)
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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