<template>
  <div class="paramsPieLine">
    <option-items :config="config" />
  </div>
</template>

<script setup lang='ts'>
import {
  watch,
  reactive
} from "vue";
import useProxy from "@/hooks/useProxy";
import {ConfigInt} from "@/types/common";
import {common, label} from '@/chartConfig/opname';
import useStore from "@/store";
import optionItems from '@/components/optionItems.vue'
import {debounce, getConfigValue} from "@/utils";
import {borderType, fontFamily, fontStyle, fontWeight, position} from "@/chartConfig/constant";
const proxy = useProxy()
const _common: any = useStore()

const config = reactive<ConfigInt>({
  show: {
    type: 'switch',
    title: common.show,
    value: _common.option.series[0].labelLine.show
  },
  length: {
    type: 'input_number',
    title: '线段1长度',
    max: 500,
    value: _common.option.series[0].labelLine.length
  },
  length2: {
    type: 'input_number',
    title: '线段2长度',
    max: 500,
    value: _common.option.series[0].labelLine.length2
  },
  smooth: {
    type: 'switch',
    title: '平滑',
    value: _common.option.series[0].labelLine.smooth
  },
  width: {
    type: 'input_number',
    title: '线段' + common.width,
    max: 50,
    prefixs: ['lineStyle'],
    value: _common.option.series[0].labelLine.lineStyle.width
  },
  type: {
    type: 'select',
    title: '线段' + common.type,
    options: borderType,
    prefixs: ['lineStyle'],
    value: _common.option.series[0].labelLine.lineStyle.type
  }
})

const getData = () => {
  let series = _common.option.series
  const option = getConfigValue(config)
  for(let item of series) {
    item.labelLine = option
  }
  return series
}

watch(() => config, debounce(() => {
  proxy.$Bus.emit("optionChange", {
    series: getData(),
  });
}, 500), {
  deep: true
})
// import { defineComponent, reactive, onMounted, toRefs, watch, ComponentInternalInstance, getCurrentInstance } from 'vue'
// import useCommonStore from "@/store/common";
// import { borderType } from "@/chartConfig/constant";
// import { debounce } from "@/utils/index";
// import seriesItem from "@/components/seriesItem.vue";
// import OptionItems from "@/components/optionItems.vue";
//
// interface labelLineInt {
//   show: boolean
//   length: number
//   length2: number
//   smooth: boolean
//   lineStyle: {
//     width: number
//     type: string
//   }
// }
//
// interface comInitData {
//   lineConfig: labelLineInt
// }
//
// export default defineComponent({
//   name: 'paramsPieLine',
//   components: {
//     seriesItem
//   },
//   setup() {
//     const { appContext } = getCurrentInstance() as ComponentInternalInstance;
//     const proxy = appContext.config.globalProperties;
//     const common: any = useStore()
//     let cbEvent: Function | null = null
//     const data: comInitData = reactive({
//       lineConfig: {
//         show: true,
//         length: 10,
//         length2: 20,
//         smooth: false,
//         lineStyle: {
//           width: 1,
//           type: 'solid'
//         }
//       }
//     })
//     onMounted(() => {
//       let {
//         show,
//         length,
//         length2,
//         smooth,
//         lineStyle
//       } = common.option.series[0].labelLine
//       data.lineConfig.show = show
//       data.lineConfig.length = length
//       data.lineConfig.length2 = length2
//       data.lineConfig.smooth = smooth
//       data.lineConfig.lineStyle = lineStyle
//
//       cbEvent = debounce(() => {
//         let s = common.option.series
//         s[0].labelLine = data.lineConfig
//         proxy.$Bus.emit("optionChange", {
//           series: s,
//         });
//       }, 200)
//     })
//
//     watch(() => data.lineConfig, () => {
//       console.log(data.lineConfig, '---');
//
//       cbEvent && cbEvent()
//     }, {
//       deep: true
//     })
//
//     return {
//       borderType,
//       ...toRefs(data),
//     }
//   }
// })
</script>