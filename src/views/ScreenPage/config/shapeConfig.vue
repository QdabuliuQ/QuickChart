<template>
	<div class="shape-config">
		<config-cover icon="i_shape" />
		<config-title title="图形参数" />
		<common-config :info="screen.getScreenOptionOfElements[screen.getCurElementIdx]" />
		<config-title title="替换图形" />
		<el-scrollbar height="200px">
			<div class="shapeContainer">
				<div v-for="item in SHAPE_LIST" :key="item.type" class="shapeGroup">
					<svg
						@click="svgClick(s.path, s.viewBox)"
						v-for="s in item.children"
						:key="s.path"
						overflow="visible"
						width="18"
						height="18">
						<g
							:transform="`scale(${18 / s.viewBox[0]}, ${
								18 / s.viewBox[1]
							}) translate(0,0) matrix(1,0,0,1,0,0)`">
							<path
								class="shape-path"
								:class="{ outlined: s.outlined }"
								vector-effect="non-scaling-stroke"
								stroke-linecap="butt"
								stroke-miterlimit="8"
								:fill="s.outlined ? '#999' : 'transparent'"
								:stroke="s.outlined ? 'transparent' : '#999'"
								stroke-width="2"
								:d="s.path"></path>
						</g>
					</svg>
				</div>
			</div>
		</el-scrollbar>
		<config-title title="图形配置" />
		<series-item title="层级">
			<el-input-number
				:min="1"
				:max="100"
				size="small"
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.zIndex" />
		</series-item>
		<series-item title="阴影颜色">
			<el-color-picker
				size="small"
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.shadowColor"
				show-alpha />
		</series-item>
		<series-item title="阴影偏移X">
			<el-input-number
				:min="-200"
				:max="200"
				size="small"
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.shadowX" />
		</series-item>
		<series-item title="阴影偏移Y">
			<el-input-number
				:min="-200"
				:max="200"
				size="small"
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.shadowY" />
		</series-item>
		<series-item title="阴影模糊">
			<el-input-number
				:min="0"
				:max="100"
				size="small"
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.shadowBlur" />
		</series-item>
		<series-item title="图形颜色">
			<el-color-picker
				size="small"
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.fill"
				show-alpha />
		</series-item>
		<series-item title="边框颜色">
			<el-color-picker
				size="small"
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.stroke"
				show-alpha />
		</series-item>
		<series-item title="边框宽度">
			<el-input-number
				:min="0"
				:max="100"
				size="small"
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.strokeWidth" />
		</series-item>
		<config-btn
			:icon="'i_delete_2'"
			:bg-color="'rgb(255, 66, 66)'"
			@btn-click="deleteEvent"
			label="删除元素" />
	</div>
</template>
<script setup lang="ts">
import SeriesItem from '@/components/seriesItem.vue'
import ConfigBtn from '@/views/ScreenPage/components/configBtn.vue'
import ConfigCover from '@/views/ScreenPage/components/configCover.vue'
import ConfigTitle from '@/views/ScreenPage/components/configTitle.vue'
import CommonConfig from '@/views/ScreenPage/config/commonConfig.vue'

import { SHAPE_LIST } from '@/assets/js/shape'

import { useElementConfig } from '@/hooks/useElementConfig.ts'

const svgClick = (path: string, viewBox: [number, number]) => {
	screen.updateElementOfShapePath(path, viewBox, screen.getCurElementIdx)
}

const { deleteEvent, screen } = useElementConfig()
</script>
<style lang="less">
.shape-config {
	.el-scrollbar {
		overflow: hidden;
		margin-top: 10px;
		background-color: #494949;
		border-radius: 10px;
		.shapeContainer {
			padding: 15px 10px;
			.shapeGroup {
				display: grid;
				grid-template-columns: repeat(5, 1fr);
				grid-gap: 15px;
				&:not(:last-child) {
					margin-bottom: 20px;
				}
				svg {
					cursor: pointer;
					path {
						transition: 0.2s all linear;
					}
					&:hover path {
						stroke: @theme;
					}
				}
			}
		}
	}
}
</style>
