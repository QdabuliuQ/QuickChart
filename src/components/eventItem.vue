<template>
	<div class="eventItem">
		<div class="userInfo">
			<el-avatar :size="45" :src="props.user_pic" />
			<div class="right">
				<span class="nickname">{{ props.nickname }}</span>
				<span class="time">
					{{ proxy.$moment(props.time).format('YYYY-MM-DD&nbsp;&nbsp;hh:mm:ss') }}
				</span>
			</div>
		</div>
		<div class="eventInfo">
			<div class="content" v-if="props.content">{{ props.content }}</div>
			<div @click="toDetail" class="chart">
				<div class="mask">
					<div class="chartInfo">
						<div class="edit">编辑</div>
						<div class="name">{{ props.name }}</div>
						<div class="author">
							<el-avatar :size="27" :src="props.au_user_pic" />
							<span>{{ props.au_nickname }}</span>
						</div>
					</div>
					<i :class="['iconfont', props.type === 'chart' ? 'i_bar' : 'i_map']"></i>
				</div>
				<img class="cover" :alt="props.name" :src="props.cover" />
			</div>
			<div class="operation">
				<div v-login="praiseEvent" :class="[props.is_praise ? 'active' : '', 'item']">
					<i class="iconfont i_praise"></i>
					{{ props.praise_count ? props.praise_count : '点赞' }}
				</div>
				<div class="item" @click="getComment">
					<i class="iconfont i_comment"></i>
					{{ props.comment_count ? props.comment_count : '评论' }}
				</div>
			</div>
			<div v-show="showComment" class="commentInfo">
				<CommentInput :send="send" />
				<skeleton
					:loading-class="['el-avatar', 'nickname', 'time', 'bottomContent', 'dataItem']"
					:status="status"
					:count="2">
					<template v-slot:template="{ setSlotRef }">
						<CommentItem
							style="margin-bottom: 15px"
							:comment_id="'null'"
							:id="'null'"
							:idx="1"
							:user_id="'null'"
							:user_pic="'null'"
							:self="1"
							:nickname="'xxxxxxxxxxxxx'"
							:time="123123123"
							:content="'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'" />
					</template>
					<template v-slot:content>
						<div v-if="commentList.length">
							<CommentItem
								v-for="(item, idx) in commentList"
								:key="item.comment_id"
								:comment_id="item.comment_id"
								:id="item.event_id"
								:idx="idx"
								:user_id="item.user_id"
								:user_pic="item.user_pic"
								:nickname="item.nickname"
								:time="item.time"
								:content="item.content"
								:self="item.self"
								:is_praise="item.is_praise as number"
								:praise_count="item.praise_count as number"
								@delete="deleteEvent"
								@praise="praiseCommentEvent" />
							<el-pagination
								@current-change="changeEvent"
								hide-on-single-page
								class="pagination-class"
								background
								layout="prev, pager, next"
								:page-size="limit"
								:current-page="offset"
								:total="total" />
						</div>
						<el-empty v-else description="暂无评论哦" />
					</template>
					<template v-slot:empty>
						<el-empty description="暂无评论哦" />
					</template>
				</skeleton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import CommentInput from '@/components/commentInput.vue'
import CommentItem from '@/components/commentItem.vue'
import Skeleton from '@/components/skeleton.vue'

import usePagination from '@/hooks/usePagination'
import useProxy from '@/hooks/useProxy'

import { ajaxRequest } from '@/utils'

import { deleteComment, postComment, postPraise, postPraiseComment } from '@/network/event'
import { getComment as getCommentData } from '@/network/event'
import { CommentInt } from '@/types/common'

interface EventInt {
	chart_id: string
	content: string
	cover: string
	event_id: string
	name: string
	nickname: string
	state: string
	time?: number
	user_id: string
	user_pic: string
	is_praise?: number
	praise_count?: number
	comment_count?: number
	au_nickname?: string
	au_user_pic?: string
	au_user_id?: string
	type?: string
	comments?: CommentInt[]
}

const router = useRouter()
const props = defineProps<EventInt>()
const emits = defineEmits(['update:is_praise', 'update:praise_count', 'update:comments'])
const proxy = useProxy()
const showComment = ref<boolean>(false)
const status = ref<'1' | '2' | '3'>('1')

const commentList = reactive<CommentInt[]>([])
const toDetail = () => {
	router.push((props.type === 'chart' ? `/chart/` : '/map/') + props.chart_id)
}

/**
 * 获取评论数据
 */
