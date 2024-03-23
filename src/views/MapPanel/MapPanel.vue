<template>
	<div class="MapPanel">
		<div class="infoContainer" v-if="state === 1">
			<div class="leftChartContainer">
				<map-detail
					:loading="chart_loading"
					:detail-type="detailType"
					:type="type"
					:adcode="router.currentRoute.value.params.adcode as string" />
			</div>
			<div class="rightParamsContainer">
				<div class="panelBtnList">
					<div @click="toggle(0)" :class="[opType == 0 ? 'active' : '', 'btnItem']">编辑数据</div>
					<div @click="toggle(1)" :class="[opType == 1 ? 'active' : '', 'btnItem']">编辑图表</div>
				</div>
				<div
					:style="{
						width: opType === 0 ? '450px' : '220px'
					}"
					class="paramsContainer">
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
		<div v-else class="emptyContainer">
			<empty-tip />
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { onBeforeRouteUpdate, useRouter } from 'vue-router'

import ChartData from '@/components/chartData.vue'
import ChartParams from '@/components/chartParams.vue'
import EmptyTip from '@/components/emptyTip.vue'
import MapDetail from '@/components/mapDetail.vue'

import useStore from '@/store'

import { importMapFile } from '@/utils/importFile.ts'
import { deepCopy } from '@/utils'

import 'echarts-gl' //3D地图插件
import { getCityJSON } from '@/network/map'

const { chart }: any = useStore()
const router = useRouter()
let { id, adcode } = router.currentRoute.value.params
const detailType = ref<string>('')
const type = ref<string>('')
const state = ref<number>(1)
const image = ref<string>('')
const opType = ref<number>(1)
const chart_loading = ref<boolean>(true)
const params_loading = ref<boolean>(true)
const data_loading = ref<boolean>(true)

let JSONData: any = ''
const getJSON = async () => {
	if (localStorage.getItem(adcode as string)) {
		JSONData = JSON.parse(localStorage.getItem(adcode as string) as string)
	} else {
		let data = await getCityJSON({
			adcode: adcode as string
		})
		JSONData = data.data
		localStorage.setItem(adcode as string, JSON.stringify(data.data))
	}
}

const getConfig = async () => {
	await getJSON()
	detailType.value = id as string
	type.value = parseInt(id as string).toString()
	image.value = `${import.meta.env.VITE_API_URL}/images/map${detailType.value}.webp`

	importMapFile(`/map/${type.value}_/map${detailType.value}.ts`)().then((res: any) => {
		let option = res.default()
		sessionStorage.setItem('curAdcode', adcode as string)
		let chartConfig: any[] = []
		let tmpOption: any = {} // 临时配置
		for (let item of option) {
			if (item.chartOption) {
				if (item.opName === 'series') {
					item.defaultOption[item.opName][0].map = `map${adcode}`
				}
				tmpOption[item.opName] = item.defaultOption[item.opName]
			}
			if (item.menuOption) {
				chartConfig.push(item)
			}
		}

		chart.setOption(tmpOption)
		chart.setChartConfig(chartConfig)
		chart.setDefaultOption(deepCopy(tmpOption))
		chart.setMapJSON(JSONData)
		chart.setType('map')

		chart_loading.value = false
		setTimeout(() => {
			params_loading.value = false
		}, 800)
	})
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

onBeforeRouteUpdate(() => {
	chart_loading.value = true
	params_loading.value = true
	setTimeout(() => {
		id = router.currentRoute.value.params.id
		adcode = router.currentRoute.value.params.adcode
		console.log(id, adcode)
		getConfig()
	}, 300)
})
</script>
<style lang="less">
.MapPanel {
	width: 100%;
	height: 100%;
	.infoContainer {
		display: flex;
		width: 100%;
		height: 100%;
		.leftChartContainer {
			flex: 1;
		}
		.rightParamsContainer {
			width: 220px;
			.panelBtnList {
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
			.paramsContainer {
				position: absolute;
				right: 0;
				height: calc(100vh - 34.8px - 20px);
			}
		}
	}
	.emptyContainer {
		width: 100%;
		height: 100%;
	}
}
</style>
