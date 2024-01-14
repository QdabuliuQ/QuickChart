<template>
	<div class="configItem">
		<el-scrollbar :height="height + 'px'">
			<div class="container">
				<keep-alive>
					<component
						:key="
							screen.getCurElementIdx === -1
								? 'default'
								: screen.getScreenOptionOfElements[screen.curElementIdx].id
						"
						:id="
							screen.getCurElementIdx === -1
								? 'default'
								: screen.getScreenOptionOfElements[screen.curElementIdx].id
						"
						:is="
							componentsMap.get(
								screen.getCurElementIdx === -1
									? 'default'
									: screen.getScreenOptionOfElements[screen.curElementIdx].id
							)
						"></component>
				</keep-alive>
			</div>
		</el-scrollbar>
	</div>
</template>
<script setup lang="ts">
import useproxy from '@/hooks/useProxy'
import { markRaw, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { useWatchResize } from '@/hooks/useWatchResize'
import useStore from '@/store'

const proxy = useproxy()
const height = ref<number>(0)
const componentsMap = reactive(new Map<string, any>())

const { screen } = useStore()
let stop = watch(
	() => screen.getCurElementIdx,
	async (newVal: number) => {
		if (newVal === -1) {
			!componentsMap.has('default') &&
				componentsMap.set('default', markRaw((await import(`./canvasConfig.vue`)).default))
			return
		}
		let type: string = screen.getScreenOptionOfElements[screen.curElementIdx].type
		const id: string = screen.getScreenOptionOfElements[screen.curElementIdx].id

		if (!componentsMap.has(id)) {
			if (type === 'chart' || type === 'map') {
				componentsMap.set(
					id,
					markRaw((await import(`./${type === 'map' ? 'chart' : type}Config.vue`)).default)
				)
			}
			componentsMap.set(id, markRaw((await import(`./${type}Config.vue`)).default))
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
	stop()
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
