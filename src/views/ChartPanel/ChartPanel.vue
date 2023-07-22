<template>
  <div class="ChartPanel">
    <div v-loading="data.loadChart" element-loading-text="正在加载图表..." element-loading-background="#282828" class="chartContent">
      <div class="scrollContainer">
        <div class="btnList">
          <el-button @click="toSave" type="primary" plain>
            <i class="iconfont i_save1"></i>
            另存为
          </el-button>
        </div>
        <chartDom ref="chartDomRef" :key="data.key1" />
      </div>
    </div>
    <div v-loading="data.loadParams" element-loading-background="#303030" class="paramsPanelContainer">
      <paramsPanel ref="paramsPanelRef" :key="data.key2" />
    </div>
  </div>
  <el-dialog
    v-model="visible"
    title="保存图表"
    width="30%"
    @close="formRef.resetFields()"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :label-position="'top'"
    >
      <el-form-item prop="name" label="图表名称">
        <el-input v-model="form.name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="saveChart">
          保存
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {
  reactive,
  onMounted,
  watch,
  defineAsyncComponent,
  ref, onUnmounted,
} from "vue";
import html2canvas from 'html2canvas'
import { useRouter } from "vue-router";
import useCommonStore from "@/store/common";
import {conveyToImage, deepCopy, getInfo} from "@/utils";
import useProxy from "@/hooks/useProxy";
import {useCheckState} from "@/hooks/useCheckState";
import {FormInstance, FormRules, ElLoading } from "element-plus";
import {chartCoverUpload, getChartDetail, postChart} from "@/network/chart";
const paramsPanel = defineAsyncComponent(() => import("@/components/paramsPanel/paramsPanel.vue"))
const chartDom = defineAsyncComponent(() => import("@/components/chartDom.vue"))

interface comInitData {
  id: string;
  height: string;
  loadParams: boolean;
  loadChart: boolean;
  key1: number;
  key2: number;
  paramsPanelWidth: number;
  chartBoxWidth: number;
}

let loading: any = null
const chartDomRef = ref()
const formRef = ref<FormInstance>()
const paramsPanelRef = ref();
const common: any = useCommonStore();
const proxy = useProxy()
const router = useRouter();
const data: comInitData = reactive({
  id: "",
  height: document.documentElement.clientHeight + "px",
  loadParams: true,
  loadChart: true,
  key1: 0,
  key2: 0,
  paramsPanelWidth: 0,
  chartBoxWidth: 0,
});
const visible = ref(false)
const form = reactive({
  name: '',
})
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '图表名称不能为空', trigger: 'blur' },
    {  max: 15, message: '图表名称不能超过15个字符', trigger: 'blur' },
  ],
})

const getType = () => {
  return router.currentRoute.value.params.id?.toString().split("_")[0]
}

const getChartOption = async (cb?: () => void) => {
  if (router.currentRoute.value.name === 'modify') {
    let { id } = router.currentRoute.value.params
    let { data } = await getChartDetail({
      chart_id: id as string
    })
    if(!data.status) return proxy.$notice({
      type: 'error',
      message: data.msg,
      position: 'top-left'
    })
    console.log(data)
    sessionStorage.setItem('chartInfo', JSON.stringify(data.data))
    let res = await import(`@/chartConfig/config/${parseInt(data.data.type)}_/chart${data.data.type}`)
    let option = res.default()
    let chartConfig: any[] = [];
    for(let item of option) {
      if(data.data.option.hasOwnProperty(item.opName)) {
        item.defaultOption[item.opName] = data.data.option[item.opName]
      }
      if (item.menuOption) {
        chartConfig.push(item);
      }
    }
    console.log(chartConfig)
    common.$patch((state: any) => {
      state.option = data.data.option;
      state.chartConfig = chartConfig;
      state.defaultOption = deepCopy(data.data.option);
    });
    if (cb) cb(); // 执行回调函数
    data.loadChart = false;
    console.log(data.loadChart, '执行')
  } else {
    let res: any = router.currentRoute.value.params.id?.toString().split("_");
    import(
      `@/chartConfig/config/${res[0]}_/chart${router.currentRoute.value.params.id}`
      ).then((res: any) => {
      // 如果返回是函数 则执行 不是则直接使用配置对象
      let option = res.default()
      let tmpOption: any = {}; // 临时配置
      let chartConfig: any[] = [];
      for (let item of option) {
        if (item.chartOption) {
          tmpOption[item.opName] = item.defaultOption[item.opName];
        }
        if (item.menuOption) {
          chartConfig.push(item);
        }
      }

      // 保存数据到pinia
      common.$patch((state: any) => {
        state.option = tmpOption;
        state.chartConfig = chartConfig;
        state.defaultOption = deepCopy(tmpOption);
      });
      data.loadChart = false;
      if (cb) cb(); // 执行回调函数
    });
  }

};

