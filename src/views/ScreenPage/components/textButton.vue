<template>
	<el-popover
		ref="shapePopoverRef"
		popper-class="functionListPopoverClass"
		placement="right-start"
		trigger="click"
		:hide-after="0">
		<el-scrollbar height="350px">
			<div class="popover-text-list">
				<div @click="normalTextClick" class="text-item text-item-normal">
					<div class="text-item-cover">
						<i class="iconfont i_text"></i>
					</div>
					<div class="text-item-title">普通文本</div>
				</div>
				<div @click="scrollTextClick" class="text-item text-item-scroll">
					<div class="text-item-cover">
						<i class="iconfont i_scroll_text"></i>
					</div>
					<div class="text-item-title">滚动文本</div>
				</div>
			</div>
		</el-scrollbar>
		<template #reference>
			<button-item title="文本" icon="i_text" tip="插入文本" />
		</template>
	</el-popover>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import ButtonItem from './buttonItem.vue'

import useStore from '@/store'

import { getMarqueeConfig, getTextConfig } from '@/utils/screenUtil'

const shapePopoverRef = ref()
const { screen } = useStore()
const normalTextClick = () => {
	screen.addScreenOptionOfElements(getTextConfig())
	shapePopoverRef.value.hide()
}

const scrollTextClick = () => {
	screen.addScreenOptionOfElements(getMarqueeConfig())
	shapePopoverRef.value.hide()
}
</script>

<style lang="less">
.functionListPopoverClass {
	.popover-text-list {
		display: grid;
		width: 400px;
		grid-template-columns: 1fr 1fr;
		grid-gap: 15px;
		.text-item {
			cursor: pointer;
			&:hover .text-item-cover {
				border: 1px solid @theme;
			}
		}
		.text-item-cover {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100px;
			margin-bottom: 5px;
			color: @theme;
			background-color: #383838;
			border: 1px solid transparent;
			border-radius: 10px;
			transition: all 0.2s linear;
			box-sizing: border-box;
			.iconfont {
				font-size: 50px;
			}
		}
		.text-item-title {
			font-size: 13px;
			text-align: center;
		}
	}
}
</style>
