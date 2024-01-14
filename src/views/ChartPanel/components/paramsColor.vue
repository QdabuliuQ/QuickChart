<template>
	<color-panel
		class="color_panel"
		@colorChange="colorChange"
		:colors="colors"
		:size="'default'"
		:col="'1fr 1fr 1fr'" />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import useProxy from '@/hooks/useProxy'
import colorPanel from '@/components/colorsPanel.vue'
import useStore from '@/store'
const proxy = useProxy()
const { chart }: any = useStore()
const colors = reactive<string[]>(chart.getOption.color)

const colorChange = (colors: string[]) => {
	proxy.$Bus.emit('optionChange', {
		color: [...colors]
	})
}
</script>

<style lang="less">
.color_panel {
	width: auto;
}
</style>
