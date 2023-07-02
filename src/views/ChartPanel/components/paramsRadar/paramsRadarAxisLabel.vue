<template>
  <div class="paramsRadarAxisLabel uniqueOptionContainer">

  </div>
</template>

<script setup lang='ts'>
import { reactive, watch } from 'vue';
import optionItems from '@/components/optionItems.vue'
import useProxy from '@/hooks/useProxy';
import useCommonStore from "@/store/common";
import { ConfigInt } from '@/types/common';
import { label, common } from '@/chartConfig/opname';
import { debounce, getConfigValue } from '@/utils';
const proxy = useProxy()
const _common: any = useCommonStore()
const config = reactive<ConfigInt>({
  
})
</script>

<style lang='less'>
</style>