<template>
  <div id="paramsBarRank">
    <div class="uniqueOptionContainer">
      <div class="optionItem">
        <div>时间间隔(ms)</div>
        <div class="optionOperation">
          <el-input-number
            :max="10000"
            :min="0"
            :step="100"
            v-model="gap"
            size="small"
          />
        </div>
      </div>
      <div class="optionItem">
        <div>展示条数</div>
        <div class="optionOperation">
          <el-input-number
            @change="optionChange"
            :max="30"
            :min="1"
            v-model="count"
            size="small"
          />
        </div>
      </div>
      <div class="optionItem">
        <div>排序方式</div>
        <div class="optionOperation">
          <el-select
            @change="optionChange"
            v-model="inverse"
            placeholder="Select"
            size="small"
          >
            <el-option
              v-for="item in rankList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="optionItem">
        <div>生成MP4</div>
        <div class="optionOperation">
          <el-button :disabled='isLoad' @click="createVideo" type="primary" size="small"
            >生成</el-button
          >
        </div>
        <video ref="videoRef" style="display: none"></video>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  onMounted,
  toRefs,
  getCurrentInstance,
  onBeforeUnmount,
  ref,
} from "vue";
import useCommonStore from "@/store/common";
declare var MediaRecorder: any;

interface comInitData {
  allData: number[][];
  index: number;
  gap: number;
  timer: any;
  count: number;
  inverse: boolean;
  isLoad: boolean
  rankList: { label: string; value: boolean }[];
}
let $canvas: any;
export default defineComponent({
  name: "paramsBarRank",
  setup() {
    const videoRef = ref();
    const _this: any = getCurrentInstance();
    const common: any = useCommonStore();
    const data: comInitData = reactive({
      allData: [],
      index: 0,
      gap: 1000,
      timer: null,
      count: 0,
      inverse: true,
      isLoad: false,
      rankList: [
        {
          label: "降序",
          value: true,
        },
        {
          label: "升序",
          value: false,
        },
      ],
    });

    data.allData = common.chartConfig[7].defaultOption.allData;
    data.count = common.option.yAxis[0].max + 1;

    const optionChange = () => {
      let yAxis = common.option.yAxis;
      yAxis[0].max = data.count - 1;

      yAxis[0].inverse = data.inverse;
      _this.proxy.$Bus.emit("optionChange", {
        yAxis,
      });
    };

    // 更新数据
    const renewData = () => {
      data.timer = setInterval(() => {
        if (data.index == data.allData.length) {
          data.index = 0;
        }

        _this.proxy.$Bus.emit("optionChange", {
          series: [
            {
              type: "bar",
              realtimeSort: true,
              label: {
                show: true,
                position: "right",
                valueAnimation: true,
              },
              data: data.allData[data.index],
            },
          ],
        });
        data.index++;
      }, data.gap);
    };

    // 生成video
    const createVideo = () => {
      _this.proxy.$Bus.emit("optionChange", {
        series: [
          {
            type: "bar",
            realtimeSort: true,
            label: {
              show: true,
              position: "right",
              valueAnimation: true,
            },
            data: data.allData[0],
          },
        ],
      })
      _this.proxy.$notice({
        message: "正在生成文件，请稍后",
        type: "info",
        position: "top-left",
      })

      data.isLoad = true
      // 获取图表dom
      $canvas = document.getElementById("chartDom")?.childNodes[0].childNodes[0];
      var stream = $canvas.captureStream();
      var recorder = new MediaRecorder(stream, { mimeType: "video/webm" });

      const d: any[] = [];
      recorder.ondataavailable = function (event: any) {
        if (event.data && event.data.size) {
          d.push(event.data);
        }
      };
      recorder.onstop = () => {
        // 结束录制时下载视频
        const url = URL.createObjectURL(new Blob(d, { type: "video/webm" }));
        var element = document.createElement("a");
        element.setAttribute("href", url);
        element.setAttribute("download", "");
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        data.isLoad = false
        _this.proxy.$notice({
          message: "生成成功",
          type: "success",
          position: "top-left",
        })
      };

      //录制开始
      setTimeout(() => {
        recorder.start();
      }, 300);
      
      setTimeout(() => {
        recorder.stop();
      }, data.allData.length * data.gap);
    };

    onMounted(() => {
      renewData();
    });
    onBeforeUnmount(() => {
      clearInterval(data.timer);
    });

    return {
      videoRef,
      createVideo,
      optionChange,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
</style>