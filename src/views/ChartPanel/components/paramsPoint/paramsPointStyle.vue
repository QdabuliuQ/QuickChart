<template>
  <div id="paramsPointStyle">
    <div class="uniqueOptionContainer">
      <seriesItem title="散点图形">
        <el-select popper-class="paramsSelectPopperClass" v-model="config.symbol" placeholder="请选择" size="small">
          <el-option v-for="item in symbol" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </seriesItem>
      <seriesItem title="散点颜色">
        <el-color-picker show-alpha v-model="config.color" />
      </seriesItem>
      <seriesItem v-if="typeof config.symbolSize == 'number'" title="散点大小">
        <el-input-number
          size="small"
          :max="100"
          :min="0"
          v-model="config.symbolSize"
        />
      </seriesItem>
      <seriesItem title="边框颜色">
        <el-color-picker show-alpha v-model="config.itemStyle.borderColor" />
      </seriesItem>
      <seriesItem title="边框宽度">
        <el-input-number
          size="small"
          :max="20"
          :min="0"
          v-model="config.itemStyle.borderWidth"
        />
      </seriesItem>
      <seriesItem title="边框宽度">
        <el-select popper-class="paramsSelectPopperClass" v-model="config.itemStyle.borderType" placeholder="请选择" size="small">
          <el-option v-for="item in borderType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </seriesItem>
      <seriesItem title="阴影模糊">
        <el-input-number
          size="small"
          :max="100"
          :min="0"
          v-model="config.itemStyle.shadowBlur"
        />
      </seriesItem>
      <seriesItem title="阴影颜色">
        <el-color-picker v-model="config.itemStyle.shadowColor" show-alpha />
      </seriesItem>
      <seriesItem title="阴影偏移X">
        <el-input-number
          size="small"
          :max="100"
          :min="-100"
          v-model="config.itemStyle.shadowOffsetX"
        />
      </seriesItem>
      <seriesItem title="阴影偏移Y">
        <el-input-number
          size="small"
          :max="100"
          :min="-100"
          v-model="config.itemStyle.shadowOffsetY"
        />
      </seriesItem>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, watch, getCurrentInstance, ComponentInternalInstance } from 'vue'
import seriesItem from "@/components/seriesItem.vue";
import useCommonStore from "@/store/common";
import { borderType, symbol } from "@/chartConfig/constant";
import { debounce } from '@/utils';

interface comInitData {
  config: {
    symbol: string
    color: string
    symbolSize: number
    itemStyle: {
      borderColor: string
      borderWidth: number
      borderType: string
      shadowBlur: number
      shadowColor: string
      shadowOffsetX: number
      shadowOffsetY: number
    }
  }
}

export default defineComponent({
  name: 'paramsPointStyle',
  components: {
    seriesItem
  },
  setup() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    const common: any = useCommonStore();
    let cbEvent: Function | null = null
    const data: comInitData = reactive({
      config: {
        symbol: common.option.series[0].symbol,
        color: common.option.series[0].color,
        symbolSize: common.option.series[0].symbolSize,
        itemStyle: {
          borderColor: common.option.series[0].itemStyle.borderColor,
          borderWidth: common.option.series[0].itemStyle.borderWidth,
          borderType: common.option.series[0].itemStyle.borderType,
          shadowBlur: common.option.series[0].itemStyle.shadowBlur,
          shadowColor: common.option.series[0].itemStyle.shadowColor,
          shadowOffsetX: common.option.series[0].itemStyle.shadowOffsetX,
          shadowOffsetY: common.option.series[0].itemStyle.shadowOffsetY,
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
        s[0].itemStyle = data.config.itemStyle
        s[0].color = data.config.color
        s[0].symbol = data.config.symbol
        s[0].symbolSize = data.config.symbolSize
        proxy.$Bus.emit("optionChange", {
          series: s,
        });
      })
    })
    return {
      borderType,
      symbol,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
</style>