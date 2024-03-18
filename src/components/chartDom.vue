<template>
	<div
		:style="{
			width: data.width + 'px',
			height: data.height + 'px',
			margin: '15vh auto 0'
		}"
		class="transparent-bg">
		<div ref="chartDomRef" id="chart-dom"></div>
	</div>
	<el-dialog class="code-dialog-class" v-model="data.codeDialog" title="代码配置" width="50%">
		<highlightjs class="language-javascript" language="javascript" :code="data.code" />
	</el-dialog>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref, onUnmounted } from 'vue'
import useStore from '@/store'
import useProxy from '@/hooks/useProxy'
import { deepCopy, htmlDownload } from '@/utils/index'
import { getHTMLData, postChartImage } from '@/network/chart'
import { ElLoading } from 'element-plus'
import { stringify } from '@/utils/toJSON.ts'

interface comInitData {
	options: any
	height: number
	width: number
	bgc: string
	codeDialog: boolean
	code: string
	option: any
}

const chart_i = ref<any>(null)
const { chart }: any = useStore()
const proxy = useProxy()
const chartDomRef = ref()
const data: comInitData = reactive({
	options: null,
	height: 500,
	width: 700,
	bgc: '#fff',
	codeDialog: false,
	code: '',
	option: null
})

defineExpose({
	chartInstance: chart_i
})

const getHTML = (jsCode: string) => {
	return (
		`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.2/echarts.min.js" integrity="sha512-VdqgeoWrVJcsDXFlQEKqE5MyhaIgB9yXUVaiUa8DR2J4Lr1uWcFm+ZH/YnzV5WqgKf4GPyHQ64vVLgzqGIchyw==" crossorigin="anonymous" referrerpolicy="no-referrer"></scrip` +
		`t>
    <style>
      #chart {
        width: ${data.width}px;
        height: ${data.height}px;
      }
    </style>
  </head>
  <body>
    <div id="chart"></div>
    <script>
      ${jsCode}
    </scrip` +
		`t>
  </body>
</html>
`
	)
}

//下载
// const downloadFile = (fileName: string, content: string) => {
// 	let aLink = document.createElement('a')
// 	let blob = base64ToBlob(content) //new Blob([content]);
// 	let evt = document.createEvent('HTMLEvents')
// 	evt.initEvent('click', true, true) //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
// 	aLink.download = fileName
// 	aLink.href = URL.createObjectURL(blob)
// 	aLink.dispatchEvent(
// 		new MouseEvent('click', {
// 			bubbles: true,
// 			cancelable: true,
// 			view: window
// 		})
// 	)
// }

/**
 * 触发浏览器下载文件。
 *
 * @param fileName - 指定下载文件的文件名。
 * @param content - 文件内容的Base64编码字符串。
 */
const downloadFile = (fileName: string, content: string) => {
	// 创建一个<a>元素用于触发下载
	let aLink = document.createElement('a')
	// 将Base64编码的内容转换为Blob对象
	let blob = base64ToBlob(content) // 使用之前定义的base64ToBlob函数
	// 创建一个事件，用于在不直接点击链接的情况下触发下载
	let evt = document.createEvent('HTMLEvents')
	// 初始化事件，设置事件类型为'click'。这里的true参数表示事件可以冒泡，第二个true表示可以取消默认行为
	evt.initEvent('click', true, true)
	// 设置下载文件的名称
	aLink.download = fileName
	// 为<a>元素设置href属性，其值为指向创建的Blob对象的URL
	aLink.href = URL.createObjectURL(blob)
	// 使用dispatchEvent触发<a>元素的点击事件，实现程序化的下载操作
	aLink.dispatchEvent(
		new MouseEvent('click', {
			bubbles: true, // 事件可以冒泡
			cancelable: true, // 事件可以取消
			view: window // 指定事件的视图（视窗），这里是window对象
		})
	)
}

