<template>
  <color-panel
    class="color_panel"
    @colorChange="colorChange"
    :colors="colors"
    :size="'default'"
    :col="'1fr 1fr 1fr'"
  />
</template>

<script setup lang='ts'>
import {
  reactive
} from "vue";
import useProxy from "@/hooks/useProxy";
import colorPanel from "@/components/colorsPanel.vue"
import useCommonStore from "@/store/common";
const proxy = useProxy()
const _common: any = useCommonStore()
const colors = reactive<string[]>(_common.option.color)

const colorChange = (colors: string[]) => {
  proxy.$Bus.emit("optionChange", {
    color: [...colors],
  });
}
</script>

<style lang="less">
.color_panel {
  width: auto;
}
</style>