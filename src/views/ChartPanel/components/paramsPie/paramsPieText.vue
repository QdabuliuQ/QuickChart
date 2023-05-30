<template>
  <div id="paramsPieText">
    <div class="uniqueOptionContainer">
      <seriesItem title="文本显示">
        <el-switch size="small" v-model="labelConfig.show" />
      </seriesItem>
      <seriesItem title="文本位置">
        <el-select popper-class="paramsSelectPopperClass" v-model="labelConfig.position" placeholder="请选择" size="small">
          <el-option v-for="item in fontPosition" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </seriesItem>
      <seriesItem title="文本颜色">
        <el-color-picker v-model="labelConfig.color" />
      </seriesItem>
      <seriesItem title="文本加粗">
        <el-select popper-class="paramsSelectPopperClass" v-model="labelConfig.fontWeight" placeholder="请选择" size="small">
          <el-option v-for="item in fontWeight" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </seriesItem>
      <seriesItem title="文本字体">
        <el-select popper-class="paramsSelectPopperClass" v-model="labelConfig.fontFamily" placeholder="请选择" size="small">
          <el-option v-for="item in fontFamily" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </seriesItem>
      <seriesItem title="文本大小">
        <el-input-number size="small" :max="100" :min="1" v-model="labelConfig.fontSize" />
      </seriesItem>
      <seriesItem title="文本阴影">
        <el-color-picker v-model="labelConfig.textShadowColor" />
      </seriesItem>
      <seriesItem title="字体风格">
        <el-select popper-class="paramsSelectPopperClass" v-model="labelConfig.fontStyle" placeholder="请选择" size="small">
          <el-option v-for="item in fontStyle" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </seriesItem>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, watch, getCurrentInstance, ComponentInternalInstance } from 'vue'
import seriesItem from "@/components/seriesItem.vue";
import { fontWeight, fontPosition, fontStyle, fontFamily, ListInt } from "@/chartConfig/constant";
import { debounce } from "@/utils/index";
import useCommonStore from "@/store/common";

interface LabelInt {
  show: boolean
  position: string
  color: string
  fontSize: number
  fontWeight: string
  fontFamily: string
  textShadowColor: string
  fontStyle: string
}

interface comInitData {
  labelConfig: LabelInt
}

export default defineComponent({
  name: 'paramsPieText',
  components: {
    seriesItem
  },
  setup() {

    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    let cbEvent: Function | null = null
    const common: any = useCommonStore()
    const data: comInitData = reactive({
      labelConfig: {
        show: false,
        position: '',
        color: '',
        fontSize: 0,
        fontWeight: '',
        fontFamily: '',
        textShadowColor: '',
        fontStyle: '',
      }
    })

    onMounted(() => {
      let {
        show,
        color,
        fontStyle,
        fontWeight,
        fontFamily,
        fontSize,
        textShadowColor,
        position
      } = common.option.series[0].label
      data.labelConfig.show = show
      data.labelConfig.position = position
      data.labelConfig.color = color == 'transparent' ? '' : color
      data.labelConfig.fontSize = fontSize
      data.labelConfig.textShadowColor = textShadowColor == 'transparent' ? '' : textShadowColor
      data.labelConfig.fontWeight = fontWeight
      data.labelConfig.fontFamily = fontFamily
      data.labelConfig.fontStyle = fontStyle

      cbEvent = debounce(() => {
        let s = common.option.series
        s[0].label = data.labelConfig
        proxy.$Bus.emit("optionChange", {
          series: s,
        });
      })
    })

    watch(() => data.labelConfig, () => {
      cbEvent && cbEvent()
    }, {
      deep: true
    })

    return {
      fontStyle,
      fontPosition,
      fontWeight,
      fontFamily,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'></style>