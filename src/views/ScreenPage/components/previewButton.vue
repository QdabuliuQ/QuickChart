<template>
	<button-item @click-event="previewEvent" title="预览" icon="i_preview" tip="效果预览" />
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'

import ButtonItem from './buttonItem.vue'

import useStore from '@/store'

import { listenMsg, sendMsg } from '@/utils/previewChannel.ts'

const { screen } = useStore()
const router = useRouter()

listenMsg((data: any) => {
	if (data.type === 'active') {
		const data = JSON.stringify(screen.getScreenOption)
		localStorage.setItem('screenData', data)
		sendMsg('update', data)
	}
})

const previewEvent = () => {
	localStorage.setItem('screenData', JSON.stringify(screen.getScreenOption))
	let detail = router.resolve({
		path: '/preview'
	})
	window.open(detail.href, '_blank')
}
</script>
