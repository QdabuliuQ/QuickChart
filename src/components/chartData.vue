<template>
	<div class="chart-data">
		<div class="excel-container">
			<div class="top-btn-list" style="margin: 8px 0">
				<div class="left-btn">
					<input
						@change="changeEvent"
						accept=".xls,.xlsx"
						ref="uploadExcelInputRef"
						style="display: none"
						type="file" />
					<el-button @click="uploadExcelInputRef.click()" color="#626aef">
						<template #icon>
							<i class="iconfont i_upload"></i>
						</template>
						上传数据
					</el-button>
					<el-button @click="exportExcel" color="#626aef">
						<template #icon>
							<i class="iconfont i_download"></i>
						</template>
						下载数据
					</el-button>
				</div>
				<div class="right-btn">
					<el-button @click="resetChartData" class="reset-btn" type="info">
						<template #icon>
							<i class="iconfont i_refresh"></i>
						</template>
						重置
					</el-button>
				</div>
			</div>
			<div class="excel-data-box" element-loading-background="rgba(0, 0, 0, 1)" v-loading="loading">
				<div id="data-excel"></div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue'

import useProxy from '@/hooks/useProxy'

import useStore from '@/store'

import { exportFile, importFile, stox } from '@/utils/excelOpe'
import { fileType } from '@/utils/fileType'
import { deepCopy } from '@/utils'

import Spreadsheet from 'x-data-spreadsheet'
import zhCN from 'x-data-spreadsheet/src/locale/zh-cn'
Spreadsheet.locale('zh-cn', zhCN)

const props = defineProps<{
	loading: boolean
	detail_type: string
	type: string
}>()

let timer: any
let excelData: any, originData: any
let sheetObj: any
let conveyData: any, combineData: any, createInitiativeData: any
const proxy = useProxy()
const { chart }: any = useStore()
// const worker = proxy.$worker
const worker = new Worker(
	new URL('../workers/worker.ts', import.meta.url),
	/* @vite-ignore */ { name: 'worker' }
)

const uploadExcelInputRef = ref()
const loading = ref<boolean>(props.loading)

const setExcelData = () => {
	worker.postMessage({
		data: JSON.stringify(sheetObj.getData()[0].rows),
		options: JSON.stringify(chart.getOption),
		handle: conveyData.toString(),
		type: 'edit'
	})
}

const changeEvent = () => {
	let file = uploadExcelInputRef.value.files[0]
	if (fileType(file.name) == 'excel') {
		importFile(file, (workbook) => {
			sheetObj.loadData(stox(workbook))
			proxy.$notice({
				title: '成功',
				message: '文件上传成功',
				type: 'success',
				position: 'top-left'
			})
			setExcelData()
		})
	} else {
		// 类型错误
		proxy.$notice({
			title: '文件类型错误',
			message: '请上传xls，xlsx类型的文件',
			type: 'error',
			position: 'top-left'
		})
	}
}

const resetChartData = () => {
	loading.value = true
	proxy.$Bus.emit('resetChartData')
	console.log(originData, 'originData originData')

	setTimeout(() => {
		sheetObj.loadData({
			name: 'sheet11',
			rows: originData
		})
	}, 0)
	setTimeout(() => {
		loading.value = false
	}, 400)
}

const exportExcel = () => {
	exportFile(sheetObj.getData())
}

const initData = () => {
	setTimeout(() => {
		let w = document.getElementById('data-excel')?.clientWidth
		let h = document.getElementById('data-excel')?.clientHeight
		let option: any = {
			// 图表配置
			mode: 'edit', // edit | read
			showToolbar: false, // 顶部工具栏
			showGrid: true,
			showContextmenu: false, // 切换右键菜单显示状态
			showBottomBar: false, // 底部工具栏
			view: {
				height: () => h,
				width: () => w
			},
			row: {
				len: 200,
				height: 25
			},
			col: {
				len: 100,
				width: 100,
				indexWidth: 60,
				minWidth: 60
			},
			style: {
				bgcolor: '#ffffff',
				align: 'left',
				valign: 'middle',
				textwrap: false,
				strike: false,
				underline: false,
				color: '#0a0a0a',
				font: {
					name: 'Helvetica',
					size: 10,
					bold: false,
					italic: false
				}
			}
		}

		const data1 = {
			name: 'sheet11',
			rows: excelData
		}
		sheetObj = new Spreadsheet('#data-excel', option)
			.loadData(data1) // load data
			.change((res) => {
				// 图表数据修改
				clearTimeout(timer)
				timer = setTimeout(() => {
					worker.postMessage({
						data: JSON.stringify(res.rows),
						options: JSON.stringify(chart.getOption),
						handle: conveyData.toString(),
						type: 'edit'
					})
				}, 1000)
			})
		// 设置冻结
		sheetObj.sheet.data.setFreeze(1, 0)
		sheetObj.validate()
	}, 200)
}

// worker响应函数
worker.onmessage = (e: { data: any }) => {
	if (e.data.type == 'edit') {
		// 获取计算过后的data 合并成为option
		proxy.$Bus.emit('dataChange', combineData(e.data.res))
	}
}

const initHandleFun = async () => {
	const { createExcelData, conveyExcelData, combineOption } = (await import(
		`../config/chart/config/${chart.getType}/${props.type}_/${chart.getType}${props.detail_type}.ts`
	)) as any

	createInitiativeData = createExcelData
	conveyData = conveyExcelData
	combineData = combineOption
	excelData = createInitiativeData(chart.getOption)
	originData = deepCopy(excelData)
	initData()
}

const stop = watch(
	() => props.loading,
	(val: boolean) => {
		initHandleFun()
		loading.value = val
	}
)
onUnmounted(() => {
	stop()
})
</script>

<style lang="less">
.chart-data {
	position: relative;
	height: 100%;
	padding: 0 10px;
	background-color: @curColor;
	.excel-container {
		overflow: hidden;
		width: 100%;
		height: 100%;
		.top-btn-list {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.saveBtn {
				span {
					position: relative;
					top: 0.5px;
				}
			}
		}
		.excel-data-box {
			overflow: hidden;
			height: 91%;
			border-radius: 6px;
			#data-excel {
				width: 100%;
				height: 100%;
				.x-spreadsheet-scrollbar {
					/* 滚动条整体 */
					&::-webkit-scrollbar {
						width: 10px;
						height: 10px;
					}

					/* 两个滚动条交接处 -- x轴和y轴 */
					&::-webkit-scrollbar-corner {
						background-color: transparent;
					}

					/* 滚动条滑块 */
					&::-webkit-scrollbar-thumb {
						background: #535353;
						border-radius: 10px;
						box-shadow: inset 0 0 5px rgb(0 0 0 / 20%);
					}

					/* 滚动条轨道 */
					&::-webkit-scrollbar-track {
						background: #ededed;
						border-radius: 10px;
						box-shadow: inset 0 0 5px rgb(0 0 0 / 20%);
					}
				}
			}
		}
	}
}
</style>
