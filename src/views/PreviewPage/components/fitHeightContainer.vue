<template>
	<div class="fit-height-container">
		<div ref="scaleContainerRef" id="scale-container">
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
import { onUnmounted, ref } from 'vue'

import useResize from '@/utils/useResize.ts'

const props = defineProps<{
	width: number
	height: number
	bgStyle: any
}>()

const scaleContainerRef = ref<HTMLDivElement>(null as any)

useResize(() => {
	let height = document.documentElement.clientHeight as number
	;(scaleContainerRef.value.style as any).zoom = height / props.height
})

onUnmounted(() => {
	document.body.style.overflow = 'visible'
})
</script>
<style lang="less">
body {
	overflow-y: hidden;
	overflow-x: visible;
}
</style>
