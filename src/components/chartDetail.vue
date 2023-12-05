<template>
  <loading v-if="props.loading" text="加载图表中..."/>
  <div v-else class="chartDetail">
    <div class="chartContainer">
      <div class="scrollContainer">
        <el-button
          v-if="props.back"
          @click="router.go(-1)"
          class="backBtn"
          type="info"
        >
          <i class="iconfont i_exit"></i>返回
        </el-button
        >
        <div class="btnList">
          <el-button v-login="() => (visible = true)" type="primary">
            <i class="iconfont i_save1"></i>
            另存为
          </el-button>
          <el-button v-if="props.update" v-login="toUpdate" type="success">
            <i class="iconfont i_save"></i>
            保存
          </el-button>
          <el-button
            v-login="() => (shareVisible = true)"
            v-if="props.share"
            class="shareBtn"
            type="primary"
            color="#626aef"
          >
            <i class="iconfont i_share"></i>
            分享
          </el-button>
        </div>
        <info-panel
          v-if="props.infoPanel"
          v-model:is_praise="is_praise"
          v-model:praise_count="praise_count"
          :chart_id="props.chart_id"
          :comment_count="props.comment_count"
          :praise-event="praiseEvent"
          @showDrawer="show = true"
        />
        <chart-dom ref="chartDomRef" :key="key"/>
      </div>
    </div>
  </div>
  <comment-drawer
    v-if="props.infoPanel"
    v-model:drawer="show"
    :chart_id="props.chart_id"
    :post-comment="_postComment"
    :delete-comment="_deleteComment"
    :praise-comment="_praiseComment"
    :get-data="_getComment"
  />
  <share-chart-dialog
    v-model:visible="shareVisible"
    @share-event="shareEvent"
  />
  <save-chart-dialog
    v-model:visible="visible"
    @save-chart="saveChart"/>
</template>
<script setup lang="ts">
import {
  reactive,
  ref,
  defineProps,
  withDefaults,
  watch,
  onUnmounted,
} from "vue";
import {useRouter} from "vue-router";
import {setImageOption} from "@/utils";
import html2canvas from 'html2canvas'
import useProxy from "@/hooks/useProxy";
import Loading from "@/components/loading.vue";
import ChartDom from "@/components/chartDom.vue";
import {ElLoading, FormInstance, FormRules} from "element-plus";
import {
  deleteComment,
  getComment,
  postChart,
  postComment,
  postPraise,
  postPraiseComment,
  putChart,
} from "@/network/chart";
import useStore from "@/store";
import {postEvent} from "@/network/event";
import ShareChartDialog from "@/components/shareChartDialog.vue";
import InfoPanel from "@/components/infoPanel.vue";
import CommentDrawer from "@/components/commentDrawer.vue";
import SaveChartDialog from "@/components/saveChartDialog.vue";
import {snapshotElement} from "@/utils/snapshotUntils";

const router = useRouter();
const props = withDefaults(
  defineProps<{
    type: string;
    detailType: string;
    loading: boolean;
    comment_count?: number;
    is_praise?: number;
    praise_count?: number;
    back?: boolean;
    update?: boolean;
    share?: boolean;
    chart_id?: string;
    infoPanel?: boolean;
    getData?: Function;
  }>(),
  {
    type: "",
    detailType: "",
    loading: true,
    comment_count: 0,
    is_praise: 0,
    praise_count: 0,
    back: false,
    update: false,
    share: false,
    chart_id: "",
    infoPanel: false,
    getData: () => {
    },
  }
);
const {chart}: any = useStore();
const proxy = useProxy();
const is_praise = ref<number>(props.is_praise);
const praise_count = ref<number>(props.praise_count);
const visible = ref<boolean>(false);
const shareVisible = ref<boolean>(false);
const key = ref<number>(0);
const show = ref<boolean>(false);
const formRef = ref<FormInstance>();
const chartDomRef = ref();

let save_loading: any = null;
const form = reactive({
  name: "",
});
const rules = reactive<FormRules>({
  name: [
    {required: true, message: "图表名称不能为空", trigger: "blur"},
    {max: 15, message: "图表名称不能超过15个字符", trigger: "blur"},
  ],
});

const praiseEvent = (is_praise: string): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    let data = await postPraise({
      chart_id: props.chart_id,
      state: is_praise,
    });
    if (data.status) resolve(true);
    reject(false);
  });
};


const saveChart = async (name: string) => {
  save_loading = ElLoading.service({
    lock: true,
    text: "加载中",
    background: "rgba(0, 0, 0, 0.7)",
  });

  snapshotElement(document.getElementById('chartDom') as HTMLDivElement, 'file').then(async (cover) => {
    const formData = new FormData();
    console.log(cover)
    formData.append("cover", cover);
    formData.append("name", name);
    formData.append("type", props.detailType);
    formData.append("option", setImageOption(chart.getOption));

    let data: any = await postChart(formData);
    if (!data.status) {
      throw new Error()
    }
    proxy.$notice({
      type: "success",
      message: data.msg,
      position: "top-left",
    });

  }).catch(() => {
    proxy.$notice({
      type: "error",
      message: '生成图片失败',
      position: "top-left",
    });
  }).finally(() => {
    save_loading.close();
    visible.value = false;
  })
};

const toUpdate = async () => {
  save_loading = ElLoading.service({
    lock: true,
    text: "加载中",
    background: "rgba(0, 0, 0, 0.7)",
  });
  snapshotElement(document.getElementById('chartDom') as HTMLDivElement, 'file').then(async (res) => {
    const formData = new FormData();
    formData.append("cover", res);
    formData.append("chart_id", props.chart_id);
    formData.append("option", setImageOption(chart.getOption));
    let data: any = await putChart(formData);
    if (!data.status) {
      throw new Error()
    } else {
      proxy.$notice({
        type: "success",
        message: data.msg,
        position: "top-left",
      });
    }
  }).catch(() => {
    proxy.$notice({
      type: "error",
      message: '生成图片失败',
      position: "top-left",
    });
  }).finally(() => {
    save_loading.close();
  })

};

const shareEvent = async (content: string) => {
  let data: any = await postEvent({
    chart_id: props.chart_id,
    content,
    type: "chart",
    d_type: parseInt(props.type).toString(),
  });
  shareVisible.value = false;
  if (data.status !== 1)
    return proxy.$notice({
      type: "error",
      message: data.msg,
      position: "top-left",
    });
  proxy.$notice({
    type: "success",
    message: data.msg,
    position: "top-left",
  });
};

const _postComment = async (data: { chart_id: string; content: string }) => {
  return await postComment(data);
};
const _deleteComment = async (data: { comment_id: string }) => {
  return await deleteComment(data);
};
const _getComment = async (e: number) => {
  return await getComment({
    offset: e,
    chart_id: props.chart_id,
  });
};
const _praiseComment = async (info: any) => {
  return await postPraiseComment({
    comment_id: info.comment_id as string,
    type: info.is_praise == "1" ? "0" : "1",
  });
};

let stop1 = watch(
  () => props.is_praise,
  (newVal: number) => {
    is_praise.value = newVal;
  }
);
let stop2 = watch(
  () => props.praise_count,
  (newVal: number) => {
    praise_count.value = newVal;
  }
);

onUnmounted(() => {
  stop1();
  stop2();
});
</script>
<style lang="less">
.chartDetail {
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

      .backBtn {
        position: absolute;
        top: 8px;
        left: 8px;

        .iconfont {
          font-size: 14px;
          margin-right: 5px;
        }
      }

      .scrollContainer();

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
