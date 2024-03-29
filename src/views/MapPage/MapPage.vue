<template>
	<div class="MapPage">
		<chart-menu :itemlist="list" :click-event="clickEvent" />
		<div class="chart-container">
			<router-view></router-view>
		</div>
	</div>
	<el-dialog
		v-model="visible"
		title="选择地区"
		width="45%"
		class="cityDialogClass"
		@close="closeEvent">
		<div class="cityContainer">
			<div class="leftProvince">
				<el-scrollbar height="300px">
					<div
						@click="provinceClick(idx)"
						v-for="(item, idx) in city"
						:key="item.code"
						:class="[pIdx === idx ? 'active' : '', 'provinceItem']">
						{{ item.name }}
					</div>
				</el-scrollbar>
			</div>
			<div class="centerCity">
				<el-scrollbar height="300px">
					<template v-if="city[pIdx] && city[pIdx].children">
						<div
							@click="cityClick(idx)"
							v-for="(item, idx) in city[pIdx].children"
							:key="item.code"
							:class="[cIdx === idx ? 'active' : '', 'provinceItem']">
							{{ item.name }}
						</div>
					</template>
					<div v-else class="empty">暂无数据</div>
				</el-scrollbar>
			</div>
			<div class="rightArea">
				<el-scrollbar height="300px">
					<template
						v-if="
							city[pIdx] &&
							city[pIdx].children &&
							(city[pIdx].children as any)[cIdx] &&
							(city[pIdx].children as any)[cIdx].children
						">
						<div
							@click="areaClick(idx as number)"
							v-for="(item, idx) in (city[pIdx] as any).children[cIdx].children"
							:key="item.code"
							:class="[aIdx === idx ? 'active' : '', 'cityItem']">
							{{ item.name }}
						</div>
					</template>
					<div v-else class="empty">暂无数据</div>
				</el-scrollbar>
			</div>
		</div>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="visible = false">取消</el-button>
				<el-button type="primary" @click="confirmEvent">确认</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import chartMenu from '@/components/chartMenu.vue'

import { getCityData, getMapTemplateList } from '@/network/map'

const list = reactive<any>([])

onBeforeMount(async () => {
	const res: any = await getMapTemplateList()
	for (let item of res) {
		item.show = false
		list.push(item)
	}
})

interface CityInt {
	code: string
	name: string
	children?: {
		code: string
		name: string
		children?: any
	}[]
}

const visible = ref<boolean>(false)
const city = ref<CityInt[]>([])
const pIdx = ref<number>(-1)
const cIdx = ref<number>(-1)
const aIdx = ref<number>(-1)

const mapId = ref<string>('')
const router = useRouter()

const getData = async () => {
	if (localStorage.getItem('city')) {
		city.value = JSON.parse(localStorage.getItem('city') as string)
	} else {
		let data = await getCityData()
		city.value = data.data
		localStorage.setItem('city', JSON.stringify(data.data))
	}
}
getData()

const provinceClick = (idx: number) => {
	if (idx !== pIdx.value) {
		pIdx.value = idx
	}
	cIdx.value = -1
	aIdx.value = -1
}
const cityClick = (idx: number) => {
	if (idx === cIdx.value) {
		cIdx.value = -1
	} else {
		cIdx.value = idx
		aIdx.value = -1
	}
}
const areaClick = (idx: number) => {
	if (idx === aIdx.value) aIdx.value = -1
	else aIdx.value = idx
}

const clickEvent = (id: string) => {
	let curId = router.currentRoute.value.params.id
	if (curId != id && router.currentRoute.value.name == 'mapType') {
		visible.value = true
	} else if (curId != id) {
		visible.value = true
	}
	mapId.value = id
}

const confirmEvent = () => {
	let code = ''
	if (aIdx.value != -1) {
		code = (city.value[pIdx.value] as any).children[cIdx.value].children[aIdx.value].code
	} else if (cIdx.value != -1) {
		code = (city.value[pIdx.value] as any).children[cIdx.value].code
	} else if (pIdx.value != -1) {
		code = (city.value[pIdx.value] as any).code
	}
	if (code !== '') {
		router.push('/edit/map/type/' + mapId.value + '/' + code)
		visible.value = false
	}
}

const closeEvent = () => {
	pIdx.value = -1
	cIdx.value = -1
	aIdx.value = -1
}
</script>

<style lang="less">
.MapPage {
	display: flex;
	height: 100%;
	.chart-container {
		flex: 1;
	}
}
.cityDialogClass {
	.el-dialog__body {
		padding: 15px;
	}
	.el-scrollbar__wrap {
		position: relative;
	}
	.empty {
		position: absolute;
		inset: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: auto;
		font-size: 13px;
		color: @grey2;
	}
	.cityContainer {
		display: flex;
		.active {
			color: #fff;
			background-color: @theme !important;
		}
		.leftProvince {
			width: 25%;
			.provinceItem {
				padding: 10px;
				cursor: pointer;
				border-radius: 5px;
				&:hover {
					color: #fff;
					background-color: @grey;
				}
			}
		}
		.centerCity {
			width: 25%;
			border-left: 1px solid #444;
			.provinceItem {
				padding: 10px;
				cursor: pointer;
				border-radius: 5px;
				&:hover {
					color: #fff;
					background-color: @grey;
				}
			}
		}
		.rightArea {
			display: flex;
			padding-left: 30px;
			flex: 1;
			border-left: 1px solid #444;
			.el-scrollbar {
				width: 100%;
				.el-scrollbar__view {
					display: flex;
					flex-wrap: wrap;
				}
			}
			.cityItem {
				padding: 10px 13px;
				margin: 0 7px 7px 0;
				font-size: 14px;
				border-radius: 5px;
				cursor: pointer;
				&:hover {
					color: #fff;
					background-color: @grey;
				}
			}
		}
	}
}
</style>
