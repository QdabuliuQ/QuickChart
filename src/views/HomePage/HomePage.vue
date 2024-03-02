<template>
	<div class="home-page">
		<div class="main-container">
			<div class="main-leftInfo">
				<div class="title1">
					<em>QuickChart 图表在线生成</em>
				</div>
				<div class="title2 info-item">
					基于
					<img class="vue" src="@/assets/image/vue.png" alt="" />
					<a href="https://cn.vuejs.org/">Vue3</a>
					&
					<img src="@/assets/image/echarts.png" alt="" />
					<a href="https://echarts.apache.org/zh/index.html">Echarts</a>
					实现的在线图表编辑工具
				</div>
				<div class="start info-item">
					<div
						@mouseenter="data.animate = true"
						@mouseleave="data.animate = false"
						class="start-btn"
						@click="router.push('/edit')">
						开始制作图表
						<i :class="[data.animate ? 'arrow-animation' : '', 'iconfont', 'i_right']"></i>
					</div>
				</div>
				<div class="tip">
					第一次使用
					<span>QucikChart</span>
					? 点击
					<span>查看文档</span>
				</div>
			</div>
			<div class="main-rightInfo">
				<img class="cover" src="@/assets/image/cover.svg" alt="" />
				<div class="cover-active-container">
					<img class="cover-active" src="@/assets/image/coverActive.svg" alt="" />
				</div>
			</div>
		</div>
		<el-divider content-position="left">
			<div class="divider-title">核心功能</div>
		</el-divider>
		<div class="function-container">
			<div class="function-itemList">
				<div v-for="(item, index) in data.functionList" :key="index" class="function-item">
					<div style="padding: 60px 30px">
						<div style="width: 160px; height: 160px; margin: 0 auto">
							<el-image style="width: 100%; height: 100%" :src="item.img" :fit="'contain'" />
						</div>
						<div class="function-item-title">
							{{ item.title }}
						</div>
						<div class="function-item-desc">
							{{ item.desc }}
						</div>
					</div>
				</div>
			</div>
		</div>
		<el-divider content-position="left">
			<div class="divider-title">使用步骤</div>
		</el-divider>
		<div class="processContainer">
			<el-carousel height="170px" direction="vertical" :autoplay="false">
				<el-carousel-item v-for="item in data.processList" :key="item.step">
					<div class="process-item">
						<div class="process-item-left">
							<div class="item-step-title">Step {{ item.step }}</div>
							<div class="item-title">{{ item.title }}</div>
							<div class="item-desc">{{ item.desc }}</div>
						</div>
						<div class="process-item-right">
							<img v-lazy :src="item.img" alt="" />
						</div>
					</div>
				</el-carousel-item>
			</el-carousel>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import step5 from '@/assets/image/category.png'
import step7 from '@/assets/image/data.png'
import step6 from '@/assets/image/detail.png'
import step8 from '@/assets/image/noLogin.png'
import step1 from '@/assets/image/process_category.png'
import step3 from '@/assets/image/process_data.png'
import step2 from '@/assets/image/process_detail.png'
import step4 from '@/assets/image/process_result.png'

const router = useRouter()
const data = reactive({
	animate: false,
	processList: [
		{
			step: 1,
			title: '选择图表',
			desc: '在左侧的图表列表提供了若干钟图表类型，您可以根据实际需求选择合适的图表进行配置',
			img: step1
		},
		{
			step: 2,
			title: '配置数据',
			desc: '可以在右侧的图表配置中找到数据编辑，按照规范编辑/导入EXCEL表格模板格式，EXCEL表格上方也提供了导入导出功能',
			img: step2
		},
		{
			step: 3,
			title: '配置图表',
			desc: '每一个图表都提供了不同的图表样式配置，根据实际需求对图表的各个部分的样式进行调整',
			img: step3
		},
		{
			step: 4,
			title: '导出数据/下载图表',
			desc: '当进行图表的配置完成后，可以在右侧的参数面板下载图表的PNG格式，和下载图表数据的EXCEL文件',
			img: step4
		}
	],
	functionList: [
		{
			title: '丰富的图表类型',
			desc: '提供了线性图，柱状图，饼状图，地图等多种类型',
			img: step5
		},
		{
			title: '强大的细节配置',
			desc: '将图表的不同配置进行划分，根据需求选择指定配置',
			img: step6
		},
		{
			title: '数据的导入导出',
			desc: '支持通过导入EXCEL文件批量生成数据，和导出EXCEL文件',
			img: step7
		},
		{
			title: '免登录即可使用',
			desc: '无需登录账号即可快速体验！',
			img: step8
		}
	]
})
</script>

<!--<script lang="ts">-->
<!--import { defineComponent, reactive, onMounted, toRefs } from 'vue'-->
<!--import { useRouter } from 'vue-router'-->
<!--import { InitData } from '@/types/HomePage/HomePage'-->

