<template>
	<el-scrollbar style="background: #424242" height="100vh">
		<div class="function-list">
			<layer-button />
			<save-button v-if="props.save" />
			<save-as-button />
			<image-button />
			<text-button />
			<shape-button />
			<chart-button />
			<map-button />
			<border-button />
			<export-button />
			<preview-button />
		</div>
	</el-scrollbar>
</template>

<script setup lang="ts">
import BorderButton from '@/views/ScreenPage/components/borderButton.vue'
import ChartButton from '@/views/ScreenPage/components/chartButton.vue'
import ExportButton from '@/views/ScreenPage/components/exportButton.vue'
import ImageButton from '@/views/ScreenPage/components/imageButton.vue'
import LayerButton from '@/views/ScreenPage/components/layerButton.vue'
import MapButton from '@/views/ScreenPage/components/mapButton.vue'
import PreviewButton from '@/views/ScreenPage/components/previewButton.vue'
import SaveAsButton from '@/views/ScreenPage/components/saveAsButton.vue'
import SaveButton from '@/views/ScreenPage/components/saveButton.vue'
import ShapeButton from '@/views/ScreenPage/components/shapeButton.vue'
import TextButton from '@/views/ScreenPage/components/textButton.vue'

const props = defineProps<{
	save?: boolean
}>()
</script>

<style lang="less">
.functionListPopoverClass {
	width: auto !important;
	padding: 0 !important;
	.el-scrollbar {
		padding: 10px;
	}
	.type-container {
		display: grid;
		padding: 10px;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 15px;
		.type-item {
			display: flex;
			align-items: center;
			padding: 10px;
			font-size: 13px;
			border-radius: 10px;
			flex-direction: column;
			cursor: pointer;
			img {
				width: 50px;
				margin-bottom: 10px;
			}
			&:hover {
				background-color: #ffffff17;
			}
		}
	}
	.skeleton-loading {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 20px;
	}
	.el-empty {
		width: 400px;
	}
	.functionListChartContainer {
		display: grid;
		width: 400px;
		padding: 0 !important;
		grid-template-columns: 1fr 1fr;
		grid-gap: 20px;
		.el-image {
			overflow: hidden;
			background-color: #fff;
			border: 1px solid #ccc;
			border-radius: 10px;
			box-sizing: border-box;
		}
		.item {
			position: relative;
			.name {
				margin-top: 5px;
				font-size: 14px;
				text-align: center;
			}
			&:hover .mask {
				opacity: 1;
			}
			.mask {
				position: absolute;
				z-index: 2;
				display: flex;
				justify-content: center;
				align-items: center;
				overflow: hidden;
				width: 100%;
				font-size: 14px;
				color: #fff;
				background-color: rgb(255 180 75 / 50.9%);
				border: 2px solid @theme;
				border-radius: 10px;
				opacity: 0;
				transition: 0.2s all linear;
				aspect-ratio: 2/1.3;
				font-weight: bold;
				cursor: pointer;
				box-sizing: border-box;
			}
		}
	}
}
.function-list {
	display: flex;
	flex-direction: column;
	padding: 20px 3px 20px 0;
	.active {
		color: @theme !important;
		background-color: #4d4d4d !important;
	}
}
</style>
