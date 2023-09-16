<template>
  <loading v-if="props.loading" text="加载图表中..." />
  <div v-else class="mapDetail">
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
          <el-button v-login="show" v-if="props.share" class="shareBtn" type="primary" color="#626aef">
            <i class="iconfont i_share"></i>
            分享
          </el-button>
        </div>
        <map-dom ref="chartDomRef" />
      </div>
    </div>
    <save-chart-dialog v-model:visible="visible" @save-chart="saveChart" />
    <share-chart-dialog v-model:visible="shareVisible" @share-event="shareEvent" />
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import Loading from "@/components/loading.vue";
import MapDom from "@/components/mapDom.vue";
import SaveChartDialog from "@/components/saveChartDialog.vue";
import {ElLoading} from "element-plus";
import {base64ToFile, setImageOption} from "@/utils";
import useCommonStore from "@/store/common";
import {postChart, putChart} from "@/network/map";
import useProxy from "@/hooks/useProxy";
import ShareChartDialog from "@/components/shareChartDialog.vue";
import {postEvent} from "@/network/event";

const proxy = useProxy()
const props = defineProps<{
  loading: boolean
  adcode: string
  detailType: string
  type: string
  back?: boolean
  update?: boolean
  share?: boolean
  map_id?: string
}>()

const router = useRouter()
const common = useCommonStore()
const chartDomRef = ref()
const shareVisible = ref<boolean>(false)
const visible = ref<boolean>(false)
let save_loading = null

const show = () =>{
  shareVisible.value = true
}

const saveChart = async (name: string) => {
  save_loading = ElLoading.service({
    lock: true,
    text: '加载中',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  const cover = base64ToFile(chartDomRef.value.chartInstance.getDataURL({
    pixelRatio: 1
  }))
  const formData = new FormData();
  formData.append("cover", cover);
  formData.append("name", name);
  formData.append("type", props.detailType);
  formData.append("option", setImageOption(common.option));
  formData.append("adcode", props.adcode)
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
}

const shareEvent = async (content: string) => {
  let data: any = await postEvent({
    chart_id: props.map_id as string,
    content,
    type: 'map',
    d_type: parseInt(props.type).toString()
  })
  shareVisible.value = false
  if(data.status !== 1) return proxy.$notice({
    type: 'error',
    message: data.msg,
    position: 'top-left'
  })
  proxy.$notice({
    type: 'success',
    message: data.msg,
    position: 'top-left'
  })
}

const toUpdate = async () => {
  save_loading = ElLoading.service({
    lock: true,
    text: '加载中',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  const cover = base64ToFile(chartDomRef.value.chartInstance.getDataURL({
    pixelRatio: 1
  }))
  const formData = new FormData();
  formData.append("cover", cover);
  formData.append("map_id", props.map_id as string);
  formData.append("option", setImageOption(common.option));
  let data: any = await putChart(formData)
  if(!data.status) {
    proxy.$notice({
      type: 'error',
      message: data.msg,
      position: 'top-left'
    })
  } else {
    proxy.$notice({
      type: 'success',
      message: data.msg,
      position: 'top-left'
    })
  }
  save_loading.close()
}

</script>
<style lang="less">
.mapDetail {
  width: 100%;
  height: 100%;
  .chartContainer {
    height: 100%;
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
      .scrollContainer();
      .backBtn {
        position: absolute;
        top: 8px;
        left: 8px;
        .iconfont {
          font-size: 14px;
          margin-right: 5px;
        }
      }
      .btnList {
        position: absolute;
        top: 8px;
        right: 8px;
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