<template>
	<div class="Modify_ChartPage">
		<div class="infoContainer" v-if="state === 1">
			<div class="leftExcelContainer">
				<chart-data :detail_type="detailType" :type="type" :loading="data_loading" />
			</div>
			<div class="centerChartContainer">
				<chart-detail
					:back="true"
					:update="true"
					:share="true"
					:loading="chart_loading"
					:detail-type="detailType"
					:chart_id="id as string"
					:info-panel="true"
					:type="type"
					:praise_count="praise_count"
					:is_praise="is_praise"
					:comment_count="comment_count"
					:get-data="getCommentData" />
			</div>
			<div class="rightParamsContainer">
				<chart-params :loading="params_loading" :image="image" />
			</div>
		</div>
		<div v-else class="emptyContainer">
			<empty-tip />
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import chartData from '@/components/chartData.vue'
import chartDetail from '@/components/chartDetail.vue'
import chartParams from '@/components/chartParams.vue'
import emptyTip from '@/components/emptyTip.vue'

import useProxy from '@/hooks/useProxy'

import useStore from '@/store'

import { createImage, deepCopy } from '@/utils'

import { getChartDetail, getComment } from '@/network/chart'
import { importChartFile } from '@/utils/importFile.ts'

const { chart }: any = useStore()
const proxy = useProxy()
const router = useRouter()
const { id } = router.currentRoute.value.params // 获取图表ID

const state = ref<number>(1)
const detailType = ref<string>('')
const type = ref<string>('')
const chart_loading = ref<boolean>(true)
const params_loading = ref<boolean>(true)
const data_loading = ref<boolean>(true)
const praise_count = ref<number>(0)
const is_praise = ref<number>(0)
const comment_count = ref<number>(0)
const image = ref<string>('')

const getConfig = async () => {
	let data: any = await getChartDetail({
		chart_id: id as string
	})
	if (!data.status) {
		state.value = 0
		return proxy.$notice({
			type: 'error',
			message: data.msg,
			position: 'top-left'
		})
	}
	image.value = data.data.cover
	detailType.value = data.data.type
	praise_count.value = data.praise_count
	comment_count.value = data.comment_count
	is_praise.value = data.is_praise
	type.value = parseInt(data.data.type).toString()
	if (typeof data.data.option.backgroundColor === 'object') {
		// 处理背景颜色
		let src = data.data.option.backgroundColor.image
		data.data.option.backgroundColor.image = createImage(src)
		data.data.option.backgroundColor.url = src
	}
	if (data.data.option.graphic.length) {
		// 处理图形组件
		for (let item of data.data.option.graphic) {
			if (item.type === 'image') {
				let src = item.style.image
				item.style.image = createImage(src)
				item.style.url = src
			}
		}
	}
	try {
		importChartFile(`/chart/${parseInt(data.data.type)}_/chart${data.data.type}.ts`)().then(
			(res: any) => {
				let option = res.default()
				let chartConfig: any[] = []
				for (let item of option) {
					if (Object.prototype.hasOwnProperty.call(data.data.option, item.opName)) {
						item.defaultOption[item.opName] = data.data.option[item.opName]
					}
					if (item.menuOption) {
						chartConfig.push(item)
					}
				}
				chart.setOption(data.data.option)
				chart.setChartConfig(chartConfig)
				chart.setDefaultOption(deepCopy(data.data.option))
				chart.setType('chart')
				chart_loading.value = false
				setTimeout(() => {
					params_loading.value = false
					data_loading.value = false
				}, 800)
			}
		)
	} catch (err) {
		state.value = 0
	}
}
getConfig()

const getCommentData = async (e: number) => {
	return await getComment({
		offset: e,
		chart_id: id as string
	})
}
</script>
<style lang="less">
.Modify_ChartPage {
	width: 100vw;
	height: 100vh;
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
	.emptyContainer {
		width: 100vw;
		height: 100vh;
	}
}
</style>
