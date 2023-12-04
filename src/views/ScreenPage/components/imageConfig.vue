<template>
  <div class="imageConfig">
    <template v-if="info && baseInfo">
      <div class="configInfo">
        <img :src="info.url" />
      </div>
      <config-title title="图表参数" />
      <common-config :info="baseInfo" />
      <config-title title="图表配置" />
      <series-item title="层级">
        <el-input-number :min="1" :max="100" size="small" v-model="info.style.zIndex" />
      </series-item>
      <series-item title="阴影颜色">
        <el-color-picker size="small" v-model="info.style.shadowColor" show-alpha />
      </series-item>
      <series-item title="阴影偏移X">
        <el-input-number :min="-200" :max="200" size="small" v-model="info.style.shadowX" />
      </series-item>
      <series-item title="阴影偏移Y">
        <el-input-number :min="-200" :max="200" size="small" v-model="info.style.shadowY" />
      </series-item>
      <series-item title="阴影模糊">
        <el-input-number :min="0" :max="100" size="small" v-model="info.style.shadowBlur" />
      </series-item>
      <series-item title="边框颜色">
        <el-color-picker size="small" v-model="info.style.borderColor" show-alpha />
      </series-item>
      <series-item title="边框宽度">
        <el-input-number :min="0" :max="100" size="small" v-model="info.style.borderWidth" />
      </series-item>
      <series-item title="边框类型">
        <el-select v-model="info.style.borderType" placeholder="请选择" size="small" popper-class="paramsSelectPopperClass">
          <el-option key="none" label="无边框" value="none" />
          <el-option key="dotted" label="点线" value="dotted" />
          <el-option key="dashed" label="线段" value="dashed" />
          <el-option key="solid" label="实线" value="solid" />
        </el-select>
      </series-item>
      <config-btn :icon="'i_delete_2'" :bg-color="'rgb(255, 66, 66)'" @btn-click="deleteEvent" label="删除图表" />
    </template>
  </div>
</template>
<script setup lang="ts">
import CommonConfig from "@/views/ScreenPage/components/commonConfig.vue";
import ConfigTitle from "@/views/ScreenPage/components/configTitle.vue";
import ConfigBtn from "@/views/ScreenPage/components/configBtn.vue";
import {useElementConfig} from "@/hooks/useElementConfig";
import SeriesItem from "@/components/seriesItem.vue";
import {Image} from "@/types/screen";

let {
  baseInfo,
  info,
  idx,
  deleteEvent
} = useElementConfig<Image>()

// const {screen} = useStore()
// const baseInfo = ref(screen.getScreenOptionOfElements[screen.getCurElementIdx] as ElementTypeProperties<'image'>)
// let info = ref<Image | null>(null)
//
// const proxy = useProxy()
// const deleteEvent = () => {  // 删除图表
//   proxy.$Bus.emit("deleteChart", screen.curElementIdx)
// }

</script>
<style lang="less">
.imageConfig {
  .configInfo {
    width: 100%;
    aspect-ratio: 2/1.3;
    overflow: hidden;
    border-radius: 10px;
    background-image: url("../../../assets/image/bg.jpg");
    background-size: 100% 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>