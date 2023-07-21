<template>
  <loading v-if="props.loading" text="加载图表中..." />
  <div v-else class="chartDetail">
    <div class="chartContainer">
      <div class="scrollContainer">
        <div @click="router.go(-1)" class="backBtn" v-if="props.back">
          <i class="iconfont i_exit"></i>
        </div>
        <div class="btnList">
          <el-button @click="toSave" type="primary" plain>
            <i class="iconfont i_save1"></i>
            另存为
          </el-button>
          <el-button v-if="props.update" @click="toUpdate" type="success" plain>
            <i class="iconfont i_save"></i>
            保存
          </el-button>
        </div>
        <chart-dom ref="chartDomRef" :key="key" />
      </div>
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
import {reactive, ref, defineProps, withDefaults} from "vue";
import {useRouter} from "vue-router";
import {conveyToImage, getInfo} from "@/utils";
import {useCheckState} from "@/hooks/useCheckState";
import useProxy from "@/hooks/useProxy";
import Loading from "@/components/loading.vue";
import ChartDom from "@/components/chartDom.vue";
import {ElLoading, FormInstance, FormRules} from "element-plus";
import {chartCoverUpload, postChart, putChart} from "@/network/chart";
import useCommonStore from "@/store/common";

const router = useRouter()
const props = withDefaults(defineProps<{
  type: string
  detailType: string
  loading: boolean
  back: boolean
  update: boolean
  chart_id: string
}>(), {
  type: '',
  detailType: '',
  loading: true,
  back: false,
  update: false,
  chart_id: ''
})
// const props =
const common: any = useCommonStore();
const proxy = useProxy()
const visible = ref<boolean>(false)
const key = ref<number>(0)
const formRef = ref<FormInstance>()
const chartDomRef = ref()

let save_loading: any = null
const form = reactive({
  name: '',
})
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '图表名称不能为空', trigger: 'blur' },
    { max: 15, message: '图表名称不能超过15个字符', trigger: 'blur' },
  ],
})
const saveImage = async () => {
  let blob = await conveyToImage(chartDomRef.value.chartDomRef);
  const formData = new FormData();
  formData.append("cover", blob);
  formData.append('type', props.type)
  let { data } = await chartCoverUpload(formData)
  if(!data.status) {
    save_loading && save_loading.close()
    return false
  }
  return data.url
}
const saveChart = async () => {
  // 表单验证
  (formRef.value as any).validate(async (valid: boolean) => {
    if(!valid) return
    save_loading = ElLoading.service({
      lock: true,
      text: '加载中',
      background: 'rgba(0, 0, 0, 0.7)',
    })
    let res = await saveImage()  // 生成图片 并且上传服务器
    if(!res) return proxy.$notice({
      type: 'error',
      message: '保存图表失败',
      position: 'top-left'
    })
    let { data } = await postChart({  // 添加图表
      name: form.name,
      type: props.detailType,
      option: JSON.stringify(common.$state.option),
      cover: res
    })
    if(!data.status) {
      save_loading.close()
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
    save_loading.close()
    visible.value = false
  })
}

const toSave = () => {
  let res = getInfo()
  if(!res) (useCheckState() as any).check(proxy)
  else visible.value = true
}

const toUpdate = async () => {
  let info = getInfo()
  if(!info) (useCheckState() as any).check(proxy)
  save_loading = ElLoading.service({
    lock: true,
    text: '加载中',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  let res = await saveImage()  // 生成图片 并且上传服务器
  if(!res) return proxy.$notice({
    type: 'error',
    message: '保存图表失败',
    position: 'top-left'
  })
  let { data } = await putChart({  // 添加图表
    chart_id: props.chart_id,
    option: JSON.stringify(common.$state.option),
    cover: res
  })
  if(!data.status) {
    save_loading.close()
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
  save_loading.close()
}

</script>
<style lang="less">
.chartDetail {
  width: 100%;
  height: 100%;
  .chartContainer {
    .el-scrollbar .el-scrollbar__wrap .el-scrollbar__view {
      white-space: nowrap;
      display: inline-block;
    }

    .el-scrollbar__wrap {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .scrollContainer {
      width: 100%;
      height: 100%;
      overflow: auto;
      position: relative;
      .backBtn {
        position: absolute;
        top: 10px;
        left: 10px;
        padding: 15px;
        border-radius: 50%;
        color: #fff;
        background-color: #3c3c3c;
        cursor: pointer;
        .flex();
        .iconfont {
          font-size: 18px;
        }
      }

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
  }
}
</style>