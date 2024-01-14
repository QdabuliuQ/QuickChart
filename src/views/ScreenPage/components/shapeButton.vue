<template>
	<el-popover
		ref="shapePopoverRef"
		popper-class="functionListPopoverClass"
		placement="right-start"
		trigger="click"
		:hide-after="0">
		<el-scrollbar height="450px">
			<shape-list @shape-click="shapeClick" />
		</el-scrollbar>
		<template #reference>
			<button-item title="图形" icon="i_shape" tip="插入图形" />
		</template>
	</el-popover>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import ButtonItem from './buttonItem.vue'
import ShapeList from './shapeList.vue'

import useStore from '@/store'

import { getShapeConfig } from '@/utils/screenUtil'

import { ShapePoolItem } from '@/types/shape'

const shapePopoverRef = ref()
const { screen } = useStore()
const shapeClick = (shape: ShapePoolItem & { idx: number }) => {
	console.log(shape, 'shape')
	let data = getShapeConfig({
		viewBox: shape.viewBox,
		path: shape.path
	} as any)
	console.log(data)
	// 插入图形
	screen.addScreenOptionOfElements(data)
	shapePopoverRef.value.hide()
}
</script>
