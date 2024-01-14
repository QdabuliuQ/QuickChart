<template>
	<div
		:style="{
			backgroundColor: props.bgColor
		}"
		@click="emits('btnClick')"
		class="delete-btn">
		<i :class="['iconfont', props.icon]"></i>
		{{ props.label }}
	</div>
</template>
<script setup lang="ts">
interface IProps {
	label: string
	icon: string
	bgColor: string
}
const props = defineProps<IProps>()
const emits = defineEmits(['btnClick'])
</script>
<style lang="less">
.delete-btn {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 8px 0 9px;
	margin: 6px 0;
	font-size: 13px;
	color: #fff;
	border-radius: 8px;
	transition: 0.2s all linear;
	cursor: pointer;
	.iconfont {
		margin-right: 5px;
	}
}
</style>
