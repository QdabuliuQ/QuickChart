<template>
	<div class="image-config">
		<div class="configInfo">
			<img :src="screen.getScreenOptionOfElements[screen.getCurElementIdx].url" />
		</div>
		<config-title title="图表参数" />
		<common-config :info="screen.getScreenOptionOfElements[screen.getCurElementIdx]" />
		<config-title title="图表配置" />
		<series-item title="层级">
			<el-input-number
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.zIndex"
				:max="100"
				:min="1"
				size="small" />
		</series-item>
		<series-item title="阴影颜色">
			<el-color-picker
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.shadowColor"
				show-alpha
				size="small" />
		</series-item>
		<series-item title="阴影偏移X">
			<el-input-number
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.shadowX"
				:max="200"
				:min="-200"
				size="small" />
		</series-item>
		<series-item title="阴影偏移Y">
			<el-input-number
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.shadowY"
				:max="200"
				:min="-200"
				size="small" />
		</series-item>
		<series-item title="阴影模糊">
			<el-input-number
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.shadowBlur"
				:max="100"
				:min="0"
				size="small" />
		</series-item>
		<series-item title="边框颜色">
			<el-color-picker
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.borderColor"
				show-alpha
				size="small" />
		</series-item>
		<series-item title="边框宽度">
			<el-input-number
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.borderWidth"
				:max="100"
				:min="0"
				size="small" />
		</series-item>
		<series-item title="边框类型">
			<el-select
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.borderType"
				placeholder="请选择"
				popper-class="params-select-popper-class"
				size="small">
				<el-option key="none" label="无边框" value="none" />
				<el-option key="dotted" label="点线" value="dotted" />
				<el-option key="dashed" label="线段" value="dashed" />
				<el-option key="solid" label="实线" value="solid" />
			</el-select>
		</series-item>
		<config-btn
			:bg-color="'rgb(255, 66, 66)'"
			:icon="'i_delete_2'"
			label="删除元素"
			@btn-click="deleteEvent" />
	</div>
</template>
<script lang="ts" setup>
import SeriesItem from '@/components/seriesItem.vue'
import ConfigBtn from '@/views/ScreenPage/components/configBtn.vue'
import ConfigTitle from '@/views/ScreenPage/components/configTitle.vue'
import CommonConfig from '@/views/ScreenPage/config/commonConfig.vue'

import { useElementConfig } from '@/hooks/useElementConfig.ts'

const { deleteEvent, screen } = useElementConfig()
</script>
<style lang="less">
.image-config {
	.configInfo {
		overflow: hidden;
		width: 100%;
		background-size: 100% 100%;
		border-radius: 10px;
		aspect-ratio: 2/1.3;
		background-image: url('../../../assets/image/bg.jpg');

		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}
}
</style>
