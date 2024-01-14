<template>
	<div
		:style="{
			gridTemplateColumns: props.col ? props.col : '1fr 1fr'
		}"
		class="colors-panel">
		<div v-for="(item, idx) in _colors" class="color-item">
			<el-color-picker
				:size="props.size ? props.size : 'small'"
				show-alpha
				v-model="_colors[idx]" />
			<i @click="deleteItem(idx)" class="iconfont i_delete"></i>
		</div>
		<div
			@click="addItem"
			:style="{
				width: props.size ? '31px' : '24px',
				height: props.size ? '31px' : '24px'
			}"
			class="add-btn">
			<i
				:style="{
					fontSize: props.size ? '13px' : '11px'
				}"
				class="iconfont i_jia"></i>
		</div>
	</div>
</template>
<script setup lang="ts">
import { defineProps, reactive, watch } from 'vue'
import { debounce } from '@/utils'
const props = defineProps<{
	colors: string[]
	size?: string
	col?: string
}>()
const emits = defineEmits(['colorChange'])

const _colors = reactive(props.colors)
const deleteItem = (idx: number) => {
	_colors.splice(idx, 1)
}
const addItem = () => {
	if (_colors.length <= 100) {
		_colors.push('#000')
	}
}

watch(
	() => _colors,
	debounce(() => {
		emits('colorChange', _colors)
	}, 500),
	{
		deep: true
	}
)
</script>
<style lang="less">
.colors-panel {
	display: grid;
	width: 100%;
	margin: 10px 0;
	grid-gap: 10px;
	.color-item {
		display: flex;
		align-items: center;
		.iconfont {
			margin-left: 3px;
			cursor: pointer;
			&:hover {
				color: #f32c2c;
			}
		}
	}
	.add-btn {
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid #5c5c5c;
		border-radius: 5px;
		box-sizing: border-box;
		cursor: pointer;
		&:hover {
			background-color: #4f4b4b;
		}
		.iconfont {
			position: relative;
			top: 0.5px;
		}
	}
}
</style>
