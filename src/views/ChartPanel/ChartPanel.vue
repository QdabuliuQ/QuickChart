<template>
	<div class="chart-panel">
		<div class="info-container" v-if="state === 1">
			<div class="left-chart-container">
				<chart-detail
					:loading="chart_loading"
					:detail-type="detailType"
					:info-panel="false"
					:type="type" />
			</div>
			<div class="right-params-container">
				<div class="panel-btn-list">
					<div @click="toggle(0)" :class="[opType == 0 ? 'active' : '', 'btnItem']">编辑数据</div>
					<div @click="toggle(1)" :class="[opType == 1 ? 'active' : '', 'btnItem']">编辑图表</div>
				</div>
				<div
					:style="{
						width: opType === 0 ? '450px' : '220px'
					}"
					class="params-container">
					<chart-data
						v-show="opType == 0"
						:detail_type="detailType"
						:type="type"
						:key="detailType"
						:loading="data_loading" />
					<chart-params v-show="opType == 1" :loading="params_loading" :image="image" />
				</div>
			</div>
		</div>
		<div v-else class="empty-container">
			<empty-tip />
		</div>
	</div>
</template>

<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue'
import useStore from '@/store'
import { useRouter } from 'vue-router'
import { deepCopy } from '@/utils'
import ChartDetail from '@/components/chartDetail.vue'
import ChartParams from '@/components/chartParams.vue'
import ChartData from '@/components/chartData.vue'
import EmptyTip from '@/components/emptyTip.vue'

const { chart }: any = useStore()
const router = useRouter()

const state = ref<number>(1)
const chart_loading = ref<boolean>(true)
const params_loading = ref<boolean>(true)
const data_loading = ref<boolean>(true)
const detailType = ref<string>('')
const type = ref<string>('')
const image = ref<string>('')
const opType = ref<number>(1)

const getConfig = async () => {
	detailType.value = router.currentRoute.value.params.id as string
	type.value = parseInt(router.currentRoute.value.params.id as string).toString()

	image.value = ((await import('../../assets/image/' + detailType.value + '.webp')) as any).default

	// image.value = m.default
	let res = await import(`../../config/chart/config/chart/${type.value}_/chart${detailType.value}`)
	// let res = await import.meta.glob(`@/config/chart/config/chart/${type.value}_/chart${detailType.value}`, {eager: true})
	let option = res.default()
	let chartConfig: any[] = []
	let tmpOption: any = {} // 临时配置
	for (let item of option) {
		if (item.chartOption) {
			tmpOption[item.opName] = item.defaultOption[item.opName]
		}
		if (item.menuOption) {
			chartConfig.push(item)
		}
	}
	chart.setOption(tmpOption)
	chart.setChartConfig(chartConfig)
	chart.setDefaultOption(deepCopy(tmpOption))
	chart.setType('chart')

	chart_loading.value = false
	setTimeout(() => {
		params_loading.value = false
	}, 800)
}
getConfig()

const toggle = (type: number) => {
	opType.value = type
	if (type === 0 && data_loading.value) {
		setTimeout(() => {
			data_loading.value = false
		}, 500)
	}
}

const stop = watch(
	() => router.currentRoute.value.params.id,
	() => {
		opType.value = 1
		chart_loading.value = true
		data_loading.value = true
		params_loading.value = true
		getConfig()
	}
)

onUnmounted(() => {
	stop()
})
</script>

<style lang="less">
.chart-panel {
	width: 100%;
	height: 100%;
	.info-container {
		display: flex;
		width: 100%;
		height: 100%;
		.left-chart-container {
			flex: 1;
		}
		.right-params-container {
			width: 220px;
			.panel-btn-list {
				display: flex;
				align-items: center;
				padding: 20px 0 0;
				font-size: 12.5px;

				.btnItem {
					padding: 9px 0;
					text-align: center;
					text-indent: 1px;
					color: rgb(150 150 150);
					transition: 0.2s all linear;
					flex: 1;
					cursor: pointer;
					letter-spacing: 1px;
				}

				.active {
					color: @theme;
					background-color: @curColor;
					border-top-left-radius: 4px;
					border-top-right-radius: 4px;
				}
			}
			.params-container {
				position: absolute;
				right: 0;
				height: calc(100vh - 34.8px - 20px);
			}
		}
	}
	.empty-container {
		width: 100%;
		height: 100%;
	}
}
</style>
