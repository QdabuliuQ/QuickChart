<template>
	<div id="dragElement" class="dragItems">
		<context-menu
			:menu="item.isLock ? lockMenu : unlockMenu"
			@select="(info: any) => selectElement(info, idx as number)"
			v-for="(item, idx) in screen.screenOption.elements"
			:key="item.id">
			<chart-element
				@item-click="itemClick"
				v-if="item.type === 'chart' || item.type === 'map'"
				v-bind="item"
				:idx="idx" />
			<text-element
				v-else-if="item.type === 'text'"
				@item-click="itemClick"
				v-bind="item"
				:idx="idx" />
			<shape-element
				v-else-if="item.type === 'shape'"
				@item-click="itemClick"
				v-bind="item"
				:idx="idx" />
			<image-element
				v-else-if="item.type === 'image'"
				@item-click="itemClick"
				v-bind="item"
				:idx="idx" />
			<MarqueeElement
				v-else-if="item.type === 'marquee'"
				@itemClick="itemClick"
				v-bind="item"
				:idx="idx" />
			<BorderElement
				v-else-if="item.type === 'border'"
				@itemClick="itemClick"
				v-bind="item"
				:idx="idx" />
		</context-menu>
		<Moveable
			:target="screen.getCurElementIdx !== -1 ? target : null"
			:ables="[deleteComponent]"
			:props="{ deleteable: true }"
			:draggable="true"
			:resizable="true"
			:rotatable="true"
			:snappable="true"
			:isDisplaySnapDigit="true"
			:snapGap="true"
			:snapRotataionThreshold="5"
			:snapRotationDegrees="[0, 90, 180, 270]"
			:snapDirections="{
				top: true,
				left: true,
				bottom: true,
				right: true,
				center: true,
				middle: true
			}"
			:elementSnapDirections="{
				top: true,
				left: true,
				bottom: true,
				right: true,
				center: true,
				middle: true
			}"
			:elementGuidelines="elementGuidelines"
			:bounds="bounds as BoundType"
			@render="onRender"
			@drag-end="dragEnd"
			@rotate="dragEnd"
			@resize="dragEnd"
			@click.stop />
	</div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue'

import ContextMenu from '@/components/contextMenu.vue'
import BorderElement from '@/views/ScreenPage/elements/borderElement/index.vue'
import ChartElement from '@/views/ScreenPage/elements/chartElement.vue'
import ImageElement from '@/views/ScreenPage/elements/imageElement.vue'
import MarqueeElement from '@/views/ScreenPage/elements/marqueeElement.vue'
import ShapeElement from '@/views/ScreenPage/elements/shapeElement.vue'
import TextElement from '@/views/ScreenPage/elements/textElement.vue'

import closeImg from '@/assets/image/close.png'

import useProxy from '@/hooks/useProxy'

import useStore from '@/store'

import { cutElement, lockElement, unlockElement } from '@/utils/screenUtil'
import { debounce, deepCopy } from '@/utils'

import { IStyle } from '@/types/screen'
import Moveable, { BoundType } from 'vue3-moveable'

const proxy = useProxy()
const { screen } = useStore()
const target = ref<HTMLElement | null>(null)
const bounds = {
	left: 0,
	top: 0,
	right: 0,
	bottom: 0,
	position: 'css'
}
const elementGuidelines = reactive<Array<string>>([])
const unlockMenu = [
	{
		label: '复制',
		icon: 'i_copy'
	},
	{
		label: '剪切',
		icon: 'i_cut'
	},
	{
		label: '上移一层',
		icon: 'i_top'
	},
	{
		label: '下移一层',
		icon: 'i_down'
	},
	{
		label: '锁定',
		icon: 'i_lock'
	},
	{
		label: '删除',
		icon: 'i_delete_2'
	}
]
const lockMenu = [
	{
		label: '解锁',
		icon: 'i_unlock'
	}
]

const onRender = (e: any) => {
	e.target.style.cssText += e.cssText
}

