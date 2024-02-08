<template>
	<svg :width="width" :height="height">
		<polygon
			fill="transparent"
			:points="`
        10, 22 ${width - 22}, 22 ${width - 22}, ${height - 86} ${width - 84}, ${height - 24} 10, ${
					height - 24
				}
      `" />

		<polyline
			fill="transparent"
			:stroke="color1"
			:points="`8, 5 ${width - 5}, 5 ${width - 5}, ${height - 100}
          ${width - 100}, ${height - 5} 8, ${height - 5} 8, 5`" />
		<polyline
			fill="transparent"
			:stroke="color2"
			:points="`3, 5 ${width - 20}, 5 ${width - 20}, ${height - 60}
          ${width - 74}, ${height - 5} 3, ${height - 5} 3, 5`" />
		<polyline fill="transparent" :stroke="color2" :points="`50, 13 ${width - 35}, 13`" />
		<polyline fill="transparent" :stroke="color2" :points="`15, 20 ${width - 35}, 20`" />
		<polyline
			fill="transparent"
			:stroke="color2"
			:points="`15, ${height - 20} ${width - 110}, ${height - 20}`" />
		<polyline
			fill="transparent"
			:stroke="color2"
			:points="`15, ${height - 13} ${width - 110}, ${height - 13}`" />
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
