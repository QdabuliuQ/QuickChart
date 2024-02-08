<template>
	<svg :width="width" :height="height">
		<polygon
			fill="transparent"
			:points="`
        ${width - 15}, 22 170, 22 150, 7 40, 7 28, 21 32, 24
        16, 42 16, ${height - 32} 41, ${height - 7} ${width - 15}, ${height - 7}
      `" />
		<polyline
			fill="transparent"
			:stroke="color1"
			:points="`145, ${height - 5} 40, ${height - 5} 10, ${height - 35}
          10, 40 40, 5 150, 5 170, 20 ${width - 15}, 20`" />
		<polyline
			fill="transparent"
			:stroke="color2"
			:points="`245, ${height - 1} 36, ${height - 1} 14, ${height - 23}
          14, ${height - 100}`" />
		<polyline fill="transparent" :stroke="color1" :points="`7, ${height - 40} 7, ${height - 75}`" />
		<polyline fill="transparent" :stroke="color1" :points="`28, 24 13, 41 13, 64`" />
		<polyline fill="transparent" :stroke="color1" :points="`5, 45 5, 140`" />
		<polyline fill="transparent" :stroke="color2" :points="`14, 75 14, 180`" />
		<polyline fill="transparent" :stroke="color2" :points="`55, 11 147, 11 167, 26 250, 26`" />
		<polyline fill="transparent" :stroke="color2" :points="`158, 5 173, 16`" />
		<polyline fill="transparent" :stroke="color1" :points="`200, 17 ${width - 10}, 17`" />
		<polyline fill="transparent" :stroke="color2" :points="`385, 17 ${width - 10}, 17`" />
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
