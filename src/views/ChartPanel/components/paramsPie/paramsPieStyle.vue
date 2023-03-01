<template>
  <div id="paramsPieStyle">
    <div class="uniqueOptionContainer">
      <seriesItem v-if="config.size != -1" title="饼图大小">
        <el-input-number
          size="small"
          :max="100"
          :min="10"
          v-model="config.size"
        />
      </seriesItem>
      <seriesItem v-if="config.innerSize != -1" title="内圈大小">
        <el-input-number
          size="small"
          :max="100"
          :min="10"
          v-model="config.innerSize"
        />
      </seriesItem>
      <seriesItem v-if="config.outerSize != -1" title="外圈大小">
        <el-input-number
          size="small"
          :max="100"
          :min="10"
          v-model="config.outerSize"
        />
      </seriesItem>
      <seriesItem title="X轴偏移">
        <el-input-number
          size="small"
          :max="100"
          :min="0"
          v-model="config.xOffset"
        />
      </seriesItem>
      <seriesItem title="Y轴偏移">
        <el-input-number
          size="small"
          :max="100"
          :min="0"
          v-model="config.yOffset"
        />
      </seriesItem>
      
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, getCurrentInstance, ComponentInternalInstance, watch } from 'vue'
import seriesItem from "@/components/seriesItem.vue";
import useCommonStore from "@/store/common";
import { debounce } from "@/utils/index";

interface comInitData {
  config: {
    size: number | string[]
    innerSize: number
    outerSize: number
    xOffset: number
    yOffset: number
  }
}

export default defineComponent({
  name: 'paramsPieStyle',
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
        size: 60,
        innerSize: 30,
        outerSize: 70,
        xOffset: 50,
        yOffset: 50,
      }
    })


    onMounted(() => {
      let {
        radius,
        center,
      } = common.option.series[0]
      data.config.size = !Array.isArray(radius) ? parseInt(radius) : -1
      data.config.innerSize = Array.isArray(radius) ? parseInt(radius[0]) : -1
      data.config.outerSize = Array.isArray(radius) ? parseInt(radius[1]) : -1
      data.config.xOffset = parseInt(center[0]) 
      data.config.yOffset = parseInt(center[1]) 

      cbEvent = debounce(() => {
        let s = common.option.series
        s[0].radius = data.config.size == -1 ? [data.config.innerSize+'%', data.config.outerSize+'%'] : data.config.size+'%'
        s[0].center = [data.config.xOffset+'%', data.config.yOffset+'%']
        proxy.$Bus.emit("optionChange", {
          series: s,
        });
      })
    })

    watch(() => data.config, () => {
      cbEvent && cbEvent()
    }, {
      deep: true
    })

    return {
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
</style>