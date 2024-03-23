<template>
	<div class="info-chart-page">
		<div class="page-title">我的图表</div>
		<div class="types">
			<div @click="toggleType('chart')" :class="[type === 'chart' ? 'active' : '', 'type-item']">
				图表
			</div>
			<div @click="toggleType('map')" :class="[type === 'map' ? 'active' : '', 'type-item']">
				地图
			</div>
			<div @click="toggleType('screen')" :class="[type === 'screen' ? 'active' : '', 'type-item']">
				大屏
			</div>
		</div>
		<skeleton
			:count="5"
			:status="status"
			:loading-class="['loading-box', 'name']"
			:hidden-class="['mask', 'cover', 'input', 'box']">
			<template v-slot:template="{ setSlotRef }">
				<chart-item
					:chart_id="'null'"
					:name="'xxxxxxxxx'"
					:cover="'null'"
					:option="'null'"
					:state="'null'"
					:type="'null'"
					:user_id="'null'" />
			</template>
			<template v-slot:content>
				<div class="chart-container">
					<chart-item
						v-for="(item, idx) in charts"
						:key="
							item.chart_id ? item.chart_id : item.map_id ? item.map_id : (item as any).screen_id
						"
						:chart_id="
							item.chart_id
								? item.chart_id
								: item.map_id
									? (item.map_id as string)
									: (item as any).screen_id
						"
						:name="item.name"
						:cover="item.cover + '?tempid=' + Math.random()"
						:option="item.option"
						:state="item.state"
						:time="item.time"
						:type="item.type"
						:user_id="item.user_id"
						:idx="idx"
						:blur="blurEvent"
						@click-item="clickItem"
						@delete-item="deleteItem" />
				</div>
				<el-pagination
					v-model:current-page="offset"
					hide-on-single-page
					background
					layout="prev, pager, next"
					:page-size="limit"
					:total="count"
					@current-change="currentChange" />
			</template>
			<template v-slot:empty>
				<el-empty description="暂无图表" />
			</template>
		</skeleton>
	</div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import ChartItem from './components/chartItem.vue'
import Skeleton from '@/components/skeleton.vue'

import useProxy from '@/hooks/useProxy'

import { ajaxRequest } from '@/utils'

import { deleteChart, getChart, putChartName } from '@/network/chart'
import {
	deleteChart as deleteMap,
	getChart as getMap,
	putChartName as putMapName
} from '@/network/map'
import { getScreens, putScreenName } from '@/network/screen.ts'

const router = useRouter()
const charts = reactive<
	{
		chart_id: string
		map_id?: string
		cover: string
		name: string
		option: string
		state: string
		time: number
		type: string
		user_id: string
		adcode?: string
	}[]
>([])
const type = ref<'map' | 'chart' | 'screen'>('chart')
const offset = ref<number>(1)
const count = ref<number>(0)
const limit = ref<number>(0)
const status = ref<'1' | '2' | '3'>('1')
const proxy = useProxy()

const getData = async () => {
	status.value = '1'
	let data: any = null
	if (type.value === 'chart') {
		data = await ajaxRequest(getChart, {
			offset: offset.value
		})
	} else if (type.value === 'map') {
		data = await ajaxRequest(getMap, {
			offset: offset.value
		})
	} else if (type.value === 'screen') {
		data = await ajaxRequest(getScreens, {
			offset: offset.value,
			limit: 10
		})
	}
	if (!data.status || data.data.length == 0) {
		status.value = '3'
	} else {
		status.value = '2'
	}
	count.value = data.count
	limit.value = data.limit
	charts.length = 0
	for (let item of data.data) {
		charts.push(item)
	}
}
getData()

// 输入框失焦回调  修改图表名称
const blurEvent = (newName: string, chart_id: string) => {
	return new Promise(async (resolve, reject) => {
		let data: any
		if (type.value === 'chart') {
			data = await putChartName({
				// 调用接口
				name: newName,
				chart_id
			})
		} else if (type.value === 'map') {
			data = await putMapName({
				// 调用接口
				name: newName,
				map_id: chart_id
			})
		} else {
			data = await putScreenName({
				name: newName,
				screen_id: chart_id
			})
		}
		if (!data.status) {
			reject(false)
			return
		}
		resolve(true)
		proxy.$notice({
			type: 'success',
			message: data.msg,
			position: 'top-left'
		})
	})
}

const clickItem = (id: string) => {
	if (type.value === 'chart') router.push('/chart/' + id)
	else if (type.value === 'map') router.push('/map/' + id)
	else router.push('/screen/' + id)
}

// 刪除图表
const deleteItem = async (info: { idx: number; id: string }) => {
	let data: any
	if (type.value === 'chart') {
		data = await deleteChart({
			chart_id: info.id
		})
	} else {
		data = await deleteMap({
			map_id: info.id
		})
	}
	if (!data.status)
		return proxy.$notice({
			type: 'error',
			message: data.msg,
			position: 'top-left'
		})
	proxy.$notice({
		type: 'success',
		message: data.msg,
		position: 'top-left'
	})
	charts.splice(info.idx, 1)
}

const currentChange = (e: number) => {
	offset.value = e
	getData()
}

const toggleType = (_type: 'chart' | 'map' | 'screen') => {
	if (_type !== type.value) {
		offset.value = 1
		type.value = _type
		getData()
	}
}
</script>
<style lang="less">
.info-chart-page {
	.skeleton-loading {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		grid-gap: 20px;
		.loading-box {
			width: 100%;
			aspect-ratio: 2/1.3;
		}
	}
	.el-empty {
		padding: 80px 0;
	}

	.chart-container {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		grid-gap: 20px;
	}

	.types {
		display: flex;
		margin-bottom: 20px;

		.type-item {
			padding: 6px 20px 8px;
			margin-right: 20px;
			font-size: 13px;
			color: #fff;
			border-radius: 20px;
			transition: 0.2s all linear;
			cursor: pointer;
		}

		.active {
			background-color: @theme;
		}
	}
}
</style>
