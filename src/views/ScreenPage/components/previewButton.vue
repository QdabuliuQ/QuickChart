<template>
	<button-item @click-event="previewEvent" title="预览" icon="i_preview" tip="效果预览" />
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'

import ButtonItem from './buttonItem.vue'

import useStore from '@/store'

const { screen } = useStore()
const router = useRouter()
const previewEvent = () => {
	localStorage.setItem('screenData', JSON.stringify(screen.getScreenOption))
	let detail = router.resolve({
		path: '/preview'
	})
	window.open(detail.href, '_blank')
}
</script>
