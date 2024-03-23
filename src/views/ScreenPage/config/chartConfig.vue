<template>
	<div class="chart-config">
		<template v-if="info">
			<div class="cover">
				<img :src="info.cover" />
			</div>
			<config-title title="图表参数" />
			<common-config :info="baseInfo" />
			<config-title title="图表配置" />
			<series-item title="层级">
				<el-input-number v-model="info.style.zIndex" :max="100" :min="1" size="small" />
			</series-item>
			<config-btn
				:bg-color="'rgb(255, 66, 66)'"
				:icon="'i_delete_2'"
				label="删除元素"
				@btn-click="deleteEvent" />
		</template>
	</div>
</template>
<script lang="ts" setup>
import SeriesItem from '@/components/seriesItem.vue'
import ConfigBtn from '@/views/ScreenPage/components/configBtn.vue'
import ConfigTitle from '@/views/ScreenPage/components/configTitle.vue'
import CommonConfig from '@/views/ScreenPage/config/commonConfig.vue'

import { useElementConfig } from '@/hooks/useElementConfig'

import { Chart } from '@/types/screen'

const { baseInfo, info, deleteEvent } = useElementConfig<Chart>()
</script>
<style lang="less">
.chart-config {
	.cover {
		overflow: hidden;
		width: 100%;
		background-repeat: repeat;
		background-size: 10px 10px;
		border-radius: 10px;
		aspect-ratio: 1/0.7;
		background-image: url('../../../assets/image/transparent.png');

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			vertical-align: middle;
		}
	}
}
</style>
