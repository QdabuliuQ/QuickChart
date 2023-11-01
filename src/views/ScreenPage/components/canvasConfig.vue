<template>
  <div class="canvasConfig">
    <div class="title">
      画布样式
    </div>
    <series-item title="背景类型">
      <el-select v-model="canvas.bgType" placeholder="请选择" size="small" popper-class="paramsSelectPopperClass">
        <el-option key="color" label="颜色" value="color" />
        <el-option key="image" label="图片" value="image"></el-option>
      </el-select>
    </series-item>
    <series-item v-show="canvas.bgType === 'image'" title="背景图片">
      <image-upload
        @deleteImage="() => canvas.bgImage = ''"
        @imageChange="(e: any) => canvas.bgImage = e"
        :image="canvas.bgImage"
        :imgType="'url'"
        :imgSize="2000"/>
    </series-item>
    <series-item v-show="canvas.bgType === 'color'" title="背景颜色">
      <el-color-picker size="small" v-model="canvas.bgColor" show-alpha />
    </series-item>
    <series-item title="字体大小">
      <el-input-number
        size="small"
        :max="200"
        :min="1"
        v-model="canvas.fontSize" />
    </series-item>
    <series-item title="字体颜色">
      <el-color-picker size="small" v-model="canvas.color" show-alpha />
    </series-item>
    <series-item title="字体粗细">
      <el-select v-model="canvas.fontWeight" placeholder="请选择" size="small" popper-class="paramsSelectPopperClass">
        <el-option key="lighter" label="lighter" value="lighter" />
        <el-option key="normal" label="normal" value="normal" />
        <el-option key="bold" label="bold" value="bold" />
        <el-option key="bolder" label="bolder" value="bolder" />
      </el-select>
    </series-item>
  </div>
</template>

<script setup lang='ts'>
import {onUnmounted, reactive, ref, watch} from "vue";
import SeriesItem from "@/components/seriesItem.vue";
import ImageUpload from "@/components/imageUpload.vue";
import useCommonStore from "@/store/common";
import {debounce} from "@/utils";

const common = useCommonStore();
const canvas = reactive(common.getScreenOptionOfCanvas)

let stop = watch(() => canvas, debounce(() => {
  common.updateScreenOptionOfCanvas(JSON.parse(JSON.stringify(canvas)))
}), {
  deep: true
})

onUnmounted(() => {
  stop()
})

</script>

<style lang='less'>
.canvasConfig {
  .title {
    font-size: 14px;
    font-weight: bold;
    margin: 10px 0;
    text-align: center;
    position: relative;
    color: @theme;

    &:after {
      position: absolute;
      content: '';
      width: 70px;
      height: 2px;
      background-color: @theme;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .seriesItem {
    .el-color-picker {
      width: 100%;
      .el-color-picker__trigger {
        width: 100%;
      }
    }
  }
}
</style>