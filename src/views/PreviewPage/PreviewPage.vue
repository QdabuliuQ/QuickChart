<template>
	<div v-if="!screenData.elements.length" class="preview-page-empty">
		<el-empty description="暂无可预览内容" />
	</div>
	<template v-else>
		<fit-container v-if="mode === 'fit'" :width="1128" :height="542" :bgStyle="style">
			<template v-for="item in screenData.elements" :key="item.id">
				<ChartItem
					v-if="item.type === 'chart'"
					v-bind="item as ElementTypeProperties<'chart'>"
					:c_height="cHeight"
					:c_width="cWidth"
					:width="width"
					:height="height" />
				<MapItem
					v-else-if="item.type === 'map'"
					v-bind="item as ElementTypeProperties<'map'>"
					:c_height="cHeight"
					:c_width="cWidth"
					:width="width"
					:height="height" />
				<ShapeItem
					v-else-if="item.type === 'shape'"
					v-bind="item as ElementTypeProperties<'shape'>"
					:c_height="cHeight"
					:c_width="cWidth"
					:width="width"
					:height="height" />
				<TextItem
					v-else-if="item.type === 'text'"
					v-bind="item as ElementTypeProperties<'text'>"
					:c_height="cHeight"
					:c_width="cWidth"
					:width="width"
					:height="height" />
				<ImageItem
					v-else-if="item.type === 'image'"
					v-bind="item as ElementTypeProperties<'image'>"
					:c_height="cHeight"
					:c_width="cWidth"
					:width="width"
					:height="height" />
				<BorderItem
					v-else-if="item.type === 'border'"
					v-bind="item as ElementTypeProperties<'border'>"
					:c_height="cHeight"
					:c_width="cWidth"
					:width="width"
					:height="height" />
				<MarqueeItem
					v-else-if="item.type === 'marquee'"
					v-bind="item as ElementTypeProperties<'marquee'>"
					:c_height="cHeight"
					:c_width="cWidth"
					:width="width"
					:height="height" />
			</template>
		</fit-container>
		<full-container v-else-if="mode === 'full'" :bg-style="style" :width="1128" :height="542">
			<template v-for="item in screenData.elements" :key="item.id">
				<ChartItem
					v-if="item.type === 'chart'"
					v-bind="item as ElementTypeProperties<'chart'>"
					:c_height="cHeight"
					:c_width="cWidth"
					:width="width"
					:height="height" />
				<MapItem
					v-else-if="item.type === 'map'"
					v-bind="item as ElementTypeProperties<'map'>"
					:c_height="cHeight"
					:c_width="cWidth"
					:width="width"
					:height="height" />
				<ShapeItem
					v-else-if="item.type === 'shape'"
					v-bind="item as ElementTypeProperties<'shape'>"
					:c_height="cHeight"
					:c_width="cWidth"
					:width="width"
					:height="height" />
				<TextItem
					v-else-if="item.type === 'text'"
					v-bind="item as ElementTypeProperties<'text'>"
					:c_height="cHeight"
					:c_width="cWidth"
					:width="width"
					:height="height" />
				<ImageItem
					v-else-if="item.type === 'image'"
					v-bind="item as ElementTypeProperties<'image'>"
					:c_height="cHeight"
					:c_width="cWidth"
					:width="width"
					:height="height" />
				<BorderItem
					v-else-if="item.type === 'border'"
					v-bind="item as ElementTypeProperties<'border'>"
					:c_height="cHeight"
					:c_width="cWidth"
					:width="width"
					:height="height" />
				<MarqueeItem
					v-else-if="item.type === 'marquee'"
					v-bind="item as ElementTypeProperties<'marquee'>"
					:c_height="cHeight"
					:c_width="cWidth"
					:width="width"
					:height="height" />
			</template>
		</full-container>
	</template>
	<!--	<div class="preview-page">-->
	<!--		-->
	<!--				<div-->
	<!--					v-else-->
	<!--					:style="{-->
	<!--						...style,-->
	<!--						width: '1128px',-->
	<!--						height: '542px'-->
	<!--					}"-->
	<!--					ref="previewPageContainerRef"-->
	<!--					class="preview-page-container">-->
	<!--					<template v-for="item in screenData.elements" :key="item.id">-->
	<!--						<ChartItem-->
	<!--							v-if="item.type === 'chart'"-->
	<!--							v-bind="item as ElementTypeProperties<'chart'>"-->
	<!--							:c_height="cHeight"-->
	<!--							:c_width="cWidth"-->
	<!--							:width="width"-->
	<!--							:height="height" />-->
	<!--						<MapItem-->
	<!--							v-else-if="item.type === 'map'"-->
	<!--							v-bind="item as ElementTypeProperties<'map'>"-->
	<!--							:c_height="cHeight"-->
	<!--							:c_width="cWidth"-->
	<!--							:width="width"-->
	<!--							:height="height" />-->
	<!--						<ShapeItem-->
	<!--							v-else-if="item.type === 'shape'"-->
	<!--							v-bind="item as ElementTypeProperties<'shape'>"-->
	<!--							:c_height="cHeight"-->
	<!--							:c_width="cWidth"-->
	<!--							:width="width"-->
	<!--							:height="height" />-->
	<!--						<TextItem-->
	<!--							v-else-if="item.type === 'text'"-->
	<!--							v-bind="item as ElementTypeProperties<'text'>"-->
	<!--							:c_height="cHeight"-->
	<!--							:c_width="cWidth"-->
	<!--							:width="width"-->
	<!--							:height="height" />-->
	<!--						<ImageItem-->
	<!--							v-else-if="item.type === 'image'"-->
	<!--							v-bind="item as ElementTypeProperties<'image'>"-->
	<!--							:c_height="cHeight"-->
	<!--							:c_width="cWidth"-->
	<!--							:width="width"-->
	<!--							:height="height" />-->
	<!--						<BorderItem-->
	<!--							v-else-if="item.type === 'border'"-->
	<!--							v-bind="item as ElementTypeProperties<'border'>"-->
	<!--							:c_height="cHeight"-->
	<!--							:c_width="cWidth"-->
	<!--							:width="width"-->
	<!--							:height="height" />-->
	<!--					</template>-->
	<!--				</div>-->
	<!--	</div>-->
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'

import ChartItem from './components/chartItem.vue'
import BorderItem from '@/views/PreviewPage/components/borderItem.vue'
import FitContainer from '@/views/PreviewPage/components/fitContainer.vue'
import FullContainer from '@/views/PreviewPage/components/fullContainer.vue'
import ImageItem from '@/views/PreviewPage/components/imageItem.vue'
import MapItem from '@/views/PreviewPage/components/mapItem.vue'
import ShapeItem from '@/views/PreviewPage/components/shapeItem.vue'
import TextItem from '@/views/PreviewPage/components/textItem.vue'

import { listenMsg, sendMsg } from '@/utils/previewChannel.ts'

import { ElementTypeProperties, IConfig } from '@/types/screen'
import { parse } from '@/utils/toJSON.ts'
import MarqueeItem from '@/views/PreviewPage/components/marqueeItem.vue'

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
