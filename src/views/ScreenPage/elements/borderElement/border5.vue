<template>
	<div class="border5" :style="`box-shadow: inset 0 0 25px 3px ${color1}`">
		<svg :width="width" :height="height">
			<polygon
				fill="transparent"
				:points="`
        4, 0 ${width - 4}, 0 ${width}, 4 ${width}, ${height - 4} ${width - 4}, ${height}
        4, ${height} 0, ${height - 4} 0, 4
      `" />
		</svg>

		<svg
			:width="width"
			:height="height"
			:key="item"
			v-for="item in border"
			:class="`border-item ${item}`">
			<polygon :fill="color2" points="40, 0 5, 0 0, 5 0, 16 3, 19 3, 7 7, 3 35, 3" />
		</svg>
	</div>
</template>

<script setup lang="ts">
const border = ['left-top', 'right-top', 'left-bottom', 'right-bottom']

interface IProps {
	width: number
	height: number
	color1: string
	color2: string
}
const { width, height, color1, color2 } = defineProps<IProps>()
</script>

<style lang="less">
.border5 {
	width: 100%;
	height: 100%;
	overflow: hidden;
	border-radius: 15px;
}
</style>