<!--export default defineComponent({-->
<!--	name: 'HomePage',-->
<!--	setup() {-->
<!--		const router = useRouter()-->
<!--		const data = reactive(new InitData())-->

<!--		const imgLoad = () => {}-->

<!--		onMounted(() => {})-->
<!--		return {-->
<!--			router,-->
<!--			imgLoad,-->
<!--			...toRefs(data)-->
<!--		}-->
<!--	}-->
<!--})-->
<!--</script>-->

<style lang="less">
.info-container {
	.info-item {
		.title {
			margin: 7px 0;
			font-weight: bold;
		}
		.itemContainer {
			display: flex;
			align-items: center;
		}
		.item {
			flex: 1;
			display: flex;
			align-items: center;
			&:hover {
				a {
					color: @theme !important;
				}
				img {
					transform: rotate(360deg);
				}
			}
			img {
				width: 30px;
				margin-right: 10px;
				transform-origin: 50% 50%;
				transition: 0.5s all linear;
			}
			a {
				color: #ccc;
				transition: 0.2s all linear;
			}
		}
	}
}
.home-page {
	.el-divider {
		margin: 24px 0 55px;
	}
	.el-divider__text {
		background-color: #282828;
	}
	.divider-title {
		font-size: 30px;
		font-weight: bold;
	}
	.main-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 50px 0;
		.main-leftInfo {
			.info-item {
				margin-top: 30px;
			}
			.title1 {
				font-size: 40px;
				font-weight: bold;
			}
			.title2 {
				display: flex;
				align-items: center;
				font-size: 20px;
				a {
					margin-right: 6px;
					color: #ccc;
					&:hover {
						color: @theme;
					}
				}
				img {
					position: relative;
					top: 0.5px;
					width: 20px;
					margin: 0 6px;
				}
				.vue {
					height: 24px;
				}
			}
			.start {
				display: flex;
				align-items: center;
				.start-btn {
					display: flex;
					align-items: center;
					padding: 13px 30px 15px;
					font-size: 16px;
					color: #fff;
					background-color: @theme;
					border-radius: 8px;
					cursor: pointer;
					.iconfont {
						position: relative;
						margin-left: 5px;
						font-size: 21px;
					}
					&:hover {
						background-color: @hover;
					}
					.arrow-animation {
						animation: arrow-animation 0.7s linear infinite;
					}

					@keyframes arrow-animation {
						0% {
							left: 0;
						}
						50% {
							left: 5px;
						}
						100% {
							left: 0;
						}
					}
				}
			}
			.tip {
				margin-top: 10px;
				font-size: 15px;
				color: #ccc;
				span {
					color: @theme;
					cursor: pointer;
				}
			}
		}
		.main-rightInfo {
			position: relative;
			margin-left: 20px;
			flex: 1;
			img {
				width: 100%;
			}
			.cover {
				position: relative;
				right: -10px;
			}
			.cover-active-container {
				position: absolute;
				top: -1.5px;
				right: -10px;
				overflow: hidden;
				width: 100%;
				height: 100%;
				clip-path: polygon(15% 0, 30% 0, 15% 100%, 0% 100%);
				animation: coverContainerAnimation 6s linear infinite;
			}
			.cover-active {
				position: absolute;
				z-index: 2;
				width: 100%;
				height: 100%;
			}

			@keyframes coverContainerAnimation {
				0% {
					clip-path: polygon(0% 0, 15% 0, 0% 100%, -15% 100%);
				}
				100% {
					clip-path: polygon(115% 0, 130% 0, 115% 100%, 100% 100%);
				}
			}
		}
	}
	.function-container {
		margin-bottom: 60px;
		.function-itemList {
			display: grid;
			margin: 30px 0;
			text-align: center;
			grid-template-columns: 1fr 1fr 1fr 1fr;
			grid-gap: 40px;
			.function-item {
				position: relative;
				top: 0;
				border-radius: 10px;
				box-shadow: 0 0 12px 1px rgb(131 131 131 / 40%);
				transition: 0.3s all linear;
				&:hover {
					top: -7px;
				}
			}
			.function-item-title {
				margin-top: 40px;
				font-size: 19px;
				font-weight: bold;
			}
			.function-item-desc {
				margin-top: 20px;
				font-weight: bold;
			}
		}
	}
	.processContainer {
		margin: 0 0 60px;
		.process-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.item-step-title {
				font-size: 20px;
				color: #939393;
			}
			.item-title {
				margin-top: 10px;
				font-size: 30px;
				color: @theme;
				font-weight: bold;
			}
			.item-desc {
				margin-top: 10px;
			}
			.process-item-left {
				flex: 1;
			}
			.process-item-right {
				img {
					width: 200px;
					margin-right: 30px;
				}
			}
		}
	}
}
</style>
