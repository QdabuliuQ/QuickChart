<template>
	<svg :width="width" :height="height">
		<path
			fill="#00000000"
			:stroke="color1"
			:d="`
          M 5 20 L 5 10 L 12 3  L 60 3 L 68 10
          L ${width - 20} 10 L ${width - 5} 25
          L ${width - 5} ${height - 5} L 20 ${height - 5}
          L 5 ${height - 20} L 5 20
        `" />

		<path
			fill="transparent"
			stroke-width="3"
			stroke-linecap="round"
			stroke-dasharray="10, 5"
			:stroke="color1"
			d="M 16 9 L 61 9" />

		<path fill="transparent" :stroke="color2" :d="`M 5 20 L 5 10 L 12 3  L 60 3 L 68 10`" />

		<path
			fill="transparent"
			:stroke="color2"
			:d="`M ${width - 5} ${height - 30} L ${width - 5} ${height - 5} L ${width - 30} ${
				height - 5
			}`" />
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
