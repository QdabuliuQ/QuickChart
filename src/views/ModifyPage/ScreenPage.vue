<template>
	<div v-if="status === 1" class="screen-page">
		<function-list v-if="option" :save="authorId === curId" ref="functionListRef"></function-list>
		<div style="position: relative" v-if="option">
			<screen-canvas :width="width + 'px'" :height="height + 'px'" />
			<ope-buttons
				:shape="true"
				v-model:praise-count="praise_count"
				v-model:is-praise="is_praise"
				:comment="true"
				:praise-event="praiseEvent"
				:praise="true"
				:comment-count="comment_count"
				@share-event="visible = true"
				@comment-event="showDrawer = true" />
		</div>
		<config-item v-if="option" ref="configItemRef" />
	</div>
	<div v-else-if="status === 0" class="empty-container">
		<empty-tip />
	</div>
	<share-chart-dialog v-model:visible="visible" @share-event="shareEvent" />
	<comment-drawer
		v-model:drawer="showDrawer"
		:chart_id="screen_id as string"
		:praise-comment="_praiseComment"
		:get-data="_getComment"
		:delete-comment="_deleteComment"
		:post-comment="_postComment" />
</template>
<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import CommentDrawer from '@/components/commentDrawer.vue'
import EmptyTip from '@/components/emptyTip.vue'
import ShareChartDialog from '@/components/shareChartDialog.vue'
import OpeButtons from '@/views/ModifyPage/components/opeButtons.vue'
import ConfigItem from '@/views/ScreenPage/components/configItem.vue'
import FunctionList from '@/views/ScreenPage/components/functionList.vue'
import ScreenCanvas from '@/views/ScreenPage/components/screenCanvas.vue'

import useProxy from '@/hooks/useProxy.ts'

import useStore from '@/store'

import { parse } from '@/utils/toJSON.ts'

import { postEvent } from '@/network/event.ts'
import {
	deleteComment,
	getComment,
	getDetail,
	getScreen,
	postComment,
	postCommentPraise,
	postPraise
} from '@/network/screen.ts'

const showDrawer = ref<boolean>(false)
const width = ref<number>(0)
const height = ref<number>(0)
const functionListRef = ref<HTMLElement>()
const configItemRef = ref<HTMLElement>()
const { screen } = useStore()
const option = ref<any>(null)
const status = ref<number>(-1)
const visible = ref<boolean>(false)

const route = useRoute()
const screen_id = route.params.id as string
const authorId = ref<string>('')
const curId = ref<string>(localStorage.getItem('id') as string)

const getWidth = () => {
	return (
		document.getElementsByClassName('screen-page')[0].clientWidth -
		(functionListRef.value as any).$el.clientWidth -
		(configItemRef.value as any).$el.clientWidth
	)
}

const is_praise = ref<number>(0)
const praise_count = ref<number>(0)
const comment_count = ref<number>(0)
const getData = async () => {
	const res: any = await getDetail({
		screen_id
	})
	if (res.status) {
		is_praise.value = res.data.is_praise
		praise_count.value = res.data.praise_count
		comment_count.value = res.data.comment_count
	}
}
getData()

const shareEvent = async (content: string) => {
	const res: any = await postEvent({
		chart_id: screen_id,
		content,
		type: 'screen',
		d_type: '1'
	})
	if (res.status) {
		proxy.$notice({
			type: 'success',
			message: res.msg,
			position: 'top-left'
		})
		visible.value = false
	}
}

onMounted(async () => {
	const res: any = await getScreen({
		screen_id
	})
	status.value = res.status
	if (res.status === 1) {
		res.data.option = parse(res.data.option)
		screen.initScreenOption(res.data.option)
		option.value = res.data.option
	}
	authorId.value = res.data.user_id
	nextTick(() => {
		width.value = getWidth()
		height.value = document.documentElement.clientHeight
	})
})

const proxy = useProxy()

const praiseEvent = (type: 0 | 1) => {
	return new Promise(async (resolve) => {
		const res: any = await postPraise({
			screen_id,
			type
		})
		if (res.status) {
			resolve(true)
			proxy.$notice({
				message: res.msg,
				position: 'top-left',
				type: 'success'
			})
		}
	})
}

const _praiseComment = async (info: any) => {
	// 点赞评论
	return await postCommentPraise({
		comment_id: info.comment_id as string,
		type: info.is_praise == '1' ? '0' : '1'
	})
}
const _postComment = async (data: { chart_id: string; content: string }) => {
	return await postComment({
		screen_id: data.chart_id,
		content: data.content
	})
}
const _getComment = async (e: number) => {
	return await getComment({
		offset: e,
		screen_id,
		limit: 15
	})
}
const _deleteComment = async (data: { comment_id: string }) => {
	return await deleteComment(data)
}
</script>
<style lang="less">
.screen-page {
	display: flex;
	justify-content: space-between;
	height: 100vh;
	.el-color-picker {
		width: 100%;
		.el-color-picker__trigger {
			width: 100%;
			height: 25px;
		}
	}
}
.empty-container {
	width: 100vw;
	height: 100vh;
}
</style>
