<template>
	<el-popover
		ref="shapePopoverRef"
		:hide-after="0"
		placement="right-start"
		popper-class="functionListPopoverClass"
		trigger="click">
		<el-scrollbar height="450px">
			<shape-list @shape-click="shapeClick" />
		</el-scrollbar>
		<template #reference>
			<button-item icon="i_shape" tip="插入图形" title="图形" />
		</template>
	</el-popover>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

import ButtonItem from './buttonItem.vue'
import ShapeList from './shapeList.vue'

import useStore from '@/store'

import { getRecordOption, getShapeConfig } from '@/utils/screenUtil'

import { ShapePoolItem } from '@/types/shape'

const shapePopoverRef = ref()
const { screen } = useStore()
const shapeClick = (shape: ShapePoolItem & { idx: number }) => {
	let data = getShapeConfig({
		viewBox: shape.viewBox,
		path: shape.path
	} as any)
	// 插入图形
	screen.addScreenOptionOfElements(data)
	screen.addOperationRecordItem(getRecordOption('add', 'shape'))
	shapePopoverRef.value.hide()
}
</script>
