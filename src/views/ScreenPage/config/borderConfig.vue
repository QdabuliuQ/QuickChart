<template>
	<div class="border-config">
		<config-cover icon="i_border" />
		<config-title title="边框参数" />
		<common-config :info="screen.getScreenOptionOfElements[screen.getCurElementIdx]" />
		<config-title title="边框配置" />
		<series-item title="层级">
			<el-input-number
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.zIndex"
				:max="100"
				:min="1"
				size="small" />
		</series-item>
		<series-item title="颜色一">
			<el-color-picker
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.color1"
				show-alpha
				size="small" />
		</series-item>
		<series-item title="颜色二">
			<el-color-picker
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.color2"
				show-alpha
				size="small" />
		</series-item>
		<series-item
			v-if="screen.getScreenOptionOfElements[screen.getCurElementIdx].code === 1"
			title="动画持续时间">
			<el-input-number
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.duration"
				:max="100"
				:min="1"
				:precision="2"
				size="small" />
		</series-item>
		<series-item
			v-if="screen.getScreenOptionOfElements[screen.getCurElementIdx].code === 4"
			title="标题文本">
			<el-input
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.borderTitle"
				maxlength="20"
				size="small"
				type="text" />
		</series-item>
		<series-item
			v-if="screen.getScreenOptionOfElements[screen.getCurElementIdx].code === 4"
			title="标题宽度">
			<el-input-number
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.borderTitleWidth"
				:max="1000"
				:min="1"
				size="small" />
		</series-item>
		<series-item
			v-if="screen.getScreenOptionOfElements[screen.getCurElementIdx].code === 4"
			title="标题高度">
			<el-input-number
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.borderTitleHeight"
				:max="100"
				:min="1"
				size="small" />
		</series-item>
		<series-item
			v-if="screen.getScreenOptionOfElements[screen.getCurElementIdx].code === 4"
			title="字体颜色">
			<el-color-picker
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.borderTitleColor"
				show-alpha
				size="small" />
		</series-item>
		<series-item
			v-if="screen.getScreenOptionOfElements[screen.getCurElementIdx].code === 4"
			title="字体大小">
			<el-input-number
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.borderTitleSize"
				:max="500"
				:min="1"
				size="small" />
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
import ConfigCover from '@/views/ScreenPage/components/configCover.vue'
import ConfigTitle from '@/views/ScreenPage/components/configTitle.vue'
import CommonConfig from '@/views/ScreenPage/config/commonConfig.vue'

import { useElementConfig } from '@/hooks/useElementConfig.ts'

const { deleteEvent, screen } = useElementConfig()
</script>
