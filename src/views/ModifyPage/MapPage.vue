<template>
	<div class="Modify_MapPage">
		<div class="infoContainer" v-if="state === 1">
			<div class="leftExcelContainer">
				<chart-data :detail_type="detailType" :type="type" :loading="data_loading" />
			</div>
			<div class="centerChartContainer">
				<map-detail
					:loading="chart_loading"
					:detail-type="detailType"
					:type="type"
					:update="self"
					:share="true"
					:back="true"
					:adcode="adcode"
					:map_id="id as string"
					:praise_count="praise_count"
					:is_praise="is_praise" />
			</div>
			<div class="rightParamsContainer">
				<chart-params :loading="params_loading" :image="image" />
			</div>
		</div>
		<div v-else class="empty-container">
			<empty-tip />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import ChartData from '@/components/chartData.vue'
import ChartParams from '@/components/chartParams.vue'
import EmptyTip from '@/components/emptyTip.vue'
import MapDetail from '@/components/mapDetail.vue'

import useStore from '@/store'

import { importMapFile } from '@/utils/importFile.ts'
import { deepCopy } from '@/utils'

import { getChartDetail, getCityJSON } from '@/network/map'

const { chart }: any = useStore()
const route = useRoute()
const { id } = route.params
let JSONData: any = null
const state = ref<number>(1)
const detailType = ref<string>('')
const type = ref<string>('')
const chart_loading = ref<boolean>(true)
const params_loading = ref<boolean>(true)
const data_loading = ref<boolean>(true)
const adcode = ref<string>('')
const image = ref<string>('')
const praise_count = ref<number>(0)
const is_praise = ref<number>(0)
const self = ref<boolean>(false)

const getDetail = async () => {
	let data: any = await getChartDetail({
		map_id: id as string
	})
	state.value = data.status
	if (data.status !== 1) return
	adcode.value = data.data.adcode
	image.value = data.data.cover
	self.value = data.self
	praise_count.value = data.data.praise_count
	is_praise.value = data.data.is_praise
	sessionStorage.setItem('curAdcode', adcode.value)
	await getJSON(adcode.value)
	await getConfig(data.data.type, data.data.option)
}
const getJSON = async (adcode: string) => {
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
const getConfig = async (_type: string, _option: any) => {
	detailType.value = _type
	type.value = parseInt(_type).toString()

	try {
		importMapFile(`/map/${type.value}_/map${detailType.value}.ts`)().then((res: any) => {
			let option = res.default()
			let chartConfig: any[] = []
			for (let item of option) {
				if (Object.prototype.hasOwnProperty.call(_option, item.opName)) {
					item.defaultOption[item.opName] = _option[item.opName]
				}
				if (item.menuOption) {
					chartConfig.push(item)
				}
			}
			chart.setOption(_option)
			chart.setChartConfig(chartConfig)
			chart.setDefaultOption(deepCopy(_option))
			chart.setMapJSON(JSONData)
			chart.setType('map')

			chart_loading.value = false
			setTimeout(() => {
				params_loading.value = false
				data_loading.value = false
			}, 800)
		})
	} catch (err) {
		state.value = 0
	}
}
getDetail()
</script>

<style lang="less">
.Modify_MapPage {
	height: 100vh;
	min-height: 100vh;
	max-height: 100vh;
	.infoContainer {
		display: flex;
		width: 100%;
		height: 100%;
		.leftExcelContainer {
			width: 450px;
		}
		.centerChartContainer {
			flex: 1;
		}
		.rightParamsContainer {
			width: 220px;
		}
	}
	.empty-container {
		width: 100vw;
		height: 100vh;
	}
}
</style>
