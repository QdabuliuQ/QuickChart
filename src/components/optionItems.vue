<template>
  <div v-if="config" id="optionItems">
    <seriesItem v-for="(item, key) in config" :key="key" :title="item.title">
      <el-switch v-if="item.type == 'switch'" size="small" v-model="item.value" />
      <el-input-number v-else-if="item.type == 'input_number'" size="small" :max="item.max ? item.max : 300"
        :min="item.min ? item.min : 0" :step="item.step ? item.step : 1" v-model="item.value" />
      <el-color-picker v-else-if="item.type == 'color_picker'" v-model="item.value" show-alpha />
      <el-select v-else-if="item.type == 'select'" popper-class="paramsSelectPopperClass" v-model="item.value"
        placeholder="请选择" size="small">
        <el-option v-for="prop in item.options" :key="prop.value" :label="prop.label" :value="prop.value" />
      </el-select>
      <el-input v-else-if="item.type == 'input_text'" size="small" v-model="item.value" />
      <imageUpload v-else-if="item.type == 'imgload'" @deleteImage="() => item.value = ''" @imageChange="(e: any) => item.value = e" :base64="item.value" />
    </seriesItem>
  </div>
</template>

<script setup lang='ts'>
import { defineProps } from 'vue'
import seriesItem from "@/components/seriesItem.vue";
import imageUpload from './imageUpload.vue'
import { ConfigInt } from '@/types/common';

interface PropsInt {
  config: ConfigInt
}
const { config } = defineProps<PropsInt>()
</script>