const selectElement = (info: any, idx: number) => {
	switch (info.label) {
		case '剪切':
			cutElement(idx)
			target.value = null
			break
		case '复制':
			screen.setTmpElement(deepCopy(screen.getScreenOptionOfElements[idx]))
			break
		case '锁定':
			lockElement(idx)
			target.value = null
			break
		case '解锁':
			unlockElement(idx)
			break
		case '删除':
			deleteChart(idx)
	}
}

const itemClick = ({ idx, e }: { idx: number; e: MouseEvent }) => {
	e.stopPropagation()
	if (target.value) updateElementStyle(target.value, screen.getCurElementIdx)
	if (screen.getScreenOptionOfElements[idx].isLock) {
		target.value = null // 清空
	} else {
		target.value = e.currentTarget as HTMLElement // 设置为选定的元素
		screen.updateCurElementIdx(idx) // 设置选中元素索引值
	}
}

const updateElementStyle = (target: HTMLElement, idx: number) => {
	if (idx <= -1 || !target) return
	let i = 0
	let styleInfo: {
		[propName: string]: any
	} = {}
	while (target.style[i]) {
		styleInfo[target.style[i]] = target.style[target.style[i] as any]
		i++
	}
	let [x, y, d] = styleInfo['transform']
		? styleInfo['transform'].match(/-?\d+(\.\d+)?/g).map((item: string) => parseFloat(item))
		: [0, 0, 0, 1, 1]
	let info: IStyle = {
		display: styleInfo.display,
		width: styleInfo.width ? parseFloat(styleInfo.width) : 0,
		height: styleInfo.height ? parseFloat(styleInfo.height) : 0,
		translateX: x ? x : 0,
		translateY: y ? y : 0,
		rotate: d ? d : 0,
		zIndex: parseInt(styleInfo['z-index'])
	}
	if (
		screen.getScreenOptionOfElements[idx].type === 'text' ||
		screen.getScreenOptionOfElements[idx].type === 'marquee'
	) {
		setTextStyle(styleInfo, info)
	} else if (screen.getScreenOptionOfElements[idx].type === 'shape') {
		setShapeStyle(info, idx)
	} else if (screen.getScreenOptionOfElements[idx].type === 'image') {
		setImageStyle(info, idx)
	}
	screen.updateScreenOptionOfElementStyle(info, idx)
}

const isVisited = new Set(['transform', 'width', 'height', 'z-index'])
const setTextStyle = (styleInfo: any, info: any) => {
	for (let key in styleInfo) {
		if (!Object.prototype.hasOwnProperty.call(styleInfo, key) || isVisited.has(key)) continue
		let _key = key
		if (/-\w/.test(key)) {
			key = key.replace(/-\w/g, (char: string) => char[1].toUpperCase())
		}
		info[key] = /\d+px/.test(styleInfo[_key]) ? parseInt(styleInfo[_key]) : styleInfo[_key]
	}
}
const setShapeStyle = (info: any, idx: number) => {
	// 更新形状样式
	const rootDom = document.getElementsByClassName('drag-item')[idx] as HTMLElement
	const pathDom: HTMLElement = rootDom.childNodes[0].childNodes[0].childNodes[0] as HTMLElement
	let [shadowX, shadowY, shadowBlur] = (rootDom.style.filter.match(/\d+px/g) as any).map(
		(item: string) => parseInt(item)
	)
	info['shadowX'] = shadowX
	info['shadowY'] = shadowY
	info['shadowBlur'] = shadowBlur
	info['shadowColor'] = rootDom.style.filter.substring(
		rootDom.style.filter.indexOf('(') + 1,
		rootDom.style.filter.indexOf(')') + 1
	)
	info['fill'] = pathDom.getAttribute('fill')
	info['stroke'] = pathDom.getAttribute('stroke')
	info['strokeWidth'] = parseInt(pathDom.getAttribute('stroke-width') as string)
}
const setImageStyle = (info: any, idx: number) => {
	const dom = document.getElementsByClassName('drag-item')[idx] as HTMLElement
	let style: any = dom.style
	let i: number = style.boxShadow.indexOf(')') + 1
	let shadowColor = style.boxShadow.substring(0, i)
	let shadowStyle = style.boxShadow.substring(i + 1)
	let [shadowX, shadowY, shadowBlur] = shadowStyle.split(' ')
	info['shadowX'] = parseInt(shadowX)
	info['shadowY'] = parseInt(shadowY)
	info['shadowBlur'] = parseInt(shadowBlur)
	info['shadowColor'] = shadowColor
	info['borderWidth'] = parseInt(style.borderWidth)
	info['borderType'] = style.borderStyle
	info['borderColor'] = style.borderColor
}

