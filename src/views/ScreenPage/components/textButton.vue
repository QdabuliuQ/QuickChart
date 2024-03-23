<template>
	<el-popover
		ref="shapePopoverRef"
		:hide-after="0"
		placement="right-start"
		popper-class="functionListPopoverClass"
		trigger="click">
		<el-scrollbar height="350px">
			<div class="popover-text-list">
				<div class="text-item text-item-normal" @click="normalTextClick">
					<div class="text-item-cover">
						<i class="iconfont i_text"></i>
					</div>
					<div class="text-item-title">普通文本</div>
				</div>
				<div class="text-item text-item-scroll" @click="scrollTextClick">
					<div class="text-item-cover">
						<i class="iconfont i_scroll_text"></i>
					</div>
					<div class="text-item-title">滚动文本</div>
				</div>
			</div>
		</el-scrollbar>
		<template #reference>
			<button-item icon="i_text" tip="插入文本" title="文本" />
		</template>
	</el-popover>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

import ButtonItem from './buttonItem.vue'

import useStore from '@/store'

import { getMarqueeConfig, getRecordOption, getTextConfig } from '@/utils/screenUtil'

const shapePopoverRef = ref()
const { screen } = useStore()
const normalTextClick = () => {
	screen.addScreenOptionOfElements(getTextConfig())
	screen.addOperationRecordItem(getRecordOption('add', 'text'))
	shapePopoverRef.value.hide()
}

const scrollTextClick = () => {
	screen.addScreenOptionOfElements(getMarqueeConfig())
	screen.addOperationRecordItem(getRecordOption('add', 'marquee'))
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
