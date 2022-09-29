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
          v-else-if="
            key == 'itemWidth' ||
            key == 'itemHeight'
          "
          size="small"
          v-model="defaultOption.legend[key]"
        />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
export default defineComponent({
  name: "paramsLegend",
  props: ["defaultOption", "allOption", "opNameList"],
  setup() {
    const data = reactive({});
    onMounted(() => {});
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
</style>