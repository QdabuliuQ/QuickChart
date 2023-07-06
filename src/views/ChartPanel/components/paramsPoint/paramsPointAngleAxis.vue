<template>
  <div id="paramsPointAngleAxis">
    <seriesItem title="显示分隔线">
      <el-switch size="small" v-model="config.show" />
    </seriesItem>
    <seriesItem title="分隔线颜色">
      <el-color-picker v-model="config.lineStyle.color" show-alpha />
    </seriesItem>
    <seriesItem title="分隔线线宽">
      <el-input-number size="small" :max="100" :min="0" v-model="config.lineStyle.width" />
    </seriesItem>
    <seriesItem title="分隔线类型">
      <el-select popper-class="paramsSelectPopperClass" v-model="config.lineStyle.type" placeholder="请选择" size="small">
        <el-option v-for="item in borderType" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </seriesItem>
    <seriesItem title="阴影模糊">
      <el-input-number size="small" :max="100" :min="0" v-model="config.lineStyle.shadowBlur" />
    </seriesItem>
    <seriesItem title="阴影颜色">
      <el-color-picker v-model="config.lineStyle.shadowColor" show-alpha />
    </seriesItem>
    <seriesItem title="阴影偏移X">
      <el-input-number size="small" :max="100" :min="-100" v-model="config.lineStyle.shadowOffsetX" />
    </seriesItem>
    <seriesItem title="阴影偏移Y">
      <el-input-number size="small" :max="100" :min="-100" v-model="config.lineStyle.shadowOffsetY" />
    </seriesItem>
    <seriesItem title="透明度">
      <el-input-number size="small" :step="0.1" :max="1" :min="0" v-model="config.lineStyle.opacity" />
    </seriesItem>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, getCurrentInstance, ComponentInternalInstance, watch } from 'vue'
import useCommonStore from "@/store/common";
import seriesItem from "@/components/seriesItem.vue";
import { debounce, deepCopy, initCopyConfig } from "@/utils/index";
import { borderType } from "@/chartConfig/constant";

interface comInitData {
  config: {
    show: boolean
    lineStyle: {
      color: string
      width: number
      type: string
      shadowBlur: number
      shadowColor: string
      shadowOffsetX: number
      shadowOffsetY: number
      opacity: number
    }
  }
}

export default defineComponent({
  name: 'paramsPointAngleAxis',
  components: {
    seriesItem
  },
  setup() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    let cbEvent: Function | null = null
    const common: any = useCommonStore();
    const data: comInitData = reactive({
      config: {
        show: false,
        lineStyle: {
          color: '',
          width: 0,
          type: '',
          shadowBlur: 0,
          shadowColor: '',
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          opacity: 0,
        }
      }
    })
    initCopyConfig(common.option.angleAxis.splitLine, data.config)
    
    watch(() => data.config, () => {
      cbEvent && cbEvent()
    }, {
      deep: true
    })

    onMounted(() => {
      cbEvent = debounce(() => {
        let angleAxis = common.option.angleAxis
        angleAxis.splitLine = deepCopy(data.config)
        proxy.$Bus.emit("optionChange", {
          angleAxis
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