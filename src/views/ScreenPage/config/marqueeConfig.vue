<template>
	<div class="marquee-config">
		<config-cover icon="i_scroll_text" />
		<config-title title="文本参数" />
		<common-config :info="screen.getScreenOptionOfElements[screen.getCurElementIdx]" />
		<config-title title="文本配置" />
		<series-item title="文本内容">
			<el-input
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].content"
				maxlength="100"
				size="small" />
		</series-item>
		<series-item title="滚动速度">
			<el-input-number
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].speed"
				:max="10"
				:min="0.1"
				:step="0.1"
				size="small" />
		</series-item>
		<series-item title="层级">
			<el-input-number
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.zIndex"
				:max="100"
				:min="1"
				size="small" />
		</series-item>
		<series-item title="字体大小">
			<el-input-number
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.fontSize"
				:max="100"
				:min="1"
				size="small" />
		</series-item>
		<series-item title="字体间距">
			<el-input-number
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.letterSpacing"
				:max="100"
				:min="0"
				size="small" />
		</series-item>
		<series-item title="字体高度">
			<el-input-number
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.lineHeight"
				:max="50"
				:min="10"
				size="small" />
		</series-item>
		<series-item title="字体粗细">
			<el-select
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.fontWeight"
				placeholder="请选择"
				popper-class="params-select-popper-class"
				size="small">
				<el-option key="lighter" label="lighter" value="lighter" />
				<el-option key="normal" label="normal" value="normal" />
				<el-option key="bold" label="bold" value="bold" />
				<el-option key="bolder" label="bolder" value="bolder" />
			</el-select>
		</series-item>
		<series-item title="字体对齐">
			<el-select
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.textAlign"
				placeholder="请选择"
				popper-class="params-select-popper-class"
				size="small">
				<el-option key="left" label="左对齐" value="left" />
				<el-option key="renter" label="居中" value="center" />
				<el-option key="right" label="右对齐" value="right" />
			</el-select>
		</series-item>
		<series-item title="字体样式">
			<el-select
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.fontStyle"
				placeholder="请选择"
				popper-class="params-select-popper-class"
				size="small">
				<el-option key="normal" label="正常" value="normal" />
				<el-option key="italic" label="斜体" value="italic" />
			</el-select>
		</series-item>
		<series-item title="字体线段">
			<el-select
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.textDecorationLine"
				placeholder="请选择"
				popper-class="params-select-popper-class"
				size="small">
				<el-option key="none" label="无线段" value="none" />
				<el-option key="underline" label="下划线" value="underline" />
				<el-option key="overline" label="上划线" value="overline" />
				<el-option key="line-through" label="删除线" value="line-through" />
			</el-select>
		</series-item>
		<series-item title="线段类型">
			<el-select
				v-model="
					screen.getScreenOptionOfElements[screen.getCurElementIdx].style.textDecorationStyle
				"
				placeholder="请选择"
				popper-class="params-select-popper-class"
				size="small">
				<el-option key="solid" label="实线" value="solid" />
				<el-option key="double" label="双划线" value="double" />
				<el-option key="dotted" label="点线" value="dotted" />
				<el-option key="dashed" label="线段" value="dashed" />
				<el-option key="wavy" label="波浪线" value="wavy" />
			</el-select>
		</series-item>
		<series-item title="线段颜色">
			<el-color-picker
				v-model="
					screen.getScreenOptionOfElements[screen.getCurElementIdx].style.textDecorationColor
				"
				show-alpha
				size="small" />
		</series-item>
		<series-item title="字体颜色">
			<el-color-picker
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.color"
				show-alpha
				size="small" />
		</series-item>
		<series-item title="背景颜色">
			<el-color-picker
				v-model="screen.getScreenOptionOfElements[screen.getCurElementIdx].style.backgroundColor"
				show-alpha
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
