<template>
	<div class="screenCanvas">
		<context-menu
			:style="{
				transform: `scale(${zoom})`,
				transformOrigin: 'center center'
			}"
			@contextmenu="contextmenu"
			@select="selectItem"
			:menu="menu">
			<div
				class="opacityBg"
				:style="{
					width: size[0] + 'px',
					height: size[1] + 'px'
				}">
				<div
					class="mainCanvas"
					:style="{
						[screen.screenOption!.canvas.bgType === 'color' ? 'background' : 'background-image']:
							screen.getScreenOptionOfCanvas.bgType === 'color'
								? screen.getScreenOptionOfCanvas.bgColor
								: `url(${screen.screenOption.canvas.bgImage})`,
						fontSize: screen.getScreenOptionOfCanvas.fontSize,
						color: screen.getScreenOptionOfCanvas.color,
						backgroundRepeat: screen.getScreenOptionOfCanvas.backgroundRepeat,
						backgroundSize: screen.getScreenOptionOfCanvas.backgroundSize
					}">
					<render />
				</div>
			</div>
		</context-menu>
	</div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'

import Render from './render.vue'
import ContextMenu from '@/components/contextMenu.vue'

import useProxy from '@/hooks/useProxy'

import useStore from '@/store'

import { getRecordOption } from '@/utils/screenUtil'
import { uuid } from '@/utils'

import { postScreenImage } from '@/network/screen'

const { screen }: any = useStore()
const menu = [
	{
		label: '粘贴',
		icon: 'i_paste'
	},
	{
		label: '清空剪切板',
		icon: 'i_clear'
	}
]
const size = reactive<[number, number]>([0, 0])
const proxy = useProxy()
const exportImage = async ({ size, type }: any) => {
	let loading = proxy.$loading({
		lock: true,
		text: '正在导出图片，请稍后...',
		background: 'rgba(0, 0, 0, 0.7)'
	})
	let res: any = await postScreenImage({
		// 发起请求在后端生成
		option: JSON.stringify(screen.getScreenOption),
		width: size[0],
		height: size[1],
		c_width: document.getElementById('render')?.clientWidth.toString() as string,
		c_height: document.getElementById('render')?.clientHeight.toString() as string,
		type
	})
	loading.close()
	if (res.status) {
		let link = document.createElement('a')
		link.href = res.img
		link.download = `screen.${type}`
		link.click()
		proxy.$notice({
			type: 'success',
			message: '图片下载成功',
			position: 'top-left'
		})
	}
}
proxy.$Bus.on('exportImage', exportImage)

const selectItem = ({ label }: { label: string }) => {
	switch (label) {
		case '粘贴':
			if (screen.getTmpElement) {
				const element = screen.getTmpElement
				element.id = uuid(6, 36)
				element.style.translateX = lastPoint[0]
				element.style.translateY = lastPoint[1]
				screen.addScreenOptionOfElements(element)
				screen.setTmpElement(null) // 清空粘贴的元素
				screen.addOperationRecordItem(getRecordOption('paste', element.type))
			}
			break
		case '清空剪切板':
			if (screen.getTmpElement) {
				screen.setTmpElement(null)
			}
			break
	}
}

const lastPoint: [number, number] = [0, 0]
const contextmenu = (point: [number, number]) => {
	lastPoint[0] = point[0]
	lastPoint[1] = point[1]
}

const resizeEvent = () => {
	let container = document.getElementsByClassName('screenCanvas')[0]
	zoom.value = (container.clientWidth * 0.9) / 1127
	sessionStorage.setItem('ratio', zoom.value.toString())
}

const zoom = ref<number>(1)
onMounted(() => {
	resizeEvent()
	// size[0] = container.clientWidth * 0.95
	// size[1] = (size[0] * document.documentElement.clientHeight) / document.documentElement.clientWidth

	size[0] = 1127
	size[1] = 542

	window.addEventListener('resize', resizeEvent)
})

onUnmounted(() => {
	proxy.$Bus.off('exportImage', exportImage)

	window.removeEventListener('resize', resizeEvent)
})
</script>

<style lang="less">
.screenCanvas {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
	top: 50%;
	transform: translateY(-50%);
	.scroll-container();

	.btn-container {
		position: absolute;
		bottom: 15px;
		left: 25px;
	}

	.opacityBg {
		background-repeat: repeat;
		background-size: 10px 10px;
		background-image: url('../../../assets/image/transparent.png');
	}

	.mainCanvas {
		position: relative;
		width: 100%;
		height: 100%;
	}
}
</style>
