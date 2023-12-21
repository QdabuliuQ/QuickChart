<template>
  <div class="textConfig">
    <template v-if="info">
      <config-title title="文本参数" />
      <common-config :info="baseInfo" />
      <config-title title="文本配置" />
      <series-item title="内容">
        <el-input size="small" v-model="content" maxlength="100" />
      </series-item>
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
      <config-btn :icon="'i_delete_2'" :bg-color="'rgb(255, 66, 66)'" @btn-click="deleteEvent" label="删除图表" />
    </template>
  </div>
</template>
<script setup lang="ts">
import {onMounted, onUnmounted, ref, watch} from "vue";
import {ElementTypeProperties, Text} from "@/types/screen";
import useStore from "@/store";
import CommonConfig from "@/views/ScreenPage/components/commonConfig.vue";
import ConfigTitle from "./configTitle.vue";
import SeriesItem from "@/components/seriesItem.vue";
import {debounce} from "@/utils";
import {setCommonStyle} from "@/utils/screenUtil";
import ConfigBtn from "@/views/ScreenPage/components/configBtn.vue";
import useProxy from "@/hooks/useProxy";

const props = defineProps<{
  id: string
}>()
let info = ref<Text | null>(null)
const idx = ref<number>(-1)

const {screen} = useStore()
const content = ref<string>('')
const baseInfo = ref(screen.getScreenOptionOfElements[screen.getCurElementIdx] as ElementTypeProperties<'text'>)
const updateInfo = () => {
  if (screen.getCurElementIdx !== -1) {
    idx.value = screen.getCurElementIdx
    info.value = JSON.parse(JSON.stringify(screen.getScreenOptionOfElements[screen.getCurElementIdx] as ElementTypeProperties<'text'>))
    content.value = info.value!.content
  }
}
let stop = watch(() => info, debounce(() => {
  setCommonStyle(baseInfo, info)
  screen.updateScreenOptionOfElementStyle(info.value!.style, idx.value)
}), {
  deep: true
})
let stop2 = watch(() => screen.curElementIdx, (newVal: number) => {
  if (newVal !== -1 && screen.getScreenOptionOfElements[newVal].id === props.id) {
    baseInfo.value = screen.getScreenOptionOfElements[screen.getCurElementIdx]
    updateInfo()
  }
})
let stop3 = watch(content, debounce(() => {
  screen.updateTextContent(content.value, idx.value)
}))

const proxy = useProxy()
const deleteEvent = () => {  // 删除图表
  proxy.$Bus.emit("deleteChart", screen.curElementIdx)
}

onMounted(() => {
  updateInfo()
})

onUnmounted(() => {
  stop()
  stop2()
  stop3()
})
</script>
<style lang="less">
</style>