//base64转blob
const base64ToBlob = (code: string) => {
	let parts = code.split(';base64,')
	let contentType = parts[0].split(':')[1]
	let raw = window.atob(parts[1])
	let rawLength = raw.length
	let uInt8Array = new Uint8Array(rawLength)
	for (let i = 0; i < rawLength; ++i) {
		uInt8Array[i] = raw.charCodeAt(i)
	}
	return new Blob([uInt8Array], { type: contentType })
}
const getCode = (type: string) => {
	let _option: any = deepCopy(data.option)
	let jdata: any = JSON.stringify(_option, null, 4)
	const optionCode = jdata.replace(/"(\w+)":/g, '$1:')
	if (type == 'js') {
		data.code = `const chart = echarts.init(document.getElementById('chart'));
const option = ${optionCode};
chart.setOption(option);  //设置option`
	} else {
		data.code = optionCode
	}
	return data.code
}
const initChart = () => {
	let chartInstance = proxy.$echarts.init(chartDomRef.value)
	chart_i.value = chartInstance
	chartInstance.setOption(chart.getOption)
	data.option = chart.getOption
	data.code = chart.getOption

	// 监听图表配置变化
	proxy.$Bus.on('optionChange', (e: any) => {
		let k: string = Object.keys(e)[0]
		for (let key in data.option) {
			if (key == k) {
				data.option[key] = e[key]
				break
			}
		}
		chartInstance.setOption(data.option, true)
		chart.setOption(data.option)
	})

	// 监听图表数据变化
	proxy.$Bus.on('dataChange', (e: any) => {
		let piniaOption = chart.getOption
		for (let key in e) {
			piniaOption[key] = e[key]
		}
		chartInstance.setOption(piniaOption, true)
		// 修改pinia数据
		chart.setOption(piniaOption)
	})

	// 监听图表画布配置变化
	proxy.$Bus.on('canvasChange', (e: any) => {
		if (Object.prototype.hasOwnProperty.call(e, 'backgroundColor')) {
			const { backgroundColor } = e
			data.option.backgroundColor = backgroundColor
			chartInstance.setOption({
				backgroundColor
			})
		} else {
			data.option.backgroundColor = e
			chartInstance.setOption({
				backgroundColor: e
			})
		}
		// 修改pinia数据
		chart.setOption(data.option)
	})

	// 生成代码
	proxy.$Bus.on('createCode', (e: string) => {
		getCode(e)
		data.codeDialog = true
	})

	let save_loading: any = null
	// 下载图表
	proxy.$Bus.on('downloadChart', async (type: string) => {
		save_loading = ElLoading.service({
			lock: true,
			text: '下载中',
			background: 'rgba(0, 0, 0, 0.7)'
		})
		if (type == 'png') {
			postChartImage({
				// 发起接口请求 传递 option 给后端动态生成
				option: stringify(chart.getOption)
			})
				.then((res: any) => {
					if (!res.status) throw new Error()
					downloadFile('chart.png', res.img)
					proxy.$notice({
						type: 'success',
						message: res.msg,
						position: 'top-left'
					})
				})
				.catch(() => {
					proxy.$notice({
						type: 'error',
						message: '生成图片失败',
						position: 'top-left'
					})
				})
				.finally(() => {
					save_loading.close()
				})
		} else {
			// 生成html字符串 并且下载
			const res: any = await getHTMLData({
				option: stringify(chart.getOption)
			})
			if (res.status) {
				htmlDownload(res.data)
				proxy.$notice({
					type: 'success',
					message: res.msg,
					position: 'top-left'
				})
			}
			save_loading.close()
		}
	})

	// 重置数据
	proxy.$Bus.on('resetChartData', () => {
		let option = deepCopy(chart.getDefaultOption)
		data.option = option
		chart.setOption(option)
		setTimeout(() => {
			chartInstance.setOption(chart.getOption, true)
		}, 0)
	})
}

onMounted(() => {
	initChart()
})

onUnmounted(() => {
	// 清空图表实例
	chart_i.value!.clear()
	chart_i.value!.dispose()

	// 事件监听销毁
	proxy.$Bus.off('optionChange')
	proxy.$Bus.off('dataChange')
	proxy.$Bus.off('canvasChange')
	proxy.$Bus.off('createCode')
	proxy.$Bus.off('downloadChart')
	proxy.$Bus.off('resetChartData')
})
</script>

<style lang="less">
#chart-dom {
	position: relative;
	width: 100%;
	height: 100%;
	margin: 0 auto;
}

.transparent-bg {
	background-repeat: repeat;
	background-size: 10px 10px;
	background-image: url('../assets/image/transparent.png');
}
</style>
