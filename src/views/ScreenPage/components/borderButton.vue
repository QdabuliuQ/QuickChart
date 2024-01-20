<template>
	<el-popover
		ref="chartPopoverRef"
		popper-class="functionListPopoverClass"
		placement="right-start"
		trigger="click"
		:hide-after="0">
		<el-scrollbar height="400px">
			<div class="functionListChartContainer">
				<div v-for="(item, index) in 8" class="item">
					<el-image
						class="border-image"
						style="width: 100%; aspect-ratio: 2/1.3"
						:src="borders[index]"
						fit="cover" />
					<div class="name">边框 - {{ index + 1 }}</div>
				</div>
			</div>
		</el-scrollbar>
		<template #reference>
			<button-item @click-event="clickEvent" title="边框" icon="i_border" tip="插入边框" />
		</template>
	</el-popover>
</template>

<script setup lang="ts">
import ButtonItem from '@/views/ScreenPage/components/buttonItem.vue'

import border1 from '@/assets/image/border1.png'
import border2 from '@/assets/image/border2.png'
import border3 from '@/assets/image/border3.png'
import border4 from '@/assets/image/border4.png'
import border5 from '@/assets/image/border5.png'
import border6 from '@/assets/image/border6.png'
import border7 from '@/assets/image/border7.png'
import border8 from '@/assets/image/border8.png'

const borders = [border1, border2, border3, border4, border5, border6, border7, border8]

const clickEvent = () => {}
</script>

<style lang="less">
.functionListPopoverClass {
	.item {
		cursor: pointer;
	}
	.border-image {
		border: 1px solid #3b3b3b !important;
	}
}
</style>
