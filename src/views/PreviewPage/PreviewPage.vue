<template>
	<div class="preview-page">
		<div v-if="!screenData.elements.length" class="preview-page-empty">
			<el-empty description="暂无可预览内容" />
		</div>
		<div v-else :style="style" class="preview-page-container">
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
			</template>
		</div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

import ChartItem from './components/chartItem.vue'
import BorderItem from '@/views/PreviewPage/components/borderItem.vue'
import ImageItem from '@/views/PreviewPage/components/imageItem.vue'
import MapItem from '@/views/PreviewPage/components/mapItem.vue'
import ShapeItem from '@/views/PreviewPage/components/shapeItem.vue'
import TextItem from '@/views/PreviewPage/components/textItem.vue'

import { ElementTypeProperties, IConfig } from '@/types/screen'

let style = reactive<any>(null)
let screenData = reactive<IConfig>({} as any)
if (localStorage.getItem('screenData')) {
	screenData = JSON.parse(localStorage.getItem('screenData') as string)
	if (screenData.canvas.bgType === 'color') {
		style = {
			backgroundColor: screenData.canvas.bgColor
		}
	} else {
		style = {
			backgroundImage: `url(${screenData.canvas.bgImage})`,
			backgroundRepeat: screenData.canvas.backgroundRepeat,
			backgroundSize: screenData.canvas.backgroundSize
		}
	}
	console.log(screenData)
}
const width = ref<number>(0)
const height = ref<number>(0)
const cWidth = ref<number>(Number(localStorage.getItem('cWidth')))
const cHeight = ref<number>(Number(localStorage.getItem('cHeight')))

onMounted(() => {
	width.value = document.documentElement.clientWidth
	height.value = document.documentElement.clientHeight
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
