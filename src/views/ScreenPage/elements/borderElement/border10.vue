<template>
	<svg :width="width" :height="height">
		<polygon
			fill="transparent"
			:points="`
        23, 23 ${width - 24}, 23 ${width - 24}, ${height - 24} 23, ${height - 24}
      `" />

		<polyline
			fill="transparent"
			:stroke="color1"
			:points="`4, 4 ${width - 22} ,4 ${width - 22}, ${height - 22} 4, ${height - 22} 4, 4`" />
		<polyline
			fill="transparent"
			:stroke="color2"
			:points="`10, 10 ${width - 16}, 10 ${width - 16}, ${height - 16} 10, ${
				height - 16
			} 10, 10`" />
		<polyline
			fill="transparent"
			:stroke="color2"
			:points="`16, 16 ${width - 10}, 16 ${width - 10}, ${height - 10} 16, ${
				height - 10
			} 16, 16`" />
		<polyline
			fill="transparent"
			:stroke="color2"
			:points="`22, 22 ${width - 4}, 22 ${width - 4}, ${height - 4} 22, ${height - 4} 22, 22`" />
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
