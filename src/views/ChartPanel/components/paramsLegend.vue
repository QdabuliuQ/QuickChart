<template>
  <div id="paramsLegend">
    <div
      v-for="(value, key, index) in allOption.legend"
      :key="index"
      class="optionItem"
      :style="{ padding: opNameList[key] ? '6px 0' : '0' }"
    >
      <div>{{ opNameList ? opNameList[key] : "" }}</div>
      <div class="optionOperation">
        <el-switch
          v-if="key == 'show'"
          size="small"
          v-model="defaultOption.legend[key]"
        />
        <el-input-number
          v-else-if="
            key == 'left' ||
            key == 'right' ||
            key == 'top' ||
            key == 'bottom' ||
            key == 'width' ||
            key == 'height'
          "
          :min="0"
          size="small"
          v-model="allOption.legend[key]"
        />
        <el-select
          v-else-if="key == 'orient' || key == 'icon'"
          popper-class="paramsSelectPopperClass"
          v-model="defaultOption.legend[key]"
          size="small"
        >
          <el-option
            v-for="item in allOption.legend[key]"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input-number
          v-else-if="key == 'itemWidth' || key == 'itemHeight'"
          size="small"
          :min="10"
          v-model="defaultOption.legend[key]"
        />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  watch,
  getCurrentInstance,
} from "vue";

let timer: any
export default defineComponent({
  name: "paramsLegend",
  props: ["defaultOption", "allOption", "opNameList"],
  setup(props) {
    const _this: any = getCurrentInstance()
    const data = reactive({});
    watch(() => props.defaultOption, (e) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        _this.proxy.$Bus.emit('optionChange', props.defaultOption)
      }, 500);
    }, {
      deep: true
    })
    watch(() => props.allOption, (e) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let d = props.allOption.legend
        props.defaultOption.legend.left = d.left ? d.left : 'auto'
        props.defaultOption.legend.top = d.top ? d.top : 'auto'
        props.defaultOption.legend.right = d.right ? d.right : 'auto'
        props.defaultOption.legend.bottom = d.bottom ? d.bottom : 'auto'
        props.defaultOption.legend.width = d.width ? d.width : 'auto'
        props.defaultOption.legend.height = d.height ? d.height : 'auto'
        _this.proxy.$Bus.emit('optionChange', props.defaultOption)
      }, 500);
    }, {
      deep: true
    })
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
</style>