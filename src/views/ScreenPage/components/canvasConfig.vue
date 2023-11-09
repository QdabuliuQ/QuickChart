<template>
  <div class="canvasConfig">
    <config-title title="画布样式" />
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
    <series-item v-show="canvas.bgType === 'image'" title="图片覆盖">
      <el-select v-model="canvas.backgroundSize" placeholder="请选择" size="small" popper-class="paramsSelectPopperClass">
        <el-option key="cover" label="覆盖" value="cover" />
        <el-option key="contain" label="包含" value="contain" />
        <el-option key="100% 100%" label="填充" value="100% 100%" />
      </el-select>
    </series-item>
    <series-item v-show="canvas.bgType === 'image'" title="图片重复">
      <el-select v-model="canvas.backgroundRepeat" placeholder="请选择" size="small" popper-class="paramsSelectPopperClass">
        <el-option key="no-repeat" label="不重复" value="no-repeat" />
        <el-option key="repeat" label="重复" value="repeat" />
      </el-select>
    </series-item>
    <series-item v-show="canvas.bgType === 'color'" title="背景颜色">
      <el-color-picker size="small" v-model="canvas.bgColor" show-alpha />
    </series-item>
  </div>
</template>

<script setup lang='ts'>
import {onUnmounted, reactive, watch} from "vue";
import SeriesItem from "@/components/seriesItem.vue";
import ImageUpload from "@/components/imageUpload.vue";
import useStore from "@/store";
import {debounce} from "@/utils";
import ConfigTitle from "@/views/ScreenPage/components/configTitle.vue";

const {screen} = useStore();
const canvas = reactive(JSON.parse(JSON.stringify(screen.getScreenOptionOfCanvas)))

let stop = watch(() => canvas, debounce(() => {
  screen.updateScreenOptionOfCanvas(JSON.parse(JSON.stringify(canvas)))
}, 400), {
  deep: true
})

onUnmounted(() => {
  stop()
})

</script>

<style lang='less'>
.canvasConfig {
  .seriesItem {
    align-items: center;
    .el-color-picker {
      width: 100%;
      .el-color-picker__trigger {
        width: 100%;
      }
    }
  }
}
</style>