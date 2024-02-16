<template>
	<div class="chart-params">
		<loading v-if="props.loading" :bgc="'rgb(66, 66, 66)'" text="" />
		<el-scrollbar v-else>
			<div>
				<div class="chart-cover">
					<img
						:src="
							props.image.indexOf('data:image') != -1
								? props.image
								: props.image + '?tempid=' + Math.random()
						"
						alt="" />
				</div>
				<div class="btn-list">
					<el-dropdown trigger="click">
						<el-button type="success">
							<template #icon>
								<i style="margin-right: 4px; font-size: 15px" class="iconfont i_code"></i>
							</template>
							配置
						</el-button>
						<template #dropdown>
							<el-dropdown-menu class="config-drop-down-class">
								<el-dropdown-item @click="createCode('echart')">
									<i class="iconfont i_object"></i>
									Echarts配置
								</el-dropdown-item>
								<el-dropdown-item @click="createCode('js')">
									<i class="iconfont i_js"></i>
									JS完整配置
								</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
					<el-dropdown trigger="click">
						<el-button class="download-btn" color="#626aef">
							<template #icon>
								<i style="margin-right: 4px; font-size: 14px" class="iconfont i_download"></i>
							</template>
							下载
						</el-button>
						<template #dropdown>
							<el-dropdown-menu class="config-drop-down-class">
								<el-dropdown-item @click="downloadChart('html')">
									<i class="iconfont i_html"></i>
									HTML文件
								</el-dropdown-item>
								<el-dropdown-item @click="downloadChart('png')">
									<i class="iconfont i_png"></i>
									PNG图片
								</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</div>
				<div :key="key" class="collapse-container">
					<div v-for="item in options" :key="item.opName" class="collapse-item">
						<div
							v-if="item.menuOption"
							@click="toggleItem(item.opName, item.componentPath)"
							:class="[
								activeIndex == item.opName ? 'active-collapse-title' : '',
								'collapse-title'
							]">
							<div class="left-content">
								<i
									style="margin-right: 5px"
									:class="[
										'iconfont',
										activeIndex == item.opName && icon_loading
											? 'i_loading loading-animation'
											: item.icon
									]"></i>
								{{ item.name }}
							</div>
							<div class="right-icon">
								<i
									:class="[
										activeIndex == item.opName ? 'rotate-icon' : '',
										'iconfont',
										'i_hide'
									]"></i>
							</div>
						</div>
						<div v-show="activeIndex == item.opName" class="collapse-content">
							<component
								class="params-panel"
								:is="componentsMap.get(item.componentPath)"></component>
						</div>
					</div>
				</div>
			</div>
		</el-scrollbar>
	</div>
