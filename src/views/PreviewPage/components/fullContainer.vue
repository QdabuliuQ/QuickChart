<template>
	<div class="full-container">
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

import useResize from '@/utils/useResize.ts'

const props = defineProps<{
	width: number
	height: number
	bgStyle: any
}>()

const scaleContainerRef = ref<HTMLDivElement>()

useResize(() => {
	let width = document.documentElement.clientWidth
	let height = document.documentElement.clientHeight
	;(scaleContainerRef.value as HTMLDivElement).style.transform = `scale(${width / props.width}, ${
		height / props.height
	})`
})
</script>
<style lang="less">
.full-container {
	overflow: hidden;
	width: 100vw;
	height: 100vh;

	.scale-container {
		transform-origin: 0 0;
	}
}
</style>
