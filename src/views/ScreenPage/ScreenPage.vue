<template>
	<div class="screen-page">
		<function-list v-if="option" ref="functionListRef"></function-list>
		<screen-canvas v-if="option" :width="width + 'px'" :height="height + 'px'" />
		<config-item v-if="option" ref="configItemRef" />
	</div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

import ConfigItem from './components/configItem.vue'
import FunctionList from './components/functionList.vue'
import ScreenCanvas from './components/screenCanvas.vue'

import { useWatchResize } from '@/hooks/useWatchResize'

import useStore from '@/store'

const width = ref<number>(0)
const height = ref<number>(0)
const functionListRef = ref<HTMLElement>()
const configItemRef = ref<HTMLElement>()
const { screen } = useStore()
const option = ref<any>(null)

const getWidth = () => {
	return (
		document.getElementsByClassName('screen-page')[0].clientWidth -
		(functionListRef.value as any).$el.clientWidth -
		(configItemRef.value as any).$el.clientWidth
	)
}

onMounted(async () => {
	let { default: res } = await import('@/config/screen/config')
	screen.initScreenOption(res)
	option.value = res
	nextTick(() => {
		width.value = getWidth()
		height.value = document.documentElement.clientHeight
	})
})

useWatchResize((h: number) => {
	width.value = getWidth()
	height.value = h
})
</script>

<style lang="less">
.screen-page {
	display: flex;
	height: 100%;
	.el-color-picker {
		width: 100%;
		.el-color-picker__trigger {
			width: 100%;
			height: 25px;
		}
	}
}
</style>
