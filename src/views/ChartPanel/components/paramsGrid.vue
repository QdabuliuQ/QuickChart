<template>
  <div class="paramsGrid">
    <option-items :config="config" />
  </div>
</template>

<script setup lang='ts'>
import {
  watch,
  defineProps, reactive
} from "vue";
import useProxy from "@/hooks/useProxy";
import {ConfigInt} from "@/types/common";
import { common } from '@/chartConfig/opname';
import useCommonStore from "@/store/common";
import optionItems from '@/components/optionItems.vue'
import {debounce, getConfigValue} from "@/utils";
const props = defineProps<{
  defaultOption: any
  allOption: any
  opNameList: any
}>()
const proxy = useProxy()
const _common: any = useCommonStore()
const config = reactive<ConfigInt>({
  show: {
    type: 'switch',
    title: common.show,
    value: _common.option.grid.show
  },
  left: {
    type: 'input_number',
    title: common.left + '(%)',
    max: 100,
    value: _common.option.grid.left
  },
  top: {
    type: 'input_number',
    title: common.top + '(%)',
    max: 100,
    value: _common.option.grid.top
  },
  right: {
    type: 'input_number',
    title: common.right + '(%)',
    max: 100,
    value: _common.option.grid.right
  },
  bottom: {
    type: 'input_number',
    title: common.bottom + '(%)',
    max: 100,
    value: _common.option.grid.bottom
  },
  backgroundColor: {
    type: 'color_picker',
    title: common.backgroundColor,
    value: _common.option.grid.backgroundColor
  },
  borderColor: {
    type: 'color_picker',
    title: common.borderColor,
    value: _common.option.grid.borderColor
  },
  borderWidth: {
    type: 'input_number',
    title: common.borderWidth,
    max: 100,
    value: _common.option.grid.borderWidth
  },
  shadowBlur: {
    type: 'input_number',
    title: common.shadowBlur,
    max: 100,
    value: _common.option.grid.shadowBlur
  },
  shadowColor: {
    type: 'color_picker',
    title: common.shadowColor,
    value: _common.option.grid.shadowColor
  },
  shadowOffsetX: {
    type: 'input_number',
    title: common.shadowOffsetX,
    max: 500,
    min: -500,
    value: _common.option.grid.shadowOffsetX
  },
  shadowOffsetY: {
    type: 'input_number',
    title: common.shadowOffsetY,
    max: 500,
    min: -500,
    value: _common.option.grid.shadowOffsetY
  },
})

const getData = () => {
  let grid = _common.option.grid
  grid = getConfigValue(config)
  grid.left = grid.left + '%'
  grid.right = grid.right + '%'
  grid.top = grid.top + '%'
  grid.bottom = grid.bottom + '%'
  return grid
}
watch(() => config, debounce(() => {
  proxy.$Bus.emit("optionChange", {
    grid: getData(),
  });
}, 500), {
  deep: true
})

// import { defineComponent, reactive, toRefs, watch, getCurrentInstance } from "vue";
//
// interface comInitData {
//   width: string | number;
//   height: string | number;
//   bgc: string;
// }
// let timer: any
// export default defineComponent({
//   name: "paramsGrid",
//   props: ["defaultOption", "allOption", "opNameList"],
//   setup(props) {
//     const _this: any = getCurrentInstance()
//     const data: comInitData = reactive({
//       width: 0,
//       height: 0,
//       bgc: "",
//     });
//
//     // 监听整个属性变化
//     watch(
//       () => props.defaultOption.grid,
//       (e) => {
//         clearTimeout(timer)
//         timer = setTimeout(() => {
//           data.width = e.width == "auto" ? 0 : e.width;
//           data.height = e.height == "auto" ? 0 : e.height;
//           data.bgc = e.backgroundColor == "transparent" ? "" : e.backgroundColor;
//
//           _this.proxy.$Bus.emit('optionChange', props.defaultOption)
//
//         }, 500);
//       },
//       {
//         immediate: true,
//         deep: true
//       }
//     );
//
//     watch(() => data.width, (e) => {
//       props.defaultOption.grid.width = e == 0 ? 'auto' : e
//     })
//     watch(() => data.height, (e) => {
//       props.defaultOption.grid.height = e == 0 ? 'auto' : e
//     })
//     watch(() => data.bgc, (e) => {
//       props.defaultOption.grid.backgroundColor = e == 'transparent' ? '' : e
//     })
//
//     return {
//       ...toRefs(data),
//     };
//   },
// });
</script>

<style lang='less'>
</style>