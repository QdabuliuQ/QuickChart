<template>
	<div class="chart-menu">
		<div class="itemContainer">
			<div ref="typeTitleRef" class="title">
				<i @click="router.push('/')" class="iconfont i_home"></i>
				插入图表
			</div>
			<el-scrollbar :height="height">
				<div class="item-list">
					<div class="item-box" v-for="item in list" :key="item.id">
						<div @click="item.show = !item.show" class="type-card">
							<i style="margin-right: 8px" :class="['iconfont', item.icon]"></i>
							{{ item.type }}
							<i
								style="color: rgb(127 127 127)"
								:class="['iconfont more', item.show ? 'rotate-icon' : '', 'i_hide']"></i>
						</div>
						<div v-show="item.show" class="list-container">
							<chart-item
								v-for="chart in item.charts"
								:key="chart.id"
								:cover="chart.cover"
								:id="chart.id"
								:name="chart.name"
								@click-event="clickEvent" />
						</div>
					</div>
				</div>
			</el-scrollbar>
		</div>
	</div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import useProxy from '@/hooks/useProxy'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { ListInt } from '@/utils/chartItem'
import chartItem from './chartItem.vue'

const router = useRouter()
const proxy = useProxy()
const props = defineProps<{
	itemlist: ListInt[]
	clickEvent: Function
}>()
const list = reactive<ListInt[]>(props.itemlist)
const height = ref<string>('')
const typeTitleRef = ref()

const resizeEvent = (e: number) => {
	height.value = e - typeTitleRef.value.offsetHeight - 5 + 'px'
}

const clickEvent = (id: string) => {
	props.clickEvent(id)
}

proxy.$Bus.on('resize', resizeEvent)

onMounted(() => {
	height.value = document.documentElement.clientHeight - typeTitleRef.value.offsetHeight - 5 + 'px'
})

onUnmounted(() => {
	proxy.$Bus.off('resize', resizeEvent)
})
</script>
<style lang="less">
.chart-menu {
	width: 250px;
	height: 100%;
	background-color: @curColor;
	.title {
		position: relative;
		padding: 20px 10px 0;
		margin-bottom: 10px;
		font-size: 14px;
		text-align: center;
		font-weight: bold;
		.iconfont {
			position: absolute;
			bottom: 0;
			left: 10px;
			font-size: 20px;
			cursor: pointer;
		}
	}
	.item-list {
		padding-bottom: 15px;
		.item-box {
			.type-card {
				position: relative;
				display: flex;
				align-items: center;
				padding: 12px 15px;
				font-size: 13px;
				color: #e0e0e0;
				cursor: pointer;
				box-sizing: border-box;
				border-bottom: 1px solid #4c4c4c;
				.more {
					position: absolute;
					top: 50%;
					right: 5px;
					transform: translateY(-50%);
				}
				.rotate-icon {
					transform: translateY(-50%) rotateZ(90deg) !important;
				}
				i {
					margin-right: 5px;
					transition: 0.1s all linear;
				}
				&:hover {
					color: #fff;
					background: @theme;
				}
			}
			.list-container {
				display: grid;
				padding: 15px;
				grid-template-columns: 1fr 1fr;
				grid-gap: 8px;
				box-sizing: border-box;
				border-bottom: 1px solid #555;
			}
		}
	}
}
</style>
