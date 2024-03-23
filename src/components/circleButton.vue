<template>
	<div class="circle-button" @click="clickEvent">
		<i :class="['iconfont', props.icon]"></i>
		<span>{{ props.title }}</span>
	</div>
</template>

<script lang="ts" setup>
interface IProps {
	icon: string
	title: string
}

const props = defineProps<IProps>()

const emits = defineEmits(['clickEvent'])

const clickEvent = () => {
	emits('clickEvent')
}
</script>

<style lang="less" scoped>
.circle-button {
	.flex();
	flex-direction: column;
	width: 60px;
	height: 60px;
	background-color: #424242;
	border-radius: 50%;
	transition: 0.2s all linear;
	cursor: pointer;

	.iconfont {
		margin-bottom: 3px;
		font-size: 16px;
	}

	span {
		font-size: 11px;
	}

	&:hover {
		background-color: #595959;
	}
}
</style>
