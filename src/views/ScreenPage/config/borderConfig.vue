<template>
	<div v-if="info" class="border-config">
		<config-cover icon="i_border" />
		<config-title title="边框参数" />
		<common-config :info="baseInfo" />
		<config-title title="边框配置" />
		<series-item title="层级">
			<el-input-number :min="1" :max="100" size="small" v-model="info.style.zIndex" />
		</series-item>
		<series-item title="颜色一">
			<el-color-picker size="small" v-model="info.style.color1" show-alpha />
		</series-item>
		<series-item title="颜色二">
			<el-color-picker size="small" v-model="info.style.color2" show-alpha />
		</series-item>
		<series-item v-if="info.code === 1" title="动画持续时间">
			<el-input-number
				:min="1"
				:max="100"
				:precision="2"
				size="small"
				v-model="info.style.duration" />
		</series-item>
		<series-item v-if="info.code === 4" title="标题文本">
			<el-input size="small" maxlength="20" type="text" v-model="info.style.borderTitle" />
		</series-item>
		<series-item v-if="info.code === 4" title="标题宽度">
			<el-input-number :min="1" :max="1000" size="small" v-model="info.style.borderTitleWidth" />
		</series-item>
		<series-item v-if="info.code === 4" title="标题高度">
			<el-input-number :min="1" :max="100" size="small" v-model="info.style.borderTitleHeight" />
		</series-item>
		<series-item v-if="info.code === 4" title="字体颜色">
			<el-color-picker size="small" v-model="info.style.borderTitleColor" show-alpha />
		</series-item>
		<series-item v-if="info.code === 4" title="字体大小">
			<el-input-number :min="1" :max="500" size="small" v-model="info.style.borderTitleSize" />
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

import { useElementConfig } from '@/hooks/useElementConfig.ts'

import { Image } from '@/types/screen.ts'

const { baseInfo, info, deleteEvent } = useElementConfig<Image>()
</script>