const getData = async () => {
	status.value = '1'
	let data: any = await ajaxRequest(getCommentData, {
		event_id: props.event_id,
		offset: offset.value
	})
	if (!data.status || data.data.length === 0) {
		status.value = '3'
	} else {
		status.value = '2'
	}
	commentList.length = 0
	commentList.push(...data.data)
	total.value = data.count
	limit.value = data.limit
}
let [limit, total, offset, changeEvent]: any = usePagination(getData)

const praiseCommentEvent = async (info: any) => {
	let data: any = await postPraiseComment({
		comment_id: info.comment_id,
		type: info.is_praise == '1' ? '0' : '1'
	})
	let type = info.is_praise == '1' ? '0' : '1'
	if (data.status) {
		if (type === '1') {
			commentList![info.idx].is_praise = 1
			;(commentList![info.idx].praise_count as number)++
		} else {
			commentList![info.idx].is_praise = 0
			;(commentList![info.idx].praise_count as number)--
		}
	}
}

/**
 * 点赞动态
 * @return void
 */
const praiseEvent = async () => {
	const type = (props.is_praise === 1 ? 0 : 1).toString()
	const data: any = await postPraise({
		event_id: props.event_id,
		type
	})
	if (data.status === 0)
		return proxy.$notice({
			type: 'error',
			message: data.msg,
			position: 'top-left'
		})
	if (data.status === -2) return proxy.$Bus.emit('showLoginDialog')

	emits('update:is_praise', type == '1' ? 1 : 0)
	emits('update:praise_count', type === '1' ? props.praise_count + 1 : props.praise_count - 1)
}

/**
 * 打开评论面板
 * @return void
 */
const getComment = () => {
	showComment.value = !showComment.value
	if (showComment.value) {
		offset.value = 1
		getData()
	}
}

/**
 * 发送评论
 * @param comment 评论消息
 * @return Promise<boolean> 返回Promise
 */
const send = (comment: string): Promise<boolean> => {
	return new Promise(async (resolve, reject) => {
		const data: any = await postComment({
			content: comment,
			event_id: props.event_id
		})
		if (data.status) {
			commentList.unshift(data.data)
			status.value = '2'
			resolve(true)
		} else reject(false)
	})
}

const deleteEvent = async (info: any) => {
	const data: any = await deleteComment({
		comment_id: info.comment_id
	})
	if (data.status) {
		proxy.$notice({
			type: 'success',
			message: data.msg,
			position: 'top-left'
		})
		commentList.splice(info.idx, 1)
	} else {
		proxy.$notice({
			type: 'error',
			message: data.msg,
			position: 'top-left'
		})
	}
}
</script>

<style lang="less">
.eventItem {
	width: 100%;
	&:not(:last-child) {
		margin-bottom: 20px;
	}
	.userInfo {
		display: flex;
		align-items: center;
		margin-bottom: 5px;
		.el-avatar {
			margin-right: 10px;
		}
		.right {
			display: flex;
			flex-direction: column;
			.time {
				margin-top: 4px;
				font-size: 13px;
				color: #929292;
			}
		}
	}
	.eventInfo {
		margin-left: 55px;
		.commentInfo {
			padding: 15px 0;
			border-bottom: 1px solid #525252;
		}
		.content {
			width: 100%;
			margin-bottom: 15px;
			font-size: 17px;
			word-break: break-all;
			line-height: 25px;
		}
		.chart {
			position: relative;
			overflow: hidden;
			width: 300px;
			margin-bottom: 15px;
			border-radius: 10px;
			aspect-ratio: 2/1.4;
			cursor: pointer;
			.mask {
				position: absolute;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 100%;
				background-color: #00000078;
				.iconfont {
					position: absolute;
					bottom: 10px;
					left: 10px;
					font-size: 25px;
				}
				.chartInfo {
					display: flex;
					align-items: center;
					flex-direction: column;
					.edit {
						padding: 6px 14px 7px;
						margin-bottom: 10px;
						font-size: 12px;
						color: #fff;
						background-color: #00000087;
						border-radius: 15px;
						.flex();
					}
					.name {
						overflow: hidden;
						max-width: 180px;
						font-size: 15px;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.author {
						display: flex;
						align-items: center;
						margin-top: 5px;
						span {
							margin-left: 5px;
							font-size: 14px;
						}
					}
				}
			}
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
		.operation {
			display: flex;
			align-items: center;
			padding-bottom: 15px;
			border-bottom: 1px solid #525252;
			.item {
				display: flex;
				align-items: center;
				flex: 1;
				font-size: 14px;
				cursor: pointer;
				.iconfont {
					margin-right: 7px;
					font-size: 15px;
				}
				&:hover {
					color: @theme;
				}
			}
			.active {
				color: @theme;
			}
		}
	}
}
</style>
