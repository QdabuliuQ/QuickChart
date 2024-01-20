<template>
	<div
		class="border6"
		:style="`
      box-shadow: inset 0 0 40px ${color1};
      border: 1px solid ${color2};
    `">
		<svg :width="width" :height="height">
			<polyline class="go-border-line-width-2" :stroke="color1" :points="`0, 25 0, 0 25, 0`" />
			<polyline
				class="go-border-line-width-2"
				:stroke="color1"
				:points="`${width - 25}, 0 ${width}, 0 ${width}, 25`" />
			<polyline
				class="go-border-line-width-2"
				:stroke="color1"
				:points="`${width - 25}, ${height} ${width}, ${height} ${width}, ${height - 25}`" />
			<polyline
				class="go-border-line-width-2"
				:stroke="color1"
				:points="`0, ${height - 25} 0, ${height} 25, ${height}`" />

			<polyline class="go-border-line-width-5" :stroke="color2" :points="`0, 10 0, 0 10, 0`" />
			<polyline
				class="go-border-line-width-5"
				:stroke="color2"
				:points="`${width - 10}, 0 ${width}, 0 ${width}, 10`" />
			<polyline
				class="go-border-line-width-5"
				:stroke="color2"
				:points="`${width - 10}, ${height} ${width}, ${height} ${width}, ${height - 10}`" />
			<polyline
				class="go-border-line-width-5"
				:stroke="color2"
				:points="`0, ${height - 10} 0, ${height} 10, ${height}`" />
		</svg>
	</div>
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

<style scoped>
.border6 {
	polyline {
		fill: none;
		stroke-linecap: round;
	}
	.go-border-line-width-2 {
		stroke-width: 2;
	}
	.go-border-line-width-5 {
		stroke-width: 5;
	}
}
</style>
