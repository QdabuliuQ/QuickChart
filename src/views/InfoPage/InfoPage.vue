<template>
	<div class="info-page">
		<el-affix :offset="20">
			<div class="left-menu">
				<el-menu active-text-color="#ffae34" :default-active="active">
					<el-menu-item @click="toggle('detail')" index="detail">
						<i class="iconfont i_login"></i>
						<span>账号管理</span>
					</el-menu-item>
					<el-menu-item @click="toggle('event')" index="event">
						<i class="iconfont i_event"></i>
						<span>我的动态</span>
					</el-menu-item>
					<el-menu-item @click="toggle('chart')" index="chart">
						<i class="iconfont i_chart"></i>
						<span>我的图表</span>
					</el-menu-item>
				</el-menu>
			</div>
		</el-affix>
		<div class="right-container">
			<router-view />
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useProxy from '@/hooks/useProxy'
import { ElScrollbar } from 'element-plus'

let height = ref(0)
const proxy = useProxy()
const route = useRoute()
const router = useRouter()
let active = ref('detail')

const computedHeight = () => {
	return (
		document.documentElement.clientHeight -
		(document.querySelector('.header') as HTMLDivElement).offsetHeight -
		2 -
		60
	)
}

proxy.$Bus.emit(() => {
	height.value = computedHeight()
})

const toggle = (path: string) => {
	router.push('/index/info/' + path)
}

onMounted(() => {
	height.value = computedHeight()
	active.value = route.path.substring(route.path.lastIndexOf('/') + 1)
})
</script>

<style lang="less">
.info-page {
	display: flex;
	align-items: flex-start;
	margin-top: 20px;
	.left-menu {
		z-index: 1;
		padding: 30px 0;
		background-color: #353535;
		border-radius: 15px;
		box-shadow: 0 0 9px 0 #0d0d0d;
		box-sizing: border-box;
		.el-menu {
			width: 180px;
			border-right: 0;
		}
		.el-menu-item {
			padding-left: 40px !important;
			.iconfont {
				margin-right: 14px;
				font-size: 18px;
			}
			&:hover {
				background-color: rgb(255 174 52 / 29%);
			}
		}
		.is-active {
			color: #fff;
			background-color: @theme !important;
		}
	}
	.right-container {
		min-height: 80vh;
		padding: 30px;
		margin: 0 0 20px 20px;
		background-color: #353535;
		border-radius: 15px;
		flex: 1;
		box-sizing: border-box;
		.page-title {
			position: relative;
			margin-bottom: 20px;
			font-size: 17px;
			color: @theme;
			font-weight: bold;
			&:not(:first-child) {
				margin-top: 40px;
			}
			&::after {
				position: absolute;
				bottom: -5px;
				left: 0;
				width: 40px;
				height: 2px;
				background-color: @theme;
				border-radius: 2px;
				content: '';
			}
		}
	}
}
</style>
