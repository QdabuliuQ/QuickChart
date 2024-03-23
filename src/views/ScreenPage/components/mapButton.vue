<template>
	<el-popover
		ref="mapPopoverRef"
		:hide-after="0"
		placement="right-start"
		popper-class="functionListPopoverClass"
		trigger="click">
		<el-scrollbar height="400px">
			<skeleton :count="4" :loading-class="['cover', 'name']" :status="mapInfo.status">
				<template v-slot:template="{ setSlotRef }">
					<div class="item">
						<div class="cover" style="width: 100%; aspect-ratio: 2/1.3"></div>
						<div class="name" style="margin-top: 5px">xxxxxxxxxxx</div>
					</div>
				</template>
				<template v-slot:content>
					<div class="functionListChartContainer">
						<div v-for="item in mapList" :key="item.cover" class="item" @click="itemClick(item)">
							<div class="mask">插入图表</div>
							<el-image :src="item.cover" fit="cover" style="width: 100%; aspect-ratio: 2/1.3" />
							<div class="name">{{ item.name }}</div>
						</div>
					</div>
					<el-pagination
						v-model:current-page="mapInfo.offset"
						:page-size="mapInfo.limit"
						:total="mapInfo.count"
						background
						class="pagination-class"
						hide-on-single-page
						layout="prev, pager, next"
						@current-change="mapCurrentChange" />
				</template>
				<template v-slot:empty>
					<el-empty description="暂无图表" />
				</template>
			</skeleton>
		</el-scrollbar>
		<template #reference>
			<button-item icon="i_map" tip="插入地图" title="地图" @click-event="getData" />
		</template>
	</el-popover>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'

import Skeleton from '@/components/skeleton.vue'
import ButtonItem from '@/views/ScreenPage/components/buttonItem.vue'

import useStore from '@/store'

import { getMapConfig, getRecordOption } from '@/utils/screenUtil.ts'
import { ajaxRequest } from '@/utils'

import { getChart } from '@/network/map'

type STATUS = '1' | '2' | '3'

interface IItem {
	cover: string
	name: string

	[propName: string]: any
}

interface IInfo {
	status: STATUS
	offset: number
	limit: number
	count: number
}

const mapList = reactive<IItem[]>([])
const { screen } = useStore()
const mapPopoverRef = ref()
const mapInfo = reactive<IInfo>({
	status: '1',
	offset: 1,
	limit: 15,
	count: 0
})

const itemClick = (info: any) => {
	mapPopoverRef.value.hide()
	screen.addScreenOptionOfElements(
		getMapConfig({
			cover: info.cover,
			option: info.option,
			adcode: info.adcode
		})
	)

	screen.addOperationRecordItem(getRecordOption('add', 'map'))
}

const getData = async () => {
	if (mapList.length !== 0) {
		return
	}
	let res: any = await ajaxRequest(getChart, {
		offset: mapInfo.offset
	})
	mapInfo.status = '1'
	if (!res || !res.status || res.data.length == 0) {
		mapInfo.status = '3'
		return
	} else {
		mapInfo.status = '2'
	}
	if (res.status) {
		for (let item of res.data) {
			mapList.push(item)
		}
		mapInfo.count = res.count
		mapInfo.limit = res.limit
	}
}

const mapCurrentChange = (e: number) => {
	mapInfo.offset = e
	mapList.length = 0
	getData()
}
</script>
