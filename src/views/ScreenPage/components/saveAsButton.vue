<template>
	<button-item @click-event="clickEvent" title="另存" icon="i_save1" tip="另存图表" />
	<save-chart-dialog @save-chart="saveChart" v-model:visible="saveDialogVisible" />
</template>
<script setup lang="ts">
import { ref } from 'vue'

import ButtonItem from './buttonItem.vue'
import SaveChartDialog from '@/components/saveChartDialog.vue'

import useProxy from '@/hooks/useProxy'

import useStore from '@/store'

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
	let res: any = await postScreen({
		name,
		option: JSON.stringify(screen.getScreenOption),
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
	saveDialogVisible.value = false
	loading.close()
}
</script>
