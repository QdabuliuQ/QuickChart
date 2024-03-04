<template>
	<loading v-if="props.loading" text="加载图表中..." />
	<div v-else class="chartDetail">
		<div class="chart-container">
			<div class="scroll-container">
				<el-button v-if="props.back" @click="router.go(-1)" class="back-btn" type="info">
					<i class="iconfont i_exit"></i>
					返回
				</el-button>
				<ope-buttons
					:save-as="true"
					@save-as-event="visible = true"
					:save="props.update"
					@save-event="toUpdate"
					:share="props.share"
					@share-event="shareVisible = true"
					:praise="route.name !== 'type'"
					v-model:isPraise="is_praise"
					v-model:praiseCount="praise_count"
					:praise-event="praiseEvent"
					:comment="route.name !== 'type'"
					:commentCount="props.comment_count"
					@comment-event="show = true" />
				<chart-dom ref="chartDomRef" :key="key" />
			</div>
		</div>
	</div>
	<comment-drawer
		v-if="props.infoPanel"
		v-model:drawer="show"
		:chart_id="props.chart_id"
		:post-comment="_postComment"
		:delete-comment="_deleteComment"
		:praise-comment="_praiseComment"
		:get-data="_getComment" />
	<share-chart-dialog v-model:visible="shareVisible" @share-event="shareEvent" />
	<save-chart-dialog v-model:visible="visible" @save-chart="saveChart" />
</template>
<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ChartDom from '@/components/chartDom.vue'
import CommentDrawer from '@/components/commentDrawer.vue'
import InfoPanel from '@/components/infoPanel.vue'
import Loading from '@/components/loading.vue'
import OpeButtons from '@/components/opeButtons.vue'
import SaveChartDialog from '@/components/saveChartDialog.vue'
import ShareChartDialog from '@/components/shareChartDialog.vue'

import useProxy from '@/hooks/useProxy'

import useStore from '@/store'

import {
	deleteComment,
	getComment,
	postChart,
	postComment,
	postPraise,
	postPraiseComment,
	putChart
} from '@/network/chart'
import { postEvent } from '@/network/event'
import { ElLoading } from 'element-plus'

const router = useRouter()
const route = useRoute()
const props = withDefaults(
	defineProps<{
		type: string
		detailType: string
		loading: boolean
		comment_count?: number
		is_praise?: number
		praise_count?: number
		back?: boolean
		update?: boolean
		share?: boolean
		chart_id?: string
		infoPanel?: boolean
		getData?: () => any
	}>(),
	{
		type: '',
		detailType: '',
		loading: true,
		comment_count: 0,
		is_praise: 0,
		praise_count: 0,
		back: false,
		update: false,
		share: false,
		chart_id: '',
		infoPanel: false,
		getData: () => {}
	}
)
const { chart }: any = useStore()
const proxy = useProxy()
const is_praise = ref<number>(props.is_praise)
const praise_count = ref<number>(props.praise_count)
const visible = ref<boolean>(false)
const shareVisible = ref<boolean>(false)
const key = ref<number>(0)
const show = ref<boolean>(false)
const chartDomRef = ref()

let save_loading: any = null

const praiseEvent = (is_praise: string): Promise<boolean> => {
	return new Promise(async (resolve, reject) => {
		let data = await postPraise({
			chart_id: props.chart_id,
			state: is_praise
		})
		if (data.status) resolve(true)
		reject(false)
	})
}

const saveChart = async (name: string) => {
	save_loading = ElLoading.service({
		lock: true,
		text: '加载中',
		background: 'rgba(0, 0, 0, 0.7)'
	})

	postChart({
		name,
		option: JSON.stringify(chart.getOption),
		type: props.detailType
	})
		.then((data: any) => {
			if (!data.status) {
				throw new Error()
			}
			proxy.$notice({
				type: 'success',
				message: data.msg,
				position: 'top-left'
			})
		})
		.catch(() => {
			proxy.$notice({
				type: 'error',
				message: '保存图片失败',
				position: 'top-left'
			})
		})
		.finally(() => {
			save_loading.close()
			visible.value = false
		})
}

const toUpdate = async () => {
	save_loading = ElLoading.service({
		lock: true,
		text: '加载中',
		background: 'rgba(0, 0, 0, 0.7)'
	})
	putChart({
		chart_id: props.chart_id,
		option: JSON.stringify(chart.getOption)
	})
		.then((data: any) => {
			if (!data.status) {
				throw new Error()
			} else {
				proxy.$notice({
					type: 'success',
					message: data.msg,
					position: 'top-left'
				})
			}
		})
		.catch(() => {
			proxy.$notice({
				type: 'error',
				message: '生成图片失败',
				position: 'top-left'
			})
		})
		.finally(() => {
			save_loading.close()
		})
}

const shareEvent = async (content: string) => {
	const data: any = await postEvent({
		chart_id: props.chart_id,
		content,
		type: 'chart',
		d_type: parseInt(props.type).toString()
	})
	shareVisible.value = false
	if (data.status !== 1)
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
}

const _postComment = async (data: { chart_id: string; content: string }) => {
	return await postComment(data)
}
const _deleteComment = async (data: { comment_id: string }) => {
	return await deleteComment(data)
}
const _getComment = async (e: number) => {
	return await getComment({
		offset: e,
		chart_id: props.chart_id
	})
}
const _praiseComment = async (info: any) => {
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
.chartDetail {
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

			.back-btn {
				position: absolute;
				top: 8px;
				left: 8px;

				.iconfont {
					margin-right: 5px;
					font-size: 14px;
				}
			}

			.scroll-container();
		}
	}
}
</style>