getChartOption();

const toSave = () => {
  let res = getInfo()
  if(!res) (useCheckState() as any).check(proxy)
  else visible.value = true
}

const saveImage = async () => {
  const res = await html2canvasAndUploadFile();
  return res
}
// 将base64转成图片文件流
const dataUrlToBlob = (dataUrl: string) => {
  let arr: any[] = dataUrl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    // arr[0]是data:image/png;base64
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  let imgFile = new Blob([u8arr], {
    type: mime
  });
  return imgFile;
}
// 传入元素id,获取服务器返回的结果
const html2canvasAndUploadFile = async () => {
  const canvas = await html2canvas(chartDomRef.value.chartDomRef);
  // 将canvas转成base64
  let dataURL = canvas.toDataURL("image/png");
  // 打印的是图片的base64编码
  let blob = dataUrlToBlob(dataURL);
  return await uploadCover(blob);
}

const uploadCover = async (blob: Blob) => {  // 调用接口上传
  const formData = new FormData();
  formData.append("cover", blob);
  formData.append('type', getType())
  let { data } = await chartCoverUpload(formData)
  if(!data.status) {
    loading && loading.close()
    return false
  }
  return data.url
}

const saveChart = async () => {
  // 表单验证
  (formRef.value as any).validate(async (valid: boolean) => {
    if(!valid) return
    loading = ElLoading.service({
      lock: true,
      text: '加载中',
      background: 'rgba(0, 0, 0, 0.7)',
    })
    let blob = await conveyToImage(chartDomRef.value.chartDomRef);
    const formData = new FormData();
    formData.append("cover", blob);
    formData.append("name", form.name);
    formData.append("type", router.currentRoute.value.params.id as string);
    formData.append("option", JSON.stringify(common.$state.option));
    let { data } = await postChart(formData)
    // let { data } = await postChart({  // 添加图表
    //   name: form.name,
    //   type: router.currentRoute.value.params.id as string,
    //   option: JSON.stringify(common.$state.option),
    //   cover: res
    // })
    if(!data.status) {
      loading.close()
      return proxy.$notice({
        type: 'error',
        message: data.msg,
        position: 'top-left'
      })
    }
    proxy.$notice({
      type: 'success',
      message: data.msg,
      position: 'top-left'
    })
    loading.close()
    visible.value = false
  })
}

const loadFinished = () => {
  if (data.loadParams) data.loadParams = false;
}
const resize = (e: Event) => {
  data.height = e + "px";
  data.chartBoxWidth =
    (document.getElementById("ChartPanel")?.clientWidth as number) - 210;
}

onMounted(() => {
  data.chartBoxWidth =
    (document.getElementById("ChartPanel")?.clientWidth as number) - 210;
  data.id = router.currentRoute.value.params.id as string;
  proxy.$Bus.on("resize", resize);

  proxy.$Bus.on('loadFinished', loadFinished)
});

onUnmounted(() => {
  // 取消订阅
  proxy.$Bus.off('resize', resize)
  proxy.$Bus.off('loadFinished', loadFinished)
  stop()  // 取消订阅
})

const stop = watch(
  () => router.currentRoute.value.params.id,
  (n) => {
    data.id = n as string;
    data.loadParams = true;
    data.loadChart = true;
    getChartOption(() => {
      data.key1++;
      data.key2++;
      setTimeout(() => {
        data.loadParams = false;
        data.loadChart = false;
      }, 1000);
    });
  }
);

</script>

<style lang='less'>
.ChartPanel {
  display: flex;
  height: 100%;
  justify-content: space-between;

  .scrollContainer {
    width: calc(100vw - 60px - 250px - 210px);
    height: 100vh;
    overflow: auto;
    position: relative;

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
      background: transparent;
    }

    .btnList {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 2;
      .iconfont {
        margin-right: 5px;
        font-size: 14px;
      }
      .el-button-style();
    }
  }

  .chartContent {
    .el-scrollbar .el-scrollbar__wrap .el-scrollbar__view {
      white-space: nowrap;
      display: inline-block;
    }

    .el-scrollbar__wrap {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .paramsPanelContainer {
    width: 220px;
    height: 100%;
  }
}
</style>