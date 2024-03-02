<template>
	<el-popover :visible="visible" placement="right" :width="300" :hide-after="50">
		<template #reference>
			<div @mouseenter="visible = true" @mouseleave="visible = false" class="chart-item">
				<div class="image-container">
					<div @click="toggleChart" class="mask">插入图表</div>
					<img :src="cover" alt="" />
				</div>
				<div>{{ name }}</div>
			</div>
		</template>
		<img
			style="position: relative; top: 2px; width: 100%; border-radius: 7px"
			:src="cover"
			alt="" />
	</el-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
	cover: string
	id: string
	name: string
}>()
const emits = defineEmits(['clickEvent'])
const visible = ref<boolean>(false)

const toggleChart = () => {
	emits('clickEvent', props.id)
}
</script>

<style lang="less">
.chart-item {
	width: 100%;
	font-size: 12px;
	text-align: center;

	.image-container {
		position: relative;
		display: flex;
		align-items: center;
		overflow: hidden;
		margin-bottom: 5px;
		background-color: #fff;
		border: 1px solid #5f5f5f;
		border-radius: 5px;
		aspect-ratio: 2/1.6;
		box-sizing: border-box;

		&:hover .mask {
			opacity: 1;
		}

		.mask {
			position: absolute;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;
			font-size: 14px;
			color: #fff;
			background-color: rgb(255 180 75 / 50.9%);
			border: 2px solid @theme;
			opacity: 0;
			transition: 0.2s all linear;
			font-weight: bold;
			cursor: pointer;
			box-sizing: border-box;
		}

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			cursor: pointer;
			user-select: none;
		}
	}
}
</style>
