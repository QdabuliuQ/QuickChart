<template>
	<div
		:style="{
			width: width + 'px',
			height: height + 'px'
		}"
		class="transparent-bg">
		<div ref="mapDomRef" id="map-dom"></div>
		<el-dialog class="code-dialog-class" v-model="codeDialog" title="代码配置" width="50%">
			<highlightjs class="language-javascript" language="javascript" :code="code" />
		</el-dialog>
	</div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import useProxy from '@/hooks/useProxy'

import useStore from '@/store'

import { stringify } from '@/utils/toJSON.ts'
import { downloadFile, htmlDownload } from '@/utils'

import { oss } from '@/network'
import { getMapHTML, getMapImage } from '@/network/map.ts'
import { ElLoading } from 'element-plus'

const { chart }: any = useStore()
const route = useRoute()
const proxy = useProxy()
const width = ref<number>(700)
const height = ref<number>(500)
const codeDialog = ref<boolean>(false)
const code = ref<string>('')
const mapDomRef = ref<any>(null)
const chart_i = ref<any>()

defineExpose({
	chartInstance: chart_i
})

let chartInstance: any
let option: any = null
const optionChange = (e: any) => {
	let k: string = Object.keys(e)[0]
	for (let key in option) {
		if (key == k) {
			option[key] = e[key]
			break
		}
	}
	chartInstance.setOption(option)
	chart.setOption(option)
}
const canvasChange = (e: any) => {
	if (Object.prototype.hasOwnProperty.call(e, 'backgroundColor')) {
		const { backgroundColor } = e
		option.backgroundColor = backgroundColor
		chartInstance.setOption({
			backgroundColor
		})
	} else {
		option.backgroundColor = e
		chartInstance.setOption({
			backgroundColor: e
		})
	}
	// 修改pinia数据
	chart.setOption(option)
}
const downloadChart = async (type: string) => {
	const loading = ElLoading.service({
		lock: true,
		text: '下载中',
		background: 'rgba(0, 0, 0, 0.7)'
	})
	if (type == 'png') {
		const res: any = await getMapImage({
			option: stringify(chart.getOption),
			adcode: route.params.adcode as string
		})
		if (res.status) {
			downloadFile('map.png', res.base64)
		}
	} else {
		// 生成html字符串
		const res: any = await getMapHTML({
			option: stringify(chart.getOption),
			adcode: route.params.adcode as string
		})
		htmlDownload(res.data as string)
	}
	loading.close()
}
const dataChange = (e: any) => {
	let piniaOption = chart.getOption
	for (let key in e) {
		piniaOption[key] = e[key]
	}
	chartInstance.setOption(piniaOption, true)
	// 修改pinia数据
	chart.setOption(piniaOption)
}

const createCode = (type: string) => {
	const jData = JSON.stringify(chart.getOption, null, 4)
	const option = jData.replace(/"(\w+)":/g, '$1:')
	if (type === 'js') {
		code.value = `// mapJson url: ${oss}/map/cityJSON?adcode=${route.params.adcode}
const chart = echarts.init(document.getElementById('chart'));
const option = ${option};
chart.setOption(option);  //设置option`
	} else {
		code.value = option
	}
	codeDialog.value = true
}

const initChart = () => {
	chartInstance = proxy.$echarts.init(mapDomRef.value as HTMLElement)
	chart_i.value = chartInstance
	chartInstance.clear()
	proxy.$echarts.registerMap('map' + sessionStorage.getItem('curAdcode'), chart.getMapJson)

	chartInstance.setOption(chart.getOption)
	option = chart.getOption

	proxy.$Bus.on('optionChange', optionChange) // 监听图表配置变化
	proxy.$Bus.on('canvasChange', canvasChange) // 修改画布
	proxy.$Bus.on('downloadChart', downloadChart) // 下载图表
	proxy.$Bus.on('dataChange', dataChange) // 修改数据
	proxy.$Bus.on('createCode', createCode)
}

onMounted(() => {
	initChart()
})

onUnmounted(() => {
	chartInstance.clear()
	proxy.$Bus.off('optionChange', optionChange)
	proxy.$Bus.off('canvasChange', canvasChange)
	proxy.$Bus.off('downloadChart', downloadChart)
})
</script>
<style lang="less">
.transparent-bg {
	background-repeat: repeat;
	background-size: cover;
	background-image: url('../assets/image/bg.jpg');
	#map-dom {
		position: relative;
		width: 100%;
		height: 100%;
		margin: 0 auto;
	}
}
</style>