</template>
<script setup lang="ts">
import { markRaw, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import Loading from '@/components/loading.vue'

import useProxy from '@/hooks/useProxy'

import useStore from '@/store'

const props = defineProps<{
	image: string
	loading: boolean
}>()
const routeName = useRoute().name
const module =
	routeName === 'mapType' || routeName === 'modifyMap'
		? {
				...import.meta.glob('../views/ChartPanel/components/**/*.vue'),
				...import.meta.glob('../views/MapPanel/components/**/*.vue')
			}
		: {
				...import.meta.glob('../views/ChartPanel/components/**/*.vue')
			}
const { chart }: any = useStore()
const proxy = useProxy()
const height = ref<string>('0px')
const activeIndex = ref<string>()
const componentsMap = reactive(new Map<string, any>())
const icon_loading = ref<boolean>(false)
const options = reactive<Array<any>>([])
const key = ref<number>(0)
const initOptions = () => {
	options.push(...chart.getChartConfig)
}

const toggleItem = (e: string, p: string) => {
	if (e == activeIndex.value) {
		activeIndex.value = ''
	} else {
		activeIndex.value = e
		// 查看map中是否存在组件缓存
		if (!componentsMap.has(p)) {
			icon_loading.value = true
			setTimeout(async () => {
				componentsMap.set(p, markRaw(((await module[`../views${p}.vue`]()) as any).default))
				icon_loading.value = false
			}, 0)
		}
	}
}

const createCode = (type: string): void => {
	proxy.$Bus.emit('createCode', type)
}
const downloadChart = (type: string): void => {
	proxy.$Bus.emit('downloadChart', type)
}

const changeEvent = ({ cb }: { cb: () => void }) => {
	initOptions()
	cb()
}
proxy.$Bus.on('chartChange', changeEvent)
const resetEvent = () => {
	key.value += 1
	initOptions()
}
proxy.$Bus.on('resetChartData', resetEvent)
const resizeEvent = () => {
	let dom = document.getElementsByClassName('panelBtnList')[0]
	height.value =
		document.documentElement.clientHeight - (dom ? (dom as HTMLDivElement).offsetHeight : 0) + 'px'
}
proxy.$Bus.on('resize', resizeEvent)

let stop = watch(
	() => props.loading,
	() => {
		componentsMap.clear()
		options.length = 0
		initOptions()
	}
)

onMounted(() => {
	resizeEvent()
})
onUnmounted(() => {
	// 取消订阅
	proxy.$Bus.off('chartChange', changeEvent)
	proxy.$Bus.off('resetChartData', resetEvent)
	proxy.$Bus.off('resize', resizeEvent)
	stop()

	componentsMap.clear()
})
</script>
<style lang="less">
.config-drop-down-class {
	.el-dropdown-menu__item {
		font-size: 12px;
	}
}

.chart-params {
	height: 100%;
	background-color: @curColor;

	.chart-cover {
		overflow: hidden;
		width: 90%;
		margin: 10px auto;
		background-repeat: repeat;
		background-size: cover;
		border-radius: 8px;
		background-image: url('../assets/image/bg.jpg');

		img {
			width: 100%;
			vertical-align: middle;
		}
	}

	.btn-list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 12px;
		user-select: none;

		.el-button {
			padding: 6px 24px !important;
			font-size: 13px !important;

			span {
				position: relative;
				top: -0.5px;
			}
		}

		.download-btn:hover {
			background-color: #454bb0;
			border-color: #454bb0;
		}
	}

	.option-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 6px 0;
		font-size: 12px;
		color: #a9a8a8;

		.option-operation {
			display: flex;
			justify-content: flex-end;
			width: 55%;
		}
	}

	.collapse-container {
		margin: 10px 0;

		.collapse-item {
			.collapse-title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 12px 10px 14px 12px;
				font-size: 13px;
				transition: 0.1s all linear;
				cursor: pointer;
				border-bottom: 1px solid #565656;

				&:hover {
					color: #fff;
					background: @theme;
				}

				.left-content {
					display: flex;
					align-items: center;

					.iconfont {
						position: relative;
						top: 0.5px;
					}

					.i_loading {
						transform-origin: 50% 50%;
					}

					.loading-animation {
						animation: rotate-animation 1s linear infinite;
					}

					@keyframes rotate-animation {
						0% {
							transform: rotate(0);
						}
						100% {
							transform: rotate(360deg);
						}
					}
				}

				.right-icon {
					.iconfont {
						position: relative;
						top: 1px;
						display: block;
						font-size: 18px;
						transition: 0.1s all linear;
					}
				}
			}

			.active-collapse-title {
				color: #fff;
				background: @theme;
			}

			.rotate-icon {
				transform: rotateZ(90deg) !important;
			}
		}

		.collapse-content {
			.params-panel {
				padding: 5px 12px;
				box-sizing: border-box;
				border-bottom: 1px solid #565656;
			}

			.split-line {
				position: relative;
				display: flex;
				align-items: center;
				padding-bottom: 5px;
				margin: 8px 0 6px;
				font-size: 12px;
				color: @theme;
				font-weight: bold;

				&::after {
					position: absolute;
					bottom: 0;
					left: 0;
					width: 30%;
					height: 3px;
					background-color: @theme;
					opacity: 0.4;
					content: '';
				}
			}

			.unique-option-container {
				padding: 0 12px;
			}
		}
	}
}
</style>
