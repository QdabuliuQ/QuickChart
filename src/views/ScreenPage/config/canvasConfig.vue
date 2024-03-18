<template>
	<div class="canvas-config">
		<config-title title="配置" />
		<series-item title="适配方案">
			<el-select
				v-model="screen.getScreenOptionOfCanvas.mode"
				placeholder="请选择"
				size="small"
				popper-class="params-select-popper-class">
				<el-option key="fit" value="fit" label="自适应">
					<span>
						<i
							style="font-size: 14px; position: relative; top: 1px; margin-right: 5px"
							class="iconfont i_fit"></i>
						自适应
					</span>
				</el-option>
				<el-option key="fitWidth" value="fitWidth" label="宽度适应">
					<span>
						<i
							style="font-size: 14px; position: relative; top: 1px; margin-right: 5px"
							class="iconfont i_fit_width"></i>
						宽度适应
					</span>
				</el-option>
				<el-option key="fitHeight" value="fitHeight" label="高度适应">
					<span>
						<i
							style="font-size: 14px; position: relative; top: 1px; margin-right: 5px"
							class="iconfont i_fit_height"></i>
						高度适应
					</span>
				</el-option>
				<el-option key="full" value="full" label="铺满拉伸">
					<span>
						<i
							style="font-size: 14px; position: relative; top: 1px; margin-right: 5px"
							class="iconfont i_full"></i>
						铺满拉伸
					</span>
				</el-option>
			</el-select>
		</series-item>
		<config-title title="画布样式" />
		<series-item title="背景类型">
			<el-select
				v-model="screen.getScreenOptionOfCanvas.bgType"
				placeholder="请选择"
				size="small"
				popper-class="params-select-popper-class">
				<el-option key="color" label="颜色" value="color" />
				<el-option key="image" label="图片" value="image"></el-option>
			</el-select>
		</series-item>
		<series-item v-show="screen.getScreenOptionOfCanvas.bgType === 'image'" title="背景图片">
			<image-upload
				@deleteImage="() => screen.updateScreenOptionOfCanvasByKey('bgImage', '')"
				@imageChange="imageChange"
				:value="screen.getScreenOptionOfCanvas.bgImage"
				:imgType="'url'"
				:imgSize="2000"
				:url="`${oss}/upload/chartImage`" />
		</series-item>
		<series-item v-show="screen.getScreenOptionOfCanvas.bgType === 'image'" title="图片覆盖">
			<el-select
				v-model="screen.getScreenOptionOfCanvas.backgroundSize"
				placeholder="请选择"
				size="small"
				popper-class="params-select-popper-class">
				<el-option key="cover" label="覆盖" value="cover" />
				<el-option key="contain" label="包含" value="contain" />
				<el-option key="100% 100%" label="填充" value="100% 100%" />
			</el-select>
		</series-item>
		<series-item v-show="screen.getScreenOptionOfCanvas.bgType === 'image'" title="图片重复">
			<el-select
				v-model="screen.getScreenOptionOfCanvas.backgroundRepeat"
				placeholder="请选择"
				size="small"
				popper-class="params-select-popper-class">
				<el-option key="no-repeat" label="不重复" value="no-repeat" />
				<el-option key="repeat" label="重复" value="repeat" />
			</el-select>
		</series-item>
		<series-item v-show="screen.getScreenOptionOfCanvas.bgType === 'color'" title="背景颜色">
			<el-color-picker size="small" v-model="screen.getScreenOptionOfCanvas.bgColor" show-alpha />
		</series-item>
		<div
			@click="selectColor"
			v-show="screen.getScreenOptionOfCanvas.bgType === 'color'"
			class="colorPanel">
			<div :key="idx" v-for="(item, idx) in colors" class="colorItems">
				<div
					:data-color="c"
					class="item"
					v-for="c in item"
					:key="c"
					:style="{
						backgroundColor: c
					}"></div>
			</div>
		</div>
		<div v-show="screen.getScreenOptionOfCanvas.bgType === 'image'" class="imagePanel">
			<div :key="item" v-for="item in 41" class="image">
				<img
					@click="
						screen.getScreenOptionOfCanvas.bgImage = `https://ss1.dycharts.com/canvas_bg/${
							item + 1
						}.png`
					"
					v-lazy="`https://ss1.dycharts.com/canvas_bg/${item + 1}.png`" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, watch } from 'vue'

import ImageUpload from '@/components/imageUpload.vue'
import SeriesItem from '@/components/seriesItem.vue'
import ConfigTitle from '@/views/ScreenPage/components/configTitle.vue'

import useStore from '@/store'

import { debounce } from '@/utils'

import { oss } from '@/network'

const { screen }: any = useStore()
const canvas = reactive(JSON.parse(JSON.stringify(screen.getScreenOptionOfCanvas)))
const colors = [
	['#73d4f7', '#56b2f8', '#3a90f9', '#1d6df9', '#004bfa'],
	['#f7bdff', '#f08efa', '#e95ff5', '#e22ff0', '#db00eb'],
	['#ffbdc3', '#fa8e9e', '#f55f79', '#f02f54', '#eb002f'],
	['#bdffca', '#94f698', '#6ced66', '#43e333', '#1ada01'],
	['#fbffbd', '#f3f18e', '#ebe45f', '#e2d630', '#dac801']
]

onMounted(() => {
	console.log(screen.getScreenOptionOfCanvas, '----')
})

let stop = watch(
	() => canvas,
	debounce(() => {
		screen.updateScreenOptionOfCanvas(JSON.parse(JSON.stringify(canvas)))
	}, 400),
	{
		deep: true
	}
)

const imageChange = (e: any) => {
	screen.updateScreenOptionOfCanvasByKey('bgImage', e)
	// screen.updateScreenOptionOfCanvasByKey('bgImage', e.base64)
	// screen.updateScreenOptionOfCanvasByKey('file', e.file)
}

const selectColor = (e: Event) => {
	if ((e.srcElement as any).dataset.color) {
		screen.updateScreenOptionOfCanvasByKey('bgColor', (e.srcElement as any).dataset.color)
	}
}

onUnmounted(() => {
	stop()
})
</script>

<style lang="less">
.canvas-config {
	.series-item {
		align-items: center;
		.item-title {
			top: 0 !important;
		}
		.el-color-picker {
			width: 100%;
			.el-color-picker__trigger {
				width: 100%;
			}
		}
	}
	.colorPanel {
		margin: 10px 0;
		.colorItems {
			display: grid;
			grid-template-columns: repeat(5, 1fr);
			grid-gap: 5px;
			margin-bottom: 10px;
			.item {
				aspect-ratio: 1/1;
				cursor: pointer;
				border-radius: 5px;
			}
		}
	}
	.imagePanel {
		display: grid;
		margin-top: 10px;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 10px;
		.image {
			overflow: hidden;
			border-radius: 5px;
			aspect-ratio: 1/1;
			cursor: pointer;
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
	}
}
</style>
