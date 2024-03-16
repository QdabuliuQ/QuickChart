<template>
	<div class="render">
		<template v-for="item in props.screenData.elements" :key="item.id">
			<ChartItem
				v-if="item.type === 'chart'"
				v-bind="item as ElementTypeProperties<'chart'>"
				:c_height="props.cHeight"
				:c_width="props.cWidth"
				:width="props.width"
				:height="props.height" />
			<MapItem
				v-else-if="item.type === 'map'"
				v-bind="item as ElementTypeProperties<'map'>"
				:c_height="props.cHeight"
				:c_width="props.cWidth"
				:width="props.width"
				:height="props.height" />
			<ShapeItem
				v-else-if="item.type === 'shape'"
				v-bind="item as ElementTypeProperties<'shape'>"
				:c_height="props.cHeight"
				:c_width="props.cWidth"
				:width="props.width"
				:height="props.height" />
			<TextItem
				v-else-if="item.type === 'text'"
				v-bind="item as ElementTypeProperties<'text'>"
				:c_height="props.cHeight"
				:c_width="props.cWidth"
				:width="props.width"
				:height="props.height" />
			<ImageItem
				v-else-if="item.type === 'image'"
				v-bind="item as ElementTypeProperties<'image'>"
				:c_height="props.cHeight"
				:c_width="props.cWidth"
				:width="props.width"
				:height="props.height" />
			<BorderItem
				v-else-if="item.type === 'border'"
				v-bind="item as ElementTypeProperties<'border'>"
				:c_height="props.cHeight"
				:c_width="props.cWidth"
				:width="props.width"
				:height="props.height" />
			<MarqueeItem
				v-else-if="item.type === 'marquee'"
				v-bind="item as ElementTypeProperties<'marquee'>"
				:c_height="props.cHeight"
				:c_width="props.cWidth"
				:width="props.width"
				:height="height" />
		</template>
	</div>
</template>
<script setup lang="ts">
import BorderItem from '@/views/PreviewPage/components/borderItem.vue'
import ChartItem from '@/views/PreviewPage/components/chartItem.vue'
import ImageItem from '@/views/PreviewPage/components/imageItem.vue'
import MapItem from '@/views/PreviewPage/components/mapItem.vue'
import MarqueeItem from '@/views/PreviewPage/components/marqueeItem.vue'
import ShapeItem from '@/views/PreviewPage/components/shapeItem.vue'
import TextItem from '@/views/PreviewPage/components/textItem.vue'

import { ElementTypeProperties } from '@/types/screen.ts'

const props = defineProps<{
	screenData: any
	width: number
	height: number
	cWidth: number
	cHeight: number
}>()
</script>
