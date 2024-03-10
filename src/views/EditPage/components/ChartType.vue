<template>
	<div class="chart-type">
		<div class="types">
			<div @click="toggle('chart', 0)" :class="[type == 0 ? 'active' : '', 'type-item']">
				<i style="font-size: 20px" class="iconfont i_bar"></i>
				<span>图表</span>
			</div>
			<div @click="toggle('map', 1)" :class="[type == 1 ? 'active' : '', 'type-item']">
				<i class="iconfont i_map"></i>
				<span>地图</span>
			</div>
			<div @click="toggle('screen', 2)" :class="[type == 2 ? 'active' : '', 'type-item']">
				<i class="iconfont i_screen"></i>
				<span>大屏</span>
			</div>
		</div>
		<div class="menu">
			<el-popover
				v-if="JSON.stringify(info) !== '{}'"
				popper-class="menu-popover-class"
				placement="right-end"
				:hide-after="50">
				<template #reference>
					<div class="menu-item">
						<img :src="info.user_pic" />
					</div>
				</template>
				<menu-list />
			</el-popover>
			<div v-else class="menu-item">
				<i @click="toLogin" class="iconfont i_login"></i>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onUnmounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import menuList from '@/components/menuList.vue'

import { useCheckState } from '@/hooks/useCheckState'
import useProxy from '@/hooks/useProxy'

import { getInfo } from '@/utils'

const proxy = useProxy()
const router = useRouter()
const type = ref<number>(0)

const toggle = (e: string, t: number) => {
	router.replace('/edit/' + e)
	type.value = t
}

const toLogin = () => {
	;(useCheckState() as any).check(proxy)
}

type.value = router.currentRoute.value.meta.typeIndex as number
let info = reactive<{
	[propName: string]: any
}>({})
const initInfo = () => {
	let res = getInfo()
	if (res) {
		for (let key in res) {
			info[key] = res[key]
		}
	}
}
initInfo()

proxy.$Bus.on('logined', initInfo)

onUnmounted(() => {
	proxy.$Bus.off('logined', initInfo)
})
</script>

<style lang="less">
.chart-type {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 60px;
	min-width: 60px;
	height: 100%;
	padding: 30px 0;
	background-color: @navColor;
	box-sizing: border-box;
	flex-direction: column;
	.types {
		width: 100%;
	}
	.active {
		color: @theme;
		background-color: @curColor;
		i {
			color: @theme;
		}
	}

	.type-item {
		display: flex;
		align-items: center;
		padding: 12px 0;
		margin-bottom: 10px;
		font-size: 13px;
		flex-direction: column;
		cursor: pointer;

		&:hover {
			background-color: @curColor;
		}

		i {
			margin-bottom: 5px;
			font-size: 18px;
		}
	}
	.menu {
		.menu-item {
			.iconfont {
				font-size: 30px;
				cursor: pointer;
			}
			img {
				width: 30px;
				height: 30px;
				border-radius: 50%;
				cursor: pointer;
				object-fit: cover;
			}
		}
	}
}
</style>
