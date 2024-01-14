<template>
	<div class="loading-component">
		<div
			class="loading-container"
			:element-loading-text="props.text ? props.text : '加载中...'"
			:element-loading-background="props.bgc ? props.bgc : '#292929'"
			v-loading="data.isLoading"></div>
	</div>
</template>

<script setup lang="ts">
import { reactive, defineProps } from 'vue'

const props = defineProps<{
	text: string
	bgc?: string
}>()

interface comInitData {
	isLoading: boolean
}
const data: comInitData = reactive({
	isLoading: true
})
</script>

<style lang="less">
.loading-component {
	position: relative;
	z-index: 99;
	width: 100%;
	height: 100%;
	.loading-container {
		width: 100%;
		height: 100%;
	}
	.el-loading-mask {
		z-index: 1;
		.el-loading-spinner .circular {
			width: 54px;
			height: 54px;
		}
		.el-loading-spinner .path {
			stroke: var(--el-color-primary);
		}
		.el-loading-text {
			color: var(--el-color-primary);
		}
	}
}
</style>
