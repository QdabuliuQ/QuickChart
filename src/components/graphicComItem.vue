<template>
	<div class="graphic-com-item">
		<div
			@click="toggleItem(idx)"
			:class="['com-item', idx == aIdx ? 'active-item' : '']"
			v-for="(item, idx) in props.components">
			{{ getTypeName(item.type.value) }}
			<i @click.stop="deleteItem(idx)" class="iconfont i_close"></i>
		</div>
		<el-dropdown trigger="click">
			<div class="com-item">
				<i class="iconfont i_plus"></i>
				添加组件
			</div>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item class="component-dropdown-item" @click="addItem('image')">
						图形组件
					</el-dropdown-item>
					<el-dropdown-item class="component-dropdown-item" @click="addItem('text')">
						文本组件
					</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
let props = defineProps<{
	components: any[]
}>()
const emits = defineEmits(['addItem', 'toggleItem', 'deleteItem'])
let aIdx = ref<number>(0)

const deleteItem = (idx: number) => {
	emits('deleteItem', idx)
}
const toggleItem = (idx: number) => {
	aIdx.value = idx
	emits('toggleItem', idx)
}
const addItem = (type: string) => {
	emits('addItem', type)
}
const getTypeName = (type: string) => {
	switch (type) {
		case 'image':
			return '图形组件'
		case 'text':
			return '文本组件'
	}
}
</script>

<style lang="less">
.component-dropdown-item {
	font-size: 13px;
}
.graphic-com-item {
	display: flex;
	flex-wrap: wrap;
	.com-item {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 6px 15px;
		margin: 0 10px 10px 0;
		font-size: 12px;
		color: #b8b8b8;
		border: 1px solid #575757;
		border-radius: 15px;
		transition: 0.2s all linear;
		cursor: pointer;
		&:hover {
			background-color: #4f4f4f;
		}
		.i_plus {
			margin-right: 8px;
			font-size: 12px;
		}
		.i_close {
			margin-left: 8px;
			font-size: 12px;
			&:hover {
				color: #f54040;
			}
		}
	}
	.active-item {
		color: #fff;
		background-color: @theme !important;
	}
}
</style>