const cancelClickEvent = () => {
	if (target.value) updateElementStyle(target.value as HTMLElement, screen.getCurElementIdx)
	target.value = null
	screen.updateCurElementIdx(-1)
}

const setElementGuidelines = () => {
	// 设置元素引导线
	elementGuidelines.length = 0
	for (let i = 0; i < screen.screenOption.elements.length; i++) {
		elementGuidelines.push('.item-' + screen.screenOption.elements[i].id)
	}
}

const deleteChart = (idx: number = screen.getCurElementIdx) => {
	// 删除图表回调
	screen.deleteScreenOptionOfElements(idx)
	target.value = null // 选中元素设置为 null
	screen.updateCurElementIdx(-1)
}

// 停止拖动
const dragEnd = debounce(() => {
	if (target.value) {
		// 更新元素样式
		updateElementStyle(target.value as HTMLElement, screen.getCurElementIdx)
	}
}, 50)

const deleteComponent = {
	name: 'deleteable',
	props: [],
	events: [],
	render(moveable: any, React: any) {
		const rect = moveable.getRect()
		const EditableViewer = moveable.useCSS(
			'div',
			`
     {
         position: absolute;
         left: 0px;
         top: 0px;
         will-change: transform;
         transform-origin: 0px 0px;
     }
         `
		)
		return React.createElement(
			EditableViewer,
			{
				key: 'dimension-viewer',
				className: 'moveable-dimension',
				style: {
					position: 'absolute',
					left: `${rect.width / 2}px`,
					top: `${rect.height + 10}px`,
					color: '#ff4242',
					fontSize: '13px',
					willChange: 'transform',
					transform: `translate(-50%, 0px)`
				}
			},
			[
				React.createElement('img', {
					src: closeImg,
					style: {
						width: '21px',
						height: '21px',
						cursor: 'pointer'
					},
					onClick: () => deleteChart(screen.getCurElementIdx)
				})
			]
		)
	}
}

let stop = watch(
	() => screen.screenOption.elements,
	() => {
		setElementGuidelines()
	},
	{
		deep: true,
		immediate: true
	}
)

onMounted(() => {
	document.getElementsByClassName('mainCanvas')[0].addEventListener('click', cancelClickEvent)
	proxy.$Bus.on('deleteChart', deleteChart)
	setTimeout(() => {
		localStorage.setItem(
			'cWidth',
			(document.getElementsByClassName('opacityBg')[0] as HTMLDivElement).clientWidth.toString()
		)
		localStorage.setItem(
			'cHeight',
			(document.getElementsByClassName('opacityBg')[0] as HTMLDivElement).clientHeight.toString()
		)
	}, 100)
})

onUnmounted(() => {
	document.getElementsByClassName('mainCanvas')[0]?.removeEventListener('click', cancelClickEvent)
	proxy.$Bus.off('deleteChart', deleteChart)
	stop()
})
</script>
<style lang="less">
.dragItems {
	position: relative;
	width: 100%;
	height: 100%;
	.drag-item {
		position: absolute;
		overflow: hidden;
		box-sizing: border-box;
	}
	.active-item {
		animation: borderAnimate 1s linear infinite;
	}

	@keyframes borderAnimate {
		0% {
			border: 1px dashed @theme;
		}
		100% {
			border: 1px dashed transparent;
		}
	}
}
</style>
