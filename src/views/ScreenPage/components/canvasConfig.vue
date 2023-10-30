<template>
  <div class="canvasConfig">
    <div class="title">
      画布样式
    </div>
    <series-item title="背景类型">
      <el-select v-model="type" placeholder="请选择" size="small" popper-class="paramsSelectPopperClass">
        <el-option key="color" label="颜色" value="color" />
        <el-option key="image" label="图片" value="image"></el-option>
      </el-select>
    </series-item>
    <series-item v-show="type === 'image'" title="背景图片">
      <image-upload
        @deleteImage="() => url = ''"
        @imageChange="(e: any) => url = e"
        :image="url"
        :imgType="'url'"
        :imgSize="2000"/>
    </series-item>
    <series-item v-show="type === 'color'" title="背景颜色">
      <el-color-picker size="small" v-model="color" show-alpha />
    </series-item>
    <series-item title="字体大小">
      <el-input-number
        size="small"
        :max="200"
        :min="1"
        v-model="fontSize" />
    </series-item>
    <series-item title="背景颜色">
      <el-color-picker size="small" v-model="color" show-alpha />
    </series-item>
  </div>
</template>

<script setup lang='ts'>
import {ref} from "vue";
import SeriesItem from "@/components/seriesItem.vue";
import ImageUpload from "@/components/imageUpload.vue";

const url = ref<string>('')
const color = ref<string>('')
const type = ref<string>('color')
const fontSize = ref<number>(14)

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
}
</style>