<template>
	<el-popover
		ref="mapPopoverRef"
		:hide-after="0"
		placement="right-start"
		popper-class="functionListPopoverClass"
		trigger="click">
		<el-scrollbar height="400px">
			<template v-if="screen.getOperationRecord.length">
				<div class="header">
					<div class="info">操作信息</div>
					<div class="time">时间</div>
				</div>
				<div v-for="item in screen.getOperationRecord" :key="item.time" class="record-item">
					<div class="info">
						<span :style="{ color: typeColor(item.type) }" class="type">
							{{ typeFilter(item.type) }}
						</span>
						<span class="element">{{ elementFilter(item.element) }}</span>
					</div>
					<span class="time">
						{{ proxy.$moment(item.time).format('HH:mm:ss') }}
					</span>
				</div>
			</template>
			<div
				v-else
				style="
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
				">
				<el-empty :image-size="100" description="暂无操作记录" />
			</div>
		</el-scrollbar>
		<template #reference>
			<button-item icon="i_history" tip="操作记录" title="记录" />
		</template>
	</el-popover>
</template>

<script lang="ts" setup>
import ButtonItem from '@/views/ScreenPage/components/buttonItem.vue'

import useProxy from '@/hooks/useProxy'

import useStore from '@/store'

import { elementFilter, typeFilter } from '@/utils/screenUtil'

import { OperationType } from '@/types/screen'

const proxy = useProxy()
const { screen } = useStore()

const typeColor = (type: OperationType) => {
	switch (type) {
		case 'delete':
			return '#eb431b'
		case 'modify':
			return '#f8b557'
		case 'add':
			return '#38b94f'
		case 'copy':
			return '#42bff1'
		case 'paste':
			return '#ad57f8'
	}
}
</script>

<style lang="less" scoped>
.el-empty {
	width: 150px !important;

	.el-empty__image {
		width: 100% !important;
	}
}

.header {
	display: flex;
	align-items: center;
	font-weight: bold;
	color: #fff;
	padding-bottom: 10px;
	padding-left: 5px;
	padding-right: 5px;
	border-bottom: 1px solid #3a3a3a;

	.info {
		flex: 2;
	}

	.time {
		flex: 1;
	}
}

.record-item {
	padding: 10px 5px;
	width: 160px;
	display: flex;
	align-items: center;
	justify-content: space-between;

	&:not(:last-child) {
		border-bottom: 1px solid #3a3a3a;
	}

	.type {
		font-weight: bold;
	}

	.element {
		color: #fff;
	}
}
</style>
