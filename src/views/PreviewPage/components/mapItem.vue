<template>
	<div
		class="preview-page-map-item"
		:style="{
			width: '700px',
			height: '500px',
			transform: `scale(${props.style.width / 700}, ${props.style.height / 500})`,
			zIndex: props.style.zIndex,
			display: props.style.display,
			left: `${props.style.translateX}px`,
			top: `${props.style.translateY}px`
		}">
		<div
			:style="{
				height: '100%',
				transform: `rotate(${props.style.rotate}deg)`,
				transformOrigin: '50% 50%'
			}">
			<div ref="mapItemRef" class="map-item-main"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import useProxy from '@/hooks/useProxy'

import { parse } from '@/utils/toJSON.ts'

import { oss } from '@/network'
import { IStyle } from '@/types/screen'

interface Map {
	id: string
	type: 'map'
	isLock: boolean
	cover: string
	option: string
	style: IStyle
	adcode: string
	c_width: number
	c_height: number
	width: number
	height: number
}

const props = defineProps<Map>()
const mapItemRef = ref(null)
const proxy = useProxy()

onMounted(async () => {
	try {
		let mapJSON = null
		if (localStorage.getItem(props.adcode)) {
			mapJSON = JSON.parse(localStorage.getItem(props.adcode) as string)
		} else {
			let res = await fetch(`${oss}/map/${props.adcode}.json`)
			mapJSON = await res.json()
			localStorage.setItem(props.adcode, JSON.stringify(mapJSON))
		}
		const chart = proxy.$echarts.init(mapItemRef.value)
		proxy.$echarts.registerMap(`map${props.adcode}`, mapJSON)
		chart.setOption(parse(props.option))
	} catch (err) {}
})
</script>

<style lang="less">
.preview-page-map-item {
	position: absolute;
	transform-origin: 0 0;

	.map-item-main {
		width: 100%;
		height: 100%;
	}
}
</style>
