<template>
  <div id="paramsPointLine">
    <seriesItem title="显示引导线">
      <el-switch size="small" v-model="config.show" />
    </seriesItem>
    <seriesItem v-if="config.length != null" title="线段1长度">
      <el-input-number size="small" :max="300" :min="0" v-model="config.length" />
    </seriesItem>
    <seriesItem title="线段2长度">
      <el-input-number size="small" :max="300" :min="0" v-model="config.length2" />
    </seriesItem>
    <seriesItem title="线段颜色">
      <el-color-picker v-model="config.lineStyle.color" show-alpha />
    </seriesItem>
    <seriesItem title="线段类型">
      <el-select popper-class="paramsSelectPopperClass" v-model="config.lineStyle.type" placeholder="请选择" size="small">
        <el-option v-for="item in borderType" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </seriesItem>
    <seriesItem title="线段宽度">
      <el-input-number size="small" :max="100" :min="0" v-model="config.lineStyle.width" />
    </seriesItem>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, watch, getCurrentInstance, ComponentInternalInstance } from 'vue'
import useCommonStore from "@/store/common";
import seriesItem from "@/components/seriesItem.vue";
import { borderType } from "@/chartConfig/constant";
import { debounce, deepCopy } from '@/utils';

interface comInitData {
  config: {
    show: boolean
    length: number
    length2: number
    lineStyle: {
      color: string
      type: string
      width: number
    }
  }
}

export default defineComponent({
  name: 'paramsPointLine',
  components: {
    seriesItem
  },
  setup() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    const common: any = useCommonStore();
    let cbEvent: Function | null = null
    let seriesData: any = common.option.series[0].labelLine
    const data: comInitData = reactive({
      config: {
        show: seriesData.show,
        length: seriesData.length,
        length2: seriesData.length2,
        lineStyle: {
          color: seriesData.lineStyle.color,
          type: seriesData.lineStyle.type,
          width: seriesData.lineStyle.width,
        }
      }
    })

    watch(() => data.config, () => {
      cbEvent && cbEvent()
    }, {
      deep: true
    })

    onMounted(() => {
      cbEvent = debounce(() => {
        let s = common.option.series
        s[0].labelLine = deepCopy(data.config)
        proxy.$Bus.emit("optionChange", {
          series: s,
        });
      })
    })
    return {
      borderType,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
</style>