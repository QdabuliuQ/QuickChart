<template>
  <div class="paramsColor">
    <div v-for="(item, idx) in colors" class="colorItem">
      <el-color-picker show-alpha v-model="colors[idx]" />
      <i @click="deleteItem(idx)" class="iconfont i_delete"></i>
    </div>
    <div @click="addItem" class="addBtn">
      <i class="iconfont i_jia"></i>
    </div>
  </div>
<!--  <div id="paramsColor">-->
<!--    <div-->
<!--      v-for="(value, key, index) in colorsData"-->
<!--      :key="index"-->
<!--      class="optionItem"-->
<!--      :style="{ padding: value ? '4px 0' : '0' }"-->
<!--    >-->
<!--      <div>{{ value.name }}</div>-->
<!--      <div class="optionOperation">-->
<!--        <el-color-picker @change='valueChange' v-model="value.color" />-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script setup lang='ts'>
import {
  watch,
  defineProps, reactive
} from "vue";
import useProxy from "@/hooks/useProxy";
import useCommonStore from "@/store/common";
import {debounce} from "@/utils";
const props = defineProps<{
  defaultOption: any
  allOption: any
  opNameList: any
}>()
const proxy = useProxy()
const _common: any = useCommonStore()
const colors = reactive<string[]>(_common.option.color)

const deleteItem = (idx: number) => {
  colors.splice(idx, 1)
}
const addItem = () => {
  if(colors.length <= 100) {
    colors.push('#000')
  }
}

watch(() => colors, debounce(() => {
  console.log(colors)
  proxy.$Bus.emit("optionChange", {
    color: [...colors],
  });
}, 500), {
  deep: true
})
// import {
//   defineComponent,
//   reactive,
//   toRefs,
//   watch,
//   getCurrentInstance,
//   onMounted,
// } from "vue";
// import useCommonStore from "@/store/common";
// import { colors } from "@/chartConfig/constant";
//
// interface comInitData {
//   colorsData: { name: string; color: string }[];
// }
//
// let timer: any;
// export default defineComponent({
//   name: "paramsColor",
//   props: ["defaultOption", "allOption", "opNameList"],
//
//   setup(props) {
//     const common = useCommonStore()
//     const _this: any = getCurrentInstance();
//     const data: comInitData = reactive({
//       colorsData: [],
//     });
//
//     const setColor = (e: any) => {
//       let res = [];
//       for (let i = 0; i < e.series.length; i++) {
//         res.push({
//           name: e.series[i].name,
//           color: colors[i % colors.length],
//         });
//       }
//       data.colorsData = res;
//     };
//
//     // 颜色值改变
//     const valueChange = () => {
//       let color = []
//       for(let item of data.colorsData) {
//         color.push(item.color)
//       }
//       _this.proxy.$Bus.emit("optionChange", {
//         color
//       });
//     }
//
//     onMounted(() => {
//       _this.proxy.$Bus.on("updateData", (e: any) => {
//         setColor(e)
//       });
//
//       setColor(common.option)
//     });
//
//     watch(
//       () => props.allOption.color,
//       (e: any) => {
//         clearTimeout(timer);
//
//         timer = setTimeout(() => {
//           let newColor = [];
//           for (const item of e) {
//             newColor.push(item.c);
//           }
//           _this.proxy.$Bus.emit("optionChange", {
//             color: newColor,
//           });
//         }, 500);
//       },
//       {
//         deep: true,
//       }
//     );
//
//     return {
//       valueChange,
//       ...toRefs(data),
//     };
//   },
// });
</script>

<style lang='less'>
.paramsColor {
  margin: 10px 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  .colorItem {
    display: flex;
    align-items: center;
    .iconfont {
      margin-left: 3px;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
  }
  .addBtn {
    width: 31px;
    height: 31px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    border: 1px solid #5c5c5c;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
      background-color: #4f4b4b;
    }
    .iconfont {
      font-size: 13px;
      position: relative;
      top: .5px;
    }
  }
}
</style>