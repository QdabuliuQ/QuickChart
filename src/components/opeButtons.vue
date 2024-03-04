<template>
	<div class="ope-buttons">
		<div v-login="saveAsEvent" v-if="props.saveAs" class="ope-button-item">
			<div class="btn-container">
				<i class="iconfont i_save1"></i>
				<span>另存为</span>
			</div>
		</div>
		<div v-login="saveEvent" v-if="props.save" class="ope-button-item">
			<div class="btn-container">
				<i class="iconfont i_save"></i>
				<span>保存</span>
			</div>
		</div>
		<div v-login="shareEvent" v-if="props.share" class="ope-button-item">
			<div class="btn-container">
				<i class="iconfont i_share"></i>
				<span>分享</span>
			</div>
		</div>
		<div
			v-login="toPraise"
			v-if="props.praise"
			:class="['ope-button-item', props.isPraise ? 'active' : '']">
			<div class="btn-container">
				<i class="iconfont i_praise"></i>
				<span>{{ props.praiseCount == 0 ? '点赞' : props.praiseCount }}</span>
			</div>
		</div>
		<div @click="commentEvent" v-if="props.comment" class="ope-button-item">
			<div class="btn-container">
				<i class="iconfont i_comment"></i>
				<span>{{ props.commentCount == 0 ? '评论' : props.commentCount }}</span>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
interface IProps {
	saveAs: boolean
	save: boolean
	share: boolean
	praise: boolean
	isPraise: number
	praiseCount: number
	praiseEvent?: (state: number) => any
	comment: boolean
	commentCount: number
}
const props = defineProps<IProps>()
const emits = defineEmits([
	'update:isPraise',
	'update:praiseCount',
	'saveAsEvent',
	'saveEvent',
	'shareEvent',
	'commentEvent'
])

const saveAsEvent = () => {
	emits('saveAsEvent')
}
const saveEvent = () => {
	emits('saveEvent')
}
const shareEvent = () => {
	emits('shareEvent')
}
const toPraise = () => {
	let state = props.isPraise == 1 ? 0 : 1
	props.praiseEvent &&
		props.praiseEvent(state).then(() => {
			emits('update:isPraise', state)
			emits('update:praiseCount', state === 1 ? props.praiseCount + 1 : props.praiseCount - 1)
		})
}
const commentEvent = () => {
	emits('commentEvent')
}
</script>
<style lang="less">
.ope-buttons {
	position: absolute;
	bottom: 15px;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	align-items: center;
	.active {
		color: #fff !important;
		background-color: @theme !important;
	}
	.ope-button-item {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 60px;
		height: 60px;
		background-color: #424242;
		border-radius: 50%;
		transition: 0.2s all linear;
		cursor: pointer;
		&:hover {
			background-color: #595959;
		}
		&:not(:last-child) {
			margin-right: 15px;
		}
		.btn-container {
			display: flex;
			text-align: center;
			flex-flow: column nowrap;
		}
		.iconfont {
			margin-bottom: 3px;
			font-size: 16px;
			.flex();
		}
		span {
			font-size: 11px;
		}
	}
}
</style>
