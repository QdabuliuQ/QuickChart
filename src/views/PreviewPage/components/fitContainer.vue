<template>
	<div class="fit-container">
		<div ref="scaleContainerRef" class="scale-container">
			<div
				:style="{
					width: props.width + 'px',
					height: props.height + 'px',
					...props.bgStyle
				}"
				id="preview-container">
				<slot></slot>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import useResize from '@/hooks/useResize.ts'
const props = defineProps<{
	width: number
	height: number
	bgStyle: any
}>()

const scaleContainerRef = ref<HTMLDivElement>(null)

useResize(() => {
	let width = document.documentElement.clientWidth
	let height = document.documentElement.clientHeight
	const scale = Math.min(width / props.width, height / props.height)
	;(scaleContainerRef.value as HTMLDivElement).style.transform = `scale(${scale}, ${scale})`
})
</script>
<style lang="less">
.fit-container {
	position: relative;
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	#preview-container {
		transform-origin: center center;
		position: relative;
	}
}
</style>
