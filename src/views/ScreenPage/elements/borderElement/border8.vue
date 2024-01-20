<template>
	<svg :width="width" :height="height">
		<polygon
			fill="transparent"
			:points="` 9, 7 ${width - 9}, 7 ${width - 9}, ${height - 7} 9, ${height - 7}`" />
		<circle :fill="color2" cx="5" cy="5" r="2" />
		<circle :fill="color2" :cx="width - 5" cy="5" r="2" />
		<circle :fill="color2" :cx="width - 5" :cy="height - 5" r="2" />
		<circle :fill="color2" cx="5" :cy="height - 5" r="2" />
		<polyline :stroke="color1" :points="`10, 4 ${width - 10}, 4`" />
		<polyline :stroke="color1" :points="`10, ${height - 4} ${width - 10}, ${height - 4}`" />
		<polyline :stroke="color1" :points="`5, 70 5, ${height - 70}`" />
		<polyline :stroke="color1" :points="`${width - 5}, 70 ${width - 5}, ${height - 70}`" />
		<polyline :stroke="color1" :points="`3, 10, 3, 50`" />
		<polyline :stroke="color1" :points="`7, 30 7, 80`" />
		<polyline :stroke="color1" :points="`${width - 3}, 10 ${width - 3}, 50`" />
		<polyline :stroke="color1" :points="`${width - 7}, 30 ${width - 7}, 80`" />
		<polyline :stroke="color1" :points="`3, ${height - 10} 3, ${height - 50}`" />
		<polyline :stroke="color1" :points="`7, ${height - 30} 7, ${height - 80}`" />
		<polyline
			:stroke="color1"
			:points="`${width - 3}, ${height - 10} ${width - 3}, ${height - 50}`" />
		<polyline
			:stroke="color1"
			:points="`${width - 7}, ${height - 30} ${width - 7}, ${height - 80}`" />
	</svg>
</template>
<script setup lang="ts">
interface IProps {
	width: number
	height: number
	color1: string
	color2: string
}
const { width, height, color1, color2 } = defineProps<IProps>()
</script>
