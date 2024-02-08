<template>
	<el-popover
		placement="right-start"
		:width="220"
		trigger="click"
		popper-class="layer-panel-popper-class">
		<template #reference>
			<slot></slot>
		</template>
		<el-scrollbar height="400px">
			<template v-if="screen.getScreenOptionOfElements.length">
				<div
					@mouseenter="enterEvent(idx)"
					@mouseleave="leaveEvent"
					v-for="(item, idx) in screen.getScreenOptionOfElements"
					:key="item.id"
					class="element-item">
					<div class="element-info">
						<div class="element-icon">
							<img v-if="item.type === 'chart' || item.type === 'map'" :src="item.cover" />
							<img v-else-if="item.type === 'image'" :src="item.url" />
							<i v-else :class="['iconfont', getIconClass(item.type)]"></i>
						</div>
						<div class="element-title">
							{{ getTitle(item.type) }}
						</div>
					</div>
					<div class="element-status">
						<i
							@click="lockStatusChange(idx, item.isLock)"
							style="font-size: 13px"
							:class="['iconfont', item.isLock ? 'i_unlock' : 'i_lock']"></i>
						<i
							@click="visibleStatusChange(idx, item.style.display === 'none' ? 'block' : 'none')"
							style="font-size: 15px"
							:class="['iconfont', item.style.display === 'none' ? 'i_see' : 'i_unsee']"></i>
						<el-popconfirm
							@confirm="deleteScreenElement"
							width="170"
							icon-color="#eb5959"
							confirm-button-text="确定"
							cancel-button-text="取消"
							title="确定删除该元素吗">
							<template #reference>
								<i @click="selectIdx = idx" style="font-size: 13px" class="iconfont i_delete_2"></i>
							</template>
						</el-popconfirm>
					</div>
				</div>
			</template>
			<el-empty v-else description="暂无元素" :image-size="80" />
		</el-scrollbar>
	</el-popover>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import useStore from '@/store'

const { screen }: any = useStore()
const selectIdx = ref<number>(-1)
const getIconClass = (type: string) => {
	switch (type) {
		case 'text':
			return 'i_text'
		case 'shape':
			return 'i_shape'
		case 'border':
			return 'i_border'
	}
}
const getTitle = (type: string) => {
	switch (type) {
		case 'chart':
			return '图表'
		case 'map':
			return '地图'
		case 'text':
			return '文本'
		case 'shape':
			return '形状'
		case 'image':
			return '图片'
		case 'border':
			return '边框'
	}
}

const enterEvent = (idx: number) => {
	screen.updateActiveElementIdx(idx)
}
const leaveEvent = () => {
	screen.updateActiveElementIdx(-1)
}
const lockStatusChange = (idx: number, isLock: boolean) => {
	screen.updateElementOfItem(idx, 'isLock', !isLock)
}
const visibleStatusChange = (idx: number, display: 'none' | 'block') => {
	screen.updateScreenOptionOfElementStyleItem(idx, 'display', display)
}
const deleteScreenElement = () => {
	if (selectIdx.value !== -1) {
		screen.deleteScreenOptionOfElements(selectIdx.value)
		selectIdx.value = -1
	}
}
</script>
<style lang="less">
.layer-panel-popper-class {
	padding: 0 !important;
	.el-scrollbar {
		padding: 10px 12px 10px 10px;
	}
	.el-scrollbar__view {
		height: 100%;
		.el-empty {
			padding: 0;
			height: 100%;
		}
	}
	.element-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 6px 8px;
		border: 1px solid transparent;
		border-radius: 8px;
		cursor: pointer;
		box-sizing: border-box;
		&:hover {
			background-color: rgb(248 181 87 / 33%);
			border: 1px solid @theme;
		}
		.element-info {
			display: flex;
			align-items: center;
			flex: 1;
		}
		.element-icon {
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;
			width: 55%;
			height: 60px;
			background-color: #424242;
			border-radius: 8px;
			object-fit: contain;
			img {
				width: 100%;
				height: 100%;
			}
			.iconfont {
				font-size: 30px;
			}
		}
		.element-title {
			margin-left: 10px;
			font-size: 12px;
		}
		.element-status {
			display: flex;
			align-items: center;
			flex-direction: column;
			.iconfont {
				cursor: pointer;
				&:hover {
					color: @theme;
				}
			}
		}
	}
}
</style>
