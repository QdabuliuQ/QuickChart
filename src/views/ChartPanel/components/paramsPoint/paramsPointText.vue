<template>
  <div id="paramsPointText">
    <div class="uniqueOptionContainer">
      <seriesItem title="显示文本">
        <el-switch size="small" v-model="config.show" />
      </seriesItem>
      <seriesItem title="字体风格">
        <el-select popper-class="paramsSelectPopperClass" v-model="config.fontStyle" placeholder="请选择" size="small">
          <el-option v-for="item in fontStyle" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </seriesItem>
      <seriesItem title="字体粗细">
        <el-select popper-class="paramsSelectPopperClass" v-model="config.fontWeight" placeholder="请选择" size="small">
          <el-option v-for="item in fontWeight" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </seriesItem>
      <seriesItem title="字体大小">
        <el-input-number size="small" :max="100" :min="1" v-model="config.fontSize" />
      </seriesItem>
      <seriesItem title="字体颜色">
        <el-color-picker v-model="config.color" show-alpha />
      </seriesItem>
      <seriesItem title="字体位置">
        <el-select popper-class="paramsSelectPopperClass" v-model="config.align" placeholder="请选择" size="small">
          <el-option v-for="item in align" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </seriesItem>
      <seriesItem title="字体偏移X">
        <el-input-number size="small" :max="200" :min="-200" v-model="offsetX" />
      </seriesItem>
      <seriesItem title="字体偏移Y">
        <el-input-number size="small" :max="200" :min="-200" v-model="offsetY" />
      </seriesItem>
      <seriesItem title="字体边框颜色">
        <el-color-picker v-model="config.textBorderColor" show-alpha />
      </seriesItem>
      <seriesItem title="字体边框宽度">
        <el-input-number size="small" :max="50" :min="0" v-model="config.textBorderWidth" />
      </seriesItem>
      <seriesItem title="字体边框类型">
        <el-select popper-class="paramsSelectPopperClass" v-model="config.textBorderType" placeholder="请选择" size="small">
          <el-option v-for="item in borderType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </seriesItem>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, getCurrentInstance, ComponentInternalInstance, watch } from 'vue'
import seriesItem from "@/components/seriesItem.vue";
import useCommonStore from "@/store/common";
import { align, fontFamily, fontWeight, fontStyle, borderType, symbol } from "@/chartConfig/constant";
import { debounce, deepCopy } from '@/utils';

interface comInitData {
  offsetX: number
  offsetY: number
  config: {
    show: boolean
    fontStyle: string
    fontWeight: string
    fontFamily: string
    fontSize: number
    color: string
    align: string
    offset: number[]
    textBorderColor: string
    textBorderWidth: number
    textBorderType: string
  }
}

export default defineComponent({
  name: 'paramsPointText',
  components: {
    seriesItem
  },
  setup() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    const common: any = useCommonStore();
    let seriesData: any = common.option.series[0].label
    let cbEvent: Function | null = null
    const data: comInitData = reactive({
      offsetX: seriesData.offset[0],
      offsetY: seriesData.offset[1],
      config: {
        show: seriesData.show, 
        fontStyle:seriesData.fontStyle, 
        fontWeight:seriesData.fontWeight, 
        fontFamily:seriesData.fontFamily, 
        fontSize:seriesData.fontSize,
        color:seriesData.color,
        offset:seriesData.offset,
        align:seriesData.align, 
        textBorderColor: seriesData.textBorderColor,
        textBorderWidth: seriesData.textBorderWidth,
        textBorderType: seriesData.textBorderType
      }
    })

    watch(() => data.config, () => {
      cbEvent && cbEvent()
    }, {
      deep: true
    })
    watch(() => data.offsetX, () => {
      cbEvent && cbEvent()
    }, {
      deep: true
    })
    watch(() => data.offsetY, () => {
      cbEvent && cbEvent()
    }, {
      deep: true
    })

    onMounted(() => {
      cbEvent = debounce(() => {
        let s = common.option.series
        s[0].label = deepCopy(data.config)
        s[0].label.offset = [data.offsetX, data.offsetY]
        proxy.$Bus.emit("optionChange", {
          series: s,
        });
      })
    })
    return {
      borderType,
      align,
      fontFamily,
      fontWeight,
      fontStyle,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
</style>