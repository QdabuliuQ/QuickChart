<template>
	<button-item
		:verify="true"
		icon="i_save1"
		tip="另存图表"
		title="另存"
		@click-event="clickEvent" />
	<save-chart-dialog v-model:visible="saveDialogVisible" @save-chart="saveChart" />
</template>
<script lang="ts" setup>
import { ref } from 'vue'

import ButtonItem from './buttonItem.vue'
import SaveChartDialog from '@/components/saveChartDialog.vue'

import useProxy from '@/hooks/useProxy'

import useStore from '@/store'

import { stringify } from '@/utils/toJSON'

import { postScreen } from '@/network/screen'

const proxy = useProxy()
const { screen } = useStore()
const saveDialogVisible = ref<boolean>(false)
const clickEvent = () => {
	saveDialogVisible.value = true
}

const saveChart = async (name: string) => {
	let loading = proxy.$loading({
		lock: true,
		text: '正在保存...',
		background: 'rgba(0, 0, 0, 0.7)'
	})
	console.log(screen.getScreenOptionOfElements)
	if (screen.getScreenOptionOfElements.length === 0) {
		proxy.$notice({
			type: 'error',
			message: '请添加页面元素',
			position: 'top-left'
		})
	} else {
		let res: any = await postScreen({
			name,
			option: stringify(screen.getScreenOption),
			c_width: document.getElementById('render')?.clientWidth as number,
			c_height: document.getElementById('render')?.clientHeight as number
		})
		if (res.status) {
			proxy.$notice({
				type: 'success',
				message: res.msg,
				position: 'top-left'
			})
		}
	}

	saveDialogVisible.value = false
	loading.close()
}
</script>
