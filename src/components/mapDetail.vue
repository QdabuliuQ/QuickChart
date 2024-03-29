<template>
	<loading v-if="props.loading" text="加载图表中..." />
	<div v-else class="map-detail">
		<div class="chart-container">
			<div class="scroll-container">
				<circle-button
					v-if="props.back"
					style="position: absolute; top: 10px; left: 10px"
					icon="i_back"
					title="返回"
					@clickEvent="router.go(-1)" />
				<ope-buttons
					:save-as="true"
					@save-as-event="visible = true"
					:save="props.update"
					@save-event="toUpdate"
					:share="props.share"
					@share-event="show"
					:praise="route.name !== 'mapType'"
					v-model:isPraise="is_praise"
					v-model:praiseCount="praise_count"
					:praise-event="praiseEvent"
					:comment="route.name !== 'mapType'"
					:commentCount="props.comment_count"
					@comment-event="showDrawer = true" />
				<map-dom ref="chartDomRef" />
			</div>
		</div>
		<comment-drawer
			v-model:drawer="showDrawer"
			:chart_id="props.map_id as string"
			:delete-comment="_deleteComment"
			:praise-comment="_praiseComment"
			:get-data="_getComment"
			:post-comment="_postComment" />
		<save-chart-dialog v-model:visible="visible" @save-chart="saveChart" />
		<share-chart-dialog v-model:visible="shareVisible" @share-event="shareEvent" />
	</div>
</template>

<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import CircleButton from '@/components/circleButton.vue'
import CommentDrawer from '@/components/commentDrawer.vue'
import Loading from '@/components/loading.vue'
import MapDom from '@/components/mapDom.vue'
import OpeButtons from '@/components/opeButtons.vue'
import SaveChartDialog from '@/components/saveChartDialog.vue'
import ShareChartDialog from '@/components/shareChartDialog.vue'

import useProxy from '@/hooks/useProxy'

import useStore from '@/store'

import { base64ToFile, setImageOption } from '@/utils'

import { postEvent } from '@/network/event'
import {
	deleteComment,
	getComment,
	postChart,
	postComment,
	postPraise,
	postPraiseComment,
	putChart
} from '@/network/map'
import { ElLoading } from 'element-plus'

const proxy = useProxy()
const props = withDefaults(
	defineProps<{
		loading: boolean
		adcode: string
		detailType: string
		type: string
		back?: boolean
		update?: boolean
		share?: boolean
		map_id?: string
		is_praise?: number
		praise_count?: number
		comment_count?: number
	}>(),
	{
		loading: true,
		adcode: '',
		is_praise: 0,
		praise_count: 0,
		comment_count: 0
	}
)

const router = useRouter()
const route = useRoute()
const { chart }: any = useStore()
const chartDomRef = ref()
const shareVisible = ref<boolean>(false)
const showDrawer = ref<boolean>(false)
const visible = ref<boolean>(false)
const is_praise = ref<number>(props.is_praise)
const praise_count = ref<number>(props.praise_count)
let save_loading = null

const show = () => {
	shareVisible.value = true
}

const saveChart = async (name: string) => {
	save_loading = ElLoading.service({
		lock: true,
		text: '加载中',
		background: 'rgba(0, 0, 0, 0.7)'
	})
	const cover = base64ToFile(
		chartDomRef.value.chartInstance.getDataURL({
			pixelRatio: 1
		})
	)
	const formData = new FormData()
	formData.append('cover', cover)
	formData.append('name', name)
	formData.append('type', props.detailType)
	formData.append('option', setImageOption(chart.getOption))
	formData.append('adcode', props.adcode)
	let data: any = await postChart(formData)
	if (!data.status) {
		save_loading.close()
		return proxy.$notice({
			type: 'error',
			message: data.msg,
			position: 'top-left'
		})
	}
	proxy.$notice({
		type: 'success',
		message: data.msg,
		position: 'top-left'
	})
	save_loading.close()
	visible.value = false
}

const shareEvent = async (content: string) => {
	let data: any = await postEvent({
		chart_id: props.map_id as string,
		content,
		type: 'map',
		d_type: parseInt(props.type).toString()
	})
	shareVisible.value = false
	if (data.status === 1)
		proxy.$notice({
			type: 'success',
			message: data.msg,
			position: 'top-left'
		})
}

const praiseEvent = (is_praise: string): Promise<boolean> => {
	return new Promise(async (resolve, reject) => {
		let data = await postPraise({
			map_id: props.map_id as string,
			state: is_praise
		})
		if (data.status) resolve(true)
		reject(false)
	})
}

const toUpdate = async () => {
	save_loading = ElLoading.service({
		lock: true,
		text: '加载中',
		background: 'rgba(0, 0, 0, 0.7)'
	})
	const cover = base64ToFile(
		chartDomRef.value.chartInstance.getDataURL({
			pixelRatio: 1
		})
	)
	const formData = new FormData()
	formData.append('cover', cover)
	formData.append('map_id', props.map_id as string)
	formData.append('option', setImageOption(chart.getOption))
	let data: any = await putChart(formData)
	if (!data.status) {
		proxy.$notice({
			type: 'error',
			message: data.msg,
			position: 'top-left'
		})
	} else {
		proxy.$notice({
			type: 'success',
			message: data.msg,
			position: 'top-left'
		})
	}
	save_loading.close()
}

const _getComment = async (e: number) => {
	// 获取评论
	return await getComment({
		limit: 10,
		offset: e,
		map_id: props.map_id as string
	})
}
const _postComment = async (data: {
	// 发表评论
	chart_id: string
	content: string
}) => {
	// 发表评论
	return await postComment({
		map_id: data.chart_id,
		content: data.content
	})
}
const _deleteComment = async (data: {
	// 删除评论
	comment_id: string
}) => {
	return await deleteComment(data)
}
const _praiseComment = async (info: any) => {
	// 点赞评论
	return await postPraiseComment({
		comment_id: info.comment_id as string,
		type: info.is_praise == '1' ? '0' : '1'
	})
}

let stop1 = watch(
	() => props.is_praise,
	(newVal: number) => {
		is_praise.value = newVal
	}
)
let stop2 = watch(
	() => props.praise_count,
	(newVal: number) => {
		praise_count.value = newVal
	}
)

onUnmounted(() => {
	stop1()
	stop2()
})
</script>
<style lang="less">
.map-detail {
	width: 100%;
	height: 100%;
	.chart-container {
		height: 100%;
		.el-scrollbar .el-scrollbar__wrap .el-scrollbar__view {
			display: inline-block;
			white-space: nowrap;
		}

		.el-scrollbar__wrap {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.scroll-container {
			position: relative;
			overflow: auto;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			.scroll-container();
		}
	}
}
</style>
