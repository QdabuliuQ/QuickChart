<template>
  <loading v-if="props.loading" text="加载图表中..." />
  <div v-else class="chartDetail">
    <div class="chartContainer">
      <div class="scrollContainer">
        <el-button v-if="props.back" @click="router.go(-1)" class="backBtn" type="info"> <i class="iconfont i_exit"></i>返回</el-button>
        <div class="btnList">
          <el-button v-login="() => visible = true" type="primary" >
            <i class="iconfont i_save1"></i>
            另存为
          </el-button>
          <el-button v-if="props.update" v-login="toUpdate" type="success" >
            <i class="iconfont i_save"></i>
            保存
          </el-button>
          <el-button v-login="() => shareVisible = true" v-if="props.share" class="shareBtn" type="primary" color="#626aef">
            <i class="iconfont i_share"></i>
            分享
          </el-button>
        </div>
        <chart-dom ref="chartDomRef" :key="key" />
      </div>
    </div>
  </div>
  <el-dialog
    v-model="shareVisible"
    title="分享"
    width="30%"
    @close="shareContent = ''"
  >
    <el-input
      v-model="shareContent"
      maxlength="300"
      placeholder="说点什么吧~~~"
      show-word-limit
      type="textarea"
      :rows="6"
      :resize="'none'"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="shareVisible = false">取消</el-button>
        <el-button type="primary" @click="shareEvent">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
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
import {setImageOption} from "@/utils";
import useProxy from "@/hooks/useProxy";
import Loading from "@/components/loading.vue";
import ChartDom from "@/components/chartDom.vue";
import {ElLoading, FormInstance, FormRules} from "element-plus";
import {postChart, putChart} from "@/network/chart";
import useCommonStore from "@/store/common";
import {postEvent} from "@/network/event";

const router = useRouter()
const props = withDefaults(defineProps<{
  type: string
  detailType: string
  loading: boolean
  back?: boolean
  update?: boolean
  share?: boolean
  chart_id?: string
}>(), {
  type: '',
  detailType: '',
  loading: true,
  back: false,
  update: false,
  share: false,
  chart_id: ''
})
const common: any = useCommonStore();
const proxy = useProxy()
const visible = ref<boolean>(false)
const shareVisible = ref<boolean>(false)
const shareContent = ref<string>('')
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
const base64ToFile = (): File => {
  let base64 = chartDomRef.value.chartInstance.getDataURL({
    pixelRatio: 1
  })
  let binary = atob(base64.split(',')[1]);
  let array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  let blob = new Blob([new Uint8Array(array)], {type: 'image/png'});
  return new File([blob], Date.now() + '.png');
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

    let cover = base64ToFile()
    const formData = new FormData();
    formData.append("cover", cover);
    formData.append("name", form.name);
    formData.append("type", props.detailType);
    formData.append("option", setImageOption(common.option));

    let data: any = await postChart(formData)
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

const toUpdate = async () => {
  save_loading = ElLoading.service({
    lock: true,
    text: '加载中',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  let cover = base64ToFile()
  const formData = new FormData();
  formData.append("cover", cover);
  formData.append("chart_id", props.chart_id);
  formData.append("option", setImageOption(common.option));

  let data: any = await putChart(formData)

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

const shareEvent = async () => {
  let content = shareContent.value.trim()
  if (content.length === 0 || content.length > 300) return proxy.$notice({
    type: 'error',
    message: '输入内容有误',
    position: 'top-left'
  })
  let data: any = await postEvent({
    chart_id: props.chart_id,
    content
  })
  proxy.$notice({
    type: 'success',
    message: data.msg,
    position: 'top-left'
  })
  shareVisible.value = false
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
        .iconfont {
          font-size: 14px;
          margin-right: 5px;
        }
      }
      .scrollContainer();

      /* 滚动条整体 */
      //&::-webkit-scrollbar {
      //  height: 10px;
      //  width: 10px;
      //}
      //
      ///* 两个滚动条交接处 -- x轴和y轴 */
      //&::-webkit-scrollbar-corner {
      //  background-color: transparent;
      //}
      //
      ///* 滚动条滑块 */
      //&::-webkit-scrollbar-thumb {
      //  border-radius: 10px;
      //  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      //  background: #535353;
      //}
      //
      ///* 滚动条轨道 */
      //&::-webkit-scrollbar-track {
      //  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      //  border-radius: 10px;
      //  background: transparent;
      //}

      .btnList {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 2;
        .iconfont {
          margin-right: 5px;
          font-size: 14px;
        }
        .shareBtn {
          &:hover {
            border: 1px solid #555bca;
            background-color: #555bca;
          }
          &:focus {
            border: 1px solid #555bca;
            background-color: #555bca;
          }
        }
        .el-button-style();
      }
    }
  }
}
</style>