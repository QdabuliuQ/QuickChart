<template>
  <div class="textConfig">
    <template v-if="info">
      <config-title title="文本参数" />
      <common-config :info="info" />
      <config-title title="文本配置" />
      <series-item title="层级">
        <el-input-number :min="1" :max="100" size="small" v-model="info.style.zIndex" />
      </series-item>
      <series-item title="字体大小">
        <el-input-number :min="1" :max="100" size="small" v-model="info.style.fontSize" />
      </series-item>
      <series-item title="字体间距">
        <el-input-number :min="0" :max="100" size="small" v-model="info.style.letterSpacing" />
      </series-item>
      <series-item title="字体高度">
        <el-input-number :min="10" :max="50" size="small" v-model="info.style.lineHeight" />
      </series-item>
      <series-item title="字体粗细">
        <el-select
          popper-class="paramsSelectPopperClass"
          v-model="info.style.fontWeight"
          placeholder="请选择"
          size="small">
          <el-option key="lighter" label="lighter" value="lighter" />
          <el-option key="normal" label="normal" value="normal" />
          <el-option key="bold" label="bold" value="bold" />
          <el-option key="bolder" label="bolder" value="bolder" />
        </el-select>
      </series-item>
      <series-item title="字体对齐">
        <el-select
          popper-class="paramsSelectPopperClass"
          v-model="info.style.textAlign"
          placeholder="请选择"
          size="small">
          <el-option key="left" label="左对齐" value="left" />
          <el-option key="renter" label="居中" value="center" />
          <el-option key="right" label="右对齐" value="right" />
        </el-select>
      </series-item>
      <series-item title="字体样式">
        <el-select
          popper-class="paramsSelectPopperClass"
          v-model="info.style.fontStyle"
          placeholder="请选择"
          size="small">
          <el-option key="normal" label="正常" value="normal" />
          <el-option key="italic" label="斜体" value="italic" />
        </el-select>
      </series-item>
      <series-item title="字体线段">
        <el-select
          popper-class="paramsSelectPopperClass"
          v-model="info.style.textDecorationLine"
          placeholder="请选择"
          size="small">
          <el-option key="none" label="无线段" value="none" />
          <el-option key="underline" label="下划线" value="underline" />
          <el-option key="overline" label="上划线" value="overline" />
          <el-option key="line-through" label="删除线" value="line-through" />
        </el-select>
      </series-item>
      <series-item title="线段类型">
        <el-select
          popper-class="paramsSelectPopperClass"
          v-model="info.style.textDecorationStyle"
          placeholder="请选择"
          size="small">
          <el-option key="solid" label="实线" value="solid" />
          <el-option key="double" label="双划线" value="double" />
          <el-option key="dotted" label="点线" value="dotted" />
          <el-option key="dashed" label="线段" value="dashed" />
          <el-option key="wavy" label="波浪线" value="wavy" />
        </el-select>
      </series-item>
      <series-item title="线段颜色">
        <el-color-picker size="small" v-model="info.style.textDecorationColor" show-alpha />
      </series-item>
      <series-item title="字体颜色">
        <el-color-picker size="small" v-model="info.style.color" show-alpha />
      </series-item>
      <series-item title="背景颜色">
        <el-color-picker size="small" v-model="info.style.backgroundColor" show-alpha />
      </series-item>
    </template>
  </div>
</template>
<script setup lang="ts">
import {onUnmounted, ref, watch} from "vue";
import {ElementTypeProperties, Text} from "@/types/screen";
import useCommonStore from "@/store/common";
import CommonConfig from "@/views/ScreenPage/components/commonConfig.vue";
import ConfigTitle from "./configTitle.vue";
import SeriesItem from "@/components/seriesItem.vue";
import {debounce} from "@/utils";

let info = ref<Text | null>(null)
const idx = ref<number>(-1)

const common = useCommonStore()
let stop = watch(() => common.curElementIdx, () => {
  if (common.getCurElementIdx !== -1 && common.getScreenOptionOfElements[common.getCurElementIdx].type === 'text') {
    idx.value = common.getCurElementIdx
    info.value = JSON.parse(JSON.stringify(common.getScreenOptionOfElements[common.getCurElementIdx] as ElementTypeProperties<'text'>))
  }
}, {
  deep: true,
  immediate: true
})
let stop2 = watch(() => info, debounce(() => {
  common.updateScreenOptionOfElementStyle(JSON.parse(JSON.stringify(info.value!.style)), idx.value)
}), {
  deep: true
})

onUnmounted(() => {
  stop()
  stop2()
})
</script>
<style lang="less">
</style>