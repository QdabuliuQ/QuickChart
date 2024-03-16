<template>
	<div v-if="status === 1" class="screen-page">
		<function-list v-if="option" :save="authorId === curId" ref="functionListRef"></function-list>
		<screen-canvas v-if="option" :width="width + 'px'" :height="height + 'px'" />
		<config-item v-if="option" ref="configItemRef" />
	</div>
	<div v-else-if="status === 0" class="empty-container">
		<empty-tip />
	</div>
</template>
<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import EmptyTip from '@/components/emptyTip.vue'
import ConfigItem from '@/views/ScreenPage/components/configItem.vue'
import FunctionList from '@/views/ScreenPage/components/functionList.vue'
import ScreenCanvas from '@/views/ScreenPage/components/screenCanvas.vue'

import useStore from '@/store'

import { parse } from '@/utils/toJSON.ts'

import { getScreen } from '@/network/screen.ts'

const width = ref<number>(0)
const height = ref<number>(0)
const functionListRef = ref<HTMLElement>()
const configItemRef = ref<HTMLElement>()
const { screen } = useStore()
const option = ref<any>(null)
const status = ref<number>(-1)

const route = useRoute()
const screen_id = route.params.id as string
const authorId = ref<string>('')
const curId = ref<string>(localStorage.getItem('id') as string)

const getWidth = () => {
	return (
		document.getElementsByClassName('screen-page')[0].clientWidth -
		(functionListRef.value as any).$el.clientWidth -
		(configItemRef.value as any).$el.clientWidth
	)
}

onMounted(async () => {
	const res: any = await getScreen({
		screen_id
	})
	status.value = res.status
	if (res.status === 1) {
		res.data.option = parse(res.data.option)
		screen.initScreenOption(res.data.option)
		option.value = res.data.option
	}
	authorId.value = res.data.user_id
	nextTick(() => {
		width.value = getWidth()
		height.value = document.documentElement.clientHeight
	})
})
</script>
<style lang="less">
.screen-page {
	display: flex;
	height: 100vh;
	.el-color-picker {
		width: 100%;
		.el-color-picker__trigger {
			width: 100%;
			height: 25px;
		}
	}
}
.empty-container {
	width: 100vw;
	height: 100vh;
}
</style>
