<template>
	<svg :width="width" :height="height">
		<polygon
			fill="transparent"
			:points="`
        7, 7 ${width - 7}, 7 ${width - 7}, ${height - 7} 7, ${height - 7}
      `" />

		<polyline
			fill="transparent"
			:stroke="color1"
			:points="`2, 2 ${width - 2} ,2 ${width - 2}, ${height - 2} 2, ${height - 2} 2, 2`" />
		<polyline
			fill="transparent"
			:stroke="color2"
			:points="`6, 6 ${width - 6}, 6 ${width - 6}, ${height - 6} 6, ${height - 6} 6, 6`" />
		<circle :fill="color1" cx="11" cy="11" r="1" />
		<circle :fill="color1" :cx="width - 11" cy="11" r="1" />
		<circle :fill="color1" :cx="width - 11" :cy="height - 11" r="1" />
		<circle :fill="color1" cx="11" :cy="height - 11" r="1" />
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
