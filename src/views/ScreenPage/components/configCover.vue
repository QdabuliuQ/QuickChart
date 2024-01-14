<template>
	<div class="config-cover">
		<i :class="['iconfont', props.icon]"></i>
	</div>
</template>
<script setup lang="ts">
interface IProps {
	icon: string
}
const props = defineProps<IProps>()
</script>
<style lang="less">
.config-cover {
	width: 100%;
	border-radius: 10px;
	aspect-ratio: 1/0.7;
	background-color: #2c2c2c;
	display: flex;
	align-items: center;
	justify-content: center;
	.iconfont {
		font-size: 50px;
		color: @theme;
	}
}
</style>
