<template>
  <div id="paramsWaterMark">
    <div
      v-for="(value, key , index) in allOption.waterMark"
      :key="index"
      class="optionItem"
      :style="{ padding: opNameList[(key as any)] ? '6px 0' : '0' }"
    >
      <div>{{ opNameList ? opNameList[(key as any)] : "" }}</div>
      <div class="optionOperation">
        <el-switch
          v-if="((key as any) as any) == 'show'"
          size="small"
          v-model="defaultOption.waterMark[(key as any)]"
        />
        <el-input
          v-else-if="(key as any) == 'text'"
          size="small"
          v-model="defaultOption.waterMark[(key as any)]"
        />
        <el-input-number
          v-else-if="(key as any) == 'opacity'"
          size="small"
          :step="0.1"
          :max="1"
          :min="0"
          v-model="defaultOption.waterMark[(key as any)]"
        />
        <el-color-picker
          v-if="(key as any) == 'color'"
          v-model="defaultOption.waterMark[(key as any)]"
        />
        <el-input-number
          v-else-if="(key as any) == 'size' || (key as any) == 'rotate'"
          size="small"
          :min="0"
          v-model="defaultOption.waterMark[(key as any)]"
        />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  watch,
  getCurrentInstance,
} from "vue";

let timer: any;
export default defineComponent({
  name: "paramsWatermark",
  props: ["defaultOption", "allOption", "opNameList"],
  setup(props) {
    const _this: any = getCurrentInstance();
    const data = reactive({});

    watch(
      () => props.defaultOption.waterMark,
      (e) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          let backgroundColor: any = null;
          if (e.show) {
            let waterMarkCanvas = document.createElement("canvas");
            let watermarkCanvasCtx: any = waterMarkCanvas.getContext("2d");
            waterMarkCanvas.width = waterMarkCanvas.height = 200;
            watermarkCanvasCtx.textAlign = "center";
            watermarkCanvasCtx.textBaseline = "middle";
            watermarkCanvasCtx.globalAlpha = e.opacity;
            watermarkCanvasCtx.fillStyle = e.color;
            watermarkCanvasCtx.font = e.size + "px Microsoft Yahei";
            watermarkCanvasCtx.translate(70, 70);
            watermarkCanvasCtx.rotate(-Math.PI / e.rotate);
            watermarkCanvasCtx.fillText(e.text, 0, 0);
            backgroundColor = {
              type: "pattern",
              image: waterMarkCanvas,
              repeat: "repeat",
            };
          } else {
            backgroundColor = "#fff";
          }
          _this.proxy.$Bus.emit("optionChange", {
            backgroundColor,
          });
        }, 500);
      },
      {
        deep: true,
      }
    );

    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
</style>