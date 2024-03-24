<template>
	<div v-if="!screenData.elements.length" class="preview-page-empty">
		<el-empty description="暂无可预览内容" />
	</div>
	<template v-else>
		<fit-container v-if="mode === 'fit'" :width="1128" :height="542" :bgStyle="style">
			<render
				:screen-data="screenData"
				:width="width"
				:height="height"
				:c-width="cWidth"
				:c-height="cHeight" />
		</fit-container>
		<full-container v-else-if="mode === 'full'" :bg-style="style" :width="1128" :height="542">
			<render
				:screen-data="screenData"
				:width="width"
				:height="height"
				:c-width="cWidth"
				:c-height="cHeight" />
		</full-container>
		<fit-width-container
			v-else-if="mode === 'fitWidth'"
			:bg-style="style"
			:width="1128"
			:height="542">
			<render
				:screen-data="screenData"
				:width="width"
				:height="height"
				:c-width="cWidth"
				:c-height="cHeight" />
		</fit-width-container>
		<fit-height-container
			v-else-if="mode === 'fitHeight'"
			:bg-style="style"
			:width="1128"
			:height="542">
			<render
				:screen-data="screenData"
				:width="width"
				:height="height"
				:c-width="cWidth"
				:c-height="cHeight" />
		</fit-height-container>
	</template>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'

import FitContainer from '@/views/PreviewPage/components/fitContainer.vue'
import FitHeightContainer from '@/views/PreviewPage/components/fitHeightContainer.vue'
import FitWidthContainer from '@/views/PreviewPage/components/fitWidthContainer.vue'
import FullContainer from '@/views/PreviewPage/components/fullContainer.vue'
import Render from '@/views/PreviewPage/components/render.vue'

import { listenMsg, sendMsg } from '@/utils/previewChannel.ts'
import { parse } from '@/utils/toJSON.ts'

import { IConfig } from '@/types/screen'

let style = reactive<any>(null)
let screenData = ref<IConfig>({} as any)
const width = ref<number>(0)
const height = ref<number>(0)
const cWidth = ref<number>(Number(localStorage.getItem('cWidth')))
const cHeight = ref<number>(Number(localStorage.getItem('cHeight')))
const mode = ref<'fit' | 'fitWidth' | 'fitHeight' | 'full'>('fit')

const setPreviewCanvas = (data: string) => {
	screenData.value = parse(data)
	mode.value = screenData.value.canvas.mode
	if (screenData.value.canvas.bgType === 'color') {
		style = {
			backgroundColor: screenData.value.canvas.bgColor
		}
	} else {
		style = {
			backgroundImage: `url(${screenData.value.canvas.bgImage})`,
			backgroundRepeat: screenData.value.canvas.backgroundRepeat,
			backgroundSize: screenData.value.canvas.backgroundSize
		}
	}
}
if (localStorage.getItem('screenData')) {
	setPreviewCanvas(localStorage.getItem('screenData') as string)
}

listenMsg((data: any) => {
	if (data.type === 'update') {
		setPreviewCanvas(data.data)
	}
})

const visibleEvent = () => {
	if (document.visibilityState === 'visible') {
		// 激活
		sendMsg('active')
	}
}

onMounted(() => {
	width.value = document.documentElement.clientWidth
	height.value = document.documentElement.clientHeight

	document.addEventListener('visibilitychange', visibleEvent)
})

onUnmounted(() => {
	document.removeEventListener('visibilitychange', visibleEvent)
})
</script>
<style lang="less">
.preview-page {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	.preview-page-empty {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}
	.preview-page-container {
		position: relative;
		width: 100%;
		height: 100%;
	}
}
</style>
