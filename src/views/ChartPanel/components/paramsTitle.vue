<template>
  <div id="paramsTitle" v-if="opNameList">
    <div
      v-for="(value, key, index) in allOption.title"
      :key="index"
      class="optionItem"
      :style="{ padding: opNameList[key] ? '6px 0' : '0' }"
    >
      <div>{{ opNameList ? opNameList[key] : "" }}</div>
      <div class="optionOperation">
        <el-input
          v-if="key == 'text'"
          size="small"
          v-model="defaultOption.title[key]"
        />
        <el-switch
          v-else-if="key == 'show'"
          size="small"
          v-model="defaultOption.title[key]"
        />
        <el-input-number
          v-else-if="
            key == 'left' || key == 'right' || key == 'top' || key == 'bottom'
          "
          size="small"
          v-model="defaultOption.title[key]"
        />
        <el-select
          v-else-if="key == 'textAlign'"
          popper-class="paramsSelectPopperClass"
          v-model="defaultOption.title[key]"
          size="small"
        >
          <el-option
            v-for="item in allOption.title[key]"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-color-picker
          v-else-if="key == 'backgroundColor'"
          v-model="defaultOption.title[key]"
        />
      </div>
    </div>
    <div
      v-for="(value, key, index) in allOption.title.textStyle"
      :key="index"
      class="optionItem"
    >
      <div>{{ opNameList ? opNameList[key] : "" }}</div>
      <div class="optionOperation">
        <el-color-picker
          v-if="key == 'color'"
          v-model="defaultOption.title.textStyle[key]"
        />
        <el-select
          v-else-if="key == 'fontWeight'"
          popper-class="paramsSelectPopperClass"
          v-model="defaultOption.title.textStyle[key]"
          size="small"
        >
          <el-option
            v-for="item in allOption.title.textStyle[key]"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input-number
          v-else-if="key == 'fontSize'"
          size="small"
          :max="40"
          :min="10"
          v-model="defaultOption.title.textStyle[key]"
        />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  onMounted,
  toRefs,
  getCurrentInstance,
  watch
} from "vue";
let timer: any

export default defineComponent({
  name: "paramsTitle",
  props: ["defaultOption", "allOption", "opNameList"],
  setup(props) {
    const _this: any = getCurrentInstance()
    const data = reactive({});

    watch(() => props.defaultOption, (e: any) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let data: any = {...e.title}
        for(let key in data) {
          if(key == 'left' || key == 'right' || key == 'top' || key == 'bottom') {
            if(data[key] == 0) data[key] = 'auto'
          }
        }
        
        _this.proxy.$Bus.emit('optionChange', {
          title: data
        })
      }, 500);
    }, {
      deep: true
    })

    onMounted(() => {});
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#paramsTitle {
  
}
</style>