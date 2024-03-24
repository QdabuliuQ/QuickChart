<template>
	<button-item :verify="true" icon="i_save" tip="保存" title="保存" @click-event="clickEvent" />
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router'

import ButtonItem from '@/views/ScreenPage/components/buttonItem.vue'

import useProxy from '@/hooks/useProxy.ts'

import useStore from '@/store'

import { stringify } from '@/utils/toJSON.ts'

import { putScreen } from '@/network/screen.ts'
import { ElLoading } from 'element-plus'

const route = useRoute()
const { screen }: any = useStore()
const proxy = useProxy()
const clickEvent = async () => {
	const { id } = route.params
	const loading = ElLoading.service({
		lock: true,
		text: '加载中',
		background: 'rgba(0, 0, 0, 0.7)'
	})

	const res = await putScreen({
		screen_id: id as string,
		option: stringify(screen.getScreenOption),
		c_width: 1127,
		c_height: 542
	})
	if (res.status) {
		proxy.$notice({
			type: 'success',
			position: 'top-left',
			message: res.msg
		})
	}
	loading.close()
}
</script>
