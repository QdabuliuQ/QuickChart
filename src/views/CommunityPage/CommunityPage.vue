<template>
	<div class="community-page">
		<el-affix :offset="20">
			<div class="types">
				<div @click="typeToggle(0)" :class="[active === '0' ? 'active' : '', 'type-item']">
					<i class="iconfont i_all"></i>
					全部
				</div>
				<div
					@click="typeToggle(item)"
					v-for="item in list"
					:key="item.type + item.id"
					:class="[active === `${item.chartType}|${item.id}` ? 'active' : '', 'type-item']">
					<i :class="['iconfont', item.icon]"></i>
					{{ item.type }}
				</div>
			</div>
		</el-affix>
		<div class="info">
			<skeleton
				:status="status"
				:count="2"
				:loading-class="['el-avatar', 'nickname', 'time', 'content', 'chart']"
				:hidden-class="['mask', 'cover', 'operation']">
				<template v-slot:template="{ setSlotRef }">
					<eventItem
						:ref="(el: any) => setSlotRef(el)"
						:chart_id="'xxxxxxxxx'"
						:content="'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'"
						:cover="'xxxxxxxxx'"
						:event_id="'xxxxxxxxx'"
						:name="'xxxxxxxxx'"
						:nickname="'xxxxxxxxx'"
						:state="'xxxxxxxxx'"
						:user_id="'xxxxxxxxx'"
						:user_pic="'xxxxxxxxx'" />
				</template>
				<template v-slot:content>
					<eventItem
						v-for="(item, idx) in events"
						:key="item.event_id"
						:chart_id="item.chart_id"
						:content="item.content"
						:cover="item.cover"
						:event_id="item.event_id"
						:name="item.name"
						:nickname="item.nickname"
						:state="item.state"
						:time="item.time"
						:user_id="item.user_id"
						:user_pic="item.user_pic"
						v-model:comments="events[idx].comments"
						v-model:is_praise="events[idx].is_praise"
						v-model:praise_count="events[idx].praise_count"
						:comment_count="item.comment_count"
						:au_nickname="item.au_nickname"
						:au_user_pic="item.au_user_pic"
						:au_user_id="item.au_user_id"
						:type="item.type" />
					<el-pagination
						class="pagination-class"
						v-model:current-page="offset"
						background
						layout="prev, pager, next"
						:page-size="limit"
						:total="total"
						@current-change="changeEvent" />
				</template>
				<template v-slot:empty>
					<el-empty description="空空如也~~~" />
				</template>
			</skeleton>
		</div>
		<el-affix :offset="20">
			<div class="user">
				<div v-if="info" class="login">
					<div class="detail">
						<el-avatar :size="50" :src="info.user_pic" />
						<span class="nickname">{{ info.nickname }}</span>
					</div>
					<div class="data">
						<div class="data-item">
							<div class="cnt">0</div>
							<div class="desc">图表</div>
						</div>
						<div class="data-item">
							<div class="cnt">0</div>
							<div class="desc">关注</div>
						</div>
						<div class="data-item">
							<div class="cnt">0</div>
							<div class="desc">关注着</div>
						</div>
					</div>
				</div>
				<div v-else @click="toLogin" class="unlogin">
					<div class="detail">
						<i class="iconfont i_login"></i>
						<span class="nickname">请先登录账号</span>
					</div>
				</div>
			</div>
		</el-affix>
	</div>
</template>
<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue'

import eventItem from '@/components/eventItem.vue'
import skeleton from '@/components/skeleton.vue'

import { useCheckState } from '@/hooks/useCheckState'
import usePagination from '@/hooks/usePagination'
import useProxy from '@/hooks/useProxy'

import { ajaxRequest, getInfo } from '@/utils'

import { getChartType, getEvents } from '@/network/event'
import { EventInt } from '@/types/common'

const active = ref<string>('0')
const status = ref<'1' | '2' | '3'>('1')
const events = reactive<EventInt[]>([])
const info = reactive<any>(getInfo())
const proxy = useProxy()

const list = reactive<any>([])

onBeforeMount(async () => {
	const res: any = await getChartType()
	list.push(...res)
})

const typeToggle = (info: any) => {
	offset.value = 1
	if (!info) {
		active.value = '0'
	} else {
		active.value = `${info.chartType}|${info.id}`
	}
	getData()
}

const getData = async () => {
	status.value = '1'
	window.scrollTo(0, 0)
	const data = await ajaxRequest(getEvents, {
		limit: limit.value,
		offset: offset.value,
		type: active.value === '0' ? '0' : active.value.split('|')[0],
		d_type: active.value === '0' ? '0' : active.value.split('|')[1]
	})
	if (!data.status || data.data.length === 0) {
		status.value = '3'
	} else {
		status.value = '2'
	}
	limit.value = data.limit
	total.value = data.count
	events.length = 0
	for (let item of data.data) {
		item.comments = []
		events.push(item)
	}
}
let [limit, total, offset, changeEvent]: any = usePagination(getData, 10)
getData()

const toLogin = () => {
	let { check } = useCheckState() as any
	if (check) check(proxy)
}
</script>
<style lang="less">
.community-page {
	display: flex;
	margin: 30px 0;
	.types {
		padding: 10px 0;
		background-color: #353535;
		border-radius: 10px;
		box-shadow: 0 0 9px 0 #0d0d0d;

		.type-item {
			cursor: pointer;
			transition: 0.2s all linear;
			font-size: 14px;
			padding: 12px 20px;
			width: 130px;

			i {
				margin-right: 15px;
			}

			&:hover {
				background-color: rgb(255 174 52 / 29%);
			}
		}

		.active {
			color: #fff;
			background-color: @theme !important;
		}
	}

	.user {
		width: 250px;
		background-color: #353535;
		border-radius: 10px;

		.login {
			padding: 0 20px;

			.detail {
				display: flex;
				align-items: center;
				padding: 25px 0;

				.nickname {
					.overflow();

					width: 150px;
					margin-left: 10px;
				}
			}

			.data {
				display: flex;
				align-items: center;
				padding: 10px 0 30px;
				box-sizing: border-box;
				border-top: 1px solid #606060;

				.data-item {
					flex: 1;

					.desc {
						margin-top: 5px;
						font-size: 13px;
						color: #ccc;
					}
				}
			}
		}

		.unlogin {
			padding: 25px 20px;

			.detail {
				display: flex;
				align-items: center;
				font-size: 15px;
				cursor: pointer;

				.iconfont {
					margin-right: 10px;
					font-size: 45px;
				}
			}
		}
	}

	.info {
		padding: 20px;
		margin-right: 20px;
		margin-left: 20px;
		//width: calc(100% - 180px - 260px);
		background-color: #353535;
		border-radius: 10px;
		flex: 1;

		.container {
			max-width: 100%;
		}
	}
}
</style>
