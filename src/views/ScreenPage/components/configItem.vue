<template>
	<div @click.stop class="configItem">
		<el-scrollbar :height="height + 'px'">
			<div class="container">
				<canvas-config v-show="curIdx === -1" />
				<skeleton-config v-if="loading" />
				<component
					v-else-if="curIdx !== -1"
					:id="screen.getScreenOptionOfElements[curIdx].id"
					:is="componentsMap.get(screen.getScreenOptionOfElements[curIdx].id)"></component>
			</div>
		</el-scrollbar>
	</div>
</template>
<script setup lang="ts">
import { markRaw, onMounted, onUnmounted, reactive, ref, watch } from 'vue'

import SkeletonConfig from '@/components/skeletonConfig.vue'
import CanvasConfig from '@/views/ScreenPage/config/canvasConfig.vue'

import { useWatchResize } from '@/hooks/useWatchResize'

import useStore from '@/store'

const height = ref<number>(0)
const loading = ref<boolean>(false)
const componentsMap = reactive(new Map<string, any>())
const curIdx = ref<number>(-1)

const { screen } = useStore()
const stop1 = watch(
	() => screen.getCurElementIdx,
	async (newVal: number) => {
		curIdx.value = newVal
		if (newVal !== -1) {
			let type: string = screen.getScreenOptionOfElements[screen.getCurElementIdx].type
			const id: string = screen.getScreenOptionOfElements[screen.getCurElementIdx].id
			if (!componentsMap.has(id)) {
				loading.value = true
				if (type === 'chart' || type === 'map') {
					componentsMap.set(
						id,
						markRaw(
							(await import(`../config/${type === 'map' ? 'chart' : type}Config.vue`)).default
						)
					)
				} else {
					componentsMap.set(id, markRaw((await import(`../config/${type}Config.vue`)).default))
				}
				loading.value = false
			}
		}
	},
	{
		immediate: true
	}
)

useWatchResize(() => {
	height.value = document.documentElement.clientHeight
})

onMounted(() => {
	height.value = document.documentElement.clientHeight
})

onUnmounted(() => {
	stop1()
})
</script>
<style lang="less">
.configItem {
	width: 210px;
	height: 100%;
	background-color: @curColor;
	box-sizing: border-box;
	.container {
		padding: 10px;
	}
}
</style>
