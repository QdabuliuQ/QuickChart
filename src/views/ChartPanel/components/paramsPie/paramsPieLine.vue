<template>
  <div id="paramsPieLine">
    <div class="uniqueOptionContainer">
      <seriesItem title="引导线显示">
        <el-switch size="small" v-model="lineConfig.show" />
      </seriesItem>
      <seriesItem title="线段1长度">
        <el-input-number size="small" :max="100" :min="1" v-model="lineConfig.length" />
      </seriesItem>
      <seriesItem title="线段2长度">
        <el-input-number size="small" :max="100" :min="1" v-model="lineConfig.length2" />
      </seriesItem>
      <seriesItem title="平滑">
        <el-switch size="small" v-model="lineConfig.smooth" />
      </seriesItem>
      <seriesItem title="线段宽度">
        <el-input-number size="small" :max="100" :min="1" v-model="lineConfig.lineStyle.width" />
      </seriesItem>
      <seriesItem title="线段类型">
        <el-select popper-class="paramsSelectPopperClass" v-model="lineConfig.lineStyle.type" placeholder="请选择" size="small">
          <el-option v-for="item in borderType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </seriesItem>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, watch, ComponentInternalInstance, getCurrentInstance } from 'vue'
import useCommonStore from "@/store/common";
import { borderType } from "@/chartConfig/constant";
import { debounce } from "@/utils/index";
import seriesItem from "@/components/seriesItem.vue";

interface labelLineInt {
  show: boolean
  length: number
  length2: number
  smooth: boolean
  lineStyle: {
    width: number
    type: string
  }
}

interface comInitData {
  lineConfig: labelLineInt
}

export default defineComponent({
  name: 'paramsPieLine',
  components: {
    seriesItem
  },
  setup() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    const common: any = useCommonStore()
    let cbEvent: Function | null = null
    const data: comInitData = reactive({
      lineConfig: {
        show: true,
        length: 10,
        length2: 20,
        smooth: false,
        lineStyle: {
          width: 1,
          type: 'solid'
        }
      }
    })
    onMounted(() => {
      let {
        show,
        length,
        length2,
        smooth,
        lineStyle
      } = common.option.series[0].labelLine
      data.lineConfig.show = show
      data.lineConfig.length = length
      data.lineConfig.length2 = length2
      data.lineConfig.smooth = smooth
      data.lineConfig.lineStyle = lineStyle

      cbEvent = debounce(() => {
        let s = common.option.series
        s[0].labelLine = data.lineConfig
        proxy.$Bus.emit("optionChange", {
          series: s,
        });
      }, 200)
    })

    watch(() => data.lineConfig, () => {
      console.log(data.lineConfig, '---');
      
      cbEvent && cbEvent()
    }, {
      deep: true
    })

    return {
      borderType,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#paramsPieLine {

}
</style>