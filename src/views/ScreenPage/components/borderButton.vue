<template>
	<el-popover
		ref="borderPopoverRef"
		:hide-after="0"
		placement="right-start"
		popper-class="functionListPopoverClass"
		trigger="click">
		<el-scrollbar height="400px">
			<div class="functionListChartContainer">
				<div v-for="(item, index) in 12" :key="index" class="item" @click="borderClick(index + 1)">
					<el-image
						:src="borders[index]"
						class="border-image"
						fit="cover"
						style="width: 100%; aspect-ratio: 2/1.3" />
					<div class="name">边框 - {{ index + 1 }}</div>
				</div>
			</div>
		</el-scrollbar>
		<template #reference>
			<button-item icon="i_border" tip="插入边框" title="边框" />
		</template>
	</el-popover>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import ButtonItem from '@/views/ScreenPage/components/buttonItem.vue'

import border1 from '@/assets/image/border1.png'
import border2 from '@/assets/image/border2.png'
import border3 from '@/assets/image/border3.png'
import border4 from '@/assets/image/border4.png'
import border5 from '@/assets/image/border5.png'
import border6 from '@/assets/image/border6.png'
import border7 from '@/assets/image/border7.png'
import border8 from '@/assets/image/border8.png'
import border9 from '@/assets/image/border9.png'
import border10 from '@/assets/image/border10.png'
import border11 from '@/assets/image/border11.png'
import border12 from '@/assets/image/border12.png'

import useStore from '@/store'

import { getBorderConfig, getRecordOption } from '@/utils/screenUtil'

const borders = [
	border1,
	border2,
	border3,
	border4,
	border5,
	border6,
	border7,
	border8,
	border9,
	border10,
	border11,
	border12
]

const borderPopoverRef = ref<any>(null)
const { screen } = useStore()

const borderClick = (idx: number) => {
	borderPopoverRef.value.hide()
	let option: any = {
		code: idx
	}
	if (idx === 4) {
		option['style'] = {
			color1: '#2CF7FE',
			color2: '#6586EC',
			borderTitleWidth: 250,
			borderTitleHeight: 33,
			borderTitleColor: '#fff',
			borderTitleSize: 16,
			borderTitle: '标题'
		}
	} else if (idx === 1) {
		option['style'] = {
			duration: 1
		}
	}
	screen.addScreenOptionOfElements(getBorderConfig(option))
	screen.addOperationRecordItem(getRecordOption('add', 'border'))
}
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
