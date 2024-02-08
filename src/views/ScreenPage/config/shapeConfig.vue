<template>
	<div class="shape-config">
		<template v-if="info">
			<config-cover icon="i_shape" />
			<config-title title="图形参数" />
			<common-config :info="baseInfo" />
			<config-title title="替换图形" />
			<el-scrollbar height="200px">
				<div class="shapeContainer">
					<div v-for="item in SHAPE_LIST" :key="info.type" class="shapeGroup">
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
				<el-input-number :min="1" :max="100" size="small" v-model="info.style.zIndex" />
			</series-item>
			<series-item title="阴影颜色">
				<el-color-picker size="small" v-model="info.style.shadowColor" show-alpha />
			</series-item>
			<series-item title="阴影偏移X">
				<el-input-number :min="-200" :max="200" size="small" v-model="info.style.shadowX" />
			</series-item>
			<series-item title="阴影偏移Y">
				<el-input-number :min="-200" :max="200" size="small" v-model="info.style.shadowY" />
			</series-item>
			<series-item title="阴影模糊">
				<el-input-number :min="0" :max="100" size="small" v-model="info.style.shadowBlur" />
			</series-item>
			<series-item title="图形颜色">
				<el-color-picker size="small" v-model="info.style.fill" show-alpha />
			</series-item>
			<series-item title="边框颜色">
				<el-color-picker size="small" v-model="info.style.stroke" show-alpha />
			</series-item>
			<series-item title="边框宽度">
				<el-input-number :min="0" :max="100" size="small" v-model="info.style.strokeWidth" />
			</series-item>
			<config-btn
				:icon="'i_delete_2'"
				:bg-color="'rgb(255, 66, 66)'"
				@btn-click="deleteEvent"
				label="删除元素" />
		</template>
	</div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'

import SeriesItem from '@/components/seriesItem.vue'
import ConfigBtn from '@/views/ScreenPage/components/configBtn.vue'
import ConfigCover from '@/views/ScreenPage/components/configCover.vue'
import ConfigTitle from '@/views/ScreenPage/components/configTitle.vue'
import CommonConfig from '@/views/ScreenPage/config/commonConfig.vue'

import { SHAPE_LIST } from '@/assets/js/shape'

import useProxy from '@/hooks/useProxy'

import useStore from '@/store'

import { setCommonStyle } from '@/utils/screenUtil'
import { debounce } from '@/utils'

import { ElementTypeProperties, Shape } from '@/types/screen'

const props = defineProps<{
	id: string
}>()
let info = ref<Shape | null>(null)
const idx = ref<number>(-1)
const { screen } = useStore()
const baseInfo = ref(
	screen.getScreenOptionOfElements[screen.getCurElementIdx] as ElementTypeProperties<'text'>
)

const updateInfo = () => {
	if (screen.getCurElementIdx !== -1) {
		idx.value = screen.getCurElementIdx
		info.value = JSON.parse(
			JSON.stringify(screen.getScreenOptionOfElements[idx.value] as ElementTypeProperties<'shape'>)
		)
	}
}

const svgClick = (path: string, viewBox: [number, number]) => {
	screen.updateElementOfShapePath(path, viewBox, screen.getCurElementIdx)
}

let stop = watch(
	() => info,
	debounce(() => {
		setCommonStyle(baseInfo, info)
		screen.updateScreenOptionOfElementStyle(
			JSON.parse(JSON.stringify(info.value!.style)),
			idx.value
		)
	}),
	{
		deep: true
	}
)
let stop2 = watch(
	() => screen.curElementIdx,
	(newVal: number) => {
		if (newVal !== -1 && screen.getScreenOptionOfElements[newVal].id === props.id) {
			baseInfo.value = screen.getScreenOptionOfElements[screen.getCurElementIdx]
			updateInfo()
		}
	}
)

const proxy = useProxy()
const deleteEvent = () => {
	// 删除图表
	proxy.$Bus.emit('deleteChart', screen.curElementIdx)
}

onMounted(() => {
	updateInfo()
	console.log('挂载')
})
onUnmounted(() => {
	stop()
	stop2()
	console.log('卸载')
})
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
